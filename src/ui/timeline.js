// Timeline view. Renders engine output in the editorial style of the vision file.
// Disposition changes re-run the engine and diff the result to drive the cross-domain
// ripple + trace. Deep-dive "add" writes back to the profile and re-runs.

import { DOMAINS, DOM, NOW } from '../model.js';
import { run, diffItems, sentLabel } from '../engine/engine.js';
import { DISP_TILT, relationshipText, defaultCaregiving } from '../engine/disposition.js';
import { saveProfile } from '../store.js';

const AXIS_H = 56, PADL = 8, PADR = 24;
const laneH = 34, laneGap = 14, INPAD = 20, COLLAPSED_H = 66, MIN_EXP_H = 120;
const LABEL_DY = 12, CY_DY = 27, H_BAR = 9, MK = 4.5;
const INK = '#211e19', INK2 = '#5f594f', FAINT = '#6b6557', ACCENT = '#b0492e', PAPER = '#f6f3ec';
const PROVWORD = { recorded: 'recorded', data: 'data', inferred: 'projected' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const alpha = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

export function mountTimeline(root, { profile, onEdit }) {
  const disp0 = defaultCaregiving(profile);
  const state = {
    profile, disp: disp0,
    items: run(profile, { disposition: disp0 }),
    byId: {}, span: spanOf(profile),
    open: new Set(['self']), multi: false, selected: null, firstPaint: true,
    changedItems: new Set(), changedDomains: new Set(), prevPos: {},
  };
  let rightW = 1000, yearW = 10;
  const x = (y) => PADL + (y - state.span.start) * yearW;
  const age = (y) => y - profile.birthYear;

  root.innerHTML = shell(profile);
  const $ = (s) => root.querySelector(s);

  /* ---- geometry ---- */
  function geom(it) {
    if (it.kind === 'event') {
      const cx = x(it.at.est), lox = x(it.at.lo), hix = x(it.at.hi), labW = it.label.length * 6.8 + 30;
      return { cx, lox, hix, coreL: cx - MK, coreR: cx + MK, minPx: Math.min(lox, cx - MK), maxPx: Math.max(hix, cx) + labW };
    }
    const sL = x(it.s.lo), sE = x(it.s.est), eE = x(it.e.est), eH = x(it.e.hi), labW = it.label.length * 6.8 + 24;
    return { sL, sE, eE, eH, coreL: sE, coreR: eE, minPx: Math.min(sL, sE), maxPx: Math.max(eH, eE, sE + labW) };
  }
  function pack(items) {
    const lanes = [], sorted = [...items].sort((a, b) => a._g.minPx - b._g.minPx);
    for (const it of sorted) {
      let placed = false;
      for (let l = 0; l < lanes.length; l++) if (lanes[l] + 12 <= it._g.minPx) { lanes[l] = it._g.maxPx; it._lane = l; placed = true; break; }
      if (!placed) { it._lane = lanes.length; lanes.push(it._g.maxPx); }
    }
    return lanes.length || 1;
  }
  function buildLayout() {
    state.items.forEach((i) => (i._g = geom(i)));
    let top = 0; const rows = [];
    for (const d of DOMAINS) {
      const di = state.items.filter((i) => i.dom === d.id), open = state.open.has(d.id);
      let h, lanes = 1;
      if (open) { lanes = di.length ? pack(di) : 1; h = Math.max(MIN_EXP_H, INPAD * 2 + lanes * laneH + (lanes - 1) * laneGap); }
      else h = COLLAPSED_H;
      rows.push({ d, di, open, top, h, lanes }); top += h;
    }
    return { rows, total: top };
  }

  /* ---- paint ---- */
  function paint() {
    state.byId = Object.fromEntries(state.items.map((i) => [i.id, i]));
    const right = $('.right');
    rightW = Math.max(560, right.getBoundingClientRect().width);
    yearW = (rightW - PADL - PADR) / (state.span.end - state.span.start);
    const L = buildLayout();
    renderAxis(); renderCanvas(L); renderLeft(L);
    if (state.selected && state.byId[state.selected]) markSelected(state.selected);
    state.firstPaint = false; // unfold reveal only on first appearance
  }

  // Stagger each item's reveal by where it sits in time — a left-to-right unfolding.
  function unfoldAttrs(it) {
    if (!state.firstPaint) return { cls: '', style: '' };
    const t = it.kind === 'event' ? it.at.est : it.s.est;
    const span = state.span.end - state.span.start;
    const norm = span > 0 ? Math.max(0, Math.min(1, (t - state.span.start) / span)) : 0;
    return { cls: ' unfold', style: ` style="--d:${(norm * 1.25).toFixed(2)}s"` };
  }

  function renderAxis() {
    let s = `<svg width="${rightW}" height="${AXIS_H}" viewBox="0 0 ${rightW} ${AXIS_H}" role="img" aria-label="Time, in years and age">`;
    const step = (state.span.end - state.span.start) > 70 ? 10 : 5;
    for (let yr = Math.ceil(state.span.start / step) * step; yr <= state.span.end; yr += step) {
      const px = x(yr);
      s += `<text x="${px}" y="24" text-anchor="middle" font-family="var(--sans)" font-size="11" fill="${INK2}">${yr}</text>`;
      s += `<text x="${px}" y="38" text-anchor="middle" font-family="var(--sans)" font-size="9.5" fill="${FAINT}">age ${age(yr)}</text>`;
    }
    const nx = x(NOW);
    s += `<line x1="${nx}" y1="6" x2="${nx}" y2="${AXIS_H}" stroke="${ACCENT}" stroke-width="1.5"/>`;
    s += `<text x="${nx + 7}" y="16" font-family="var(--sans)" font-size="9.5" letter-spacing="1.4" fill="${ACCENT}">NOW · AGE ${age(NOW)}</text>`;
    s += '</svg>'; $('#tl-axis').innerHTML = s;
  }

  function renderCanvas(L) {
    const W = rightW, H = L.total;
    let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>
      <marker id="arw" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="${INK2}"/></marker></defs>`;
    for (let yr = Math.ceil(state.span.start / 10) * 10; yr <= state.span.end; yr += 10) s += `<line x1="${x(yr)}" y1="0" x2="${x(yr)}" y2="${H}" stroke="${alpha(INK, 0.05)}"/>`;
    const nx = x(NOW); s += `<line x1="${nx}" y1="0" x2="${nx}" y2="${H}" stroke="${ACCENT}" stroke-width="1.2" stroke-dasharray="2 4" opacity="0.7"/>`;
    for (const R of L.rows) {
      if (R.top > 0) s += `<line x1="0" y1="${R.top}" x2="${W}" y2="${R.top}" stroke="${alpha(INK, 0.06)}"/>`;
      for (const it of R.di) s += R.open ? renderExpanded(it, R) : renderCollapsed(it, R);
    }
    s += '</svg>'; $('#tl-canvas').innerHTML = s;
  }

  const labelAnchor = (startPx, label) => (startPx + label.length * 6.8 + 28 > rightW - PADR ? 'end' : 'start');
  const sentGlyph = (it) => { if (!it.sentiment) return ''; const v = it.sentiment.v, g = v > 0 ? '▲' : v < 0 ? '▼' : '■'; return `<tspan dx="6" fill="${INK2}" font-size="10">${g}</tspan>`; };
  const provTspan = (it) => `<tspan dx="7" font-family="var(--sans)" font-size="8.5" letter-spacing="1.2" fill="${FAINT}">${PROVWORD[it.prov].toUpperCase()}</tspan>`;
  const star = (it) => (it.derived && it.derived.length ? `<tspan fill="${ACCENT}">✦ </tspan>` : '');

  function renderExpanded(it, R) {
    const g = it._g, laneTop = R.top + INPAD + it._lane * (laneH + laneGap), labelY = laneTop + LABEL_DY, cy = laneTop + CY_DY;
    const acc = it.highlight, line = it.prov === 'inferred', col = acc ? ACCENT : INK;
    const ua = unfoldAttrs(it);
    let inner = '';
    if (state.changedItems.has(it.id) && state.prevPos[it.id]) {
      const p = state.prevPos[it.id];
      if (it.kind === 'phase' && p.s != null) { const gx0 = x(p.s), gx1 = x(p.e);
        inner += `<line x1="${gx0}" y1="${cy}" x2="${gx1}" y2="${cy}" stroke="${alpha(INK, 0.28)}" stroke-width="1.2" stroke-dasharray="2 3"/>`;
        inner += `<line x1="${(gx0 + gx1) / 2}" y1="${cy}" x2="${(g.coreL + g.coreR) / 2}" y2="${cy}" stroke="${INK2}" stroke-width="1" marker-end="url(#arw)"/>`;
      } else if (p.at != null) { const gx = x(p.at);
        inner += `<circle cx="${gx}" cy="${cy}" r="${MK}" fill="none" stroke="${alpha(INK, 0.3)}" stroke-width="1.1" stroke-dasharray="2 2"/>`;
        inner += `<line x1="${gx}" y1="${cy}" x2="${g.cx}" y2="${cy}" stroke="${INK2}" stroke-width="1" marker-end="url(#arw)"/>`;
      }
    }
    if (it.kind === 'phase') {
      if (line) {
        const o = acc ? 0.95 : 0.55;
        inner += `<line class="core" x1="${g.sE}" y1="${cy}" x2="${g.eE}" y2="${cy}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
        inner += `<line x1="${g.sE}" y1="${cy - 4}" x2="${g.sE}" y2="${cy + 4}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
        inner += `<line x1="${g.eE}" y1="${cy - 4}" x2="${g.eE}" y2="${cy + 4}" stroke="${col}" stroke-width="1.5" opacity="${o}"/>`;
      } else {
        const a = it.prov === 'recorded' ? 0.82 : 0.30;
        inner += `<rect class="core" x="${g.coreL}" y="${cy - H_BAR / 2}" width="${Math.max(2, g.coreR - g.coreL)}" height="${H_BAR}" rx="${H_BAR / 2}" fill="${alpha(col, a)}"/>`;
      }
      if (it.risk) inner += `<text x="${g.sE}" y="${cy + 15}" class="lbl" font-size="11" fill="${ACCENT}">strain risk</text>`;
      const anc = labelAnchor(g.sE, it.label), lx = anc === 'end' ? g.eE : g.sE;
      inner += `<text class="lbl" x="${lx}" y="${labelY}" text-anchor="${anc}">${star(it)}${esc(it.label)}${sentGlyph(it)}${provTspan(it)}</text>`;
      inner += `<rect class="hit" x="${g.coreL - 3}" y="${laneTop + 2}" width="${Math.max(8, g.coreR - g.coreL) + 6}" height="${laneH - 4}" rx="4" fill="transparent"/>`;
    } else {
      if (g.lox < g.cx - 2 || g.hix > g.cx + 2) {
        inner += `<line x1="${g.lox}" y1="${cy}" x2="${g.hix}" y2="${cy}" stroke="${alpha(INK, 0.32)}" stroke-width="1"/>`;
        inner += `<line x1="${g.lox}" y1="${cy - 3.5}" x2="${g.lox}" y2="${cy + 3.5}" stroke="${alpha(INK, 0.32)}" stroke-width="1"/>`;
        inner += `<line x1="${g.hix}" y1="${cy - 3.5}" x2="${g.hix}" y2="${cy + 3.5}" stroke="${alpha(INK, 0.32)}" stroke-width="1"/>`;
      }
      const o = it.prov === 'inferred';
      inner += `<circle class="core" cx="${g.cx}" cy="${cy}" r="${MK}" fill="${o ? PAPER : alpha(col, it.prov === 'recorded' ? 0.85 : 0.5)}" stroke="${col}" stroke-width="1.4"/>`;
      const anc = labelAnchor(g.cx, it.label), lx = anc === 'end' ? g.cx + MK : g.cx + MK + 5;
      inner += `<text class="lbl" x="${lx}" y="${labelY}" text-anchor="${anc}">${star(it)}${esc(it.label)}${sentGlyph(it)}${provTspan(it)}</text>`;
      inner += `<rect class="hit" x="${g.cx - 9}" y="${laneTop + 2}" width="18" height="${laneH - 4}" rx="4" fill="transparent"/>`;
    }
    return `<g class="item${ua.cls}" data-id="${it.id}" tabindex="0" role="button" aria-label="${esc(it.label)}"${ua.style}>${inner}</g>`;
  }
  function renderCollapsed(it, R) {
    const g = it._g, cy = R.top + COLLAPSED_H / 2, acc = it.highlight, col = acc ? ACCENT : INK;
    const ua = unfoldAttrs(it);
    if (it.kind === 'phase') {
      if (it.prov === 'inferred') return `<g class="item${ua.cls}" data-id="${it.id}"${ua.style}><line class="core" x1="${g.sE}" y1="${cy}" x2="${g.eE}" y2="${cy}" stroke="${col}" stroke-width="1.2" opacity="${acc ? 0.9 : 0.4}"/></g>`;
      return `<g class="item${ua.cls}" data-id="${it.id}"${ua.style}><rect class="core" x="${g.coreL}" y="${cy - 3}" width="${Math.max(2, g.coreR - g.coreL)}" height="6" rx="3" fill="${alpha(col, it.prov === 'recorded' ? 0.6 : 0.28)}"/></g>`;
    }
    return `<g class="item${ua.cls}" data-id="${it.id}"${ua.style}><circle class="core" cx="${g.cx}" cy="${cy}" r="3" fill="${it.prov === 'inferred' ? PAPER : alpha(col, 0.55)}" stroke="${col}" stroke-width="1"/></g>`;
  }

  function domainSummary(domId) {
    const di = state.items.filter((i) => i.dom === domId);
    if (!di.length) return 'nothing recorded yet';
    const fut = di.filter((i) => (i.kind === 'event' ? i.at.est : i.e.est) >= NOW)
      .sort((a, b) => (a.kind === 'event' ? a.at.est : a.s.est) - (b.kind === 'event' ? b.at.est : b.s.est));
    const next = fut[0];
    return `${di.length} items${next ? ` · next: ${next.label.toLowerCase()}` : ''}`;
  }
  function renderLeft(L) {
    let h = `<div class="axis-spacer"><span>Domains</span><span class="acts"><button data-act="open">open all</button><span>·</span><button data-act="close">close all</button></span></div>`;
    for (const R of L.rows) {
      const d = R.d, open = R.open, changed = state.changedDomains.has(d.id) && !open;
      const add = d.id === 'partner' ? '＋ Add past relationship' : '＋ Add past event';
      h += `<button class="dhead${changed ? ' changed flash' : ''}" data-dom="${d.id}" aria-expanded="${open}" style="height:${R.h}px">
        <span class="nm"><span class="chev">${open ? '–' : '+'}</span>${d.label}</span>
        <span class="sm">${esc(domainSummary(d.id))}</span>
        <span class="upd">updated</span>
        ${open ? `<span class="addbtn" data-add="${d.id}" role="button" tabindex="0">${add}</span>` : ''}
      </button>`;
    }
    $('#tl-left').innerHTML = h;
  }
  function markSelected(id) {
    root.querySelectorAll('.item.sel').forEach((e) => e.classList.remove('sel'));
    const g = root.querySelector(`.item[data-id="${id}"]`); if (g) g.classList.add('sel');
  }

  /* ---- detail ---- */
  const fmtYear = (p) => (p.lo === p.hi ? `${p.est}` : `${p.est} <span style="color:${FAINT}">(${p.lo}–${p.hi})</span>`);
  function select(id) {
    state.selected = id; markSelected(id);
    const it = state.byId[id]; if (!it) return;
    const d = DOM[it.dom];
    const when = it.kind === 'event' ? `≈ ${fmtYear(it.at)} · age ${age(it.at.est)}`
      : `${it.s.est}–${it.e.est} · ~${it.e.est - it.s.est} yrs · age ${age(it.s.est)}–${age(it.e.est)}`;
    const cp = Math.round(it.conf * 100);
    let h = `<div class="dom">${d.label}${it.historical ? ' · deep-dive history' : ''}</div>`;
    h += `<h3>${it.derived && it.derived.length ? '<span class="a">✦ </span>' : ''}${esc(it.label)}</h3>`;
    h += `<div class="when">${when}</div>`;
    h += `<div class="prov">${PROVWORD[it.prov]}`;
    if (it.sentiment) { const v = it.sentiment.v, g = v > 0 ? '▲' : v < 0 ? '▼' : '■'; h += `<span class="sent"> &nbsp; ${g} felt: ${esc(it.sentiment.label)}</span>`; }
    h += `</div>`;
    h += `<div class="kv"><div class="k">Confidence</div><div class="v">${cp}%</div><div class="meter"><i style="width:${cp}%"></i></div></div>`;
    h += `<div class="kv"><div class="k">Basis</div><div class="v">${esc(it.basis)}</div></div>`;
    h += `<div class="kv"><div class="k">Source · captured</div><div class="v">${esc(it.source)} · ${it.addedBy}</div></div>`;
    if (it.dispo) {
      h += `<div class="block"><div class="k">Disposition influence</div><div class="v">Shaped by caregiving propensity = <b>${state.disp}</b>.`;
      if (state.changedItems.has(id) && state.prevPos[id]) { const p = state.prevPos[id];
        const before = p.at != null ? `${p.at}` : `${p.s}–${p.e}`, after = it.kind === 'event' ? `${it.at.est}` : `${it.s.est}–${it.e.est}`;
        h += ` Moved <b>${before} → ${after}</b>.`;
      }
      h += `</div></div>`;
    }
    if (it.derived && it.derived.length) h += `<div class="block q"><div class="k">✦ Derived from</div><div class="v">${esc(it.derived.map((x) => state.byId[x]?.label || x).join(', '))}</div></div>`;
    if (it.affects && it.affects.length) h += `<div class="block q"><div class="k">Affects</div><div class="v">${esc(it.affects.map((x) => state.byId[x]?.label || x).join(', '))}</div></div>`;
    h += `<button class="adjust">Adjust this assumption</button>`;
    h += `<div class="note">Adjusting a fact or rejecting an estimate re-flows everything derived from it. (Not wired in this build.)</div>`;
    $('#tl-detail').innerHTML = h;
  }

  /* ---- deep-dive add (writes back to profile) ---- */
  function showAddForm(domId) {
    const isP = domId === 'partner';
    $('#tl-detail').innerHTML = `<div class="dom">Deep-dive capture · ${DOM[domId].label}</div>
      <h3>${isP ? 'Add a past relationship' : 'Add a past event'}</h3>
      <div class="addform">
        <div class="ob-field"><label class="ob-label">What was it</label><input class="ob-input" id="af-label" placeholder="${isP ? 'e.g. College relationship' : 'e.g. Thyroid cancer (recovered)'}"></div>
        <div class="ob-row">
          <div class="ob-field"><label class="ob-label">${isP ? 'Began' : 'Year'}</label><input class="ob-input short" id="af-start" inputmode="numeric" placeholder="2009"></div>
          ${isP ? `<div class="ob-field"><label class="ob-label">Ended</label><input class="ob-input short" id="af-end" inputmode="numeric" placeholder="2012"></div>` : ''}
        </div>
        <div class="ob-field"><label class="ob-label">How it felt</label>
          <span class="choice" id="af-sent">
            <button data-v="2">very good</button><button data-v="1">good</button>
            <button data-v="-1">hard</button><button data-v="-2">very hard</button>
          </span></div>
        <div class="ob-actions"><button class="btn" id="af-save">Add to timeline</button><button class="btn ghost" id="af-cancel">Cancel</button></div>
      </div>`;
    let sent = null;
    $('#af-sent').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (!b) return;
      sent = +b.dataset.v; $('#af-sent').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b)); });
    $('#af-cancel').addEventListener('click', () => select(state.selected) || showHint());
    $('#af-save').addEventListener('click', () => {
      const label = $('#af-label').value.trim(); const start = parseInt($('#af-start').value, 10);
      if (!label || !start) return;
      if (isP) { state.profile.pastRelationships = state.profile.pastRelationships || [];
        state.profile.pastRelationships.push({ label, birthYear: start, endYear: parseInt($('#af-end')?.value, 10) || start + 2, sentiment: sent ?? undefined });
      } else { state.profile.pastEvents = state.profile.pastEvents || [];
        state.profile.pastEvents.push({ label, year: start, sentiment: sent ?? undefined, kind: 'event' });
      }
      saveProfile(state.profile);
      rerun(); state.open = new Set([domId]); paint(); showHint();
    });
  }
  const showHint = () => { $('#tl-detail').innerHTML = `<div class="hint">Open a domain on the left, then click any mark to see its basis, source, confidence, and provenance.</div>`; };

  /* ---- recompute / rerun ---- */
  function recompute(disp) {
    const prev = state.items;
    const next = run(state.profile, { disposition: disp });
    const d = diffItems(prev, next);
    state.disp = disp; state.items = next; state.span = spanOf(state.profile);
    state.changedItems = d.changedItems; state.changedDomains = d.changedDomains; state.prevPos = d.prevPos;
    state.profile.disposition = { caregiving: disp }; saveProfile(state.profile);
    root.querySelectorAll('.opts button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.p === disp));
    $('#tl-tilt').textContent = DISP_TILT[disp];
    paint();
    if (state.selected) select(state.selected);
  }
  function rerun() { // full recompute, no ripple (profile changed)
    state.items = run(state.profile, { disposition: state.disp });
    state.changedItems = new Set(); state.changedDomains = new Set(); state.prevPos = {};
    state.span = spanOf(state.profile);
  }

  /* ---- wiring ---- */
  $('#tl-left').addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]');
    if (act) { if (act.dataset.act === 'open') { state.multi = true; state.open = new Set(DOMAINS.map((d) => d.id)); } else { state.multi = false; state.open.clear(); } paint(); return; }
    const add = e.target.closest('[data-add]'); if (add) { e.stopPropagation(); showAddForm(add.dataset.add); return; }
    const head = e.target.closest('.dhead'); if (head) {
      const id = head.dataset.dom;
      if (state.open.has(id)) state.open.delete(id);
      else { if (!state.multi) state.open.clear(); state.open.add(id); state.changedDomains.delete(id); }
      paint();
    }
  });
  $('#tl-canvas').addEventListener('click', (e) => { const g = e.target.closest('[data-id]'); if (g) select(g.dataset.id); });
  $('#tl-canvas').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { const g = e.target.closest('[data-id]'); if (g) { e.preventDefault(); select(g.dataset.id); } } });
  root.querySelectorAll('.opts button').forEach((b) => b.addEventListener('click', () => { if (b.dataset.p !== state.disp) recompute(b.dataset.p); }));
  const editBtn = $('#tl-edit'); if (editBtn) editBtn.addEventListener('click', onEdit);
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(paint, 120); });

  // init readouts
  $('#tl-rel').textContent = relationshipText(profile);
  $('#tl-tilt').textContent = DISP_TILT[disp0];
  paint();
}

/* ---- helpers outside the closure ---- */
function spanOf(p) {
  const start = p.birthYear;
  // end ~ life expectancy tail; use a generous fixed tail so the axis is stable
  return { start, end: start + 93 };
}
function shell(p) {
  return `
  <div class="tl-head">
    <h1>Life Timeline</h1>
    <div class="lede">Your life as a timeline of overlapping phases and dated events, each sourced and labeled by confidence.</div>
    <div class="persona">${esc(personaLine(p))}</div>
    <div class="lensrow">
      <div class="lens">
        <div class="lk">Disposition</div>
        <div class="lrow"><span class="ll">Caregiving propensity</span>
          <span class="opts" role="group" aria-label="Caregiving propensity">
            <button data-p="low" aria-pressed="${p.disposition?.caregiving === 'low'}">low</button>
            <button data-p="med" aria-pressed="${(p.disposition?.caregiving || 'med') === 'med'}">med</button>
            <button data-p="high" aria-pressed="${p.disposition?.caregiving === 'high'}">high</button>
          </span></div>
        <div class="lread" id="tl-rel">Relationship persistence: moderate</div>
        <div class="lread" id="tl-tilt">Career–family balance: even</div>
      </div>
      <div class="lens">
        <div class="lk">Legend</div>
        <div class="legend">
          <span class="a">▬</span> solid = recorded &nbsp;&nbsp; <span style="opacity:.5">▬</span> light = data &nbsp;&nbsp; ─ line = projected<br>
          <span class="a">│</span> now &nbsp;&nbsp; <span class="a">✦</span> derived &nbsp;&nbsp; ▲ / ▼ sentiment
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="leftcol" id="tl-left"></div>
    <div class="right"><div class="axis" id="tl-axis"></div><div class="canvas" id="tl-canvas"></div></div>
    <aside class="detail" id="tl-detail"><div class="hint">Open a domain on the left, then click any mark to see its basis, source, confidence, and provenance.</div>
      <div class="note">Numbers are illustrative, not a forecast. Set caregiving propensity to high and watch Career and Partner flag a change.</div></aside>
  </div>`;
}
function personaLine(p) {
  const bits = [`born ${p.birthYear}`, p.sex];
  if (p.currentRegion || p.birthRegion) bits.push(p.currentRegion || p.birthRegion);
  if (p.profession) bits.push(p.profession);
  if (p.partner && p.partner.status !== 'single') bits.push(p.partner.status + (p.partner.since ? ` ${p.partner.since}` : ''));
  if (p.children?.length) bits.push(`${p.children.length} ${p.children.length === 1 ? 'child' : 'children'}`);
  const parentYears = (p.parents || []).map((x) => x.birthYear).filter(Boolean);
  if (parentYears.length) bits.push(`parents born ${parentYears.join(', ')}`);
  return bits.filter(Boolean).join('  ·  ');
}
