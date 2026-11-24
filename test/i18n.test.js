import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localize, textKeys, missingText } from '../src/core/localize.js';
import { DATA, dataFor, stringsFor } from '../src/data/index.js';
import { TEXT_FR } from '../src/data/text.fr.js';
import { badgeSvg } from '../src/render/badge.js';

test('localize swaps text and keeps every number', () => {
  const fr = localize(DATA, { 'q:q1': 'Minuit.', 'a:q1a': 'Déjà habillé.', 'c:gyomei:title': 'Pilier de la Pierre', 'c:gyomei:phrase:composure': 'Calme.', 'b:stone:name': 'Souffle de la Pierre', 'r:kinoe:line': 'Presque.' });
  assert.equal(fr.questions[0].text, 'Minuit.');
  assert.equal(fr.questions[0].answers[0].text, 'Déjà habillé.');
  const g = fr.characters.find((c) => c.id === 'gyomei');
  assert.equal(g.title, 'Pilier de la Pierre');
  assert.equal(g.phrases.composure, 'Calme.');
  assert.equal(fr.breathing.find((b) => b.id === 'stone').name, 'Souffle de la Pierre');
  assert.equal(fr.ranks.find((r) => r.id === 'kinoe').line, 'Presque.');
  assert.deepEqual(fr.questions.map((q) => q.answers.map((a) => a.deltas)), DATA.questions.map((q) => q.answers.map((a) => a.deltas)));
  assert.deepEqual(fr.characters.map((c) => c.traits), DATA.characters.map((c) => c.traits));
  assert.notEqual(DATA.questions[0].text, 'Minuit.', 'base data untouched');
});

test('textKeys lists every translatable string', () => {
  const keys = textKeys(DATA);
  assert.ok(keys.includes('q:q20') && keys.includes('a:q20d') && keys.includes('c:susamaru:blurb') && keys.includes('b:sun:line') && keys.includes('r:hashira:name'));
  assert.equal(keys.length, new Set(keys).size);
});

test('every English text has a French translation', () => {
  assert.deepEqual(missingText(DATA, TEXT_FR), []);
});

test('French UI strings cover every English key with the same type', () => {
  const en = stringsFor('en'), fr = stringsFor('fr');
  for (const [k, v] of Object.entries(en)) {
    assert.equal(typeof fr[k], typeof v, k);
    if (k === 'traits') for (const t of Object.keys(v)) assert.ok(fr.traits[t], `traits.${t}`);
  }
});

test('dataFor(fr) is French and dataFor(en) is the base', () => {
  assert.equal(dataFor('en'), DATA);
  assert.notEqual(dataFor('fr').questions[0].text, DATA.questions[0].text);
});

test('French badge uses French copy and escapes apostrophes', () => {
  const svg = badgeSvg({ slayer: 'gyomei', demon: 'nakime', rank: 10, breathing: 'stone', name: "D'Artagnan" }, dataFor('fr'), { format: 'portrait', strings: stringsFor('fr') });
  assert.ok(svg.includes('D&apos;Artagnan'));
  assert.ok(svg.includes(stringsFor('fr').slayerHeading.toUpperCase()));
  const og = badgeSvg({ slayer: 'gyomei' }, dataFor('fr'), { format: 'og', strings: stringsFor('fr') });
  assert.ok(og.includes(stringsFor('fr').ogFind));
});
