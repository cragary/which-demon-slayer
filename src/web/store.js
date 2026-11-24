// sessionStorage that never throws (it does when site data is blocked): the quiz still works, just without resume.
export const store = {
  get(key) {
    try { return sessionStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { sessionStorage.setItem(key, value); } catch { /* storage blocked */ }
  },
  remove(key) {
    try { sessionStorage.removeItem(key); } catch { /* storage blocked */ }
  },
};
