# Working on Plan B branding

Read PRODUCT.md, DESIGN.md, docs/brand-brief.md and docs/sources.md before changing the system. This repository documents the existing Civic Digital Commons identity.

- Preserve original SVG bytes unless explicitly refreshing from the source and updating provenance.
- Edit tokens through a reviewed extraction; keep human guidance and model files consistent.
- Do not assert new logo rights, endorsements or institutional claims.
- Keep the webpage static and useful without JavaScript. Enhancements must handle unavailable clipboard and local storage.
- Do not modify sibling repositories as part of a branding update.
- `npm test` validates source resources, hashes and contrast; `npm run build` creates dist and the download kit.
- Browser-check desktop, mobile and dark mode after material UI changes.
- GitHub Pages deploys the allowlisted dist directory, not the repository root.
