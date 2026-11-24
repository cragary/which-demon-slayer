import { QUESTIONS } from './questions.js';
import { SLAYERS } from './characters.slayers.js';
import { DEMONS } from './characters.demons.js';
import { BREATHING } from './breathing.js';
import { RANKS } from './ranks.js';

export const DATA = { questions: QUESTIONS, characters: [...SLAYERS, ...DEMONS], breathing: BREATHING, ranks: RANKS };
export const charById = (id) => DATA.characters.find((c) => c.id === id);
