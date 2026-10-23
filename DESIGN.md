---
name: Leonardo Burbano Portfolio
description: A keynote-style stage for a production AI engineer: near-black, warm white, one blue gradient, no boxes.
colors:
  stage: "#050608"
  stage-raised: "#0d1017"
  ink: "#f5f5f7"
  ink-muted: "#8e8e93"
  hairline: "rgba(255,255,255,0.11)"
  blue-500: "#3d6ef5"
  blue-400: "#4f9cf0"
  blue-300: "#5ccbe6"
  paper: "#fbfbfd"
  paper-raised: "#f5f5f7"
  paper-ink: "#1d1d1f"
  paper-ink-muted: "#6e6e73"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 11vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.1vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  hairline: "3px"
  media: "4px"
  pill: "9999px"
spacing:
  section: "112px"
  row: "40px"
  gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.blue-500}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12.8px 22.4px"
  link-chevron:
    textColor: "{colors.blue-400}"
---

## Overview

**Creative North Star: "The Keynote Stage."** The page is a product launch where the product is a production engineer. Proof is set at keynote scale on a near-black stage, in the register of Apple and NVIDIA product pages, with the user's blue-gradient reference as the only color event. The visitor is mixed (recruiters, clients, community organizers) and arrives cold from LinkedIn; the one action is Connect on LinkedIn.

The system refuses boxes. Content is separated by space and 1px hairlines, never cards, chips, or rounded containers. Dark is the default theme (a stage, lit from above); a light theme mirrors it on `#fbfbfd`.

## Colors

- **Stage / Ink:** `#050608` ground, `#f5f5f7` warm-white type, `#8e8e93` for secondary text. Alternating sections lift to `#0d1017`.
- **Blue gradient:** `#3d6ef5 → #4f9cf0 → #5ccbe6`. One gradient phrase per screen (hero subtitle, case-study title phrase), the primary pill, the orchestrator node, and the scroll-progress bar. Nothing else is blue-filled; links use `blue-400`.
- **Stage light:** a single soft blue radial light falling from above the hero (and mirrored under the contact block).
- Light theme swaps to paper (`#fbfbfd`), ink `#1d1d1f`, muted `#6e6e73`; primary becomes `#2f62e8` for contrast.

## Typography

Geist Sans throughout, applied on `body` through `var(--font-geist-sans)`. Display and headlines use weight 700 at -0.04em. The lead style (gray sentence with the claim in foreground via `<strong>`) carries the case-study narrative. Labels are small tracked uppercase, used only for the stack line. Body measure stays under 65ch.

## Layout

One 1080px column with 20px gutters. Sections are separated by generous vertical space (80px mobile, 112px desktop) and alternate between `stage` and `stage-raised`. Lists (experience, projects, speaking, writing, events) are hairline rows on a `180px / 1fr / auto` grid, never cards. The case-study metrics sit in one four-column row on a single hairline. The architecture diagram runs full width above a two-column list.

## Elevation & Depth

Flat. Depth comes from the ground change between sections, the stage light, and the blur of the sticky top bar. No shadows.

## Shapes

Square-leaning: diagram nodes at 3px, media at 4px, the only fully round forms are the primary pill and the profile photo. The LinkedIn post previews are the single boxed exception (they imitate LinkedIn's own cards).

## Components

- **Primary button:** gradient pill, white label, brightens on hover, scales to 0.98 on press.
- **Chevron link:** `blue-400` text with a chevron that nudges right on hover.
- **Top bar:** 48px, text links in 13px, translucent blurred background after scroll; EN/ES as plain text toggle.
- **Company marks:** monochrome (black on light, white on dark), square icons set beside their name.
- **Hero motion:** one authored moment — the hero resolves from a soft blur. Sections only fade up once on scroll. `prefers-reduced-motion` disables both.

## Do's and Don'ts

- Do keep one gradient phrase per screen.
- Do separate content with hairlines and space.
- Don't add cards, chips, eyebrows above headings, or shadows.
- Don't use blue as a fill except the pill and the orchestrator node.
- Don't let a section begin with a different left edge: everything aligns to the 1080px column.
