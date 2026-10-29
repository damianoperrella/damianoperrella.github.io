# Damiano Perrella — portfolio

A static website: plain HTML, CSS and JavaScript. No build step, no dependencies.

The landing page ("The Table") has the casino felt, tarot cards and floating hand.
Every other page is clean: white, Helvetica, dark ink.

## Folder layout

```
index.html          Landing page: deals 3 random project cards
about/index.html    About page          (served at /about)
cards/index.html    All Cards page      (served at /cards)
fate/index.html     Current planets     (served at /fate)
project/index.html  The template every project page uses (/project/?p=<slug>)
404.html            Page shown for broken links
projects.js         ALL project content: the one file you edit to add or change a project
clean.css           The white look shared by every page except the landing page
site.js             The live clock and the pixel transition between pages
manicule.svg        The floating hand
images/             Project images, one folder per project
README.md           This file
```

Folders with an `index.html` give clean URLs: `about/index.html` is `/about`.
Keep `index.html`, `site.js`, `clean.css`, `projects.js` and `manicule.svg` together: pages load each other.

## Adding or editing a project

1. Put the images in `images/<slug>/`, where `<slug>` is the project's address, for example `images/gone-with-the-cloud/`.
   - `card.jpg`: the portrait crop (7:12) shown on the tarot card.
   - A full-screen image for the top of the page (`cover` in `projects.js`). A landscape image suits it best; `heroPosition` chooses which part stays in view.
   - The gallery images, in any order you like. Photos as JPG (about 2400 px wide, quality 85), drawings as WebP (about 2400–3600 px wide) or PNG. Crop the white margins off drawings so they line up with the page.
2. Open `projects.js` and add or edit the project's entry. The comment at the top of the file explains every field.
3. Commit and push. The landing page and the project page both read from `projects.js`, so nothing else needs editing.

Leave `caption: ""` for just the number, or leave `caption` out to show nothing.

Click any gallery image to enlarge it: click again for full size, drag to pan, arrow keys for the next image, Esc to close.

If the full-screen image is dark, add `heroInk: "light"` so the name, clock and back link turn white while it is on screen. Facts such as `published` can be a list of lines.

Text blocks can have a heading (and `text` can be a list of paragraphs): `{ heading: "Circular Construction", text: "…", size: "small" }`.

Projects One to Nine ("Gone with the Cloud", "Saltscapes", "Cross-Border Chronotopia", "Sackett St. Townhouse", "Photography", "Brooklyn Symphony Orchestra", "MADERA", "Urban Pat(c)h(es)", "Grand St. Townhouse") are filled in as the worked example.

```js
{
  slug: "house-on-the-ridge",
  title: "House on the Ridge",
  subtitle: "A house for two",
  card: "images/house-on-the-ridge/card.jpg",
  cover: "images/house-on-the-ridge/cover.jpg",
  heroPosition: "50% 60%",
  year: "2024", location: "Lisbon, Portugal", type: "Residential",
  client: "…", area: "220 m²", status: "Built", role: "Architect", credits: "…",
  description: ["First paragraph.", "Second paragraph."],
  content: [
    { src: "images/house-on-the-ridge/01.jpg", caption: "South elevation", w: 2000, h: 1000, size: "full" },
    { src: "images/house-on-the-ridge/02.jpg", caption: "Ground floor plan", w: 1500, h: 1500, size: "half" },
    { heading: "The plan", text: "A few words about the plan.", size: "half" },
    { src: "images/house-on-the-ridge/03.jpg", caption: "Detail", w: 1000, h: 1500, size: "small", align: "right" }
  ]
}
```

**Sizes.** Each image or text in `content` has a `size`:

| size    | width                                           |
|---------|-------------------------------------------------|
| `full`  | edge to edge, the whole width of the screen     |
| `wide`  | the full width inside the page margins (default)|
| `large` | two thirds                                      |
| `half`  | half; two halves in a row sit side by side      |
| `small` | one third; a `small` and a `large` fit one row  |
| `quarter` | one quarter; four sit in a row (good for short texts) |

`align` (`left`, `center` or `right`) places an item that is narrower than the page.
`w` and `h` are the image's pixel size; they stop the page jumping while images load.
On a phone everything is full width. Fields you leave out don't appear.

The order of the list sets the Roman numeral on each card. A project with no description and no content shows "Coming soon".

## Publish with GitHub Pages

1. Create a repository and upload everything in this folder to the top level (`index.html` must sit at the root, not inside another folder).
   - For a site at `https://<username>.github.io`, name the repository `<username>.github.io`.
   - For your own domain, any repository name works.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select the `main` branch and the `/ (root)` folder, and save.
4. After a minute the site is live. For a custom domain, set it in the same Pages settings and add the DNS records GitHub shows you.

The pages link to `/about`, `/fate` and `/project/` from the site root, so they work at a domain root. They will not work if the site is served from a subfolder such as `username.github.io/repo-name`.

## The page transition

Clicking any link that leaves the current page covers the screen in rectangular pixels of one colour, in many sizes. The next page opens covered and the pixels dissolve away. It is all in `site.js`.

- **Colour:** clicking a project card uses the dominant colour of its cover image. Any other link uses the colour of the page you are on: green on the landing page, the colour of the project's image on a project page, near-black elsewhere. Change a page's default with `<meta name="pt-color" content="#rrggbb">` in its `<head>`.
- **Timing and feel:** the constants at the top of `site.js` (`EXIT_MS`, `ENTER_MS`, `HOLD_MS`) set how long it runs. The sizes of the blocks are the `LEVELS` list in `buildField`.
- **Reduced motion:** visitors who ask their device for reduced motion get a quick fade instead.
- Ctrl/Cmd-click, new-tab and external links are left to the browser.

## Other things to edit

- **Colours and font:** the landing page's colours and font are variables at the top of its CSS (`:root`). The clean pages share `clean.css`; change `--bg`, `--ink` and `--font` there (the page background is white, `#ffffff`).
- **About text:** edit `about/index.html`.
- **Manicule:** replace `manicule.svg`. Its size is `--manicule-w` at the top of the CSS in `index.html`.

## Local preview

Open `index.html` in a browser. The links to `/about`, `/fate` and `/project/` only work through a web server, so for a full preview run this from the folder and visit http://localhost:8000:

```
python3 -m http.server 8000
```
