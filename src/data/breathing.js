// Breathing styles, each with its own 8-trait profile. Sun is a rare easter egg (gate in core/bonus.js).
import { TRAITS } from '../core/traits.js';

const br = (id, name, t, color, line, rare) => ({
  id, name, color, line, ...(rare ? { rare: true } : {}),
  traits: Object.fromEntries(TRAITS.map((k, i) => [k, t[i]])),
});

export const BREATHING = [
  br('water', 'Water Breathing', [8, 8, 3, 3, 8, 5, 3, 2], '#2e86c1', 'Adaptable and calm: you flow around problems instead of smashing into them.'),
  br('flame', 'Flame Breathing', [6, 8, 9, 7, 8, 4, 6, 2], '#e67e22', 'All heart, all heat: you go forward with your whole chest.'),
  br('thunder', 'Thunder Breathing', [3, 6, 7, 5, 6, 6, 4, 2], '#f1c40f', 'One perfect move, done faster than anyone can blink.'),
  br('wind', 'Wind Breathing', [3, 5, 10, 2, 7, 8, 6, 7], '#27ae60', 'Raw, cutting and relentless: you do not slow down for anybody.'),
  br('stone', 'Stone Breathing', [9, 9, 4, 1, 10, 5, 2, 2], '#795548', 'Unmovable and steady: you are the ground other people stand on.'),
  br('mist', 'Mist Breathing', [8, 3, 3, 2, 7, 9, 3, 4], '#85c1e9', 'Hard to read and harder to catch: you drift, then strike.'),
  br('serpent', 'Serpent Breathing', [7, 3, 6, 2, 8, 8, 5, 6], '#8e44ad', 'Winding and precise: you find the angle nobody else sees.'),
  br('love', 'Love Breathing', [4, 10, 6, 9, 6, 2, 4, 1], '#f5a6c8', 'Flexible, joyful and stronger than it looks.'),
  br('sound', 'Sound Breathing', [6, 6, 8, 10, 7, 5, 8, 4], '#d4af37', 'Loud, rhythmic, explosive: you make an entrance.'),
  br('insect', 'Insect Breathing', [8, 6, 4, 7, 9, 6, 4, 6], '#16a085', 'Light, clever and lethal in exactly the right dose.'),
  br('beast', 'Beast Breathing', [2, 4, 10, 7, 1, 9, 8, 3], '#5d6d7e', 'No rules, no form: pure instinct and teeth.'),
  br('flower', 'Flower Breathing', [8, 7, 2, 3, 8, 6, 3, 3], '#c98bb9', 'Graceful and precise: beauty that hides a sharp edge.'),
  br('sun', 'Sun Breathing', [10, 10, 5, 4, 10, 5, 2, 1], '#c0392b', 'The rarest of all. Calm, kind and disciplined at once: the original breath.', true),
];
