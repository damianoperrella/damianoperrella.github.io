/* ======================================================================
   site.js — shared by every page.

   1. The live clock in the header (any element with id="clock").
   2. The pixel transition between pages.

   How the transition works
   - Clicking an internal link covers the screen in rectangular pixels of one
     colour, in many sizes, flickering until it is solid.
   - The colour is sampled from the image inside the link (the card's cover),
     or taken from the page you are on (PT.color) when the link has no image.
   - The next page opens already covered, waits for its images, then the
     pixels break up into a ghost layer and dissolve away.

   Timings and sizes are the constants just below.
   ====================================================================== */
(function () {
  "use strict";

  var EXIT_MS = 700;          // covering the old page
  var ENTER_MS = 950;         // dissolving off the new page
  var HOLD_MS = 140;          // minimum time the new page stays covered
  var LOAD_WAIT_MS = 1600;    // longest we wait for images before dissolving anyway
  var WATCHDOG_MS = 5000;     // if navigation never happens, uncover the page again
  var GHOST = 0.2;            // how long a block lingers half-transparent (fraction of the run)
  var GHOST_ALPHA = 0.38;
  var DEFAULT_COLOR = "#141414";
  var KEY = "pt-handoff";

  var root = document.documentElement;
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var busy = false, canvas = null, ctx = null, field = null, jitter = null, lastJitter = 0;

  /* ---------- what the previous page handed over (a colour, if we arrived by transition) ---------- */
  var incoming = null;
  try {
    var raw = sessionStorage.getItem(KEY);
    if (raw) {
      sessionStorage.removeItem(KEY);
      var o = JSON.parse(raw);
      if (o && /^#[0-9a-f]{6}$/i.test(o.color || "") && Date.now() - o.t < 10000) incoming = o;
    }
  } catch (e) {}

  var resolveReady;
  var PT = window.PT = {
    color: incoming ? incoming.color : null,
    ready: new Promise(function (r) { resolveReady = r; }),   // resolves when the new page starts to show
    setColor: function (c) { if (/^#[0-9a-f]{6}$/i.test(c || "")) PT.color = c; },
    sample: sample
  };
  if (!incoming) resolveReady();

  /* base styles for the cover; if we arrived by transition, cover the page before its first paint */
  var css = "#pt-canvas{position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483647;" +
            "image-rendering:pixelated;pointer-events:auto}" +
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
     2. THE PIXEL FIELD
     Every block gets a "time" between 0 and 1. Several noise layers with
     different block shapes (small squares, wide bars, long thin streaks) are
     mixed, so blocks arrive in clumps of many sizes rather than one by one.
     ============================================================ */
  function buildField(W, H) {
    var cw = Math.max(10, Math.round(W / 96));
    var ch = Math.max(7, Math.round(cw * 0.62));
    var cols = Math.ceil(W / cw), rows = Math.ceil(H / ch), n = cols * rows;
    var LEVELS = [[1, 1, .12], [2, 1, .16], [3, 2, .2], [6, 3, .24], [12, 4, .14], [16, 1, .06], [24, 8, .08]];   // [wide, tall, weight]
    var val = new Float32Array(n), i, x, y;
    LEVELS.forEach(function (L) {
      var mx = L[0], my = L[1], w = L[2];
      var ox = Math.floor(Math.random() * mx), oy = Math.floor(Math.random() * my);
      var gx = Math.ceil((cols + mx) / mx) + 1, gy = Math.ceil((rows + my) / my) + 1;
      var g = new Float32Array(gx * gy);
      for (i = 0; i < g.length; i++) g[i] = Math.random();
      for (y = 0; y < rows; y++) {
        var rowBase = (((y + oy) / my) | 0) * gx;
        for (x = 0; x < cols; x++) val[y * cols + x] += w * g[rowBase + (((x + ox) / mx) | 0)];
      }
    });
    var idx = new Uint32Array(n);
    for (i = 0; i < n; i++) idx[i] = i;
    idx.sort(function (a, b) { return val[a] - val[b]; });
    var T = new Float32Array(n);                       // spread evenly over 0..1
    for (i = 0; i < n; i++) T[idx[i]] = i / n;
    return { cw: cw, ch: ch, cols: cols, rows: rows, n: n, T: T, st: new Uint8Array(n) };
  }

  function makeCanvas(color) {
    canvas = document.createElement("canvas");
    canvas.id = "pt-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = Math.max(1, window.innerWidth);
    canvas.height = Math.max(1, window.innerHeight);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    document.body.appendChild(canvas);
    field = buildField(canvas.width, canvas.height);
    jitter = new Float32Array(field.n);
    lastJitter = 0;
  }

  function fillRuns(code) {
    var f = field, st = f.st, y, x, x0;
    for (y = 0; y < f.rows; y++) {
      var base = y * f.cols;
      x = 0;
      while (x < f.cols) {
        if (st[base + x] !== code) { x++; continue; }
        x0 = x;
        while (x < f.cols && st[base + x] === code) x++;
        ctx.fillRect(x0 * f.cw, y * f.ch, (x - x0) * f.cw, f.ch);
      }
    }
  }

  /* p runs from 0 to TOTAL. mode "cover": blocks appear. mode "reveal": blocks go away. */
  var TOTAL = 1 + GHOST + 0.05;
  function paint(p, mode, now) {
    var f = field, n = f.n, T = f.T, st = f.st, i, s;
    if (now - lastJitter > 80) {                       // blocks near the edge of the wave flicker
      for (i = 0; i < n; i++) jitter[i] = (Math.random() - 0.5) * 0.07;
      lastJitter = now;
    }
    for (i = 0; i < n; i++) {
      var t = T[i] + jitter[i];
      s = p < t ? 0 : (p < t + GHOST ? 1 : 2);         // 0 not yet, 1 ghost, 2 done
      st[i] = mode === "cover" ? s : 2 - s;            // drawn as 0 clear, 1 ghost, 2 solid
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = GHOST_ALPHA;
    fillRuns(1);
    ctx.globalAlpha = 1;
    fillRuns(2);
  }

  function run(mode, ms, done) {
    var t0 = null;
    requestAnimationFrame(function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / ms), e = k * k * (3 - 2 * k);
      paint(e * TOTAL, mode, now);
      if (k < 1) requestAnimationFrame(frame); else if (done) done();
    });
  }

  function fade(mode, ms, done) {                      // reduced motion: a plain quick fade
    var t0 = null;
    requestAnimationFrame(function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / ms);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = mode === "cover" ? k : 1 - k;
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
  function exit(color, url) {
    busy = true;
    root.classList.add("pt-lock");
    makeCanvas(color);
    var after = function () {
      try { sessionStorage.setItem(KEY, JSON.stringify({ color: color, t: Date.now() })); } catch (e) {}
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  /* dominant colour of an image, favouring the vivid parts (a pink photo gives pink, not grey) */
  function sample(img) {
    try {
      var s = 32, c = document.createElement("canvas");
      c.width = c.height = s;
      var x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(img, 0, 0, s, s);
      var d = x.getImageData(0, 0, s, s).data, R = 0, G = 0, B = 0, W = 0;
      for (var i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 128) continue;
        var r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
        var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
        var sat = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
        var w = 0.02 + sat * sat * (1 - Math.abs(2 * l - 1));
        R += r * w; G += g * w; B += b * w; W += w;
      }
      if (!W) return null;
      return "#" + [R, G, B].map(function (v) { return ("0" + Math.round(v / W * 255).toString(16)).slice(-2); }).join("");
    } catch (e) { return null; }
  }

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
      color = (m && /^#[0-9a-f]{6}$/i.test(m.content)) ? m.content : DEFAULT_COLOR;
    }
    var img = a.querySelector("img");
    if (img) color = sample(img) || color;
    exit(color, u.href);
  });

  /* ============================================================
     4. ARRIVING ON A PAGE
     ============================================================ */
  onReady(function () {
    if (!incoming) return;
    busy = true;
    makeCanvas(incoming.color);
    ctx.fillRect(0, 0, canvas.width, canvas.height);   // solid cover, same colour as the pre-paint layer
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
