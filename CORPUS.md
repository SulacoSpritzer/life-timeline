# Life-Arc Corpus

A citable, machine-readable knowledge base of **what statistically happens across a life — to
whom, and when.** It sits underneath the engine: generators query grounded *facts* instead of
hardcoding numbers, so every item on the timeline traces to a published source.

Lives in [`src/corpus/corpus.js`](src/corpus/corpus.js).

## What a fact looks like

```js
{
  id: 'health.muscle.peak',
  domain: 'self',                 // timeline domain it informs
  topic: 'Muscle mass',
  kind: 'milestone',              // milestone | phase | rate | risk | gradient | distribution
  statement: 'Muscle mass and strength peak around age 30–35.',
  metric: { age: 32, ageLo: 30, ageHi: 35 },   // structured numbers the engine uses
  conditioning: { sex: 'female' },             // who/what it applies to (optional)
  provenance: 'data',             // data | inferred
  confidence: 0.8,                // 0..1
  source: { org: 'NIH / NIA', title: '…', year: 2025, url: '…' },
}
```

Query helpers: `getFact(id)`, `factsForDomain(domain)`, `factsByTag(tag)`, `cite(id)`, `coverage()`.

## Source policy

- Prefer authoritative bodies: **NIH/NIA, CDC/NCHS, SSA, BLS, U.S. Census, AHA**, and
  peer-reviewed studies (NEJM, Lancet, etc.).
- Every fact carries a citation and a `provenance` of `data` (grounded) or `inferred` (heuristic),
  plus a `confidence`. Nothing enters as fact without a source.
- US-centric for v1; `conditioning` is the hook for sex / education / region / behavior strata,
  and later for other countries.

## Coverage

**~42 cited facts** across all six domains, in two layers:

- **Seed** ([`corpus.js`](src/corpus/corpus.js)) — 14 hand-curated anchors (life table, smoking,
  education, muscle, menopause, cognition, peak earnings, retirement, first birth, leaving home…).
- **Researched** ([`facts-researched.js`](src/corpus/facts-researched.js)) — built by an orchestrated
  research workflow: each topic was researched, then **independently verified against its cited source**
  (the verifier caught and fixed real errors — e.g. a mislabeled NHANES series, and that the
  lowest-life-expectancy state is West Virginia, not Mississippi), then emitted as a structured fact.
  Covers cancer / dementia / mental-health onset, the income–life-expectancy gap (14.6 yr for men),
  state-level variation, disability, sensory decline, bone loss, job tenure, divorce / marriage /
  widowhood, fertility, grandparenthood, caregiving, inheritance, and more.

Sources include NIH/NIA, NCI SEER, CDC/NCHS, SSA, BLS, U.S. Census, Federal Reserve, AHA, EBRI,
AARP/NAC, NEJM, JAMA, Lancet/IHME, Molecular Psychiatry, Alzheimer's Association.

## Build-out matrix (the research roadmap)

Fill **domain × life-stage × stratifier**. Target topics:

| Domain | Topics still to ground |
|---|---|
| Self & Health | major-disease onset curves (cancer, diabetes, dementia incidence by age), mental-health onset (median age of first onset ~14, peaks), disability onset, sensory decline, sleep, BMI/metabolic arc, mortality by region/income (Chetty) |
| Career | entry age by education, job tenure / number of jobs, promotion/peak-title timing, unemployment spells, income trajectory shape, encore/second-career rates |
| Finances | homeownership age, mortgage payoff, net-worth-by-age curve, peak-saving window, college cost timing, retirement-savings adequacy, debt arc |
| Partner | median age first marriage (M/F), cohabitation, divorce probability & timing, remarriage, widowhood age by sex |
| Children | births by age, number of children, spacing, empty-nest timing, grandparenthood age, sandwich-generation overlap |
| Parents | parental mortality (from their birth years), caregiving prevalence & duration, inheritance timing |

For each: value + range, the stratifiers it varies by, a real source, provenance, and confidence.

## Roadmap

1. **Grow the corpus** — research fan-out across the matrix above (this is the big lift).
2. **Wire the engine to it** — generators read facts by id and apply `conditioning` from the profile,
   replacing the remaining hardcoded constants.
3. **Map onboarding → conditioning** — so each input selects the right stratified facts.
