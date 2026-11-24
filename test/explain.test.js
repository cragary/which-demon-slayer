import { test } from 'node:test';
import assert from 'node:assert/strict';
import { explain } from '../src/core/explain.js';

const ch = {
  id: 'gyomei', name: 'Gyomei', blurb: 'BLURB',
  traits: { composure: 10, compassion: 9, intensity: 3, playfulness: 1, discipline: 10, independence: 4, ambition: 2, ruthlessness: 1 },
  phrases: { composure: 'P-composure', compassion: 'P-compassion', discipline: 'P-discipline' },
};
const user = { composure: 9.5, compassion: 8, intensity: 4, playfulness: 2, discipline: 6, independence: 5, ambition: 3, ruthlessness: 2 };

test('explain uses phrases of the closest top traits', () => {
  const out = explain(user, ch);
  assert.ok(out.length >= 2 && out.length <= 3);
  assert.equal(out[0], 'P-composure');
  assert.equal(out[1], 'P-compassion');
});

test('explain quotes one of the user answers when given', () => {
  const answers = [
    { question: { text: 'Q' }, answer: { text: 'Stay calm', deltas: { composure: 2 } } },
    { question: { text: 'Q2' }, answer: { text: 'Run', deltas: { intensity: 2 } } },
  ];
  const out = explain(user, ch, answers);
  assert.ok(out.some((s) => s === 'You chose: "Stay calm"'));
});

test('explain falls back to the blurb without matching phrases', () => {
  const out = explain(user, { ...ch, phrases: {} });
  assert.deepEqual(out, ['BLURB']);
});
