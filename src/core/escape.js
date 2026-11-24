const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };

export const escapeXml = (s) => String(s).replace(/[&<>"']/g, (c) => MAP[c]);

/** Keep at most `n` combining marks per grapheme, so "zalgo" text can't tower over the layout. */
const capMarks = (g, n = 2) => {
  let marks = 0;
  return [...g].filter((ch) => !/\p{M}/u.test(ch) || ++marks <= n).join('');
};

/** Trim a display name to `max` graphemes (emoji-safe), adding an ellipsis when cut. */
export function clampName(s, max = 20) {
  const str = String(s ?? '').trim();
  const parts = [...new Intl.Segmenter().segment(str)].map((x) => capMarks(x.segment));
  return parts.length <= max ? parts.join('') : parts.slice(0, max).join('') + '…';
}

/**
 * Rough rendered width in em: wide scripts and emoji ~1.6em, Latin ~0.56em. Deliberately pessimistic,
 * because the only use is deciding when to force-fit text with SVG textLength.
 */
export function estimateEm(s) {
  let em = 0;
  for (const { segment } of new Intl.Segmenter().segment(String(s))) {
    const cp = segment.codePointAt(0);
    if (/\p{Extended_Pictographic}/u.test(segment) || cp > 0x2e7f) em += 1.6;
    else if (cp > 0x024f) em += 1.0;
    else if (/[A-Z0-9]/.test(segment)) em += 0.66;
    else em += 0.56;
  }
  return em;
}
