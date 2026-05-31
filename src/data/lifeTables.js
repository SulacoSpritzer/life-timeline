// Mortality model, grounded in published data.
//
// Base curve: SSA period life table (e(x) = expected remaining years at exact age x),
// the table used for actuarial valuation. Real values, not approximations.
//   Source: U.S. Social Security Administration, Period Life Table.
// Risk-factor adjustments to life expectancy:
//   • Current smoking: −10 yrs   — Jha et al., "21st-Century Hazards of Smoking", NEJM 2013.
//   • Education gradient          — IHME / Lancet Public Health 2024 (college ≈84, HS ≈77, <HS ≈73.5).

import { clampYear } from '../model.js';

/** e(x): expected remaining years of life at exact age x, by sex (SSA period life table). */
const EX = {
  male:   { 0:75.90, 10:66.30, 20:56.83, 30:47.52, 40:38.23, 50:29.35, 60:21.27, 65:17.51, 70:14.03, 75:10.87, 80:8.10, 85:5.80, 90:4.02, 95:2.90, 100:2.20 },
  female: { 0:80.81, 10:71.15, 20:61.53, 30:51.82, 40:42.24, 50:33.02, 60:24.30, 65:20.19, 70:16.33, 75:12.79, 80:9.65, 85:6.95, 90:4.85, 95:3.40, 100:2.50 },
};

/** Life-expectancy adjustments, in years, from factors we actually collect. */
const EDU_DELTA = { graduate: 6, college: 5, high: -1 };
const SMOKER_DELTA = -10;

export const MORTALITY_SOURCE = 'SSA period life table';

function interp(table, age) {
  const ks = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (age <= ks[0]) return table[ks[0]];
  if (age >= ks[ks.length - 1]) return table[ks[ks.length - 1]];
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i], b = ks[i + 1];
    if (age >= a && age <= b) return table[a] + ((age - a) / (b - a)) * (table[b] - table[a]);
  }
  return table[ks[ks.length - 1]];
}

/** Expected additional years of life at a given age (SSA period life table). */
export function ex(age, sex) {
  return interp(EX[sex] || EX.male, Math.max(0, age));
}

/**
 * Life-expectancy delta (years) implied by a profile's risk factors, with provenance.
 * @returns {{years:number, factors:{label:string, delta:number, source:string}[]}}
 */
export function lifeExpectancyDelta(p) {
  const factors = [];
  if (p?.health?.smoker) factors.push({ label: 'current smoking', delta: SMOKER_DELTA, source: 'Jha et al., NEJM 2013' });
  const ed = EDU_DELTA[p?.education];
  if (ed) factors.push({ label: `${p.education === 'high' ? 'high-school' : p.education} education`, delta: ed, source: 'IHME / Lancet 2024' });
  return { years: factors.reduce((s, f) => s + f.delta, 0), factors };
}

/**
 * Estimate calendar year of death from birth year + sex, conditioned on surviving to now,
 * with an optional life-expectancy delta (years) from risk factors.
 * @returns {{est:number, lo:number, hi:number, deathAge:number}}
 */
export function deathYearEst(birthYear, sex, now, delta = 0) {
  const age = Math.max(0, now - birthYear);
  const e = ex(age, sex);
  let deathAge = age + e + delta;
  if (deathAge < age + 1) deathAge = age + 1; // can't die before now
  const spread = Math.max(5, Math.min(14, e * 0.45));
  return {
    est: clampYear(birthYear + Math.round(deathAge)),
    lo: clampYear(birthYear + Math.round(deathAge - spread * 0.8)),
    hi: clampYear(birthYear + Math.round(deathAge + spread)),
    deathAge: Math.round(deathAge),
  };
}
