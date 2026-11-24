import { EMBLEMS } from '../data/emblems.js';

/** Inner SVG for a 32x32 emblem (runs merged into rects), placed at x,y with pixel size px/32. */
export function emblemRects(id) {
  const e = EMBLEMS[id];
  if (!e) return '';
  let out = '';
  e.rows.forEach((row, y) => {
    let x = 0;
    while (x < 32) {
      const c = row[x];
      let w = 1;
      while (x + w < 32 && row[x + w] === c) w++;
      if (c !== '.') out += `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${e.palette[Number(c)]}"/>`;
      x += w;
    }
  });
  return out;
}

/** Standalone emblem SVG at `px` pixels. */
export const emblemSvg = (id, px = 128) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 32 32" shape-rendering="crispEdges">${emblemRects(id)}</svg>`;

/** Emblem as a nested <svg> for use inside a larger SVG. */
export const emblemAt = (id, x, y, size) =>
  `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 32 32" shape-rendering="crispEdges">${emblemRects(id)}</svg>`;
