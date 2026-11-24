// Pure URL helpers for the EN/FR split (no DOM, so they are unit-tested).

/** Same page in the other language: `fr/` is added or removed right after the site base. Query kept, hash dropped. */
export function swapLangHref(href, base, lang) {
  const clean = href.split('#')[0];
  const rel = clean.startsWith(base) ? clean.slice(base.length) : '';
  return base + (lang === 'fr' ? rel.replace(/^fr(\/|$)/, '') : `fr/${rel}`);
}

/** Is this pathname inside the French section (`<basePath>fr` or `<basePath>fr/...`)? */
export const isFrPath = (pathname, basePath) => pathname === `${basePath}fr` || pathname.startsWith(`${basePath}fr/`);

/**
 * Should the in-app Back button use history.back()? Only for questions answered on this page:
 * after resuming (reload or language switch) the earlier history entries belong to another document.
 */
export const backGoesToHistory = (stateDepth, baseDepth) => typeof stateDepth === 'number' && stateDepth > baseDepth;
