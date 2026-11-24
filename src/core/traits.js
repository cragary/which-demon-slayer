export const TRAITS = ['composure', 'compassion', 'intensity', 'playfulness', 'discipline', 'independence', 'ambition', 'ruthlessness'];

const round1 = (n) => Math.round(n * 10) / 10;

/** Scale raw trait sums onto 0–10 against the theoretical bounds of the question set. */
export function normalise(raw, bounds) {
  const out = {};
  for (const t of TRAITS) {
    const { min, max } = bounds[t];
    out[t] = max === min ? 5 : round1((10 * ((raw[t] ?? 0) - min)) / (max - min));
  }
  return out;
}

/** Per trait: sum over questions of the lowest / highest delta any answer gives (missing = 0). */
export function traitBounds(questions) {
  const b = Object.fromEntries(TRAITS.map((t) => [t, { min: 0, max: 0 }]));
  for (const q of questions) {
    for (const t of TRAITS) {
      const ds = q.answers.map((a) => a.deltas[t] ?? 0);
      b[t].min += Math.min(...ds);
      b[t].max += Math.max(...ds);
    }
  }
  return b;
}
