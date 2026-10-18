import { mkdir, rm, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
await rm('dist', { recursive: true, force: true });
await mkdir('dist/downloads', { recursive: true });
for (const file of ['assets', 'tokens', 'docs', 'slides', 'DESIGN.md', 'styles.css', 'theme.js', 'app.js', 'brand.json', 'llms.txt', 'provenance.json']) await cp(file, `dist/${file}`, { recursive: true, filter: path => !path.includes('__pycache__') });
let html = await readFile('index.html', 'utf8');
// HTML and scripts can have different cache ages on Pages. Bind each page to
// its exact script/style bytes so new controls never receive old behavior.
for (const file of ['app.js', 'theme.js', 'styles.css']) {
  const bytes = await readFile(file);
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const versioned = file.replace(/(\.[^.]+)$/, `.${hash}$1`);
  await writeFile(`dist/${versioned}`, bytes);
  html = html.replaceAll(`"${file}"`, `"${versioned}"`);
}
const links = [];
for (const directory of ['logos', 'shapes']) for (const name of (await readdir(`assets/${directory}`)).sort()) {
  links.push(`<a href="assets/${directory}/${escape(name)}" download>${escape(name.replaceAll('_', ' ').replace('.svg', ''))} · SVG</a>`);
}
html = html.replace('<!-- ASSET_LINKS -->', links.join('\n')).replace('<!-- MAKER_BRIEF -->', escape(await readFile('docs/brand-brief.md', 'utf8')));
await writeFile('dist/index.html', html);
await writeFile('dist/.nojekyll', '');
execFileSync('python3', ['-c', 'import pathlib,zipfile; root=pathlib.Path("dist"); files=[p for d in ["assets","tokens","docs","slides"] for p in (root/d).rglob("*") if p.is_file()]+[root/n for n in ["brand.json","llms.txt","provenance.json","DESIGN.md"]]; z=zipfile.ZipFile(root/"downloads/planb-brand-kit.zip","w",zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root)) for p in sorted(files)]; z.close(); z=zipfile.ZipFile(root/"downloads/planb-slides.zip","w",zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root/"slides")) for p in sorted((root/"slides").rglob("*")) if p.is_file()]; z.close()']);
console.log('Built static guide and downloadable brand kit in dist/.');
