import { scoreAnswers, centredCosine, meanProfile } from './score.js';

/**
 * How a character would answer if they took the quiz: the answer set whose resulting profile best matches
 * the character's shape (centred on its pool mean). Greedy start, then a few passes of coordinate ascent.
 */
export function personaFor(character, questions, characters) {
  const pool = characters ? characters.filter((c) => c.pool === character.pool) : [character];
  const mean = meanProfile(pool);
  const fit = (ids) => {
    const s = scoreAnswers(ids, questions);
    return centredCosine(s.traits, s.center, character.traits, mean);
  };
  const ids = questions.map((q) => q.answers[0].id);
  let best = fit(ids);
  for (let pass = 0; pass < 4; pass++) {
    let improved = false;
    questions.forEach((q, i) => {
      for (const a of q.answers) {
        const prev = ids[i];
        ids[i] = a.id;
        const f = fit(ids);
        if (f > best + 1e-9) { best = f; improved = true; } else ids[i] = prev;
      }
    });
    if (!improved) break;
  }
  return ids;
}
