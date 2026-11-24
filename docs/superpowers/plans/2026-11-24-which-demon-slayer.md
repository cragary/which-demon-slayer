# Which Demon Slayer Are You? Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static, share-ready fan quiz. It matches a person to a Slayer, a Demon side, a Breathing
style and a Corps rank, and gives them a badge they can export.

**Architecture:** Plain ES-module JS. All content is data (`src/data/*`), and the scoring and matching
code is pure functions (`src/core/*`). The same functions run in the browser and in Node (tests,
balance check, build). Badges are SVG strings. The browser turns them into PNGs through a canvas, and
the build turns them into OG preview PNGs with resvg. A Node build script writes `dist/` with one
pre-built page per Slayer character.

**Tech Stack:** Node 24 (`node --test`), vanilla HTML/CSS/JS, `@resvg/resvg-js` (build only), GitHub
Pages + Actions. The build has no bundler and the browser downloads no dependencies.

**Spec:** `docs/superpowers/specs/2026-11-24-which-demon-slayer-design.md`

## Global Constraints

- No official art, faces, logo or logo lettering. Characters appear only as original 32×32 pixel emblems.
- Footer on every page: "Unofficial fan project. Not affiliated with Koyoharu Gotouge, Shueisha, ufotable or Aniplex."
- Spoiler line: nothing beyond the Swordsmith Village arc of the anime (no deaths, Kokushibo's human identity, Yoriichi's link to him, the final battle or Muzan's fate).
- Demon results are framed as "your demon side": playful, never insulting. Low-rank lines are affectionate.
- Base URL `https://cragary.github.io/which-demon-slayer/`, held in **one** config value (`src/config.js`).
- English only. Every UI string lives in `src/data/strings.en.js`.
- Fonts are OFL and self-hosted (DotGothic16 for display, Shippori Mincho for body). No third-party requests at runtime: no CDN, no analytics, no ads.
- Mobile-first. Honour `prefers-reduced-motion`. First load under ~300 KB excluding the OG images.
- Traits (exact keys): `composure, compassion, intensity, playfulness, discipline, independence, ambition, ruthlessness`.

## Review Focus

1. **The name from the URL query string (`n`) is rendered as HTML or inside an SVG.** It must be escaped everywhere. A `<script>` or `"><svg onload` name shows up as literal text.
2. **A hand-edited or old shared link** (`/r/gyomei/?d=nobody&r=99&t=zz`) must still show the Slayer result. Invalid fields are dropped quietly, with no crash and no blank page.
3. **Long, emoji or right-to-left display names** on the badge: cut to 20 graphemes with `…`, and the badge layout never overflows.
4. **No Web Share with files** (desktop Firefox and others): the Share button falls back to downloading the PNG plus copying the link, with a visible confirmation.
5. **Reload or Back in the middle of the quiz** must not lose progress. Progress is kept in `sessionStorage`, and Back goes to the previous question.

---

## File structure

```
which-demon-slayer/
  package.json            scripts: test, balance, build, serve
  src/config.js           BASE_URL, BASE_PATH, QUIZ_TITLE
  src/core/traits.js      TRAITS, normalise()
  src/core/score.js       scoreAnswers(), matchPool(), similarity()
  src/core/bonus.js       breathingFor(), rankFor()
  src/core/explain.js     explain()
  src/core/share-url.js   encodeResult(), decodeResult()
  src/core/escape.js      escapeXml(), clampName()
  src/core/validate.js    validateData()
  src/data/characters.slayers.js, characters.demons.js, breathing.js, ranks.js, questions.js, strings.en.js
  src/data/emblems.js     pixel grids, keyed by character id
  src/render/emblem.js    emblemSvg()
  src/render/badge.js     badgeSvg()
  src/web/index.html, app.js, quiz-view.js, result-view.js, share.js, styles.css, fonts/
  scripts/balance.js      balance check (exits non-zero on failure)
  scripts/build.js        writes dist/
  test/*.test.js
  .github/workflows/deploy.yml
```

---

### Task 1: Scaffold, config, trait maths

**Files:**
- Create: `package.json`, `src/config.js`, `src/core/traits.js`, `src/core/escape.js`, `.gitignore`
- Test: `test/traits.test.js`, `test/escape.test.js`

**Interfaces:**
- Produces:
  - `TRAITS: string[]` (the 8 keys in the order above)
  - `normalise(raw: Record<Trait,number>, bounds: Record<Trait,{min,max}>) -> Record<Trait,number>` (0–10, rounded to 0.1; a trait with `min===max` gives 5)
  - `traitBounds(questions) -> Record<Trait,{min,max}>` (per trait: the sum over questions of the min/max delta among that question's answers, where a missing delta counts as 0)
  - `escapeXml(s: string) -> string`
  - `clampName(s: string, max=20) -> string` (grapheme-aware via `Intl.Segmenter`, adds `…`)
  - Config: `BASE_URL='https://cragary.github.io/which-demon-slayer/'`, `BASE_PATH='/which-demon-slayer/'`

- [ ] `git init`. Create `package.json` with `"type":"module"` and the scripts `test: node --test`, `balance: node scripts/balance.js`, `build: node scripts/build.js`, `serve: npx --yes serve dist`.
- [ ] Write the tests:
  - `normalise({composure:3,...}, {composure:{min:-3,max:9},...}).composure === 5`
  - a min===max trait gives 5
  - `escapeXml('<a href="x">&\'') === '&lt;a href=&quot;x&quot;&gt;&amp;&apos;'`
  - `clampName('🗡️'.repeat(30)).length` covers 20 graphemes + `…`
  - `clampName('Ana') === 'Ana'`
- [ ] Run `npm test` and expect it to FAIL. Implement. Run again and expect PASS. Commit `feat: scaffold and trait maths`.

### Task 2: Matching engine and bonus results

**Files:**
- Create: `src/core/score.js`, `src/core/bonus.js`, `src/data/ranks.js`
- Test: `test/score.test.js`, `test/bonus.test.js`

**Interfaces:**
- Consumes: Task 1 `TRAITS`, `normalise`, `traitBounds`.
- Data shapes (all later tasks use these):
  - Question: `{ id, text, answers: [{ id, text, deltas: Partial<Record<Trait,-2..2>>, resolve: 0|1|2 }] }` (always 4 answers)
  - Character: `{ id, name, pool:'slayer'|'demon', title, traits: Record<Trait,0..10>, palette:[hex,hex,hex], blurb, phrases: Partial<Record<Trait,string>>, persona: string[] }` (`persona` holds the answer ids the character would pick, one per question)
  - Breathing: `{ id, name, traits, line, rare?: true }`
- Produces:
  - `scoreAnswers(answerIds: string[], questions) -> { traits: Record<Trait,number>, resolve: number, maxResolve: number }`
  - `matchPool(traits, characters, pool, weights?) -> Array<{ id, distance, similarity }>`, sorted ascending by distance (weighted Euclidean)
  - `similarity(distance) -> int`, defined as `clamp(round(100*(1 - d/(0.6*dmax))), 35, 99)` with `dmax = sqrt(Σw·100)`
  - `breathingFor(traits, breathingList) -> breathingId`. The nearest **non-rare** style, except that `sun` is returned when composure ≥ 8.5 **and** compassion ≥ 8.5 **and** discipline ≥ 8.5.
  - `rankFor(resolve, maxResolve) -> { id, name, index }`. The ratio `resolve/maxResolve` maps through `RANKS` thresholds: Mizunoto < .30, Mizunoe < .38, Kanoto < .45, Kanoe < .52, Tsuchinoto < .58, Tsuchinoe < .64, Hinoto < .70, Hinoe < .76, Kinoto < .82, Kinoe < .90, Hashira ≥ .90. Task 4 may retune these to hit ~5% Hashira.
- [ ] Write the tests with a 2-question fixture:
  - a scored answer set sums its deltas and resolve
  - `matchPool` ranks an identical-profile character first with distance 0 and similarity 99
  - the slayer pool never returns a demon
  - the `sun` gate triggers at 8.5/8.5/8.5 and not at 8.4
  - `rankFor(0,40).id==='mizunoto'`, `rankFor(40,40).id==='hashira'`
- [ ] FAIL → implement → PASS → commit `feat: matching engine, breathing, rank`.

### Task 3: Explanation and share URL

**Files:**
- Create: `src/core/explain.js`, `src/core/share-url.js`
- Test: `test/explain.test.js`, `test/share-url.test.js`

**Interfaces:**
- Consumes: Task 2 shapes.
- Produces:
  - `explain(userTraits, character, answers?: {question, answer}[]) -> string[]` (2–3 sentences). It picks the 2 traits with the smallest |user−char| among the character's top-4 traits, then uses `character.phrases[trait]`. When `answers` is given, it adds one sentence quoting the answer whose deltas contribute most to the top trait (`You chose: "…"`). Without `answers` it falls back to `character.blurb`.
  - `encodeResult({slayer, demon, breathing, rank, simSlayer, simDemon, name, traits}) -> string`. Path: `r/<slayer>/`. Query: `d, b, r, s, sd, n, t`, where `t` is 8 single base-36 digits made from `round(trait)`.
  - `decodeResult(slayerId, URLSearchParams, data) -> result`. It drops any field whose id is unknown or out of range, and never throws.
- [ ] Write the tests:
  - encode → decode round-trips
  - `decodeResult('gyomei', ?d=nobody&r=99&t=zz)` returns `{slayer:'gyomei'}` with the other fields undefined
  - an unknown slayer id returns `null`
  - `explain` returns 2–3 strings, and one starts with `You chose:` when answers are passed
- [ ] FAIL → implement → PASS → commit `feat: explanations and share URLs`.

### Task 4: Content, data validation and the balance check

Most of the work is here. Write the content, then tune it until `npm run balance` passes.

**Files:**
- Create: `src/data/questions.js` (20 questions), `src/data/characters.slayers.js` (28), `src/data/characters.demons.js` (14), `src/data/breathing.js` (12 + sun), `src/data/strings.en.js`, `src/core/validate.js`, `scripts/balance.js`
- Test: `test/data.test.js`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces:
  - `validateData({questions, characters, breathing}) -> string[]` (errors). It checks: ids are unique; each question has exactly 4 answers; each delta is in −2..2; each resolve is 0..2; every trait appears in ≥4 questions in each direction; each character has all 8 traits from 0 to 10, 3 palette colours, a blurb, ≥3 phrases, and a persona length equal to the number of questions, with valid ids; the roster ids exactly match the spec list.
  - `scripts/balance.js` prints a table and exits 1 when any of these fails:
    - **persona fidelity:** for each character, 200 runs with 1–3 random answer flips must give the character or its runner-up ≥70% of the time
    - **persona spread:** 10,000 runs sampled across personas; no character takes more than 12% of its pool
    - **random reachability:** 100,000 runs; every character is reached ≥0.2%, and so is every breathing style except sun
    - **rarity:** sun is 0.3–2% of persona runs, and Hashira rank is 3–8% of persona runs
- Content rules (from the spec): situational Taisho-flavoured scenarios with nothing copied from the source; spoiler line respected; demon phrases framed as "your demon side"; ranks get affectionate lines.
- Gyomei's entry is a builder draft carrying `// TODO(owner): replace with your read of Gyomei (traits + phrases)`.

- [ ] Write `test/data.test.js`. It asserts `validateData(real data)` returns `[]` and that `npm run balance` returns exit code 0 (run with `execFileSync`; the test may take ~10 s).
- [ ] Write the questions, then the slayers, then the demons, then the breathing styles and strings.
- [ ] Run `npm run balance` and tune traits and deltas until it passes. Fall back to per-trait `weights` only if tuning stalls.
- [ ] `npm test` passes. Commit `feat: roster, questions, balance check`.

### Task 5: Pixel emblems and badge SVG

**Files:**
- Create: `src/data/emblems.js`, `src/render/emblem.js`, `src/render/badge.js`
- Test: `test/render.test.js`

**Interfaces:**
- Consumes: the characters and breathing data, `escapeXml`, `clampName`.
- Produces:
  - `EMBLEMS[id] = { palette: string[], rows: string[] }`. That is 32 strings of 32 chars each, where `.` means transparent and `0–9` index the palette. Each emblem is an original motif, e.g. Gyomei: a stone, prayer beads and a teardrop.
  - `emblemSvg(id, px) -> string`. Runs of the same colour are merged into one `<rect>` per row, with `shape-rendering="crispEdges"`.
  - `badgeSvg(result, data, {format:'portrait'|'og'}) -> string`. Portrait is 1080×1350; og is 1200×630 and shows only the slayer emblem, name and title plus the quiz name. Portrait shows: both emblems, both names and similarity %, breathing, rank, the top 3 traits as bars, the clamped name, and a URL footer. Fonts are referenced by family name.
- [ ] Write the tests:
  - every character id has an emblem with 32 rows of 32 chars and palette indices that exist
  - `badgeSvg` with the name `<script>` contains `&lt;script&gt;` and no `<script`
  - `badgeSvg` output parses as XML (use a regex well-formedness check, or `resvg` render without throwing)
- [ ] FAIL → implement (draw all 42 emblems) → PASS → commit `feat: pixel emblems and badges`.

### Task 6: Web app (quiz, result, share)

**Files:**
- Create: `src/web/index.html`, `app.js`, `quiz-view.js`, `result-view.js`, `share.js`, `styles.css`, `fonts/*.woff2`

**Interfaces:**
- Consumes: everything above.
- Behaviour:
  - Landing → 20 questions, one at a time, with a progress bar, Back, and answers shuffled per session. Progress is kept in `sessionStorage` under `wds-progress`.
  - The optional name field sits on the last screen.
  - Result page: Slayer card (emblem, similarity, the `explain` lines with answers, runner-up), then Demon side card, Breathing + Rank lines, badge preview, and buttons: **Download PNG**, **Share** (`navigator.canShare({files})` → share; otherwise download + copy link + toast), **X / WhatsApp / Facebook** intent links, **Copy link**, **Print** (`@media print` shows only the badge), **Retake**.
  - The URL is updated to `encodeResult(...)` with `history.replaceState`.
  - SVG → PNG goes through `Image` + `canvas` at the native size, awaiting `document.fonts.ready` first.
  - Visuals: washi background, ink black `#1b1714`, crimson `#a4161a`, character palette accents, a sword-slash transition between questions (off under reduced motion). Footer disclaimer.
- [ ] Manual check in the browser preview (Task 8). There are no unit tests for the DOM. Commit `feat: web app`.

### Task 7: Build, result pages, OG images, deploy

**Files:**
- Create: `scripts/build.js`, `.github/workflows/deploy.yml`, `README.md`
- Test: `test/build.test.js`

**Interfaces:**
- Consumes: `badgeSvg(format:'og')`, `BASE_URL`, `BASE_PATH`.
- Produces `dist/`:
  - `index.html` + assets
  - `r/<slayerId>/index.html` for all 28 Slayers, with `og:title` "I'm <Name>! Which Demon Slayer are you?", `og:image` = `${BASE_URL}og/<id>.png`, `og:url`, `twitter:card=summary_large_image`. The page boots the app in result mode, using `decodeResult` on the query string.
  - `og/<id>.png` (1200×630, via `@resvg/resvg-js` with the fonts loaded from `src/web/fonts`)
  - `og/default.png` for the landing page
  - `404.html`, which redirects to the landing page
- [ ] Write the tests: after `npm run build`, there are 28 `dist/r/*/index.html` files, each containing an absolute `og:image` that starts with `BASE_URL`; there are 29 PNGs in `dist/og`.
- [ ] FAIL → implement → PASS.
- [ ] Workflow: on push to `main`, run `npm ci`, `npm test`, `npm run build`, `actions/upload-pages-artifact` (dist), `actions/deploy-pages`.
- [ ] README covers: how to add a character (one data entry + one emblem + a persona, then run balance), and the owner's Gyomei TODO.
- [ ] Commit `feat: static build, OG images, Pages deploy`.

### Task 8: Verify in the browser

- [ ] `npm run build`, then serve `dist/` through `.claude/launch.json` with `preview_start`.
- [ ] Take the quiz end to end at 375px and 1280px. The result shows all five parts, and there are no console errors.
- [ ] Review Focus checks: `?n=<script>alert(1)</script>` renders as text; `/r/gyomei/?d=nobody&r=99&t=zz` still renders; a 40-character emoji name gets clamped; Share works without file support (falls back); a reload at question 7 resumes at 7.
- [ ] The downloaded PNG opens at 1080×1350. Print preview shows only the badge.
- [ ] Screenshot the result page as proof.

Publishing (creating `cragary/which-demon-slayer`, pushing, enabling Pages) happens **only when the owner says go**.
