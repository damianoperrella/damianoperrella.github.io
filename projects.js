/* ======================================================================
   PROJECTS — the one file you edit to add or change a project.
   The landing page cards and every project page read from this list.

   Each project:
     slug         the project's address: /project/?p=<slug>  (lowercase, hyphens)
     title        project name
     card         (optional) the image on the tarot card, e.g. "images/gone-with-the-cloud/card.jpg".
                  Crop it portrait (7:12). If left out, the cover is used.
     cover        the full-screen image at the top of the project page
                  (null = placeholder drawing). A landscape image suits it best.
     heroPosition (optional) which part of the cover stays in view when it is cropped
                  to the screen, as "x% y%", e.g. "50% 64%". Default "50% 50%".
     subtitle     (optional) a line under the title
     year, location, type, studio, instructors, team, client, area, status, role, credits
                  any you leave out simply don't appear on the page
     descriptionTitle  (optional) a heading above the description
     description  a list of paragraphs
     content      what appears below, in order. Two kinds of item:

       an image:  { src: "images/project-one/01.jpg", caption: "South elevation",
                    w: 2000, h: 1333, size: "wide", align: "left" }
       a text:    { heading: "Optional heading", text: "A paragraph set between the images.", size: "small", align: "right" }

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
    slug: "gone-with-the-cloud",
    title: "Gone with the Cloud",
    subtitle: "A Climate Institute for Governors Island Data Centre and Public Library",
    card: "images/gone-with-the-cloud/card.jpg",          // the pink model: the tarot card
    cover: "images/gone-with-the-cloud/site-plan.webp",   // the full-screen image at the top of the page
    heroPosition: "50% 45%",                              // which part of the full-screen image stays in view
    year: "2026",
    location: "Governors Island, New York City",
    type: "Academic project",
    studio: "Architecture Design and Construction Studio",
    instructors: "Klaus Hugo Steffan, Elisa Maruelli",
    team: "Damiano Perrella, Isabelle Pinault, Evgeniia Vlasova",
    descriptionTitle: "A Digital-Industrial Consciousness",
    description: [
      "In the bustling metropolis of New York City, it is easy to forget the anthropological effect of urbanism and contemporary life. A new trend has emerged where any piece of data can be preserved in the seemingly never-ending “cloud.” However, this invisible entity has a physical presence in the data center. This has created architecture for machines, going far beyond what has been imagined by radical architects. However, these buildings are not neutral spaces. When poorly designed, they continuously emit heat, take potable water from thirsty citizens, and draw endlessly on the electrical grid.",
      "In response to these issues, Gone with the Cloud is imagined as a tensile metal structure balanced on two massive steel piers that must reckon with its effect on the natural world. Located in one of the deepest sections of the Buttermilk Channel, it is threatened by sea level rise. The building is designed vertically with a data center below a library. Therefore, once the data habits across the world have sufficiently melted the icebergs, the data center will itself be “gone with the clouds.”"
    ],
    content: [
      {"src": "images/gone-with-the-cloud/cranes.jpg", "caption": "Industrial infrastructure adjacent to Governors Island including shipping cranes and warehouses", "w": 1600, "h": 1068, "size": "wide"},
      {"src": "images/gone-with-the-cloud/crane-diagram.webp", "caption": "Crane diagram", "w": 2400, "h": 1892, "size": "half"},
      {"src": "images/gone-with-the-cloud/program-axo.webp", "caption": "Spatial organization and formal logic", "w": 2400, "h": 1635, "size": "half"},
      {"heading": "A Precarious | Balanced | Tensile Structure", "text": "The building is constructed with a steel frame that is organized around the 2 piers. Each mass (the data center and the library) has a separate frame grid, which is supported by primary columns. These columns carry the load to the roof and are connected to steel cables and eventually to the massive central piers. The two piers carry the load to the sea floor, which is fortified with a concrete pad and piles that sit on New York’s bedrock.", "size": "small"},
      {"src": "images/gone-with-the-cloud/structure-axo.webp", "caption": "Structure", "w": 2600, "h": 1919, "size": "large"},
      {"src": "images/gone-with-the-cloud/model-1.jpg", "caption": "Model", "w": 1600, "h": 1063, "size": "half"},
      {"src": "images/gone-with-the-cloud/model-2.jpg", "caption": "Model, detail", "w": 2400, "h": 1596, "size": "half"},
      {"src": "images/gone-with-the-cloud/structural-axo.webp", "caption": "Structural Axonometric", "w": 2702, "h": 2461, "size": "large", "align": "center"},
      {"src": "images/gone-with-the-cloud/corner-detail.webp", "caption": "Corner Detail", "w": 2400, "h": 1710, "size": "large"},
      {"src": "images/gone-with-the-cloud/exploded-axo.webp", "caption": "Exploded Axonometric", "w": 2000, "h": 2738, "size": "small", "align": "right"},
      {"heading": "Circular Construction", "text": "The building is conceived as a circular structure which is built with recycled materials, can be completely remodelled and repurposed, and then eventually decommissioned. The steel is recycled from decommissioned shipping cranes, the insulation is made from recycled denim, and concrete rubble created from the demolition of buildings on the island will be used to support the 1 Billion Oyster Project. Eventually, the building can be remodeled for different uses. For example, when the data center inevitably becomes obsolete due to newer technology, the floors can be retrofitted. All the steel can be disconnected and recycled for new projects.", "size": "small"},
      {"src": "images/gone-with-the-cloud/circularity.webp", "caption": "Circularity diagram", "w": 2000, "h": 2335, "size": "large"},
      {"src": "images/gone-with-the-cloud/plan-l1-l3.webp", "caption": "Level 1 & 3, Data Center", "w": 1682, "h": 1564, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l2.webp", "caption": "Level 2, Data Center", "w": 1676, "h": 1558, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l4.webp", "caption": "Level 4, Library", "w": 1705, "h": 1558, "size": "half"},
      {"src": "images/gone-with-the-cloud/plan-l5.webp", "caption": "Level 5, Library", "w": 1706, "h": 1559, "size": "half"},
      {"src": "images/gone-with-the-cloud/sections.webp", "caption": "Sections, 1:200", "w": 3400, "h": 2089, "size": "wide"},
      {"src": "images/gone-with-the-cloud/details.webp", "caption": "Details, 1:20", "w": 3400, "h": 2778, "size": "wide"},
      {"src": "images/gone-with-the-cloud/perspective.webp", "caption": "Perspective", "w": 2400, "h": 3395, "size": "large", "align": "center"},
      {"src": "images/gone-with-the-cloud/interior-1.webp", "caption": "Interior perspective", "w": 2481, "h": 3023, "size": "half"},
      {"src": "images/gone-with-the-cloud/interior-2.webp", "caption": "Interior perspective", "w": 2000, "h": 2829, "size": "half"}
    ]
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
