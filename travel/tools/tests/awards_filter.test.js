// Filter cases from travel/australia/awards/UI-PLAN.md 5.1, run against the page's real data.js.
// Run from the repo root: node --test travel/tools/tests/
// The expected shops are for the 5 trial shops (2026-11); recount them when Step 7 adds full data.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const F = require(path.join(ROOT, 'scripts', 'awards-filter.js'));

function loadGlobal(file, name) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8') + `;this.__v = ${name};`, ctx);
  // Copy out of the vm realm, or deepStrictEqual sees a different Array prototype.
  return JSON.parse(JSON.stringify(ctx.__v));
}
const DATA = loadGlobal('travel/australia/awards/data.js', 'PAGE_DATA');
const CONFIG = loadGlobal('travel/australia/awards/page.js', 'PAGE_CONFIG');
const SHOPS = DATA.businesses;

const SHORT = {
  "Adelaide's Finest": 'AF', 'Bonfire Bread': 'BB', 'Three Mills Bakery': 'TM',
  'Glee Coffee Roasters': 'GL', 'Burleigh Baker': 'BU'
};
const run = f => F.filter(SHOPS, f, CONFIG.typeGroups).map(b => SHORT[b.name]).sort();

test('trial data is the 5 shops these cases were counted on', () => {
  assert.deepEqual(SHOPS.map(b => SHORT[b.name]).sort(), ['AF', 'BB', 'BU', 'GL', 'TM']);
});

// [#, filters, expected shops] — same numbering as UI-PLAN.md 5.1.
const CASES = [
  [1, {}, ['AF', 'BB', 'BU', 'GL', 'TM']],
  [2, { state: 'NSW' }, ['BB', 'GL']],
  [3, { state: 'NSW', type: 'coffee' }, ['GL']],
  [4, { year: 2024 }, ['BB', 'GL', 'TM']],
  [5, { year: 2025, level: 'champion' }, ['BB', 'GL']],          // TM: 2024 champion + 2025 gold
  [6, { year: 2024, level: 'champion' }, ['TM']],
  [7, { year: 2026, level: 'first' }, ['AF', 'BU']],             // BB's 1st places are 2025
  [8, { comp: 'NABC', level: 'gold' }, []],
  [9, { comp: 'RAS-PB', level: 'champion' }, ['TM']],            // AF's champions are NABC
  [10, { group: 'pastry_pie' }, ['BU', 'TM']],
  [11, { year: 2025, group: 'pastry_pie' }, []],                 // TM's 2025 pies are silver
  [12, { group: 'coffee_milk' }, []],                            // GL's milk coffees are silver
  [13, { group: 'sourdough', level: 'champion' }, ['AF', 'BB']],
  [14, { year: 2026, level: 'gold', group: 'biscuit' }, ['BU', 'TM']],
  [15, { state: 'NSW', year: 2026 }, ['BB']],
  [16, { state: 'NSW', year: '2025' }, ['BB', 'GL']],            // as read from ?state=NSW&year=2025
  [17, { q: 'canberra' }, ['TM']],
  [18, { q: 'frewville' }, ['AF']],
  [19, { q: 'olive' }, ['BB']],
  [20, { q: 'carrot' }, []],                                     // Carrot Cake is silver only
  [21, { q: 'sourdough', year: 2024 }, ['BB', 'TM']],            // keyword and year: not the same award
  [22, { q: 'croissant' }, ['AF', 'BU', 'TM']],                  // AF: NABC class name "Croissants"
  [23, { q: 'CROISSANT' }, ['AF', 'BU', 'TM']],
  [24, { q: 'pie' }, ['BU', 'TM']],
  [25, { year: '1999' }, []]                                     // see the note in the test below
];

for (const [n, f, want] of CASES) {
  if (n === 25) continue;
  test(`#${n} ${JSON.stringify(f)} → ${want.length}`, () => assert.deepEqual(run(f), want));
}

// #25 is about reading the URL: an unknown year is dropped before filtering, so all 5 show.
// The filter itself, given 1999, rightly finds nothing.
test('#25 a year no award has matches nothing (the URL reader drops it first)', () => {
  assert.deepEqual(run({ year: '1999' }), []);
});

test('button counts with 2025 picked (UI-PLAN 5.1)', () => {
  const f = { year: 2025 };
  const c = (key, value) => F.countWith(SHOPS, f, key, value, CONFIG.typeGroups);
  assert.deepEqual([c('level', 'champion'), c('level', 'gold'), c('level', 'first')], [2, 3, 1]);
  assert.deepEqual([c('comp', 'RAS-PB'), c('comp', 'NABC'), c('comp', 'GBA')], [2, 1, 1]);
});

test('ALL, empty string and missing all mean "not set"', () => {
  assert.equal(run({ state: F.ALL, year: '', q: '   ' }).length, 5);
});

test('normalize drops accents, case and extra spaces', () => {
  assert.equal(F.normalize('Café'), 'cafe');
  assert.equal(F.normalize('  Crème   Brûlée '), 'creme brulee');
});

test('a keyword with accents finds the plain spelling', () => {
  assert.deepEqual(run({ q: 'Cànberra' }), ['TM']);
});

test('silver and 2nd place never match the award layer', () => {
  for (const b of SHOPS) for (const a of b.awards) {
    if (a.tier === 'also') assert.equal(F.awardMatches(a, {}), false, a.id);
  }
});
