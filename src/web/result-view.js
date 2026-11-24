// Result screen: Slayer, demon side, breathing, rank, badge and sharing.
import { data as DATA, strings as STRINGS, lang, langRoot } from './i18n.js';
import { scoreAnswers, matchPool } from '../core/score.js';
import { breathingFor, rankFor } from '../core/bonus.js';
import { explain } from '../core/explain.js';
import { encodeResult } from '../core/share-url.js';
import { escapeXml, clampName } from '../core/escape.js';
import { render, setProgress, toast, emblemUrl } from './app.js';
import { clearProgress } from './quiz-view.js';
import { store } from './store.js';
import { badgeSvgWithFonts, svgToPngBlob, downloadBlob, copyText, shareFile, intentLinks } from './share.js';

const root = document.body.dataset.root || './';
const charById = (id) => DATA.characters.find((c) => c.id === id);

/** Compute the full result from quiz answers, then navigate to its shareable page. */
export function finishQuiz(state) {
  const s = scoreAnswers(state.answers, DATA.questions);
  const slayers = matchPool(s.traits, DATA.characters, 'slayer', { center: s.center });
  const demons = matchPool(s.traits, DATA.characters, 'demon', { center: s.center });
  const result = {
    slayer: slayers[0].id,
    demon: demons[0].id,
    breathing: breathingFor(s.traits, DATA.breathing, s.center),
    rank: rankFor(s.resolve, s.maxResolve).index,
    simSlayer: slayers[0].similarity,
    simDemon: demons[0].similarity,
    name: clampName(state.name, 40) || undefined,
    traits: s.traits,
  };
  // Keep the full detail (answers, runner-ups) for this tab; the URL carries the shareable part.
  store.set('wds-detail', JSON.stringify({ answers: state.answers, runnerSlayer: slayers[1].id, runnerDemon: demons[1].id }));
  const path = encodeResult(result);
  store.set('wds-own', path.slice(path.indexOf('?')));
  clearProgress();
  location.href = new URL(path, langRoot()).href;
}

const answerPairs = (ids) => {
  const set = new Set(ids);
  return DATA.questions.flatMap((q) => q.answers.filter((a) => set.has(a.id)).map((answer) => ({ question: q, answer })));
};

function whyList(lines) {
  const last = lines.length - 1;
  return `<ul class="why">${lines.map((l, i) => `<li${lines.quote && i === last ? ' class="quote"' : ''}>${escapeXml(l)}</li>`).join('')}</ul>`;
}

export async function showResult(result, { own }) {
  setProgress(1);
  let detail = null;
  if (own) {
    try { detail = JSON.parse(store.get('wds-detail')); } catch { detail = null; }
  }
  const slayer = charById(result.slayer);
  const demon = result.demon && charById(result.demon);
  const breathing = result.breathing && DATA.breathing.find((b) => b.id === result.breathing);
  const rank = result.rank !== undefined ? DATA.ranks[result.rank] : null;
  const traits = result.traits;
  const answers = detail?.answers ? answerPairs(detail.answers) : undefined;
  const why = (c, pool = answers) => (traits ? explain(traits, c, pool, STRINGS.youChose) : [c.blurb]);
  const slayerWhy = why(slayer);
  // Don't quote the same answer twice: the demon card gets the remaining answers.
  const demonPool = answers?.filter((a) => a.answer.text !== slayerWhy.quote);
  const name = result.name ? clampName(result.name) : '';
  const shareUrl = location.href;
  const shareText = STRINGS.sharedText(slayer.name, demon?.name);

  const heading = own
    ? `<h1>${escapeXml(STRINGS.sunUp)}</h1><p class="lede">${escapeXml(STRINGS.sunUpLede)}</p>`
    : `<h1>${escapeXml(STRINGS.visitorTitle(name, slayer.name))}</h1><p class="lede">${escapeXml(STRINGS.visitorLede)}</p>
       <div class="actions"><button class="btn" id="take">${escapeXml(STRINGS.takeIt)}</button></div>`;

  render(`
    <section class="enter">
      <header class="reveal-head">${heading}</header>

      <article class="result-block">
        <img src="${emblemUrl(slayer.id)}" alt="${escapeXml(STRINGS.emblemAlt(slayer.name))}">
        <div>
          <p class="kicker">${escapeXml(own ? STRINGS.slayerHeading : STRINGS.slayerLabel)}${result.simSlayer ? `, ${escapeXml(STRINGS.match(result.simSlayer))}` : ''}</p>
          <h2 class="who">${escapeXml(slayer.name)}</h2>
          <p class="title">${escapeXml(slayer.title)}</p>
          ${whyList(slayerWhy)}
          ${charById(detail?.runnerSlayer) ? `<p class="runner">${escapeXml(STRINGS.runnerUp(charById(detail.runnerSlayer).name))}</p>` : ''}
        </div>
      </article>

      ${demon ? `<article class="result-block">
        <img src="${emblemUrl(demon.id)}" alt="${escapeXml(STRINGS.emblemAlt(demon.name))}">
        <div>
          <p class="kicker">${escapeXml(own ? STRINGS.demonHeading : STRINGS.demonLabel)}${result.simDemon ? `, ${escapeXml(STRINGS.match(result.simDemon))}` : ''}</p>
          <h2 class="who">${escapeXml(demon.name)}</h2>
          <p class="title">${escapeXml(demon.title)}</p>
          ${whyList(why(demon, demonPool))}
          ${charById(detail?.runnerDemon) ? `<p class="runner">${escapeXml(STRINGS.runnerUp(charById(detail.runnerDemon).name))}</p>` : ''}
        </div>
      </article>` : ''}

      ${breathing || rank ? `<div class="extras">
        ${breathing ? `<div><h3><span class="swatch" style="background:${escapeXml(breathing.color)}"></span>${escapeXml(breathing.name)}</h3><p>${escapeXml(breathing.line)}</p></div>` : ''}
        ${rank ? `<div><h3>${escapeXml(STRINGS.rankLabel(rank.name))}</h3><p>${escapeXml(rank.line)}</p></div>` : ''}
      </div>` : ''}

      <section class="badge-wrap" aria-label="${STRINGS.badgeHeading}">
        <h2>${STRINGS.badgeHeading}</h2>
        <img id="badge" alt="${escapeXml(STRINGS.badgeAlt(slayer.name, demon?.name))}" width="1080" height="1350">
        <div class="actions">
          <button class="btn" id="share">${STRINGS.share}</button>
          <button class="btn quiet" id="download">${STRINGS.download}</button>
          <button class="btn quiet" id="copy">${STRINGS.copyLink}</button>
          <button class="btn quiet" id="print">${STRINGS.print}</button>
        </div>
        <p class="intents">${Object.entries(intentLinks(shareText, shareUrl)).map(([k, href]) => `<a href="${href}" target="_blank" rel="noopener">${escapeXml(STRINGS.postOn(k))}</a>`).join('')}</p>
        <p><button class="link-btn" id="again">${own ? STRINGS.retake : STRINGS.takeIt}</button></p>
      </section>
    </section>`);

  const goQuiz = () => { location.href = langRoot(); };
  document.getElementById('take')?.addEventListener('click', goQuiz);
  document.getElementById('again').onclick = goQuiz;

  // Badge
  const svg = await badgeSvgWithFonts(result, DATA, root, 'portrait', STRINGS);
  const img = document.getElementById('badge');
  img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const filename = `${lang === 'fr' ? 'demon-slayer-fr' : 'demon-slayer'}-${slayer.id}${demon ? `-${demon.id}` : ''}.png`;
  // Rasterise right away so Share can call navigator.share() inside the tap (iOS drops slow gestures).
  const pngPromise = svgToPngBlob(svg, 1080, 1350);
  pngPromise.catch(() => {});
  const getPng = async () => {
    try { return await pngPromise; } catch { toast(STRINGS.badgeFailed); return null; }
  };

  document.getElementById('download').onclick = async () => {
    const blob = await getPng();
    if (blob) downloadBlob(blob, filename);
  };
  document.getElementById('copy').onclick = async () => toast((await copyText(shareUrl)) ? STRINGS.copied : shareUrl);
  document.getElementById('print').onclick = () => window.print();
  document.getElementById('share').onclick = async () => {
    const blob = await getPng();
    if (!blob) return;
    const r = await shareFile(blob, filename, shareText, shareUrl);
    if (r) return;
    downloadBlob(blob, filename);
    toast((await copyText(`${shareText} ${shareUrl}`)) ? STRINGS.downloaded : STRINGS.downloadedNoCopy(shareUrl));
  };
}

