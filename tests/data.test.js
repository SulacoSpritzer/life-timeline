// Grounded data sanity. If a table or constant changes, update these expectations.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ex, deathYearEst, lifeExpectancyDelta } from '../src/data/lifeTables.js';

test('remaining life expectancy decreases with age', () => {
  assert.ok(ex(30, 'male') > ex(60, 'male'));
  assert.ok(ex(40, 'female') > ex(70, 'female'));
});

test('women have higher life expectancy than men at the same age', () => {
  assert.ok(ex(40, 'female') > ex(40, 'male'));
});

test('estimated death is in the future and reasonable', () => {
  const d = deathYearEst(1985, 'male', 2026);
  assert.ok(d.est > 2026 && d.est < 2120, `death year ${d.est}`);
  assert.ok(d.lo <= d.est && d.est <= d.hi, 'range not ordered');
});

test('life-expectancy adjustments match published figures', () => {
  assert.equal(lifeExpectancyDelta({ health: { smoker: true } }).years, -10);     // Jha 2013
  assert.equal(lifeExpectancyDelta({ education: 'college' }).years, 5);            // IHME/Lancet
  assert.equal(lifeExpectancyDelta({ education: 'graduate' }).years, 6);
  assert.equal(lifeExpectancyDelta({ health: { smoker: true }, education: 'high' }).years, -11);
  assert.equal(lifeExpectancyDelta({}).years, 0);
});
