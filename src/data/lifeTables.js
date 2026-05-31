// Simplified period life-expectancy data (US-style), used where we have real grounding.
// e(x) = expected additional years of life at exact age x. Values are illustrative
// approximations of SSA period life tables — close enough for a PoC, easy to replace
// with a fuller published table behind this same interface.

import { clampYear } from '../model.js';

/** Remaining-life-expectancy curves, e(x), by sex. */
const EX = {
  male:   { 0:75.8, 20:56.8, 30:47.4, 40:38.1, 50:29.3, 60:21.4, 65:17.8, 70:14.4, 75:11.3, 80:8.6, 85:6.3, 90:4.5, 95:3.2 },
  female: { 0:80.8, 20:61.6, 30:51.9, 40:42.3, 50:33.0, 60:24.5, 65:20.5, 70:16.6, 75:13.0, 80:9.9, 85:7.2, 90:5.1, 95:3.6 },
};

/** Linear interpolation over an {age:value} table. */
function interp(table, age) {
  const ks = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (age <= ks[0]) return table[ks[0]];
  if (age >= ks[ks.length - 1]) return table[ks[ks.length - 1]];
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i], b = ks[i + 1];
    if (age >= a && age <= b) {
      const t = (age - a) / (b - a);
      return table[a] + t * (table[b] - table[a]);
    }
  }
  return table[ks[ks.length - 1]];
}

/** Expected additional years of life at a given age. */
export function ex(age, sex) {
  const table = EX[sex] || EX.male;
  return interp(table, Math.max(0, age));
}

/**
 * Estimate the calendar year of death from a birth year + sex, conditioned on
 * surviving to the present. Returns a Pt (central estimate + uncertainty range).
 * @returns {{est:number, lo:number, hi:number}}
 */
export function deathYearEst(birthYear, sex, now) {
  const age = Math.max(0, now - birthYear);
  const e = ex(age, sex);
  const deathAge = age + e;
  const spread = Math.max(5, Math.min(14, e * 0.45));
  return {
    est: clampYear(birthYear + Math.round(deathAge)),
    lo: clampYear(birthYear + Math.round(deathAge - spread * 0.8)),
    hi: clampYear(birthYear + Math.round(deathAge + spread)),
  };
}
