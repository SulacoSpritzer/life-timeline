# Life Timeline — Project Brief

## Context

People treat their life as open-ended and unbounded, which leaves them psychologically
unprepared for predictable transitions — a parent's decline, the end of peak career years,
the onset of age-linked health risk. Yet most of these transitions are statistically
forecastable from a handful of facts. **Life Timeline** reframes a life as a Gantt chart:
a finite span with overlapping phases and dated events, generated from your profile and
grounded in accepted science, so you can prepare instead of being caught off guard.

The goal is **not** to predict your life precisely. It is to give you a *falsifiable,
evidence-based* picture clear enough to plan against — and honest enough to tell you which
parts are data and which are inference.

---

## What it is (one line)

A web app that turns a personal profile into a Gantt-style timeline of your probable life
phases and events, with every item sourced, dated (as a range), and labeled by confidence.

---

## Core concept

- **Input:** concrete facts — birth year, sex, birth/current location, profession,
  education, health history, and family structure (partner, children's ages, parents'
  birth years and status, siblings).
- **Engine:** a library of generators converts those facts into dated life events and
  multi-year phases, including **second-order consequences**.
- **Output:** a horizontal timeline (birth → life-expectancy tail) with a "now" line,
  organized into life domains, where each bar/marker is inspectable, sourced, and
  user-correctable.

**Worked example (the kind of output we want):**
A middle-class person raised in the US Midwest, parents 25–30 years older →
life tables put parental death around the subject's **mid-50s** → the engine derives a
**caregiving phase** in the 5–10 years prior, during which career orientation typically
shifts toward eldercare. The timeline shows the death estimate *and* the caregiving window
it implies — derived by the model, not hardcoded.

---

## Design principles (these are the product, not polish)

1. **Falsifiable.** Every item exposes its basis (rule, source, and the profile facts it
   used). A user can disagree, correct an assumption, and watch the timeline update.
2. **Honest uncertainty.** Ranges, not false precision. A clear, persistent visual
   distinction between **data-backed** and **inferred** items.
3. **Plan-enabling, not fatalistic.** Framing points toward agency and preparation. The
   subject (including mortality) is handled with deliberate tone and opt-outs.
4. **Future-proofed data layer.** Built so any inferred generator can be swapped for a
   published-dataset lookup later with no change to the rest of the system.
5. **Privacy by default (v1).** Health and family data is sensitive; v1 stores the profile
   **locally** (no account, no server persistence) to keep the trust bar low.

---

## What needs to be built (v1)

### A. Profile capture / onboarding
- Low-friction, multi-step form; **progressive** — produces a timeline from sparse input
  and sharpens as more is added.
- Fields: birth year, sex, birth country/region, current location, profession, education,
  key health facts (smoking, major conditions, family medical history), family structure
  (partner, children + ages, each parent's birth year + alive/deceased, siblings).
- Every field is optional except birth year + sex; the UI shows what each new fact would
  unlock on the timeline.

### B. Prediction / event engine
- A set of **generators**, each emitting one or more events/phases. Every output carries:
  `date-or-range`, `confidence band`, `provenance` (data vs. inferred), and the
  `rule/source` behind it.
- **Hybrid fallback architecture:** each generator first asks "do I have published data for
  this profile?" → if yes, look it up; if no, apply a documented heuristic/inference. The
  data-vs-inference distinction is a first-class field, surfaced everywhere.
- Generators compute **second-order phases** (e.g. caregiving window derived from the
  parental-mortality estimate; empty-nest from children's ages; own age-linked health
  windows).
- Inference generators may call an LLM (Claude API) behind the common generator interface —
  but their output is always labeled "inferred" and bounded by a range.

### C. Timeline visualization (the "aha")
- Horizontal **Gantt**: x-axis = your lifespan; rows = life **domains** (self/health,
  career, parents, children, partner, finances).
- Phases render as bars, point-events as markers, uncertainty as a range/gradient.
- A **"now" line**; everything left of it is history, right of it is forecast.
- Click any item → basis, confidence, source, and **"adjust / this is wrong"** (the
  falsifiability loop — corrections refine the model).
- Toggle: **high-confidence only** vs. **include inferred**.

---

## Out of scope for v1

Accounts / cloud sync, social or sharing features, trained ML models, mobile apps,
monetization, and exhaustive dataset coverage. v1 ships a credible **vertical slice** of
domains and generators, not the full atlas of life.

---

## Suggested stack

- **Frontend:** React + TypeScript.
- **Visualization:** D3 or a timeline library (e.g. vis-timeline) for the Gantt;
  custom SVG/Canvas if needed for the uncertainty rendering.
- **Storage:** local-first (IndexedDB / localStorage) — no backend for the profile in v1.
- **Engine:** typed generator modules with a shared interface; published-data lookups as
  static/bundled datasets; inference generators behind the same interface (optionally
  Claude API).

---

## Success criteria

1. A user enters a sparse profile in **under 5 minutes** and gets a coherent, labeled life
   timeline.
2. **Every** item on the timeline traces to a source or a stated inference — nothing is
   unexplained.
3. The **caregiving-window example reproduces from the model**, not from a hardcoded case.
4. A user can **correct an assumption** and see the timeline update.
5. Data-backed vs. inferred items are **visually unmistakable** at a glance.

---

## Key risks / open questions

- **Data sourcing & licensing** for the published-dataset half (life tables, census,
  epidemiological data) — where v2 credibility comes from.
- **Statistical correctness** of combining multiple factors without overclaiming.
- **Emotional & ethical framing** of mortality-adjacent output.
- **Spurious precision** from LLM inference — must stay visibly bounded and labeled.
