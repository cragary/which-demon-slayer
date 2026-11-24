import { test } from 'node:test';
import assert from 'node:assert/strict';
import { swapLangHref, isFrPath, backGoesToHistory } from '../src/core/lang-path.js';

const base = 'https://cragary.github.io/which-demon-slayer/';

test('swapLangHref maps EN result to FR keeping the query', () => {
  assert.equal(swapLangHref(`${base}r/gyomei/?d=nakime&n=Ana`, base, 'en'), `${base}fr/r/gyomei/?d=nakime&n=Ana`);
});

test('swapLangHref maps FR pages back to EN', () => {
  assert.equal(swapLangHref(`${base}fr/r/gyomei/?d=x`, base, 'fr'), `${base}r/gyomei/?d=x`);
  assert.equal(swapLangHref(`${base}fr/`, base, 'fr'), base);
  assert.equal(swapLangHref(base, base, 'en'), `${base}fr/`);
});

test('swapLangHref drops any hash so callers can add their own', () => {
  assert.equal(swapLangHref(`${base}fr/#quiz`, base, 'fr'), base);
});

test('isFrPath only matches the French section under the base path', () => {
  assert.equal(isFrPath('/which-demon-slayer/fr/', '/which-demon-slayer/'), true);
  assert.equal(isFrPath('/which-demon-slayer/fr', '/which-demon-slayer/'), true);
  assert.equal(isFrPath('/which-demon-slayer/fr/r/zzz/', '/which-demon-slayer/'), true);
  assert.equal(isFrPath('/which-demon-slayer/r/fr/', '/which-demon-slayer/'), false);
  assert.equal(isFrPath('/which-demon-slayer/frog/', '/which-demon-slayer/'), false);
});

test('backGoesToHistory only for steps taken on this page', () => {
  assert.equal(backGoesToHistory(5, 4), true);   // answered one question here
  assert.equal(backGoesToHistory(4, 4), false);  // resumed at Q5 after a language switch
  assert.equal(backGoesToHistory(undefined, 0), false);
});
