// 布里斯本烘焙地圖 — renders BAKERY_DATA (data.js) into the Noosa-style
// map + sidebar shell. Map: a Google My Maps embed showing every shop
// (BAKERY_DATA.myMapsEmbedUrl); 📍 swaps in the free single-place Google embed.
// Bilingual (zh-TW / en); the language choice shares the `lang` key with Noosa.

var MEDALS = ['🥇', '🥈', '🥉'];
var ALL = 'all';
var MOBILE_MAX = 768;

var UI = {
  'zh-TW': {
    htmlLang: 'zh-TW', mapLang: 'zh-TW', langButton: 'EN', langAria: 'Switch to English',
    title: '布里斯本烘焙地圖', subtitle: '{n} 家 · Google 資料 {d}',
    expand: '▲ 查看清單', collapse: '▼ 收起清單', print: '🖨️ 列印',
    category: '分類', region: '區域', all: '全部', allCats: '全部分類', allRegions: '全部區域',
    result: '{c} × {r} · {n} 家', chipStrip: '目前清單的店家',
    emptyTitle: '這個組合沒有店家', emptyText: '換一個區域或分類看看；區域按鈕上的數字是目前分類下的家數。',
    top3: '{c} 前三名', low: '資料少', rec: '推薦', media: '媒體推薦',
    mentions: '{n} 則提到', mediaOnly: '只有媒體資料', generic: '評論只寫泛稱',
    gap: '其餘款式的評論資料不足', target: '我想吃：', note: '訪前提醒：', tasted: '✅ 已試吃',
    tasting: { date: '試吃', look: '外觀', texture: '口感', aroma: '香氣', revisit: '回購', average: '平均' },
    reviewsShort: '{n} 則', ratingAria: 'Google 評分 {r}，{n} 則評論', prioAria: '優先級 {p}',
    tagFilter: '只看{c}', mapAria: '在地圖上查看：{s}', mapsAria: '在 Google Maps 開啟：{s}',
    igAria: '{s} 的 Instagram', source: '資料來源', overview: '🗺️ 回到全部店家',
    mapLoading: '地圖更新中', mapTitle: '烘焙店地圖', themeDark: '切換深色模式', themeLight: '切換淺色模式',
    backToTop: '回到頂部', closeLightbox: '關閉圖片', viewPhoto: '查看照片：{s}',
    divider: '拖曳調整地圖與清單寬度', scrollPrev: '往左捲動', scrollNext: '往右捲動',
    footnote: 'Google 評分與「N 則提到」為 {d} 的 Google Maps 評論資料，評論多的店為抽樣。' +
      '前三名依各分類中被提到最多的款式排序；「推薦」代表提到它的評論平均 4.5 星以上、負評不到一成；' +
      '「★」是提到該款評論的平均星等，不是對該款本身的評分；「資料少」代表提及次數偏低。' +
      '分類與區域篩選只作用在清單，地圖固定顯示全部店家。'
  },
  en: {
    htmlLang: 'en', mapLang: 'en', langButton: '中文', langAria: '切換為中文',
    title: 'Brisbane Bakery Map', subtitle: '{n} shops · Google data {d}',
    expand: '▲ View list', collapse: '▼ Hide list', print: '🖨️ Print',
    category: 'Type', region: 'Area', all: 'All', allCats: 'All types', allRegions: 'All areas',
    result: '{c} × {r} · {n} shops', chipStrip: 'Shops in this list',
    emptyTitle: 'No shops match', emptyText: 'Try another area or type; the numbers on the area buttons count shops for the current type.',
    top3: 'Top 3 · {c}', low: 'Limited data', rec: 'Recommended', media: 'Media pick',
    mentions: '{n} mentions', mediaOnly: 'Media only', generic: 'Generic mentions only',
    gap: 'Not enough reviews for more items', target: 'I want to try: ', note: 'Before you go: ', tasted: '✅ Tasted',
    tasting: { date: 'Tasted', look: 'Look', texture: 'Texture', aroma: 'Aroma', revisit: 'Revisit', average: 'Average' },
    reviewsShort: '{n} reviews', ratingAria: 'Google rating {r}, {n} reviews', prioAria: 'Priority {p}',
    tagFilter: 'Show only {c}', mapAria: 'Show on map: {s}', mapsAria: 'Open in Google Maps: {s}',
    igAria: '{s} on Instagram', source: 'Source', overview: '🗺️ Back to all shops',
    mapLoading: 'Updating map', mapTitle: 'Bakery map', themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode',
    backToTop: 'Back to top', closeLightbox: 'Close photo', viewPhoto: 'View photo: {s}',
    divider: 'Drag to resize the map and list', scrollPrev: 'Scroll left', scrollNext: 'Scroll right',
    footnote: 'Google ratings and “N mentions” come from Google Maps reviews as of {d}; shops with many reviews were sampled. ' +
      'Each top 3 lists the most-mentioned items in that type. “Recommended” means the reviews mentioning it average 4.5★ or more with under 10% low scores; ' +
      '★ is the average of those reviews, not a rating of the item itself. “Limited data” means few mentions. ' +
      'Type and area filters apply to the list only; the map always shows every shop.'
  }
};

var state = {
  data: null,
  lang: 'zh-TW',
  category: ALL,
  region: ALL,
  selectedId: null,
  selectedPlace: null,
  mapTimer: null,
  chipObserver: null,
  chipVisibility: {}
};

var els = {
  html: document.documentElement,
  title: document.querySelector('title'),
  mapFrame: document.getElementById('mapFrame'),
  mapLoading: document.getElementById('mapLoading'),
  mapLoadingText: document.getElementById('mapLoadingText'),
  overviewBtn: document.getElementById('overviewBtn'),
  chipStrip: document.getElementById('chipStrip'),
  sidebar: document.getElementById('sidebar'),
  sidebarHeader: document.getElementById('sidebarHeader'),
  sidebarBody: document.getElementById('sidebarBody'),
  sheetHandle: document.getElementById('sheetHandle'),
  handleHint: document.getElementById('handleHint'),
  pageTitle: document.getElementById('pageTitle'),
  pageSubtitle: document.getElementById('pageSubtitle'),
  categoryLabel: document.getElementById('categoryLabel'),
  regionLabel: document.getElementById('regionLabel'),
  categoryTabs: document.getElementById('categoryTabs'),
  regionChips: document.getElementById('regionChips'),
  resultLine: document.getElementById('resultLine'),
  printBtn: document.getElementById('printBtn'),
  langToggle: document.getElementById('langToggle'),
  themeToggle: document.getElementById('themeToggle'),
  resizeDivider: document.getElementById('resizeDivider'),
  backToTop: document.getElementById('backToTop'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightboxImg'),
  lightboxClose: document.getElementById('lightboxClose'),
  scrollBtns: Array.prototype.slice.call(document.querySelectorAll('.scroll-btn'))
};

// ── helpers ──
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function storageGet(key) {
  try { return window.localStorage.getItem(key); } catch (err) { return null; }
}

function storageSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (err) { /* private mode */ }
}

function isMobile() {
  return window.innerWidth < MOBILE_MAX;
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

function regionLabel(region) {
  return isEn() ? state.data.regionsEn[region] : region;
}

function shopById(id) {
  return state.data.shops.find(function(s) { return s.id === id; });
}

function matches(shop, category, region) {
  var catOk = category === ALL || shop.categories.indexOf(category) !== -1;
  var regionOk = region === ALL || shop.region === region;
  return catOk && regionOk;
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

// ── theme ──
var SUN_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<circle cx="12" cy="12" r="4"></circle>' +
  '<line x1="12" y1="2" x2="12" y2="4"></line>' +
  '<line x1="12" y1="20" x2="12" y2="22"></line>' +
  '<line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>' +
  '<line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>' +
  '<line x1="2" y1="12" x2="4" y2="12"></line>' +
  '<line x1="20" y1="12" x2="22" y2="12"></line>' +
  '<line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>' +
  '<line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>' +
  '</svg>';

var MOON_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"></path>' +
  '</svg>';

function isDark() {
  var theme = els.html.getAttribute('data-theme');
  if (theme) return theme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme) {
  if (theme === 'system') {
    els.html.removeAttribute('data-theme');
  } else {
    els.html.setAttribute('data-theme', theme);
  }
  var dark = isDark();
  var label = dark ? t('themeLight') : t('themeDark');
  els.themeToggle.innerHTML = dark ? SUN_ICON_SVG : MOON_ICON_SVG;
  els.themeToggle.setAttribute('aria-label', label);
  els.themeToggle.setAttribute('title', label);
}

// ── sheet ──
function setSheet(expanded) {
  if (!isMobile()) return;
  els.sidebar.classList.toggle('expanded', expanded);
  els.handleHint.textContent = expanded ? t('collapse') : t('expand');
}

function toggleSheet() {
  setSheet(!els.sidebar.classList.contains('expanded'));
}

// ── filters (list only — the My Maps embed cannot be filtered from the page) ──
function setCategory(code) {
  state.category = code;
  refresh(true);
}

function renderFilters() {
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
    btn.appendChild(el('span', '', region === ALL ? t('all') : regionLabel(region)));
    btn.appendChild(el('span', 'count', String(count)));
    btn.addEventListener('click', function() {
      state.region = region;
      refresh(true);
    });
    els.regionChips.appendChild(btn);
  });

  revealActive(els.categoryTabs);
  revealActive(els.regionChips);
  updateScrollButtons();
}

// Keep the selected filter visible inside its horizontal scroller without
// scrolling any other ancestor (scrollIntoView would also move the page).
function revealActive(scroller) {
  var active = scroller.querySelector('.filter-btn.active');
  if (!active) return;
  var left = active.offsetLeft - scroller.offsetLeft;
  var right = left + active.offsetWidth;
  if (left < scroller.scrollLeft) {
    scroller.scrollLeft = left - 8;
  } else if (right > scroller.scrollLeft + scroller.clientWidth - 24) {
    scroller.scrollLeft = right - scroller.clientWidth + 24;
  }
}

// Desktop ‹ › buttons (hidden on mobile, where rows are swiped). Disabled at either end.
function updateScrollButtons() {
  els.scrollBtns.forEach(function(btn) {
    var target = document.getElementById(btn.dataset.target);
    var max = target.scrollWidth - target.clientWidth;
    var atEdge = btn.dataset.dir === '-1' ? target.scrollLeft <= 1 : target.scrollLeft >= max - 1;
    btn.disabled = max <= 1 || atEdge;
  });
}

function setupFilterScroll() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  els.scrollBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = document.getElementById(btn.dataset.target);
      target.scrollBy({ left: Number(btn.dataset.dir) * target.clientWidth * 0.7, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
  [els.categoryTabs, els.regionChips].forEach(function(scroller) {
    scroller.addEventListener('scroll', updateScrollButtons, { passive: true });
    // A vertical mouse wheel scrolls the row sideways, so desktop users without a trackpad can still reach the end.
    scroller.addEventListener('wheel', function(event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (scroller.scrollWidth <= scroller.clientWidth) return;
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }, { passive: false });
  });
  window.addEventListener('resize', updateScrollButtons);
}

function renderResultLine(shops) {
  var cat = state.category === ALL ? t('allCats') : categoryLabel(state.category);
  var region = state.region === ALL ? t('allRegions') : regionLabel(state.region);
  els.resultLine.textContent = t('result', { c: cat, r: region, n: shops.length });
}

// ── top chip strip (scroll-spy, never touches the map) ──
function renderChips(shops) {
  els.chipStrip.innerHTML = '';
  els.chipStrip.setAttribute('aria-label', t('chipStrip'));
  shops.forEach(function(shop) {
    var chip = el('button', 'chip', shop.name);
    chip.type = 'button';
    chip.dataset.id = shop.id;
    chip.addEventListener('click', function() {
      scrollToCard(shop.id);
      setActiveChip(shop.id);
    });
    els.chipStrip.appendChild(chip);
  });
}

function setActiveChip(id) {
  els.chipStrip.querySelectorAll('.chip').forEach(function(chip) {
    var active = chip.dataset.id === id;
    chip.classList.toggle('active', active);
    if (active) {
      chip.setAttribute('aria-current', 'true');
      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      chip.removeAttribute('aria-current');
    }
  });
}

function setupScrollSpy() {
  if (state.chipObserver) state.chipObserver.disconnect();
  state.chipObserver = null;
  state.chipVisibility = {};
  if (!window.IntersectionObserver) return;

  var cards = Array.prototype.slice.call(els.sidebarBody.querySelectorAll('.shop-card'));
  if (!cards.length) return;

  state.chipObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      state.chipVisibility[entry.target.dataset.id] = entry.isIntersecting;
    });
    var current = null;
    cards.forEach(function(card) {
      if (!current && state.chipVisibility[card.dataset.id]) current = card.dataset.id;
    });
    if (current) setActiveChip(current);
  }, {
    root: els.sidebarBody,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  });
  cards.forEach(function(card) { state.chipObserver.observe(card); });
}

// ── shop cards ──
// Per-category top 3 (top3.csv). Only items whose mentioning reviews average
// ≥ 4.5★ with ≤ 10% low scores carry the 推薦 tag; the rest are just "常提到".
function itemMeta(item) {
  var parts = [];
  if (item.count) parts.push(t('mentions', { n: item.count }));
  if (item.rating != null) parts.push('★ ' + item.rating.toFixed(1));
  if (parts.length) return parts.join(' · ');
  return item.verdict === '媒體推薦' ? t('mediaOnly') : t('generic');
}

function verdictTag(item) {
  if (item.verdict === '大家推薦') return el('span', 'tag tag-rec', t('rec'));
  if (item.verdict === '媒體推薦') return el('span', 'tag', t('media'));
  return null;
}

function renderTop3Block(shop, code) {
  var items = shop.top3ByCategory[code] || [];
  var box = el('section', 'top3');
  var title = el('div', 'top3-title', t('top3', { c: categoryLabel(code) }));
  var lowCount = items.filter(function(i) { return i.confidence === '低'; }).length;
  if (!items.length || lowCount * 2 >= items.length) title.appendChild(el('span', 'tag tag-low', t('low')));
  box.appendChild(title);

  var list = el('ol', 'top3-list');
  items.forEach(function(item, index) {
    var li = el('li', 'top3-item');
    li.appendChild(el('span', 'top3-medal', MEDALS[index] || '·'));
    var name = el('div', 'top3-name');
    var line = el('div', 'top3-line');
    line.appendChild(el('span', 'top3-zh', isEn() ? item.en : item.zh));
    var tag = verdictTag(item);
    if (tag) line.appendChild(tag);
    name.appendChild(line);
    var sub = isEn() ? item.flavorEn : item.en + (item.flavor ? ' · ' + item.flavor : '');
    if (sub) name.appendChild(el('div', 'top3-en', sub));
    li.appendChild(name);
    li.appendChild(el('span', 'top3-count', itemMeta(item)));
    list.appendChild(li);
  });
  if (items.length < 3) list.appendChild(el('li', 'top3-gap', t('gap')));
  box.appendChild(list);
  return box;
}

function renderTop3(shop) {
  // With a category filter on, show only that category; otherwise every category the shop belongs to.
  var codes = state.category === ALL ? shop.categories : [state.category];
  var frag = document.createDocumentFragment();
  codes.forEach(function(code) { frag.appendChild(renderTop3Block(shop, code)); });
  return frag;
}

function renderTasting(tasting) {
  if (!tasting.date) return null;
  var L = UI[state.lang].tasting;
  var parts = [L.date + ' ' + tasting.date];
  if (tasting.cost) parts.push('AUD ' + tasting.cost);
  ['look', 'texture', 'aroma', 'revisit', 'average'].forEach(function(key) {
    if (tasting[key]) parts.push(L[key] + ' ' + tasting[key]);
  });
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
    btn.addEventListener('click', function() { openLightbox(src, shop.name); });
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

  var head = el('div', 'shop-head');
  var prio = el('span', 'prio prio-' + shop.priority, shop.priority);
  prio.setAttribute('aria-label', t('prioAria', { p: shop.priority }));
  head.appendChild(prio);

  var title = el('div', 'shop-title');
  title.appendChild(el('h2', 'shop-name', shop.name));
  title.appendChild(el('div', 'shop-meta', shop.suburb + ' · ' + regionLabel(shop.region)));
  head.appendChild(title);

  if (shop.rating != null) {
    var rating = el('div', 'shop-rating');
    rating.setAttribute('aria-label', t('ratingAria', { r: shop.rating, n: shop.reviews }));
    rating.appendChild(el('span', 'star', '★ '));
    rating.appendChild(document.createTextNode(shop.rating.toFixed(1)));
    rating.appendChild(el('small', '', t('reviewsShort', { n: formatCount(shop.reviews) })));
    head.appendChild(rating);
  }
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
      scrollToCard(shop.id);
    });
    tags.appendChild(tagBtn);
  });
  if (shop.tasting.date) tags.appendChild(el('span', 'tag tag-done', t('tasted')));
  card.appendChild(tags);

  card.appendChild(renderTop3(shop));

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

function scrollToCard(id) {
  var card = document.getElementById('shop-' + id);
  if (!card) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function markSelected(id) {
  state.selectedId = id;
  els.sidebarBody.querySelectorAll('.shop-card').forEach(function(card) {
    card.classList.toggle('selected', card.dataset.id === id);
  });
}

// ── map (Google embeds, no API key) ──
function singlePlaceEmbedUrl(query, zoom) {
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(query) +
    '&output=embed&z=' + zoom + '&language=' + t('mapLang');
}

function overviewUrl() {
  // Until the My Maps embed URL is filled in, fall back to a plain Brisbane view.
  return state.data.myMapsEmbedUrl || singlePlaceEmbedUrl('Brisbane QLD', 11);
}

function showMapLoading() {
  els.mapLoading.classList.add('show');
  window.clearTimeout(state.mapTimer);
  state.mapTimer = window.setTimeout(hideMapLoading, 3200);
}

function hideMapLoading() {
  window.clearTimeout(state.mapTimer);
  els.mapLoading.classList.remove('show');
}

function setMapSrc(src) {
  if (els.mapFrame.src === src) return;
  showMapLoading();
  els.mapFrame.src = src;
}

function showOverview() {
  markSelected(null);
  state.selectedPlace = null;
  els.overviewBtn.hidden = true;
  setMapSrc(overviewUrl());
}

// 📍 pill: the only card control that moves the map.
function previewOnMap(id) {
  var shop = shopById(id);
  if (!shop) return;
  markSelected(id);
  setActiveChip(id);
  state.selectedPlace = id;
  setMapSrc(singlePlaceEmbedUrl(shop.name + ' ' + shop.address, 16));
  els.overviewBtn.hidden = false;
  setSheet(false);
}

// ── lightbox ──
function openLightbox(src, alt) {
  els.lightboxImg.src = src;
  els.lightboxImg.alt = alt || '';
  els.lightbox.classList.add('open');
  els.lightboxClose.focus();
}

function closeLightbox() {
  els.lightbox.classList.remove('open');
}

// ── render ──
function renderStaticText() {
  els.html.lang = t('htmlLang');
  els.title.textContent = t('title');
  els.pageTitle.textContent = t('title');
  els.pageSubtitle.textContent = t('subtitle', { n: state.data.shops.length, d: state.data.dataAsOf });
  els.handleHint.textContent = els.sidebar.classList.contains('expanded') ? t('collapse') : t('expand');
  els.printBtn.textContent = t('print');
  els.categoryLabel.textContent = t('category');
  els.regionLabel.textContent = t('region');
  els.langToggle.textContent = t('langButton');
  els.langToggle.setAttribute('aria-label', t('langAria'));
  els.langToggle.setAttribute('title', t('langAria'));
  els.overviewBtn.textContent = t('overview');
  els.mapLoadingText.textContent = t('mapLoading');
  els.mapFrame.title = t('mapTitle');
  els.resizeDivider.title = t('divider');
  els.backToTop.setAttribute('aria-label', t('backToTop'));
  els.backToTop.setAttribute('title', t('backToTop'));
  els.lightboxClose.setAttribute('aria-label', t('closeLightbox'));
  els.scrollBtns.forEach(function(btn) {
    btn.setAttribute('aria-label', btn.dataset.dir === '-1' ? t('scrollPrev') : t('scrollNext'));
  });
  applyTheme(storageGet('theme') || 'system');
}

function refresh(filtersChanged) {
  var shops = filteredShops();
  if (state.selectedId && !shops.some(function(s) { return s.id === state.selectedId; })) {
    state.selectedId = null;
  }
  renderFilters();
  renderResultLine(shops);
  renderChips(shops);
  renderList(shops);
  if (filtersChanged) els.sidebarBody.scrollTop = 0;
  setupScrollSpy();
}

function switchLanguage() {
  state.lang = isEn() ? 'zh-TW' : 'en';
  storageSet('lang', state.lang);
  var scroll = els.sidebarBody.scrollTop;
  renderStaticText();
  refresh(false);
  els.sidebarBody.scrollTop = scroll;
  // Keep the single-place map in the new language; the My Maps overview has no language switch.
  if (state.selectedPlace) {
    var shop = shopById(state.selectedPlace);
    if (shop) setMapSrc(singlePlaceEmbedUrl(shop.name + ' ' + shop.address, 16));
  }
}

function setupResize() {
  var dragging = false;

  function start(event) {
    if (isMobile()) return;
    dragging = true;
    els.resizeDivider.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }

  function move(clientX) {
    if (!dragging) return;
    var minW = Math.floor(window.innerWidth / 4);
    var maxW = Math.floor(window.innerWidth / 2);
    els.sidebar.style.width = Math.max(minW, Math.min(maxW, window.innerWidth - clientX)) + 'px';
    updateScrollButtons();
  }

  function stop() {
    if (!dragging) return;
    dragging = false;
    els.resizeDivider.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  els.resizeDivider.addEventListener('mousedown', start);
  document.addEventListener('mousemove', function(event) { move(event.clientX); });
  document.addEventListener('mouseup', stop);
}

function setupEvents() {
  els.themeToggle.addEventListener('click', function() {
    var next = isDark() ? 'light' : 'dark';
    storageSet('theme', next);
    applyTheme(next);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (!storageGet('theme')) applyTheme('system');
  });
  els.langToggle.addEventListener('click', switchLanguage);

  els.sheetHandle.addEventListener('click', toggleSheet);
  els.sidebarHeader.addEventListener('click', toggleSheet);
  els.printBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    window.print();
  });

  els.mapFrame.addEventListener('load', hideMapLoading);
  els.overviewBtn.addEventListener('click', showOverview);

  els.sidebarBody.addEventListener('click', function(event) {
    var mapBtn = event.target.closest('.pill-map');
    if (mapBtn) previewOnMap(mapBtn.dataset.id);
  });

  els.sidebarBody.addEventListener('scroll', function() {
    els.backToTop.classList.toggle('show', els.sidebarBody.scrollTop > 280);
  });
  els.backToTop.addEventListener('click', function() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.sidebarBody.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  els.lightbox.addEventListener('click', function(event) {
    if (event.target === els.lightbox) closeLightbox();
  });
  els.lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLightbox();
  });

  setupResize();
  setupFilterScroll();
}

function init(data) {
  state.data = data;
  state.lang = storageGet('lang') === 'en' ? 'en' : 'zh-TW';
  renderStaticText();
  setupEvents();
  refresh(true);
  showOverview();
}

init(BAKERY_DATA);
