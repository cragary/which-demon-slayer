import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAITS } from '../src/core/traits.js';
import { breathingFor, rankFor, SUN_MARGIN } from '../src/core/bonus.js';

const flat = (v) => Object.fromEntries(TRAITS.map((t) => [t, v]));
const styles = [
  { id: 'water', traits: flat(5) },
  { id: 'flame', traits: flat(9) },
  { id: 'sun', traits: flat(9), rare: true },
];

test('breathingFor picks the nearest non-rare style', () => {
  assert.equal(breathingFor({ ...flat(5), intensity: 6 }, [...styles, { id: 'calm', traits: { ...flat(5), intensity: 1 } }]), 'flame');
  assert.equal(breathingFor({ ...flat(5), intensity: 4 }, [...styles, { id: 'calm', traits: { ...flat(5), intensity: 1 } }]), 'calm');
});

test('sun breathing triggers only when composure, compassion, discipline clear centre + SUN_MARGIN', () => {
  const g = 5 + SUN_MARGIN;
  const t = { ...flat(2), composure: g, compassion: g, discipline: g };
  assert.equal(breathingFor(t, styles), 'sun');
  assert.notEqual(breathingFor({ ...t, discipline: g - 0.1 }, styles), 'sun');
});

test('rankFor maps the resolve ratio onto Corps ranks', () => {
  assert.equal(rankFor(0, 40).id, 'mizunoto');
  assert.equal(rankFor(40, 40).id, 'hashira');
  assert.equal(rankFor(40, 40).index, 10);
  assert.equal(rankFor(0, 0).id, 'mizunoto');
});
