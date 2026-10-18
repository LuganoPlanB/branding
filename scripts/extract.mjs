import { readFile, writeFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

// Run from this repository. Refresh deliberately against a reviewed sibling checkout.
const source = '../vite-theme';
const css = await readFile(`${source}/src/theme/theme.css`, 'utf8');
function declarations(selector) {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`Missing source selector: ${selector}`);
  const block = css.slice(start, css.indexOf('}', start));
  return Object.fromEntries([...block.matchAll(/(--planb-[\w-]+):\s*([^;]+);/g)]
    .filter(([, key, value]) => !value.includes('url(') && /font-family|color-|gradient-|border-|shadow-/.test(key))
    .map(([, key, value]) => [key, value.trim()]));
}
const tokens = { schemaVersion: 1, light: declarations(':root {'), dark: declarations(':root[data-theme="dark"] {') };
await writeFile('tokens/tokens.json', JSON.stringify(tokens, null, 2) + '\n');
const block = (selector, values) => `${selector} {\n${Object.entries(values).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}\n`;
await writeFile('tokens/tokens.css', '/* Extracted from LuganoPlanB/vite-theme; see provenance.json. Light by default. */\n' + block(':root', tokens.light) + block(':root[data-theme="dark"]', tokens.dark));
const repos = ['vite-theme', 'luganoplanb.github.io', 'ghost-theme', 'blog', 'tech-radar', 'dove-vanno-soldi-ticino', 'lugano-eresidency', 'LIPs', 'red-team'];
const sources = repos.map(name => ({ repository: `https://github.com/LuganoPlanB/${name}`, commit: execFileSync('git', ['-C', `../${name}`, 'rev-parse', 'HEAD'], {encoding:'utf8'}).trim(), dirty: Boolean(execFileSync('git', ['-C', `../${name}`, 'status', '--porcelain'], {encoding:'utf8'}).trim()) }));
const assets = [];
for (const name of (await readdir('assets/logos')).sort()) {
  const content = await readFile(`assets/logos/${name}`);
  assets.push({ path: `assets/logos/${name}`, source: `vite-theme/src/theme/assets/logos/${name}`, sha256: createHash('sha256').update(content).digest('hex'), viewBox: content.toString().match(/viewBox="([^"]+)"/)?.[1] });
}
await writeFile('provenance.json', JSON.stringify({ extractedAt: new Date().toISOString(), tokenSource: 'vite-theme/src/theme/theme.css', sources, assets }, null, 2) + '\n');
console.log(`Extracted ${Object.keys(tokens.light).length} light and ${Object.keys(tokens.dark).length} dark tokens; recorded ${assets.length} original SVGs.`);
