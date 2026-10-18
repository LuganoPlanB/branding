---
name: Plan B — Civic Digital Commons
description: Shared visual reference for civic technology.
colors:
  canvas: "#fffefa"
  canvas-alt: "#f3f9ff"
  panel: "#fcfcfc"
  panel-strong: "#f3f8fd"
  text: "#030b20"
  text-soft: "rgba(3, 11, 32, 0.72)"
  accent: "#4f97e9"
  accent-soft: "#b0d3f1"
  accent-strong: "#082952"
  highlight: "#ffb604"
  neon-cyan: "#23f5ff"
  neon-violet: "#7468ff"
  neon-pink: "#ff5db1"
  brand-night: "#082952"
typography:
  display:
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(3rem, 6vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif'
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Consolas, SFMono-Regular, monospace"
    fontSize: "0.87rem"
rounded:
  card: "12px"
  panel: "16px"
  pill: "999px"
spacing:
  section: "56px"
  grid: "16px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-outline:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  application-panel:
    backgroundColor: "{colors.panel-strong}"
    rounded: "{rounded.panel}"
    padding: "36px"
---

# Design System: Plan B

## Overview

**Creative North Star: "Civic Digital Commons"**

An open, capable, curious and grounded civic identity. Warm reading surfaces, strong Inter typography and restrained color make public technology approachable; a small electric gesture supplies energy. This is the inherited Civic Digital Commons, confirmed for code-first documentation, not a replacement identity.

Authority: [source boundaries](docs/sources.md) and [recorded revisions](provenance.json). The frontmatter is a compact light-theme reference. Complete extracted light/dark CSS values live in [theme tokens](tokens/tokens.json); geometry and spacing come separately from [layout recommendations](tokens/layout.css). These recommendations do not redefine the Vite theme’s component API.

**Key Characteristics:**

- Warm canvas and navy structure.
- Weight before ornament; open sections before extra containers.
- One coordinated energy signal, with accessible semantic alternatives.

## Colors

Primary: Lugano Night (`accent-strong`, `brand-night`) structures headings, actions and logo grounds. Civic Sky (`accent`) supports interaction and structure; Civic Mist (`accent-soft`) supplies a soft companion.

Secondary: Commons Gold (`highlight`) marks selective emphasis. Network Cyan, Assembly Violet and Signal Pink form one coordinated electric gesture, not independent decoration.

Neutral: Warm Canvas is the default page ground, Cool Canvas organizes secondary regions, Civic Ink carries text, and soft text reduces emphasis. Panel tones group practical examples.

**The One Signal Rule.** Choose gold or a gradient as the exceptional signal; keep text on a solid readable ground.

The fixed palette specimens continue to show source light colors when the surrounding page switches theme. Dark semantic values use charcoal, white, Civic Coral and Bitcoin Orange; read their exact values and different gradient stops from the token files. The frontmatter is not a replacement dark palette.

Presentation editions carry the same light and dark semantic palettes into all eleven layouts. Native Network Energy gradient bands appear on every layout, including Blank, with larger accents on covers, section dividers and quotations. Text stays on solid backgrounds. The cover’s SVG logo, values text, background panel and larger top gradient are separate selectable slide objects. Logo-library slides provide the wide, square and tall originals in all three color variants. Shared footer text belongs once to the parent Slide Master so a single edit updates every slide.

## Typography

### Font family: Inter

[Inter](https://rsms.me/inter/) is self-hosted as an upright Latin variable WOFF2 (weights 100–900), with its SIL Open Font License 1.1. The web fallback stack is "Inter", "Segoe UI", Arial, sans-serif. Strong display and section headings use ExtraBold 800; titles and navigation use Bold 700; body copy uses Regular 400 with generous leading. Code and values use Consolas, "SFMono-Regular", monospace. Use font-display: swap and check character coverage when adding languages; obtain true italic files separately when needed.

Slide fonts use the supplied static Inter Regular (400) and Bold (700). Install both and restart the presentation app; fonts are not embedded in the PPTX/POTX. If installation is unavailable, explicitly replace Inter throughout with Segoe UI or Arial and inspect wrapping and overflow. Presentation apps do not use CSS fallback stacks.

The frontmatter records the implemented desktop display and section hierarchy. Display type steps to 3.3rem at 900px and 3rem at 640px. Ordinary paragraphs stop at 70ch; introductory copy is tighter at 48ch. Prefer solid-color headings; the legacy heading gradient is presented as a surface specimen.

## Layout

Shared recommendations: a reading container of 1180px, a 56px section rhythm and a 16px grid gap. These are guidance from the inherited DESIGN.md, separate from extracted runtime theme values; data applications may need wider layouts.

This reference implements 20px side gutters, an asymmetric two-column introduction and open editorial sections. Local specimen grids use their own gaps. At 900px the layout tightens; at 640px gutters become 12px, major columns and logo specimens stack, navigation wraps, sections use 40px vertical padding, and the core palette stays two columns. Controls retain at least 44px height. Surface-specific reading order belongs in `.impeccable/surfaces/index.md`.

## Elevation & Depth

The reference is predominantly flat: pale tonal fields, restrained dividers and whitespace provide grouping. The extracted panel shadow tokens remain available for consuming applications, but the live application panel does not use them. Do not turn those available tokens into an instruction to shadow every section.

## Shapes

Gently rounded cards and panels use the frontmatter geometry; compact actions use pill corners. Dot and short-band SVGs are new reusable expressions of existing theme geometry, not official logos. Keep their use sparse.

## Components

Primary actions pair semantic strong-accent backgrounds with canvas text, pill corners and a 44px minimum height. Hover adds an underline and slightly reduces brightness. Outline controls use the strong border and transparent background. Keyboard focus uses a 3px violet outline with a 5px offset.

Navigation is text-led, wrapping on mobile. Copyable palette buttons show names and values; the fixed swatches preserve their literal source colors. Practical examples use a quiet panel with open spacing. There are no text-input primitives in this reference.

**The Intact Mark Rule.** Preserve original artwork and choose its ground: color and white variants on navy; black variants on pale canvas.

Color originals include white lettering. Black variants can retain orange. The wide white mark has different bounds; never force it to match another variant’s dimensions. Breathing room is an application recommendation, not an invented official clear-space specification. Respect existing asset rights.

Logo-stage backgrounds transition over 0.2s; navigation scrolls smoothly. Reduced-motion preferences disable transitions and smooth scrolling. Essential reference content remains available without JavaScript; copy, theme and variant controls are progressive enhancements.

## Do's and Don'ts

- Do preserve original SVG bytes, proportions and view boxes.
- Do use navy grounds for color and white marks, and pale grounds for black marks.
- Do retain visible keyboard focus and readable contrast in both themes.
- Do distinguish extracted theme values from layout recommendations.
- Don't recolor, crop, stretch or add effects to original marks.
- Don't use Civic Sky as ordinary text on white.
- Don't scatter every accent through a composition or set body copy over gradients.
- Don't imply that Lugano’s Plan ₿ marks are a newly designed Foundation logo or that partner marks confer endorsement.
