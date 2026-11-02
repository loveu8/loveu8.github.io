// Filter cases from travel/australia/awards/UI-PLAN.md 5.1 on a frozen fixture of the 5 trial
// shops (awards_filter_fixture.js), plus checks that hold for any real data.js.
// Run from the repo root: node --test travel/tools/tests/awards_filter.test.js
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
// The 25 cases run on a frozen copy of the 5 trial shops, so adding real shops never breaks
// them (user chose A, 2026-11-02). The real data.js gets its own checks at the end.
const DATA = loadGlobal('travel/tools/tests/awards_filter_fixture.js', 'PAGE_DATA');
const REAL = loadGlobal('travel/australia/awards/data.js', 'PAGE_DATA');
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

// ── the real data.js (whatever it holds today) ──
const REAL_SHOPS = REAL.businesses;

test('real data: every shop has a headline award (D1 threshold)', () => {
  for (const b of REAL_SHOPS) {
    assert.ok(b.awards.some(a => a.tier === 'top'), b.name);
  }
});

test('real data: every item group has a 品項 button label (except overall)', () => {
  const groups = new Set(REAL_SHOPS.flatMap(b => b.awards.map(a => a.group)));
  groups.delete('overall');
  for (const g of groups) assert.ok(CONFIG.itemGroups[g], `page.js itemGroups lacks ${g}`);
});

test('real data: every type is in a type group, every level is known', () => {
  const types = new Set(CONFIG.typeGroups.flatMap(g => g.types));
  for (const b of REAL_SHOPS) {
    for (const t of b.types) assert.ok(types.has(t), `${b.name}: type ${t}`);
    for (const a of b.awards) assert.ok(['champion', 'gold', 'silver', 'first', 'second'].includes(F.levelKey(a)), a.id);
  }
});

test('real data: state counts match a count done without the filter code', () => {
  const states = new Set(REAL_SHOPS.flatMap(b => b.locations.map(l => l.state)));
  for (const s of states) {
    const direct = REAL_SHOPS.filter(b => b.locations.some(l => l.state === s)).length;
    assert.equal(F.filter(REAL_SHOPS, { state: s }, CONFIG.typeGroups).length, direct, s);
  }
});

test('real data: each headline award finds its shop; silver and 2nd place find nothing', () => {
  for (const b of REAL_SHOPS) for (const a of b.awards) {
    const f = { comp: a.comp, year: a.year, level: F.levelKey(a), group: a.group };
    assert.equal(F.filter([b], f, CONFIG.typeGroups).length, a.tier === 'top' ? 1 : 0, a.id);
  }
});
