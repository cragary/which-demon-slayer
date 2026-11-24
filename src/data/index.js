import { QUESTIONS } from './questions.js';
import { SLAYERS } from './characters.slayers.js';
import { DEMONS } from './characters.demons.js';
import { BREATHING } from './breathing.js';
import { RANKS } from './ranks.js';
import { TEXT_FR } from './text.fr.js';
import { STRINGS } from './strings.en.js';
import { STRINGS_FR } from './strings.fr.js';
import { localize } from '../core/localize.js';

export const LANGS = ['en', 'fr'];
export const DATA = { questions: QUESTIONS, characters: [...SLAYERS, ...DEMONS], breathing: BREATHING, ranks: RANKS };
const FR = localize(DATA, TEXT_FR);

export const dataFor = (lang) => (lang === 'fr' ? FR : DATA);
export const stringsFor = (lang) => (lang === 'fr' ? STRINGS_FR : STRINGS);
export const charById = (id, data = DATA) => data.characters.find((c) => c.id === id);
