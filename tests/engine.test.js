// Engine behavior. The generic block sweeps every emitted item, so a new generator is
// validated for shape automatically. The specific blocks lock in important behaviors.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../src/engine/engine.js';
import { DOMAINS } from '../src/model.js';
import { getFact } from '../src/corpus/corpus.js';
import { demo, minimal, smokerHS, collegeNS, maleNoHistory, allProfiles } from './fixtures.js';

const DOMAIN_IDS = new Set(DOMAINS.map((d) => d.id));
const PROV = new Set(['data', 'inferred', 'recorded']);
const num = (x) => typeof x === 'number' && Number.isFinite(x);

/* ---- INVARIANTS: hold for every profile, every item (auto-covers new generators) ---- */
test('every emitted item is well-formed, in a real domain, dated, and cited', () => {
  for (const profile of allProfiles) {
    const items = run(profile);
    assert.ok(Array.isArray(items) && items.length > 0, 'no items');
    const seen = new Set();
    for (const it of items) {
      const w = `[${profile.sex} ${profile.birthYear}] item ${it.id}`;
      assert.ok(!seen.has(it.id), `${w}: duplicate id`); seen.add(it.id);
      assert.ok(DOMAIN_IDS.has(it.dom), `${w}: domain "${it.dom}" not in DOMAINS`);
      assert.ok(it.kind === 'event' || it.kind === 'phase', `${w}: bad kind`);
      if (it.kind === 'event') { assert.ok(num(it.at?.est), `${w}: bad event date`); assert.ok(it.at.lo <= it.at.est && it.at.est <= it.at.hi, `${w}: range`); }
      else { assert.ok(num(it.s?.est) && num(it.e?.est), `${w}: bad phase dates`); }
      assert.ok(PROV.has(it.prov), `${w}: bad provenance`);
      assert.ok(num(it.conf) && it.conf >= 0 && it.conf <= 1, `${w}: bad confidence`);
      assert.ok(it.basis && it.source, `${w}: missing basis/source`);
    }
  }
});

test('engine is deterministic and never throws on a minimal profile', () => {
  assert.doesNotThrow(() => run(minimal));
  assert.equal(JSON.stringify(run(demo)), JSON.stringify(run(demo)));
});

/* ---- BEHAVIOR: grounded data actually moves the timeline ---- */
test('life expectancy responds to the profile', () => {
  const death = (p) => run(p).find((i) => i.id === 'death').at.est;
  assert.ok(death(smokerHS) < death(collegeNS), 'smoker should not outlive college non-smoker');
});

test('caregiving window is derived from parents', () => {
  const items = run(demo);
  assert.ok(items.find((i) => i.id === 'caregiving'), 'no caregiving window');
  assert.ok(items.find((i) => i.id === 'p0death') && items.find((i) => i.id === 'p1death'), 'no parent-death events');
  // and absent when there are no parents
  assert.ok(!run(minimal).find((i) => i.id === 'caregiving'), 'caregiving without parents');
});

/* ---- BEHAVIOR: corpus items render and are gated correctly ---- */
const has = (p, id) => !!run(p).find((i) => i.id === id);

test('universal health-arc items always render', () => {
  for (const id of ['cx.health.cancer.incidence', 'cx.health.dementia.onset', 'cx.health.sensory.decline', 'cx.health.mental.onset'])
    assert.ok(has(demo, id), `missing ${id}`);
});

test('sex-gated items appear only for the right sex', () => {
  assert.ok(has(demo, 'cx.reproductive.menopause'), 'menopause missing for female');
  assert.ok(!has(maleNoHistory, 'cx.reproductive.menopause'), 'menopause shown for male');
});

test('heritable-risk windows are gated by family history', () => {
  assert.ok(has(demo, 'cx.heritability.heart-disease'), 'heart-disease window missing (family history present)');
  assert.ok(has(demo, 'cx.heritability.alzheimers'), 'alzheimers window missing (family history present)');
  assert.ok(!has(maleNoHistory, 'cx.heritability.heart-disease'), 'heart-disease window shown without family history');
  assert.ok(!has(demo, 'cx.heritability.diabetes'), 'diabetes window shown without family history of diabetes');
});

/* ---- ORPHAN GUARD: every corpus-rendered item maps to a real fact ---- */
test('no orphan corpus items (every cx.* item has a backing fact)', () => {
  for (const it of run(demo)) if (it.id.startsWith('cx.')) assert.ok(getFact(it.id.slice(3)), `orphan item ${it.id}: no fact ${it.id.slice(3)}`);
});
