// 20 situational questions. Each answer: deltas (−2..2) per trait, resolve 0–2 (how decisive / steady).
// Trait keys: composure, compassion, intensity, playfulness, discipline, independence, ambition, ruthlessness.
const q = (id, text, answers) => ({
  id,
  text,
  answers: answers.map(([text, deltas, resolve], i) => ({ id: `${id}${'abcd'[i]}`, text, deltas, resolve })),
});

export const QUESTIONS = [
  q('q1', 'Midnight. Your crow lands on the windowsill screaming about an urgent mission two villages away. You…', [
    ['Are already dressed. You slept in your uniform anyway.', { discipline: 2, composure: 1 }, 2],
    ['Beg for five more minutes, then sprint the whole way to make up for it.', { playfulness: 2, discipline: -1, intensity: 1 }, 1],
    ['Wake the others. Nobody walks into the dark alone.', { independence: -2, compassion: 1 }, 1],
    ['Go, but first ask the crow what is in it for you.', { ambition: 2, compassion: -1 }, 0],
  ]),
  q('q2', 'A new recruit freezes in front of a demon. You…', [
    ['Step in front of them without a word.', { compassion: 2, composure: 1 }, 2],
    ['Yell at them to pull it together. Fear gets people killed.', { intensity: 2, compassion: -1, ruthlessness: 1 }, 2],
    ['Talk them through it calmly: breathe, stance, strike.', { composure: 2, compassion: 1, independence: -1 }, 1],
    ['Let them face it. That is how you learn who is worth training.', { ruthlessness: 2, compassion: -2 }, 1],
  ]),
  q('q3', 'Your teacher hands you a boulder and says: cut it. A week later, it has not moved. You…', [
    ['Keep going. Sunrise to sunset. Another week, another month.', { discipline: 2, composure: 1 }, 2],
    ['Look for a trick. There is always a cleverer way.', { independence: 1, playfulness: 1, discipline: -1, ambition: 1 }, 1],
    ['Cry about it loudly to anyone nearby, then keep going anyway.', { playfulness: 1, intensity: 1, composure: -2 }, 1],
    ['Decide the boulder is beneath you. You were meant for greater things.', { ambition: 2, discipline: -2 }, 0],
  ]),
  q('q4', 'After a brutal mission your squad finally gets a free evening. You are…', [
    ['Organising a feast and making sure everyone eats before you do.', { compassion: 2, independence: -2, playfulness: 1 }, 1],
    ['Training alone by the river.', { discipline: 2, independence: 2, playfulness: -1 }, 1],
    ['Starting a loud, flamboyant contest, and winning it.', { playfulness: 2, ambition: 1, intensity: 1 }, 1],
    ['Sitting quietly, listening to everyone else talk.', { composure: 2, intensity: -2 }, 1],
  ]),
  q('q5', 'A demon offers you real power in exchange for one small betrayal. You…', [
    ['Refuse instantly. Some lines do not move.', { ruthlessness: -2, discipline: 1, composure: 1 }, 2],
    ['Laugh in its face and attack.', { intensity: 2, playfulness: 1, ambition: -1 }, 2],
    ['Hesitate. Just for a second, you wonder.', { ambition: 2, composure: -1 }, 0],
    ['Pretend to accept, get close, then strike.', { ruthlessness: 2, independence: 1, compassion: -1 }, 1],
  ]),
  q('q6', 'Someone mocks your friend in the middle of the street. You…', [
    ['Grab them by the collar. Right now.', { intensity: 2, compassion: 1, composure: -2 }, 2],
    ['Say one cold sentence that ends the conversation.', { composure: 1, ruthlessness: 1, playfulness: -1 }, 2],
    ['Crack a joke that turns the whole crowd against them.', { playfulness: 2, compassion: 1 }, 1],
    ['Keep walking. Not your business.', { independence: 2, compassion: -2 }, 0],
  ]),
  q('q7', 'The mission plan you were handed is clearly bad. You…', [
    ['Follow it anyway. Orders exist for a reason.', { discipline: 2, independence: -2 }, 1],
    ['Ignore it and handle things your way, alone.', { independence: 2, ambition: 1, discipline: -1 }, 2],
    ['Rewrite it overnight and present it to the team at dawn.', { discipline: 1, ambition: 1, independence: -1, composure: 1 }, 2],
    ['Charge in and improvise. Plans are for the cautious.', { intensity: 2, playfulness: 1, composure: -1 }, 1],
  ]),
  q('q8', 'Which compliment would mean the most to you?', [
    ['"You are the strongest."', { ambition: 2, intensity: 1, compassion: -1 }, 1],
    ['"You never let anyone down."', { compassion: 1, discipline: 1, independence: -1 }, 1],
    ['"Being around you makes everything brighter."', { playfulness: 2, compassion: 1 }, 1],
    ['"Nothing ever seems to shake you."', { composure: 2, intensity: -1 }, 1],
  ]),
  q('q9', 'You lose a duel in front of everyone. You…', [
    ['Bow, thank them, and ask for a rematch tomorrow.', { composure: 1, discipline: 2, ambition: 1 }, 2],
    ['Seethe. You will train until you crush them.', { ambition: 2, intensity: 2, compassion: -1 }, 1],
    ['Shrug it off with a joke. Dinner is waiting.', { playfulness: 2, ambition: -2 }, 1],
    ['Quietly decide they will not be around for a rematch.', { ruthlessness: 2, compassion: -2, composure: 1 }, 0],
  ]),
  q('q10', 'A kind old villager serves you a dish you truly cannot stand. You…', [
    ['Eat every bite and thank them sincerely.', { compassion: 2, discipline: 1 }, 1],
    ['Politely decline. Honesty first.', { composure: 1, independence: 1, playfulness: -1 }, 1],
    ['Turn it into a dramatic performance of suffering.', { playfulness: 2, composure: -1 }, 0],
    ['Push the bowl away. You do not eat what you do not like.', { ruthlessness: 1, compassion: -2, independence: 1 }, 1],
  ]),
  q('q11', 'In a fight, your favourite approach is…', [
    ['Overwhelming force from the very first second.', { intensity: 2, ruthlessness: 1, composure: -1 }, 2],
    ['Patience. Read them, wait for the opening.', { composure: 2, discipline: 1, intensity: -2 }, 1],
    ['Speed and chaos. They will never predict you.', { playfulness: 1, independence: 1, discipline: -2 }, 1],
    ['Protecting the people behind you comes before winning.', { compassion: 2, independence: -2 }, 2],
  ]),
  q('q12', 'A cornered demon begs for mercy, weeping about the human it used to be. You…', [
    ['Grant it a peaceful end and say a prayer for it.', { compassion: 2, composure: 1, ruthlessness: -1 }, 2],
    ['Cut it down. Tears do not bring back its victims.', { ruthlessness: 2, intensity: 1, compassion: -1 }, 2],
    ['Freeze. You cannot make yourself do it.', { compassion: 1, composure: -2, ruthlessness: -2 }, 0],
    ['Ask questions first. What it knows could save lives.', { discipline: 1, independence: 1, composure: 1 }, 1],
  ]),
  q('q13', 'The war is over. Where do you live now?', [
    ['A busy town where everybody knows your name.', { independence: -2, playfulness: 1, compassion: 1 }, 1],
    ['A hut on a mountain, far from everyone.', { independence: 2, composure: 1, playfulness: -1 }, 1],
    ['A grand estate. You earned it.', { ambition: 2, playfulness: 1 }, 1],
    ['A dojo, so you can train the next generation.', { discipline: 2, compassion: 1, ambition: -1 }, 1],
  ]),
  q('q14', 'A teammate takes credit for the demon you slew. You…', [
    ['Let it go. The demon is gone, and that is what matters.', { compassion: 1, ambition: -2, composure: 1 }, 1],
    ['Correct the record, loudly and publicly.', { ambition: 2, intensity: 1 }, 2],
    ['Feel quietly hurt and say nothing.', { composure: -1, independence: 1, intensity: -1 }, 0],
    ['Remember it. You will make sure it never happens again.', { ruthlessness: 2, ambition: 1 }, 1],
  ]),
  q('q15', 'What scares you most?', [
    ['Losing the people you love.', { compassion: 2, independence: -1 }, 1],
    ['Being forgotten.', { ambition: 2, playfulness: 1 }, 1],
    ['Dying. You would do anything to keep living.', { ruthlessness: 2, ambition: 1, compassion: -1 }, 0],
    ['Being weak when it finally matters.', { discipline: 1, intensity: 2 }, 2],
  ]),
  q('q16', 'You arrive late: three slayers wounded, one demon still standing. You…', [
    ['Carry the wounded out first, then come back for it.', { compassion: 2, composure: 1, discipline: 1 }, 2],
    ['Take it on head-first, alone, right now.', { intensity: 2, independence: 2, composure: -1 }, 2],
    ['Send for backup and hold a defensive line.', { discipline: 2, independence: -2, composure: 1 }, 1],
    ['Wait in the shadows until it lets its guard down.', { ruthlessness: 1, composure: 2, compassion: -2 }, 1],
  ]),
  q('q17', 'Your friends would describe you in one word as…', [
    ['Loud.', { intensity: 2, playfulness: 1, composure: -1 }, 1],
    ['Kind.', { compassion: 2, ruthlessness: -1 }, 1],
    ['Mysterious.', { independence: 2, playfulness: -2, composure: 1 }, 1],
    ['Driven.', { ambition: 2, discipline: 1 }, 1],
  ]),
  q('q18', 'A festival comes to town on your one day off. You…', [
    ['Are first in line for every game and every snack.', { playfulness: 2, intensity: 1, discipline: -1 }, 1],
    ['Go, mostly to keep an eye on the younger ones.', { compassion: 2, discipline: 1, playfulness: -1 }, 1],
    ['Skip it. Training does not take days off.', { discipline: 2, playfulness: -2 }, 1],
    ['Go alone and watch the lanterns from a rooftop.', { independence: 2, composure: 1 }, 1],
  ]),
  q('q19', 'Someone far stronger than you offers to train you, but they are cruel. You…', [
    ['Accept. Strength is strength.', { ambition: 2, ruthlessness: 1, compassion: -1 }, 2],
    ['Refuse. You will find your own way.', { independence: 2, ruthlessness: -1, discipline: 1 }, 1],
    ['Accept, and try to soften them along the way.', { compassion: 2, playfulness: 1 }, 1],
    ['Accept, keep your head down, and endure.', { discipline: 2, composure: 1, intensity: -1 }, 1],
  ]),
  q('q20', 'The sun finally rises after the longest night of your life. You feel…', [
    ['Quiet gratitude.', { composure: 2, compassion: 1, ambition: -1 }, 1],
    ['Hungry. Extremely hungry.', { playfulness: 2, intensity: -1 }, 1],
    ['Already thinking about the next fight.', { intensity: 1, ambition: 2 }, 2],
    ['Annoyed. The night was when you felt strongest.', { ruthlessness: 2, independence: 1, compassion: -1 }, 0],
  ]),
];
