// Result screen: Slayer, demon side, breathing, rank, badge and sharing.
import { DATA, charById } from '../data/index.js';
import { STRINGS } from '../data/strings.en.js';
import { scoreAnswers, matchPool } from '../core/score.js';
import { breathingFor, rankFor } from '../core/bonus.js';
import { explain } from '../core/explain.js';
import { encodeResult } from '../core/share-url.js';
import { escapeXml, clampName } from '../core/escape.js';
import { render, setProgress, toast, siteRoot, emblemUrl } from './app.js';
import { clearProgress } from './quiz-view.js';
import { badgeSvgWithFonts, svgToPngBlob, downloadBlob, copyText, shareFile, intentLinks } from './share.js';

const root = document.body.dataset.root || './';

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
  sessionStorage.setItem('wds-detail', JSON.stringify({ answers: state.answers, runnerSlayer: slayers[1].id, runnerDemon: demons[1].id }));
  const path = encodeResult(result);
  sessionStorage.setItem('wds-own', path.slice(path.indexOf('?')));
  clearProgress();
  location.href = new URL(path, siteRoot()).href;
}

const answerPairs = (ids) => {
  const set = new Set(ids);
  return DATA.questions.flatMap((q) => q.answers.filter((a) => set.has(a.id)).map((answer) => ({ question: q, answer })));
};

function whyList(lines) {
  return `<ul class="why">${lines.map((l) => `<li${l.startsWith('You chose') ? ' class="quote"' : ''}>${escapeXml(l)}</li>`).join('')}</ul>`;
}

export async function showResult(result, { own }) {
  setProgress(1);
  let detail = null;
  if (own) {
    try { detail = JSON.parse(sessionStorage.getItem('wds-detail')); } catch { detail = null; }
  }
  const slayer = charById(result.slayer);
  const demon = result.demon && charById(result.demon);
  const breathing = result.breathing && DATA.breathing.find((b) => b.id === result.breathing);
  const rank = result.rank !== undefined ? DATA.ranks[result.rank] : null;
  const traits = result.traits;
  const answers = detail?.answers ? answerPairs(detail.answers) : undefined;
  const why = (c) => (traits ? explain(traits, c, answers) : [c.blurb]);
  const name = result.name ? clampName(result.name) : '';
  const shareUrl = location.href;
  const shareText = STRINGS.sharedText(slayer.name, demon?.name);

  const heading = own
    ? `<h1>The sun is up.</h1><p class="lede">Here is who you were all night.</p>`
    : `<h1>${escapeXml(name ? `${name} got ${slayer.name}` : `This result: ${slayer.name}`)}</h1><p class="lede">Twenty questions, one Slayer, one demon side. Which are you?</p>
       <div class="actions"><button class="btn" id="take">${STRINGS.takeIt}</button></div>`;

  render(`
    <section class="enter">
      <header class="reveal-head">${heading}</header>

      <article class="result-block">
        <img src="${emblemUrl(slayer.id)}" alt="${escapeXml(slayer.name)} emblem">
        <div>
          <p class="kicker">${STRINGS.slayerHeading}${result.simSlayer ? `, ${STRINGS.match(result.simSlayer)}` : ''}</p>
          <h2 class="who">${escapeXml(slayer.name)}</h2>
          <p class="title">${escapeXml(slayer.title)}</p>
          ${whyList(why(slayer))}
          ${detail?.runnerSlayer ? `<p class="runner">${STRINGS.runnerUp(charById(detail.runnerSlayer).name)}</p>` : ''}
        </div>
      </article>

      ${demon ? `<article class="result-block">
        <img src="${emblemUrl(demon.id)}" alt="${escapeXml(demon.name)} emblem">
        <div>
          <p class="kicker">${STRINGS.demonHeading}${result.simDemon ? `, ${STRINGS.match(result.simDemon)}` : ''}</p>
          <h2 class="who">${escapeXml(demon.name)}</h2>
          <p class="title">${escapeXml(demon.title)}</p>
          ${whyList(why(demon))}
          ${detail?.runnerDemon ? `<p class="runner">${STRINGS.runnerUp(charById(detail.runnerDemon).name)}</p>` : ''}
        </div>
      </article>` : ''}

      ${breathing || rank ? `<div class="extras">
        ${breathing ? `<div><h3><span class="swatch" style="background:${breathing.color}"></span>${breathing.name}</h3><p>${escapeXml(breathing.line)}</p></div>` : ''}
        ${rank ? `<div><h3>Rank: ${rank.name}</h3><p>${escapeXml(rank.line)}</p></div>` : ''}
      </div>` : ''}

      <section class="badge-wrap" aria-label="${STRINGS.badgeHeading}">
        <h2>${STRINGS.badgeHeading}</h2>
        <img id="badge" alt="Badge: ${escapeXml(slayer.name)}${demon ? `, demon side ${escapeXml(demon.name)}` : ''}" width="1080" height="1350">
        <div class="actions">
          <button class="btn" id="share">${STRINGS.share}</button>
          <button class="btn quiet" id="download">${STRINGS.download}</button>
          <button class="btn quiet" id="copy">${STRINGS.copyLink}</button>
          <button class="btn quiet" id="print">${STRINGS.print}</button>
        </div>
        <p class="intents">${Object.entries(intentLinks(shareText, shareUrl)).map(([k, href]) => `<a href="${href}" target="_blank" rel="noopener">Post on ${k}</a>`).join('')}</p>
        <p><button class="link-btn" id="again">${own ? STRINGS.retake : STRINGS.takeIt}</button></p>
      </section>
    </section>`);

  const goQuiz = () => { location.href = siteRoot(); };
  document.getElementById('take')?.addEventListener('click', goQuiz);
  document.getElementById('again').onclick = goQuiz;

  // Badge
  const svg = await badgeSvgWithFonts(result, DATA, root);
  const img = document.getElementById('badge');
  img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const filename = `demon-slayer-${slayer.id}${demon ? `-${demon.id}` : ''}.png`;
  let png;
  const getPng = async () => (png ??= await svgToPngBlob(svg, 1080, 1350));

  document.getElementById('download').onclick = async () => downloadBlob(await getPng(), filename);
  document.getElementById('copy').onclick = async () => toast((await copyText(shareUrl)) ? STRINGS.copied : shareUrl);
  document.getElementById('print').onclick = () => window.print();
  document.getElementById('share').onclick = async () => {
    const blob = await getPng();
    const r = await shareFile(blob, filename, shareText, shareUrl);
    if (r) return;
    downloadBlob(blob, filename);
    await copyText(`${shareText} ${shareUrl}`);
    toast(STRINGS.downloaded);
  };
}

