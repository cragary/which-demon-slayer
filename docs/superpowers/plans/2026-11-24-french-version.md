# French Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the whole quiz in French at `/fr/`, with French result pages, previews and badges, and an EN/FR switch.

**Architecture:** English text stays inline in the data files. `src/data/text.fr.js` holds French text keyed by id, and `localize(lang)` returns a DATA copy with that text merged in. Browser modules read `{ data, strings, lang }` from `src/web/i18n.js`, which picks the language from `body[data-lang]`. The build writes `/fr/` pages from the same template.

**Tech Stack:** unchanged (vanilla ES modules, node --test, resvg).

**Spec:** `docs/superpowers/specs/2026-11-24-french-version-design.md`

## Global Constraints

- English URLs and output stay byte-for-byte compatible. Old shared links keep working.
- Numbers (traits, deltas, resolve, palettes) are never duplicated per language. `npm run balance` is unchanged.
- French uses *tu*, French release vocabulary (Pilier, Souffle, Lune supérieure, côté démon), rank names in Japanese, and a narrow no-break space (U+202F) before `? ! : ;`.
- Spoiler line and the "Unofficial fan project" disclaimer apply in French too.

## Review Focus

1. **Switching language mid-quiz** keeps progress and the shuffled order, and lands on the same question.
2. **Switching on a result page** keeps the full query string (`d, b, r, s, sd, n, t`), so the other language shows the same result.
3. **French text in SVG** (apostrophes, accents, `«»`) is escaped and renders. If DotGothic16 has no glyph, it falls back cleanly.
4. **A French result link with bad params** (`/fr/r/gyomei/?d=x`) behaves like the English one.
5. **The 404 page** for `/fr/anything` sends people to the French landing.

---

### Task 1: Localisation layer

**Files:** Create `src/core/localize.js`, `src/data/strings.fr.js`, `src/data/text.fr.js` (stub). Modify `src/data/index.js`, `src/render/badge.js`. Test: `test/i18n.test.js`.

**Interfaces:**
- `localize(base, fr) -> data` (pure). It overrides `questions[].text`, `answers[].text`, `characters[].{title,blurb,phrases}`, `breathing[].{name,line}` and `ranks[].{name,line}` with any fr entries.
- `textKeys(data) -> string[]` lists every translatable path, e.g. `q:q1`, `a:q1a`, `c:gyomei:title`, `c:gyomei:phrase:composure`, `b:stone:name`, `r:kinoe:line`.
- `dataFor(lang)` and `stringsFor(lang)` live in `src/data/index.js`.
- `badgeSvg(result, data, { format, strings = STRINGS_EN, lang = 'en' })`. The `og` format reads its copy from `strings.og*` keys.

- [ ] Write the tests:
  - `localize` replaces the text and keeps the numbers (`deepEqual` on traits and deltas).
  - Every `textKeys(EN)` key has a non-empty French value: `missingFr() === []`.
  - Every key of `strings.en` exists in `strings.fr`, with the same `typeof`.
  - `badgeSvg` with French strings contains the French heading and escapes `'`.
- [ ] Watch them FAIL, implement, make them PASS (the completeness test stays RED until Task 2), commit.

### Task 2: French content

**Files:** `src/data/text.fr.js` (the full set), `src/data/strings.fr.js` (all UI and og strings).

- [ ] Translate the 20 questions and 80 answers, 42 titles, blurbs and phrases, 13 breathing styles and 11 rank lines. Gyomei carries `// TODO(owner)`.
- [ ] The completeness test passes and `npm test` is green. Commit.

### Task 3: Web app language-aware

**Files:** Create `src/web/i18n.js`. Modify `app.js`, `quiz-view.js`, `result-view.js`, `share.js`, `index.html`, `styles.css`.

- `i18n.js` exports `lang`, `data`, `strings` and `otherLangHref()`.
  - The language comes from `body.dataset.lang`, defaulting to `'en'`.
  - `siteRoot()` remains the site root; `langRoot()` = siteRoot + (`fr/` | '').
  - `otherLangHref()` maps the current path to the same path in the other language and keeps `location.search`.
- The template gets `%LANG%`, `%HREFLANG_EN%`, `%HREFLANG_FR%`, a `.lang-switch` link and a `.fr-hint` link. The hint is shown only on the EN landing when `navigator.languages` includes `fr`.
- `finishQuiz` navigates to `langRoot() + encodeResult(...)`.
- [ ] Verify in the browser (Task 5). Commit.

### Task 4: Build French pages and previews

**Files:** Modify `scripts/build.js`, `test/build.test.js`.

- The build writes `dist/fr/index.html` (root `../`) and `dist/fr/r/<id>/index.html` (root `../../../`) with `data-lang="fr"`, French titles and descriptions, `og:locale=fr_FR`, and `og:image` = `${BASE_URL}og/fr/<id>.png`.
- It renders `og/fr/<id>.png` and `og/fr/default.png`.
- `404.html` sends `/fr/...` paths to `${BASE_PATH}fr/` and everything else to `${BASE_PATH}`, using a small inline script with the meta refresh as a fallback.
- [ ] Write the tests first: 28 French pages with an absolute French og:image, `lang="fr"` and `data-lang="fr"`; 29 PNGs in `dist/og/fr`; the English assertions unchanged. FAIL → implement → PASS → commit.

### Task 5: Verify, review, deploy

- [ ] In the browser (EN and FR, 375 and 1280): take the full French quiz; switch language at Q5 and on the result page (Review Focus 1–2); check the French badge glyphs and the escaped apostrophes (3); try `/fr/r/gyomei/?d=x` (4). No console errors.
- [ ] Final whole-branch review with a fresh reviewer, then one fix pass.
- [ ] Merge to main and push only on the owner's go, then check the live `/fr/` and a French preview.
