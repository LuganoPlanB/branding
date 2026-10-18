# Plan B branding

A standalone reference for the Civic Digital Commons design system: a short website for humans, a precise brief for models, and reusable tokens and SVGs.

## Use

- Website: https://plan-b.foundation/branding/
- Start with [the maker brief](docs/brand-brief.md) or [llms.txt](llms.txt).
- Import `tokens/tokens.css` and `tokens/layout.css` for new interfaces. Select dark mode with `document.documentElement.dataset.theme = 'dark'`.
- Use [brand.json](brand.json) for resource discovery and [tokens/tokens.json](tokens/tokens.json) for exact values. JSON is a versioned custom format with CSS string values, not DTCG.
- Keep original logos intact; see [asset notes](assets/README.md).

## Develop

Node 22+ and Python 3 are sufficient; no npm dependencies are required.

```sh
npm test
npm run build
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Build expands the maker brief and complete asset links into static HTML and makes a downloadable ZIP. Rebuild after editing source content. `npm run dev` serves source for layout work; use dist for complete preview and verification.

## Deployment

The [Publish brand guide workflow](.github/workflows/pages.yml) tests, builds and deploys through GitHub Actions on every push to `main`. It can also be run manually from the Actions tab. GitHub Pages is configured to use GitHub Actions; only the built `dist/` directory is published. The site uses relative paths so it works under the `/branding/` project subpath.

## Authority and maintenance

See [sources](docs/sources.md) and [provenance](provenance.json). Reusable runtime components continue to live in [vite-theme](https://github.com/LuganoPlanB/vite-theme); Ghost retains its own integration. This repository adds documentation and a distributable reference, not a new competing theme implementation.

Original brand and third-party assets retain existing rights. The font's SIL Open Font License is bundled. No blanket license over third-party marks is asserted.
