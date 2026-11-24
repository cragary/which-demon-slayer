import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAITS } from '../src/core/traits.js';
import { scoreAnswers, matchPool, similarity, neutralProfile } from '../src/core/score.js';

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
  assert.equal(r.traits.composure, 10);
  assert.equal(r.traits.compassion, 10);
  assert.equal(r.resolve, 4);
  assert.equal(r.maxResolve, 4);
});

test('scoreAnswers ignores unknown answer ids', () => {
  const r = scoreAnswers(['nope', 'q2b'], qs);
  assert.equal(r.traits.compassion, 0);
  assert.equal(r.resolve, 0);
});

test('neutralProfile is the normalised expected score of uniform answers', () => {
  const n = neutralProfile(qs);
  // composure expected raw = (2-2+0+0)/4 + (1+0+0+0)/4 = 0.25 within [-2, 3] -> 4.5
  assert.equal(n.composure, 4.5);
  assert.equal(n.playfulness, 5);
});

const calm = { id: 'calm', pool: 'slayer', traits: { ...flat(5), composure: 9 } };
const wild = { id: 'wild', pool: 'slayer', traits: { ...flat(5), intensity: 9 } };
const evil = { id: 'evil', pool: 'demon', traits: flat(5) };
const chars = [calm, wild, evil];

test('matchPool matches the direction of the profile relative to the pool', () => {
  const user = { ...flat(5), composure: 6.5 };          // mildly calm, far from 9 in absolute terms
  const m = matchPool(user, chars, 'slayer', { center: flat(5) });
  assert.equal(m[0].id, 'calm');
  assert.equal(m[1].id, 'wild');
  assert.ok(m[0].similarity > m[1].similarity);
});

test('matchPool gives similarity 99 for a perfectly aligned profile', () => {
  const user = { ...flat(5), composure: 7, intensity: 3 };
  const m = matchPool(user, chars, 'slayer', { center: flat(5) });
  assert.equal(m[0].id, 'calm');
  assert.equal(m[0].distance, 0);
  assert.equal(m[0].similarity, 99);
});

test('matchPool never crosses pools and survives a flat user', () => {
  assert.deepEqual(matchPool(flat(5), chars, 'demon', { center: flat(5) }).map((x) => x.id), ['evil']);
  assert.equal(matchPool(flat(5), chars, 'slayer', { center: flat(5) }).length, 2);
});

test('similarity maps cosine onto 35..99', () => {
  assert.equal(similarity(1), 99);
  assert.equal(similarity(-1), 35);
  assert.equal(similarity(0.5), 75);
});
