// Static build: dist/ with the app, one page per Slayer (own OG tags) and OG preview PNGs.
import { rmSync, mkdirSync, cpSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';
import { dataFor, stringsFor, LANGS } from '../src/data/index.js';
import { BASE_URL, BASE_PATH } from '../src/config.js';
import { badgeSvg } from '../src/render/badge.js';
import { emblemAt, emblemSvg } from '../src/render/emblem.js';
import { escapeXml } from '../src/core/escape.js';
import { isFrPath } from '../src/core/lang-path.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const FONT_SRC = [
  ['@fontsource/dotgothic16/files', 'dotgothic16-latin-400-normal.woff2'],
  ['@fontsource/shippori-mincho/files', 'shippori-mincho-latin-400-normal.woff2'],
  ['@fontsource/shippori-mincho/files', 'shippori-mincho-latin-700-normal.woff2'],
];

rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'og'), { recursive: true });
mkdirSync(join(DIST, 'fonts'), { recursive: true });
mkdirSync(join(ROOT, '.cache/fonts'), { recursive: true });

// 1. App source (plain ES modules, served as-is) and fonts.
cpSync(join(ROOT, 'src'), join(DIST, 'src'), { recursive: true });
const ttfFiles = [];
for (const [dir, file] of FONT_SRC) {
  const woff2 = join(ROOT, 'node_modules', dir, file);
  cpSync(woff2, join(DIST, 'fonts', file));
  const ttf = join(ROOT, '.cache/fonts', file.replace('.woff2', '.ttf'));
  if (!existsSync(ttf)) writeFileSync(ttf, await decompress(readFileSync(woff2)));
  ttfFiles.push(ttf);
}
writeFileSync(join(DIST, 'favicon.svg'), emblemSvg('gyomei', 32));
writeFileSync(join(DIST, '.nojekyll'), '');

// 2. HTML pages from one template.
const template = readFileSync(join(ROOT, 'src/web/index.html'), 'utf8');
const LOCALE = { en: 'en_US', fr: 'fr_FR' };
const prefix = (lang) => (lang === 'fr' ? 'fr/' : '');
const other = (lang) => (lang === 'fr' ? 'en' : 'fr');

/** Fill the page template. `rel` is the page path below the language prefix ('' or 'r/<id>/'). */
function page(lang, { rel, title, description, ogImage, slayer = '' }) {
  const S = stringsFor(lang);
  const depth = (prefix(lang) + rel).split('/').filter(Boolean).length;
  const vars = {
    LANG: lang,
    ROOT: depth ? '../'.repeat(depth) : './',
    TITLE: escapeXml(title),
    DESCRIPTION: escapeXml(description),
    OG_URL: `${BASE_URL}${prefix(lang)}${rel}`,
    OG_IMAGE: ogImage,
    OG_LOCALE: LOCALE[lang],
    HREF_EN: `${BASE_URL}${rel}`,
    HREF_FR: `${BASE_URL}fr/${rel}`,
    OTHER_HREF: `${BASE_URL}${prefix(other(lang))}${rel}`,
    OTHER_LANG: other(lang),
    SWITCH_TO: escapeXml(S.switchTo),
    SWITCH_LABEL: escapeXml(S.switchLabel),
    NOJS: escapeXml(S.noJs),
    DISCLAIMER: escapeXml(S.disclaimer),
    SLAYER: slayer,
  };
  return template.replace(/%([A-Z_]+)%/g, (m, k) => (k in vars ? vars[k] : m));
}

const render = (svg) => new Resvg(svg, { font: { fontFiles: ttfFiles, loadSystemFonts: false, defaultFontFamily: 'Shippori Mincho' } }).render().asPng();
const featured = ['tanjiro', 'gyomei', 'rengoku', 'shinobu', 'muzan', 'akaza', 'nezuko', 'zenitsu', 'inosuke', 'kokushibo'];
let count = 0;

for (const lang of LANGS) {
  const data = dataFor(lang);
  const S = stringsFor(lang);
  const ogDir = join(DIST, 'og', prefix(lang));
  const out = join(DIST, prefix(lang));
  mkdirSync(ogDir, { recursive: true });
  mkdirSync(out, { recursive: true });

  writeFileSync(join(out, 'index.html'), page(lang, { rel: '', title: S.title, description: S.pageDescription, ogImage: `${BASE_URL}og/${prefix(lang)}default.png` }));

  for (const c of data.characters.filter((x) => x.pool === 'slayer')) {
    mkdirSync(join(out, 'r', c.id), { recursive: true });
    writeFileSync(join(out, 'r', c.id, 'index.html'), page(lang, {
      rel: `r/${c.id}/`,
      title: S.pageTitleFor(c.name.split(' ')[0]),
      description: `${c.title}. ${S.pageDescription}`,
      ogImage: `${BASE_URL}og/${prefix(lang)}${c.id}.png`,
      slayer: c.id,
    }));
    writeFileSync(join(ogDir, `${c.id}.png`), render(badgeSvg({ slayer: c.id }, data, { format: 'og', strings: S })));
    count++;
  }

  writeFileSync(join(ogDir, 'default.png'), render(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#141a33"/>
  ${featured.map((id, i) => emblemAt(id, 60 + (i % 5) * 220, i < 5 ? 40 : 430, 160)).join('')}
  <text x="600" y="300" font-family="DotGothic16" font-size="${lang === 'fr' ? 52 : 64}" fill="#e9e4f5" text-anchor="middle">${escapeXml(S.title)}</text>
  <text x="600" y="365" font-family="Shippori Mincho" font-size="30" fill="#f2b33d" text-anchor="middle">${escapeXml(S.ogDefault)}</text>
</svg>`));
}

// GitHub Pages serves this for any unknown path: send /fr/... to the French home, the rest to English.
writeFileSync(join(DIST, '404.html'), `<!doctype html><meta charset="utf-8"><title>Demon Slayer quiz</title>
<script>const isFrPath = ${isFrPath.toString()}; location.replace(${JSON.stringify(BASE_PATH)} + (isFrPath(location.pathname, ${JSON.stringify(BASE_PATH)}) ? 'fr/' : ''));</script>
<meta http-equiv="refresh" content="1; url=${BASE_PATH}"><a href="${BASE_PATH}">English</a> · <a href="${BASE_PATH}fr/">Français</a>`);

console.log(`built ${count} result pages and ${count + LANGS.length} OG images in ${LANGS.length} languages → dist/`);
