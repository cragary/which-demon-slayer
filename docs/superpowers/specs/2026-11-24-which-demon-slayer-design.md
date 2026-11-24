# "Which Demon Slayer Are You?" — Design

Date: 2026-11-24 · Status: final draft, awaiting owner approval

## Intent and why

A fun personality quiz for Demon Slayer fans worldwide. You answer situational questions and get the
character whose personality is closest to yours. It started when the owner noticed a co-worker whose
composure under pressure, expertise and readiness to help anyone strongly recalled Gyomei Himejima.
The quiz should capture that kind of insight: a match on character and temperament, not on surface
trivia.

Success means fans click it, feel their result is *earned* (the explanation rings true), and share
their badge, and the shared link pulls more fans in.

## Goals

- A quiz of about 20 situational questions, ~3–4 minutes, mobile-first.
- **Two results per person:** a **Slayer match** (slayers + allies pool) and a **Demon side**
  (demons pool). Each one shows a runner-up as well.
- **Why you match:** 2–3 sentences for each result, built from the traits where the person and the
  character are strongest and from the person's own answers. It must not read like a canned
  horoscope.
- **Two bonus results (owner's decision):** your **Breathing style** and your **Demon Slayer Corps
  rank** (see "Bonus results" below).
- **A shareable badge** showing both characters, breathing style, rank, the person's top traits, an optional display name and
  the quiz name. It can be downloaded as a PNG, printed, and shared through the native share sheet
  (Instagram, WhatsApp…) or intent links (X, Facebook, WhatsApp), plus copy link.
- **Share-ready links:** each pairing has its own URL. A posted link previews that person's Slayer
  character in its badge (see "Share links" below).
- **A large roster that is easy to extend:** about 40 characters at launch. Adding one is a data entry
  (traits, emblem, texts, colour) with no code changes.

## Non-goals (v1)

- No backend, accounts, stats ("8% got Gyomei") or analytics beyond what static hosting gives.
- No languages besides English, but every UI string lives in one file so translations can be added later.
- No sound or music.

## Anti-goals (failure even if it "works")

- **Using official art, faces, the logo or logo lettering**, even pixelated. Characters appear only as
  original **pixel-art emblems** (colours, element, signature object: Gyomei's stone and prayer beads,
  Rengoku's flame, Shinobu's butterfly…). The footer says: "Unofficial fan project. Not affiliated with
  Koyoharu Gotouge, Shueisha, ufotable or Aniplex."
- **Spoilers.** Result texts are written for someone who has only watched the anime up to the Swordsmith
  Village arc. Nothing about deaths, Kokushibo's human identity, Yoriichi's link to him, the final
  battle or Muzan's fate. Late-story characters (Yoriichi, Kokushibo, Nakime, Kaigaku) are described
  through their temperament only.
- **Dead characters:** characters nobody can ever get, or one character that takes most results.
- **Demon results that insult people.** The demon side is framed as your shadow or temptation ("your
  demon side"), playful and never cruel.
- Slow on a phone over a 3G connection.

## Constraints

- Static hosting only. **Launch address (owner's decision): `https://cragary.github.io/which-demon-slayer/`**,
  a GitHub Pages project site on the `cragary` account (the same account as the SIMPLE site). Base URL and
  base path are one config value, so a custom domain can be swapped in later.
- Works on current mobile Safari and Chrome; works without sign-in.
- Fonts must have open licences (OFL), embedded locally.

## Approaches considered

- **A. One page:** the simplest option, but every shared link shows the same generic preview.
- **B. A share-ready static site (chosen):** the same quiz plus pre-built pages for each result, each
  with its own preview image. This is what makes shared links pull in clicks. It is free to host.
- **C. A site with live stats:** needs a backend, adds cost and upkeep. Deferred.

The owner chose B. For demons, the owner chose **Slayer + Demon side** (two pools) over one mixed pool.

## How it works

### Trait model

There are 8 traits, each scored 0–10 for every character:

| Trait | Low end ↔ High end |
|---|---|
| Composure | Reactive ↔ Unshakeable |
| Compassion | Detached ↔ Protective / empathic |
| Intensity | Measured ↔ Fiery |
| Playfulness | Serious ↔ Flamboyant / goofy |
| Discipline | Free-spirited ↔ Rigorous / devoted to mastery |
| Independence | Team player ↔ Lone wolf |
| Ambition | Content ↔ Hungry for power / recognition |
| Ruthlessness | Merciful ↔ Will do anything |

Every answer adds positive or negative deltas to one or more traits. The person's raw sums are
normalised to 0–10. For each pool, the match is the character with the **smallest weighted Euclidean
distance**. The runner-up is the second smallest. A **similarity %** (shown on the result) comes from
that distance.

"Why you match" is built from (a) the 2–3 traits where the person and the character are both strongest
or closest, and (b) one answer the person gave that best illustrates that trait. Each character has a
short written blurb, plus per-trait phrases ("Like Gyomei, you went quiet and steady when everyone
else panicked").

### Roster (launch, ~42)

The owner wants every fan favourite in. The roster covers the main trio + Nezuko, all 9 Hashira, all
Upper Moons, and the most-loved supporting cast.

- **Slayer pool (28):** Tanjiro, Nezuko, Zenitsu, Inosuke, Kanao, Genya, Aoi, Murata, Sabito, Makomo,
  Urokodaki, Jigoro, Kanae, Senjuro, Yoriichi, Giyu, Rengoku, Shinobu, Tengen, Mitsuri, Muichiro,
  Obanai, Sanemi, Gyomei, Tamayo, Yushiro, Kagaya Ubuyashiki, Haganezuka.
- **Demon pool (14):** Muzan, Kokushibo, Doma, Akaza, Hantengu, Gyokko, Daki, Gyutaro, Kaigaku,
  Nakime, Rui, Enmu, Kyogai, Susamaru.
- Later candidates (data entry only): Shinjuro Rengoku, Kotetsu, Kiriya, Yahaba, the Hand Demon,
  Tanjiro's family.
- Open: the owner mentioned "Mahiko". Waiting to hear who they meant. Kokushibo is in either way.

Each character record holds: id/slug, name, pool, title (e.g. "Stone Hashira"), 8 traits, palette
(2–3 colours), emblem pixel grid, blurb, per-trait phrases.

### Bonus results

- **Breathing style:** it comes from the person's *trait vector*, not from their Slayer match, so a
  Tanjiro with Flame breathing can happen. Each style has its own 8-trait profile, and the nearest one
  wins: Water, Flame, Thunder, Wind, Stone, Mist, Serpent, Love, Sound, Insect, Beast and Flower.
  **Sun breathing** is a rare easter egg. It is only given when composure, compassion and discipline
  are all very high, and should come up in about 1% of persona runs. Moon breathing is left out because
  it belongs to a demon and is a spoiler.
- **Corps rank:** every answer also carries a hidden *resolve* value from 0 to 2: how decisive,
  steady and brave the choice is. The total maps onto the 10 ranks, Mizunoto (lowest) up to Kinoe,
  plus **Hashira** for the very top. The cut-offs are set so Hashira is rare (~5%). Low ranks get
  affectionate jokes ("Mizunoto. Murata believes in you."), never mean ones.
- Both bonus results get one line of explanation and appear on the badge and the result page. The
  balance check also reports their distribution: every style must be reachable.

### Questions

About 20 situational questions, each with 4 answers. They cover every trait at least 4 times, in both
directions, plus a few aimed at the demon pool (ambition, ruthlessness, temptation). The scenarios are
original and set in a Taisho-era Demon Slayer flavour ("Your crow brings an urgent mission at
midnight…") with nothing taken from the source. The order is fixed. Answer order is shuffled for each
session.

### Balance check (builder's call, stated)

Normalisation: each trait sum is scaled against that trait's **theoretical** min/max for the question
set, giving 0–10.

Two tests run before every release:

1. **Persona runs (distribution cap).** Each character gets one hand-written "persona" answer set
   (how that character would answer). Each persona is run with 200 random perturbations (1–3 answers
   flipped), and the result must be that character or its runner-up at least 70% of the time. Then
   10,000 runs are sampled from personas spread across the whole roster: no character may take more
   than ~12% of its pool.
2. **Random runs (reachability only).** 100,000 uniformly random answer sets. Every character must be
   reached at least 0.2% of the time. There is **no** distribution cap here, because random answers pile
   up in the middle of trait space and say little about real people.

If middle-of-the-road characters still swallow persona runs, the fallback is per-trait weights in
the distance metric.

### Share links and badges

- The pairing space is 28 × 14 = 392 URLs. That many pre-built preview images is fine, but simpler
  works too. **Builder's call, recommended:** a pre-built page for each *Slayer* character
  (`/r/gyomei/`, 28 pages) whose preview image shows that character's emblem, with the demon side
  passed in the query string (`/r/gyomei/?d=kokushibo&n=Ana&t=…`). The page shows the full personal
  result. Social previews show the Slayer character, and the full result still opens for the visitor.
- Preview images are 1200×630 PNG. The downloadable badge is 1080×1350 portrait PNG (good for
  Instagram and printing).
- The badge is one SVG template (emblems drawn as `<rect>` pixels, so they stay crisp at any size).
  In the browser it becomes a PNG through a canvas. At build time the same SVG is turned into preview
  PNGs with `@resvg/resvg-js`.
- Print: a print stylesheet that prints just the badge on one page.

### Look and feel

Taisho-era feel: washi-paper background, ink black, deep crimson, with each character's colours used
as accents. Pixel emblems are about 32×32. Headings use an OFL display font (DotGothic16 for the pixel
feel, or a mincho serif). Small CSS animations (ink-brush reveals, a sword-slash transition between
questions). Animations stay off when "prefers-reduced-motion" is set.

### Tech (builder's calls, stated)

- Plain HTML/CSS/JS (ES modules) with no framework. One small Node build script produces the result
  pages and preview PNGs into `dist/`.
- Data lives in `data/characters.js`, `data/questions.js` and `data/strings.en.js`.
- Unit tests for scoring/matching (Node's built-in test runner) and the balance check.
- Deployed to GitHub Pages from a new public repository, `cragary/which-demon-slayer`, through a GitHub Actions workflow that runs the tests, then the build, then the deploy.

## Left to the builder

The exact trait values and answer deltas (within the balance check), emblem pixel art, copy tone,
animation details, file layout and the final font pick.

## Learning contribution (owner)

The owner writes **Gyomei's trait profile and his "why you match" lines**. Gyomei is the
character that started this, and the owner's read of him is the reference point for tuning everyone
else.

Timing (builder's call): the builder first drafts a placeholder Gyomei and sets the phrase format, so
nothing waits. The owner's version replaces it **before** final balance tuning. After that, the builder
may only nudge Gyomei's values (±1 on a trait) with the owner's OK, and other characters and deltas
absorb the rest of the tuning.
