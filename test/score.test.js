import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAITS } from '../src/core/traits.js';
import { scoreAnswers, matchPool, similarity } from '../src/core/score.js';

const flat = (v) => Object.fromEntries(TRAITS.map((t) => [t, v]));
const qs = [
  { id: 'q1', answers: [
    { id: 'q1a', deltas: { composure: 2 }, resolve: 2 },
    { id: 'q1b', deltas: { composure: -2 }, resolve: 0 },
    { id: 'q1c', deltas: { intensity: 2 }, resolve: 1 },
    { id: 'q1d', deltas: {}, resolve: 1 } ] },
  { id: 'q2', answers: [
    { id: 'q2a', deltas: { composure: 1, compassion: 2 }, resolve: 2 },
    { id: 'q2b', deltas: { compassion: -2 }, resolve: 0 },
    { id: 'q2c', deltas: {}, resolve: 1 },
    { id: 'q2d', deltas: { intensity: -1 }, resolve: 1 } ] },
];

test('scoreAnswers sums deltas and resolve, normalised to 0-10', () => {
  const r = scoreAnswers(['q1a', 'q2a'], qs);
  assert.equal(r.traits.composure, 10);   // 3 within [-2, 3]
  assert.equal(r.traits.compassion, 10);
  assert.equal(r.resolve, 4);
  assert.equal(r.maxResolve, 4);
});

test('scoreAnswers ignores unknown answer ids', () => {
  const r = scoreAnswers(['nope', 'q2b'], qs);
  assert.equal(r.traits.compassion, 0);
  assert.equal(r.resolve, 0);
});

const chars = [
  { id: 'calm', pool: 'slayer', traits: flat(5) },
  { id: 'wild', pool: 'slayer', traits: flat(0) },
  { id: 'evil', pool: 'demon', traits: flat(5) },
];

test('matchPool ranks an identical profile first with similarity 99', () => {
  const m = matchPool(flat(5), chars, 'slayer');
  assert.equal(m[0].id, 'calm');
  assert.equal(m[0].distance, 0);
  assert.equal(m[0].similarity, 99);
  assert.equal(m[1].id, 'wild');
});

test('matchPool never crosses pools', () => {
  assert.deepEqual(matchPool(flat(5), chars, 'demon').map((x) => x.id), ['evil']);
});

test('similarity is clamped to 35..99 and falls with distance', () => {
  assert.equal(similarity(0), 99);
  assert.equal(similarity(1000), 35);
  assert.ok(similarity(5) > similarity(10));
});
