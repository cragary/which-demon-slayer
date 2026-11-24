import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { DATA } from '../src/data/index.js';
import { validateData } from '../src/core/validate.js';

test('real data passes validation', () => {
  assert.deepEqual(validateData(DATA), []);
});

test('validateData catches a bad delta and a short roster', () => {
  const bad = structuredClone(DATA);
  bad.questions[0].answers[0].deltas.composure = 3;
  bad.characters = bad.characters.filter((c) => c.id !== 'gyomei');
  const errs = validateData(bad);
  assert.ok(errs.some((e) => e.includes('out of range')));
  assert.ok(errs.some((e) => e.includes('slayer roster mismatch')));
});

test('balance check passes', { timeout: 180000 }, () => {
  execFileSync(process.execPath, ['scripts/balance.js', '--quiet'], { stdio: 'pipe' });
});
