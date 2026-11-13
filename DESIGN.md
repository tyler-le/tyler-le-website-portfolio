---
name: Tyler Le — 3D Gallery
description: Production portfolio gallery at https://www.tylerle.dev/.
colors:
  gallery-ink: "#f3f0f8"
  gallery-muted: "#c1bdcb"
  gallery-dock: "#232630"
  gallery-focus-default: "#b4c8ff"
  google-surface: "#f7f8fa"
  google-ink: "#24282e"
  google-accent: "#b4c8ff"
  google-room: "#151820"
  coursera-surface: "#0056d2"
  coursera-ink: "#ffffff"
  coursera-accent: "#a6caff"
  coursera-room: "#10182a"
  amazon-surface: "#232f3e"
  amazon-accent: "#ffad42"
  amazon-room: "#131820"
  internships-surface: "#d2cdc3"
  internships-ink: "#32312d"
  internships-room: "#1a1917"
  ucsd-surface: "#182b49"
  ucsd-accent: "#ffcd00"
  ucsd-room: "#111925"
  clarity-surface: "#d5e6c6"
  clarity-ink: "#294c27"
  clarity-accent: "#badb9f"
  clarity-room: "#151d13"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(48px, 5vw, 84px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  identity:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  description:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "17px"
    lineHeight: 1.5
  back-body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  dock-label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 500
rounded:
  dock: "13px"
  dock-control: "7px"
  dock-item: "6px"
spacing:
  panel-block: "32px"
  panel-inline: "38px"
  dock-padding: "8px"
  dock-gap: "7px"
components:
  google-card:
    backgroundColor: "{colors.google-surface}"
    textColor: "{colors.google-ink}"
    height: "450px"
    width: "min(64vw, 1160px)"
    padding: "32px 38px"
  coursera-card:
    backgroundColor: "{colors.coursera-surface}"
    textColor: "{colors.coursera-ink}"
    padding: "32px 38px"
  project-preview-tab:
    textColor: "{colors.clarity-ink}"
    padding: "7px 10px"
  gallery-dock:
    backgroundColor: "{colors.gallery-dock}"
    rounded: "{rounded.dock}"
    padding: "8px"
  dock-item:
    textColor: "#c9cbd6"
    rounded: "{rounded.dock-item}"
    padding: "12px"
  dock-item-selected:
    backgroundColor: "{colors.google-accent}"
    textColor: "#151923"
    rounded: "{rounded.dock-item}"
    padding: "12px"
---

# Design System: Tyler Le — 3D Gallery

## Overview

**Creative North Star: "An experience gallery"**

The user selected the 3D Gallery as the production homepage. Six physical cards form a full-width perspective room, with soft cast shadows and tangible thickness. The room palette follows the selected experience. The selected gallery now occupies the root homepage source (`index.html`, `styles.css`, and `script.js`). Earlier designs are archived outside the repository; no comparison pages ship. This document records the promoted source and does not assert deployment status.

Google is first and current, followed by Coursera, Amazon, grouped Internships, UC San Diego education, and Clarity Networth. A left profile sidebar shows Tyler's name, portrait, current role, previous employers, and profile links only while Google is selected. It hides and becomes inert when browsing other cards. Google remains a normal experience card; there is no separate profile opening card. Coursera centers subscriptions and coupons; Google centers AI observability. Copy is direct, factual, and concise enough to fit each card back.

**Key Characteristics:**

- Six Google-first cards, with a left profile sidebar visible only for Google.
- True front/back rotation and complete back copy without scrolling or disclosure.
- A full-width perspective room with soft shadow and visible card thickness.
- Stable brand previews on receding neighbors.
- A compact dock, mobile picker, and Clarity screenshot switching inside its card.

## Colors

### Primary

The active experience sets the accent and room background. Google uses near-white with pale blue support; Coursera uses saturated blue; Amazon pairs navy and orange; UC San Diego pairs navy and yellow. Internships use a warm neutral. Clarity uses pale green with deep green text. Frontmatter values come from `script.js`; supporting tints are interface colors, not claims of official brand specifications.

### Neutral

Pale text and muted lavender-gray support the dark room. The compact dock uses its own dark neutral surface. Use the local company assets and their documented contrast treatments. Brand provenance is recorded in `images/SOURCES.md`. Clarity screenshots show sanitized demonstration data, with the demo label kept inside the project preview.

**The Active Room Rule.** Change room background, selected navigation, and focus accent together when selecting an experience; preserve each card's company palette.

## Typography

**Display and identity:** Space Grotesk. **Body, metadata, controls:** DM Sans. Both use sans-serif fallbacks. Space Grotesk deliberately continues the original identity; its familiarity is an acknowledged advisory, not a user rejection.

Gallery titles use medium-weight display type and tight tracking. The conditional profile sidebar uses an oversized name (76px by default, 88px on wide displays, 52px below 900px). At 650px and below, it becomes a compact single-column profile above the scene with a 35px name, current role beneath it, then a portrait/context row. Google retains the normal experience-card title layout. Back headings use (36px), then (31px) and (25px) at narrower breakpoints. Back body uses (16px), then (15px) and (14px), with brief paragraphs rather than resume bullets.

Fonts load locally through `fonts/fonts.css`; eight TTF files and the two OFL licenses cover Space Grotesk and DM Sans. Removed alternative fonts are not part of the shipped system.

## Layout

The exhibition keeps a full-width room; the conditional profile sidebar overlays its left side rather than reserving a grid column. The final desktop viewport is (650px) high with perspective (1300px); at (1800px) and above it becomes (720px) with perspective (1450px). At (900px) and below it is (610px); at (520px) and below it is (570px). Final declarations determine the conditional sidebar and full-width scene; earlier grid rules do not reserve a column.

JavaScript sets card width to (64%) of the viewport, capped at (1160px), or (83%) below (520px). Cards are (450px) high by default, (480px) on wide displays, (420px) below (900px), and (400px) below (520px). Interior padding scales from (32px 38px) to (27px), then (24px). All back copy fits in this area without an internal scroll or detail disclosure.

The selected card comes forward and tilts slightly; neighbors recede, showing stable brand artwork intended to remain visible and clickable. The Google-selected world shifts right (7vw), or (6vw) at 1800px and above and (10vw) below 900px, to clear the profile. On wide displays, the profile left edge uses `max(4vw, calc(50vw - 800px))` to keep it visually grouped with the card. At 650px and below, the profile moves above the room and that world shift is removed.

Neighbor spacing is (49%) of the viewport, capped at (900px), on desktop; (65%) below 800px and (59%) below 520px. At widths from 651px to 1799px, fixed preview anchors sit at (60%) on next cards and (40%) on previous cards with (70px) artwork. At 1800px and above they use (72%)/(28%) and (180px) artwork. At 650px and below they use (51%)/(49%), (80px) artwork, a (-90deg) rotation, and no minimum preview height. These are fixed CSS treatments, not measurement-driven resizing. Exposed-logo visibility remains an implementation verification concern; this document records the intended composition, not a test pass.

The content-width dock sits at the bottom center inside the room. Desktop labels become a native picker between arrows below (900px). There is no below-fold reading or project showcase section. Clarity's Net worth, Cash flow, and Investments controls switch the screenshot inside the project card.

## Elevation & Depth

Real perspective, Z translation, four thin edges, and independent front/back faces give cards physical thickness. Front and back faces sit (4px) from their center plane; edges are (8px) thick. Face shadow is (`6px 30px 65px -25px #000a`); dock shadow is (`0 14px 32px #0005`). A blurred elliptical ground shadow supports the room without a horizon or floor plane.

A fixed ambient light follows the pointer, and the camera adds slight translation and tilt. Card selection uses (.85s) and flipping uses (.8s), both with `cubic-bezier(.18,.8,.2,1)`. Reduced motion removes transitions and camera movement. Brand preview artwork retains its fixed responsive dimensions. Selection stages the handoff: preview opacity fades out over (.2s), full front content fades in over (.25s) after a (.28s) delay, and a receding card previews its brand after a (.25s) delay. Reduced motion removes these transitions.

## Shapes

Cards are broad square-edged planes. The compact dock and its controls use smaller rounded corners recorded in frontmatter. Company logos retain their recognizable shapes and source assets; contrast treatments follow the implementation. The Clarity preview is a small angled screen within its card, with a visible demo label and compact screenshot controls.

## Components

**Experience card:** Clicking the active main body flips either way; explicit controls support keyboard access. Neighbor clicks first select that experience. Links, screenshot controls, text selection, and dragging retain their own behavior. Inactive faces are excluded from normal keyboard access.

**Conditional profile sidebar:** A separate left aside includes Tyler's name, portrait, current Google AI Observability context, and previous Coursera/Amazon context. Resume, Contact, and LinkedIn links sit directly under the previous-company text beside the portrait. It contains no Clarity mention or project action; the project remains a separate destination. It is visible and interactive only while Google is selected. The Google front contains the experience itself; the profile is not inside it. On mobile the aside uses one column above the room: name, current role, then a portrait/context row with profile links beneath the previous-company text. Its layout explicitly resets archived sidebar rules.

**Card back:** Short, complete paragraphs appear immediately. There is no “Read experience,” “Show less,” scrolling reader, or progressive disclosure. Internships have three compact role summaries. UC San Diego is an education card, with the degree and instructional-assistant context on its back. About and Contact select Google and replace its back content; flipping back restores its normal summary. The resume remains separate; Clarity's back links to its GitHub repository.

**Project preview controls:** Three small buttons switch Net worth, Cash flow, and Investments screenshots in place. Selected state uses deep green with white text and `aria-pressed`. Screenshot interaction does not flip the card.

**Dock:** Selected label uses the current accent. Arrows disable at sequence boundaries. The mobile picker exposes the same six destinations, and a live status announces the current experience. Keyboard focus on the room highlights the compact dock rather than outlining the entire viewport.

## Do's and Don'ts

### Do:

- **Do** keep exactly six cards with Google current and first.
- **Do** show the left profile sidebar only while Google is selected, with a compact mobile row above the scene.
- **Do** keep back copy complete, direct, and short enough to fit without scrolling.
- **Do** use stable brand previews and screenshot controls inside the Clarity card.
- **Do** preserve the compact dock and mobile picker.

### Don't:

- **Don't** embed the profile in Google, add a separate profile card, or keep the sidebar visible for every experience.
- **Don't** add scrolling back readers, disclosure controls, or below-fold showcases.
- **Don't** draw a horizon or a floor plane behind the cards.
- **Don't** reposition or resize preview logos from runtime measurements.
- **Don't** turn UC San Diego back into a standalone teaching card or invent Google achievements.
