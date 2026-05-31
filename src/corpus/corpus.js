// ─────────────────────────────────────────────────────────────────────────────
// LIFE-ARC CORPUS
// A citable, machine-readable knowledge base of "what statistically happens across
// a life — to whom, and when." Generators query this instead of hardcoding numbers,
// so the timeline is grounded and every estimate traces to a published source.
//
// This is the seed. It is meant to grow into a deep, broad corpus (see CORPUS.md).
// Each Fact is structured so it can be pulled apart, conditioned, and cited.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Source
 * @property {string} org    publishing body, e.g. "NIH / NIA", "CDC NCHS", "SSA"
 * @property {string} title
 * @property {number} year
 * @property {string} [url]
 *
 * @typedef {Object} Fact
 * @property {string} id                 stable id, e.g. "health.muscle.peak"
 * @property {string} domain             timeline domain it informs: self|career|finances|partner|children|parents
 * @property {string} topic              short topic label, e.g. "Muscle mass"
 * @property {'milestone'|'phase'|'rate'|'risk'|'gradient'|'distribution'} kind
 * @property {string} statement          plain-language statement
 * @property {Object} metric             structured numbers (ages, years, %, deltas…) the engine can use
 * @property {Object} [conditioning]     who/what it applies to: {sex?, education?, smoker?, region?…}
 * @property {'data'|'inferred'} provenance
 * @property {number} confidence         0..1
 * @property {Source} source
 * @property {string[]} [tags]
 */

/** @type {Fact[]} */
export const FACTS = [
  // ── MORTALITY (self) ──────────────────────────────────────────────────────
  {
    id: 'mortality.life-table', domain: 'self', topic: 'Life expectancy', kind: 'distribution',
    statement: 'Expected remaining years of life by exact age and sex (period life table).',
    metric: { kind: 'e(x)', note: 'see lifeTables.js EX table' },
    conditioning: { sex: ['male', 'female'] },
    provenance: 'data', confidence: 0.9,
    source: { org: 'SSA', title: 'Period Life Table', year: 2021, url: 'https://www.ssa.gov/oact/STATS/table4c6.html' },
    tags: ['mortality', 'anchor'],
  },
  {
    id: 'mortality.smoking', domain: 'self', topic: 'Smoking', kind: 'gradient',
    statement: 'Current smokers lose more than 10 years of life expectancy vs never-smokers; quitting before 40 avoids ~90% of the excess risk.',
    metric: { deltaYears: -10, quitBefore40RecoversPct: 90 },
    conditioning: { smoker: true },
    provenance: 'data', confidence: 0.85,
    source: { org: 'NEJM', title: 'Jha et al., 21st-Century Hazards of Smoking and Benefits of Cessation', year: 2013, url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa1211128' },
    tags: ['mortality', 'risk-factor'],
  },
  {
    id: 'mortality.education', domain: 'self', topic: 'Education gradient', kind: 'gradient',
    statement: 'Life expectancy at birth ~84 for college graduates, ~77 for high-school graduates, ~73.5 for those without a high-school diploma.',
    metric: { collegeLE: 84.2, hsLE: 77.3, noHsLE: 73.5, gradDelta: 6, collegeDelta: 5, hsDelta: -1 },
    conditioning: { education: ['high', 'college', 'graduate'] },
    provenance: 'data', confidence: 0.8,
    source: { org: 'IHME / Lancet Public Health', title: 'Life expectancy by county and educational attainment, 2000–19', year: 2024, url: 'https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(24)00303-7/fulltext' },
    tags: ['mortality', 'risk-factor', 'socioeconomic'],
  },
  {
    id: 'health.disability-free.65', domain: 'self', topic: 'Healthy life expectancy', kind: 'milestone',
    statement: 'At age 65, about 10.7 of remaining years are disability-free; women have higher healthy life expectancy than men.',
    metric: { atAge: 65, disabilityFreeYears: 10.7 },
    provenance: 'data', confidence: 0.7,
    source: { org: 'CDC / NCHS', title: 'Healthy Life Expectancy / disability-free trends', year: 2016, url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6228a1.htm' },
    tags: ['aging', 'morbidity'],
  },

  // ── BODY & HEALTH ARC (self) ──────────────────────────────────────────────
  {
    id: 'health.muscle.peak', domain: 'self', topic: 'Muscle mass', kind: 'milestone',
    statement: 'Muscle mass and strength rise from birth and peak around age 30–35 (BLSA).',
    metric: { age: 32, ageLo: 30, ageHi: 35 },
    provenance: 'data', confidence: 0.8,
    source: { org: 'NIH / NIA', title: 'Baltimore Longitudinal Study of Aging; NIH News in Health "Slowing Sarcopenia"', year: 2025, url: 'https://newsinhealth.nih.gov/2025/04/slowing-sarcopenia' },
    tags: ['aging', 'fitness'],
  },
  {
    id: 'health.muscle.decline', domain: 'self', topic: 'Muscle mass', kind: 'rate',
    statement: 'After ~30, muscle mass declines ~3–5% per decade; decline accelerates after ~65 (women) / ~70 (men). ~30% loss from age 20 to 80.',
    metric: { startAge: 30, perDecadePctLo: 3, perDecadePctHi: 5, accelAfter: { female: 65, male: 70 }, lifetimeLossPct: 30 },
    provenance: 'data', confidence: 0.8,
    source: { org: 'NIH / NIA', title: 'NIH News in Health "Slowing Sarcopenia"', year: 2025, url: 'https://newsinhealth.nih.gov/2025/04/slowing-sarcopenia' },
    tags: ['aging', 'fitness'],
  },
  {
    id: 'health.cvd.first-event', domain: 'self', topic: 'Cardiovascular', kind: 'risk',
    statement: 'Average age of first cardiovascular event ~65.5 (men), ~72 (women); risk climbs through the prior decade.',
    metric: { firstEventAge: { male: 65.5, female: 72 }, riskClimbsFromAge: { male: 55, female: 65 } },
    conditioning: { sex: ['male', 'female'] },
    provenance: 'data', confidence: 0.75,
    source: { org: 'AHA', title: 'Heart Disease & Stroke Statistics', year: 2024, url: 'https://www.heart.org/' },
    tags: ['risk', 'cardiovascular'],
  },
  {
    id: 'reproductive.menopause', domain: 'self', topic: 'Menopause', kind: 'milestone',
    statement: 'Average age of menopause ~52; perimenopause begins in the mid-40s, ~4 years before the final period.',
    metric: { age: 52, ageLo: 45, ageHi: 55, perimenoLeadYears: 4 },
    conditioning: { sex: 'female' },
    provenance: 'data', confidence: 0.85,
    source: { org: 'NIH / NIA', title: 'What Is Menopause?', year: 2024, url: 'https://www.nia.nih.gov/health/menopause/what-menopause' },
    tags: ['reproductive', 'aging'],
  },

  // ── COGNITION (self / career) ─────────────────────────────────────────────
  {
    id: 'cognition.processing-speed.peak', domain: 'self', topic: 'Cognition', kind: 'milestone',
    statement: 'Raw processing speed peaks in the late teens / early 20s, then declines.',
    metric: { age: 20, ageLo: 18, ageHi: 22 },
    provenance: 'data', confidence: 0.7,
    source: { org: 'Psychological Science (Hartshorne & Germine)', title: 'When Does Cognitive Functioning Peak?', year: 2015, url: 'https://news.mit.edu/2015/brain-peaks-at-different-ages-0306' },
    tags: ['cognition'],
  },
  {
    id: 'cognition.crystallized.peak', domain: 'self', topic: 'Cognition', kind: 'milestone',
    statement: 'Crystallized knowledge / vocabulary keeps rising and peaks in the 60s–70s; emotion-reading peaks in the 40s–50s; short-term memory peaks ~25.',
    metric: { vocabPeakLo: 60, vocabPeakHi: 70, emotionReadingPeakLo: 40, emotionReadingPeakHi: 50, shortTermMemoryPeak: 25 },
    provenance: 'data', confidence: 0.7,
    source: { org: 'Psychological Science (Hartshorne & Germine)', title: 'When Does Cognitive Functioning Peak?', year: 2015, url: 'https://news.mit.edu/2015/brain-peaks-at-different-ages-0306' },
    tags: ['cognition'],
  },

  // ── CAREER & FINANCES ─────────────────────────────────────────────────────
  {
    id: 'career.peak-earnings', domain: 'career', topic: 'Earnings', kind: 'phase',
    statement: 'Median earnings peak in the 45–54 age bracket, then taper.',
    metric: { peakAgeLo: 45, peakAgeHi: 54, riseFrom: 35, taperFrom: 55 },
    provenance: 'data', confidence: 0.8,
    source: { org: 'BLS', title: 'Usual weekly earnings of wage and salary workers by age', year: 2025, url: 'https://www.bls.gov/charts/usual-weekly-earnings/usual-weekly-earnings-current-quarter-by-age.htm' },
    tags: ['income'],
  },
  {
    id: 'career.retirement', domain: 'career', topic: 'Retirement', kind: 'milestone',
    statement: 'Workers retire at a median age of ~62, though they expect to retire at ~65.',
    metric: { actualMedian: 62, expectedMedian: 65, lo: 60, hi: 67 },
    provenance: 'data', confidence: 0.8,
    source: { org: 'EBRI', title: 'Retirement Confidence Survey', year: 2024, url: 'https://www.ebri.org/retirement/retirement-confidence-survey' },
    tags: ['retirement'],
  },

  // ── FAMILY (children / partner / parents) ─────────────────────────────────
  {
    id: 'family.first-birth', domain: 'children', topic: 'First birth', kind: 'milestone',
    statement: 'Mean age of mothers at first birth ~27.5 (2023), higher (~28.5) in large metros, rising over time.',
    metric: { meanAge: 27.5, metroMeanAge: 28.5 },
    provenance: 'data', confidence: 0.85,
    source: { org: 'CDC / NCHS NVSS', title: 'Trends in Mean Age of Mothers, US 2016–2023 (NVSR 74-09)', year: 2025, url: 'https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-09.pdf' },
    tags: ['family', 'fertility'],
  },
  {
    id: 'family.leave-home', domain: 'children', topic: 'Leaving home', kind: 'milestone',
    statement: 'Young adults leave the parental home around a median age of ~19–20, increasingly into the mid-20s.',
    metric: { age: 20, ageLo: 18, ageHi: 26 },
    provenance: 'data', confidence: 0.7,
    source: { org: 'U.S. Census Bureau / BLS', title: 'Living arrangements of young adults; NLSY home-leaving', year: 2025, url: 'https://www.census.gov/library/stories/2025/08/milestones-to-adulthood.html' },
    tags: ['family', 'transition'],
  },
];

// ── query helpers ───────────────────────────────────────────────────────────
const BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f]));

/** Get a fact by id. */
export const getFact = (id) => BY_ID[id];

/** All facts informing a timeline domain. */
export const factsForDomain = (domain) => FACTS.filter((f) => f.domain === domain);

/** All facts tagged with a label. */
export const factsByTag = (tag) => FACTS.filter((f) => (f.tags || []).includes(tag));

/** Render a fact's source as a short citation string for the UI. */
export const cite = (id) => { const f = BY_ID[id]; return f ? `${f.source.org}, ${f.source.title} (${f.source.year})` : id; };

/** Coverage snapshot — how many facts per domain (for tracking corpus growth). */
export const coverage = () => FACTS.reduce((m, f) => ((m[f.domain] = (m[f.domain] || 0) + 1), m), {});
