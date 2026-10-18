import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const tokens = JSON.parse(await readFile('tokens/tokens.json', 'utf8'));
const manifest = JSON.parse(await readFile('brand.json', 'utf8'));
const provenance = JSON.parse(await readFile('provenance.json', 'utf8'));
assert.equal(tokens.schemaVersion, 1);
for (const file of Object.values(manifest.resources)) await access(file);
for (const token of Object.values(manifest.roles)) assert.ok(tokens.light[token], `Missing semantic token ${token}`);
for (const asset of provenance.assets) assert.equal(createHash('sha256').update(await readFile(asset.path)).digest('hex'), asset.sha256, `Original asset changed: ${asset.path}`);
for (const project of manifest.projects ?? []) {
  const record = JSON.parse(await readFile(project.manifest, 'utf8'));
  for (const asset of record.assets) assert.equal(createHash('sha256').update(await readFile(asset.path)).digest('hex'), asset.sha256, `Project asset changed: ${asset.path}`);
}
const css = await readFile('tokens/tokens.css', 'utf8');
for (const mode of ['light', 'dark']) for (const [key, value] of Object.entries(tokens[mode])) assert.ok(css.includes(`${key}: ${value};`), `CSS/JSON mismatch: ${key}`);
function luminance(hex) { return hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0); }
for (const [fg,bg] of [['#030b20','#fffefa'],['#030b20','#4f97e9'],['#030b20','#ffb604'],['#fffefa','#082952'],['#ffffff','#171717']]) { const [a,b]=[luminance(fg),luminance(bg)].sort((a,b)=>b-a); assert.ok((a+.05)/(b+.05)>=4.5,`Contrast failed: ${fg}/${bg}`); }
const html = await readFile('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate IDs');
for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),`Broken anchor: ${id}`);
for (const [,path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) if (!/^(https?:|downloads\/)/.test(path)) await access(path);
assert.ok((await readFile('assets/fonts/inter-latin.woff2')).subarray(0,4).toString()==='wOF2','Font is not WOFF2');
assert.ok((await readFile('assets/fonts/OFL.txt','utf8')).includes('SIL OPEN FONT LICENSE'));
console.log(`PASS: ${provenance.assets.length} original hashes; ${Object.keys(tokens.light).length+Object.keys(tokens.dark).length} token mappings; 5 contrast pairs; resource links, anchors, font and manifest.`);
