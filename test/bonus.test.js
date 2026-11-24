import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAITS } from '../src/core/traits.js';
import { breathingFor, rankFor } from '../src/core/bonus.js';

const flat = (v) => Object.fromEntries(TRAITS.map((t) => [t, v]));
const styles = [
  { id: 'water', traits: flat(5) },
  { id: 'flame', traits: flat(9) },
  { id: 'sun', traits: flat(9), rare: true },
];

test('breathingFor picks the nearest non-rare style', () => {
  assert.equal(breathingFor(flat(8.4), styles), 'flame');
  assert.equal(breathingFor(flat(4), styles), 'water');
});

test('sun breathing triggers only at composure, compassion, discipline >= 8.5', () => {
  const t = { ...flat(2), composure: 8.5, compassion: 8.5, discipline: 8.5 };
  assert.equal(breathingFor(t, styles), 'sun');
  assert.notEqual(breathingFor({ ...t, discipline: 8.4 }, styles), 'sun');
});

test('rankFor maps the resolve ratio onto Corps ranks', () => {
  assert.equal(rankFor(0, 40).id, 'mizunoto');
  assert.equal(rankFor(40, 40).id, 'hashira');
  assert.equal(rankFor(40, 40).index, 10);
  assert.equal(rankFor(0, 0).id, 'mizunoto');
});
