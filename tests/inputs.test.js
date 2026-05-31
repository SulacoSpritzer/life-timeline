// Input registry + derivation. Guards the "no data point, no question" + dedup contract.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INPUTS, getInput, deriveInputs } from '../src/corpus/inputs.js';
import { FACTS } from '../src/corpus/corpus.js';

test('input ids are unique', () => {
  const seen = new Set();
  for (const i of INPUTS) { assert.ok(!seen.has(i.id), `duplicate input ${i.id}`); seen.add(i.id); }
});

test('every input is well-formed', () => {
  for (const i of INPUTS) {
    assert.ok(i.id && i.prompt && i.label, `input ${i.id} missing fields`);
    assert.ok(['core', 'standard', 'deep'].includes(i.tier), `input ${i.id} bad tier`);
  }
});

test('derived onboarding contains only real inputs (no orphan questions)', () => {
  const { active } = deriveInputs(FACTS);
  for (const a of active) assert.ok(getInput(a.input.id), `active input ${a.input.id} is not in the registry`);
});

test('inputs needed by the corpus are actually asked', () => {
  const { active } = deriveInputs(FACTS);
  const ids = new Set(active.map((a) => a.input.id));
  // birthYear is needed to date anything; sex gates many facts.
  assert.ok(ids.has('birthYear'), 'birthYear not active');
  assert.ok(ids.has('sex'), 'sex not active');
});

test('no data point, no question: an unreferenced input is never asked', () => {
  const referenced = new Set(deriveInputs(FACTS).active.map((a) => a.input.id));
  // birthRegion is only asked because some fact requires it; if nothing did, it would not appear.
  const onlyBirthYear = deriveInputs([{ id: 'x', domain: 'self', requires: ['birthYear'], metric: {} }]);
  assert.deepEqual(onlyBirthYear.active.map((a) => a.input.id), ['birthYear']);
  assert.ok(referenced.size >= 1);
});

test('a fact requiring an input activates exactly that question (dedup)', () => {
  const fakeFacts = [
    { id: 'a', domain: 'self', requires: ['familyHistory'], metric: {} },
    { id: 'b', domain: 'self', requires: ['familyHistory'], metric: {} },
    { id: 'c', domain: 'self', requires: ['familyHistory', 'sex'], metric: {} },
  ];
  const { active } = deriveInputs(fakeFacts);
  const fh = active.find((a) => a.input.id === 'familyHistory');
  assert.ok(fh, 'familyHistory not activated');
  assert.equal(fh.count, 3, 'familyHistory should be referenced by 3 facts but asked once');
});
