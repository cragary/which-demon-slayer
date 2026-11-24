# Which Demon Slayer Are You?

An unofficial fan quiz. Twenty situational questions match you to a **Slayer**, your **demon side**, a **breathing style** and a **Demon Slayer Corps rank**. You also get a badge to download, print or share.

Live at `https://cragary.github.io/which-demon-slayer/`. Not affiliated with Koyoharu Gotouge, Shueisha, ufotable or Aniplex, and no official art is used. Every character is an original pixel emblem.

## Run it

```
npm install
npm test          # unit tests, data validation, balance check, build
npm run build     # writes dist/
npm run serve     # http://localhost:4173
```

A push to `main` deploys through GitHub Actions to GitHub Pages: tests, then build, then deploy.

## How matching works

- Each answer moves 8 traits (`src/data/questions.js`): composure, compassion, intensity, playfulness, discipline, independence, ambition and ruthlessness. It also carries a hidden *resolve* value (0–2), which sets your rank.
- Your profile is compared by **shape** to each character's: centred cosine. You are centred on the "neutral answerer", and each character on its pool's average. That way strong characters like Gyomei or Muzan stay reachable even though every answer is a trade-off.
- Breathing works the same way, against `src/data/breathing.js`. Sun breathing is a rare easter egg (`SUN_MARGIN` in `src/core/bonus.js`).

## Add a character

1. Add one entry to `src/data/characters.slayers.js` or `characters.demons.js`: 8 trait scores (0–10), 3 colours, a blurb, and phrases for its strongest traits. Keep it spoiler-free up to the Swordsmith Village arc.
2. Give it a motif in `src/data/emblems.js` (`MOTIF`). Reuse an existing motif or draw a new 16×16 one.
3. Add its id to `ROSTER` in `src/core/validate.js`.
4. Run `npm run balance`. It shows whether the new character is reachable and doesn't steal results from others. Adjust traits until it says `BALANCE OK`.

## Owner TODO

`src/data/characters.slayers.js` has a `TODO(owner)` on **Gyomei**. Replace the draft traits and phrases with your own read of him, then run `npm run balance`.
