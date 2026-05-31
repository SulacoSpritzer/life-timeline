// Timeline view. Per-domain bodies share one horizontal axis; expand/collapse animates
// height, and newly-revealed items ease in left-to-right. No disposition controls — the
// timeline is read from the profile + engine, and explained in the detail panel on click.

import { DOMAINS, DOM, NOW } from '../model.js';
import { run } from '../engine/engine.js';
import { saveProfile } from '../store.js';

const AXIS_H = 60, PADL = 12, PADR = 30, GUT = 244;
const laneH = 38, laneGap = 18, INPAD = 28, COLLAPSED_H = 74, MIN_EXP_H = 150;
const LABEL_DY = 13, CY_DY = 31, H_BAR = 9, MK = 4.8;
const INK = '#211e19', INK2 = '#5f594f', FAINT = '#6b6557', ACCENT = '#b0492e', PAPER = '#f6f3ec';
const PROVWORD = { recorded: 'recorded', data: 'data', inferred: 'projected' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const alpha = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

export function mountTimeline(root, { profile, onEdit }) {
  const disp = profile.disposition?.caregiving || 'med';
  const state = {
    profile,
    items: run(profile, { disposition: disp }),
    byId: {}, span: { start: profile.birthYear, end: profile.birthYear + 93 },
    open: new Set(['self']), multi: false, selected: null,
    firstPaint: true, reveal: new Set(), closing: new Set(),
  };
  let trackW = 900, yearW = 9;
  const x = (y) => PADL + (y - state.span.start) * yearW;
  const age = (y) => y - profile.birthYear;

  root.innerHTML = shell(profile);
  const $ = (s) => root.querySelector(s);
  const domainsEl = $('#tl-domains');
  let tipEl = null, hoverId = null, hoverTimer = null, animTimer = null;

  // Build the per-domain row skeleton once; paint() updates contents in place so the
  // height CSS transition has stable elements to animate.
  domainsEl.innerHTML = `<div class="nowline" id="tl-now"></div>` + DOMAINS.map((d) =>
    `<div class="drow" data-dom="${d.id}"><button class="dhead" data-dom="${d.id}" aria-expanded="false"></button><div class="dbody"></div></div>`
  ).join('');

  /* ---------- geometry ---------- */
  function geom(it) {
    if (it.kind === 'event') {
      const cx = x(it.at.est), lox = x(it.at.lo), hix = x(it.at.hi), labW = it.label.length * 7.2 + 34;
      return { cx, lox, hix, coreL: cx - MK, coreR: cx + MK, minPx: Math.min(lox, cx - MK), maxPx: Math.max(hix, cx) + labW };
    }
    const sL = x(it.s.lo), sE = x(it.s.est), eE = x(it.e.est), eH = x(it.e.hi), labW = it.label.length * 7.2 + 26;
    return { sL, sE, eE, eH, coreL: sE, coreR: eE, minPx: Math.min(sL, sE), maxPx: Math.max(eH, eE, sE + labW) };
  }
  function pack(items) {
    const lanes = [], sorted = [...items].sort((a, b) => a._g.minPx - b._g.minPx);
    for (const it of sorted) {
      let placed = false;
      for (let l = 0; l < lanes.length; l++) if (lanes[l] + 14 <= it._g.minPx) { lanes[l] = it._g.maxPx; it._lane = l; placed = true; break; }
      if (!placed) { it._lane = lanes.length; lanes.push(it._g.maxPx); }
    }
    return lanes.length || 1;
  }

  /* ---------- paint ---------- */
  function paint() {
    hideTip();
    state.byId = Object.fromEntries(state.items.map((i) => [i.id, i]));
    trackW = Math.max(420, $('#tl-axis').getBoundingClientRect().width);
    yearW = (trackW - PADL - PADR) / (state.span.end - state.span.start);
    renderAxis();
    for (const d of DOMAINS) {
      const di = state.items.filter((i) => i.dom === d.id);
      di.forEach((i) => (i._g = geom(i)));
      const open = state.open.has(d.id), closing = state.closing.has(d.id), showExpanded = open || closing;
      const lanes = showExpanded ? (di.length ? pack(di) : 1) : 1;
      const expandedH = Math.max(MIN_EXP_H, INPAD * 2 + lanes * laneH + (lanes - 1) * laneGap);
      const svgH = showExpanded ? expandedH : COLLAPSED_H;
      const boxH = open ? expandedH : COLLAPSED_H; // closing: keep expanded content, clip to collapsed height → folds
      const row = domainsEl.querySelector(`.drow[data-dom="${d.id}"]`);
      const head = row.querySelector('.dhead'), body = row.querySelector('.dbody');
      const reveal = state.firstPaint || state.reveal.has(d.id);
      head.setAttribute('aria-expanded', open);
      head.innerHTML = headInner(d, open);
      body.innerHTML = bodySVG(di, showExpanded, svgH, reveal);
      body.style.height = boxH + 'px';
    }
    $('#tl-now').style.left = (GUT + x(NOW)) + 'px';
    if (state.selected && state.byId[state.selected]) markSelected(state.selected);
    state.firstPaint = false; state.reveal = new Set();
  }

  function renderAxis() {
    let s = `<svg width="${trackW}" height="${AXIS_H}" viewBox="0 0 ${trackW} ${AXIS_H}" role="img" aria-label="Time, in years and age">`;
    const step = (state.span.end - state.span.start) > 70 ? 10 : 5;
    for (let yr = Math.ceil(state.span.start / step) * step; yr <= state.span.end; yr += step) {
      const px = x(yr);
      s += `<text x="${px}" y="26" text-anchor="middle" font-family="var(--sans)" font-size="12" fill="${INK2}">${yr}</text>`;
      s += `<text x="${px}" y="42" text-anchor="middle" font-family="var(--sans)" font-size="11" fill="${FAINT}">age ${age(yr)}</text>`;
    }
    const nx = x(NOW);
    s += `<text x="${nx}" y="13" text-anchor="middle" font-family="var(--sans)" font-size="10" letter-spacing="1.5" fill="${ACCENT}">NOW</text>`;
    s += '</svg>'; $('#tl-axis').innerHTML = s;
  }

  /* ---------- body + items ---------- */
  function bodySVG(di, open, H, reveal) {
    let s = `<svg width="${trackW}" height="${H}" viewBox="0 0 ${trackW} ${H}"><defs>
      <marker id="arw" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="${INK2}"/></marker></defs>`;
    const step = (state.span.end - state.span.start) > 70 ? 10 : 5;
    for (let yr = Math.ceil(state.span.start / step) * step; yr <= state.span.end; yr += step)
      s += `<line x1="${x(yr)}" y1="0" x2="${x(yr)}" y2="${H}" stroke="${alpha(INK, 0.045)}"/>`;
    for (const it of di) s += open ? renderExpanded(it, H, reveal) : renderCollapsed(it, reveal);
    return s + '</svg>';
  }

  const labelAnchor = (startPx, label) => (startPx + label.length * 7.2 + 30 > trackW - PADR ? 'end' : 'start');
  const sentGlyph = (it) => { if (!it.sentiment) return ''; const v = it.sentiment.v, g = v > 0 ? '▲' : v < 0 ? '▼' : '■'; return `<tspan dx="7" fill="${INK2}" font-size="11">${g}</tspan>`; };
  const provTspan = (it) => `<tspan dx="8" class="ptag" fill="${FAINT}">${PROVWORD[it.prov].toUpperCase()}</tspan>`;
  const star = (it) => (it.derived && it.derived.length ? `<tspan fill="${ACCENT}">✦ </tspan>` : '');
  function unfold(it) {
    if (!(state.firstPaint || state.reveal.has(it.dom))) return '';
    const t = it.kind === 'event' ? it.at.est : it.s.est, span = state.span.end - state.span.start;
    const norm = span > 0 ? Math.max(0, Math.min(1, (t - state.span.start) / span)) : 0;
    const scale = state.firstPaint ? 1.25 : 0.5;
    return ` class="item unfold" style="--d:${(norm * scale).toFixed(2)}s"`;
  }
  const gOpen = (it) => `<g data-id="${it.id}" tabindex="0" role="button" aria-label="${esc(it.label)}"${unfold(it) || ' class="item"'}>`;

  function renderExpanded(it, H, reveal) {
    const g = it._g, laneTop = INPAD + it._lane * (laneH + laneGap), labelY = laneTop + LABEL_DY, cy = laneTop + CY_DY;
    const acc = it.highlight, line = it.prov === 'inferred', col = acc ? ACCENT : INK;
    let inner = '';
    if (it.kind === 'phase') {
      if (line) {
        const o = acc ? 0.95 : 0.5;
        inner += `<line class="core" x1="${g.sE}" y1="${cy}" x2="${g.eE}" y2="${cy}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
        inner += `<line x1="${g.sE}" y1="${cy - 4}" x2="${g.sE}" y2="${cy + 4}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
        inner += `<line x1="${g.eE}" y1="${cy - 4}" x2="${g.eE}" y2="${cy + 4}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
      } else {
        const a = it.prov === 'recorded' ? 0.82 : 0.28;
        inner += `<rect class="core" x="${g.coreL}" y="${cy - H_BAR / 2}" width="${Math.max(2, g.coreR - g.coreL)}" height="${H_BAR}" rx="${H_BAR / 2}" fill="${alpha(col, a)}"/>`;
      }
      const anc = labelAnchor(g.sE, it.label), lx = anc === 'end' ? g.eE : g.sE;
      inner += `<text class="lbl" x="${lx}" y="${labelY}" text-anchor="${anc}">${star(it)}${esc(it.label)}${sentGlyph(it)}${provTspan(it)}</text>`;
      inner += `<rect class="hit" x="${g.coreL - 3}" y="${laneTop + 2}" width="${Math.max(8, g.coreR - g.coreL) + 6}" height="${laneH - 4}" rx="5" fill="transparent"/>`;
    } else {
      if (g.lox < g.cx - 2 || g.hix > g.cx + 2) {
        inner += `<line x1="${g.lox}" y1="${cy}" x2="${g.hix}" y2="${cy}" stroke="${alpha(INK, 0.3)}" stroke-width="1"/>`;
        inner += `<line x1="${g.lox}" y1="${cy - 3.5}" x2="${g.lox}" y2="${cy + 3.5}" stroke="${alpha(INK, 0.3)}" stroke-width="1"/>`;
        inner += `<line x1="${g.hix}" y1="${cy - 3.5}" x2="${g.hix}" y2="${cy + 3.5}" stroke="${alpha(INK, 0.3)}" stroke-width="1"/>`;
      }
      const o = it.prov === 'inferred';
      inner += `<circle class="core" cx="${g.cx}" cy="${cy}" r="${MK}" fill="${o ? PAPER : alpha(col, it.prov === 'recorded' ? 0.85 : 0.5)}" stroke="${col}" stroke-width="1.4"/>`;
      const anc = labelAnchor(g.cx, it.label), lx = anc === 'end' ? g.cx + MK : g.cx + MK + 6;
      inner += `<text class="lbl" x="${lx}" y="${labelY}" text-anchor="${anc}">${star(it)}${esc(it.label)}${sentGlyph(it)}${provTspan(it)}</text>`;
      inner += `<rect class="hit" x="${g.cx - 10}" y="${laneTop + 2}" width="20" height="${laneH - 4}" rx="5" fill="transparent"/>`;
    }
    return gOpen(it) + inner + '</g>';
  }
  function renderCollapsed(it, reveal) {
    const g = it._g, cy = COLLAPSED_H / 2, acc = it.highlight, col = acc ? ACCENT : INK;
    let inner;
    if (it.kind === 'phase') {
      inner = it.prov === 'inferred'
        ? `<line class="core" x1="${g.sE}" y1="${cy}" x2="${g.eE}" y2="${cy}" stroke="${col}" stroke-width="1.2" opacity="${acc ? 0.9 : 0.4}"/>`
        : `<rect class="core" x="${g.coreL}" y="${cy - 3}" width="${Math.max(2, g.coreR - g.coreL)}" height="6" rx="3" fill="${alpha(col, it.prov === 'recorded' ? 0.6 : 0.26)}"/>`;
    } else {
      inner = `<circle class="core" cx="${g.cx}" cy="${cy}" r="3.2" fill="${it.prov === 'inferred' ? PAPER : alpha(col, 0.55)}" stroke="${col}" stroke-width="1"/>`;
    }
    return gOpen(it) + inner + '</g>';
  }

  /* ---------- left header content ---------- */
  function domainSummary(domId) {
    const di = state.items.filter((i) => i.dom === domId);
    if (!di.length) return 'nothing recorded yet';
    const fut = di.filter((i) => (i.kind === 'event' ? i.at.est : i.e.est) >= NOW)
      .sort((a, b) => (a.kind === 'event' ? a.at.est : a.s.est) - (b.kind === 'event' ? b.at.est : b.s.est));
    return `${di.length} items${fut[0] ? ` · next: ${fut[0].label.toLowerCase()}` : ''}`;
  }
  function headInner(d, open) {
    const add = d.id === 'partner' ? '＋ Add past relationship' : '＋ Add past event';
    return `<span class="chev" aria-hidden="true">${open ? '–' : '+'}</span>
      <span class="dname">${d.label}</span>
      <span class="dsum">${esc(domainSummary(d.id))}</span>
      ${open ? `<span class="addbtn" data-add="${d.id}" role="button" tabindex="0">${add}</span>` : ''}`;
  }
  function markSelected(id) {
    root.querySelectorAll('.item.sel').forEach((e) => e.classList.remove('sel'));
    const g = root.querySelector(`[data-id="${id}"]`); if (g) g.classList.add('sel');
  }

  /* ---------- detail ---------- */
  const fmtYear = (p) => (p.lo === p.hi ? `${p.est}` : `${p.est} <span class="rng">(${p.lo}–${p.hi})</span>`);
  function select(id) {
    state.selected = id; markSelected(id);
    const it = state.byId[id]; if (!it) return;
    const d = DOM[it.dom];
    const when = it.kind === 'event' ? `≈ ${fmtYear(it.at)} · age ${age(it.at.est)}`
      : `${it.s.est}–${it.e.est} · ~${it.e.est - it.s.est} yrs · age ${age(it.s.est)}–${age(it.e.est)}`;
    const cp = Math.round(it.conf * 100);
    let h = `<div class="fade">`;
    h += `<div class="dom">${d.label}${it.historical ? ' · deep-dive history' : ''}</div>`;
    h += `<h3>${it.derived && it.derived.length ? '<span class="a">✦ </span>' : ''}${esc(it.label)}</h3>`;
    h += `<div class="when">${when}</div>`;
    h += `<div class="prov">${PROVWORD[it.prov]}`;
    if (it.sentiment) { const v = it.sentiment.v, g = v > 0 ? '▲' : v < 0 ? '▼' : '■'; h += `<span class="sent"> &nbsp; ${g} felt: ${esc(it.sentiment.label)}</span>`; }
    h += `</div>`;
    h += `<div class="kv"><div class="k">Confidence</div><div class="v">${cp}%</div><div class="meter"><i style="width:${cp}%"></i></div></div>`;
    h += `<div class="kv"><div class="k">Basis</div><div class="v">${esc(it.basis)}</div></div>`;
    h += `<div class="kv"><div class="k">Source · captured</div><div class="v">${esc(it.source)} · ${it.addedBy}</div></div>`;
    if (it.derived && it.derived.length) h += `<div class="block"><div class="k">✦ Derived from</div><div class="v">${esc(it.derived.map((x) => state.byId[x]?.label || x).join(', '))}</div></div>`;
    if (it.affects && it.affects.length) h += `<div class="block"><div class="k">Affects</div><div class="v">${esc(it.affects.map((x) => state.byId[x]?.label || x).join(', '))}</div></div>`;
    h += `<button class="adjust">Adjust this assumption</button>`;
    h += `<div class="note">Adjusting a fact or rejecting an estimate re-flows everything derived from it. (Not wired in this build.)</div></div>`;
    $('#tl-detail').innerHTML = h;
  }
  const showHint = () => { $('#tl-detail').innerHTML = `<div class="fade"><div class="hint">Open a domain on the left, then click any mark to see its basis, source, confidence, and provenance.</div></div>`; };

  /* ---------- deep-dive add ---------- */
  function showAddForm(domId) {
    const isP = domId === 'partner';
    $('#tl-detail').innerHTML = `<div class="fade"><div class="dom">Deep-dive capture · ${DOM[domId].label}</div>
      <h3>${isP ? 'Add a past relationship' : 'Add a past event'}</h3>
      <div class="addform">
        <div class="ob-field"><label class="ob-label">What was it</label><input class="ob-input" id="af-label" placeholder="${isP ? 'e.g. College relationship' : 'e.g. Thyroid cancer (recovered)'}"></div>
        <div class="ob-row">
          <div class="ob-field"><label class="ob-label">${isP ? 'Began' : 'Year'}</label><input class="ob-input short" id="af-start" inputmode="numeric" placeholder="2009"></div>
          ${isP ? `<div class="ob-field"><label class="ob-label">Ended</label><input class="ob-input short" id="af-end" inputmode="numeric" placeholder="2012"></div>` : ''}
        </div>
        <div class="ob-field"><label class="ob-label">How it felt</label>
          <span class="choice" id="af-sent"><button data-v="2">very good</button><button data-v="1">good</button><button data-v="-1">hard</button><button data-v="-2">very hard</button></span></div>
        <div class="ob-actions"><button class="btn" id="af-save">Add to timeline</button><button class="btn ghost" id="af-cancel">Cancel</button></div>
      </div></div>`;
    let sent = null;
    $('#af-sent').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (!b) return; sent = +b.dataset.v; $('#af-sent').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b)); });
    $('#af-cancel').addEventListener('click', showHint);
    $('#af-save').addEventListener('click', () => {
      const label = $('#af-label').value.trim(), start = parseInt($('#af-start').value, 10);
      if (!label || !start) return;
      if (isP) (state.profile.pastRelationships ||= []).push({ label, birthYear: start, endYear: parseInt($('#af-end')?.value, 10) || start + 2, sentiment: sent ?? undefined });
      else (state.profile.pastEvents ||= []).push({ label, year: start, sentiment: sent ?? undefined, kind: 'event' });
      saveProfile(state.profile);
      state.items = run(state.profile, { disposition: disp });
      if (!state.open.has(domId)) { if (!state.multi) state.open.clear(); state.open.add(domId); }
      state.reveal = new Set([domId]);
      animate(() => paint()); showHint();
    });
  }

  /* ---------- interaction ---------- */
  function animate(fn) {
    clearTimeout(animTimer);
    domainsEl.classList.add('animating');
    fn();
    animTimer = setTimeout(() => {
      domainsEl.classList.remove('animating');
      if (state.closing.size) { // closing domains folded to collapsed height; now settle into their summary strip
        const doms = [...state.closing];
        state.closing = new Set();
        paint();
        for (const id of doms) { const b = domainsEl.querySelector(`.drow[data-dom="${id}"] .dbody`); if (b) { b.classList.add('settle'); setTimeout(() => b.classList.remove('settle'), 340); } }
      }
    }, 460);
  }
  function toggle(id) {
    const wasOpen = state.open.has(id), closing = new Set();
    if (wasOpen) { state.open.delete(id); closing.add(id); }
    else { if (!state.multi) { for (const o of state.open) closing.add(o); state.open.clear(); } state.open.add(id); }
    state.reveal = wasOpen ? new Set() : new Set([id]);
    state.closing = closing;
    animate(() => paint());
  }

  /* ---------- hover tooltip: bullet breakdown ---------- */
  tipEl = document.getElementById('tl-tip');
  if (!tipEl) { tipEl = document.createElement('div'); tipEl.id = 'tl-tip'; tipEl.className = 'tip'; document.body.appendChild(tipEl); }
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const names = (ids) => ids.map((x) => state.byId[x]?.label || x).join(', ');
  function tipHTML(it) {
    const when = it.kind === 'event'
      ? `≈ ${it.at.lo === it.at.hi ? it.at.est : `${it.at.est} (${it.at.lo}–${it.at.hi})`} · age ${age(it.at.est)}`
      : `${it.s.est}–${it.e.est} · ~${it.e.est - it.s.est} yrs · age ${age(it.s.est)}–${age(it.e.est)}`;
    const li = [esc(when), `<b>${cap(PROVWORD[it.prov])}</b> · ${Math.round(it.conf * 100)}% confidence`, esc(it.basis)];
    if (it.derived && it.derived.length) li.push(`<b>Derived from</b> ${esc(names(it.derived))}`);
    if (it.affects && it.affects.length) li.push(`<b>Affects</b> ${esc(names(it.affects))}`);
    if (it.sentiment) li.push(`<b>Felt</b> ${esc(it.sentiment.label)}`);
    li.push(`<b>Source</b> ${esc(it.source)}`);
    return `<div class="tip-h">${it.derived && it.derived.length ? '<span class="a">✦ </span>' : ''}${esc(it.label)}</div><ul>${li.map((b) => `<li>${b}</li>`).join('')}</ul>`;
  }
  function showTip(g) {
    const it = state.byId[g.dataset.id]; if (!it) return;
    tipEl.innerHTML = tipHTML(it);
    const core = g.querySelector('.core') || g, r = core.getBoundingClientRect(), tr = tipEl.getBoundingClientRect();
    let left = Math.max(10, Math.min(r.left + r.width / 2 - tr.width / 2, window.innerWidth - tr.width - 10));
    // Below the mark by default (labels sit above the bar); flip above if it would overflow.
    let top = r.bottom + 12;
    if (top + tr.height > window.innerHeight - 10) top = Math.max(10, r.top - tr.height - 12);
    tipEl.style.left = Math.round(left) + 'px'; tipEl.style.top = Math.round(top) + 'px';
    tipEl.classList.add('show');
  }
  function hideTip() { if (tipEl) tipEl.classList.remove('show'); hoverId = null; clearTimeout(hoverTimer); }
  domainsEl.addEventListener('mouseover', (e) => {
    const g = e.target.closest('[data-id]'); if (!g || g.dataset.id === hoverId) return;
    hoverId = g.dataset.id; clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => { const cur = domainsEl.querySelector(`[data-id="${hoverId}"]`); if (cur) showTip(cur); }, 130);
  });
  domainsEl.addEventListener('mouseout', (e) => {
    const g = e.target.closest('[data-id]'); if (!g) return;
    if (e.relatedTarget && g.contains(e.relatedTarget)) return;
    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-id]') === g) return;
    hideTip();
  });
  domainsEl.addEventListener('focusin', (e) => { const g = e.target.closest('[data-id]'); if (g) { hoverId = g.dataset.id; showTip(g); } });
  domainsEl.addEventListener('focusout', () => hideTip());
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideTip(); });

  $('#tl-domains').addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]'); if (add) { e.stopPropagation(); showAddForm(add.dataset.add); return; }
    const item = e.target.closest('[data-id]'); if (item) { select(item.dataset.id); return; }
    const head = e.target.closest('.dhead'); if (head) toggle(head.dataset.dom);
  });
  $('#tl-domains').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const item = e.target.closest('[data-id]'); if (item) { e.preventDefault(); select(item.dataset.id); return; }
    const add = e.target.closest('[data-add]'); if (add) { e.preventDefault(); e.stopPropagation(); showAddForm(add.dataset.add); }
  });
  $('#tl-acts').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'open') { state.multi = true; state.closing = new Set(); state.reveal = new Set([...DOMAINS.map((d) => d.id)].filter((id) => !state.open.has(id))); state.open = new Set(DOMAINS.map((d) => d.id)); }
    else { state.multi = false; state.reveal = new Set(); state.closing = new Set([...state.open]); state.open.clear(); }
    animate(() => paint());
  });
  const eb = $('#tl-edit'); if (eb) eb.addEventListener('click', onEdit);
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(paint, 120); });

  paint();
}

/* ---------- shell + persona ---------- */
function shell(p) {
  return `<div class="tl-head"><div class="persona">${esc(personaLine(p))}</div></div>
  <div class="main">
    <div class="tlwrap">
      <div class="tl-axis-row">
        <div class="axis-gutter"><span class="acts" id="tl-acts"><button data-act="open">open all</button><span>·</span><button data-act="close">close all</button></span></div>
        <div class="axis-track" id="tl-axis"></div>
      </div>
      <div class="tl-domains" id="tl-domains"></div>
    </div>
    <aside class="detail" id="tl-detail"><div class="fade"><div class="hint">Open a domain on the left, then click any mark to see its basis, source, confidence, and provenance.</div></div></aside>
  </div>`;
}
function personaLine(p) {
  const bits = [`born ${p.birthYear}`, p.sex];
  if (p.currentRegion || p.birthRegion) bits.push(p.currentRegion || p.birthRegion);
  if (p.profession) bits.push(p.profession);
  if (p.partner && p.partner.status !== 'single') bits.push(p.partner.status + (p.partner.since ? ` ${p.partner.since}` : ''));
  if (p.children?.length) bits.push(`${p.children.length} ${p.children.length === 1 ? 'child' : 'children'}`);
  const py = (p.parents || []).map((x) => x.birthYear).filter(Boolean);
  if (py.length) bits.push(`parents born ${py.join(', ')}`);
  return bits.filter(Boolean).join('  ·  ');
}
