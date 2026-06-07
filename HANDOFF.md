# Life Timeline — Handoff / current state

Read this first in a new session. It captures live state + open work. Companion docs:
[BRIEF.md](BRIEF.md) (what & why), [CORPUS.md](CORPUS.md) (the data), [AUTHORING.md](AUTHORING.md)
(how a fact propagates to onboarding + timeline), [TESTING.md](TESTING.md) (how tests work).

## What it is / where it lives
- A no-build (vanilla ES-modules) web app: onboarding → a generator **engine** → an editorial
  **timeline** of a person's likely life, every item cited and labeled by confidence.
- **Live:** https://life-timeline-ruddy.vercel.app · **Repo:** github.com/SulacoSpritzer/life-timeline (public)
- **Run:** `python3 devserver.py 4601` (no-cache static server) → http://localhost:4601
- **Test:** `npm test` (Node built-in runner; 29 tests). **Deploy:** `vercel deploy --prod --yes` (aliases to `…-ruddy`).
- **Design vision (reference, do not break):** `timeline-poc.html` — single self-contained file.

## Repo map
```
index.html, src/main.js          shell + router (onboarding ⇄ timeline)
src/model.js                     Profile + Item types; DOMAINS (8 timeline rows)
src/data/lifeTables.js,stats.js  grounded constants (SSA life table, smoking/edu deltas, retirement…)
src/corpus/corpus.js             Fact schema + 14 seed facts + read API + merge
src/corpus/facts-researched.js   53 workflow-researched facts (assembled; the committed source of truth)
src/corpus/inputs.js             Input registry (questions) + deriveInputs() (onboarding is derived)
src/engine/engine.js             run(profile) → items. selfGen/careerGen/… + corpusGen (renders corpus facts)
src/ui/onboarding.js             7-step capture (incl. family-history multi-select)
src/ui/timeline.js               accordion timeline, detail panel, hover tooltip, add-past-event
tests/                           node:test suite (see TESTING.md)
```

## DATA & RESEARCH (state)
- **67 facts**, all `provenance:data`, avg confidence **0.89**, each cited (org/title/year/url),
  each independently verified during research. 14 hand-seed + 53 researched.
- **Built by research workflows** — pattern that works: **research(text) → verify(text) → structure(schema)**,
  in **small batches (~16–24 topics)** to avoid rate-limiting (90-agent batches throttled; ≤63 fine).
  A combined research+structure single-agent fails to emit structured output ~half the time — keep the 3 stages.
- **Assembler:** a node script read the workflow output files (`…/tasks/*.output`) and wrote
  `facts-researched.js` (filter conf ≥0.5 + real source, dedupe by id). ⚠️ Those task files are in a
  **session-specific /tmp dir and are gone now** — `facts-researched.js` is the committed source of truth.
  To add facts: run a new research workflow, then hand-merge or re-point the assembler at the new tasks dir.
- **Clusters done:** mortality/body-arc, genetics & family history (heritability), origins & place,
  behaviors, children's outcomes, plus career/finance/partner/parents basics.
- **THE KEY GAP — collected ≠ rendered.** Only **~12–14 facts actually render** on the timeline
  (health-arc milestones + family-history risk windows, via `corpusGen` in engine.js). **~2/3 of the
  corpus is in reserve, cited but unused**: origins/place, behaviors, children outcomes, and most
  money/relationship facts (net-worth peak, retirement-savings, divorce prob, widowhood, job tenure…).
  They need an `emit` mapping and, for some, a missing input.
- **Missing inputs that block facts:** no income/wealth input (income–mortality gradient fact unused);
  behaviors need BMI/activity/alcohol inputs. `inputs.js` has 12 questions, 11 active.
- **Remaining research clusters:** mental-health *prevalence* (have onset, not lifetime prevalence/
  suicide/midlife well-being U-curve), work/money *shocks* (layoff prob + scarring, recession cadence,
  bereavement→depression), deeper parents (lifetime long-term-care probability).
- **Wishlist facts not yet in:** spouse-death *as an event* (widowhood fact exists, doesn't render),
  retirement-depression, empty-nest-depression, first job loss, perimenopause, osteoarthritis, recessions.

## SYNTHETIC USERS & TESTING (state)
Two layers (see TESTING.md). **29 tests pass; CI runs on every push.**
- **Deterministic (free, CI):** `tests/personas.js` = **14 archetype profiles** across sex/age/class/
  education/collar/health. `tests/personas.test.js` asserts each is valid, **differentiated** (LE spread),
  and gated correctly (sex/family-history/caregiving), age-respecting. Engine/corpus/input invariants in
  the other `*.test.js` sweep ALL facts/items, so new additions are validated automatically.
- **LLM judge (on demand):** `tests/eval/render.js` renders a persona's timeline to text; a judge agent
  scores **helpful (0–5)** + **authentic (0–5)**. First run scored **~2/5** and flagged: generic
  "Heuristic 45%" filler; recorded events don't propagate; defining traits barely move the timeline;
  missing the most decision-relevant arc per life-stage; **presbyopia mis-cited to an NIDCD hearing source** (real bug).
- ⚠️ **THE BIG TESTING GAP (user's last point):** none of this **goes through the real experience** —
  the tests inject the profile object and read engine data; they never fill onboarding or view the
  rendered UI. A **manual experiential run** (drove persona-2 through onboarding → timeline → screenshot)
  found things the data tests can't: **label collision/clipping** in the dense Physical row; a healthy
  28-year-old **opens onto decline→illness→menopause→cancer→death** with relevant arcs (career/relationships/
  fertility) collapsed below the fold; 7 onboarding steps before any payoff.
- **Wanted next (not built):** an **experiential harness** — browser-drive each persona through onboarding
  → screenshot the timeline → a **vision judge** rates UX clarity, **legibility**, **relevance to this person**,
  tone. Tooling: preview MCP (local) or Chrome MCP (live). Plus: a **combinatorial/random persona generator**
  (the 14 are a sample; the controlled variables imply ~5,000 combos) for the deterministic sweep, and a
  Playwright UI smoke test.

## UX (state, decisions, known issues)
- **Aesthetic:** Steve-Jobs-Archive-ish — warm paper, old-style serif, one terracotta accent, generous
  spacing, hairlines. Monochrome; **provenance shown by form** (solid bar = recorded, light = data,
  line = projected) + a small-caps tag, never color alone. **WCAG AA is a hard gate** (verified via a
  contrast self-check). Plain language only — no poetic/patronizing copy.
- **8 domains (left rows):** Physical health · Mental well-being · Life events · Career · Finances ·
  Partner · Children · Parents. (Self was split into the first three to de-clutter.)
- **Recent decisions:** removed the disposition/caregiving-propensity control entirely; removed the whole
  sentiment / "how did it feel?" layer (orphaned); accordions animate (open *and* close fold); items
  unfold left-to-right on first load; hover tooltip gives a bulleted breakdown; selection = accent recolor (no box).
- **Known UX issues to fix:** (1) **label collision/clipping** when a domain is dense (Physical) —
  lane-packing/label placement needs work; (2) **relevance/emphasis** — don't open young people on
  decline/death; surface life-stage-relevant arcs; (3) onboarding is 7 steps before payoff.

## ROADMAP / next steps (rough priority)
1. **UX legibility** — fix label collision/clipping (most visible).
2. **Relevance** — life-stage-aware emphasis/default-open; surface the arc each persona cares about.
3. **Event propagation** — recorded events (e.g., heart attack) reshape downstream risk + LE.
4. **Make more traits matter** — add income/wealth input + apply income–mortality gradient; behavior inputs.
5. **Render the reserve** — give the unused ~2/3 of the corpus `emit` specs (origins, behaviors, money, relationships).
6. **Citation fix** — presbyopia → NEI source (split vision vs hearing fact).
7. **Experiential test harness** + combinatorial persona generator + Playwright smoke.
8. **More research** — wishlist facts + remaining clusters (mental-health prevalence, shocks, LTC).

## Conventions & gotchas
- No build, no deps. ES modules; Node 23 runs `.js` as ESM (syntax detection). `npm test` = `node --test tests/*.test.js`.
- `.vercelignore` keeps tests/package.json/.github/.claude/devserver.py **out of the static deploy** — keep it that way.
- Dev server caches by default → use `devserver.py` (no-store) and `?v=N` cache-busting when verifying in the browser.
- The engine's render policy lives in `corpusGen` (curated `cxEvent/cxPhase` calls), not yet `emit`-on-fact;
  `AUTHORING.md` documents the intended `emit`/`requires` contract that should eventually replace it.
- Preview-tool screenshots are sometimes stale; re-take or nudge the viewport. Synthetic-hover screenshots are flaky.
- gh + vercel were authed as SulacoSpritzer / sulacospritzer; tokens can expire (re-`gh auth login` / `vercel login`).
