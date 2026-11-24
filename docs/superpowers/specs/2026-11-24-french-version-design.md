# French version: design (short)

Date: 2026-11-24 · Status: approved by owner

**Intent.** Francophone fans (the owner's own audience in Africa and Europe) get the whole quiz in French: questions, all 42 characters, the "why you match" lines, breathing styles, ranks and the badge. A French result link previews in French.

**Goals**
- `/fr/` landing and `/fr/r/<slayer>/` result pages, each with French OG tags and preview images (`og/fr/<id>.png`, `og/fr/default.png`). English URLs are unchanged.
- An EN/FR switch on every page that keeps the current result (same query string) or the quiz in progress. Answer ids are language-independent, so progress carries over.
- French-language browsers see a "Version française" link on the English landing. No automatic redirect.
- The badge renders in the page's language.
- A completeness test fails the build if any French text is missing.

**Non-goals.** Other languages (each would become one text file later), machine translation, translated character names.

**Anti-goals.** Half-translated screens. Breaking existing shared English links. Changing the scoring: numbers stay shared, so the balance check is untouched.

**Approaches.**
- **(A) Chosen:** English text stays inline as the source, and `text.fr.js` holds French overrides keyed by id. `localize(lang)` merges them.
- **(B) Rejected:** move every string out of the data files into per-language files. It's cleaner in theory, but it's a large churn of the files that just passed review.

**Owner's decisions.**
- Informal *tu*.
- French release vocabulary: Pilier de la Pierre, Souffle de l'Eau, Lune supérieure Un, côté démon. Rank names stay in Japanese.
- Title *Quel personnage de Demon Slayer es-tu ?*

**Builder's calls.**
- French typography: a narrow no-break space before `? ! : ;`.
- `<html lang>` and `hreflang` alternates on every page.
- Language comes from `data-lang` on `<body>`, written by the build.
- Fonts: check DotGothic16 for French accents. If any glyph is missing, fall back to Shippori Mincho for that text.

**Owner contribution.** Gyomei's French lines (`TODO(owner)`), next to his English ones.
