// One question at a time; progress survives reloads (sessionStorage).
import { data as DATA, strings as STRINGS, otherLangHref } from './i18n.js';
import { escapeXml } from '../core/escape.js';
import { render, setProgress } from './app.js';
import { finishQuiz } from './result-view.js';
import { store } from './store.js';

const KEY = 'wds-progress';
const N = DATA.questions.length;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const load = () => {
  try { return JSON.parse(store.get(KEY)); } catch { return null; }
};
const save = (s) => store.set(KEY, JSON.stringify(s));
export const hasProgress = () => (load()?.answers?.length ?? 0) > 0;
export const clearProgress = () => store.remove(KEY);

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let state;

export function startQuiz({ resume }) {
  state = resume && load();
  if (!state || !Array.isArray(state.answers) || state.answers.length > N) {
    state = { answers: [], order: Object.fromEntries(DATA.questions.map((q) => [q.id, shuffle(q.answers.map((a) => a.id))])), name: '' };
  }
  save(state);
  history.replaceState({ wds: state.answers.length }, '');
  showQuestion();
}

function slash() {
  if (reduced) return;
  const s = document.createElement('div');
  s.className = 'slash';
  document.body.append(s);
  setTimeout(() => s.remove(), 400);
}

/** While a quiz is running, the language switch carries #quiz so the other language resumes right here. */
function pointSwitchAtQuiz() {
  const sw = document.querySelector('.lang-switch');
  if (sw) sw.href = `${otherLangHref().split('#')[0]}#quiz`;
}

function showQuestion() {
  pointSwitchAtQuiz();
  const i = state.answers.length;
  if (i >= N) return showNameStep();
  setProgress(i / N);
  const q = DATA.questions[i];
  const byId = Object.fromEntries(q.answers.map((a) => [a.id, a]));
  const ids = state.order[q.id]?.length === 4 ? state.order[q.id] : q.answers.map((a) => a.id);
  const bars = DATA.questions.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('');
  render(`
    <section class="enter">
      <div class="progress" aria-hidden="true">${bars}</div>
      <div class="q-meta"><span>${STRINGS.question(i + 1, N)}</span>${i > 0 ? `<button class="link-btn" id="back">${STRINGS.back}</button>` : ''}</div>
      <h2 class="q-text" id="q">${escapeXml(q.text)}</h2>
      <ul class="answers" aria-labelledby="q">
        ${ids.map((id, k) => `<li><button class="answer" data-id="${id}"><span class="key">${k + 1}</span>${escapeXml(byId[id].text)}</button></li>`).join('')}
      </ul>
    </section>`);
  document.querySelectorAll('.answer').forEach((b) => (b.onclick = () => pick(b)));
  document.getElementById('back')?.addEventListener('click', back);
}

function pick(button) {
  if (pick.busy) return;
  pick.busy = true;
  button.classList.add('picked');
  state.answers.push(button.dataset.id);
  save(state);
  history.pushState({ wds: state.answers.length }, '');
  slash();
  setTimeout(() => { pick.busy = false; showQuestion(); }, reduced ? 0 : 220);
}

/** In-app Back mirrors the browser's, so both stay in step. */
function back() {
  if (history.state?.wds > 0) history.back();
  else stepBack();
}

function stepBack() {
  state.answers.pop();
  save(state);
  showQuestion();
}

addEventListener('popstate', (e) => {
  if (!state || typeof e.state?.wds !== 'number') return;
  while (state.answers.length > e.state.wds) state.answers.pop();
  save(state);
  showQuestion();
});

function showNameStep() {
  pointSwitchAtQuiz();
  setProgress(0.97);
  render(`
    <section class="enter">
      <h2>${escapeXml(STRINGS.nameStepTitle)}</h2>
      <p class="lede">${escapeXml(STRINGS.nameStepLede)}</p>
      <form id="name-form">
        <label class="name-field">${STRINGS.nameLabel}
          <input name="name" maxlength="40" autocomplete="nickname" placeholder="${escapeXml(STRINGS.namePlaceholder)}" value="${escapeXml(state.name ?? '')}">
        </label>
        <div class="actions">
          <button class="btn" type="submit">${STRINGS.reveal}</button>
          <button class="link-btn" type="button" id="back">${STRINGS.back}</button>
        </div>
      </form>
    </section>`);
  document.getElementById('back').onclick = back;
  document.getElementById('name-form').onsubmit = (e) => {
    e.preventDefault();
    state.name = new FormData(e.target).get('name')?.toString().trim() ?? '';
    save(state);
    finishQuiz(state);
  };
}

// Keyboard: 1–4 picks an answer.
addEventListener('keydown', (e) => {
  if (!/^[1-4]$/.test(e.key) || e.target.closest?.('input, textarea')) return;
  document.querySelectorAll('.answer')[Number(e.key) - 1]?.click();
});
