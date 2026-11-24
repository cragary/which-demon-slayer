import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DATA } from '../src/data/index.js';
import { EMBLEMS } from '../src/data/emblems.js';
import { emblemSvg } from '../src/render/emblem.js';
import { badgeSvg } from '../src/render/badge.js';

test('every character has a 32x32 emblem whose indices exist in its palette', () => {
  for (const c of DATA.characters) {
    const e = EMBLEMS[c.id];
    assert.ok(e, `missing emblem ${c.id}`);
    assert.equal(e.rows.length, 32, c.id);
    for (const r of e.rows) {
      assert.equal(r.length, 32, c.id);
      for (const ch of r) if (ch !== '.') assert.ok(e.palette[Number(ch)], `${c.id} index ${ch}`);
    }
  }
});

test('emblemSvg merges runs into crisp rects', () => {
  const svg = emblemSvg('gyomei', 96);
  assert.match(svg, /shape-rendering="crispEdges"/);
  assert.match(svg, /viewBox="0 0 32 32"/);
  assert.ok((svg.match(/<rect/g) ?? []).length < 32 * 32 / 2);
});

const result = {
  slayer: 'gyomei', demon: 'nakime', breathing: 'stone', rank: 10, simSlayer: 93, simDemon: 81,
  traits: { composure: 10, compassion: 9, intensity: 3, playfulness: 1, discipline: 9, independence: 5, ambition: 2, ruthlessness: 1 },
};

test('badgeSvg escapes a hostile name', () => {
  const svg = badgeSvg({ ...result, name: '<script>alert(1)</script>' }, DATA, { format: 'portrait' });
  assert.ok(!svg.includes('<script'));
  assert.ok(svg.includes('&lt;script&gt;'));
});

test('badgeSvg portrait is 1080x1350 and og is 1200x630', () => {
  assert.match(badgeSvg(result, DATA, { format: 'portrait' }), /width="1080" height="1350"/);
  assert.match(badgeSvg(result, DATA, { format: 'og' }), /width="1200" height="630"/);
});

test('badgeSvg works with a slayer-only result from an old link', () => {
  const svg = badgeSvg({ slayer: 'tanjiro' }, DATA, { format: 'portrait' });
  assert.match(svg, /Tanjiro/);
});

test('badgeSvg renders with resvg without throwing', async () => {
  const { Resvg } = await import('@resvg/resvg-js');
  const png = new Resvg(badgeSvg(result, DATA, { format: 'og' })).render().asPng();
  assert.ok(png.length > 1000);
});

test('badgeSvg squeezes a wide name into the canvas with textLength', () => {
  const svg = badgeSvg({ ...result, name: '😀'.repeat(20) }, DATA, { format: 'portrait' });
  const line = svg.split('\n').find((l) => l.includes('😀'));
  const tl = Number(line.match(/textLength="(\d+)"/)?.[1]);
  assert.ok(tl > 0 && tl <= 960, `textLength ${tl}`);
  assert.match(line, /lengthAdjust="spacingAndGlyphs"/);
});

test('badgeSvg leaves a short name at natural width', () => {
  const svg = badgeSvg({ ...result, name: 'Ana' }, DATA, { format: 'portrait' });
  const line = svg.split('\n').find((l) => l.includes('Ana'));
  assert.ok(!line.includes('textLength'));
});

test('badgeSvg fits long character titles within their column', () => {
  const svg = badgeSvg({ ...result, slayer: 'urokodaki', demon: 'nakime' }, DATA, { format: 'portrait' });
  const line = svg.split('\n').find((l) => l.includes('Former Water Hashira'));
  const tl = Number(line.match(/textLength="(\d+)"/)?.[1]);
  assert.ok(tl > 0 && tl <= 440, `title textLength ${tl}`);
});
