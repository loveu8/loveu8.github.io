// List-map pages (e.g. travel/australia/brisbane/bakery/) — renders PAGE_DATA
// (the page's generated data.js) into the Noosa-style map + sidebar shell, using
// PAGE_CONFIG (the page's hand-written page.js) for page text, tasting fields,
// currency and the fallback map place. Map: a Google My Maps embed showing every
// shop (PAGE_DATA.myMapsEmbedUrl); 📍 swaps in the free single-place Google embed.
// Bilingual (zh-TW / en). Theme, language choice and the two toggles live in
// scripts/site.js. The map, sheet, chip strip, divider and lightbox are
// scripts/list-map-shell.js; this file owns the filters and the shop cards.

var MEDALS = ['🥇', '🥈', '🥉'];
var ALL = 'all';
// An item is ranked only when at least this many reviews mention it and they say 大家推薦; the rest
// go into one grey "也有人提到" line, without stars (CARD-PLAN Q3/Q4: Airbnb, App Store and Steam
// also show no score below a few reviews).
var MIN_MENTIONS = 5;

// Shared UI strings (the shell's own strings live in list-map-shell.js). Each
// page's PAGE_CONFIG.ui[lang] must add `title` and `mapTitle`, and may override
// any key here or in the shell.
var UI = {
  'zh-TW': {
    subtitle: '{n} 家 · Google 資料 {d}',
    category: '分類', region: '區域', all: '全部', allCats: '全部分類', allRegions: '全部區域',
    result: '{c} × {r} · {n} 家',
    emptyTitle: '這個組合沒有店家', emptyText: '換一個區域或分類看看；區域按鈕上的數字是目前分類下的家數。',
    top3Rec: '{c} 大家推薦', alsoMentioned: '也有人提到：', mediaPicks: '媒體推薦：', listSep: '、',
    mentions: '{n} 則提到',
    gap: '其餘款式的評論資料不足', none: '評論資料不足', target: '我想吃：', note: '訪前提醒：', tasted: '✅ 已試吃', beans: '☕ 豆子：',
    tasting: { date: '試吃', average: '平均' },
    reviewsLine: '{n} 則評論', pick: '精選', ratingLabel: 'Google 評分 ',
    tagFilter: '只看{c}', styleClear: '取消風格篩選', mapAria: '在地圖上查看：{s}', mapsAria: '在 Google Maps 開啟：{s}',
    igAria: '{s} 的 Instagram', source: '資料來源', viewPhoto: '查看照片：{s}',
    foldOpen: '🔍 篩選', foldOpenAria: '展開分類和區域篩選',
    footnote: 'Google 評分與「N 則提到」為 {d} 的 Google Maps 評論資料，評論多的店為抽樣。' +
      '「大家推薦」是被 5 則以上評論提到、這些評論平均 4.5 星以上而且負評不到一成的款式，依提到次數排序；' +
      '「★」是這些評論的平均星等，不是對款式本身的評分。' +
      '「也有人提到」是提到的評論不到 5 則、或評價沒有達到推薦標準的款式，依提到次數排序，不給星等；「媒體推薦」只有媒體資料。' +
      '「精選」是評分高、又有媒體或社群推薦的店，排在前面。' +
      '分類與區域篩選只作用在清單，地圖固定顯示全部店家。'
  },
  en: {
    subtitle: '{n} shops · Google data {d}',
    category: 'Type', region: 'Area', all: 'All', allCats: 'All types', allRegions: 'All areas',
    result: '{c} × {r} · {n} shops',
    emptyTitle: 'No shops match', emptyText: 'Try another area or type; the numbers on the area buttons count shops for the current type.',
    top3Rec: '{c} · Recommended', alsoMentioned: 'Also mentioned: ', mediaPicks: 'Media picks: ', listSep: ', ',
    mentions: '{n} mentions',
    gap: 'Not enough reviews for more items', none: 'Not enough reviews', target: 'I want to try: ', note: 'Before you go: ', tasted: '✅ Tasted', beans: '☕ Beans: ',
    tasting: { date: 'Tasted', average: 'Average' },
    reviewsLine: '{n} reviews', pick: 'Featured', ratingLabel: 'Google rating ',
    tagFilter: 'Show only {c}', styleClear: 'Clear style filter', mapAria: 'Show on map: {s}', mapsAria: 'Open in Google Maps: {s}',
    igAria: '{s} on Instagram', source: 'Source', viewPhoto: 'View photo: {s}',
    foldOpen: '🔍 Filter', foldOpenAria: 'Show type and area filters',
    footnote: 'Google ratings and “N mentions” come from Google Maps reviews as of {d}; shops with many reviews were sampled. ' +
      '“Recommended” items are mentioned in 5 or more reviews that average 4.5★ or more with under 10% low scores, ordered by mentions; ' +
      '★ is the average of those reviews, not a rating of the item itself. ' +
      '“Also mentioned” items have fewer than 5 mentions or reviews below that bar, ordered by mentions and shown without stars; “Media picks” come from media only. ' +
      '“Featured” shops rate highly and are backed by media or community picks; they come first. ' +
      'Type and area filters apply to the list only; the map always shows every shop.'
  }
};

var state = {
  data: null,
  config: null,
  lang: 'zh-TW',
  category: ALL,
  region: ALL,
  style: null,  // a card's style tag (風格標籤) clicked as a filter; null = off
  selectedId: null
};

var shell = null;  // ListMapShell instance, created in init()

var els = {
  sidebarBody: document.getElementById('sidebarBody'),
  pageSubtitle: document.getElementById('pageSubtitle'),
  categoryLabel: document.getElementById('categoryLabel'),
  regionLabel: document.getElementById('regionLabel'),
  categoryTabs: document.getElementById('categoryTabs'),
  regionChips: document.getElementById('regionChips'),
  resultLine: document.getElementById('resultLine'),
  resultText: document.getElementById('resultText'),
  foldOpen: document.getElementById('foldOpen'),
  foldOpenText: document.getElementById('foldOpenText')
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

function categoryLabel(code) {
  var found = state.data.categories.find(function(c) { return c.code === code; });
  if (!found) return code;
  return isEn() ? found.labelEn : found.label;
}

// Free-text csv values (style tags, beans) are Chinese; PAGE_CONFIG.termsEn translates them.
function term(text) {
  var terms = state.config.termsEn || {};
  return isEn() && terms[text] ? terms[text] : text;
}

function regionLabel(region) {
  return isEn() ? state.data.regionsEn[region] : region;
}

function shopById(id) {
  return state.data.shops.find(function(s) { return s.id === id; });
}

function matches(shop, category, region) {
  var catOk = category === ALL || shop.categories.indexOf(category) !== -1;
  var regionOk = region === ALL || shop.region === region;
  var styleOk = !state.style || shop.style === state.style;
  return catOk && regionOk && styleOk;
}

function filteredShops() {
  return state.data.shops.filter(function(s) { return matches(s, state.category, state.region); });
}

function countWhere(category, region) {
  return state.data.shops.filter(function(s) { return matches(s, category, region); }).length;
}

function formatCount(n) {
  return n.toLocaleString('en-US');
}

// ── filters (list only — the My Maps embed cannot be filtered from the page) ──
function setCategory(code) {
  state.category = code;
  refresh(true);
}

// Both rows are rebuilt on every change, which would drop keyboard focus to the page top;
// remember which filter button had focus and put it back on the rebuilt one (same as awards.js).
function renderFilters() {
  var focused = document.activeElement;
  var refocus = null;
  [els.categoryTabs, els.regionChips].forEach(function(box) {
    if (focused && box.contains(focused) && focused.dataset.code !== undefined) {
      refocus = { box: box, code: focused.dataset.code };
    }
  });

  els.categoryTabs.innerHTML = '';
  var codes = [];
  state.data.shops.forEach(function(s) {
    s.categories.forEach(function(c) { if (codes.indexOf(c) === -1) codes.push(c); });
  });
  codes.sort();

  [ALL].concat(codes).forEach(function(code) {
    var active = state.category === code;
    var btn = el('button', 'filter-btn' + (active ? ' active' : ''));
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.tabIndex = active ? 0 : -1;  // roving tabindex: Tab enters the row once, arrows move inside
    btn.dataset.code = code;
    btn.appendChild(el('span', '', code === ALL ? t('all') : categoryLabel(code)));
    btn.appendChild(el('span', 'count', String(countWhere(code, ALL))));
    btn.addEventListener('click', function() { setCategory(code); });
    els.categoryTabs.appendChild(btn);
  });

  els.regionChips.innerHTML = '';
  [ALL].concat(state.data.regions).forEach(function(region) {
    var active = state.region === region;
    var count = countWhere(state.category, region);
    var btn = el('button', 'filter-btn' + (active ? ' active' : ''));
    btn.type = 'button';
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.disabled = count === 0 && !active;
    btn.dataset.code = region;
    btn.appendChild(el('span', '', region === ALL ? t('all') : regionLabel(region)));
    btn.appendChild(el('span', 'count', String(count)));
    btn.addEventListener('click', function() {
      state.region = region;
      refresh(true);
    });
    els.regionChips.appendChild(btn);
  });

  shell.revealActive(els.categoryTabs);
  shell.revealActive(els.regionChips);
  shell.updateScrollButtons();

  if (refocus) {
    var again = [].slice.call(refocus.box.children).filter(function(b) { return b.dataset.code === refocus.code; })[0];
    if (again && !again.disabled) again.focus({ preventScroll: true });
  }
}

// Arrow keys, Home and End move through the category tabs and pick the one they land on.
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

// "精品咖啡 × 全部區域 · 11 家" [✕ 風格] [🔍 篩選 ▾]; the 🔍 button only shows while the phone
// sheet has folded the title and filters (ListMapShell setupSheetFold).
function renderResultLine(shops) {
  var cat = state.category === ALL ? t('allCats') : categoryLabel(state.category);
  var region = state.region === ALL ? t('allRegions') : regionLabel(state.region);
  els.resultText.textContent = t('result', { c: cat, r: region, n: shops.length });
  els.resultLine.querySelectorAll('.result-style').forEach(function(old) { old.remove(); });
  if (state.style) {
    var clear = el('button', 'tag tag-btn tag-active result-style', '✕ ' + term(state.style));
    clear.type = 'button';
    clear.setAttribute('title', t('styleClear'));
    clear.setAttribute('aria-label', t('styleClear') + '：' + term(state.style));
    clear.addEventListener('click', function() { setStyle(null); });
    els.resultLine.insertBefore(clear, els.foldOpen);
  }
}

function setStyle(style) {
  state.style = style;
  refresh(true);
}

// ── shop cards ──
// Per-category or per-block top 3 (top3.csv), split three ways (CARD-PLAN Q3–Q5):
//   ranked  大家推薦 and mentioned in MIN_MENTIONS+ reviews: 🥇🥈🥉, one line, mentions · ★
//   also    the rest that reviews mention (too few, or below the 推薦 bar): names only, one grey line
//   media   媒體推薦 (no review count): names only, one grey line
// The block title says 大家推薦 only when something is ranked. Items keep top3.csv's order (by mentions).
function splitItems(items) {
  var parts = { ranked: [], also: [], media: [] };
  items.forEach(function(item) {
    if (item.verdict === '媒體推薦') parts.media.push(item);
    else if (item.verdict === '大家推薦' && item.count >= MIN_MENTIONS) parts.ranked.push(item);
    else parts.also.push(item);
  });
  return parts;
}

function itemName(item) {
  return isEn() ? item.en || item.zh : item.zh;
}

function namesLine(label, items) {
  var li = el('li', 'top3-also');
  li.appendChild(el('b', '', t(label)));
  li.appendChild(document.createTextNode(items.map(itemName).join(t('listSep'))));
  return li;
}

function renderTop3Block(items, label) {
  var parts = splitItems(items);
  var box = el('section', 'top3');
  box.appendChild(el('div', 'top3-title', parts.ranked.length ? t('top3Rec', { c: label }) : label));

  var list = el('ol', 'top3-list');
  parts.ranked.forEach(function(item, index) {
    var li = el('li', 'top3-item');
    li.appendChild(el('span', 'top3-medal', MEDALS[index] || '·'));
    // Chinese pages add the English name in muted text, so it can be found on the menu.
    var line = el('div', 'top3-line');
    line.appendChild(el('span', 'top3-zh', itemName(item)));
    if (!isEn() && item.en && item.en !== item.zh) line.appendChild(el('span', 'top3-en', item.en));
    li.appendChild(line);
    li.appendChild(el('span', 'top3-count', t('mentions', { n: item.count }) + ' · ★ ' + item.rating.toFixed(1)));
    list.appendChild(li);
  });
  if (parts.also.length) list.appendChild(namesLine('alsoMentioned', parts.also));
  if (parts.media.length) list.appendChild(namesLine('mediaPicks', parts.media));
  if (!items.length) list.appendChild(el('li', 'top3-gap', t('none')));
  else if (parts.ranked.length && parts.ranked.length < 3 && !parts.also.length && !parts.media.length) {
    list.appendChild(el('li', 'top3-gap', t('gap')));
  }
  box.appendChild(list);
  return box;
}

function renderTop3(shop) {
  var frag = document.createDocumentFragment();
  // Fixed-block pages (PAGE_CONFIG.top3Blocks, e.g. drinks / food): every block that has items,
  // whatever the category filter.
  if (state.config.top3Blocks) {
    state.config.top3Blocks.forEach(function(block) {
      var items = shop.top3ByBlock[block.key] || [];
      if (items.length) frag.appendChild(renderTop3Block(items, isEn() ? block.en : block.zh));
    });
    return frag;
  }
  // With a category filter on, show only that category; otherwise every category the shop belongs to.
  var codes = state.category === ALL ? shop.categories : [state.category];
  codes.forEach(function(code) {
    frag.appendChild(renderTop3Block(shop.top3ByCategory[code] || [], categoryLabel(code)));
  });
  return frag;
}

// Score fields and their labels come from PAGE_CONFIG.tasting, in display order.
function renderTasting(tasting) {
  if (!tasting.date) return null;
  var L = UI[state.lang].tasting;
  var parts = [L.date + ' ' + tasting.date];
  if (tasting.cost) parts.push(state.config.currency + ' ' + tasting.cost);
  state.config.tasting.forEach(function(field) {
    if (tasting[field.key]) parts.push((isEn() ? field.en : field.zh) + ' ' + tasting[field.key]);
  });
  if (tasting.average) parts.push(L.average + ' ' + tasting.average);
  return el('div', 'tasting', '✅ ' + parts.join(' · '));
}

function renderPhotos(shop) {
  if (!shop.photos.length) return null;
  var wrap = el('div', 'shop-photos');
  shop.photos.forEach(function(file) {
    var src = 'pics/' + file;
    var btn = el('button', 'shop-photo');
    btn.type = 'button';
    btn.setAttribute('aria-label', t('viewPhoto', { s: shop.name }));
    var img = document.createElement('img');
    img.src = src;
    img.alt = shop.name;
    img.loading = 'lazy';
    btn.appendChild(img);
    btn.addEventListener('click', function() { shell.openLightbox(src, shop.name); });
    wrap.appendChild(btn);
  });
  return wrap;
}

function externalLink(className, text, href, label) {
  var a = el('a', className, text);
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  if (label) a.setAttribute('aria-label', label);
  return a;
}

function renderCard(shop) {
  var card = el('article', 'shop-card' + (shop.id === state.selectedId ? ' selected' : ''));
  card.id = 'shop-' + shop.id;
  card.dataset.id = shop.id;

  // The shop name is the one focal point; the rating is one line under it, like a rating under a
  // place name on Google Maps, and priority A shows as a grey "· 精選" there (CARD-PLAN Q1).
  var head = el('div', 'shop-head');
  var title = el('div', 'shop-title');
  title.appendChild(el('h2', 'shop-name', shop.name));
  if (shop.rating != null || shop.priority === 'A') {
    var rating = el('div', 'shop-rating');
    if (shop.rating != null) {
      var star = el('span', 'star', '★ ');
      star.setAttribute('aria-hidden', 'true');
      rating.appendChild(star);
      rating.appendChild(el('span', 'visually-hidden', t('ratingLabel')));
      rating.appendChild(el('span', 'rating-num', shop.rating.toFixed(1)));
      rating.appendChild(document.createTextNode(' · ' + t('reviewsLine', { n: formatCount(shop.reviews) })));
    }
    if (shop.priority === 'A') rating.appendChild(document.createTextNode((shop.rating != null ? ' · ' : '') + t('pick')));
    title.appendChild(rating);
  }
  title.appendChild(el('div', 'shop-meta', shop.suburb + ' · ' + regionLabel(shop.region)));
  head.appendChild(title);
  card.appendChild(head);

  // Category tags double as filter shortcuts.
  var tags = el('div', 'shop-tags');
  shop.categories.forEach(function(code) {
    var active = code === state.category;
    var tagBtn = el('button', 'tag tag-btn' + (active ? ' tag-active' : ''), categoryLabel(code));
    tagBtn.type = 'button';
    tagBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    tagBtn.setAttribute('title', t('tagFilter', { c: categoryLabel(code) }));
    tagBtn.addEventListener('click', function() {
      state.selectedId = shop.id;
      setCategory(active ? ALL : code);
      shell.scrollToCard(shop.id);
    });
    tags.appendChild(tagBtn);
  });
  // Style tags filter too (toggle); the result line shows a ✕ to clear it.
  if (shop.style) {
    var styleActive = state.style === shop.style;
    var styleBtn = el('button', 'tag tag-btn' + (styleActive ? ' tag-active' : ''), term(shop.style));
    styleBtn.type = 'button';
    styleBtn.setAttribute('aria-pressed', styleActive ? 'true' : 'false');
    styleBtn.setAttribute('title', t('tagFilter', { c: term(shop.style) }));
    styleBtn.addEventListener('click', function() {
      state.selectedId = shop.id;
      setStyle(styleActive ? null : shop.style);
      shell.scrollToCard(shop.id);
    });
    tags.appendChild(styleBtn);
  }
  // Cross-page mark (e.g. 🥐 on the cafe page = also known for pastries); labels in PAGE_CONFIG.crossMarks.
  var cross = shop.crossMark && state.config.crossMarks && state.config.crossMarks[shop.crossMark];
  if (cross) tags.appendChild(el('span', 'tag tag-cross', isEn() ? cross.en : cross.zh));
  if (shop.tasting.date) tags.appendChild(el('span', 'tag tag-done', t('tasted')));
  card.appendChild(tags);

  card.appendChild(renderTop3(shop));

  if (shop.beans) {
    var beans = el('div', 'shop-target');
    beans.appendChild(el('b', '', t('beans')));
    beans.appendChild(document.createTextNode(term(shop.beans)));
    card.appendChild(beans);
  }

  if (shop.target) {
    var target = el('div', 'shop-target');
    target.appendChild(el('b', '', t('target')));
    target.appendChild(document.createTextNode(shop.target));
    card.appendChild(target);
  }

  var noteText = isEn() ? shop.noteEn : shop.note;
  if (noteText) {
    var note = el('div', 'shop-note');
    note.appendChild(el('b', '', t('note')));
    note.appendChild(document.createTextNode(noteText));
    card.appendChild(note);
  }

  var tasting = renderTasting(shop.tasting);
  if (tasting) card.appendChild(tasting);

  var photos = renderPhotos(shop);
  if (photos) card.appendChild(photos);

  var actions = el('div', 'shop-actions');
  var mapBtn = el('button', 'pill pill-map', '📍 ' + shop.address);
  mapBtn.type = 'button';
  mapBtn.dataset.id = shop.id;
  mapBtn.setAttribute('aria-label', t('mapAria', { s: shop.name }));
  actions.appendChild(mapBtn);
  actions.appendChild(externalLink('pill pill-ext', '↗ Maps', shop.mapsUrl, t('mapsAria', { s: shop.name })));
  if (shop.instagram) {
    actions.appendChild(externalLink('pill pill-social', '↗ Instagram', shop.instagram, t('igAria', { s: shop.name })));
  }
  card.appendChild(actions);

  if (shop.source) card.appendChild(externalLink('shop-source', t('source'), shop.source));

  return card;
}

function renderList(shops) {
  els.sidebarBody.innerHTML = '';

  if (!shops.length) {
    var empty = el('div', 'tips-box');
    empty.appendChild(el('div', 'tips-title', t('emptyTitle')));
    empty.appendChild(el('div', 'tips-text', t('emptyText')));
    els.sidebarBody.appendChild(empty);
    return;
  }

  var list = el('div', 'shop-list');
  shops.forEach(function(shop) { list.appendChild(renderCard(shop)); });
  els.sidebarBody.appendChild(list);
  els.sidebarBody.appendChild(el('p', 'data-footnote', t('footnote', { d: state.data.dataAsOf })));
}

function markSelected(id) {
  state.selectedId = id;
  els.sidebarBody.querySelectorAll('.shop-card').forEach(function(card) {
    card.classList.toggle('selected', card.dataset.id === id);
  });
}

// 📍 pill: the only card control that moves the map.
function previewOnMap(id) {
  var shop = shopById(id);
  if (!shop) return;
  markSelected(id);
  shell.setActiveChip(id);
  shell.previewPlace(shop.name + ' ' + shop.address);
}

// ── render ──
function renderStaticText() {
  els.pageSubtitle.textContent = t('subtitle', { n: state.data.shops.length, d: state.data.dataAsOf });
  els.categoryLabel.textContent = t('category');
  els.regionLabel.textContent = t('region');
  els.foldOpenText.textContent = t('foldOpen');
  els.foldOpen.setAttribute('aria-label', t('foldOpenAria'));
}

function refresh(filtersChanged) {
  var shops = filteredShops();
  if (state.selectedId && !shops.some(function(s) { return s.id === state.selectedId; })) {
    state.selectedId = null;
  }
  renderFilters();
  renderResultLine(shops);
  renderList(shops);
  if (filtersChanged) els.sidebarBody.scrollTop = 0;
  shell.refreshChips(shops);
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
    if (mapBtn) previewOnMap(mapBtn.dataset.id);
  });
  els.categoryTabs.addEventListener('keydown', onTabKey);
  // Phone: the title and filters fold while the list scrolls down (shared with the awards map).
  shell.setupSheetFold({
    focusOnOpen: function() {
      var active = els.categoryTabs.querySelector('.filter-btn.active');
      if (active) active.focus({ preventScroll: true });
    }
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
