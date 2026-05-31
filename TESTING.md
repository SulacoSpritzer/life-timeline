# Testing — how it grows, and how we avoid orphans

Run the whole suite (zero dependencies — Node's built-in runner):

```bash
npm test          # = node --test tests/*.test.js
```

It also runs in CI on every push (`.github/workflows/test.yml`). **Run it before every commit.**

## The design: two layers

The suite is built so most additions are tested **automatically**, and the few that aren't are
covered by a short, explicit checklist.

**1. Invariant tests — these grow by themselves.** They sweep *every* fact and *every* emitted item,
so when you add a fact or a generator, it's validated without writing a new test:

- `tests/corpus.test.js` — every fact has a unique id, a valid domain/kind, a metric, a confidence in
  0–1, and a real `source`; every `requires` points at a real input.
- `tests/engine.test.js` (invariant block) — every item the engine emits, for six representative
  profiles, has a unique id, a **domain that exists in `DOMAINS`**, a valid date, and a basis + source.
  (This is what would have caught the `self` → `physical/mental/events` split leaving a straggler.)
- `tests/inputs.test.js` — the derived onboarding only ever contains real inputs.

**2. Behavior tests — one per meaningful rule.** These lock in specific logic:

- life expectancy responds to smoking/education; caregiving is derived from parents;
- sex-gated items (menopause) and family-history-gated items (heritable risks) appear *only* when they
  should; the engine is deterministic and survives a minimal profile.

## The anti-orphan guards

These tests fail loudly if something is left dangling:

- **Orphan items** — `no orphan corpus items`: every `cx.*` item the engine renders must map to a real
  corpus fact. Rename or delete a fact that a generator still references → this fails.
- **Orphan questions** — `deriveInputs` only surfaces inputs some fact references; a test asserts the
  onboarding contains only registry inputs, and that a `requires` never points at a missing input.
- **Orphan domains** — every emitted `item.dom` must be in `DOMAINS`.
- **Disappeared behavior** — the gating tests name the exact item ids (`cx.reproductive.menopause`, …);
  if a fact id changes and the item silently stops rendering, the behavior test catches it.

## The process: when you change X, do Y

| You… | Do this |
|---|---|
| **Add a corpus fact** | Nothing required — invariant tests validate it. If it *renders* on the timeline, add one `has(profile, 'cx.<id>')` behavior assertion (and a negative one for its gate). |
| **Add / rename an input** | Update `COND_TO_INPUT` if a fact conditions on it; the registry tests check it exists and is reachable. |
| **Add an engine generator / `emit`** | Invariant block auto-checks shape. Add a behavior test for its specific date/gating. |
| **Rename / remove a fact id used by a generator** | Expect the orphan-guard + the named behavior test to fail; fix the reference. |
| **Split / rename a domain** | Update `DOMAINS`; the "domain in DOMAINS" invariant flags any item left on the old id. |
| **Change a data table / constant** | Update the expected numbers in `tests/data.test.js`. |
| **Change the UI / render** | Logic tests won't cover it — run the **preview smoke check** below. |

## Preview smoke check (UI)

Automated DOM tests aren't set up (the render layer leans on SVG + layout). Until they are, after any
UI change: run the app (`python3 devserver.py 4601`), and confirm onboarding completes, the timeline
renders, a domain opens/closes, an item's detail + tooltip show a source, and the console is error-free.
(A Playwright pass is the natural next addition when we want this automated.)

## Conventions

- Tests live in `tests/`, named `*.test.js`, using `node:test` + `node:assert/strict`.
- Shared sample profiles are in `tests/fixtures.js` — keep them representative of real onboarding output.
- Tests import the real modules from `../src/…`; no mocks, no build step.
