// Badge SVG templates. The same string is rasterised in the browser (canvas) and at build time (resvg).
import { TRAITS } from '../core/traits.js';
import { escapeXml, clampName } from '../core/escape.js';
import { emblemAt } from './emblem.js';
import { STRINGS } from '../data/strings.en.js';
import { BASE_URL } from '../config.js';

export const FONT_DISPLAY = 'DotGothic16';
export const FONT_BODY = 'Shippori Mincho';
const INK = '#1b1714';
const PAPER = '#f3ead8';
const CRIMSON = '#a4161a';

const t = (x, y, size, text, { family = FONT_BODY, weight = 400, fill = INK, anchor = 'start', opacity } = {}) =>
  `<text x="${x}" y="${y}" font-family="${family}, serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${opacity ? ` opacity="${opacity}"` : ''}>${escapeXml(text)}</text>`;

const frame = (w, h) => `
  <rect width="${w}" height="${h}" fill="${PAPER}"/>
  <rect x="18" y="18" width="${w - 36}" height="${h - 36}" fill="none" stroke="${INK}" stroke-width="6"/>
  <rect x="32" y="32" width="${w - 64}" height="${h - 64}" fill="none" stroke="${CRIMSON}" stroke-width="2"/>`;

/** Top-3 traits for the bars: the user's highest scores (needs result.traits). */
const topTraits = (traits) => (traits ? [...TRAITS].sort((a, b) => traits[b] - traits[a]).slice(0, 3) : []);

const host = BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

export function badgeSvg(result, data, { format = 'portrait' } = {}) {
  const char = (id) => data.characters.find((c) => c.id === id);
  const slayer = char(result.slayer);
  const demon = result.demon ? char(result.demon) : null;
  const breathing = result.breathing ? data.breathing.find((b) => b.id === result.breathing) : null;
  const rank = result.rank !== undefined ? data.ranks[result.rank] : null;
  const name = clampName(result.name);

  if (format === 'og') {
    const W = 1200, H = 630;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${frame(W, H)}
  ${emblemAt(slayer.id, 80, 95, 440)}
  ${t(580, 170, 30, STRINGS.title.toUpperCase(), { family: FONT_DISPLAY, fill: CRIMSON })}
  ${t(580, 255, 62, `I'm ${slayer.name.split(' ')[0]}!`, { family: FONT_DISPLAY })}
  ${t(580, 310, 34, slayer.title, { opacity: 0.8 })}
  ${t(580, 400, 30, 'Your Slayer, your demon side,')}
  ${t(580, 440, 30, 'your breathing and your rank.')}
  ${t(580, 500, 30, 'Find yours in 20 questions.', { weight: 700, fill: CRIMSON })}
  ${t(580, 545, 24, host, { opacity: 0.6 })}
</svg>`;
  }

  const W = 1080, H = 1350;
  const bars = topTraits(result.traits).map((k, i) => {
    const y = 1035 + i * 62;
    const v = Math.max(0, Math.min(10, result.traits[k]));
    return `${t(110, y + 30, 32, STRINGS.traits[k])}
  <rect x="420" y="${y + 6}" width="540" height="30" fill="none" stroke="${INK}" stroke-width="3"/>
  <rect x="426" y="${y + 12}" width="${Math.round(528 * v / 10)}" height="18" fill="${slayer.palette[0]}"/>`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${frame(W, H)}
  <rect x="32" y="32" width="${W - 64}" height="96" fill="${INK}"/>
  ${t(W / 2, 96, 40, STRINGS.title.toUpperCase(), { family: FONT_DISPLAY, fill: PAPER, anchor: 'middle' })}
  ${t(W / 2, 190, 36, name ? STRINGS.resultOf(name) : STRINGS.myResult, { anchor: 'middle', opacity: 0.85 })}

  ${emblemAt(slayer.id, 90, 230, 420)}
  ${t(300, 700, 30, STRINGS.slayerHeading.toUpperCase(), { family: FONT_DISPLAY, fill: CRIMSON, anchor: 'middle' })}
  ${t(300, 752, 44, slayer.name, { weight: 700, anchor: 'middle' })}
  ${t(300, 796, 28, result.simSlayer ? `${slayer.title}, ${STRINGS.match(result.simSlayer)}` : slayer.title, { anchor: 'middle', opacity: 0.8 })}

  ${demon ? `${emblemAt(demon.id, 640, 300, 320)}
  ${t(800, 700, 30, STRINGS.demonHeading.toUpperCase(), { family: FONT_DISPLAY, fill: CRIMSON, anchor: 'middle' })}
  ${t(800, 752, 40, demon.name, { weight: 700, anchor: 'middle' })}
  ${t(800, 796, 28, demon.title, { anchor: 'middle', opacity: 0.8 })}` : ''}

  <line x1="90" y1="850" x2="${W - 90}" y2="850" stroke="${INK}" stroke-width="2" opacity="0.4"/>
  ${breathing ? `<rect x="110" y="882" width="26" height="26" fill="${breathing.color}"/>
  ${t(150, 906, 34, `${breathing.name}`, { weight: 700 })}` : ''}
  ${rank ? `${t(W - 110, 906, 34, `Rank: ${rank.name}`, { weight: 700, anchor: 'end' })}` : ''}
  ${rank ? t(W / 2, 970, 26, rank.line, { anchor: 'middle', opacity: 0.75 }) : ''}

  ${bars}

  ${t(W / 2, 1268, 26, `Which one are you? ${host}`, { anchor: 'middle', fill: CRIMSON })}
</svg>`;
}
