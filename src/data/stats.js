// Other reference statistics + heuristics. Each entry notes whether it is grounded in
// published data ('data') or an inference ('inferred'), so the engine can label provenance.

/** Age at which cardiovascular risk meaningfully climbs, by sex. (data) */
export const CVD_ONSET_AGE = { male: 55, female: 62, other: 58 };

/** Typical retirement age (US average ~64–65). (data) */
export const RETIREMENT_AGE = { est: 65, lo: 62, hi: 68 };

/** Profession nudges to retirement age (years). Positive = later. (inferred) */
export const RETIRE_BY_PROFESSION = {
  'manual / trades': -2,
  'healthcare': 0,
  'education': -1,
  'knowledge work': 0,
  'business / finance': 1,
  'self-employed': 3,
  'public service': -2,
  'creative / arts': 2,
};

/** Age range of leaving the parental home. (data) */
export const LEAVE_HOME_AGE = { est: 19, lo: 18, hi: 22 };

/** College years, as ages. (data) */
export const COLLEGE_AGE = { start: 18, end: 22 };

/** Peak earning years, as ages, for typical careers. (data) */
export const PEAK_EARNING_AGE = { start: 35, end: 60 };

/** Caregiving span before each parent's death, in years, by caregiving propensity. (inferred) */
export const CAREGIVING_SPAN = { low: 4, med: 6, high: 9 };

/** How many years before retirement a caregiving-driven role-shift tends to land. (inferred) */
export const ROLE_SHIFT_LEAD = { low: 16, med: 19, high: 23 };

/** Readable description of where a number came from. */
export const SOURCES = {
  lifeTable: 'SSA-style period life table',
  cvd: 'CVD epidemiology (age-stratified)',
  retirement: 'US retirement-age statistics',
  leaveHome: 'Household-transition data',
  income: 'BLS income-by-age',
  heuristic: 'Heuristic',
  profile: 'Your profile',
  deepDive: 'You (deep dive)',
};
