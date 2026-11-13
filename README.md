# Tyler Le — Portfolio

[Visit tylerle.dev](https://www.tylerle.dev/)

An interactive portfolio built with HTML, CSS, and JavaScript. Six company-colored cards present work at Google, Coursera, and Amazon, grouped internships, education at UC San Diego, and the Clarity Networth personal project.

Click the active card to flip it for more detail, or select a neighboring card to bring it forward. Dragging, arrow keys, and the navigation dock also browse the gallery. The Google view includes a profile with resume, contact, and LinkedIn links. Clarity includes switchable product screenshots using demo data. The layout adapts for mobile and respects reduced-motion preferences.

## Run locally

No build step or dependencies are required to serve the site:

```sh
python3 -m http.server 4317 --bind 127.0.0.1
```

Open [localhost:4317](http://127.0.0.1:4317/).

## Project files

- `index.html`: homepage and navigation.
- `styles.css`: responsive layout, brand colors, perspective, and transitions.
- `script.js`: card content, flips, navigation, camera movement, and screenshot controls.
- `fonts/`: self-hosted fonts and licenses.
- `images/`: portraits, company logos, and demo screenshots; provenance in `images/SOURCES.md`.
- `files/Tyler_Le_Resume.pdf`: current downloadable resume.
- `tests/verify-gallery.cjs`: Playwright checks for navigation, flips, card text fit, images, and responsive layout at 320, 390, 1440, and 2540 pixels. Requires Node 20+ and Playwright; `PLAYWRIGHT_MODULE` can specify an existing installation.

The selected gallery is the homepage. Earlier design explorations and the comparison page are excluded from the site.

## Deployment

GitHub Pages publishes the root of `main` to [www.tylerle.dev](https://www.tylerle.dev/). Pushing to `main` triggers the Pages build and deployment. `CNAME` preserves the custom domain.
