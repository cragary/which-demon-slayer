// Static build: dist/ with the app, one page per Slayer (own OG tags) and OG preview PNGs.
import { rmSync, mkdirSync, cpSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';
import { DATA } from '../src/data/index.js';
import { BASE_URL, BASE_PATH, QUIZ_TITLE } from '../src/config.js';
import { badgeSvg } from '../src/render/badge.js';
import { emblemAt, emblemSvg } from '../src/render/emblem.js';
import { escapeXml } from '../src/core/escape.js';

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
const page = ({ root, title, description, ogUrl, ogImage, slayer = '' }) =>
  template
    .replaceAll('%ROOT%', root)
    .replaceAll('%TITLE%', escapeXml(title))
    .replaceAll('%DESCRIPTION%', escapeXml(description))
    .replaceAll('%OG_URL%', ogUrl)
    .replaceAll('%OG_IMAGE%', ogImage)
    .replaceAll('%SLAYER%', slayer);

const DESCRIPTION = '20 questions. 42 characters. Find your Slayer, your demon side, your breathing style and your Corps rank. Unofficial fan quiz.';
writeFileSync(join(DIST, 'index.html'), page({ root: './', title: QUIZ_TITLE, description: DESCRIPTION, ogUrl: BASE_URL, ogImage: `${BASE_URL}og/default.png` }));

const slayers = DATA.characters.filter((c) => c.pool === 'slayer');
for (const c of slayers) {
  mkdirSync(join(DIST, 'r', c.id), { recursive: true });
  const first = c.name.split(' ')[0];
  writeFileSync(join(DIST, 'r', c.id, 'index.html'), page({
    root: '../../',
    title: `I'm ${first}! ${QUIZ_TITLE}`,
    description: `${c.title}. ${DESCRIPTION}`,
    ogUrl: `${BASE_URL}r/${c.id}/`,
    ogImage: `${BASE_URL}og/${c.id}.png`,
    slayer: c.id,
  }));
}
writeFileSync(join(DIST, '404.html'), `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${BASE_PATH}"><title>${QUIZ_TITLE}</title><a href="${BASE_PATH}">${QUIZ_TITLE}</a>`);

// 3. OG preview images.
const render = (svg) => new Resvg(svg, { font: { fontFiles: ttfFiles, loadSystemFonts: false, defaultFontFamily: 'Shippori Mincho' } }).render().asPng();
for (const c of slayers) writeFileSync(join(DIST, 'og', `${c.id}.png`), render(badgeSvg({ slayer: c.id }, DATA, { format: 'og' })));

const featured = ['tanjiro', 'gyomei', 'rengoku', 'shinobu', 'muzan', 'akaza', 'nezuko', 'zenitsu', 'inosuke', 'kokushibo'];
const defaultOg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#141a33"/>
  ${featured.map((id, i) => emblemAt(id, 60 + (i % 5) * 220, i < 5 ? 40 : 430, 160)).join('')}
  <text x="600" y="300" font-family="DotGothic16" font-size="64" fill="#e9e4f5" text-anchor="middle">${escapeXml(QUIZ_TITLE)}</text>
  <text x="600" y="365" font-family="Shippori Mincho" font-size="30" fill="#f2b33d" text-anchor="middle">Your Slayer, your demon side, your breathing and your rank.</text>
</svg>`;
writeFileSync(join(DIST, 'og', 'default.png'), render(defaultOg));

console.log(`built ${slayers.length} result pages, ${slayers.length + 1} OG images → dist/`);
