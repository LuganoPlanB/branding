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

## Font

Inter Latin variable WOFF2 is self-hosted from Fontsource 5.2.8 (`https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.2.8/files/inter-latin-wght-normal.woff2`). Its upstream SIL Open Font License is included at `assets/fonts/OFL.txt` (source: `https://github.com/rsms/inter/blob/master/LICENSE.txt`). The committed binary pins the actual downloaded font; future refreshes should be reviewed explicitly.

## Updating

With the recorded sibling repositories available, review upstream changes and run `npm run extract`. Inspect the token diff and original asset hashes. The extractor records files already present in this repository; it does not silently replace logos. Copy approved upstream logo changes explicitly, then regenerate provenance. Run `npm test` and `npm run build`, review light/dark and mobile rendering, and commit the complete change together.
