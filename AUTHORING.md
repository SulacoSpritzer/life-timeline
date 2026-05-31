# Authoring the corpus — one fact in, two places out

This explains how to add anything to Life Timeline so that, **systemically**, adding it once makes it
appear in the right place in onboarding *and* as an element on the timeline (the left-hand domains).

You never edit the onboarding form or the timeline by hand to add a life event. You add a **Fact** to
the corpus, and the system derives the rest from it.

---

## The unit: a Fact

Everything is a `Fact` — one cited, structured record in the corpus
([`src/corpus/`](src/corpus/corpus.js)). A fact says *what statistically happens, to whom, when, and
on whose authority.* Two kinds of metadata on it drive two destinations automatically:

```
                         ┌──────────────────────────────────────┐
                         │                FACT                   │
                         │  metric · conditioning · requires ·   │
                         │  emit · source · provenance · conf.   │
                         └───────────────┬──────────────────────┘
                  requires/conditioning  │  emit
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                                ▼
        ┌─────────────────┐                            ┌────────────────────┐
        │   ONBOARDING     │                            │     TIMELINE        │
        │ asks for the     │                            │ renders an item in  │
        │ inputs the fact  │                            │ its domain (left),  │
        │ needs / strata   │                            │ dated from metric + │
        └─────────────────┘                            │ profile, with cite  │
                                                        └────────────────────┘
```

- **`requires` + `conditioning`** → tell onboarding which inputs must exist. Add a fact that requires
  `smoker`, and onboarding is guaranteed to ask about smoking. Nothing else to wire.
- **`emit`** → tells the engine how to turn the population statistic into *this person's* dated item,
  and which domain it lands in on the left.
- **`source` / `provenance` / `confidence`** → flow straight into the item's tooltip and detail panel.

---

## Anatomy of a Fact

| Field | Drives | Meaning |
|---|---|---|
| `id` | — | stable key, `domain.topic`, e.g. `partner.widowhood-age` |
| `domain` | timeline row | `self · career · finances · partner · children · parents` |
| `topic` | label/grouping | short human label |
| `kind` | rendering | `milestone · phase · rate · risk · gradient · distribution` |
| `statement` | docs/tooltip | one plain sentence with the number(s) |
| `metric` | timeline dates | the numbers (ages, years, %). Ages here become personal dates. |
| `conditioning` | onboarding + selection | who/what it applies to: `sex`, `education`, `region`, … |
| **`requires`** | **onboarding** | profile inputs this fact needs, e.g. `['birthYear','sex','partner']` |
| **`emit`** | **timeline** | how the fact becomes a dated item (see below). Omit ⇒ background fact. |
| `provenance` | styling | `data` (grounded) or `inferred` (heuristic) |
| `confidence` | confidence meter | 0..1 |
| `source` | citation | `{ org, title, year, url }` — shown in the detail panel |
| `note` | detail | verifier corrections / caveats |
| `tags` | search | freeform |

---

## The `emit` contract — population stat → personal dated item

`emit` is the bridge from "what happens on average" to "what goes on *your* timeline." The engine reads
ages out of `metric` and adds `profile.birthYear` to place them in calendar time.

```js
// EVENT — a moment. event year = birthYear + metric[atAge]
emit: { as:'event', label:'Menopause', appliesIf:{ sex:'female' },
        atAge:'age', loAge:'ageLo', hiAge:'ageHi' }            // keys into metric

// PHASE — a span. from birthYear+startAge to birthYear+endAge
emit: { as:'phase', label:'Osteoporosis risk', appliesIf:{ sex:'female' },
        startAge:'onsetAge', endAge:'metric.death' }

// RELATIVE — anchored to another item, not to an absolute age (second-order)
emit: { as:'event', label:'Empty-nest adjustment', domain:'self',
        relativeTo:{ factId:'children.leave-home', offsetYears:0 },
        derivedFrom:['children.leave-home'] }

// RECURRING — a series across the lifespan (e.g. recessions ~ every N years)
emit: { as:'event', label:'Economic downturn', recurEveryYears:'meanIntervalYears' }

// NONE — a fact that only conditions other facts and renders nothing itself
emit: { as:'none' }
```

Optional on any `emit`:
- `appliesIf` — gate by `conditioning` (e.g. female-only). If it fails for a profile, nothing renders.
- `domain` — override the row (defaults to `fact.domain`).
- `sentiment` — a default feeling for the item.
- `derivedFrom` / `affects` — cross-links that produce the ✦ "derived from / affects" lines and the
  cross-domain ripple.

---

## How to add one thing (the recipe)

1. **Pick** a `domain` + `topic`; give it an `id` (`domain.topic`).
2. **Get the number** — research it and cite a real source, or queue it into the research workflow
   (which researches → independently verifies → emits the structured fact). See `CORPUS.md`.
3. **Fill `metric`** with numeric keys (`age`, `ageLo`, `ageHi`, `onsetAge`, `perDecadePct`,
   `meanIntervalYears`, …).
4. **Declare `requires`** — the profile inputs it needs. This is what guarantees onboarding asks.
5. **Add `emit`** — how it renders (event/phase/relative/recurring) and in which domain.
6. **Drop it in** — append to the seed array, or let the assembler regenerate `facts-researched.js`.

That's the whole act. Onboarding picks it up because of `requires`; the timeline picks it up because of
`emit`; the citation rides along in `source`.

---

## Worked example — "Death of a spouse"

```js
{
  id: 'partner.widowhood',
  domain: 'partner',
  topic: 'Widowhood',
  kind: 'risk',
  statement: 'Women are widowed at an average age of ~59 and far more often than men; widowhood is a major depression risk.',
  metric: { avgAge: 59, ageLo: 55, ageHi: 70, bySex: { female: 59, male: 65 } },
  conditioning: { sex: ['male','female'], partnered: true },
  requires: ['birthYear', 'sex', 'partner'],
  emit: {
    as: 'event', label: 'Possible loss of spouse', appliesIf: { partnered: true },
    atAge: 'avgAge', loAge: 'ageLo', hiAge: 'ageHi', sentiment: -2,
    affects: ['self.depression-risk'],
  },
  provenance: 'data', confidence: 0.7,
  source: { org: 'U.S. Census Bureau (ACS)', title: 'Marital events of Americans', year: 2024, url: 'https://…' },
}
```

Adding only this:
- **Onboarding** is guaranteed to ask birth year, sex, and partner status (`requires`).
- **Timeline** shows a *Partner*-row event "Possible loss of spouse" at `birthYear + 59` (range 55–70),
  female-conditioned, sentiment-flagged, with the Census citation in its tooltip — and, via `affects`,
  it nudges a depression-risk item in *Self*.

---

## Your backlog, expressed as facts

The things you flagged are all just facts with the right `emit`. This is how each one slots in:

| Want | id | domain | kind | emit shape |
|---|---|---|---|---|
| Death of a spouse | `partner.widowhood` | partner | risk | event @ avg widowhood age |
| Retirement depression | `self.retirement-depression` | self | risk | **relative** to `career.retirement` (offset 0–2 yr) |
| Empty-nest depression | `self.emptynest-adjustment` | self | risk | **relative** to youngest child leaving |
| First job loss | `career.first-job-loss` | career | risk | event in early career (probability-weighted) |
| Recessions (regular clip) | `macro.recession` | finances | distribution | **recurring** ~ every 6–8 yr (NBER) |
| Perimenopause → menopause | `self.perimenopause` / `reproductive.menopause` | self | phase → milestone | phase ~age 45→52 (female), then event |
| Osteoporosis onset | `self.osteoporosis` | self | risk | phase from post-menopause onset (female) |
| Osteoarthritis onset | `self.osteoarthritis` | self | risk | phase from ~age 50, rising |

Each is one row, researched + cited + verified, and it appears in both places automatically.

---

## Quality rules (non-negotiable)

- Every fact has a real `source`. `provenance:'data'` only if grounded; otherwise `'inferred'` and say
  so. A `confidence` on everything.
- Numbers are verified independently of whoever found them (the workflow's verify stage, or a second
  pass) before a fact is trusted.
- US-centric for now; `conditioning` is the hook for other strata and countries later.

---

## Current state vs. target (honest)

The corpus and this schema are live. The piece that makes the flow above **literal** — the engine
reading `requires`/`emit` instead of its current hardcoded constants, and onboarding generating itself
from `requires` — is the **one pending integration**. Until that's wired, "appears automatically" means
the contract is defined and mechanical to apply, not that the running app already does it. Wiring it is
the next step, and after it, authoring is exactly the one-row act described here.

## Where things live

```
src/corpus/corpus.js            schema (Fact typedef) + seed facts + read API + merge
src/corpus/facts-researched.js  workflow-researched facts (assembled, regenerable)
CORPUS.md                       what the corpus is, coverage, source policy
AUTHORING.md                    this file — how to add, and how it propagates
```
