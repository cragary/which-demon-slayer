import { distance } from './score.js';
import { RANKS } from '../data/ranks.js';

export const SUN_GATE = 8.5;

/** Nearest non-rare breathing style; Sun only when composure, compassion and discipline all clear the gate. */
export function breathingFor(traits, styles) {
  if (traits.composure >= SUN_GATE && traits.compassion >= SUN_GATE && traits.discipline >= SUN_GATE) {
    const sun = styles.find((s) => s.id === 'sun');
    if (sun) return sun.id;
  }
  let best = null;
  for (const s of styles) {
    if (s.rare) continue;
    const d = distance(traits, s.traits);
    if (!best || d < best.d) best = { id: s.id, d };
  }
  return best?.id;
}

export function rankFor(resolve, maxResolve, ranks = RANKS) {
  const ratio = maxResolve > 0 ? resolve / maxResolve : 0;
  const index = ranks.findIndex((r) => ratio < r.below);
  const i = index === -1 ? ranks.length - 1 : index;
  return { ...ranks[i], index: i };
}
