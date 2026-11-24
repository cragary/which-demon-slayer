import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeResult, decodeResult } from '../src/core/share-url.js';

const data = {
  characters: [{ id: 'gyomei', pool: 'slayer' }, { id: 'tanjiro', pool: 'slayer' }, { id: 'kokushibo', pool: 'demon' }],
  breathing: [{ id: 'stone' }, { id: 'sun' }],
  ranks: [{ id: 'mizunoto' }, { id: 'kinoe' }, { id: 'hashira' }],
};
const full = {
  slayer: 'gyomei', demon: 'kokushibo', breathing: 'stone', rank: 2, simSlayer: 91, simDemon: 74, name: 'Ana & Co',
  traits: { composure: 9.6, compassion: 9, intensity: 3, playfulness: 1, discipline: 10, independence: 4, ambition: 2, ruthlessness: 0 },
};

test('encodeResult builds r/<slayer>/ with query fields', () => {
  const url = encodeResult(full);
  assert.match(url, /^r\/gyomei\/\?/);
  assert.match(url, /d=kokushibo/);
  assert.match(url, /t=a931a420/);
});

test('encode → decode round-trips (traits rounded)', () => {
  const [path, qs] = encodeResult(full).split('?');
  const out = decodeResult('gyomei', new URLSearchParams(qs), data);
  assert.equal(out.demon, 'kokushibo');
  assert.equal(out.breathing, 'stone');
  assert.equal(out.rank, 2);
  assert.equal(out.simSlayer, 91);
  assert.equal(out.name, 'Ana & Co');
  assert.equal(out.traits.composure, 10);
  assert.equal(out.traits.discipline, 10);
  assert.equal(path, 'r/gyomei/');
});

test('decodeResult drops invalid fields and never throws', () => {
  const out = decodeResult('gyomei', new URLSearchParams('d=nobody&r=99&t=zz&s=500&b=moon'), data);
  assert.equal(out.slayer, 'gyomei');
  for (const k of ['demon', 'rank', 'traits', 'simSlayer', 'breathing']) assert.equal(out[k], undefined, k);
});

test('decodeResult returns null for unknown or demon slayer id', () => {
  assert.equal(decodeResult('nobody', new URLSearchParams(''), data), null);
  assert.equal(decodeResult('kokushibo', new URLSearchParams(''), data), null);
});
