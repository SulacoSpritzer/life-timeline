// Local-first persistence. v1 keeps the (sensitive) profile in the browser only —
// no account, no server — to keep the trust bar low, per the brief.

const KEY = 'life-timeline:v1';

/** @returns {import('./model.js').Profile | null} */
export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw).profile : null;
  } catch {
    return null;
  }
}

/** @param {import('./model.js').Profile} profile */
export function saveProfile(profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ profile, savedAt: Date.now() }));
  } catch (e) {
    console.warn('Could not save profile', e);
  }
}

export function clearProfile() {
  localStorage.removeItem(KEY);
}
