// Demon pool: framed as "your demon side". Playful, never insulting. Spoiler line: Swordsmith Village arc.
// traits order: composure, compassion, intensity, playfulness, discipline, independence, ambition, ruthlessness (0–10).
import { TRAITS } from '../core/traits.js';

const dm = (id, name, title, t, palette, blurb, phrases) => ({
  id, name, pool: 'demon', title, palette, blurb, phrases,
  traits: Object.fromEntries(TRAITS.map((k, i) => [k, t[i]])),
});

export const DEMONS = [
  dm('muzan', 'Muzan Kibutsuji', 'The Demon King', [5, 0, 8, 1, 6, 10, 10, 10], ['#1b1b1b', '#922b21', '#f5f5f5'],
    'Your demon side wants control, perfection and the last word, forever.', {
      ambition: 'Your demon side, like Muzan, wants to be flawless and untouchable, and expects the world to adjust.',
      independence: 'Your demon side, like Muzan, trusts nobody and delegates only to people it can replace.',
      ruthlessness: 'Your demon side, like Muzan, has zero patience for anyone who disappoints it.',
      intensity: 'Your demon side, like Muzan, turns a calm face into a storm in half a second.',
    }),
  dm('kokushibo', 'Kokushibo', 'Upper Moon One', [9, 1, 3, 0, 10, 8, 7, 8], ['#4a235a', '#b03a2e', '#f4d03f'],
    'Your demon side is a perfectionist that will trade anything to become the very best.', {
      discipline: 'Your demon side, like Kokushibo, trains for centuries if that is what perfection costs.',
      ambition: 'Your demon side, like Kokushibo, cannot stand being second, to anyone.',
      composure: 'Your demon side, like Kokushibo, is cold, controlled and very hard to rattle.',
      independence: 'Your demon side, like Kokushibo, walks alone and prefers it.',
    }),
  dm('doma', 'Doma', 'Upper Moon Two', [8, 4, 2, 10, 3, 7, 5, 10], ['#d6eaf8', '#c39bd3', '#a93226'],
    'Your demon side is all smiles and charm, with absolutely nothing going on behind the eyes.', {
      playfulness: 'Your demon side, like Doma, is cheerful, chatty and charming at the worst possible moments.',
      ruthlessness: 'Your demon side, like Doma, can smile sweetly while doing something terrible.',
      composure: 'Your demon side, like Doma, never loses its cool, because it never really feels anything.',
      independence: 'Your demon side, like Doma, floats above everyone else\'s drama.',
    }),
  dm('akaza', 'Akaza', 'Upper Moon Three', [3, 4, 10, 5, 9, 8, 10, 5], ['#c0392b', '#1a5276', '#f5cba7'],
    'Your demon side lives for the fight and respects nothing but strength.', {
      intensity: 'Your demon side, like Akaza, lives for a good fight, the harder the better.',
      ambition: 'Your demon side, like Akaza, always wants to be stronger, and wants you stronger too.',
      discipline: 'Your demon side, like Akaza, trains relentlessly and despises weakness.',
      independence: 'Your demon side, like Akaza, answers to no one but its own code.',
    }),
  dm('hantengu', 'Hantengu', 'Upper Moon Four', [1, 1, 6, 3, 3, 7, 4, 8], ['#7d6608', '#1e8449', '#922b21'],
    'Your demon side is a master of "it wasn\'t my fault", splitting into excuses on demand.', {
      ruthlessness: 'Your demon side, like Hantengu, always finds someone else to blame.',
      independence: 'Your demon side, like Hantengu, would rather hide than face the music.',
      intensity: 'Your demon side, like Hantengu, can split into a dozen moods in seconds.',
      ambition: 'Your demon side, like Hantengu, mostly just wants to survive the day.',
    }),
  dm('gyokko', 'Gyokko', 'Upper Moon Five', [4, 0, 5, 8, 5, 9, 9, 8], ['#1abc9c', '#f7dc6f', '#6c3483'],
    'Your demon side is a self-declared artistic genius who will not take criticism.', {
      ambition: 'Your demon side, like Gyokko, believes its work is a masterpiece, and demands applause.',
      independence: 'Your demon side, like Gyokko, creates alone, for an audience of one.',
      playfulness: 'Your demon side, like Gyokko, is dramatic, theatrical and very proud of its vases.',
      ruthlessness: 'Your demon side, like Gyokko, takes any critique very, very personally.',
    }),
  dm('daki', 'Daki', 'Upper Moon Six', [1, 1, 9, 8, 2, 3, 8, 9], ['#e91e63', '#212121', '#f8bbd0'],
    'Your demon side is a diva: gorgeous, vain and furious when ignored.', {
      ruthlessness: 'Your demon side, like Daki, has no patience for anyone it considers beneath it.',
      intensity: 'Your demon side, like Daki, throws spectacular tantrums.',
      ambition: 'Your demon side, like Daki, needs to be the most beautiful, the most admired, always.',
      playfulness: 'Your demon side, like Daki, loves being the centre of attention.',
    }),
  dm('gyutaro', 'Gyutaro', 'Upper Moon Six', [3, 6, 9, 4, 5, 4, 5, 9], ['#2e4053', '#16a085', '#922b21'],
    'Your demon side is bitter about the world, but would burn it down for the one person it loves.', {
      ruthlessness: 'Your demon side, like Gyutaro, keeps score, and collects every debt.',
      intensity: 'Your demon side, like Gyutaro, has a jealousy that burns hot.',
      compassion: 'Your demon side, like Gyutaro, is twisted, but loyal to its family to the very end.',
      ambition: 'Your demon side, like Gyutaro, wants what everyone else was handed for free.',
    }),
  dm('kaigaku', 'Kaigaku', 'Jigoro\'s other student', [3, 1, 7, 2, 5, 9, 9, 8], ['#1c2833', '#f4d03f', '#7b241c'],
    'Your demon side is proud, resentful and convinced it deserves more recognition.', {
      ambition: 'Your demon side, like Kaigaku, believes it deserves the top spot, and resents anyone who gets it.',
      independence: 'Your demon side, like Kaigaku, trusts only itself.',
      ruthlessness: 'Your demon side, like Kaigaku, looks down on anyone it considers weaker.',
      intensity: 'Your demon side, like Kaigaku, crackles with barely-contained anger.',
    }),
  dm('nakime', 'Nakime', 'The biwa player of the Infinity Castle', [8, 0, 1, 1, 5, 9, 3, 7], ['#4a235a', '#d4ac0d', '#1b1b1b'],
    'Your demon side is silent, precise and quietly runs the whole operation.', {
      composure: 'Your demon side, like Nakime, never says a word more than necessary.',
      discipline: 'Your demon side, like Nakime, keeps everything running with a single, perfect note.',
      independence: 'Your demon side, like Nakime, does its job alone and wants no company.',
      ruthlessness: 'Your demon side, like Nakime, is efficient, and not at all sentimental.',
    }),
  dm('rui', 'Rui', 'Lower Moon Five, the spider "family"', [5, 5, 6, 2, 7, 3, 5, 9], ['#ecf0f1', '#c0392b', '#7f8c8d'],
    'Your demon side wants a perfect family, on its own very strict terms.', {
      ruthlessness: 'Your demon side, like Rui, has rules, and does not forgive anyone who breaks them.',
      discipline: 'Your demon side, like Rui, wants everyone in their proper role.',
      intensity: 'Your demon side, like Rui, has a quiet, cold fury.',
      ambition: 'Your demon side, like Rui, wants bonds so strong nothing can break them.',
    }),
  dm('enmu', 'Enmu', 'Lower Moon One, master of dreams', [6, 0, 3, 8, 3, 8, 7, 9], ['#5b2c6f', '#a3e4d7', '#1b1b1b'],
    'Your demon side loves a mind game and enjoys watching people squirm, very politely.', {
      ruthlessness: 'Your demon side, like Enmu, enjoys a little too much the moment someone realises they were tricked.',
      playfulness: 'Your demon side, like Enmu, treats everything as a game, especially other people.',
      independence: 'Your demon side, like Enmu, prefers to work behind the scenes.',
      ambition: 'Your demon side, like Enmu, is always angling for a promotion.',
    }),
  dm('kyogai', 'Kyogai', 'The drum demon', [2, 2, 7, 4, 6, 8, 8, 6], ['#6e2c00', '#f0b27a', '#1b1b1b'],
    'Your demon side is an unrecognised artist with a grudge and a drum.', {
      ambition: 'Your demon side, like Kyogai, desperately wants its work to be taken seriously.',
      independence: 'Your demon side, like Kyogai, shuts itself away to stew.',
      intensity: 'Your demon side, like Kyogai, flips the whole room upside down when provoked.',
      discipline: 'Your demon side, like Kyogai, will not let anyone step on its manuscripts.',
    }),
  dm('susamaru', 'Susamaru', 'The temari demon', [1, 2, 6, 9, 2, 4, 7, 7], ['#e74c3c', '#f5b041', '#ffffff'],
    'Your demon side just wants to play, and loudly demands someone play with it.', {
      playfulness: 'Your demon side, like Susamaru, turns everything into a game of catch, a dangerous one.',
      intensity: 'Your demon side, like Susamaru, has all the energy of a child at a festival.',
      ambition: 'Your demon side, like Susamaru, loves to show off what it can do.',
      ruthlessness: 'Your demon side, like Susamaru, does not know when the game has gone too far.',
    }),
];
