/* ======================================================================
   PROJECTS — the one file you edit to add or change a project.
   The landing page cards and every project page read from this list.

   Each project:
     slug         the project's address: /project/?p=<slug>  (lowercase, hyphens)
     title        project name
     cover        the image on the tarot card AND the full-screen image at the top
                  of the project page, e.g. "images/project-one/cover.jpg"
                  (null = placeholder drawing). A landscape image suits the
                  full-screen view best; the card crops it to portrait.
     year, location, type, client, area, status, role, credits
                  any you leave out simply don't appear on the page
     description  a list of paragraphs
     content      what appears below, in order. Two kinds of item:

       an image:  { src: "images/project-one/01.jpg", caption: "South elevation",
                    w: 2000, h: 1333, size: "wide", align: "left" }
       a text:    { text: "A paragraph set between the images.", size: "small", align: "right" }

       size   how wide the item is (default "wide")
                "full"   edge to edge, the whole width of the screen
                "wide"   the full width of the page margins
                "large"  two thirds
                "half"   half. Two halves in a row sit side by side
                "small"  one third. A small and a large fit in one row
       align  "left" (default), "center" or "right": where it sits when it is
              narrower than the page
       w, h   the image's pixel size. They stop the page jumping while images load.
              (src: null = placeholder drawing)

   A project with no description and no content shows "Coming soon".
   The order of this list sets the Roman numeral on each card.
   ====================================================================== */

const PROJECTS = [
  {
    slug: "project-one",
    title: "Project One",
    cover: null,
    year: "2024",
    location: "City, Country",
    type: "Residential",
    client: "Client name",
    area: "000 m²",
    status: "Built",
    role: "Architect",
    credits: "Structural engineer: Name. Landscape: Name. Photography: Name.",
    description: [
      "Placeholder text. Replace this with a first paragraph about the brief: who the project was for, what they asked, and the conditions of the site.",
      "Placeholder text. A second paragraph can explain the main ideas: how the building is organised, the materials, the way light and structure are used.",
      "Placeholder text. A third paragraph can cover the outcome, the construction, or anything that doesn't fit in the facts above."
    ],
    /* 18 placeholder images and 3 text blocks, in a mix of sizes to show what the layout can do.
       Replace this with your own list, for example:
       content: [
         { src: "images/project-one/01.jpg", caption: "South elevation", w: 2000, h: 1000, size: "full" },
         { src: "images/project-one/02.jpg", caption: "Ground floor plan", w: 1500, h: 1500, size: "half" },
         { text: "A few words about the plan.", size: "half" }
       ]                                                                                          */
    content: placeholderContent()
  },
  { slug: "project-two",   title: "Project Two",   cover: null },
  { slug: "project-three", title: "Project Three", cover: null },
  { slug: "project-four",  title: "Project Four",  cover: null },
  { slug: "project-five",  title: "Project Five",  cover: null },
  { slug: "project-six",   title: "Project Six",   cover: null },
  { slug: "project-seven", title: "Project Seven", cover: null }
];

/* ----------------------------------------------------------------------
   Helpers shared by the pages. You shouldn't need to touch anything below.
   ---------------------------------------------------------------------- */

function toRoman(n) {
  const map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

/* placeholder cover: a simple architectural line drawing */
function placeholderCover(i) {
  const h = [38, 200, 350, 150, 270, 20, 90][i % 7];
  const apex = 70 + (i * 17) % 50;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${h} 30% 30%)"/>
      <stop offset="1" stop-color="hsl(${h} 25% 7%)"/></linearGradient></defs>
    <rect width="300" height="400" fill="url(#g)"/>
    <g fill="none" stroke="hsl(${h} 45% 72%)" stroke-opacity=".65" stroke-width="1.4">
      <path d="M40 340V170L150 ${apex}L260 170V340Z"/>
      <path d="M40 170H260M150 ${apex}V340"/>
      <rect x="110" y="250" width="40" height="90"/>
      <rect x="175" y="200" width="50" height="50"/>
      <path d="M20 340H280"/>
    </g></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* placeholder gallery image of any size: an elevation, a section or a plan */
function placeholderPlate(i, w, h) {
  const hue = [38, 200, 350, 150, 270, 20, 90][i % 7];
  const line = `hsl(${hue} 45% 74%)`;
  const X = f => (f * w).toFixed(1), Y = f => (f * h).toFixed(1);
  let g = "";
  if (i % 3 === 0) {                                   // elevation
    g = `<path d="M${X(.12)} ${Y(.8)}H${X(.88)}"/>
         <path d="M${X(.22)} ${Y(.8)}V${Y(.42)}L${X(.5)} ${Y(.24)}L${X(.78)} ${Y(.42)}V${Y(.8)}"/>
         <path d="M${X(.22)} ${Y(.42)}H${X(.78)}M${X(.5)} ${Y(.24)}V${Y(.8)}"/>
         <rect x="${X(.28)}" y="${Y(.52)}" width="${X(.1)}" height="${Y(.28)}"/>
         <rect x="${X(.58)}" y="${Y(.5)}" width="${X(.14)}" height="${Y(.14)}"/>`;
  } else if (i % 3 === 1) {                            // section with a stair
    let d = `M${X(.15)} ${Y(.8)}`;
    for (let k = 0; k < 8; k++) d += `H${X(.15 + (k + 1) * .045)}V${Y(.8 - (k + 1) * .055)}`;
    g = `<path d="${d}"/>
         <path d="M${X(.12)} ${Y(.8)}H${X(.88)}"/>
         <path d="M${X(.15)} ${Y(.8)}V${Y(.25)}H${X(.85)}V${Y(.8)}"/>
         <path d="M${X(.6)} ${Y(.25)}V${Y(.8)}M${X(.15)} ${Y(.5)}H${X(.45)}"/>`;
  } else {                                             // plan
    g = `<rect x="${X(.15)}" y="${Y(.2)}" width="${X(.7)}" height="${Y(.6)}"/>
         <path d="M${X(.5)} ${Y(.2)}V${Y(.8)}M${X(.15)} ${Y(.55)}H${X(.5)}M${X(.5)} ${Y(.4)}H${X(.85)}"/>
         <rect x="${X(.15)}" y="${Y(.2)}" width="${X(.7)}" height="${Y(.6)}" transform="translate(${X(.03)} ${Y(.03)})" opacity=".35"/>`;
  }
  const n = String(i + 1).padStart(2, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 30% 30%)"/>
      <stop offset="1" stop-color="hsl(${hue} 25% 8%)"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <g fill="none" stroke="${line}" stroke-opacity=".7" stroke-width="${(w * .0022).toFixed(1)}">${g}</g>
    <text x="${X(.05)}" y="${Y(.94)}" fill="${line}" fill-opacity=".7" font-family="Helvetica, Arial, sans-serif"
          font-size="${(w * .022).toFixed(0)}" letter-spacing="${(w * .004).toFixed(1)}">PLACEHOLDER ${n}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* the demo layout for Project One: 18 images and 3 text blocks in a mix of sizes */
function placeholderContent() {
  const img = (w, h, size, align) => ({ src: null, caption: "Image caption", w, h, size, align });
  const txt = (text, size, align) => ({ text, size, align });
  const lorem = "Placeholder text. A few sentences set between the images: a note about a detail, a material, or the way two rooms meet.";
  return [
    img(2000, 900, "full"),
    txt(lorem, "small"),
    img(1000, 1400, "half", "right"),
    img(1500, 1000, "wide"),
    img(1200, 1200, "half"), img(1200, 1200, "half"),
    img(1000, 1500, "small", "right"),
    img(1500, 1000, "large"),
    img(1500, 1000, "half"), img(1000, 1500, "half"),
    img(2000, 1000, "full"),
    txt(lorem, "small", "right"),
    img(1500, 1000, "wide"),
    img(1000, 1200, "small"), img(1500, 1000, "large"),
    img(1500, 1000, "half"), img(1500, 1000, "half"),
    img(1500, 1125, "wide"),
    txt(lorem, "half"), img(1000, 1500, "half"),
    img(2000, 1000, "full")
  ].map((item, i, all) => {
    if (item.src === null) {                            // number the images 1..18
      item.caption = "Image caption " + (all.slice(0, i + 1).filter(x => "src" in x).length);
    }
    return item;
  });
}
