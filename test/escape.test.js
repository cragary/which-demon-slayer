import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeXml, clampName } from '../src/core/escape.js';

test('escapeXml escapes the five XML specials', () => {
  assert.equal(escapeXml(`<a href="x">&'`), '&lt;a href=&quot;x&quot;&gt;&amp;&apos;');
});

test('clampName keeps short names', () => {
  assert.equal(clampName('Ana'), 'Ana');
});

test('clampName cuts to 20 graphemes plus ellipsis, emoji-safe', () => {
  const out = clampName('🗡️'.repeat(30));
  const seg = [...new Intl.Segmenter().segment(out)];
  assert.equal(seg.length, 21);
  assert.equal(seg.at(-1).segment, '…');
});

test('clampName trims whitespace and handles empty', () => {
  assert.equal(clampName('  '), '');
  assert.equal(clampName(undefined), '');
});

test('clampName caps combining marks per grapheme (zalgo)', () => {
  const zalgo = 'a' + '́'.repeat(70) + 'b';
  const out = clampName(zalgo);
  assert.ok(out.length <= 5, `got ${out.length} code units`);
  assert.ok(out.startsWith('a') && out.endsWith('b'));
});
