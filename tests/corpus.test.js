// Corpus integrity — INVARIANT tests. These sweep every fact, so adding a fact is
// automatically validated. A malformed fact fails here without writing a new test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FACTS } from '../src/corpus/corpus.js';
import { INPUTS } from '../src/corpus/inputs.js';

const CORPUS_DOMAINS = new Set(['self', 'career', 'finances', 'partner', 'children', 'parents']);
const KINDS = new Set(['milestone', 'phase', 'rate', 'risk', 'gradient', 'distribution']);
const PROV = new Set(['data', 'inferred']);
const INPUT_IDS = new Set(INPUTS.map((i) => i.id));

test('corpus is non-trivial', () => { assert.ok(FACTS.length >= 40, `only ${FACTS.length} facts`); });

test('every fact has unique id', () => {
  const seen = new Set();
  for (const f of FACTS) { assert.ok(!seen.has(f.id), `duplicate id ${f.id}`); seen.add(f.id); }
});

test('every fact satisfies the schema', () => {
  for (const f of FACTS) {
    const where = `fact ${f.id}`;
    assert.equal(typeof f.id, 'string', where);
    assert.ok(CORPUS_DOMAINS.has(f.domain), `${where}: bad domain ${f.domain}`);
    assert.ok(KINDS.has(f.kind), `${where}: bad kind ${f.kind}`);
    assert.ok(f.statement && typeof f.statement === 'string', `${where}: missing statement`);
    assert.ok(f.metric && typeof f.metric === 'object', `${where}: missing metric`);
    assert.ok(PROV.has(f.provenance), `${where}: bad provenance`);
    assert.ok(typeof f.confidence === 'number' && f.confidence >= 0 && f.confidence <= 1, `${where}: bad confidence`);
    assert.ok(f.source && f.source.org && f.source.title && typeof f.source.year === 'number', `${where}: bad source`);
  }
});

test('every fact.requires references a real input', () => {
  for (const f of FACTS) for (const r of f.requires || []) assert.ok(INPUT_IDS.has(r), `fact ${f.id} requires unknown input "${r}"`);
});
