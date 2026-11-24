// Entry point: landing, quiz or result, decided by the URL.
import { DATA } from '../data/index.js';
import { STRINGS } from '../data/strings.en.js';
import { decodeResult } from '../core/share-url.js';
import { MOTIFS } from '../data/emblems.js';
import { emblemSvg } from '../render/emblem.js';
import { startQuiz, hasProgress } from './quiz-view.js';
import { showResult } from './result-view.js';

const app = document.getElementById('app');
const root = document.body.dataset.root || './';

/** Absolute URL of the site root, derived from where this page lives (works locally and on Pages). */
export const siteRoot = () => new URL(root, location.href).href;

export const emblemUrl = (id) => `data:image/svg+xml,${encodeURIComponent(emblemSvg(id, 128))}`;

/** 0 = midnight, 1 = sunrise. The quiz only warms the horizon (light text stays readable); dawn breaks at the result. */
export function setProgress(p) {
  const day = p >= 1;
  document.documentElement.style.setProperty('--progress', String(p));
  document.documentElement.style.setProperty('--sky', String(day ? 1 : p * 0.35));
  document.body.classList.toggle('is-day', day);
}

export function toast(msg) {
  const el = document.querySelector('.toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 3200);
}

export function render(html) {
  app.innerHTML = html;
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
}

const crowSvg = () => {
  const rows = MOTIFS.crow;
  let rects = '';
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    if (c === '4') rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#0b0d1a"/>`;
    if (c === '5') rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#e9e4f5"/>`;
    if (c === '6') rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#f2b33d"/>`;
  }));
  return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
};

export function showLanding() {
  setProgress(0);
  const resume = hasProgress();
  const cast = DATA.characters.map((c) => `<img src="${emblemUrl(c.id)}" alt="" title="${c.name}" loading="lazy">`).join('');
  render(`
    <section class="enter">
      <div class="crow">${crowSvg()}<p class="crow-says">Caw! New recruit! Twenty questions stand between you and dawn.</p></div>
      <h1>${STRINGS.title}</h1>
      <p class="lede">Answer like you would on a real mission. When the sun comes up, you'll learn which Slayer you're closest to, which demon lurks in your shadow, how you breathe and where you rank in the Corps.</p>
      <div class="actions">
        <button class="btn" id="go">${resume ? 'Continue the mission' : 'Accept the mission'}</button>
        ${resume ? '<button class="btn quiet" id="restart">Start over</button>' : ''}
      </div>
      <div class="cast" aria-label="42 possible characters">${cast}</div>
    </section>`);
  document.getElementById('go').onclick = () => startQuiz({ resume });
  document.getElementById('restart')?.addEventListener('click', () => startQuiz({ resume: false }));
}

function boot() {
  const slayerId = document.body.dataset.slayer;
  if (slayerId && !slayerId.startsWith('%')) {
    const result = decodeResult(slayerId, new URLSearchParams(location.search), DATA);
    if (result) return showResult(result, { own: sessionStorage.getItem('wds-own') === location.search });
  }
  showLanding();
}

boot();
