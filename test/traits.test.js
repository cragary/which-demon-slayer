import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAITS, normalise, traitBounds } from '../src/core/traits.js';

test('TRAITS lists the 8 spec traits in order', () => {
  assert.deepEqual(TRAITS, ['composure','compassion','intensity','playfulness','discipline','independence','ambition','ruthlessness']);
});

const flat = (v) => Object.fromEntries(TRAITS.map(t => [t, v]));

test('normalise maps raw sums onto 0-10 against bounds', () => {
  const raw = flat(0); raw.composure = 3;
  const bounds = Object.fromEntries(TRAITS.map(t => [t, { min: -3, max: 9 }]));
  assert.equal(normalise(raw, bounds).composure, 5);
  assert.equal(normalise(raw, bounds).compassion, 2.5);
});

test('normalise gives 5 when a trait has no range', () => {
  const bounds = Object.fromEntries(TRAITS.map(t => [t, { min: 0, max: 0 }]));
  assert.equal(normalise(flat(0), bounds).ambition, 5);
});

test('traitBounds sums per-question min/max deltas, missing delta = 0', () => {
  const qs = [
    { answers: [{ deltas: { composure: 2 } }, { deltas: { composure: -1 } }, { deltas: {} }, { deltas: { intensity: 1 } }] },
    { answers: [{ deltas: { composure: 1 } }, { deltas: {} }, { deltas: {} }, { deltas: {} }] },
  ];
  const b = traitBounds(qs);
  assert.deepEqual(b.composure, { min: -1, max: 3 });
  assert.deepEqual(b.intensity, { min: 0, max: 1 });
});
