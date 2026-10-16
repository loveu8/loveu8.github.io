// 布里斯本烘焙地圖 — renders BAKERY_DATA (data.js) into the Noosa-style
// map + sidebar shell. Map: a Google My Maps embed showing every shop
// (BAKERY_DATA.myMapsEmbedUrl); 📍 swaps in the free single-place Google embed.

var MEDALS = ['🥇', '🥈', '🥉'];
var ALL = 'all';
var MOBILE_MAX = 768;

var state = {
  data: null,
  category: ALL,
  region: ALL,
  selectedId: null,
  mapTimer: null,
  chipObserver: null,
  chipVisibility: {}
};

var els = {
  html: document.documentElement,
  mapFrame: document.getElementById('mapFrame'),
  mapLoading: document.getElementById('mapLoading'),
  overviewBtn: document.getElementById('overviewBtn'),
  chipStrip: document.getElementById('chipStrip'),
  sidebar: document.getElementById('sidebar'),
  sidebarHeader: document.getElementById('sidebarHeader'),
  sidebarBody: document.getElementById('sidebarBody'),
  sheetHandle: document.getElementById('sheetHandle'),
  handleHint: document.getElementById('handleHint'),
  pageSubtitle: document.getElementById('pageSubtitle'),
  categoryTabs: document.getElementById('categoryTabs'),
  regionChips: document.getElementById('regionChips'),
  resultLine: document.getElementById('resultLine'),
  printBtn: document.getElementById('printBtn'),
  themeToggle: document.getElementById('themeToggle'),
  resizeDivider: document.getElementById('resizeDivider'),
  backToTop: document.getElementById('backToTop'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightboxImg'),
  lightboxClose: document.getElementById('lightboxClose')
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

function categoryLabel(code) {
  var found = state.data.categories.find(function(c) { return c.code === code; });
  return found ? found.label : code;
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
  var label = dark ? '切換淺色模式' : '切換深色模式';
  els.themeToggle.innerHTML = dark ? SUN_ICON_SVG : MOON_ICON_SVG;
  els.themeToggle.setAttribute('aria-label', label);
  els.themeToggle.setAttribute('title', label);
}

// ── sheet ──
function setSheet(expanded) {
  if (!isMobile()) return;
  els.sidebar.classList.toggle('expanded', expanded);
  els.handleHint.textContent = expanded ? '▼ 收起清單' : '▲ 查看清單';
}

function toggleSheet() {
  setSheet(!els.sidebar.classList.contains('expanded'));
}

// ── filters (list only — the My Maps embed cannot be filtered from the page) ──
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
    btn.appendChild(el('span', '', code === ALL ? '全部' : categoryLabel(code)));
    btn.appendChild(el('span', 'count', String(countWhere(code, ALL))));
    btn.addEventListener('click', function() {
      state.category = code;
      refresh(true);
    });
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
    btn.appendChild(el('span', '', region === ALL ? '全部' : region));
    btn.appendChild(el('span', 'count', String(count)));
    btn.addEventListener('click', function() {
      state.region = region;
      refresh(true);
    });
    els.regionChips.appendChild(btn);
  });

  revealActive(els.categoryTabs);
  revealActive(els.regionChips);
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

function renderResultLine(shops) {
  var cat = state.category === ALL ? '全部分類' : categoryLabel(state.category);
  var region = state.region === ALL ? '全部區域' : state.region;
  els.resultLine.textContent = cat + ' × ' + region + ' · ' + shops.length + ' 家';
}

// ── top chip strip (scroll-spy, never touches the map) ──
function renderChips(shops) {
  els.chipStrip.innerHTML = '';
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
function renderTop3(shop) {
  var box = el('div', 'top3');
  var title = el('div', 'top3-title', '大家推薦');
  if (shop.confidence === '低') title.appendChild(el('span', 'tag tag-low', '資料少'));
  box.appendChild(title);

  var list = el('ol', 'top3-list');
  shop.top3.forEach(function(item, index) {
    var li = el('li', 'top3-item');
    li.appendChild(el('span', 'top3-medal', MEDALS[index] || '·'));
    var name = el('span', 'top3-name');
    name.appendChild(el('span', 'top3-zh', item.zh));
    if (item.en) name.appendChild(el('span', 'top3-en', item.en));
    li.appendChild(name);

    var countText = '';
    if (item.source === 'media') countText = '媒體推薦';
    else if (item.count != null) countText = (item.tie ? '並列 ' : '') + item.count + ' 則提到';
    li.appendChild(el('span', 'top3-count', countText));
    list.appendChild(li);
  });
  box.appendChild(list);
  return box;
}

function renderTasting(t) {
  if (!t.date) return null;
  var parts = ['試吃 ' + t.date];
  if (t.cost) parts.push('AUD ' + t.cost);
  if (t.look) parts.push('外觀 ' + t.look);
  if (t.texture) parts.push('口感 ' + t.texture);
  if (t.aroma) parts.push('香氣 ' + t.aroma);
  if (t.revisit) parts.push('回購 ' + t.revisit);
  if (t.average) parts.push('平均 ' + t.average);
  return el('div', 'tasting', '✅ ' + parts.join(' · '));
}

function renderPhotos(shop) {
  if (!shop.photos.length) return null;
  var wrap = el('div', 'shop-photos');
  shop.photos.forEach(function(file) {
    var src = 'pics/' + file;
    var btn = el('button', 'shop-photo');
    btn.type = 'button';
    btn.setAttribute('aria-label', '查看照片：' + shop.name);
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
  prio.setAttribute('aria-label', '優先級 ' + shop.priority);
  head.appendChild(prio);

  var title = el('div', 'shop-title');
  title.appendChild(el('h2', 'shop-name', shop.name));
  title.appendChild(el('div', 'shop-meta', shop.suburb + ' · ' + shop.region));
  head.appendChild(title);

  if (shop.rating != null) {
    var rating = el('div', 'shop-rating');
    rating.setAttribute('aria-label', 'Google 評分 ' + shop.rating + '，' + shop.reviews + ' 則評論');
    rating.appendChild(el('span', 'star', '★ '));
    rating.appendChild(document.createTextNode(shop.rating.toFixed(1)));
    rating.appendChild(el('small', '', formatCount(shop.reviews) + ' 則'));
    head.appendChild(rating);
  }
  card.appendChild(head);

  var tags = el('div', 'shop-tags');
  shop.categories.forEach(function(code) {
    var active = code === state.category;
    tags.appendChild(el('span', 'tag' + (active ? ' tag-active' : ''), categoryLabel(code)));
  });
  if (shop.tasting.date) tags.appendChild(el('span', 'tag tag-done', '✅ 已試吃'));
  card.appendChild(tags);

  card.appendChild(renderTop3(shop));

  if (shop.target) {
    var target = el('div', 'shop-target');
    target.appendChild(el('b', '', '我想吃：'));
    target.appendChild(document.createTextNode(shop.target));
    card.appendChild(target);
  }

  if (shop.note) {
    var note = el('div', 'shop-note');
    note.appendChild(el('b', '', '訪前提醒：'));
    note.appendChild(document.createTextNode(shop.note));
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
  mapBtn.setAttribute('aria-label', '在地圖上查看：' + shop.name);
  actions.appendChild(mapBtn);
  actions.appendChild(externalLink('pill pill-ext', '↗ Maps', shop.mapsUrl, '在 Google Maps 開啟：' + shop.name));
  if (shop.instagram) {
    actions.appendChild(externalLink('pill pill-social', '↗ Instagram', shop.instagram, shop.name + ' 的 Instagram'));
  }
  card.appendChild(actions);

  if (shop.source) card.appendChild(externalLink('shop-source', '資料來源', shop.source));

  return card;
}

function renderList(shops) {
  els.sidebarBody.innerHTML = '';

  if (!shops.length) {
    var empty = el('div', 'tips-box');
    empty.appendChild(el('div', 'tips-title', '這個組合沒有店家'));
    empty.appendChild(el('div', 'tips-text', '換一個區域或分類看看；區域按鈕上的數字是目前分類下的家數。'));
    els.sidebarBody.appendChild(empty);
    return;
  }

  var list = el('div', 'shop-list');
  shops.forEach(function(shop) { list.appendChild(renderCard(shop)); });
  els.sidebarBody.appendChild(list);

  els.sidebarBody.appendChild(el('p', 'data-footnote',
    'Google 評分與「N 則提到」為 ' + state.data.dataAsOf + ' 的 Google Maps 評論資料。' +
    '「大家推薦」依評論中最常被提到的品項排序；「資料少」代表評論提及次數偏低。' +
    '分類與區域篩選只作用在清單，地圖固定顯示全部店家。'));
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
    '&output=embed&z=' + zoom + '&language=zh-TW';
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
  els.overviewBtn.hidden = true;
  setMapSrc(overviewUrl());
}

// 📍 pill: the only card control that moves the map.
function previewOnMap(id) {
  var shop = shopById(id);
  if (!shop) return;
  markSelected(id);
  setActiveChip(id);
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
}

function init(data) {
  state.data = data;
  els.pageSubtitle.textContent = data.shops.length + ' 家 · Google 資料 ' + data.dataAsOf;
  applyTheme(storageGet('theme') || 'system');
  setupEvents();
  refresh(true);
  showOverview();
}

init(BAKERY_DATA);
