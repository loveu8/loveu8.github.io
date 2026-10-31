// Award-winning shops map (travel/australia/awards/) — renders PAGE_DATA (the page's
// generated data.js) into the list-map shell, using PAGE_CONFIG (page.js) for page text,
// the type filter groups and the fallback map view. The map, sheet, chip strip, divider
// and back-to-top are scripts/list-map-shell.js; this file owns the filters and the cards.
// Card layout decisions: travel/australia/awards/UI-PLAN.md 3.3–3.7.

var ALL = 'all';
var STORES_SHOWN = 2;  // the rest go into a "N more stores" toggle
var ITEMS_SHOWN = 3;   // winning items on the card; the rest are in the award details
var LEVEL_ORDER = { champion: 0, medal: 1, placing: 1 };
// Champion titles that name no item (best in show, or a whole class).
var NO_ITEM = /^(champion )?(product of show|overall champion|viennoiserie)$/i;
var SMALL_WORDS = ['a', 'an', 'and', 'au', 'de', 'di', 'in', 'of', 'on', 'or', 'the', 'with'];

// Each page's PAGE_CONFIG.ui[lang] must add `title` and `mapTitle`, and may override any key here or in the shell.
var UI = {
  'zh-TW': {
    subtitle: '{n} 家 · {m} 間門市 · 官方結果 {y}',
    state: '州別', type: '類型', all: '全部', allStates: '全部州別', allTypes: '全部類型',
    result: '{s} × {c} · {n} 家',
    emptyTitle: '這個組合沒有店家', emptyText: '換一個州別或類型看看；州別按鈕上的數字是目前類型下的家數。',
    meta: '{c} · {s} · {n} 間門市', yearOne: '{y} 年',
    levels: { champion: '冠軍', gold: '金牌', silver: '銀牌', first: '第 1 名', second: '第 2 名' },
    levelsShort: { champion: '冠軍', gold: '金牌', first: '第 1 名' },
    items: '得獎品項', moreItems: '另有 {n} 項，見獎項明細',
    details: '獎項明細（{n}）', groupTop: '招牌', groupAlso: '也推薦',
    awardStore: '{s} 店', staffEntry: '參賽者：{r}',
    source: '官方結果 ↗', archive: '存檔 ↗', verified: '查證 {d}',
    sourceAria: '{a} 的官方來源（另開新頁）', archiveAria: '{a} 的官方來源存檔（另開新頁）',
    stores: '門市', moreStores: '還有 {n} 間門市',
    mapAria: '在地圖上查看：{s}', mapsAria: '在 Google Maps 開啟：{s}',
    types: { bakery: '烘焙', cafe: '咖啡廳', roaster: '烘豆' },
    scopes: { supermarket: '超市內烘焙', chain_franchise: '連鎖加盟店' },
    locTypes: { supermarket_counter: '超市內專櫃', factory_shop: '工廠門市' },
    footnote: '獎項來自各賽事官方公布的結果，每一筆都附來源連結和查證日期。' +
      '卡片列出冠軍、金牌、第 1 名（招牌）和銀牌、第 2 名（也推薦），銅牌和第 3 名不列。' +
      '獎項代表得獎當年那間店的水準；連鎖加盟店只列得獎的那一間；超市的獎沒有指定門市時，列出它有烘焙部的門市。' +
      '州別與類型篩選只作用在清單，地圖固定顯示全部門市。'
  },
  en: {
    subtitle: '{n} shops · {m} stores · official results {y}',
    state: 'State', type: 'Type', all: 'All', allStates: 'All states', allTypes: 'All types',
    result: '{s} × {c} · {n} shops',
    emptyTitle: 'No shops match', emptyText: 'Try another state or type; the numbers on the state buttons count shops for the current type.',
    meta: '{c} · {s} · {n} stores', yearOne: '{y}',
    levels: { champion: 'Champion', gold: 'Gold medal', silver: 'Silver medal', first: '1st place', second: '2nd place' },
    levelsShort: { champion: 'Champion', gold: 'Gold', first: '1st' },
    items: 'Winning items', moreItems: '{n} more in the award details',
    details: 'Award details ({n})', groupTop: 'Headline awards', groupAlso: 'Also recommended',
    awardStore: '{s} store', staffEntry: 'Entrant: {r}',
    source: 'Official results ↗', archive: 'Archive ↗', verified: 'Checked {d}',
    sourceAria: 'Official source for {a} (opens in a new tab)', archiveAria: 'Archived official source for {a} (opens in a new tab)',
    stores: 'Stores', moreStores: '{n} more stores',
    mapAria: 'Show on map: {s}', mapsAria: 'Open in Google Maps: {s}',
    types: { bakery: 'Bakery', cafe: 'Café', roaster: 'Roaster' },
    scopes: { supermarket: 'In-store supermarket bakery', chain_franchise: 'Franchise store' },
    locTypes: { supermarket_counter: 'Supermarket counter', factory_shop: 'Factory shop' },
    footnote: 'Awards come from each competition’s official results; every row links to its source and the date it was checked. ' +
      'Cards list champions, gold medals and 1st places (headline awards) plus silver medals and 2nd places (also recommended); bronze and 3rd places are left out. ' +
      'An award reflects that shop in the year it won; for franchises only the winning store is listed; when a supermarket’s award names no store, every store with its own bakery is listed. ' +
      'State and type filters apply to the list only; the map always shows every store.'
  }
};

var state = {
  data: null,
  config: null,
  lang: 'zh-TW',
  stateCode: ALL,
  typeGroup: ALL,
  selectedId: null,
  open: {}  // ids of open <details> (award details, more stores), kept across re-renders
};

var shell = null;  // ListMapShell instance, created in init()

var els = {
  sidebarBody: document.getElementById('sidebarBody'),
  pageSubtitle: document.getElementById('pageSubtitle'),
  stateLabel: document.getElementById('stateLabel'),
  typeLabel: document.getElementById('typeLabel'),
  stateChips: document.getElementById('stateChips'),
  typeTabs: document.getElementById('typeTabs'),
  resultLine: document.getElementById('resultLine')
};

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

// Official product names are often all caps; show them in Title Case, small words kept lower.
function titleCase(text) {
  if (!text || text !== text.toUpperCase()) return text;
  return text.toLowerCase().replace(/(^|[\s\-(\/])([a-z]+)/g, function(m, sep, word, offset) {
    if (offset > 0 && sep === ' ' && SMALL_WORDS.indexOf(word) !== -1) return m;
    return sep + word.charAt(0).toUpperCase() + word.slice(1);
  });
}

function yearRange(awards) {
  var years = awards.map(function(a) { return a.year; });
  var lo = Math.min.apply(null, years);
  var hi = Math.max.apply(null, years);
  return lo === hi ? t('yearOne', { y: lo }) : lo + '–' + hi;
}

// ── awards ──
// Level keys: champion, gold, silver (medal_by_score), first, second (placing).
function levelKey(award) {
  if (award.level === 'champion') return 'champion';
  if (award.level === 'medal') return award.medal;
  return award.rank === 1 ? 'first' : 'second';
}

function headlineCounts(business) {
  var counts = { champion: 0, gold: 0, first: 0 };
  business.awards.forEach(function(a) {
    if (a.tier === 'top') counts[levelKey(a)] += 1;
  });
  return counts;
}

function latestYear(business) {
  return Math.max.apply(null, business.awards.map(function(a) { return a.year; }));
}

// UI-PLAN 5: champions → gold + 1st places → most recent year → name.
function compareBusinesses(a, b) {
  var ca = headlineCounts(a);
  var cb = headlineCounts(b);
  return (cb.champion - ca.champion) ||
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

// Level text with the 🏆 hidden from screen readers (the word says it).
function levelLabel(key) {
  var frag = document.createDocumentFragment();
  if (key === 'champion') {
    var cup = el('span', '', '🏆 ');
    cup.setAttribute('aria-hidden', 'true');
    frag.appendChild(cup);
  }
  frag.appendChild(document.createTextNode(UI[state.lang].levels[key]));
  return frag;
}

// ── filters (list only — the My Maps embed cannot be filtered from the page) ──
function matches(business, stateCode, typeGroup) {
  var stateOk = stateCode === ALL || business.locations.some(function(l) { return l.state === stateCode; });
  var typeOk = typeGroup === ALL || business.types.some(function(type) {
    return typeGroupByCode(typeGroup).types.indexOf(type) !== -1;
  });
  return stateOk && typeOk;
}

function countWhere(stateCode, typeGroup) {
  return state.data.businesses.filter(function(b) { return matches(b, stateCode, typeGroup); }).length;
}

function filteredBusinesses() {
  return state.data.businesses
    .filter(function(b) { return matches(b, state.stateCode, state.typeGroup); })
    .sort(compareBusinesses);
}

// States with the most shops first.
function stateCodes() {
  var codes = [];
  state.data.businesses.forEach(function(b) {
    b.locations.forEach(function(l) { if (codes.indexOf(l.state) === -1) codes.push(l.state); });
  });
  return codes.sort(function(a, b) {
    return (countWhere(b, ALL) - countWhere(a, ALL)) || a.localeCompare(b);
  });
}

function filterButton(label, count, active, disabled) {
  var btn = el('button', 'filter-btn' + (active ? ' active' : ''));
  btn.type = 'button';
  btn.disabled = disabled;
  btn.appendChild(el('span', '', label));
  btn.appendChild(el('span', 'count', String(count)));
  return btn;
}

function renderFilters() {
  els.stateChips.innerHTML = '';
  [ALL].concat(stateCodes()).forEach(function(code) {
    var active = state.stateCode === code;
    var count = countWhere(code, state.typeGroup);
    var btn = filterButton(code === ALL ? t('all') : code, count, active, count === 0 && !active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.addEventListener('click', function() {
      state.stateCode = code;
      refresh(true);
    });
    els.stateChips.appendChild(btn);
  });

  els.typeTabs.innerHTML = '';
  [ALL].concat(state.config.typeGroups.map(function(g) { return g.code; })).forEach(function(code) {
    var active = state.typeGroup === code;
    var count = countWhere(ALL, code);
    var btn = filterButton(code === ALL ? t('all') : typeGroupLabel(code), count, active, count === 0 && !active);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.addEventListener('click', function() {
      state.typeGroup = code;
      refresh(true);
    });
    els.typeTabs.appendChild(btn);
  });

  shell.revealActive(els.stateChips);
  shell.revealActive(els.typeTabs);
  shell.updateScrollButtons();
}

function renderResultLine(businesses) {
  var stateText = state.stateCode === ALL ? t('allStates') : state.stateCode;
  var typeText = state.typeGroup === ALL ? t('allTypes') : typeGroupLabel(state.typeGroup);
  els.resultLine.textContent = t('result', { s: stateText, c: typeText, n: businesses.length });
}

// ── shop cards ──
// <details> that remember being open across re-renders (filters, language switch).
function rememberedDetails(className, key) {
  var details = el('details', className);
  details.open = !!state.open[key];
  details.addEventListener('toggle', function() { state.open[key] = details.open; });
  return details;
}

function renderBadge(counts) {
  var key = counts.champion ? 'champion' : counts.gold ? 'gold' : 'first';
  var badge = el('span', 'award-badge award-badge-' + key);
  badge.appendChild(levelLabel(key));
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
  ['champion', 'gold', 'first'].forEach(function(key) {
    if (counts[key]) parts.push(UI[state.lang].levels[key] + ' ' + counts[key]);
  });
  var top = business.awards.filter(function(a) { return a.tier === 'top'; });
  parts.push(yearRange(top.length ? top : business.awards));
  return el('div', 'award-summary', parts.join(' · '));
}

// ── winning items (what to order) ──
// The item an award names: the product if the result gives one (minus a repeated brand
// prefix), else the class name for placings and class champions (minus "- Minimum 200gm",
// examples in brackets, etc.). Best-in-show titles name no item.
function itemName(business, award) {
  var text;
  if (award.product) {
    text = award.product;
    var brand = business.name.toUpperCase() + ' ';
    if (text.toUpperCase().indexOf(brand) === 0) text = text.slice(brand.length);
  } else {
    if (award.level === 'champion' && NO_ITEM.test(award.category)) return null;
    text = award.category.replace(/^Champion /, '').replace(/\s*-\s*Minimum.*$/i, '').replace(/\s*\(.*$/, '').replace(/,.*$/, '');
  }
  return titleCase(text.trim()) || null;
}

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

function renderAwardRow(business, award) {
  var comp = state.data.competitions.find(function(c) { return c.id === award.comp; });
  var compName = isEn() ? comp.en : comp.zh;
  var row = el('div', 'award-row');

  var line = el('div', 'award-line');
  var level = el('span', 'award-level');
  level.appendChild(levelLabel(levelKey(award)));
  if (award.score != null) level.appendChild(document.createTextNode(' ' + award.score));
  line.appendChild(level);
  line.appendChild(document.createTextNode(' · ' + award.category));
  if (award.product) line.appendChild(document.createTextNode(' · ' + titleCase(award.product)));
  row.appendChild(line);

  var meta = el('div', 'award-meta');
  var parts = [award.year + ' · ' + compName];
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
  meta.appendChild(document.createTextNode(t('verified', { d: award.verifiedAt })));
  row.appendChild(meta);
  return row;
}

// The shop blurb opens the award details (UI-PLAN 3.6), then headline awards, then also recommended.
function renderDetails(business) {
  var details = rememberedDetails('award-details', 'awards:' + business.id);
  details.appendChild(el('summary', '', t('details', { n: business.awards.length })));
  var desc = isEn() ? business.descEn : business.descZh;
  if (desc) details.appendChild(el('p', 'award-desc', desc));
  [['top', 'groupTop'], ['also', 'groupAlso']].forEach(function(group) {
    var awards = business.awards.filter(function(a) { return a.tier === group[0]; }).sort(compareAwards);
    if (!awards.length) return;
    details.appendChild(el('div', 'award-group', t(group[1])));
    awards.forEach(function(a) { details.appendChild(renderAwardRow(business, a)); });
  });
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
  els.sidebarBody.appendChild(el('p', 'data-footnote', t('footnote')));
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
  els.pageSubtitle.textContent = t('subtitle', { n: data.businesses.length, m: stores, y: yearRange(awards) });
  els.stateLabel.textContent = t('state');
  els.typeLabel.textContent = t('type');
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

function setupEvents() {
  els.sidebarBody.addEventListener('click', function(event) {
    var mapBtn = event.target.closest('.pill-map');
    if (mapBtn) previewOnMap(mapBtn.dataset.id, mapBtn.dataset.loc);
  });
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
  renderStaticText();
  setupEvents();
  refresh(true);
  shell.showOverview();
}

init(PAGE_DATA, PAGE_CONFIG);
