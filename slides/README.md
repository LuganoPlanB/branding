# Plan B presentation template

Start with **planb-starter.pptx**. It contains ten example slides you can edit immediately. Use **planb-template.potx** when you want PowerPoint to create a fresh presentation from the reusable template. Both contain eleven named Plan B layouts in the New Slide / Layout menu.

Open **planb-preview.pdf** for a quick visual overview. It is a LibreOffice rendering of the starter, not a replacement for the editable files.

## First use

1. Install `fonts/Inter-Regular.ttf` and `fonts/Inter-Bold.ttf`, then restart your presentation app. The fonts are licensed under the bundled SIL Open Font License.
2. Open the PPTX and save a copy with your project's name, or open the POTX to start a new presentation.
3. Replace bracketed prompts. Remove unused examples and the final template-guide slide.
4. Use **Home → New Slide / Layout** for a branded layout. The geometry belongs to slide layouts; text placeholders remain editable.
5. To preserve the styled chart or table, duplicate its example slide. In PowerPoint, use **Chart Design → Edit Data** to replace the synthetic chart values.
6. Check every slide after importing into Keynote or LibreOffice. PowerPoint, Keynote and LibreOffice do not render every Office feature identically.

## Fonts: Inter and fallbacks

[Inter](https://rsms.me/inter/) is the Plan B font family. Install the supplied [Inter Regular (400)](fonts/Inter-Regular.ttf) and [Inter Bold (700)](fonts/Inter-Bold.ttf), then restart your presentation app. These are the two weights used in the slides; the web guide also uses ExtraBold (800).

Fonts are supplied rather than embedded in the Office files. Without installation, the application substitutes a font and line breaks can change. If installation is not possible, replace Inter throughout the presentation with Segoe UI (if available) or Arial, then inspect every slide for wrapping and overflow. Presentation apps do not follow the website's CSS fallback stack.

Inter is open source under the bundled [SIL Open Font License 1.1](fonts/OFL.txt). The supplied static fonts are upright Regular and Bold. For true italics or other font variants, use the [official Inter downloads](https://rsms.me/inter/) and check the characters your content needs. The variable source font is included for regeneration; ordinary slide editing only needs the two static fonts above.

## Included layouts

| Layout | Use |
| --- | --- |
| Cover | Title, public purpose, presenter and date |
| Section | Navy divider with one clear proposition |
| Title and content | Three concise statements |
| Two columns | Compare perspectives or options |
| Image and story | Picture placeholder, context and source credit |
| Chart and takeaway | Editable chart, evidence and implication |
| Table | Editable comparison table |
| Quotation | Verified quotation and attribution |
| Next steps | Actions, ownership, timing and contact |
| Template guide | Instructions; delete before presenting |
| Blank | Warm-canvas freeform layout |

Each example has usage guidance in its speaker notes. All examples are prompts; the chart data are explicitly synthetic. No impact claims, partner endorsements or testimonials are implied.

## Design decisions

16:9 widescreen. Warm Canvas, Civic Ink, Lugano Night, Civic Sky and a scarce Commons Gold signal. A native editable gradient appears only on the cover. Navy dividers are a presentation treatment, not the charcoal dark UI theme. Inter headings and spacious body text support the inherited Civic Digital Commons identity.

PowerPoint's theme contains the brand palette and Inter as both major and minor font. New shapes and charts can use Theme Colors. A theme is not a contrast checker: keep ordinary text navy/ink on light backgrounds, or warm white on navy. Avoid sky-blue text on white.

The cover uses the original Lugano's Plan ₿ SVG with a high-resolution PNG fallback for older software. The original SVG remains embedded; it is not redrawn or recolored. It is an existing Lugano's Plan ₿ mark, not a newly designed Foundation logo. Other partners' marks are deliberately absent. Respect the asset notes and original rights.

PowerPoint-specific rendering has not been manually inspected; consult the generated preview and review your final export in the app you will present from.

## Maintainers and models

Read `../docs/brand-brief.md` before changing the design. Edit the generator, not just the binaries, so future output remains reproducible. Use standard PowerPoint placeholders and editable objects; never flatten full slides into images. The generator reads the shared theme's token JSON.

Regeneration requires a clone of the branding repository, not only the downloaded slide kit. Run the commands below from the repository root. After rendering, refresh `slides/planb-preview.pdf` from the CI artifact so it matches the delivered starter.

```sh
python3 -m venv .venv
.venv/bin/pip install -r slides/requirements.txt
.venv/bin/python slides/build_fonts.py
.venv/bin/python slides/build_template.py
python3 slides/check_template.py
```

The `Validate slide template` GitHub Action checks the Office packages and renders both formats with LibreOffice. Its artifact contains the PDF and individual slide previews. Rendering the generated files is necessary after layout edits; passing ZIP/XML checks alone does not prove visual quality.

Desktop font source: `https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.ttf`. The committed original pins the downloaded bytes. Static Inter Regular/Bold instances are generated from it with optical size 14. The deck uses native Office text, shape, gradient, chart and table objects, so no design plugin subscription is required.
