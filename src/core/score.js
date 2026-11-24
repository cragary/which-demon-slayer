import { TRAITS, normalise, traitBounds } from './traits.js';

const memo = (fn) => {
  const cache = new WeakMap();
  return (key) => {
    if (!cache.has(key)) cache.set(key, fn(key));
    return cache.get(key);
  };
};
const boundsFor = memo(traitBounds);

/** The profile an "average" answerer gets: expected raw score under uniform answers, normalised. */
export const neutralProfile = memo((questions) => {
  const raw = Object.fromEntries(TRAITS.map((t) => [t, 0]));
  for (const q of questions) {
    for (const t of TRAITS) raw[t] += q.answers.reduce((s, a) => s + (a.deltas[t] ?? 0), 0) / q.answers.length;
  }
  return normalise(raw, boundsFor(questions));
});

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
  return { traits: normalise(raw, boundsFor(questions)), resolve, maxResolve, center: neutralProfile(questions) };
}

export function meanProfile(items) {
  return Object.fromEntries(TRAITS.map((t) => [t, items.reduce((s, x) => s + x.traits[t], 0) / items.length]));
}

/** Cosine of (a − ca) and (b − cb); 0 when either vector is flat. */
export function centredCosine(a, ca, b, cb, weights) {
  let dot = 0, na = 0, nb = 0;
  for (const t of TRAITS) {
    const w = weights?.[t] ?? 1;
    const x = a[t] - ca[t];
    const y = b[t] - cb[t];
    dot += w * x * y; na += w * x * x; nb += w * y * y;
  }
  return na === 0 || nb === 0 ? 0 : dot / Math.sqrt(na * nb);
}

/** Display-friendly match % from a cosine: 99 when aligned, floored at 35. */
export const similarity = (cos) => Math.min(99, Math.max(35, Math.round(100 * (0.5 + 0.5 * cos))));

const FLAT5 = Object.fromEntries(TRAITS.map((t) => [t, 5]));

/**
 * Characters of one pool, nearest first. The user is centred on `center` (their neutral profile),
 * each character on its pool's mean, so we compare the *shape* of a personality, not raw levels.
 */
export function matchPool(traits, characters, pool, { center = FLAT5, weights } = {}) {
  const members = characters.filter((c) => c.pool === pool);
  const poolMean = meanProfile(members);
  return members
    .map((c) => {
      const cos = centredCosine(traits, center, c.traits, poolMean, weights);
      return { id: c.id, distance: Math.round((1 - cos) * 1e4) / 1e4, similarity: similarity(cos) };
    })
    .sort((x, y) => x.distance - y.distance);
}
