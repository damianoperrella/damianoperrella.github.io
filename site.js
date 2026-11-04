/* ======================================================================
   site.js — shared by every page.

   1. The live clock in the header (any element with id="clock").
   2. The "smear" transition between pages.

   How the transition works
   - Clicking an internal link floods the screen with flat fields of colour that
     grow in stepped arches from the top and from the middle, trailing thin
     horizontal streaks. Four colours are used, taken from the image inside the
     link (the card's cover); the dominant one arrives last and ends solid.
   - Links without an image use the page you are on (PT.color) and shades of it.
   - The next page opens already covered in that solid colour, waits for its
     images, then the same fields retreat the way they came, uncovering the page.

   Timings are the constants just below (about 2.4 s end to end).
   ====================================================================== */
(function () {
  "use strict";

  var EXIT_MS = 1000;         // covering the old page
  var ENTER_MS = 1400;        // uncovering the new page
  var HOLD_MS = 100;          // minimum time the new page stays covered
  var LOAD_WAIT_MS = 1600;    // longest we wait for images before uncovering anyway
  var WATCHDOG_MS = 5000;     // if navigation never happens, uncover the page again
  var DEFAULT_COLOR = "#141414";
  var KEY = "pt-handoff";

  var root = document.documentElement;
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var busy = false, canvas = null, ctx = null, scene = null, lastFlicker = 0;
  var HEX = /^#[0-9a-f]{6}$/i;

  /* ---------- colour helpers ---------- */
  function hexToRgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function rgbToHex(c) { return "#" + c.map(function (v) { return ("0" + Math.max(0, Math.min(255, Math.round(v))).toString(16)).slice(-2); }).join(""); }
  function rgbToHsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0;
    if (mx !== mn) {
      var d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(a) {
    var h = a[0], s = a[1], l = a[2];
    if (!s) return [l * 255, l * 255, l * 255];
    function f(p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }
    var q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255];
  }
  function dist(a, b) { return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]); }

  /* four colours from a dominant one: if the image gave fewer, make shades and hue shifts of it */
  function fillPalette(base, extra) {
    var out = [base], rgb = [hexToRgb(base)];
    (extra || []).forEach(function (c) {
      if (out.length >= 4 || !HEX.test(c)) return;
      var v = hexToRgb(c);
      if (rgb.every(function (u) { return dist(u, v) > 90; })) { out.push(c); rgb.push(v); }
    });
    var hsl = rgbToHsl(rgb[0]), tries = [[.07, 0, .2], [-.07, .05, -.18], [.14, .05, .3], [-.14, 0, -.3], [.5, .05, .15]], k = 0;
    while (out.length < 4 && k < tries.length) {
      var t = tries[k++], h = (hsl[0] + t[0] + 1) % 1, s = Math.max(0, Math.min(1, hsl[1] + t[1])), l = Math.max(.06, Math.min(.94, hsl[2] + t[2]));
      var c = rgbToHex(hslToRgb([h, s, l])), v2 = hexToRgb(c);
      if (rgb.every(function (u) { return dist(u, v2) > 60; })) { out.push(c); rgb.push(v2); }
    }
    while (out.length < 4) out.push(out[out.length - 1]);
    return out;
  }
  function validPalette(a) { return Array.isArray(a) && a.length === 4 && a.every(function (c) { return HEX.test(c || ""); }); }

  /* ---------- what the previous page handed over (the colours, if we arrived by transition) ---------- */
  var incoming = null;
  try {
    var raw = sessionStorage.getItem(KEY);
    if (raw) {
      sessionStorage.removeItem(KEY);
      var o = JSON.parse(raw);
      if (o && HEX.test(o.color || "") && Date.now() - o.t < 10000) {
        o.palette = validPalette(o.palette) ? o.palette : fillPalette(o.color);
        o.palette[0] = o.color;
        incoming = o;
      }
    }
  } catch (e) {}

  var resolveReady;
  var PT = window.PT = {
    color: incoming ? incoming.color : null,
    ready: new Promise(function (r) { resolveReady = r; }),   // resolves when the new page starts to show
    setColor: function (c) { if (HEX.test(c || "")) PT.color = c; },
    sample: sample
  };
  if (!incoming) resolveReady();

  /* base styles for the cover; if we arrived by transition, cover the page before its first paint */
  var css = "#pt-canvas{position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483647;" +
            "pointer-events:auto}" +
            "html.pt-lock,html.pt-lock body{overflow:hidden!important}";
  if (incoming) {
    root.classList.add("pt-in");
    css += "html.pt-in::after{content:'';position:fixed;left:0;top:0;right:0;bottom:0;" +
           "z-index:2147483647;background:" + incoming.color + "}";
  }
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  /* ============================================================
     1. CLOCK — the visitor's own time zone, ticking every second
     ============================================================ */
  onReady(function () {
    var el = document.getElementById("clock");
    if (!el) return;
    var fmt = new Intl.DateTimeFormat("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
    });
    function tick() {
      var p = {};
      fmt.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      el.textContent = p.weekday + " " + p.day + " " + p.month + " " + p.year + ", " + p.hour + ":" + p.minute + ":" + p.second;
    }
    (function loop() { tick(); setTimeout(loop, 1000 - (Date.now() % 1000) + 5); })();
  });

  /* ============================================================
     2. THE SMEAR
     Four layers, one per colour. Each is a flat field cut into horizontal
     strips of different heights. A layer grows either down from the top ("top")
     or up from the bottom ("bottom"), and further along the middle than at the
     sides, so its edge is a stepped arch. Strips jitter sideways, and some trail
     a thin streak past their edge. Layer 0 (the dominant colour) arrives last and
     covers everything; the reveal plays the same thing backwards.
     ============================================================ */
  var LAYERS = [                     // [direction, starts, ends, vertical weight, centre weight]
    ["top",    .40, 1.00, .55, .22],
    ["bottom", .26, .84,  .50, .30],
    ["top",    .10, .70,  .55, .34],
    ["bottom", .00, .52,  .50, .38]
  ];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function buildScene(W, H, palette) {
    var unit = Math.max(6, Math.round(H / 72)), cw = Math.max(8, Math.round(W / 44)), layers = [];
    LAYERS.forEach(function (L, k) {
      var strips = [], y = 0;
      while (y < H) {
        var h = unit * (1 + Math.floor(Math.random() * Math.random() * 5));   // mostly thin, sometimes thick
        h = Math.min(h, H - y);
        strips.push({ y: y, h: h, shift: Math.random() < .35 ? rnd(-.16, .16) : rnd(-.02, .02), noise: rnd(-.04, .04), streak: 0, sdir: 1 });
        y += h;
      }
      layers.push({ dir: L[0], s: L[1], e: L[2], A: L[3], B: L[4], color: palette[k], strips: strips });
    });
    return { W: W, H: H, cw: cw, layers: layers };
  }

  function flicker(sc) {                                // edges shimmer, streaks come and go
    sc.layers.forEach(function (L) {
      L.strips.forEach(function (st) {
        st.noise = rnd(-.04, .04);
        if (Math.random() < .12) st.shift = Math.random() < .35 ? rnd(-.16, .16) : rnd(-.02, .02);
        st.streak = Math.random() < .3 ? rnd(.06, .34) : 0;
        st.sdir = Math.random() < .5 ? -1 : 1;
      });
    });
  }

  function makeCanvas(palette) {
    canvas = document.createElement("canvas");
    canvas.id = "pt-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = Math.max(1, window.innerWidth);
    canvas.height = Math.max(1, window.innerHeight);
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    scene = buildScene(canvas.width, canvas.height, palette);
    flicker(scene);
    lastFlicker = 0;
  }

  /* p: how far the layers have grown, 0 (nothing) to 1 (solid) */
  function draw(p, now) {
    var sc = scene, W = sc.W, H = sc.H, cw = sc.cw;
    if (now - lastFlicker > 85) { flicker(sc); lastFlicker = now; }
    ctx.clearRect(0, 0, W, H);
    for (var k = sc.layers.length - 1; k >= 0; k--) {            // dominant colour last, on top
      var L = sc.layers[k], q = (p - L.s) / (L.e - L.s);
      if (q <= 0) continue;
      q = Math.min(1, q);
      ctx.fillStyle = L.color;
      for (var i = 0; i < L.strips.length; i++) {
        var st = L.strips[i], yn = (st.y + st.h / 2) / H, vy = L.dir === "top" ? yn : 1 - yn;
        var m = (q - L.A * vy - st.noise) / (L.B * 2);            // half-width, as a fraction of the screen
        if (m <= 0) continue;
        var xl = Math.floor((.5 - st.shift - m) * W / cw) * cw, xr = Math.ceil((.5 - st.shift + m) * W / cw) * cw;
        xl = Math.max(0, xl); xr = Math.min(W, xr);
        if (xr <= xl) continue;
        ctx.fillRect(xl, st.y, xr - xl, st.h);
        if (st.streak && q < 1) {                                  // thin streak trailing past the edge
          var ly = st.y + Math.floor(st.h / 2), len = st.streak * W;
          if (st.sdir > 0) ctx.fillRect(xr, ly, Math.min(len, W - xr), Math.max(1, Math.round(st.h / 4)));
          else ctx.fillRect(Math.max(0, xl - len), ly, Math.min(len, xl), Math.max(1, Math.round(st.h / 4)));
        }
      }
    }
  }

  function solid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = scene.layers[0].color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* mode "cover": the layers grow. mode "reveal": they retreat. */
  function run(mode, ms, done) {
    var t0 = null;
    requestAnimationFrame(function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / ms), e = k * k * (3 - 2 * k);
      if (k >= 1 && mode === "reveal") { if (done) done(); return; }
      if (k >= 1) { solid(); if (done) done(); return; }
      draw(mode === "cover" ? e : 1 - e, now);
      requestAnimationFrame(frame);
    });
  }

  function fade(mode, ms, done) {                      // reduced motion: a plain quick fade
    var t0 = null;
    requestAnimationFrame(function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / ms);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = mode === "cover" ? k : 1 - k;
      ctx.fillStyle = scene.layers[0].color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      if (k < 1) requestAnimationFrame(frame); else if (done) done();
    });
  }

  function finish() {
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    canvas = null;
    root.classList.remove("pt-lock", "pt-in");
    busy = false;
  }

  /* ============================================================
     3. LEAVING A PAGE
     ============================================================ */
  function exit(palette, url) {
    busy = true;
    root.classList.add("pt-lock");
    makeCanvas(palette);
    var after = function () {
      try { sessionStorage.setItem(KEY, JSON.stringify({ color: palette[0], palette: palette, t: Date.now() })); } catch (e) {}
      solid();
      window.location.assign(url);
      setTimeout(recover, WATCHDOG_MS);                // only ever fires if the navigation did not happen
    };
    if (reduce) fade("cover", 160, after); else run("cover", EXIT_MS, after);
  }

  function recover() {                                 // navigation failed, or the page came back from the cache
    if (!busy) return;
    try { sessionStorage.removeItem(KEY); } catch (e) {}
    if (canvas) { if (reduce) fade("reveal", 220, finish); else run("reveal", 450, finish); }
    else finish();
  }
  window.addEventListener("pageshow", function (e) { if (e.persisted) recover(); });

  /* the vivid colours of an image, most dominant first: [dominant, ...others]. A pink photo gives pink, not grey. */
  function colours(img) {
    try {
      var s = 32, c = document.createElement("canvas");
      c.width = c.height = s;
      var x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(img, 0, 0, s, s);
      var d = x.getImageData(0, 0, s, s).data, R = 0, G = 0, B = 0, W = 0, bins = {};
      for (var i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 128) continue;
        var r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
        var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
        var sat = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
        var w = 0.02 + sat * sat * (1 - Math.abs(2 * l - 1));
        R += r * w; G += g * w; B += b * w; W += w;
        var key = (d[i] >> 5) * 64 + (d[i + 1] >> 5) * 8 + (d[i + 2] >> 5), bk = bins[key] || (bins[key] = [0, 0, 0, 0]);
        bk[0] += d[i] * w; bk[1] += d[i + 1] * w; bk[2] += d[i + 2] * w; bk[3] += w;
      }
      if (!W) return null;
      var dom = rgbToHex([R / W * 255, G / W * 255, B / W * 255]);
      var list = Object.keys(bins).map(function (k) { var b2 = bins[k]; return { w: b2[3], c: rgbToHex([b2[0] / b2[3], b2[1] / b2[3], b2[2] / b2[3]]) }; })
        .sort(function (a, b) { return b.w - a.w; }).map(function (e) { return e.c; });
      return [dom].concat(list);
    } catch (e) { return null; }
  }
  function sample(img) { var c = colours(img); return c ? c[0] : null; }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    if (busy) { e.preventDefault(); return; }
    if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname && u.search === location.search) return;   // same page or just a #anchor
    e.preventDefault();
    var color = PT.color;
    if (!color) {
      var m = document.querySelector('meta[name="pt-color"]');
      color = (m && HEX.test(m.content)) ? m.content : DEFAULT_COLOR;
    }
    var extra = [], img = a.querySelector("img");
    if (img) { var cs = colours(img); if (cs) { color = cs[0]; extra = cs.slice(1); } }
    exit(fillPalette(color, extra), u.href);
  });

  /* ============================================================
     4. ARRIVING ON A PAGE
     ============================================================ */
  onReady(function () {
    if (!incoming) return;
    busy = true;
    makeCanvas(incoming.palette);
    solid();                                           // solid cover, same colour as the pre-paint layer
    root.classList.remove("pt-in");
    root.classList.add("pt-lock");
    var loaded = document.readyState === "complete" ? Promise.resolve()
      : new Promise(function (r) { window.addEventListener("load", r, { once: true }); });
    var waited = new Promise(function (r) { setTimeout(r, LOAD_WAIT_MS); });
    var held = new Promise(function (r) { setTimeout(r, HOLD_MS); });
    Promise.all([Promise.race([loaded, waited]), held]).then(function () {
      resolveReady();
      if (reduce) fade("reveal", 220, finish); else run("reveal", ENTER_MS, finish);
    });
  });
})();
