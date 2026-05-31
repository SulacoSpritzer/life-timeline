// Reference statistics + heuristics, grounded in published data where possible.
// Each value notes whether it's data-backed or an inference, and its source string is
// surfaced in the app's "Source" field so estimates are traceable / falsifiable.

/** Age at which cardiovascular risk meaningfully climbs (decade before avg first event:
 *  ≈65.5 men, ≈72 women). Source: AHA Heart Disease & Stroke Statistics. (data) */
export const CVD_ONSET_AGE = { male: 55, female: 65, other: 60 };

/** Retirement age — median actual ≈62, expected ≈65. Source: EBRI RCS 2024. (data) */
export const RETIREMENT_AGE = { est: 63, lo: 60, hi: 67 };

/** Profession nudges to retirement age (years). Positive = later. (inferred) */
export const RETIRE_BY_PROFESSION = {
  'manual / trades': -2, 'healthcare': 0, 'education': -1, 'knowledge work': 0,
  'business / finance': 1, 'self-employed': 3, 'public service': -2, 'creative / arts': 2,
};

/** Age of leaving the parental home — median ≈19–20, trending into the mid-20s.
 *  Source: U.S. Census Bureau / BLS (NLSY). (data) */
export const LEAVE_HOME_AGE = { est: 20, lo: 18, hi: 26 };

/** College years, as ages. (data) */
export const COLLEGE_AGE = { start: 18, end: 22 };

/** Peak earning years — earnings peak in the 45–54 bracket. Source: BLS usual weekly
 *  earnings by age. (data) */
export const PEAK_EARNING_AGE = { start: 35, peakStart: 45, peakEnd: 54, end: 58 };

/** Caregiving span before each parent's death, in years, by intensity. (inferred) */
export const CAREGIVING_SPAN = { low: 4, med: 6, high: 9 };

/** Readable source citations, shown in the app. */
export const SOURCES = {
  lifeTable: 'SSA period life table',
  cvd: 'AHA Heart Disease & Stroke Statistics',
  retirement: 'EBRI Retirement Confidence Survey 2024',
  leaveHome: 'U.S. Census Bureau / BLS',
  income: 'BLS usual weekly earnings by age',
  morbidity: 'Population morbidity data',
  heuristic: 'Heuristic',
  profile: 'Your profile',
  deepDive: 'You (deep dive)',
};
