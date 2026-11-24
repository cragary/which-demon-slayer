import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dataFor } from '../src/data/index.js';

// Questions are everyday life, for anyone (street seller or office worker): the show lives in the frame and results.
const SHOW = /\b(demons?|d[ée]mons?|slayers?|pourfendeurs?|swords?|[ée]p[ée]es?|blades?|lames?|crows?|corbeaux?|missions?|hashira|piliers?|breathing|souffles?|corps|kakushi|taisho|recrues?|recruits?)\b/i;
// …and no setting that assumes an office job.
const OFFICE = /\b(meetings?|r[ée]unions?|deadlines?|boss|patron|colleagues?|coll[eè]gues?|office|bureau|emails?|projects?|projets?)\b/i;

for (const lang of ['en', 'fr']) {
  test(`${lang}: questions and answers stay out of the show and out of the office`, () => {
    const bad = [];
    for (const q of dataFor(lang).questions) {
      for (const text of [q.text, ...q.answers.map((a) => a.text)]) {
        if (SHOW.test(text) || OFFICE.test(text)) bad.push(`${q.id}: ${text}`);
      }
    }
    assert.deepEqual(bad, []);
  });
}
