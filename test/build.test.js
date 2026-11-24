import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { BASE_URL } from '../src/config.js';
import { ROSTER } from '../src/core/validate.js';

test('build writes 28 result pages with absolute OG tags and 29 preview PNGs', { timeout: 180000 }, () => {
  execFileSync(process.execPath, ['scripts/build.js'], { stdio: 'pipe' });
  for (const id of ROSTER.slayer) {
    const html = readFileSync(`dist/r/${id}/index.html`, 'utf8');
    const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    assert.equal(og, `${BASE_URL}og/${id}.png`, id);
    assert.match(html, /data-root="\.\.\/\.\.\/"/);
    assert.match(html, new RegExp(`data-slayer="${id}"`));
  }
  assert.equal(readdirSync('dist/r').length, 28);
  assert.equal(readdirSync('dist/og').filter((f) => f.endsWith('.png')).length, 29);
  assert.ok(existsSync('dist/index.html') && existsSync('dist/404.html') && existsSync('dist/fonts/dotgothic16-latin-400-normal.woff2'));
  assert.ok(!readFileSync('dist/index.html', 'utf8').includes('%'), 'no unreplaced placeholders');
});

test('build writes French pages with French OG tags, previews and language attributes', { timeout: 180000 }, () => {
  // relies on the build run by the previous test in this file
  for (const id of ROSTER.slayer) {
    const html = readFileSync(`dist/fr/r/${id}/index.html`, 'utf8');
    assert.equal(html.match(/property="og:image" content="([^"]+)"/)?.[1], `${BASE_URL}og/fr/${id}.png`, id);
    assert.match(html, /<html lang="fr">/);
    assert.match(html, /data-lang="fr"/);
    assert.match(html, /data-root="\.\.\/\.\.\/\.\.\/"/);
    assert.match(html, /og:locale" content="fr_FR"/);
    assert.match(html, new RegExp(`hreflang="en" href="${BASE_URL}r/${id}/"`));
    assert.ok(html.includes('Je suis'), 'French title');
  }
  assert.equal(readdirSync('dist/fr/r').length, 28);
  assert.equal(readdirSync('dist/og/fr').filter((f) => f.endsWith('.png')).length, 29);
  const frHome = readFileSync('dist/fr/index.html', 'utf8');
  assert.match(frHome, /data-root="\.\.\/"/);
  assert.ok(!frHome.includes('%'), 'no unreplaced placeholders');
  const enHome = readFileSync('dist/index.html', 'utf8');
  assert.match(enHome, /<html lang="en">/);
  assert.match(enHome, new RegExp(`hreflang="fr" href="${BASE_URL}fr/"`));
  assert.match(readFileSync('dist/404.html', 'utf8'), /\/fr\//);
});
