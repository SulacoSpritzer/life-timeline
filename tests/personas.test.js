// Synthetic-persona eval (deterministic, runs in CI). Asks: does each background produce
// a valid, DIFFERENTIATED, internally-consistent timeline? The subjective "is it helpful /
// authentic" judgment is the separate LLM eval (tests/eval/, run on demand).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../src/engine/engine.js';
import { DOMAINS, NOW } from '../src/model.js';
import { PERSONAS } from './personas.js';

const DOMAIN_IDS = new Set(DOMAINS.map((d) => d.id));
const items = (i) => run(PERSONAS[i].profile);
const has = (i, id) => items(i).some((x) => x.id === id);
const deathAge = (i) => { const d = items(i).find((x) => x.id === 'death'); return d.at.est - PERSONAS[i].profile.birthYear; };
const byName = (sub) => PERSONAS.findIndex((p) => p.name.toLowerCase().includes(sub));

test('every persona produces a valid, non-trivial timeline', () => {
  PERSONAS.forEach((p, i) => {
    const list = items(i);
    assert.ok(list.length >= 8, `${p.name}: only ${list.length} items`);
    for (const it of list) {
      assert.ok(DOMAIN_IDS.has(it.dom), `${p.name}: bad domain ${it.dom}`);
      const ok = it.kind === 'event' ? Number.isFinite(it.at?.est) : Number.isFinite(it.s?.est) && Number.isFinite(it.e?.est);
      assert.ok(ok, `${p.name}: item ${it.id} not dated`);
      assert.ok(it.basis && it.source, `${p.name}: item ${it.id} not cited`);
    }
  });
});

test('timelines are differentiated across backgrounds (not one-size-fits-all)', () => {
  const ages = PERSONAS.map((_, i) => deathAge(i));
  const distinct = new Set(ages).size;
  assert.ok(distinct >= 6, `life expectancy too uniform: only ${distinct} distinct death ages`);
  assert.ok(Math.max(...ages) - Math.min(...ages) >= 12, `LE spread only ${Math.max(...ages) - Math.min(...ages)} yrs`);
});

test('healthier/more-educated backgrounds get longer life expectancy', () => {
  // index 2 = mid wealthy graduate non-smoker; index 4 = mid poor HS smoker w/ heart attack
  assert.ok(deathAge(byName('wealthy · educated')) > deathAge(byName('smoker · had a heart attack')),
    'educated non-smoker should outlive poor smoker');
});

test('caregiving window is gated by living parents', () => {
  assert.ok(has(byName('wealthy · educated · white-collar'), 'caregiving'), 'no caregiving when parents alive');
  assert.ok(!has(byName('old · wealthy'), 'caregiving'), 'caregiving when parents deceased');
});

test('heritable-risk windows are gated by that family history', () => {
  const fh = byName('breast cancer + dementia'); // female, family history of cancer + dementia
  assert.ok(has(fh, 'cx.heritability.breast-cancer'), 'breast-cancer window missing');
  assert.ok(has(fh, 'cx.heritability.alzheimers'), 'alzheimers window missing');
  const clean = byName('young · educated · white-collar'); // no family history
  assert.ok(!items(clean).some((x) => x.id.startsWith('cx.heritability.')), 'heritable windows shown without history');
});

test('sex-specific items appear only for the right sex', () => {
  assert.ok(has(byName('breast cancer + dementia'), 'cx.reproductive.menopause'), 'menopause missing for woman');
  assert.ok(!has(byName('poor · blue-collar · smoker · at-risk'), 'cx.reproductive.menopause'), 'menopause shown for man');
});

test('age is respected: an older persona is mostly lived, still alive', () => {
  const old = byName('old · wealthy');
  const born = items(old).find((x) => x.id === 'born').at.est;
  const death = items(old).find((x) => x.id === 'death').at.est;
  assert.ok(born < NOW && NOW < death, `born ${born}, now ${NOW}, death ${death}`);
});
