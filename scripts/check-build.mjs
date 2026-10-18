import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const html = await readFile('dist/index.html', 'utf8');
for (const source of ['app.js', 'theme.js', 'styles.css']) {
  assert.ok(!html.includes(`"${source}"`), `Unversioned browser asset: ${source}`);
  const [name, ext] = source.split('.');
  const match = html.match(new RegExp(`(?:src|href)="(${name}\\.([a-f0-9]{12})\\.${ext})"`));
  assert.ok(match, `Missing versioned ${source}`);
  const bytes = await readFile(`dist/${match[1]}`);
  assert.deepEqual(bytes, await readFile(source), `Stale deployed ${source}`);
  assert.equal(match[2], createHash('sha256').update(bytes).digest('hex').slice(0, 12));
}
console.log('PASS: HTML references all three current, content-versioned browser assets.');
