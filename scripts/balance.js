// Balance check (spec: "Balance check"). Prints a table; exits 1 on any failure.
import { DATA } from '../src/data/index.js';
import { scoreAnswers, matchPool } from '../src/core/score.js';
import { breathingFor, rankFor } from '../src/core/bonus.js';
import { personaFor } from '../src/core/persona.js';

const quiet = process.argv.includes('--quiet');
const { questions, characters, breathing } = DATA;
let seed = 20261124;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const fails = [];
const bump = (o, k) => { o[k] = (o[k] ?? 0) + 1; };

const run = (ids) => {
  const s = scoreAnswers(ids, questions);
  return {
    slayer: matchPool(s.traits, characters, 'slayer', { center: s.center }),
    demon: matchPool(s.traits, characters, 'demon', { center: s.center }),
    breath: breathingFor(s.traits, breathing, s.center),
    rank: rankFor(s.resolve, s.maxResolve).id,
  };
};
const perturb = (persona) => {
  const ids = [...persona];
  const flips = 1 + Math.floor(rnd() * 3);
  for (let k = 0; k < flips; k++) {
    const i = Math.floor(rnd() * ids.length);
    ids[i] = pick(questions[i].answers).id;
  }
  return ids;
};
const personas = Object.fromEntries(characters.map((c) => [c.id, personaFor(c, questions, characters)]));

// 1. Persona fidelity: the character or its runner-up ≥70% of 200 perturbed runs.
const fidelity = {};
for (const c of characters) {
  let ok = 0;
  for (let k = 0; k < 200; k++) {
    const m = run(perturb(personas[c.id]))[c.pool];
    if (m[0].id === c.id || m[1].id === c.id) ok++;
  }
  fidelity[c.id] = ok / 200;
  if (ok / 200 < 0.7) fails.push(`fidelity ${c.id} ${(ok / 2).toFixed(0)}% < 70%`);
}

// 2. Persona spread (≤12% of its pool) + rarity of Sun and Hashira.
const spread = { slayer: {}, demon: {} };
const breathP = {};
const rankP = {};
const N2 = 10000;
for (let k = 0; k < N2; k++) {
  const r = run(perturb(personas[pick(characters).id]));
  bump(spread.slayer, r.slayer[0].id);
  bump(spread.demon, r.demon[0].id);
  bump(breathP, r.breath);
  bump(rankP, r.rank);
}
for (const pool of ['slayer', 'demon']) {
  for (const [id, n] of Object.entries(spread[pool])) if (n / N2 > 0.12) fails.push(`spread ${pool} ${id} ${((100 * n) / N2).toFixed(1)}% > 12%`);
}
const sunP = (breathP.sun ?? 0) / N2;
const hashiraP = (rankP.hashira ?? 0) / N2;
if (sunP < 0.003 || sunP > 0.02) fails.push(`sun ${(100 * sunP).toFixed(2)}% not in 0.3–2%`);
if (hashiraP < 0.03 || hashiraP > 0.08) fails.push(`hashira ${(100 * hashiraP).toFixed(2)}% not in 3–8%`);

// 3. Random reachability: every character and non-rare breathing ≥0.2%.
const reach = { slayer: {}, demon: {} };
const breathR = {};
const N3 = 100000;
for (let k = 0; k < N3; k++) {
  const r = run(questions.map((q) => pick(q.answers).id));
  bump(reach.slayer, r.slayer[0].id);
  bump(reach.demon, r.demon[0].id);
  bump(breathR, r.breath);
}
for (const c of characters) {
  const p = (reach[c.pool][c.id] ?? 0) / N3;
  if (p < 0.002) fails.push(`reach ${c.id} ${(100 * p).toFixed(2)}% < 0.2%`);
}
for (const b of breathing) {
  const p = (breathR[b.id] ?? 0) / N3;
  if (!b.rare && p < 0.002) fails.push(`reach breathing ${b.id} ${(100 * p).toFixed(2)}% < 0.2%`);
}

if (!quiet) {
  const pct = (n, d) => `${((100 * (n ?? 0)) / d).toFixed(1)}%`;
  console.log('id'.padEnd(12), 'fidelity', 'persona', ' random');
  for (const c of characters) {
    console.log(c.id.padEnd(12), `${(fidelity[c.id] * 100).toFixed(0)}%`.padStart(8), pct(spread[c.pool][c.id], N2).padStart(7), pct(reach[c.pool][c.id], N3).padStart(7));
  }
  console.log('breathing persona:', Object.entries(breathP).map(([k, v]) => `${k} ${pct(v, N2)}`).join(', '));
  console.log('breathing random :', Object.entries(breathR).map(([k, v]) => `${k} ${pct(v, N3)}`).join(', '));
  console.log('ranks persona    :', Object.entries(rankP).map(([k, v]) => `${k} ${pct(v, N2)}`).join(', '));
}
if (fails.length) {
  console.error(`BALANCE FAIL (${fails.length})\n` + fails.join('\n'));
  process.exit(1);
}
console.log('BALANCE OK');
