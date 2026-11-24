import { TRAITS } from './traits.js';

const intIn = (v, lo, hi) => {
  if (v === null || !/^\d+$/.test(v)) return undefined;
  const n = Number(v);
  return n >= lo && n <= hi ? n : undefined;
};

/** Result → relative share path `r/<slayer>/?…` (resolve against BASE_URL). */
export function encodeResult(r) {
  const p = new URLSearchParams();
  if (r.demon) p.set('d', r.demon);
  if (r.breathing) p.set('b', r.breathing);
  if (r.rank !== undefined) p.set('r', String(r.rank));
  if (r.simSlayer !== undefined) p.set('s', String(r.simSlayer));
  if (r.simDemon !== undefined) p.set('sd', String(r.simDemon));
  if (r.name) p.set('n', r.name);
  if (r.traits) p.set('t', TRAITS.map((t) => Math.round(r.traits[t]).toString(36)).join(''));
  return `r/${r.slayer}/?${p.toString()}`;
}

/** Shared link → result. Unknown or out-of-range fields are dropped; never throws. Null if the slayer is unknown. */
export function decodeResult(slayerId, params, data) {
  const byId = (id, pool) => data.characters.some((c) => c.id === id && c.pool === pool);
  if (!byId(slayerId, 'slayer')) return null;
  const out = { slayer: slayerId };
  try {
    const d = params.get('d');
    if (d && byId(d, 'demon')) out.demon = d;
    const b = params.get('b');
    if (b && data.breathing.some((x) => x.id === b)) out.breathing = b;
    out.rank = intIn(params.get('r'), 0, data.ranks.length - 1);
    out.simSlayer = intIn(params.get('s'), 0, 100);
    out.simDemon = intIn(params.get('sd'), 0, 100);
    const n = params.get('n');
    if (n) out.name = n.slice(0, 80);
    const t = params.get('t');
    if (t && /^[0-9a]{8}$/.test(t)) out.traits = Object.fromEntries(TRAITS.map((k, i) => [k, parseInt(t[i], 36)]));
  } catch { /* malformed params: keep what we have */ }
  for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];
  return out;
}
