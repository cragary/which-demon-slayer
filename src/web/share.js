// Badge rasterising + share helpers (browser only).
import { badgeSvg } from '../render/badge.js';

const FONT_FILES = [
  ['DotGothic16', 400, 'dotgothic16-latin-400-normal.woff2'],
  ['Shippori Mincho', 400, 'shippori-mincho-latin-400-normal.woff2'],
  ['Shippori Mincho', 700, 'shippori-mincho-latin-700-normal.woff2'],
];
let fontCss;

/** SVG drawn through <img> cannot see page fonts, so embed them as data URIs once. */
async function embeddedFonts(root) {
  if (fontCss) return fontCss;
  const parts = await Promise.all(FONT_FILES.map(async ([family, weight, file]) => {
    try {
      const res = await fetch(`${root}fonts/${file}`);
      if (!res.ok) return '';
      const buf = await res.arrayBuffer();
      let bin = '';
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${btoa(bin)}) format('woff2');}`;
    } catch { return ''; }
  }));
  fontCss = parts.join('');
  return fontCss;
}

export async function badgeSvgWithFonts(result, data, root, format = 'portrait') {
  const svg = badgeSvg(result, data, { format });
  const css = await embeddedFonts(root);
  return svg.replace(/(<svg[^>]*>)/, `$1<defs><style>${css}</style></defs>`);
}

export async function svgToPngBlob(svg, width, height) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    return await new Promise((res) => canvas.toBlob(res, 'image/png'));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function downloadBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Native share with the PNG when the browser supports files; otherwise null so the caller falls back. */
export async function shareFile(blob, filename, text, url) {
  const file = new File([blob], filename, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text, url });
      return 'shared';
    } catch (e) {
      return e?.name === 'AbortError' ? 'cancelled' : null;
    }
  }
  return null;
}

export const intentLinks = (text, url) => ({
  X: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  WhatsApp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
});
