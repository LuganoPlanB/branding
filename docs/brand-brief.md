# Plan B Foundation — maker brief

North star: the Civic Digital Commons. Technology that a city and its people can call their own. Serve citizens, public servants, civic hackers, designers and developers. Be open, capable, curious and grounded.

Start light: Warm Canvas #fffefa, Civic Ink #030b20, Lugano Night #082952, Civic Sky #4f97e9. Commons Gold #ffb604 is a scarce signal. Use ink on blue and gold; warm white on navy. Do not use Civic Sky as ordinary text on white.

Network energy: linear-gradient(90deg, #ffb604 0%, #ff5db1 28%, #7468ff 58%, #23f5ff 100%). Use a small dot, short band or deliberate specimen. Choose gold or the gradient as the exceptional signal; do not scatter all accent colors through a composition. Prefer solid headings.

Dark mode is an optional alternative: canvas #171717, panel #211d1d, white text, Civic Coral #e15364 and Bitcoin Orange #f7931a. Cyan, violet and pink stay constant. Use the dark gradient values from tokens/tokens.json; their stops differ from light mode.

Fonts: Inter (https://rsms.me/inter/) is the primary family. Web fallback stack: "Inter", "Segoe UI", Arial, sans-serif. Display and headings use ExtraBold 800; titles and navigation Bold 700; body Regular 400 with 1.6 line-height. Keep body measure around 65–75 characters. Code uses Consolas, "SFMono-Regular", monospace. The self-hosted web WOFF2 is an upright Latin subset with weights 100–900 and font-display: swap; check language coverage and obtain true italics separately when needed. Inter uses the bundled SIL Open Font License 1.1.

Slide editions: light and dark PPTX starters and POTX templates each provide ten example slides and eleven layouts. Every layout includes a native Network Energy gradient, using the selected theme’s exact color stops. The dark edition uses charcoal surfaces and white text throughout, including charts and tables. Keep text on solid backgrounds. See slides/README.md for download paths and editing shared layout artwork.

Slide fonts: install the supplied static Inter Regular (400) and Bold (700), then restart the presentation app. Fonts are not embedded in the PPTX/POTX. If Inter cannot be installed, explicitly replace it throughout the deck with Segoe UI or Arial and review line breaks and overflow; Office does not use CSS fallback stacks.

Layout recommendations: 1180px content container, 56px section rhythm, 16px grid gaps, 12px card and 16px panel corners. Controls are at least 44px high. Leave open edges. Let meaningful groups determine surfaces; do not turn every paragraph into a card. Data-heavy applications may need wider layouts.

Vectors: use the supplied original SVGs without recoloring, stretching, cropping or effects. Preserve view boxes. Select dark grounds for both color and white variants: the color originals also have white lettering. Black variants belong on light grounds. Filenames are not a substitute for inspecting the artwork: some black variants retain orange, and the wide white logo has different bounds. Lugano's Plan ₿ marks are existing identity assets, not a new Foundation logo. Partner marks must not imply endorsement. Respect existing asset rights.

Imagery: show real Lugano, civic spaces, infrastructure, workshops and people learning or making. Prefer natural light and truthful context. Avoid floating coins, anonymous server rooms, hooded hackers and luxury crypto imagery.

Voice: active, direct and concrete. Explain the public consequence before the technical term. Invite learning, testing, questioning and contribution. Do not invent impact metrics, testimonials, affiliations or claims.

Accessibility: ordinary text needs at least 4.5:1 contrast, large text 3:1. Preserve visible keyboard focus, semantic headings and alt text. Honor reduced motion. Never use color as the only way to communicate state.

Authority: extracted visual tokens come from LuganoPlanB/vite-theme/src/theme/theme.css. Layout and voice follow its DESIGN.md and the existing Foundation branding guide. Ghost uses different CSS property names and configurable fonts. This repository does not replace the Vite theme's component API. See provenance.json and docs/sources.md before reconciling differences.

Add the specific audience, format and task after this brief. Use brand.json for resource paths and tokens/tokens.json for exact CSS values. Its JSON schema is repository-specific, not a claim of Design Tokens Community Group compatibility.
