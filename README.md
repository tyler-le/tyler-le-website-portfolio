# Tyler Le portfolio — local design exploration

[Website](https://www.tylerle.dev/) · [3D Gallery](https://www.tylerle.dev/options/gallery.html) · [Design comparison](https://www.tylerle.dev/compare.html)

A personal portfolio with interactive experience cards and alternative layouts. The original `index.html`, `styles.css`, and `script.js` are preserved; the gallery and comparison use separate pages.

Run `python3 -m http.server 4317 --bind 127.0.0.1` from this directory, then open http://127.0.0.1:4317/compare.html. No build or package installation is needed.

The comparison includes:

- **3D Gallery** (`options/gallery.html`): the preferred direction. Six company-colored cards rotate through a full-width perspective scene. Click the active card to flip; click a neighboring card to select it. Drag, arrow keys, and the compact dock also browse. The profile appears alongside Google only. Complete back summaries fit within each card. The Personal Project card contains interactive Clarity Networth product previews using demo data.
- **Kinetic scroll** (`options/kinetic.html`): large moving typography and scrolling experience panels.
- **Post-it board** (`options/board.html`): organized notes with explicit topics and experience stories.
- **Chapters** (`options/chapters.html`): composed screens with an expanded experience index.
- **Original**: the preserved production page.

Google is framed as the current role in AI Observability from December 2026. Coursera spans January–December 2026, focused on subscriptions and coupons; Amazon ended January 2026. Internships share one gallery card, UC San Diego represents education, and Clarity Networth is the featured personal project. The supplied updated PDF is `files/Tyler_Le_Resume.pdf`.

`options/gallery.js` owns the gallery's concise copy and interactions. Other alternatives share narrative content in `options/stories.js`. Fonts and company logos are local; image provenance is in `images/SOURCES.md`. Earlier design experiments remain in `options/` but are omitted from comparison navigation. `options/build.py` regenerates only the early alternatives and should not be used to regenerate the current gallery.

`options/verify-gallery.cjs` checks gallery navigation, flips, exposed neighbor selection, back text fit, responsive layout, and Clarity screenshot switching at desktop and mobile widths. It uses Playwright with Node 20+, optionally resolving Playwright through `PLAYWRIGHT_MODULE`.
