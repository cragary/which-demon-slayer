import { TRAITS } from './traits.js';
import { centredCosine, meanProfile } from './score.js';
import { RANKS } from '../data/ranks.js';

/** Sun breathing: composure, compassion and discipline all at least this far above the user's neutral centre. */
export const SUN_MARGIN = 1.4;
const FLAT5 = Object.fromEntries(TRAITS.map((t) => [t, 5]));

/** Nearest non-rare breathing style by profile shape; Sun only when the three Sun traits clear the gate. */
export function breathingFor(traits, styles, center = FLAT5) {
  const gate = (t) => traits[t] >= center[t] + SUN_MARGIN;
  if (gate('composure') && gate('compassion') && gate('discipline')) {
    const sun = styles.find((s) => s.id === 'sun');
    if (sun) return sun.id;
  }
  const common = styles.filter((s) => !s.rare);
  const mean = meanProfile(common);
  let best = null;
  for (const s of common) {
    const cos = centredCosine(traits, center, s.traits, mean);
    if (!best || cos > best.cos) best = { id: s.id, cos };
  }
  return best?.id;
}

export function rankFor(resolve, maxResolve, ranks = RANKS) {
  const ratio = maxResolve > 0 ? resolve / maxResolve : 0;
  const index = ranks.findIndex((r) => ratio < r.below);
  const i = index === -1 ? ranks.length - 1 : index;
  return { ...ranks[i], index: i };
}
