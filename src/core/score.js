import { TRAITS, normalise, traitBounds } from './traits.js';

const boundsCache = new WeakMap();
const boundsFor = (qs) => {
  if (!boundsCache.has(qs)) boundsCache.set(qs, traitBounds(qs));
  return boundsCache.get(qs);
};

/** Turn chosen answer ids into a normalised trait profile + resolve total. */
export function scoreAnswers(answerIds, questions) {
  const chosen = new Set(answerIds);
  const raw = Object.fromEntries(TRAITS.map((t) => [t, 0]));
  let resolve = 0;
  let maxResolve = 0;
  for (const q of questions) {
    maxResolve += Math.max(...q.answers.map((a) => a.resolve));
    const a = q.answers.find((x) => chosen.has(x.id));
    if (!a) continue;
    for (const [t, d] of Object.entries(a.deltas)) raw[t] += d;
    resolve += a.resolve;
  }
  return { traits: normalise(raw, boundsFor(questions)), resolve, maxResolve };
}

export function distance(a, b, weights) {
  let sum = 0;
  for (const t of TRAITS) sum += (weights?.[t] ?? 1) * (a[t] - b[t]) ** 2;
  return Math.sqrt(sum);
}

const DMAX = Math.sqrt(TRAITS.length * 100);

/** Display-friendly match %: 99 for a perfect profile, floored at 35. */
export const similarity = (d) => Math.min(99, Math.max(35, Math.round(100 * (1 - d / (0.6 * DMAX)))));

/** Characters of one pool, nearest first. */
export function matchPool(traits, characters, pool, weights) {
  return characters
    .filter((c) => c.pool === pool)
    .map((c) => {
      const d = distance(traits, c.traits, weights);
      return { id: c.id, distance: Math.round(d * 1000) / 1000, similarity: similarity(d) };
    })
    .sort((x, y) => x.distance - y.distance);
}
