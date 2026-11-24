// 20 everyday questions: situations anyone lives, whatever their job, age or country
// (no offices, no show vocabulary; the Demon Slayer world lives in the frame and the results).
// Each answer: deltas (−2..2) per trait, resolve 0–2 (how decisive / steady).
// Trait keys: composure, compassion, intensity, playfulness, discipline, independence, ambition, ruthlessness.
const q = (id, text, answers) => ({
  id,
  text,
  answers: answers.map(([text, deltas, resolve], i) => ({ id: `${id}${'abcd'[i]}`, text, deltas, resolve })),
});

export const QUESTIONS = [
  q('q1', 'Late at night, a friend calls: they need your help with something right now, across town. You…', [
    ['Are out the door in two minutes. You’re always ready.', { discipline: 2, composure: 1 }, 2],
    ['Groan, ask for ten more minutes, then rush to make up for it.', { playfulness: 2, discipline: -1, intensity: 1 }, 1],
    ['Call one or two others, so nobody handles it alone.', { independence: -2, compassion: 1 }, 1],
    ['Ask what’s in it for you before you move.', { ambition: 2, compassion: -1 }, 0],
  ]),
  q('q2', 'Someone younger than you freezes in front of a crowd they have to speak to. You…', [
    ['Step up next to them without a word.', { compassion: 2, composure: 1 }, 2],
    ['Tell them firmly to pull it together. Everyone is watching.', { intensity: 2, compassion: -1, ruthlessness: 1 }, 2],
    ['Quietly walk them through it: breathe, look at one face, start.', { composure: 2, compassion: 1, independence: -1 }, 1],
    ['Let them struggle. That’s how people learn.', { ruthlessness: 2, compassion: -2 }, 1],
  ]),
  q('q3', 'You’ve been trying to learn something hard for weeks, and it still isn’t working. You…', [
    ['Keep practising, every day, for as long as it takes.', { discipline: 2, composure: 1 }, 2],
    ['Look for a shortcut. There’s always a smarter way.', { independence: 1, playfulness: 1, discipline: -1, ambition: 1 }, 1],
    ['Complain loudly to anyone nearby, then keep going anyway.', { playfulness: 1, intensity: 1, composure: -2 }, 1],
    ['Decide it’s beneath you. You’re meant for bigger things.', { ambition: 2, discipline: -2 }, 0],
  ]),
  q('q4', 'For once, all your friends are free on the same evening. You are…', [
    ['Cooking for everyone and making sure they all eat before you.', { compassion: 2, independence: -2, playfulness: 1 }, 1],
    ['Slipping away to work on your own thing, alone.', { discipline: 2, independence: 2, playfulness: -1 }, 1],
    ['Starting a loud game or contest, and winning it.', { playfulness: 2, ambition: 1, intensity: 1 }, 1],
    ['Sitting back and listening to everyone talk.', { composure: 2, intensity: -2 }, 1],
  ]),
  q('q5', 'Someone offers you a big opportunity, but only if you go behind a friend’s back. You…', [
    ['Say no straight away. Some lines don’t move.', { ruthlessness: -2, discipline: 1, composure: 1 }, 2],
    ['Laugh in their face and tell your friend everything.', { intensity: 2, playfulness: 1, ambition: -1 }, 2],
    ['Hesitate. Just for a second, you’re tempted.', { ambition: 2, composure: -1 }, 0],
    ['Pretend to agree, then turn it against them.', { ruthlessness: 2, independence: 1, compassion: -1 }, 1],
  ]),
  q('q6', 'Someone mocks your friend in front of a group. You…', [
    ['Get right up in their face. Now.', { intensity: 2, compassion: 1, composure: -2 }, 2],
    ['Say one cold sentence that ends it.', { composure: 1, ruthlessness: 1, playfulness: -1 }, 2],
    ['Crack a joke that turns everyone against them.', { playfulness: 2, compassion: 1 }, 1],
    ['Stay out of it. Not your business.', { independence: 2, compassion: -2 }, 0],
  ]),
  q('q7', 'The person in charge (an elder, a parent, a coach, whoever) tells you to do something a way you’re sure is wrong. You…', [
    ['Do it their way anyway. They’re in charge for a reason.', { discipline: 2, independence: -2 }, 1],
    ['Ignore them and do it your own way, alone.', { independence: 2, ambition: 1, discipline: -1 }, 2],
    ['Work out a better plan and show it to them before you start.', { discipline: 1, ambition: 1, independence: -1, composure: 1 }, 2],
    ['Jump in and improvise. Plans are for the cautious.', { intensity: 2, playfulness: 1, composure: -1 }, 1],
  ]),
  q('q8', 'Which compliment would mean the most to you?', [
    ['"Nobody is stronger than you."', { ambition: 2, intensity: 1, compassion: -1 }, 1],
    ['"You never let anyone down."', { compassion: 1, discipline: 1, independence: -1 }, 1],
    ['"Everything is brighter when you’re around."', { playfulness: 2, compassion: 1 }, 1],
    ['"Nothing ever seems to shake you."', { composure: 2, intensity: -1 }, 1],
  ]),
  q('q9', 'You lose at something in front of everyone: a game, a match, an argument. You…', [
    ['Congratulate them and ask for a rematch.', { composure: 1, discipline: 2, ambition: 1 }, 2],
    ['Seethe. You’ll practise until you crush them.', { ambition: 2, intensity: 2, compassion: -1 }, 1],
    ['Laugh it off. Food is waiting.', { playfulness: 2, ambition: -2 }, 1],
    ['Quietly decide they’ll pay for it one day.', { ruthlessness: 2, compassion: -2, composure: 1 }, 0],
  ]),
  q('q10', 'An elderly neighbour proudly serves you a dish you really can’t stand. You…', [
    ['Eat every bite and thank them warmly.', { compassion: 2, discipline: 1 }, 1],
    ['Politely say it’s not for you. Honesty first.', { composure: 1, independence: 1, playfulness: -1 }, 1],
    ['Make a big dramatic show of struggling through it.', { playfulness: 2, composure: -1 }, 0],
    ['Push the plate away. You don’t eat what you don’t like.', { ruthlessness: 1, compassion: -2, independence: 1 }, 1],
  ]),
  q('q11', 'When a disagreement turns into a real conflict, your style is to…', [
    ['Hit hard and fast, and settle it right away.', { intensity: 2, ruthlessness: 1, composure: -1 }, 2],
    ['Stay patient: listen, and wait for the right moment.', { composure: 2, discipline: 1, intensity: -2 }, 1],
    ['Keep them guessing. You never do the expected thing.', { playfulness: 1, independence: 1, discipline: -2 }, 1],
    ['Protect the people around you first. Winning comes second.', { compassion: 2, independence: -2 }, 2],
  ]),
  q('q12', 'Someone who hurt people you love breaks down in tears and begs you to forgive them. You…', [
    ['Forgive them, and mean it.', { compassion: 2, composure: 1, ruthlessness: -1 }, 2],
    ['Walk away. Tears don’t undo what they did.', { ruthlessness: 2, intensity: 1, compassion: -1 }, 2],
    ['Freeze. You don’t know what to feel.', { compassion: 1, composure: -2, ruthlessness: -2 }, 0],
    ['Ask questions first. You want to understand what happened.', { discipline: 1, independence: 1, composure: 1 }, 1],
  ]),
  q('q13', 'If you could live anywhere, for good, you’d choose…', [
    ['A lively neighbourhood where everyone knows your name.', { independence: -2, playfulness: 1, compassion: 1 }, 1],
    ['A quiet place, far from everyone.', { independence: 2, composure: 1, playfulness: -1 }, 1],
    ['A big, beautiful house. You’d have earned it.', { ambition: 2, playfulness: 1 }, 1],
    ['A place where you can teach and pass on what you know.', { discipline: 2, compassion: 1, ambition: -1 }, 1],
  ]),
  q('q14', 'Someone takes credit, in front of everyone, for something you did. You…', [
    ['Let it go. It got done, and that’s what matters.', { compassion: 1, ambition: -2, composure: 1 }, 1],
    ['Set the record straight, loudly, right there.', { ambition: 2, intensity: 1 }, 2],
    ['Feel hurt and say nothing.', { composure: -1, independence: 1, intensity: -1 }, 0],
    ['Remember it. It won’t happen twice.', { ruthlessness: 2, ambition: 1 }, 1],
  ]),
  q('q15', 'What scares you most?', [
    ['Losing the people you love.', { compassion: 2, independence: -1 }, 1],
    ['Being forgotten.', { ambition: 2, playfulness: 1 }, 1],
    ['Dying. You’d do almost anything to stay alive.', { ruthlessness: 2, ambition: 1, compassion: -1 }, 0],
    ['Being weak when it really matters.', { discipline: 1, intensity: 2 }, 2],
  ]),
  q('q16', 'Everything is going wrong around you: people are hurt, shouting, panicking. You…', [
    ['Look after the people who are hurt first, then deal with the rest.', { compassion: 2, composure: 1, discipline: 1 }, 2],
    ['Charge straight at the problem, alone, right now.', { intensity: 2, independence: 2, composure: -1 }, 2],
    ['Call for help and organise everyone to hold things together.', { discipline: 2, independence: -2, composure: 1 }, 1],
    ['Hang back and watch until you see exactly where to strike.', { ruthlessness: 1, composure: 2, compassion: -2 }, 1],
  ]),
  q('q17', 'Your friends would sum you up in one word:', [
    ['Loud.', { intensity: 2, playfulness: 1, composure: -1 }, 1],
    ['Kind.', { compassion: 2, ruthlessness: -1 }, 1],
    ['Mysterious.', { independence: 2, playfulness: -2, composure: 1 }, 1],
    ['Driven.', { ambition: 2, discipline: 1 }, 1],
  ]),
  q('q18', 'There’s a big celebration in your neighbourhood on your only day off. You…', [
    ['Are first in line for every game and every snack.', { playfulness: 2, intensity: 1, discipline: -1 }, 1],
    ['Go, mostly to keep an eye on the younger ones.', { compassion: 2, discipline: 1, playfulness: -1 }, 1],
    ['Skip it. You’ve got things to work on.', { discipline: 2, playfulness: -2 }, 1],
    ['Go alone and watch it all from a quiet spot.', { independence: 2, composure: 1 }, 1],
  ]),
  q('q19', 'Someone brilliant at what you want to learn offers to teach you, but they’re harsh and cruel. You…', [
    ['Accept. Results are results.', { ambition: 2, ruthlessness: 1, compassion: -1 }, 2],
    ['Refuse. You’ll find your own way.', { independence: 2, ruthlessness: -1, discipline: 1 }, 1],
    ['Accept, and try to soften them along the way.', { compassion: 2, playfulness: 1 }, 1],
    ['Accept, keep your head down and get through it.', { discipline: 2, composure: 1, intensity: -1 }, 1],
  ]),
  q('q20', 'After the longest, hardest day you’ve had in ages, you finally lie down. You feel…', [
    ['Quiet gratitude.', { composure: 2, compassion: 1, ambition: -1 }, 1],
    ['Hungry. Very hungry.', { playfulness: 2, intensity: -1 }, 1],
    ['Already thinking about tomorrow’s fights.', { intensity: 1, ambition: 2 }, 2],
    ['A little let down that it’s over. Chaos is when you feel most alive.', { ruthlessness: 2, independence: 1, compassion: -1 }, 0],
  ]),
];
