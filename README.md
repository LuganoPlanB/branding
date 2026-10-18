# Plan B branding

A standalone reference for the Civic Digital Commons design system: a short website for humans, a precise brief for models, and reusable tokens and SVGs.

## Use

- GitHub Pages target: https://luganoplanb.github.io/branding/ (requires Pages activation for this repository).
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

The ready-to-use workflow is stored at [docs/pages-workflow.yml](docs/pages-workflow.yml). The publishing token could not create active workflows or enable Pages. A repository administrator should copy it to `.github/workflows/pages.yml`, configure Settings → Pages → Source → GitHub Actions, and run the workflow. It validates and builds on pushes to main, then deploys only `dist/`. The site uses relative paths so it also works under a project subpath.

## Authority and maintenance

See [sources](docs/sources.md) and [provenance](provenance.json). Reusable runtime components continue to live in [vite-theme](https://github.com/LuganoPlanB/vite-theme); Ghost retains its own integration. This repository adds documentation and a distributable reference, not a new competing theme implementation.

Original brand and third-party assets retain existing rights. The font's SIL Open Font License is bundled. No blanket license over third-party marks is asserted.
