// Page language (written by the build as <body data-lang>), the matching data/strings, and URL helpers.
import { dataFor, stringsFor } from '../data/index.js';
import { swapLangHref } from '../core/lang-path.js';

export const lang = document.body.dataset.lang === 'fr' ? 'fr' : 'en';
export const data = dataFor(lang);
export const strings = stringsFor(lang);

const root = document.body.dataset.root || './';

/** Absolute URL of the site root (English home), derived from where this page lives. */
export const siteRoot = () => new URL(root, location.href).href;

/** Home of the current language: site root, or site root + "fr/". */
export const langRoot = () => siteRoot() + (lang === 'fr' ? 'fr/' : '');

/** Same page in the other language, keeping the query string (so a result stays the same result). */
export const otherLangHref = () => swapLangHref(location.href, siteRoot(), lang);
