// The engine: profile -> timeline items. Generators are the unit of work; each emits
// items tagged with provenance (recorded | data | inferred), confidence, basis & source.
// Hybrid by design: where we have a data table we use it; otherwise we infer and say so.

import { NOW, pt, clampYear } from '../model.js';
import { deathYearEst, lifeExpectancyDelta } from '../data/lifeTables.js';
import { getFact, cite } from '../corpus/corpus.js';
import {
  CVD_ONSET_AGE, RETIREMENT_AGE, RETIRE_BY_PROFESSION, LEAVE_HOME_AGE, COLLEGE_AGE,
  PEAK_EARNING_AGE, CAREGIVING_SPAN, SOURCES,
} from '../data/stats.js';

const S = (v, label) => ({ v, label });

/** Derive the key dated facts a profile implies, given a caregiving propensity. */
export function computeFacts(p, disp, now = NOW) {
  const f = { birth: p.birthYear, age: now - p.birthYear };

  // Self — life expectancy from the SSA table, adjusted by the profile's risk factors.
  const le = lifeExpectancyDelta(p);
  const base = deathYearEst(p.birthYear, p.sex, now, 0);
  f.death = le.years ? deathYearEst(p.birthYear, p.sex, now, le.years) : base;
  f.le = le; f.baseDeathAge = base.deathAge;
  f.eduEnd = p.birthYear + (p.education === 'graduate' ? 24 : p.education === 'college' ? 22 : 18);
  f.peakHealthEnd = p.birthYear + 40;
  f.cvdYear = p.birthYear + (CVD_ONSET_AGE[p.sex] ?? CVD_ONSET_AGE.other);
  f.illnessStart = f.death.est - 13;

  // Career
  const radj = RETIRE_BY_PROFESSION[p.profession] ?? 0;
  f.retire = {
    est: clampYear(p.birthYear + RETIREMENT_AGE.est + radj),
    lo: clampYear(p.birthYear + RETIREMENT_AGE.lo + radj),
    hi: clampYear(p.birthYear + RETIREMENT_AGE.hi + radj),
  };
  f.peakEarn = { s: p.birthYear + PEAK_EARNING_AGE.start, e: Math.min(f.retire.est, p.birthYear + PEAK_EARNING_AGE.end) };

  // Children
  f.kids = (p.children || []).filter((c) => c.birthYear).map((c) => ({
    born: c.birthYear,
    leave: pt(c.birthYear + LEAVE_HOME_AGE.est, c.birthYear + LEAVE_HOME_AGE.lo, c.birthYear + LEAVE_HOME_AGE.hi),
    college: { s: c.birthYear + COLLEGE_AGE.start, e: c.birthYear + COLLEGE_AGE.end },
  }));
  if (f.kids.length) {
    f.parentingStart = Math.min(...f.kids.map((k) => k.born));
    f.lastLeave = Math.max(...f.kids.map((k) => k.leave.est));
    f.collegeStart = Math.min(...f.kids.map((k) => k.college.s));
    f.collegeEnd = Math.max(...f.kids.map((k) => k.college.e));
  }

  // Parents -> caregiving (the worked example, computed from real birth years)
  f.parents = (p.parents || []).filter((pa) => pa.birthYear || pa.diedYear).map((pa) => ({
    ...pa,
    death: pa.alive === false && pa.diedYear ? pt(pa.diedYear) : deathYearEst(pa.birthYear, pa.sex, now),
  }));
  const futureDeaths = f.parents.map((pa) => pa.death.est).filter((y) => y >= now - 1);
  if (futureDeaths.length) {
    const span = CAREGIVING_SPAN[disp];
    const earliest = Math.min(...futureDeaths);
    const latest = Math.max(...f.parents.map((pa) => pa.death.est));
    f.caregiving = {
      s: pt(earliest - span, earliest - span - 2, earliest - span + 2),
      e: pt(latest + (disp === 'high' ? 1 : 0), latest - 2, latest + 3),
    };
    // A caregiving-driven turn away from career tends to coincide with caregiving onset.
    f.roleShift = pt(f.caregiving.s.est, f.caregiving.s.est - 4, f.caregiving.s.est + 5);
  }
  return f;
}

/** Build + push an item, applying defaults. */
function add(ctx, it) {
  ctx.items.push({ conf: 0.5, addedBy: it.prov === 'recorded' ? 'onboarding' : it.prov, ...it });
}
const future = (ctx, y) => y >= ctx.now - 1;

/* ---------------- generators ---------------- */

function selfGen(ctx) {
  const { p, f } = ctx;
  add(ctx, { id: 'born', dom: 'self', kind: 'event', label: 'Born', at: pt(p.birthYear), prov: 'recorded', conf: 1, basis: 'Stated in profile.', source: SOURCES.profile });
  add(ctx, { id: 'childhood', dom: 'self', kind: 'phase', label: 'Childhood & education', s: pt(p.birthYear), e: pt(f.eduEnd), prov: 'recorded', conf: 1, basis: 'Birth year plus schooling to your stated level.', source: SOURCES.profile });
  add(ctx, { id: 'peakhealth', dom: 'self', kind: 'phase', label: 'Peak physical health', s: pt(f.eduEnd - 4), e: pt(f.peakHealthEnd, f.peakHealthEnd - 2, f.peakHealthEnd + 4), prov: 'data', conf: 0.8, basis: 'Physiological performance peaks in the 20s–30s, then eases.', source: 'Exercise-physiology norms' });
  add(ctx, { id: 'decline', dom: 'self', kind: 'phase', label: 'Gradual physiological decline', s: pt(f.peakHealthEnd, f.peakHealthEnd - 2, f.peakHealthEnd + 4), e: pt(f.illnessStart), prov: 'inferred', conf: 0.55, basis: 'Inferred continuation of age-related decline; not individualized.', source: SOURCES.heuristic });
  if (future(ctx, f.cvdYear))
    add(ctx, { id: 'cvd', dom: 'self', kind: 'event', label: 'Cardiovascular risk climbs', at: pt(f.cvdYear, f.cvdYear - 4, f.cvdYear + 6), prov: 'data', conf: 0.7, basis: `Cardiovascular risk climbs through the decade before the average first event (≈65 for men, ≈72 for women).`, source: SOURCES.cvd });
  add(ctx, { id: 'illness', dom: 'self', kind: 'phase', label: 'Age-linked illness risk', s: pt(f.illnessStart, f.illnessStart - 4, f.illnessStart + 3), e: pt(f.death.est), prov: 'data', conf: 0.6, basis: 'Age-specific morbidity curves.', source: SOURCES.morbidity });
  const adj = f.le.factors.length ? ` Adjusted ${f.le.factors.map((x) => `${x.delta > 0 ? '+' : ''}${x.delta} yr (${x.label})`).join(', ')} → age ${f.death.deathAge}.` : '';
  const deathSrc = f.le.factors.length ? `${SOURCES.lifeTable}; ${[...new Set(f.le.factors.map((x) => x.source))].join('; ')}` : SOURCES.lifeTable;
  add(ctx, { id: 'death', dom: 'self', kind: 'event', label: 'Life expectancy (est.)', at: f.death, prov: 'data', conf: 0.6, basis: `${SOURCES.lifeTable} for a ${p.sex} aged ${f.age}: about age ${f.baseDeathAge}.${adj}`, source: deathSrc });
  // deep-dive past events
  (p.pastEvents || []).forEach((ev, i) => add(ctx, {
    id: `selfpast${i}`, dom: 'self', kind: ev.kind === 'phase' ? 'phase' : 'event', label: ev.label,
    ...(ev.kind === 'phase' ? { s: pt(ev.year), e: pt(ev.endYear || ev.year + 1) } : { at: pt(ev.year) }),
    prov: 'recorded', conf: 1, addedBy: 'deep-dive', historical: true,
    sentiment: ev.sentiment != null ? S(ev.sentiment, sentLabel(ev.sentiment)) : undefined,
    basis: 'Added on a deep dive; not captured at onboarding.', source: SOURCES.deepDive,
  }));
}

function careerGen(ctx) {
  const { p, f } = ctx;
  add(ctx, { id: 'work', dom: 'career', kind: 'event', label: 'Enters workforce', at: pt(f.eduEnd), prov: 'recorded', conf: 1, basis: 'Education end plus typical entry age.', source: SOURCES.profile });
  add(ctx, { id: 'early', dom: 'career', kind: 'phase', label: 'Early career', s: pt(f.eduEnd), e: pt(f.eduEnd + 10), prov: 'recorded', conf: 1, basis: 'Observed history.', source: SOURCES.profile });
  add(ctx, { id: 'peakearn', dom: 'career', kind: 'phase', label: 'Peak earning years', s: pt(f.peakEarn.s, f.peakEarn.s - 2, f.peakEarn.s + 2), e: pt(f.peakEarn.e, f.peakEarn.e - 3, f.peakEarn.e + 5), prov: 'data', conf: 0.72, basis: 'Median earnings peak in the 45–54 age bracket.', source: SOURCES.income });
  if (f.roleShift)
    add(ctx, { id: 'plateau', dom: 'career', kind: 'event', label: 'Career role-shift', at: f.roleShift, prov: 'inferred', conf: 0.45, dispo: true, derived: ['caregiving'], basis: 'A deprioritization of career, often coinciding with eldercare.', source: 'Heuristic (derived)' });
  add(ctx, { id: 'retire', dom: 'career', kind: 'event', label: 'Retirement', at: f.retire, prov: 'data', conf: 0.6, basis: 'Median retirement age (people retire ≈62, expect ≈65), adjusted for your profession.', source: SOURCES.retirement });
  add(ctx, { id: 'encore', dom: 'career', kind: 'phase', label: 'Wind-down / encore work', s: f.retire, e: pt(f.retire.est + 6), prov: 'inferred', conf: 0.4, basis: 'Inferred partial-work tail after retirement.', source: SOURCES.heuristic });
}

function financesGen(ctx) {
  const { f } = ctx;
  if (f.kids.length)
    add(ctx, { id: 'college', dom: 'finances', kind: 'phase', label: "Children's college costs", s: pt(f.collegeStart, f.collegeStart - 2, f.collegeStart + 2), e: pt(f.collegeEnd, f.collegeEnd - 2, f.collegeEnd + 3), prov: 'inferred', conf: 0.5, derived: ['c0born'], basis: 'Derived from children reaching college age.', source: 'Heuristic (derived)' });
  add(ctx, { id: 'savings', dom: 'finances', kind: 'phase', label: 'Peak savings', s: pt(f.peakEarn.s + 8), e: f.retire, prov: 'inferred', conf: 0.45, basis: 'Inferred high-savings window between peak income and retirement.', source: SOURCES.heuristic });
  add(ctx, { id: 'drawdown', dom: 'finances', kind: 'phase', label: 'Retirement drawdown', s: f.retire, e: pt(f.death.est), prov: 'inferred', conf: 0.45, basis: 'Inferred decumulation after retirement.', source: SOURCES.heuristic });
}

function partnerGen(ctx) {
  const { p, f } = ctx;
  (p.pastRelationships || []).forEach((r, i) => add(ctx, {
    id: `rel${i}`, dom: 'partner', kind: 'phase', label: r.label || 'Past relationship',
    s: pt(r.birthYear || r.startYear), e: pt(r.endYear || (r.birthYear || r.startYear) + 2),
    prov: 'recorded', conf: 1, addedBy: 'deep-dive', historical: true,
    sentiment: r.sentiment != null ? S(r.sentiment, sentLabel(r.sentiment)) : undefined,
    basis: 'A past relationship, added on a deep dive.', source: SOURCES.deepDive,
  }));
  if (p.partner && p.partner.status !== 'single' && p.partner.since)
    add(ctx, { id: 'marriage', dom: 'partner', kind: 'event', label: p.partner.status === 'married' ? 'Marriage' : 'Partnership begins', at: pt(p.partner.since), prov: 'recorded', conf: 1, sentiment: S(2, 'positive'), basis: 'Stated in profile.', source: SOURCES.profile });
  if (f.kids.length) {
    add(ctx, { id: 'coparent', dom: 'partner', kind: 'phase', label: 'Co-parenting years', s: pt(f.parentingStart), e: pt(f.lastLeave, f.lastLeave - 2, f.lastLeave + 3), prov: 'data', conf: 0.75, basis: 'Bounded by children at home.', source: 'Derived from children' });
    add(ctx, { id: 'emptypartner', dom: 'partner', kind: 'phase', label: 'Empty-nest partnership', s: pt(f.lastLeave, f.lastLeave - 2, f.lastLeave + 3), e: pt(f.death.est), prov: 'inferred', conf: 0.5, dispo: true, derived: ['emptynest'], risk: ctx.disp === 'high', basis: 'Inferred relationship phase after children leave.', source: 'Heuristic (derived)' });
  }
}

function childrenGen(ctx) {
  const { f } = ctx;
  f.kids.forEach((k, i) => {
    add(ctx, { id: i === 0 ? 'c0born' : `c${i}born`, dom: 'children', kind: 'event', label: `Child ${i + 1} born`, at: pt(k.born), prov: 'recorded', conf: 1, sentiment: S(2, 'joy'), basis: 'Stated in profile.', source: SOURCES.profile });
    add(ctx, { id: `c${i}leave`, dom: 'children', kind: 'event', label: `Child ${i + 1} leaves home`, at: k.leave, prov: 'data', conf: 0.65, derived: [i === 0 ? 'c0born' : `c${i}born`], basis: 'Typical age of leaving home (~18–21).', source: SOURCES.leaveHome });
  });
  if (f.kids.length) {
    add(ctx, { id: 'parenting', dom: 'children', kind: 'phase', label: 'Children at home', s: pt(f.parentingStart), e: pt(f.lastLeave, f.lastLeave - 2, f.lastLeave + 3), prov: 'data', conf: 0.8, basis: 'From first birth to the youngest leaving home.', source: 'Derived from children' });
    add(ctx, { id: 'emptynest', dom: 'children', kind: 'phase', label: 'Empty nest', s: pt(f.lastLeave, f.lastLeave - 2, f.lastLeave + 3), e: pt(f.death.est), prov: 'inferred', conf: 0.45, basis: 'Inferred phase after the youngest leaves.', source: SOURCES.heuristic });
  }
}

function parentsGen(ctx) {
  const { f } = ctx;
  f.parents.forEach((pa, i) => {
    if (pa.alive === false && pa.diedYear)
      add(ctx, { id: `p${i}death`, dom: 'parents', kind: 'event', label: `Parent ${i + 1} died`, at: pt(pa.diedYear), prov: 'recorded', conf: 1, basis: 'Stated in profile.', source: SOURCES.profile });
    else
      add(ctx, { id: `p${i}death`, dom: 'parents', kind: 'event', label: `Parent ${i + 1} death (est.)`, at: pa.death, prov: 'data', conf: 0.6, basis: `Period life table from a ${pa.sex || 'parent'} born ${pa.birthYear}.`, source: SOURCES.lifeTable });
  });
  if (f.caregiving) {
    const deathIds = f.parents.map((_, i) => `p${i}death`);
    if (future(ctx, f.caregiving.s.est - 2))
      add(ctx, { id: 'pindep', dom: 'parents', kind: 'phase', label: 'Parents independent', s: pt(Math.max(ctx.now, f.caregiving.s.est - 10)), e: f.caregiving.s, prov: 'data', conf: 0.6, basis: 'Independent until later-life decline.', source: 'Derived from parent ages' });
    add(ctx, { id: 'pdecline', dom: 'parents', kind: 'phase', label: "Parents' decline", s: f.caregiving.s, e: f.caregiving.e, prov: 'inferred', conf: 0.5, basis: 'Inferred decline preceding end of life.', source: 'Heuristic (age)' });
    add(ctx, {
      id: 'caregiving', dom: 'parents', kind: 'phase', label: 'Eldercare / caregiving', s: f.caregiving.s, e: f.caregiving.e,
      prov: 'inferred', conf: 0.5, dispo: true, highlight: true, sentiment: S(-1, 'anticipated strain'),
      derived: deathIds, affects: ['plateau', 'emptypartner'],
      basis: "Active caregiving typically spans the final 5–10 years of a parent's life. Derived from the parental-mortality estimates; it pulls on career and partnership.",
      source: 'Heuristic (derived)',
    });
  }
}

/* ---------------- corpus-driven items ----------------
 * Render facts from the life-arc corpus as timeline items, dated from the profile.
 * Health-arc milestones show for everyone; heritable-risk windows are gated by family history.
 */
const m = (id, key, def) => { const f = getFact(id); return f && f.metric && f.metric[key] != null ? f.metric[key] : def; };
const fhHas = (p, c) => (p.familyHistory || []).includes(c);
function cxEvent(ctx, id, age, lo, hi, dom, label) {
  const f = getFact(id); if (!f || age == null) return;
  const b = ctx.p.birthYear;
  add(ctx, { id: `cx.${id}`, dom, kind: 'event', label, at: pt(b + Math.round(age), b + (lo ?? age), b + (hi ?? age)), prov: 'data', conf: f.confidence ?? 0.6, basis: f.statement, source: cite(id), addedBy: 'data' });
}
function cxPhase(ctx, id, startAge, endAge, dom, label) {
  const f = getFact(id); if (!f) return;
  const b = ctx.p.birthYear;
  add(ctx, { id: `cx.${id}`, dom, kind: 'phase', label, s: pt(b + startAge), e: pt(b + endAge), prov: 'inferred', conf: f.confidence ?? 0.5, basis: f.statement, source: cite(id), addedBy: 'inferred' });
}
function corpusGen(ctx) {
  const p = ctx.p, dAge = ctx.f.death.est - p.birthYear;
  // universal health-arc
  cxEvent(ctx, 'health.cancer.incidence', m('health.cancer.incidence', 'medianAge', 67), 58, 74, 'self', 'Median cancer-diagnosis age');
  cxPhase(ctx, 'health.dementia.onset', 65, dAge, 'self', 'Dementia risk rises');
  cxEvent(ctx, 'health.sensory.decline', m('health.sensory.decline', 'presbyopiaOnsetAge', 45), 42, 50, 'self', 'Near-vision decline (presbyopia)');
  cxPhase(ctx, 'health.mental.onset', m('health.mental.onset', 'ageLo', 11), m('health.mental.onset', 'ageHi', 34), 'self', 'Typical mental-health onset window');
  if (p.sex === 'female') {
    cxEvent(ctx, 'reproductive.menopause', m('reproductive.menopause', 'age', 52), 45, 55, 'self', 'Menopause');
    cxPhase(ctx, 'health.bone.peak', 52, dAge, 'self', 'Bone loss / osteoporosis risk');
  }
  // heritable-risk windows — gated by family history (cited relative risk in the basis)
  if (fhHas(p, 'heart disease')) cxPhase(ctx, 'heritability.heart-disease', 45, 75, 'self', 'Heart-disease risk · family history');
  if (fhHas(p, 'type 2 diabetes')) cxPhase(ctx, 'heritability.diabetes', 40, dAge, 'self', 'Diabetes risk · family history');
  if (fhHas(p, 'cancer') && p.sex === 'female') cxPhase(ctx, 'heritability.breast-cancer', 40, 70, 'self', 'Breast-cancer risk · family history');
  if (fhHas(p, 'cancer')) cxPhase(ctx, 'heritability.colorectal-cancer', 45, 75, 'self', 'Colorectal-cancer risk · family history');
  if (fhHas(p, 'dementia')) cxPhase(ctx, 'heritability.alzheimers', 65, dAge, 'self', 'Alzheimer’s risk · family history');
  if (fhHas(p, 'depression/anxiety')) cxPhase(ctx, 'heritability.depression', 20, dAge, 'self', 'Depression risk · family history');
}

/** Run all generators for a profile + caregiving propensity. @returns {import('../model.js').Item[]} */
export function run(profile, opts = {}) {
  const disp = opts.disposition || profile.disposition?.caregiving || 'med';
  const ctx = { p: profile, disp, now: opts.now ?? NOW, items: [], f: computeFacts(profile, disp, opts.now ?? NOW) };
  selfGen(ctx); childrenGen(ctx); parentsGen(ctx); careerGen(ctx); partnerGen(ctx); financesGen(ctx); corpusGen(ctx);
  // prune derived/affects links that point at items that weren't generated (sparse profiles)
  const ids = new Set(ctx.items.map((i) => i.id));
  ctx.items.forEach((i) => {
    if (i.derived) i.derived = i.derived.filter((x) => ids.has(x));
    if (i.affects) i.affects = i.affects.filter((x) => ids.has(x));
  });
  return ctx.items;
}

/** Compare two item sets by id; return the ids (and domains) whose position changed. */
export function diffItems(prev, next) {
  const key = (it) => (it.kind === 'event' ? `${it.at.est}` : `${it.s.est}-${it.e.est}-${it.risk ? 'r' : ''}`);
  const pm = Object.fromEntries(prev.map((i) => [i.id, i]));
  const changedItems = new Set(), changedDomains = new Set(), prevPos = {};
  for (const it of next) {
    const before = pm[it.id];
    if (before && key(before) !== key(it)) {
      changedItems.add(it.id); changedDomains.add(it.dom);
      prevPos[it.id] = before.kind === 'event' ? { at: before.at.est } : { s: before.s.est, e: before.e.est };
    }
  }
  return { changedItems, changedDomains, prevPos };
}

export function sentLabel(v) {
  return v >= 2 ? 'very positive' : v === 1 ? 'positive' : v === 0 ? 'neutral' : v === -1 ? 'hard' : 'very hard';
}
