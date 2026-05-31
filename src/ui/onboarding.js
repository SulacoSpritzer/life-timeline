// Onboarding: a low-friction, progressive capture. Only birth year + sex are required;
// every other step is skippable and the timeline sharpens as more is added.

import { emptyProfile, clampYear } from '../model.js';

const PROFESSIONS = ['knowledge work', 'healthcare', 'education', 'business / finance', 'manual / trades', 'public service', 'creative / arts', 'self-employed'];
const EDUCATION = [['high', 'High school'], ['college', 'College'], ['graduate', 'Graduate']];
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const yr = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) && n > 1900 && n < 2200 ? n : undefined; };

export function mountOnboarding(root, { existing, onComplete }) {
  const draft = Object.assign(emptyProfile(), existing ? structuredClone(existing) : {});
  if (!draft.parents.length) draft.parents = [{ sex: 'male', alive: true }, { sex: 'female', alive: true }];
  let step = 0;

  const steps = [
    {
      title: 'The basics', q: 'When were you born, and what is your sex?',
      hint: 'Sex and current age anchor the life-table estimates. Everything starts here.',
      unlock: 'Required — unlocks your life-expectancy band and age-linked health windows.',
      body: () => `
        <div class="ob-field"><label class="ob-label">Birth year</label>
          <input class="ob-input short" id="f-birth" inputmode="numeric" value="${esc(draft.birthYear || '')}" placeholder="1985"></div>
        <div class="ob-field"><label class="ob-label">Sex</label>
          ${choice('f-sex', [['male', 'Male'], ['female', 'Female'], ['other', 'Other']], draft.sex)}</div>
        <div id="f-err" style="color:var(--accent);font-size:13px;height:18px"></div>`,
      collect: () => { draft.birthYear = yr(get('f-birth')); },
    },
    {
      title: 'Place & work', q: 'Where are you, and what do you do?',
      hint: 'Region and profession nudge retirement timing and some risk priors.',
      unlock: 'Adds your <b>career arc</b> — peak earning years and a profession-adjusted retirement.',
      body: () => `
        <div class="ob-row">
          <div class="ob-field"><label class="ob-label">Born in</label><input class="ob-input" id="f-bregion" value="${esc(draft.birthRegion)}" placeholder="US Midwest"></div>
          <div class="ob-field"><label class="ob-label">Live in now</label><input class="ob-input" id="f-cregion" value="${esc(draft.currentRegion)}" placeholder="optional"></div>
        </div>
        <div class="ob-field"><label class="ob-label">Profession</label>
          <select class="ob-select" id="f-prof"><option value="">—</option>${PROFESSIONS.map((p) => `<option ${draft.profession === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div>
        <div class="ob-field"><label class="ob-label">Education</label>
          <select class="ob-select" id="f-edu"><option value="">—</option>${EDUCATION.map(([v, l]) => `<option value="${v}" ${draft.education === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`,
      collect: () => { draft.birthRegion = get('f-bregion'); draft.currentRegion = get('f-cregion'); draft.profession = get('f-prof'); draft.education = get('f-edu'); },
    },
    {
      title: 'Health', q: 'Anything that shapes your health outlook?',
      hint: 'Light at onboarding — you can add past events in detail later, on a deep dive.',
      unlock: 'Refines the <b>health</b> domain. More detail can be added per-event after.',
      body: () => `
        <div class="ob-field"><label class="ob-label">Do you smoke?</label>
          ${choice('f-smoke', [['no', 'No'], ['yes', 'Yes']], draft.health?.smoker ? 'yes' : 'no')}</div>
        <div class="ob-field"><label class="ob-label">Any major conditions (optional)</label>
          <input class="ob-input" id="f-cond" value="${esc((draft.health?.conditions || []).join(', '))}" placeholder="comma-separated, optional"></div>`,
      collect: () => { draft.health = { smoker: pick('f-smoke') === 'yes', conditions: (get('f-cond') || '').split(',').map((s) => s.trim()).filter(Boolean) }; },
    },
    {
      title: 'Partner', q: 'Are you partnered?',
      hint: 'Defines the relationship arc and, with children, the empty-nest phase.',
      unlock: 'Adds the <b>partner</b> domain.',
      body: () => `
        <div class="ob-field"><label class="ob-label">Status</label>
          ${choice('f-pstatus', [['single', 'Single'], ['partnered', 'Partnered'], ['married', 'Married']], draft.partner?.status || 'single')}</div>
        <div class="ob-field"><label class="ob-label">Since (year)</label>
          <input class="ob-input short" id="f-psince" inputmode="numeric" value="${esc(draft.partner?.since || '')}" placeholder="2013"></div>`,
      collect: () => { draft.partner = { status: pick('f-pstatus') || 'single', since: yr(get('f-psince')) }; },
    },
    {
      title: 'Children', q: 'Do you have children?',
      hint: 'Birth years drive parenting span, college costs, and when the house empties.',
      unlock: 'Adds the <b>children</b> domain and several derived phases.',
      body: () => `
        <div id="kids">${(draft.children.length ? draft.children : []).map((c, i) => kidRow(c, i)).join('')}</div>
        <button class="linkbtn" data-add="kid">＋ Add a child</button>`,
      collect: collectKids,
      wire: (rootEl, rerender) => {
        rootEl.querySelector('[data-add="kid"]').addEventListener('click', () => { collectKids(); draft.children.push({}); rerender(); });
        rootEl.querySelectorAll('[data-rmk]').forEach((b) => b.addEventListener('click', () => { collectKids(); draft.children.splice(+b.dataset.rmk, 1); rerender(); }));
      },
    },
    {
      title: 'Parents', q: 'Tell us about your parents.',
      hint: 'Their birth years drive the mortality estimates — and the caregiving window that follows.',
      unlock: 'Adds the <b>parents</b> domain and the derived <b>caregiving</b> window.',
      body: () => `
        <div id="pars">${draft.parents.map((pa, i) => parentRow(pa, i)).join('')}</div>
        <button class="linkbtn" data-add="par">＋ Add a parent</button>`,
      collect: collectParents,
      wire: (rootEl, rerender) => {
        rootEl.querySelector('[data-add="par"]').addEventListener('click', () => { collectParents(); draft.parents.push({ sex: 'other', alive: true }); rerender(); });
        rootEl.querySelectorAll('[data-rmp]').forEach((b) => b.addEventListener('click', () => { collectParents(); draft.parents.splice(+b.dataset.rmp, 1); rerender(); }));
        rootEl.querySelectorAll('.par-alive').forEach((grp) => grp.addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) grp.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
      },
    },
    {
      title: 'Disposition', q: 'When the people you love need care, you tend to…',
      hint: 'This seeds how fully caregiving reshapes your other domains. You can change it any time.',
      unlock: 'Personalizes the projections — caregiving, the career role-shift, and partner strain.',
      body: () => `
        <div class="ob-field">${choice('f-disp', [['low', 'Hold your line'], ['med', 'Balance it'], ['high', 'Lean all the way in']], draft.disposition?.caregiving || 'med')}</div>`,
      collect: () => { draft.disposition = { caregiving: pick('f-disp') || 'med' }; },
    },
  ];

  function get(id) { const el = root.querySelector('#' + id); return el ? el.value.trim() : ''; }
  function pick(name) { const b = root.querySelector(`[data-group="${name}"] [aria-pressed="true"]`); return b ? b.dataset.v : ''; }
  function collectKids() { draft.children = [...root.querySelectorAll('#kids .rep')].map((r) => ({ birthYear: yr(r.querySelector('input').value) })).filter((c) => c.birthYear || c.birthYear === undefined); }
  function collectParents() {
    draft.parents = [...root.querySelectorAll('#pars .parrow')].map((r) => ({
      birthYear: yr(r.querySelector('[data-k="by"]').value),
      sex: r.querySelector('[data-k="sex"]').value,
      alive: r.querySelector('.par-alive [aria-pressed="true"]')?.dataset.v !== 'dead',
      diedYear: yr(r.querySelector('[data-k="died"]').value),
    }));
  }

  function render() {
    const s = steps[step], last = step === steps.length - 1;
    root.innerHTML = `<div class="ob">
      <div class="ob-kicker">Life Timeline · setup</div>
      <h1>${esc(s.title)}</h1>
      <div class="ob-progress">${steps.map((_, i) => `<i class="${i < step ? 'done' : i === step ? 'cur' : ''}"></i>`).join('')}</div>
      <div class="ob-step">
        <div class="ob-q">${esc(s.q)}</div>
        <div class="ob-hint">${s.hint}</div>
        ${s.body()}
      </div>
      <div class="unlock">${s.unlock}</div>
      <div class="ob-actions">
        <button class="btn" id="ob-next">${last ? 'See my timeline' : 'Continue'}</button>
        ${step > 0 ? '<button class="btn ghost" id="ob-back">Back</button>' : ''}
        ${step > 0 && !last ? '<button class="btn ghost" id="ob-skip">Skip</button>' : ''}
      </div>
    </div>`;

    // choice groups: live selection
    root.querySelectorAll('[data-group]').forEach((grp) => grp.addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]'); if (!b) return;
      grp.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    }));
    if (s.wire) s.wire(root, () => { render(); });

    root.querySelector('#ob-next').addEventListener('click', () => {
      s.collect();
      if (step === 0 && (!draft.birthYear || !draft.sex)) { const er = root.querySelector('#f-err'); if (er) er.textContent = 'Please enter a birth year and sex to continue.'; return; }
      if (last) return onComplete(draft);
      step++; render();
    });
    const back = root.querySelector('#ob-back'); if (back) back.addEventListener('click', () => { s.collect(); step--; render(); });
    const skip = root.querySelector('#ob-skip'); if (skip) skip.addEventListener('click', () => { step++; render(); });

    // step 0: capture sex selection into draft live (it has no data-group collect)
    const sexGrp = root.querySelector('[data-group="f-sex"]');
    if (sexGrp) sexGrp.addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) draft.sex = b.dataset.v; });
  }
  render();
}

/* ---- small render helpers ---- */
function choice(name, opts, sel) {
  return `<span class="choice" data-group="${name}">${opts.map(([v, l]) => `<button data-v="${v}" aria-pressed="${sel === v}">${l}</button>`).join('')}</span>`;
}
function kidRow(c, i) {
  return `<div class="rep"><span class="ob-label" style="margin:0">Child ${i + 1}</span>
    <input class="ob-input" inputmode="numeric" placeholder="birth year" value="${c.birthYear || ''}">
    <button class="rmv" data-rmk="${i}" aria-label="Remove">×</button></div>`;
}
function parentRow(pa, i) {
  return `<div class="parrow" style="border-top:1px solid var(--hair2);padding:12px 0">
    <div class="rep">
      <span class="ob-label" style="margin:0;min-width:64px">Parent ${i + 1}</span>
      <input class="ob-input" data-k="by" inputmode="numeric" placeholder="birth year" value="${pa.birthYear || ''}">
      <select class="ob-select" data-k="sex" style="max-width:120px"><option value="male" ${pa.sex === 'male' ? 'selected' : ''}>male</option><option value="female" ${pa.sex === 'female' ? 'selected' : ''}>female</option><option value="other" ${pa.sex === 'other' ? 'selected' : ''}>other</option></select>
      <button class="rmv" data-rmp="${i}" aria-label="Remove">×</button>
    </div>
    <div class="rep" style="margin-top:6px">
      <span class="choice par-alive">
        <button data-v="alive" aria-pressed="${pa.alive !== false}">living</button>
        <button data-v="dead" aria-pressed="${pa.alive === false}">passed</button>
      </span>
      <input class="ob-input short" data-k="died" inputmode="numeric" placeholder="year, if passed" value="${pa.diedYear || ''}">
    </div></div>`;
}
