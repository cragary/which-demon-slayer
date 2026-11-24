import { TRAITS } from './traits.js';

/**
 * 2–3 sentences on why this character fits: the character's strongest traits (top 4) where
 * the user sits closest, voiced through the character's phrases, plus one of the user's own answers.
 */
export function explain(userTraits, character, answers) {
  const top = [...TRAITS].sort((a, b) => character.traits[b] - character.traits[a]).slice(0, 4);
  const picked = top
    .filter((t) => character.phrases?.[t])
    .sort((a, b) => Math.abs(userTraits[a] - character.traits[a]) - Math.abs(userTraits[b] - character.traits[b]))
    .slice(0, 2);
  if (picked.length === 0) return [character.blurb];
  const out = picked.map((t) => character.phrases[t]);
  if (answers?.length) {
    const lead = picked[0];
    const best = [...answers].sort((a, b) => (b.answer.deltas[lead] ?? 0) - (a.answer.deltas[lead] ?? 0))[0];
    if ((best.answer.deltas[lead] ?? 0) > 0) out.push(`You chose: "${best.answer.text}"`);
  }
  return out;
}
