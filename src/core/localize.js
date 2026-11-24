// Translation overlay: base (English) data + a flat { key: text } map → localized copy. Numbers are never touched.
const entries = (data) => {
  const out = [];
  for (const q of data.questions) {
    out.push([`q:${q.id}`, q, 'text']);
    for (const a of q.answers) out.push([`a:${a.id}`, a, 'text']);
  }
  for (const c of data.characters) {
    out.push([`c:${c.id}:title`, c, 'title'], [`c:${c.id}:blurb`, c, 'blurb']);
    for (const t of Object.keys(c.phrases)) out.push([`c:${c.id}:phrase:${t}`, c.phrases, t]);
  }
  for (const b of data.breathing) out.push([`b:${b.id}:name`, b, 'name'], [`b:${b.id}:line`, b, 'line']);
  for (const r of data.ranks) out.push([`r:${r.id}:name`, r, 'name'], [`r:${r.id}:line`, r, 'line']);
  return out;
};

export const textKeys = (data) => entries(data).map(([k]) => k);

export const missingText = (data, text) => textKeys(data).filter((k) => !(typeof text[k] === 'string' && text[k].trim()));

export function localize(base, text) {
  const copy = structuredClone(base);
  for (const [key, obj, field] of entries(copy)) if (text[key]) obj[field] = text[key];
  return copy;
}
