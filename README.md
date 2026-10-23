# Damiano Perrella — portfolio

A static website: plain HTML, CSS and JavaScript. No build step, no dependencies.

## Folder layout

```
index.html          Landing page: deals 3 random project cards
projects.js         ALL project content: the one file you edit to add or change a project
project/index.html  The template every project page uses (served at /project/?p=<slug>)
about/index.html    About page          (served at /about)
fate/index.html     Current planets     (served at /fate)
404.html            Page shown for broken links
manicule.svg        The floating hand
images/             Project images, one folder per project
README.md           This file
```

Folders with an `index.html` give clean URLs: `about/index.html` is `/about`.

## Adding or editing a project

1. Put the images in `images/<slug>/`, where `<slug>` is the project's address, for example `images/project-one/`.
   - `cover.jpg`: the image on the tarot card. Portrait, about 7:12 (for example 840 × 1440 px).
   - `01.jpg`, `02.jpg`, `03.jpg` …: the gallery, in the order you want them shown.
   - Save JPGs at about 2000 px on the long edge and around 80% quality, so each is a few hundred KB.
2. Open `projects.js` and add or edit the project's entry. The comment at the top of the file explains every field. In short:
   ```js
   {
     slug: "house-on-the-ridge",
     title: "House on the Ridge",
     cover: "images/house-on-the-ridge/cover.jpg",
     year: "2024", location: "Lisbon, Portugal", type: "Residential",
     client: "…", area: "220 m²", status: "Built", role: "Architect", credits: "…",
     description: ["First paragraph.", "Second paragraph."],
     images: [
       { src: "images/house-on-the-ridge/01.jpg", caption: "South elevation", w: 2000, h: 1333 }
     ]
   }
   ```
   Fields you leave out don't appear. `w` and `h` are the image's pixel size; they stop the page jumping while images load.
3. Commit and push. The landing page and the project page both read from `projects.js`, so nothing else needs editing.

The order of the list sets the Roman numeral on each card. A project with no description and no images shows "Coming soon".

## Publish with GitHub Pages

1. Create a repository and upload everything in this folder to the top level (`index.html` must sit at the root, not inside another folder).
   - For a site at `https://<username>.github.io`, name the repository `<username>.github.io`.
   - For your own domain, any repository name works.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select the `main` branch and the `/ (root)` folder, and save.
4. After a minute the site is live. For a custom domain, set it in the same Pages settings and add the DNS records GitHub shows you.

The pages link to `/about`, `/fate` and `/project/` from the site root, so they work at a domain root. They will not work if the site is served from a subfolder such as `username.github.io/repo-name`.

## Other things to edit

- **Colours and font:** all colours and the font are variables at the top of the CSS in each page (`:root`). The same block appears in every page, so change it in each.
- **About text:** edit `about/index.html`.
- **Manicule:** replace `manicule.svg`. Its size is `--manicule-w` at the top of the CSS in `index.html`.

## Local preview

Open `index.html` in a browser. The links to `/about`, `/fate` and `/project/` only work through a web server, so for a full preview run this from the folder and visit http://localhost:8000:

```
python3 -m http.server 8000
```
