const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };

export const escapeXml = (s) => String(s).replace(/[&<>"']/g, (c) => MAP[c]);

/** Trim a display name to `max` graphemes (emoji-safe), adding an ellipsis when cut. */
export function clampName(s, max = 20) {
  const str = String(s ?? '').trim();
  const parts = [...new Intl.Segmenter().segment(str)].map((x) => x.segment);
  return parts.length <= max ? str : parts.slice(0, max).join('') + '…';
}
