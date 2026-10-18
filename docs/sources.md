# Sources and boundaries

This reference consolidates existing work. It does not silently migrate other repositories or change the Vite theme's public API.

| Source repository | Role in this reference |
| --- | --- |
| [vite-theme](https://github.com/LuganoPlanB/vite-theme) | Primary CSS values and original SVGs; DESIGN.md supplies layout recommendations. |
| [luganoplanb.github.io](https://github.com/LuganoPlanB/luganoplanb.github.io) | Existing branding page, civic purpose, voice and the specimen-led reference structure. |
| [ghost-theme](https://github.com/LuganoPlanB/ghost-theme) | Publishing adaptation: same core palette, shorter CSS names such as --planb-canvas and --planb-rainbow; Ghost can override body and heading fonts. Do not import Vite CSS as a drop-in Ghost replacement. |
| [blog](https://github.com/LuganoPlanB/blog) | Publication context and existing logo usage. |
| [tech-radar](https://github.com/LuganoPlanB/tech-radar) | Data-oriented application of the shared visual shell. |
| [LIPs](https://github.com/LuganoPlanB/LIPs) | Documentation consumer of the shared theme. |
| [dove-vanno-soldi-ticino](https://github.com/LuganoPlanB/dove-vanno-soldi-ticino) | Civic data application reference, not an authority for global brand tokens. |
| [lugano-eresidency](https://github.com/LuganoPlanB/lugano-eresidency), [red-team](https://github.com/LuganoPlanB/red-team) | Related workspace projects; no visual tokens extracted. |

Exact inspected commits and clean/dirty state are in `../provenance.json`. These are local source snapshots, not claims about the latest upstream version. The live Foundation URL could not be fetched during the initial audit, so source files provide the evidence.

## What is extracted

`tokens/tokens.css` and `tokens/tokens.json` preserve selected colors, typography, gradients, borders and panel shadows from the default `:root` and explicit dark-mode blocks in vite-theme. Image backgrounds, component rules and the alternate explicit-light hero treatment are outside this token subset. Light is the documented default; opt into dark with a root data attribute.

`tokens/layout.css` records DESIGN.md recommendations. This distinction matters: the runtime theme allows broader application layouts, including a 1440px container. The brand guide's 1180px reading container is not a claim that every existing website uses that width.

## What is new

The standalone webpage, download kit, model manifest and reusable dot/band SVGs consolidate the existing design language. The geometric assets are new expressions of existing CSS motifs; they are not official logos. Original logo SVGs remain byte-identical to their recorded sources.

## Font sources: Inter

The primary font family is [Inter](https://rsms.me/inter/). The official website provides downloads, specimen details and language coverage. The bundled web subset does not include every variant or character available upstream.

Inter Latin variable WOFF2 is self-hosted from Fontsource 5.2.8 (`https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.2.8/files/inter-latin-wght-normal.woff2`). Its upstream SIL Open Font License is included at `assets/fonts/OFL.txt` (source: `https://github.com/rsms/inter/blob/master/LICENSE.txt`). The committed binary pins the actual downloaded font; future refreshes should be reviewed explicitly.

The web font contains upright weights 100–900. Desktop slides use static Inter Regular (400) and Bold (700), generated at optical size 14 from the committed `slides/fonts/InterVariable.ttf`. Its source is `https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.ttf`; the desktop license is included at `slides/fonts/OFL.txt`. See `slides/README.md` for installation and fallback guidance.

## Updating

With the recorded sibling repositories available, review upstream changes and run `npm run extract`. Inspect the token diff and original asset hashes. The extractor records files already present in this repository; it does not silently replace logos. Copy approved upstream logo changes explicitly, then regenerate provenance. Run `npm test` and `npm run build`, review light/dark and mobile rendering, and commit the complete change together.

## Project identity: Bitcoin Roots

The [Bitcoin Roots website](https://plan-b.foundation/bitcoin-roots/) identifies the project and serves its Lottie animation. Project artwork is imported from [LuganoPlanB/bitcoin-roots at ebdc72c](https://github.com/LuganoPlanB/bitcoin-roots/tree/ebdc72c0cd25603ddc89026faef9fc7bf5d6a538): `src/qt/res/src/bitcoinroots-logo.svg` and `doc/website/content/public/bitcoin-roots.lottie.json`. The animation matched the live website when retrieved on 2026-10-18.

The original SVG and animation are unchanged. Black and white SVGs replace only the original #F57C00 fill, as requested for this guide. Geometry, transforms and view box remain intact. Exact paths, source links, transformations and hashes are recorded in `assets/projects/bitcoin-roots/manifest.json`. These are project assets, not replacements for the Foundation identity or global palette.

The inline animation preview uses the self-hosted SVG renderer from [lottie-web 5.13.0](https://github.com/airbnb/lottie-web/tree/v5.13.0). The unchanged player and MIT license are bundled in `assets/vendor/lottie-web/`. The renderer loads on demand; animation data remains the original Bitcoin Roots file.
