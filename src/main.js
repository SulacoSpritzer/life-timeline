// Bootstrap + tiny router: no profile -> onboarding; otherwise -> timeline.
import { loadProfile, saveProfile, clearProfile } from './store.js';
import { mountOnboarding } from './ui/onboarding.js';
import { mountTimeline } from './ui/timeline.js';

const appEl = document.getElementById('app');
const barEl = document.getElementById('topbar');

function renderBar(showNav) {
  barEl.innerHTML = `<div class="brand">Life Timeline <small>study build</small></div>
    ${showNav ? `<div><button class="navlink" id="bar-edit">Edit profile</button> &nbsp;&nbsp; <button class="navlink" id="bar-reset">Start over</button></div>` : ''}`;
  const e = barEl.querySelector('#bar-edit');
  if (e) e.addEventListener('click', () => showOnboarding(loadProfile()));
  const r = barEl.querySelector('#bar-reset');
  if (r) r.addEventListener('click', () => { if (confirm('Clear your profile and start over?')) { clearProfile(); showOnboarding(null); } });
}

function showOnboarding(existing) {
  renderBar(false);
  window.scrollTo(0, 0);
  mountOnboarding(appEl, { existing, onComplete: (profile) => { saveProfile(profile); showTimeline(profile); } });
}

function showTimeline(profile) {
  renderBar(true);
  window.scrollTo(0, 0);
  mountTimeline(appEl, { profile, onEdit: () => showOnboarding(profile) });
}

const existing = loadProfile();
if (existing && existing.birthYear) showTimeline(existing);
else showOnboarding(existing);
