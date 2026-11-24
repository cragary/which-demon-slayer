import { TRAITS } from './traits.js';

export const ROSTER = {
  slayer: ['tanjiro', 'nezuko', 'zenitsu', 'inosuke', 'kanao', 'genya', 'aoi', 'murata', 'sabito', 'makomo', 'urokodaki', 'jigoro', 'kanae', 'senjuro', 'yoriichi', 'giyu', 'rengoku', 'shinobu', 'tengen', 'mitsuri', 'muichiro', 'obanai', 'sanemi', 'gyomei', 'tamayo', 'yushiro', 'kagaya', 'haganezuka'],
  demon: ['muzan', 'kokushibo', 'doma', 'akaza', 'hantengu', 'gyokko', 'daki', 'gyutaro', 'kaigaku', 'nakime', 'rui', 'enmu', 'kyogai', 'susamaru'],
};
const HEX = /^#[0-9a-f]{6}$/i;

/** Returns a list of human-readable problems; empty means the content is valid. */
export function validateData({ questions, characters, breathing }) {
  const errs = [];
  const ids = new Set();
  const dup = (id) => { if (ids.has(id)) errs.push(`duplicate id ${id}`); ids.add(id); };
  const dir = Object.fromEntries(TRAITS.map((t) => [t, { up: 0, down: 0 }]));

  for (const q of questions) {
    dup(q.id);
    if (q.answers.length !== 4) errs.push(`${q.id}: needs 4 answers`);
    const up = new Set();
    const down = new Set();
    for (const a of q.answers) {
      dup(a.id);
      if (![0, 1, 2].includes(a.resolve)) errs.push(`${a.id}: resolve must be 0..2`);
      for (const [t, d] of Object.entries(a.deltas)) {
        if (!TRAITS.includes(t)) errs.push(`${a.id}: unknown trait ${t}`);
        if (!Number.isInteger(d) || d < -2 || d > 2) errs.push(`${a.id}: delta ${t}=${d} out of range`);
        if (d > 0) up.add(t);
        if (d < 0) down.add(t);
      }
    }
    for (const t of up) if (dir[t]) dir[t].up++;
    for (const t of down) if (dir[t]) dir[t].down++;
  }
  for (const t of TRAITS) {
    if (dir[t].up < 4 || dir[t].down < 4) errs.push(`trait ${t} covered ${dir[t].up} up / ${dir[t].down} down (need 4/4)`);
  }

  for (const c of characters) {
    dup(c.id);
    for (const t of TRAITS) if (!(c.traits[t] >= 0 && c.traits[t] <= 10)) errs.push(`${c.id}: trait ${t} out of range`);
    if (c.palette?.length !== 3 || !c.palette.every((h) => HEX.test(h))) errs.push(`${c.id}: palette needs 3 hex colours`);
    if (!c.blurb) errs.push(`${c.id}: missing blurb`);
    if (Object.keys(c.phrases ?? {}).length < 3) errs.push(`${c.id}: needs ≥3 phrases`);
    const top4 = [...TRAITS].sort((a, b) => c.traits[b] - c.traits[a]).slice(0, 4);
    if (top4.filter((t) => c.phrases?.[t]).length < 2) errs.push(`${c.id}: phrases cover <2 of top traits ${top4.join(',')}`);
  }
  for (const pool of ['slayer', 'demon']) {
    const got = characters.filter((c) => c.pool === pool).map((c) => c.id).sort();
    if (got.join() !== [...ROSTER[pool]].sort().join()) errs.push(`${pool} roster mismatch: got ${got.join()}`);
  }
  for (const b of breathing) dup(`breath:${b.id}`);
  return errs;
}
