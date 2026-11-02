// Award-winning shops map (travel/australia/awards/) — renders PAGE_DATA (the page's
// generated data.js) into the list-map shell, using PAGE_CONFIG (page.js) for page text,
// the type filter groups and the fallback map view. The map, sheet, chip strip, divider
// and back-to-top are scripts/list-map-shell.js; this file owns the filters and the cards.
// Card layout decisions: travel/australia/awards/UI-PLAN.md 3.3–3.7.

// The filter rules and the item-name helpers live in scripts/awards-filter.js (tested in node).
var ALL = AwardsFilter.ALL;
var levelKey = AwardsFilter.levelKey;
var titleCase = AwardsFilter.titleCase;
var shortClass = AwardsFilter.shortClass;
var itemName = AwardsFilter.itemName;
var STORES_SHOWN = 2;  // the rest go into a "N more stores" toggle
var ITEMS_SHOWN = 3;   // winning items on the card; the rest are in the award details
var LEVEL_ORDER = { champion: 0, ranking: 0, medal: 1, placing: 1 };
// Picking a state frames its stores on the map (DESIGN.md map-interaction rule, state-filter
// exception). Names and zooms are only for the map shown until the My Maps embed exists.
var STATES = {
  ACT: { name: 'Australian Capital Territory', zoom: 9 },
  NSW: { name: 'New South Wales', zoom: 6 },
  NT: { name: 'Northern Territory', zoom: 5 },
  QLD: { name: 'Queensland', zoom: 5 },
  SA: { name: 'South Australia', zoom: 6 },
  TAS: { name: 'Tasmania', zoom: 7 },
  VIC: { name: 'Victoria', zoom: 7 },
  WA: { name: 'Western Australia', zoom: 5 }
};
var AREA_FIT_PX = 560;  // map width the store box should fit in (narrower than most map panels)
// Phone sheet: the title and filters fold away while the list scrolls down and come back on
// any scroll up, so more cards fit; the result line stays (UI-PLAN 4.2, NN/g "partially
// persistent header"). Keep FOLD_MS in step with the .sheet-fold transition in awards.css.
var PHONE = window.matchMedia('(max-width: 767px)');
var FOLD_TOP = 60;   // px of list scroll before folding starts
var FOLD_STEP = 4;   // px of movement that counts as a scroll direction
var FOLD_MS = 300;

// Each page's PAGE_CONFIG.ui[lang] must add `title` and `mapTitle`, and may override any key here or in the shell.
var UI = {
  'zh-TW': {
    subtitle: '{n} 家 · {m} 間門市 · 官方結果 {y}',
    state: '州別', city: '城市', type: '類型', comp: '賽事', year: '年份', level: '等級', group: '品項',
    all: '全部', allStates: '全部州別', allTypes: '全部類型',
    search: '搜尋店名、城市或產品', searchPlaceholder: '例如 Sydney、croissant', searchClear: '清除搜尋',
    more: '更多篩選', moreCount: '更多篩選 · {n}', clearAll: '✕ 清除', clearAllAria: '清除全部篩選',
    result: '{s} × {c} · {n} 家', resultOne: '{s} × {c} · 1 家', resultMore: ' · 另 {n} 個條件', resultMoreOne: ' · 另 1 個條件',
    matchNote: '（符合篩選）', footnoteAsOf: '資料整理到 {d}。',
    emptyTitle: '這個組合沒有店家', emptyText: '換個條件看看，或按「✕ 清除」；每個按鈕上的數字是選了它之後的家數。',
    meta: '{c} · {s} · {n} 間門市', yearOne: '{y} 年',
    levels: { champion: '冠軍', top100: '世界百大', gold: '金牌', silver: '銀牌', first: '第 1 名', second: '第 2 名' },
    rankOf: '第 {n} 名',
    levelsShort: { champion: '冠軍', gold: '金牌', first: '第 1 名' },
    items: '得獎品項', moreItems: '另有 {n} 項，見獎項明細',
    details: '獎項明細（{n}）', groupTop: '招牌', groupAlsoCount: '也推薦（{n}）',
    awardStore: '{s} 店', staffEntry: '參賽者：{r}',
    source: '官方結果 ↗', archive: '存檔 ↗', verified: '查證 {d}',
    sourceAria: '{a} 的官方來源（另開新頁）', archiveAria: '{a} 的官方來源存檔（另開新頁）',
    stores: '門市', moreStores: '還有 {n} 間門市',
    mapAria: '在地圖上查看：{s}', mapsAria: '在 Google Maps 開啟：{s}',
    types: { bakery: '烘焙', cafe: '咖啡廳', roaster: '烘豆' },
    scopes: { supermarket: '超市內烘焙', chain_franchise: '連鎖加盟店' },
    locTypes: { supermarket_counter: '超市內專櫃', factory_shop: '工廠門市' },
    footnote: [
      '獎項來自雪梨皇家烘焙賽、全國手工烘焙賽、金豆烘豆賽 2024–2026 和世界百大咖啡店 2025–2026 官方公布的結果，每一筆都附來源連結和查證日期。',
      '世界百大咖啡店是「排名」，不是評分比賽：由 The World\'s 100 Best Coffee Shops（執行長 César Ramírez）舉辦，冠名贊助是 Kerry 集團旗下的 DaVinci Gourmet，另有 Slayer、Cropster 等咖啡品牌贊助；專業評審佔 70%、公開投票佔 30%，評審名單沒有公開。地圖只放官方寫的那一間店。',
      '金牌是分數制，達到分數就有，同一班可以有好幾面；第 1 名是名次，每班只有一個，兩者不能直接比。',
      '卡片列出冠軍、金牌、第 1 名（招牌）和銀牌、第 2 名（也推薦），銅牌和第 3 名不列。',
      '雪梨皇家烘焙賽在雪梨舉辦，所以新州的店特別多；咖啡店則有一大半在昆士蘭。',
      '獎項代表得獎當年那間店的水準；連鎖加盟店只列得獎的那一間；超市的獎沒有指定門市時，列出它有烘焙部的門市。',
      '篩選只作用在清單，地圖固定顯示全部門市；賽事、年份、等級、品項只看冠軍、金牌、第 1 名。'
    ]
  },
  en: {
    subtitle: '{n} shops · {m} stores · official results {y}',
    state: 'State', city: 'City', type: 'Type', comp: 'Competition', year: 'Year', level: 'Level', group: 'Item',
    all: 'All', allStates: 'All states', allTypes: 'All types',
    search: 'Search shops, cities or items', searchPlaceholder: 'e.g. Sydney, croissant', searchClear: 'Clear search',
    more: 'More filters', moreCount: 'More filters · {n}', clearAll: '✕ Clear', clearAllAria: 'Clear all filters',
    result: '{s} × {c} · {n} shops', resultOne: '{s} × {c} · 1 shop', resultMore: ' · +{n} filters', resultMoreOne: ' · +1 filter',
    matchNote: ' (matches the filters)', footnoteAsOf: 'Data as of {d}.',
    emptyTitle: 'No shops match', emptyText: 'Try other filters, or press “✕ Clear”; the number on each button is how many shops it would show.',
    meta: '{c} · {s} · {n} stores', yearOne: '{y}',
    levels: { champion: 'Champion', top100: "World's 100 Best", gold: 'Gold medal', silver: 'Silver medal', first: '1st place', second: '2nd place' },
    rankOf: '#{n}',
    levelsShort: { champion: 'Champion', gold: 'Gold', first: '1st' },
    items: 'Winning items', moreItems: '{n} more in the award details',
    details: 'Award details ({n})', groupTop: 'Headline awards', groupAlsoCount: 'Also recommended ({n})',
    awardStore: '{s} store', staffEntry: 'Entrant: {r}',
    source: 'Official results ↗', archive: 'Archive ↗', verified: 'Checked {d}',
    sourceAria: 'Official source for {a} (opens in a new tab)', archiveAria: 'Archived official source for {a} (opens in a new tab)',
    stores: 'Stores', moreStores: '{n} more stores',
    mapAria: 'Show on map: {s}', mapsAria: 'Open in Google Maps: {s}',
    types: { bakery: 'Bakery', cafe: 'Café', roaster: 'Roaster' },
    scopes: { supermarket: 'In-store supermarket bakery', chain_franchise: 'Franchise store' },
    locTypes: { supermarket_counter: 'Supermarket counter', factory_shop: 'Factory shop' },
    footnote: [
      "Awards come from the official 2024–2026 results of the Sydney Royal Bakery show, the National Artisan Baking Competition and Golden Bean, and The World's 100 Best Coffee Shops 2025–2026; every row links to its source and the date it was checked.",
      "The World's 100 Best Coffee Shops is a ranking, not a scored competition: it is run by The World's 100 Best Coffee Shops (CEO César Ramírez), with Kerry's DaVinci Gourmet as title sponsor and coffee brands such as Slayer and Cropster as sponsors; an expert panel gives 70% of the score and a public vote 30%, and the judges are not named. Only the shop named on the official page is on the map.",
      'Gold medals are scored: every entry above the mark gets one, so a class can have several. A 1st place is a ranking, one per class. The two are not the same thing.',
      'Cards list champions, gold medals and 1st places (headline awards) plus silver medals and 2nd places (also recommended); bronze and 3rd places are left out.',
      'The Sydney Royal show is held in Sydney, so NSW shops are over-represented; more than half the coffee stores are in Queensland.',
      'An award reflects that shop in the year it won; for franchises only the winning store is listed; when a supermarket’s award names no store, every store with its own bakery is listed.',
      'Filters apply to the list only; the map always shows every store. Competition, year, level and item look at champions, gold medals and 1st places only.'
    ]
  }
};

var state = {
  data: null,
  config: null,
  lang: 'zh-TW',
  f: null,           // filters: emptyFilters() shape, set in init() from the URL
  moreOpen: false,   // the 更多篩選 rows are showing
  selectedId: null,
  open: {}  // ids of open <details> (award details, more stores), kept across re-renders
};

var shell = null;  // ListMapShell instance, created in init()

var els = {
  sidebarBody: document.getElementById('sidebarBody'),
  pageSubtitle: document.getElementById('pageSubtitle'),
  typeTabs: document.getElementById('typeTabs'),
  cityRow: document.getElementById('cityRow'),
  moreBtn: document.getElementById('moreBtn'),
  moreBtnText: document.getElementById('moreBtnText'),
  moreFilters: document.getElementById('moreFilters'),
  searchLabel: document.getElementById('searchLabel'),
  searchInput: document.getElementById('searchInput'),
  searchClear: document.getElementById('searchClear'),
  resultText: document.getElementById('resultText'),
  clearAll: document.getElementById('clearAll')
};
// Row labels, keyed by the UI string that fills them.
var LABEL_IDS = { stateLabel: 'state', cityLabel: 'city', typeLabel: 'type', compLabel: 'comp',
  yearLabel: 'year', levelLabel: 'level', groupLabel: 'group' };

// ── helpers ──
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function isEn() {
  return state.lang === 'en';
}

// t('key', {n: 3}) — look up a UI string and fill {placeholders}.
function t(key, vars) {
  var text = UI[state.lang][key];
  Object.keys(vars || {}).forEach(function(k) { text = text.split('{' + k + '}').join(vars[k]); });
  return text;
}

function externalLink(className, text, href, label) {
  var a = el('a', className, text);
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  if (label) a.setAttribute('aria-label', label);
  return a;
}

function unique(list) {
  return list.filter(function(item, i) { return list.indexOf(item) === i; });
}

function businessById(id) {
  return state.data.businesses.find(function(b) { return b.id === id; });
}

function locationById(business, id) {
  return business.locations.find(function(l) { return l.id === id; });
}

function typeGroupByCode(code) {
  return state.config.typeGroups.find(function(g) { return g.code === code; });
}

function typeGroupLabel(code) {
  var group = typeGroupByCode(code);
  return isEn() ? group.en : group.zh;
}

function yearRange(awards) {
  var years = awards.map(function(a) { return a.year; });
  var lo = Math.min.apply(null, years);
  var hi = Math.max.apply(null, years);
  return lo === hi ? t('yearOne', { y: lo }) : lo + '–' + hi;
}

// ── awards ──
// best100: the best place in The World's 100 Best Coffee Shops (a rank, not a count).
function headlineCounts(business) {
  var counts = { champion: 0, top100: 0, best100: null, gold: 0, first: 0 };
  business.awards.forEach(function(a) {
    if (a.tier !== 'top') return;
    var key = levelKey(a);
    counts[key] += 1;
    if (key === 'top100' && (counts.best100 === null || a.rank < counts.best100)) counts.best100 = a.rank;
  });
  return counts;
}

function latestYear(business) {
  return Math.max.apply(null, business.awards.map(function(a) { return a.year; }));
}

// UI-PLAN 5: champions → World's 100 Best places → gold + 1st places → most recent year → name.
function compareBusinesses(a, b) {
  var ca = headlineCounts(a);
  var cb = headlineCounts(b);
  return (cb.champion - ca.champion) ||
    (cb.top100 - ca.top100) ||
    ((ca.best100 || 999) - (cb.best100 || 999)) ||  // then the better World's 100 Best rank
    ((cb.gold + cb.first) - (ca.gold + ca.first)) ||
    (latestYear(b) - latestYear(a)) ||
    a.name.localeCompare(b.name);
}

// Within a group: newest year, then champion before medals / placings, then score.
function compareAwards(a, b) {
  return (b.year - a.year) ||
    (LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]) ||
    ((b.score || 0) - (a.score || 0));
}

// Level text with the 🏆 hidden from screen readers (the word says it). A World's 100 Best
// place carries its rank: "世界百大 第 5 名" / "World's 100 Best #5".
function levelLabel(key, rank) {
  var frag = document.createDocumentFragment();
  if (key === 'champion') {
    var cup = el('span', '', '🏆 ');
    cup.setAttribute('aria-hidden', 'true');
    frag.appendChild(cup);
  }
  frag.appendChild(document.createTextNode(levelText(key, rank)));
  return frag;
}

function levelText(key, rank) {
  var text = UI[state.lang].levels[key];
  return key === 'top100' && rank ? text + ' ' + t('rankOf', { n: rank }) : text;
}

// ── filters (list only — the My Maps embed cannot be filtered from the page) ──
// The rules are in awards-filter.js; this part draws the rows, the search box, the result
// line and the URL (UI-PLAN 3.1, 3.2, 5). state.f holds one value per key; ALL / '' = not set.
var FILTER_KEYS = ['q', 'state', 'city', 'type', 'comp', 'year', 'level', 'group'];
var LEVEL_KEYS = ['champion', 'top100', 'gold', 'first'];
var GROUP_ORDER = ['bread', 'sourdough', 'viennoiserie', 'pastry_pie', 'tart_choux', 'cake', 'biscuit', 'gluten_free',
  'coffee_espresso', 'coffee_milk', 'coffee_filter', 'coffee_other'];  // "overall" names no item
var SEARCH_DELAY = 150;  // ms after the last keystroke
var SEARCH_MAX = 80;     // characters kept from ?q=

function emptyFilters() {
  var f = {};
  FILTER_KEYS.forEach(function(k) { f[k] = k === 'q' ? '' : ALL; });
  return f;
}

function isSet(value) {
  return AwardsFilter.isSet(typeof value === 'string' ? value.trim() : value);
}

function advancedCount() {
  return AwardsFilter.AWARD_KEYS.filter(function(k) { return isSet(state.f[k]); }).length;
}

function anyFilterSet() {
  return FILTER_KEYS.some(function(k) { return isSet(state.f[k]); });
}

// The filters with one key changed; a new state drops the city, which belongs to the old one.
function filtersWith(key, value) {
  var f = {};
  FILTER_KEYS.forEach(function(k) { f[k] = state.f[k]; });
  f[key] = value;
  if (key === 'state') f.city = ALL;
  return f;
}

function shopsMatching(f) {
  return AwardsFilter.filter(state.data.businesses, f, state.config.typeGroups);
}

function filteredBusinesses() {
  return shopsMatching(state.f).sort(compareBusinesses);
}

function topAwardsOfAll() {
  var list = [];
  state.data.businesses.forEach(function(b) {
    b.awards.forEach(function(a) { if (a.tier === 'top') list.push(a); });
  });
  return list;
}

// Places with the most shops first.
function byShopCount(values, countOf) {
  return values.sort(function(a, b) { return (countOf(b) - countOf(a)) || String(a).localeCompare(String(b)); });
}

function stateCodes() {
  var codes = [];
  state.data.businesses.forEach(function(b) {
    b.locations.forEach(function(l) { if (codes.indexOf(l.state) === -1) codes.push(l.state); });
  });
  return byShopCount(codes, function(code) { return shopsMatching({ state: code }).length; });
}

function cityNames(stateCode) {
  if (!isSet(stateCode)) return [];
  var names = [];
  state.data.businesses.forEach(function(b) {
    b.locations.forEach(function(l) {
      if (l.state === stateCode && names.indexOf(l.city) === -1) names.push(l.city);
    });
  });
  return byShopCount(names, function(city) { return shopsMatching({ state: stateCode, city: city }).length; });
}

// Only values some headline award has, so no row offers a button that can never match.
function awardValues(field) {
  return unique(topAwardsOfAll().map(function(a) { return field === 'level' ? levelKey(a) : a[field]; }));
}

function itemGroupLabel(code) {
  var g = state.config.itemGroups[code];
  return g ? (isEn() ? g.en : g.zh) : code;
}

// One entry per button row, top to bottom. `tabs` = the type row's tablist (arrow keys).
var ROWS = [
  { key: 'state', id: 'stateChips', options: stateCodes, label: String },
  { key: 'city', id: 'cityChips', options: function() { return cityNames(state.f.state); }, label: String },
  { key: 'type', id: 'typeTabs', tabs: true,
    options: function() { return state.config.typeGroups.map(function(g) { return g.code; }); },
    label: function(code) { return typeGroupLabel(code); } },
  { key: 'comp', id: 'compChips',
    options: function() {
      var used = awardValues('comp');
      return state.data.competitions.map(function(c) { return c.id; }).filter(function(id) { return used.indexOf(id) !== -1; });
    },
    label: function(id) {
      var c = state.data.competitions.find(function(x) { return x.id === id; });
      return isEn() ? c.en : c.zh;
    } },
  { key: 'year', id: 'yearChips',
    options: function() { return awardValues('year').sort(function(a, b) { return b - a; }); }, label: String },
  { key: 'level', id: 'levelChips',
    options: function() { var used = awardValues('level'); return LEVEL_KEYS.filter(function(k) { return used.indexOf(k) !== -1; }); },
    label: function(k) { return UI[state.lang].levels[k]; } },
  { key: 'group', id: 'groupChips',
    options: function() { var used = awardValues('group'); return GROUP_ORDER.filter(function(g) { return used.indexOf(g) !== -1; }); },
    label: itemGroupLabel }
];

function filterButton(label, count, active, disabled) {
  var btn = el('button', 'filter-btn' + (active ? ' active' : ''));
  btn.type = 'button';
  btn.disabled = disabled;
  btn.appendChild(el('span', '', label));
  btn.appendChild(el('span', 'count', String(count)));
  return btn;
}

function renderRow(row) {
  var box = document.getElementById(row.id);
  box.innerHTML = '';
  [ALL].concat(row.options()).forEach(function(code) {
    var active = String(state.f[row.key]) === String(code);
    var count = shopsMatching(filtersWith(row.key, code)).length;
    var btn = filterButton(code === ALL ? t('all') : row.label(code), count, active, count === 0 && !active);
    btn.dataset.code = String(code);
    if (row.tabs) {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.tabIndex = active ? 0 : -1;  // roving tabindex: Tab enters the row once, arrows move inside
    } else {
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    btn.addEventListener('click', function() { setFilter(row.key, code); });
    box.appendChild(btn);
  });
}

// Every row is rebuilt on each change, which would drop keyboard focus to the page top;
// remember which filter button had focus and put it back on the rebuilt one.
function renderFilters() {
  var focused = document.activeElement;
  var refocus = null;
  ROWS.forEach(function(row) {
    var box = document.getElementById(row.id);
    if (focused && box.contains(focused) && focused.dataset.code !== undefined) {
      refocus = { box: box, code: focused.dataset.code };
    }
  });

  ROWS.forEach(renderRow);
  els.cityRow.hidden = !isSet(state.f.state);

  var n = advancedCount();
  els.moreBtnText.textContent = n ? t('moreCount', { n: n }) : t('more');
  els.moreBtn.classList.toggle('has-filters', n > 0);
  els.moreBtn.setAttribute('aria-expanded', state.moreOpen ? 'true' : 'false');
  els.moreFilters.hidden = !state.moreOpen;

  ROWS.forEach(function(row) { shell.revealActive(document.getElementById(row.id)); });
  shell.updateScrollButtons();

  if (refocus) {
    var again = [].slice.call(refocus.box.children).filter(function(b) { return b.dataset.code === refocus.code; })[0];
    if (again && !again.disabled) again.focus({ preventScroll: true });
  }
}

function setFilter(key, value) {
  state.f = filtersWith(key, value);
  refresh(true);
  writeUrl();
  if (key === 'state') showStateOnMap(value);
}

function clearAll() {
  var hadState = isSet(state.f.state);
  state.f = emptyFilters();
  els.searchInput.value = '';
  els.searchClear.hidden = true;
  refresh(true);
  writeUrl();
  if (hadState) shell.showOverview();
}

// Arrow keys, Home and End move through the type tabs and pick the one they land on.
function onTabKey(event) {
  var keys = { ArrowLeft: -1, ArrowRight: 1, Home: 'first', End: 'last' };
  if (!(event.key in keys)) return;
  var tabs = [].slice.call(event.currentTarget.querySelectorAll('[role="tab"]:not(:disabled)'));
  var i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  var step = keys[event.key];
  var next = step === 'first' ? 0 : step === 'last' ? tabs.length - 1 : (i + step + tabs.length) % tabs.length;
  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
}

// ── URL (?state=NSW&year=2025: shareable, kept on reload; UI-PLAN 5) ──
// Values no button offers (?year=1999, a city outside the state) are dropped, not errors.
function readUrl() {
  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { return emptyFilters(); }
  var f = emptyFilters();
  var q = params.get('q');
  if (q) f.q = q.trim().slice(0, SEARCH_MAX);
  var options = {
    state: stateCodes,
    city: function() { return cityNames(f.state); },
    type: ROWS[2].options, comp: ROWS[3].options, year: ROWS[4].options, level: ROWS[5].options, group: ROWS[6].options
  };
  ['state', 'city', 'type', 'comp', 'year', 'level', 'group'].forEach(function(key) {
    var value = params.get(key);
    if (value == null) return;
    var hit = options[key]().filter(function(o) { return String(o) === value; })[0];
    if (hit !== undefined) f[key] = hit;
  });
  return f;
}

// replaceState keeps the Back button for leaving the page, not for undoing each filter.
function writeUrl() {
  try {
    var params = new URLSearchParams(window.location.search);
    FILTER_KEYS.forEach(function(k) { params.delete(k); });
    FILTER_KEYS.forEach(function(k) {
      var value = k === 'q' ? state.f.q.trim() : state.f[k];
      if (isSet(value)) params.set(k, String(value));
    });
    var query = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
  } catch (e) { /* some file:// previews refuse; the filters still work */ }
}

// ── search box (UI-PLAN 3.1) ──
function setupSearch() {
  var timer = null;
  els.searchInput.addEventListener('input', function() {
    els.searchClear.hidden = !els.searchInput.value;
    clearTimeout(timer);
    timer = setTimeout(function() {
      state.f.q = els.searchInput.value.slice(0, SEARCH_MAX);
      refresh(true);
      writeUrl();
    }, SEARCH_DELAY);
  });
  els.searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && els.searchInput.value) {
      event.preventDefault();
      els.searchClear.click();
    }
  });
  els.searchClear.addEventListener('click', function() {
    clearTimeout(timer);
    els.searchInput.value = '';
    els.searchClear.hidden = true;
    state.f.q = '';
    refresh(true);
    writeUrl();
    els.searchInput.focus();
  });
}

// Centre and zoom that fit every store in the state; "all" goes back to the overview.
function showStateOnMap(code) {
  if (code === ALL) {
    shell.showOverview();
    return;
  }
  var locs = [];
  state.data.businesses.forEach(function(b) {
    b.locations.forEach(function(l) { if (l.state === code) locs.push(l); });
  });
  var lats = locs.map(function(l) { return l.lat; });
  var lngs = locs.map(function(l) { return l.lng; });
  var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
  var minLng = Math.min.apply(null, lngs), maxLng = Math.max.apply(null, lngs);
  // At zoom z the world is 256 × 2^z px wide; latitude degrees are wider on screen, hence × 1.3.
  var span = Math.max(maxLng - minLng, (maxLat - minLat) * 1.3, 0.01);
  var zoom = Math.floor(Math.log(AREA_FIT_PX * 360 / (256 * span)) / Math.LN2);
  var info = STATES[code] || { name: code, zoom: 6 };
  shell.showArea({
    lat: ((minLat + maxLat) / 2).toFixed(5),
    lng: ((minLng + maxLng) / 2).toFixed(5),
    zoom: Math.max(5, Math.min(12, zoom)),
    query: info.name + ', Australia',
    fallbackZoom: info.zoom
  });
}

// "NSW · Sydney × 烘焙 · 3 家 · 另有 2 個條件" + ✕ 全部清除 (UI-PLAN 5).
function renderResultLine(businesses) {
  var f = state.f;
  var where = isSet(f.state) ? f.state + (isSet(f.city) ? ' · ' + f.city : '') : t('allStates');
  var typeText = isSet(f.type) ? typeGroupLabel(f.type) : t('allTypes');
  var text = t(businesses.length === 1 ? 'resultOne' : 'result', { s: where, c: typeText, n: businesses.length });
  var extra = (isSet(f.q) ? 1 : 0) + advancedCount();
  if (extra) text += t(extra === 1 ? 'resultMoreOne' : 'resultMore', { n: extra });
  els.resultText.textContent = text;
  els.clearAll.hidden = !anyFilterSet();
}

// ── shop cards ──
// <details> that remember being open across re-renders (filters, language switch).
// Until the reader toggles it, a details is open when defaultOpen says so.
function rememberedDetails(className, key, defaultOpen) {
  var details = el('details', className);
  details.open = key in state.open ? state.open[key] : !!defaultOpen;
  details.addEventListener('toggle', function() { state.open[key] = details.open; });
  return details;
}

// Highest honour: champion, then a World's 100 Best place (its best rank), then gold, then 1st.
function renderBadge(counts) {
  var key = counts.champion ? 'champion' : counts.top100 ? 'top100' : counts.gold ? 'gold' : 'first';
  var badge = el('span', 'award-badge award-badge-' + key);
  badge.appendChild(levelLabel(key, key === 'top100' ? counts.best100 : null));
  return badge;
}

// A location type that every store shares goes on the card once (UI-PLAN 3.4b).
function sharedLocationType(business) {
  var types = unique(business.locations.map(function(l) { return l.type; }));
  return types.length === 1 && UI[state.lang].locTypes[types[0]] ? types[0] : null;
}

function renderTags(business) {
  var L = UI[state.lang];
  var tags = el('div', 'shop-tags');
  tags.appendChild(renderBadge(headlineCounts(business)));
  business.types.forEach(function(type) { tags.appendChild(el('span', 'tag', L.types[type] || type)); });
  if (L.scopes[business.scope]) tags.appendChild(el('span', 'tag', L.scopes[business.scope]));
  var shared = sharedLocationType(business);
  if (shared) tags.appendChild(el('span', 'tag', L.locTypes[shared]));
  return tags;
}

// Headline awards only (UI-PLAN 3.6): "冠軍 2 · 金牌 8 · 第 1 名 2 · 2024–2026".
function renderSummary(business) {
  var counts = headlineCounts(business);
  var parts = [];
  if (counts.top100) parts.push(levelText('top100', counts.best100));  // a rank, not a count
  ['champion', 'gold', 'first'].forEach(function(key) {
    if (counts[key]) parts.push(UI[state.lang].levels[key] + ' ' + counts[key]);
  });
  var top = business.awards.filter(function(a) { return a.tier === 'top'; });
  parts.push(yearRange(top.length ? top : business.awards));
  return el('div', 'award-summary', parts.join(' · '));
}

// ── winning items (what to order) ──
// Headline awards merged per item: champions first, then most awards, then most recent.
function winningItems(business) {
  var byKey = {};
  var items = [];
  business.awards.forEach(function(a) {
    if (a.tier !== 'top') return;
    var name = itemName(business, a);
    if (!name) return;
    var key = name.toLowerCase().replace(/s$/, '');  // "Croissants" = "Croissant"
    var item = byKey[key];
    if (!item) {
      item = byKey[key] = { name: name, counts: { champion: 0, gold: 0, first: 0 }, total: 0, year: 0 };
      items.push(item);
    }
    item.counts[levelKey(a)] += 1;
    item.total += 1;
    item.year = Math.max(item.year, a.year);
  });
  return items.sort(function(a, b) {
    return (b.counts.champion > 0) - (a.counts.champion > 0) || (b.total - a.total) || (b.year - a.year);
  });
}

// "冠軍＋金牌 ×2 · 2026": the awards the item won, and the most recent year (UI-PLAN 3.7).
function itemAwardsText(item) {
  var short = UI[state.lang].levelsShort;
  var parts = ['champion', 'gold', 'first'].filter(function(key) { return item.counts[key]; }).map(function(key) {
    return short[key] + (item.counts[key] > 1 ? ' ×' + item.counts[key] : '');
  });
  return parts.join(isEn() ? ' + ' : '＋') + ' · ' + item.year;
}

function renderItems(business) {
  var items = winningItems(business);
  if (!items.length) return null;
  var box = el('section', 'award-items');
  box.appendChild(el('div', 'award-items-title', t('items')));
  var list = el('ul', 'award-items-list');
  items.slice(0, ITEMS_SHOWN).forEach(function(item) {
    var li = el('li', 'award-item');
    li.appendChild(el('span', 'award-item-name', item.name));
    li.appendChild(el('span', 'award-item-awards', itemAwardsText(item)));
    list.appendChild(li);
  });
  box.appendChild(list);
  if (items.length > ITEMS_SHOWN) box.appendChild(el('div', 'award-items-more', t('moreItems', { n: items.length - ITEMS_SHOWN })));
  return box;
}

// Item first (UI-PLAN 3.4, 2026-11-01): "金牌 91.5 · Olive Sourdough", then the short class
// name, year, competition, store and sources in small text. Without a product the class
// name is the item.
function renderAwardRow(business, award) {
  var comp = state.data.competitions.find(function(c) { return c.id === award.comp; });
  var compName = isEn() ? comp.en : comp.zh;
  var cls = shortClass(award.category);
  var row = el('div', 'award-row');

  var line = el('div', 'award-line');
  if (cls !== award.category) line.title = award.category;
  var level = el('span', 'award-level');
  level.appendChild(levelLabel(levelKey(award), award.level === 'ranking' ? award.rank : null));
  if (award.score != null) level.appendChild(document.createTextNode(' ' + award.score));
  line.appendChild(level);
  line.appendChild(document.createTextNode(' · '));
  line.appendChild(el('span', 'award-item-title', award.product ? titleCase(award.product) : cls));
  row.appendChild(line);

  var meta = el('div', 'award-meta');
  var parts = award.product ? [cls] : [];
  parts.push(award.year + ' · ' + compName);
  var store = award.locationId && locationById(business, award.locationId);
  if (store) parts.push(t('awardStore', { s: store.name }));
  if (award.relation === 'staff_entry' && award.recipient) parts.push(t('staffEntry', { r: award.recipient }));
  meta.appendChild(document.createTextNode(parts.join(' · ') + ' · '));
  var what = award.year + ' ' + compName + ' ' + UI[state.lang].levels[levelKey(award)] + ' ' + award.category;
  award.sources.forEach(function(source) {
    meta.appendChild(externalLink('award-source', t('source'), source.url, t('sourceAria', { a: what })));
    meta.appendChild(document.createTextNode(' · '));
    if (source.archive) {
      meta.appendChild(externalLink('award-source', t('archive'), source.archive, t('archiveAria', { a: what })));
      meta.appendChild(document.createTextNode(' · '));
    }
  });
  meta.appendChild(el('span', 'award-verified', t('verified', { d: award.verifiedAt })));
  row.appendChild(meta);
  return row;
}

// The shop blurb opens the award details (UI-PLAN 3.6), then headline awards, then also
// recommended, folded by default (UI-PLAN 3.4, 2026-11-01).
// With award filters on, the details open by themselves and the awards that match come
// first, marked (UI-PLAN 5); the open state is remembered per filter combination.
function renderDetails(business) {
  var awardFilter = AwardsFilter.hasAwardFilter(state.f);
  var sig = awardFilter ? ':' + AwardsFilter.AWARD_KEYS.map(function(k) { return state.f[k]; }).join('|') : '';
  var details = rememberedDetails('award-details', 'awards:' + business.id + sig, awardFilter);
  details.appendChild(el('summary', '', t('details', { n: business.awards.length })));
  var desc = isEn() ? business.descEn : business.descZh;
  if (desc) details.appendChild(el('p', 'award-desc', desc));

  var isMatch = function(a) { return awardFilter && AwardsFilter.awardMatches(a, state.f); };
  var byTier = function(tier) {
    return business.awards.filter(function(a) { return a.tier === tier; }).sort(function(a, b) {
      return (isMatch(b) - isMatch(a)) || compareAwards(a, b);
    });
  };
  var top = byTier('top');
  if (top.length) {
    details.appendChild(el('div', 'award-group', t('groupTop')));
    top.forEach(function(a) {
      var row = renderAwardRow(business, a);
      if (isMatch(a)) {
        row.classList.add('is-match');
        row.appendChild(el('span', 'visually-hidden', t('matchNote')));
      }
      details.appendChild(row);
    });
  }
  var also = byTier('also');
  if (also.length) {
    var fold = rememberedDetails('award-also', 'also:' + business.id);
    fold.appendChild(el('summary', '', t('groupAlsoCount', { n: also.length })));
    also.forEach(function(a) { fold.appendChild(renderAwardRow(business, a)); });
    details.appendChild(fold);
  }
  return details;
}

// "<suburb> · <store name>", unless the name already says the suburb; a factory shop
// among other store types carries the type in its name (UI-PLAN 3.5).
function storeLabel(business, loc) {
  var label = loc.name.indexOf(loc.suburb) !== -1 ? loc.name : loc.suburb + ' · ' + loc.name;
  if (loc.type === 'factory_shop' && !sharedLocationType(business)) label += ' ' + UI[state.lang].locTypes.factory_shop;
  return label;
}

function renderStoreRow(business, loc) {
  var label = storeLabel(business, loc);
  var row = el('div', 'store-row');
  var mapBtn = el('button', 'pill pill-map', '📍 ' + label);
  mapBtn.type = 'button';
  mapBtn.dataset.id = business.id;
  mapBtn.dataset.loc = loc.id;
  mapBtn.setAttribute('aria-label', t('mapAria', { s: business.name + ' ' + label }));
  row.appendChild(mapBtn);
  row.appendChild(externalLink('pill pill-ext', '↗ Maps', loc.mapsUrl, t('mapsAria', { s: business.name + ' ' + label })));
  return row;
}

// Winning stores first, so they stay visible when the rest fold away.
function renderStores(business) {
  var winners = business.awards.map(function(a) { return a.locationId; });
  var locs = business.locations.filter(function(l) { return winners.indexOf(l.id) !== -1; })
    .concat(business.locations.filter(function(l) { return winners.indexOf(l.id) === -1; }));

  var wrap = el('div', 'store-list');
  wrap.appendChild(el('div', 'store-head', t('stores')));
  locs.slice(0, STORES_SHOWN).forEach(function(loc) { wrap.appendChild(renderStoreRow(business, loc)); });
  if (locs.length > STORES_SHOWN) {
    var more = rememberedDetails('store-more', 'stores:' + business.id);
    more.appendChild(el('summary', '', t('moreStores', { n: locs.length - STORES_SHOWN })));
    locs.slice(STORES_SHOWN).forEach(function(loc) { more.appendChild(renderStoreRow(business, loc)); });
    wrap.appendChild(more);
  }
  return wrap;
}

function renderCard(business) {
  var card = el('article', 'shop-card' + (business.id === state.selectedId ? ' selected' : ''));
  card.id = 'shop-' + business.id;
  card.dataset.id = business.id;

  var head = el('div', 'shop-head');
  var title = el('div', 'shop-title');
  title.appendChild(el('h2', 'shop-name', business.name));
  var locs = business.locations;
  title.appendChild(el('div', 'shop-meta', t('meta', {
    c: unique(locs.map(function(l) { return l.city; })).join(isEn() ? ', ' : '、'),
    s: unique(locs.map(function(l) { return l.state; })).join(' / '),
    n: locs.length
  })));
  head.appendChild(title);
  card.appendChild(head);

  card.appendChild(renderTags(business));
  card.appendChild(renderSummary(business));
  var items = renderItems(business);
  if (items) card.appendChild(items);
  card.appendChild(renderDetails(business));
  card.appendChild(renderStores(business));
  return card;
}

function renderList(businesses) {
  els.sidebarBody.innerHTML = '';

  if (!businesses.length) {
    var empty = el('div', 'tips-box');
    empty.appendChild(el('div', 'tips-title', t('emptyTitle')));
    empty.appendChild(el('div', 'tips-text', t('emptyText')));
    els.sidebarBody.appendChild(empty);
    return;
  }

  var list = el('div', 'shop-list');
  businesses.forEach(function(b) { list.appendChild(renderCard(b)); });
  els.sidebarBody.appendChild(list);
  // One point per line: six sentences in one block were hard to read.
  var notes = el('ul', 'data-footnote awards-footnote');
  UI[state.lang].footnote.concat(t('footnoteAsOf', { d: state.data.dataAsOf })).forEach(function(line) {
    notes.appendChild(el('li', '', line));
  });
  els.sidebarBody.appendChild(notes);
}

function markSelected(id) {
  state.selectedId = id;
  els.sidebarBody.querySelectorAll('.shop-card').forEach(function(card) {
    card.classList.toggle('selected', card.dataset.id === id);
  });
}

// 📍 pill: the only card control that moves the map.
function previewOnMap(id, locId) {
  var business = businessById(id);
  var loc = business && locationById(business, locId);
  if (!loc) return;
  markSelected(id);
  shell.setActiveChip(id);
  shell.previewPlace(business.name + ' ' + loc.address);
}

// ── render ──
function renderStaticText() {
  var data = state.data;
  var stores = data.businesses.reduce(function(n, b) { return n + b.locations.length; }, 0);
  var awards = [];
  data.businesses.forEach(function(b) { awards = awards.concat(b.awards); });
  // Each " · " part stays whole, so a narrow phone wraps between parts, never inside "2024–2026".
  var subtitle = t('subtitle', { n: data.businesses.length, m: stores, y: yearRange(awards) });
  els.pageSubtitle.textContent = '';
  subtitle.split(' · ').forEach(function(part, i) {
    if (i) els.pageSubtitle.appendChild(document.createTextNode(' · '));
    els.pageSubtitle.appendChild(el('span', 'nowrap', part));
  });
  Object.keys(LABEL_IDS).forEach(function(id) { document.getElementById(id).textContent = t(LABEL_IDS[id]); });
  els.searchLabel.textContent = t('search');
  els.searchInput.placeholder = t('searchPlaceholder');
  els.searchClear.setAttribute('aria-label', t('searchClear'));
  els.clearAll.textContent = t('clearAll');
  els.clearAll.setAttribute('aria-label', t('clearAllAria'));
}

function refresh(filtersChanged) {
  var businesses = filteredBusinesses();
  if (state.selectedId && !businesses.some(function(b) { return b.id === state.selectedId; })) {
    state.selectedId = null;
  }
  renderFilters();
  renderResultLine(businesses);
  renderList(businesses);
  if (filtersChanged) els.sidebarBody.scrollTop = 0;
  shell.refreshChips(businesses);
}

// The shell has already re-rendered its own text and keeps the list's scroll position.
function switchLanguage(lang) {
  state.lang = lang;
  renderStaticText();
  refresh(false);
}

// Folding resizes the list, which can nudge its scrollTop (the browser clamps it near the
// end); scroll events during the fold animation are ignored so it doesn't flip back and forth.
function setupSheetFold() {
  var fold = document.getElementById('sheetFold');
  var sidebar = document.getElementById('sidebar');
  var body = els.sidebarBody;
  var last = 0;
  var lockUntil = 0;

  function setFolded(folded) {
    if (fold.classList.contains('folded') === folded) return;
    fold.classList.toggle('folded', folded);
    lockUntil = Date.now() + FOLD_MS + 50;
  }

  body.addEventListener('scroll', function() {
    var y = body.scrollTop;
    if (!PHONE.matches || y <= FOLD_TOP) setFolded(false);
    else if (Date.now() >= lockUntil) {
      if (y > last + FOLD_STEP) setFolded(true);
      else if (y < last - FOLD_STEP) setFolded(false);
    }
    last = y;
  }, { passive: true });

  // A collapsed sheet shows the title, so unfold whenever the sheet closes.
  new MutationObserver(function() {
    if (!sidebar.classList.contains('expanded')) setFolded(false);
  }).observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  if (PHONE.addEventListener) {
    PHONE.addEventListener('change', function() { if (!PHONE.matches) setFolded(false); });
  }
}

function setupEvents() {
  els.sidebarBody.addEventListener('click', function(event) {
    var mapBtn = event.target.closest('.pill-map');
    if (mapBtn) previewOnMap(mapBtn.dataset.id, mapBtn.dataset.loc);
  });
  els.typeTabs.addEventListener('keydown', onTabKey);
  els.moreBtn.addEventListener('click', function() {
    state.moreOpen = !state.moreOpen;
    renderFilters();
  });
  els.clearAll.addEventListener('click', clearAll);
  setupSearch();
  setupSheetFold();
}

function init(data, config) {
  state.data = data;
  state.config = config;
  Object.keys(UI).forEach(function(lang) {
    Object.assign(UI[lang], config.ui[lang]);
  });
  shell = ListMapShell.create({
    ui: UI,
    overviewUrl: data.myMapsEmbedUrl,
    fallbackPlace: config.fallbackPlace,
    fallbackZoom: config.fallbackZoom,
    onLangChange: switchLanguage,
    onOverview: function() { markSelected(null); }
  });
  state.lang = shell.lang();
  state.f = readUrl();
  state.moreOpen = advancedCount() > 0;  // a shared link with award filters shows them
  els.searchInput.value = state.f.q;
  els.searchClear.hidden = !state.f.q;
  renderStaticText();
  setupEvents();
  refresh(true);
  writeUrl();  // drops values readUrl() ignored, e.g. ?year=1999
  if (isSet(state.f.state)) showStateOnMap(state.f.state);
  else shell.showOverview();
}

init(PAGE_DATA, PAGE_CONFIG);
