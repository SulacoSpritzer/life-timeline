# Life Timeline

A web app that renders your life as a Gantt chart — a finite shape of overlapping phases
and dated events — generated from a short profile and grounded in actuarial/statistical
data, with every item sourced and labeled by confidence.

See [BRIEF.md](BRIEF.md) for the project brief.

## Run locally

No build step — it's vanilla ES modules. Serve the folder over HTTP:

```bash
python3 devserver.py 4601    # then open http://localhost:4601
# or: npx serve .
```

(Opening `index.html` via `file://` won't work — ES modules require HTTP.)

## Structure

```
index.html              app shell + router
src/
  main.js               routing: onboarding ⇄ timeline
  model.js              Item/Profile contracts (JSDoc), domains
  store.js              local-first persistence (localStorage)
  data/                 life tables + reference statistics (swappable)
  engine/               profile → provenance-tagged timeline items
  ui/                   onboarding (7-step capture) + timeline view
  styles.css            shared editorial styling
timeline-poc.html       the design vision (single self-contained reference file)
```

## How it works

1. **Onboarding** captures a profile (only birth year + sex required; everything else is
   progressive).
2. The **engine** runs domain generators that turn the profile into dated items, each
   tagged `recorded | data | inferred` with a confidence and source. Where a data table
   exists it's used; otherwise the value is inferred and labeled as such.
3. The **timeline** renders the result as collapsible domains on one shared life axis. A
   disposition control (caregiving propensity) re-runs the engine and shows the
   cross-domain ripple.

Profiles are stored only in the browser (localStorage) — no account, no server.

## Status

A study build. The actuarial/statistical tables are simplified approximations behind clean,
swappable interfaces; the "Adjust this assumption" loop is not yet wired.
