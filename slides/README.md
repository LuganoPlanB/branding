# Plan B presentation template

Choose a complete **light** or **dark** edition. Each starter has ten editable example slides plus three copyable vector-logo library slides; each PPTX and POTX contains eleven matching Plan B layouts in the New Slide / Layout menu. Every layout includes a native gradient band, with larger gradient accents on the cover, section divider and quotation.

| Edition | Editable starter | Reusable template | Rendered preview |
| --- | --- | --- | --- |
| Light | [PPTX](planb-starter-light.pptx) | [POTX](planb-template-light.potx) | [PDF](planb-preview-light.pdf) |
| Dark | [PPTX](planb-starter-dark.pptx) | [POTX](planb-template-dark.potx) | [PDF](planb-preview-dark.pdf) |

Use the POTX to create a fresh presentation. PDF previews are LibreOffice renderings; edit the Office files. The original `planb-starter.pptx`, `planb-template.potx` and `planb-preview.pdf` download paths remain aliases of the light edition.

## First use

1. Install `fonts/Inter-Regular.ttf` and `fonts/Inter-Bold.ttf`, then restart your presentation app. The fonts are licensed under the bundled SIL Open Font License.
2. Open the PPTX and save a copy with your project's name, or open the POTX to start a new presentation.
3. Replace bracketed prompts. Remove unused examples, the template-guide slide and the three logo-library slides.
4. Use **Home → New Slide / Layout** for a branded layout. Content layouts supply reusable geometry and editable text placeholders. Duplicate the supplied cover to retain its movable artwork; New Slide creates its content layout without those slide-level objects.
5. To preserve the styled chart or table, duplicate its example slide. In PowerPoint, use **Chart Design → Edit Data** to replace the synthetic chart values.
6. Check every slide after importing into Keynote or LibreOffice. PowerPoint, Keynote and LibreOffice do not render every Office feature identically.

## Edit the cover, logos and gradients

The cover's right-side panel, SVG logo, values text and large gradient are **separate selectable objects in normal slide view**. Click the words to edit them. Drag the large gradient from its default position at the top of the right panel, resize it or change its stops with **Format Shape → Gradient fill**. It is a native vector shape, not an image. If objects overlap, use **Home → Select → Selection Pane** and choose `Cover / Movable gradient`, `Cover / Editable values`, `Cover / Background panel` or the named logo.

**Duplicate the supplied cover** when creating another cover: its movable artwork belongs to that slide. This avoids putting it back into an unselectable background. The small gradient band shared by a layout remains editable in **View → Slide Master → select that layout**.

The final three library slides offer **wide, square and tall** logos in **color, black and white** (nine choices). Select only the logo, copy it and paste it onto any slide. Each is an original embedded SVG with a PNG fallback for older viewers; resize proportionally. Use dark grounds for color/white logos and light grounds for black logos. The logo's own lettering stays part of the original artwork; the cover's separate values text is editable. Delete the library slides before presenting.

## Edit the footer once for every slide

1. In desktop PowerPoint, open **View → Slide Master**.
2. Select the **top, larger parent master thumbnail**, above the eleven smaller layouts.
3. Edit the two bottom text boxes: **Plan B Foundation** and **Civic Digital Commons**. Their Selection Pane names are `Shared footer / Organization` and `Shared footer / Tagline`.
4. Choose **Close Master View**. Every slide using this master inherits the new wording, including the cover and library slides.

These are ordinary master text boxes, so use Slide Master rather than Insert → Header & Footer. The footer is no longer copied separately into each layout. In LibreOffice Impress, use **View → Master Slide** to edit the same shared text; check the result in your presentation app after import.

## Fonts: Inter and fallbacks

[Inter](https://rsms.me/inter/) is the Plan B font family. Install the supplied [Inter Regular (400)](fonts/Inter-Regular.ttf) and [Inter Bold (700)](fonts/Inter-Bold.ttf), then restart your presentation app. These are the two weights used in the slides; the web guide also uses ExtraBold (800).

Fonts are supplied rather than embedded in the Office files. Without installation, the application substitutes a font and line breaks can change. If installation is not possible, replace Inter throughout the presentation with Segoe UI (if available) or Arial, then inspect every slide for wrapping and overflow. Presentation apps do not follow the website's CSS fallback stack.

Inter is open source under the bundled [SIL Open Font License 1.1](fonts/OFL.txt). The supplied static fonts are upright Regular and Bold. For true italics or other font variants, use the [official Inter downloads](https://rsms.me/inter/) and check the characters your content needs. The variable source font is included for regeneration; ordinary slide editing only needs the two static fonts above.

## Included layouts

| Layout | Use |
| --- | --- |
| Cover | Title, public purpose, presenter and date |
| Section | Theme-matched divider with a prominent gradient accent |
| Title and content | Three concise statements |
| Two columns | Compare perspectives or options |
| Image and story | Picture placeholder, context and source credit |
| Chart and takeaway | Editable chart, evidence and implication |
| Table | Editable comparison table |
| Quotation | Verified quotation and attribution |
| Next steps | Actions, ownership, timing and contact |
| Template guide | Instructions; delete before presenting |
| Blank | Theme-matched freeform layout with a gradient band |

Each example has usage guidance in its speaker notes. All examples are prompts; the chart data are explicitly synthetic. No impact claims, partner endorsements or testimonials are implied.

## Design decisions

16:9 widescreen. The light edition uses Warm Canvas, Civic Ink and Lugano Night, with a navy logo panel. The dark edition uses charcoal canvas, white text, dark panels, Civic Coral and Bitcoin Orange. Charts, tables, image placeholders and dividers all follow the selected edition.

Native gradient shapes use the exact Network Energy stops from each theme: light gold 0%, pink 28%, violet 58%, cyan 100%; dark orange 0%, pink 34%, violet 68%, cyan 100%. The gradient is part of every reusable layout, including Blank. Keep text on solid backgrounds. To edit the shared gradient, use **View → Slide Master**, select a Plan B layout and its “Network energy gradient” shape, then **Format Shape → Gradient fill**. Editing a layout updates slides using it. Inter headings and spacious body text support the inherited Civic Digital Commons identity.

PowerPoint's theme contains the brand palette and Inter as both major and minor font. New shapes and charts can use Theme Colors. A theme is not a contrast checker: keep ordinary text navy/ink on light backgrounds, or warm white on navy. Avoid sky-blue text on white.

The cover and logo libraries use the original Lugano's Plan ₿ SVGs with a high-resolution PNG fallback for older software. The original SVGs remain embedded; it is not redrawn or recolored. It is an existing Lugano's Plan ₿ mark, not a newly designed Foundation logo. Other partners' marks are deliberately absent. Respect the asset notes and original rights.

PowerPoint-specific rendering has not been manually inspected; consult the generated preview and review your final export in the app you will present from.

## Maintainers and models

Read `../docs/brand-brief.md` before changing the design. Edit the generator, not just the binaries, so future output remains reproducible. Use standard PowerPoint placeholders and editable objects; never flatten full slides into images. The generator reads the shared theme's token JSON.

Regeneration requires a clone of the branding repository, not only the downloaded slide kit. Run the commands below from the repository root. After rendering, refresh `slides/planb-preview-light.pdf` and `slides/planb-preview-dark.pdf` from the matching CI artifacts. Copy the light PDF to the legacy `slides/planb-preview.pdf` path as well.

```sh
python3 -m venv .venv
.venv/bin/pip install -r slides/requirements.txt
.venv/bin/python slides/build_fonts.py
.venv/bin/python slides/build_template.py
python3 slides/check_template.py
```

The `Validate slide template` GitHub Action checks the Office packages and renders both formats in both themes with LibreOffice. Its artifact contains the PDF and individual slide previews. Rendering the generated files is necessary after layout edits; passing ZIP/XML checks alone does not prove visual quality.

Desktop font source: `https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.ttf`. The committed original pins the downloaded bytes. Static Inter Regular/Bold instances are generated from it with optical size 14. The deck uses native Office text, shape, gradient, chart and table objects, so no design plugin subscription is required.
