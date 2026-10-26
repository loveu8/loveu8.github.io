// Noosa itinerary page. Theme, language and the two header toggles come from
// scripts/site.js; this file re-renders its text when Site.onLangChange fires.

// "阿星 (Lorn)" back to the homepage (archive/2026-10-style-plan/STYLE-PLAN.md D6, revised).
var BRAND = {
  'zh-TW': { brandEn: '', homeTitle: '回到首頁' },
  en: { brandEn: ' (Lorn)', homeTitle: 'Back to home' }
};

var state = {
  data: null,
  lang: 'zh-TW',
  day: 1,
  mapTimer: null,
  chipObserver: null,
  chipVisibility: {}
};

var els = {
  title: document.querySelector('title'),
  mapPanel: document.getElementById('mapPanel'),
  mapLoading: document.getElementById('mapLoading'),
  mapLoadingText: document.getElementById('mapLoadingText'),
  chipStrip: document.getElementById('chipStrip'),
  dayTabs: document.getElementById('dayTabs'),
  sidebar: document.getElementById('sidebar'),
  sidebarBody: document.getElementById('sidebarBody'),
  printBody: document.getElementById('printBody'),
  sidebarHeader: document.getElementById('sidebarHeader'),
  sheetHandle: document.getElementById('sheetHandle'),
  handleHint: document.getElementById('handleHint'),
  tripTitle: document.getElementById('tripTitle'),
  tripSubtitle: document.getElementById('tripSubtitle'),
  printBtn: document.getElementById('printBtn'),
  homeLink: document.getElementById('homeLink'),
  brandEn: document.getElementById('brandEn'),
  resizeDivider: document.getElementById('resizeDivider'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxClose: document.getElementById('lightboxClose'),
  backToTop: document.getElementById('backToTop')
};

function t(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[state.lang] || value['zh-TW'] || value.en || '';
}

function ui(key) {
  return state.data.languages[state.lang].ui[key];
}

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function mapEmbedUrl(query) {
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(query) +
    '&output=embed&z=14&language=' + encodeURIComponent(state.lang);
}

var DIRFLG_BY_MODE = { driving: 'd', walking: 'w', bicycling: 'b', transit: 'r' };

function directionsEmbedUrl(origin, destination, travelMode) {
  return 'https://maps.google.com/maps?saddr=' + encodeURIComponent(origin) +
    '&daddr=' + encodeURIComponent(destination) +
    '&dirflg=' + (DIRFLG_BY_MODE[travelMode] || 'd') +
    '&output=embed&z=12&language=' + encodeURIComponent(state.lang);
}

function convertToEmbed(href) {
  try {
    var url = new URL(href);
    if (url.pathname.indexOf('/maps/dir/') !== -1) {
      var origin = url.searchParams.get('origin');
      var destination = url.searchParams.get('destination');
      if (!origin || !destination) return null;
      return directionsEmbedUrl(origin, destination, url.searchParams.get('travelmode'));
    }
    var query = url.searchParams.get('query');
    var destinationOnly = url.searchParams.get('destination');
    var value = query || destinationOnly;
    if (!value) return null;
    return mapEmbedUrl(value);
  } catch (err) {
    return null;
  }
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

function updateIframeSrc(iframe, src) {
  if (!iframe || iframe.src === src) return;
  showMapLoading();
  iframe.src = src;
}

function toggleSidebar() {
  if (window.innerWidth >= 768) return;
  var expanded = els.sidebar.classList.toggle('expanded');
  els.handleHint.textContent = expanded ? ui('collapse') : ui('expand');
}

function setActiveChip(chipKey) {
  els.chipStrip.querySelectorAll('.chip').forEach(function(chip) {
    var isActive = chip.dataset.chip === chipKey;
    chip.classList.toggle('active', isActive);
    if (isActive) {
      chip.setAttribute('aria-current', 'step');
    } else {
      chip.removeAttribute('aria-current');
    }
  });

  if (!chipKey) return;
  var target = els.chipStrip.querySelector('[data-chip="' + chipKey + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function setupScrollSpy() {
  if (state.chipObserver) {
    state.chipObserver.disconnect();
    state.chipObserver = null;
  }
  if (!window.IntersectionObserver) return;

  var items = Array.prototype.slice.call(els.sidebarBody.querySelectorAll('.tl-item[data-chip]'));
  state.chipVisibility = {};
  if (!items.length) return;

  state.chipObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      state.chipVisibility[entry.target.dataset.chip] = entry.isIntersecting;
    });
    var current = null;
    items.forEach(function(item) {
      if (state.chipVisibility[item.dataset.chip]) current = item.dataset.chip;
    });
    if (current) setActiveChip(current);
  }, {
    root: els.sidebarBody,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  });

  items.forEach(function(item) { state.chipObserver.observe(item); });
}

function currentDay() {
  return state.data.days.find(function(day) { return day.id === state.day; }) || state.data.days[0];
}

function renderChips(day) {
  els.chipStrip.innerHTML = '';
  day.chips.forEach(function(chip, index) {
    var node = el('button', 'chip ' + day.theme, chip[1]);
    node.type = 'button';
    node.dataset.chip = chip[0];
    node.addEventListener('click', function() {
      var item = els.sidebarBody.querySelector('[data-chip="' + chip[0] + '"]');
      if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setActiveChip(chip[0]);
    });
    els.chipStrip.appendChild(node);

    if (index < day.chips.length - 1) {
      els.chipStrip.appendChild(el('span', 'chip-arrow', '→'));
    }
  });
}

function renderMap(day) {
  els.mapPanel.querySelectorAll('.map-wrap').forEach(function(node) {
    node.classList.remove('active');
  });

  var mapWrap = document.getElementById('map-' + day.mapId);
  if (!mapWrap) {
    var map = state.data.maps[day.mapId];
    mapWrap = el('div', 'map-wrap');
    mapWrap.id = 'map-' + day.mapId;

    var iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Day ' + day.id + ' Map';
    iframe.addEventListener('load', hideMapLoading);
    iframe.src = mapEmbedUrl(map.query);

    var link = el('a', 'map-nav-float ' + day.theme, ui('openRoute'));
    link.href = map.routeUrl;
    link.target = '_blank';

    mapWrap.appendChild(iframe);
    mapWrap.appendChild(link);
    els.mapPanel.appendChild(mapWrap);
  }

  mapWrap.querySelector('.map-nav-float').textContent = ui('openRoute');
  mapWrap.classList.add('active');
}

function renderTabs() {
  els.dayTabs.innerHTML = '';
  state.data.days.forEach(function(day) {
    var isActive = day.id === state.day;
    var tab = el('button', 'day-tab' + (isActive ? ' active' : ''));
    tab.type = 'button';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.innerHTML = '<span class="tab-label"></span><span class="tab-sub"></span>';
    tab.querySelector('.tab-label').textContent = t(day.label);
    tab.querySelector('.tab-sub').textContent = t(day.tabSub);
    tab.addEventListener('click', function() { switchDay(day.id); });
    els.dayTabs.appendChild(tab);
  });
}

function renderTags(tags) {
  var wrap = el('div', 'tl-tags');
  (tags || []).forEach(function(tag) {
    wrap.appendChild(el('span', 'tag tag-' + tag.type, t(tag.text)));
  });
  return wrap;
}

function renderExternalLink(url, theme) {
  var link = el('a', 'tl-external-link ' + (theme || currentDay().theme), ui('openInGoogleMaps'));
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', ui('openInGoogleMaps'));
  return link;
}

function renderLinks(links) {
  var wrap = el('div', 'tl-links');
  (links || []).forEach(function(link) {
    var row = el('div', 'tl-loc');
    var theme = link.theme || currentDay().theme;
    var nameBtn = el('button', 'tl-loc-name tl-map-btn ' + theme, t(link.label));
    nameBtn.type = 'button';
    nameBtn.dataset.href = link.url;
    nameBtn.setAttribute('aria-label', ui('viewMap') + ': ' + t(link.label));
    row.appendChild(nameBtn);
    row.appendChild(renderExternalLink(link.url, link.theme));
    wrap.appendChild(row);
  });
  return wrap;
}

function renderPhotos(photos) {
  if (!photos || !photos.length) return null;
  var wrap = el('div', 'tl-photos');
  photos.forEach(function(photo) {
    var btn = el('button', 'tl-photo');
    btn.type = 'button';
    btn.setAttribute('aria-label', ui('viewPhoto') + (photo.alt ? ': ' + photo.alt : ''));
    var img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || '';
    btn.appendChild(img);
    btn.addEventListener('click', function() { openLightbox(photo.src); });
    wrap.appendChild(btn);
  });
  return wrap;
}

function renderCard(card, day) {
  var node = el('div', 'tl-card ' + (card.kind === 'backup' ? 'tl-card-backup' : 'tl-card-main'));
  node.appendChild(el('div', 'tl-card-label', ui(card.kind || 'main')));
  node.appendChild(el('div', 'tl-card-name', card.name));
  if (card.intro) node.appendChild(el('div', 'place-intro', t(card.intro)));
  if (card.tags) node.appendChild(renderTags(card.tags));
  if (card.links) node.appendChild(renderLinks(card.links));
  if (card.note) node.appendChild(el('div', 'tl-card-note', t(card.note)));
  var photos = renderPhotos(card.photos);
  if (photos) node.appendChild(photos);
  return node;
}

function renderTransitItem(item, isLast) {
  var row = el('div', 'tl-item tl-item-transit');
  if (item.chip) row.dataset.chip = item.chip;

  var time = el('div', 'tl-time');
  time.innerHTML = (item.time || []).join('<br>');
  row.appendChild(time);

  var axis = el('div', 'tl-axis');
  axis.appendChild(el('div', 'tl-dot sm dot-gray'));
  if (!isLast) axis.appendChild(el('div', 'tl-line tl-line-transit'));
  row.appendChild(axis);

  var body = el('div', 'tl-body tl-body-transit');
  var line = el('div', 'tl-transit-row');
  line.appendChild(el('span', 'tl-transit-icon', item.mode || '🚗'));
  var labelText = t(item.label);
  if (item.duration) labelText += ' · ' + t(item.duration);
  line.appendChild(el('span', 'tl-transit-label', labelText));
  body.appendChild(line);
  if (item.navUrl) {
    var actions = el('div', 'tl-loc');
    var routeBtn = el('button', 'tl-loc-name tl-map-btn tl-route-btn ' + (item.theme || 'd1'), ui('viewRoute'));
    routeBtn.type = 'button';
    routeBtn.dataset.href = item.navUrl;
    routeBtn.setAttribute('aria-label', ui('viewRoute') + ': ' + labelText);
    actions.appendChild(routeBtn);
    actions.appendChild(renderExternalLink(item.navUrl, item.theme || 'd1'));
    body.appendChild(actions);
  }
  if (item.note) body.appendChild(el('div', 'tl-transit-note', t(item.note)));

  row.appendChild(body);
  return row;
}

function renderItem(item, day, isLast) {
  if (item.kind === 'transit') return renderTransitItem(item, isLast);

  var row = el('div', 'tl-item');
  if (item.chip) row.dataset.chip = item.chip;

  var time = el('div', 'tl-time');
  time.innerHTML = (item.time || []).join('<br>');
  row.appendChild(time);

  var axis = el('div', 'tl-axis');
  axis.appendChild(el('div', 'tl-dot ' + (item.smallDot ? 'sm ' : '') + 'dot-' + item.dot));
  if (!isLast) axis.appendChild(el('div', 'tl-line'));
  row.appendChild(axis);

  var body = el('div', 'tl-body');
  body.appendChild(el('div', 'tl-main', t(item.title)));
  if (item.intro) body.appendChild(el('div', 'place-intro', t(item.intro)));
  if (item.links) body.appendChild(renderLinks(item.links));
  if (item.tags) body.appendChild(renderTags(item.tags));
  if (item.note) body.appendChild(el('div', 'tl-note', t(item.note)));

  if (item.cards) {
    var cards = el('div', 'tl-parallel');
    item.cards.forEach(function(card) { cards.appendChild(renderCard(card, day)); });
    body.appendChild(cards);
  }

  var photos = renderPhotos(item.photos);
  if (photos) body.appendChild(photos);

  row.appendChild(body);
  return row;
}

function renderFoodRows(rows, dietClass) {
  var cards = el('div', 'food-cards');
  rows.forEach(function(row) {
    var food = el('div', 'food-row');
    food.appendChild(el('div', 'fr-type', t(row.type)));
    var info = el('div', 'fr-info');
    info.appendChild(el('div', 'fr-name', row.name));
    info.appendChild(el('div', 'fr-veg ' + dietClass, t(row.veg)));
    food.appendChild(info);
    food.appendChild(el('div', 'fr-budget', row.budget));
    if (row.mapUrl) {
      var actions = el('div', 'fr-actions');
      var mapBtn = el('button', 'fr-link tl-map-btn', '📍');
      mapBtn.type = 'button';
      mapBtn.dataset.href = row.mapUrl;
      mapBtn.setAttribute('aria-label', ui('viewMap') + ': ' + row.name);
      mapBtn.title = ui('viewMap');
      actions.appendChild(mapBtn);
      var ext = el('a', 'fr-link fr-ext', '↗');
      ext.href = row.mapUrl;
      ext.target = '_blank';
      ext.rel = 'noopener';
      ext.setAttribute('aria-label', ui('openInGoogleMaps') + ': ' + row.name);
      ext.title = ui('openInGoogleMaps');
      actions.appendChild(ext);
      food.appendChild(actions);
    }
    cards.appendChild(food);
  });
  return cards;
}

function renderFoodSection(section) {
  if (!section) return null;
  var frag = document.createDocumentFragment();
  frag.appendChild(el('div', 'section-label', t(section.title)));

  if (section.vegRows && section.vegRows.length) {
    frag.appendChild(el('div', 'subsection-label', ui('vegPicks')));
    frag.appendChild(renderFoodRows(section.vegRows, 'fr-veg-pick'));
  }
  if (section.generalRows && section.generalRows.length) {
    frag.appendChild(el('div', 'subsection-label', ui('generalPicks')));
    frag.appendChild(renderFoodRows(section.generalRows, 'fr-general-pick'));
  }

  return frag;
}

function renderTips(tips) {
  if (!tips) return null;
  var box = el('div', 'tips-box');
  box.appendChild(el('div', 'tips-title', t(tips.title)));
  var list = el('ul', 'tips-list');
  tips.items.forEach(function(item) { list.appendChild(el('li', '', t(item))); });
  box.appendChild(list);
  return box;
}

function renderDayContent(day) {
  els.sidebarBody.innerHTML = '';

  var route = el('div', 'route-strip ' + day.theme);
  route.appendChild(el('span', 'route-strip-label', t(day.route)));
  var nav = el('a', 'nav-btn ' + day.theme, ui('navigate'));
  nav.href = state.data.maps[day.mapId].routeUrl;
  nav.target = '_blank';
  route.appendChild(nav);
  els.sidebarBody.appendChild(route);

  var timeline = el('div', 'timeline');
  day.items.forEach(function(item, index) {
    timeline.appendChild(renderItem(item, day, index === day.items.length - 1));
  });
  els.sidebarBody.appendChild(timeline);

  var food = renderFoodSection(day.foodSection);
  if (food) els.sidebarBody.appendChild(food);

  var tips = renderTips(day.tips);
  if (tips) els.sidebarBody.appendChild(tips);
}

function renderPrintContent() {
  var originalDay = state.day;
  els.printBody.innerHTML = '';

  state.data.days.forEach(function(day) {
    state.day = day.id; // renderLinks/renderExternalLink fall back to currentDay().theme
    var section = el('div', 'print-day-section');

    var heading = el('div', 'print-day-heading ' + day.theme);
    heading.appendChild(el('span', 'print-day-label', t(day.label)));
    heading.appendChild(el('span', 'print-day-sub', t(day.tabSub)));
    section.appendChild(heading);

    var route = el('div', 'route-strip ' + day.theme);
    route.appendChild(el('span', 'route-strip-label', t(day.route)));
    section.appendChild(route);

    var timeline = el('div', 'timeline');
    day.items.forEach(function(item, index) {
      timeline.appendChild(renderItem(item, day, index === day.items.length - 1));
    });
    section.appendChild(timeline);

    var food = renderFoodSection(day.foodSection);
    if (food) section.appendChild(food);

    var tips = renderTips(day.tips);
    if (tips) section.appendChild(tips);

    els.printBody.appendChild(section);
  });

  state.day = originalDay;
}

function renderStaticText() {
  var langData = state.data.languages[state.lang];
  els.title.textContent = langData.tripTitle;
  els.tripTitle.textContent = langData.tripTitle;
  els.tripSubtitle.textContent = langData.tripSubtitle;
  els.printBtn.textContent = ui('print');
  els.handleHint.textContent = els.sidebar.classList.contains('expanded') ? ui('collapse') : ui('expand');
  els.brandEn.textContent = BRAND[state.lang].brandEn;
  els.homeLink.setAttribute('title', BRAND[state.lang].homeTitle);
  els.mapLoadingText.textContent = ui('mapLoading');
  els.chipStrip.setAttribute('aria-label', ui('routeStops'));
  els.dayTabs.setAttribute('aria-label', ui('dayTabsLabel'));
  els.backToTop.setAttribute('aria-label', ui('backToTop'));
  els.backToTop.setAttribute('title', ui('backToTop'));
  els.lightboxClose.setAttribute('aria-label', ui('closeLightbox'));
}

function render() {
  var day = currentDay();
  renderStaticText();
  renderTabs();
  renderChips(day);
  renderMap(day);
  renderDayContent(day);
  setActiveChip(null);
  setupScrollSpy();
}

function switchDay(dayId) {
  state.day = dayId;
  render();

  if (window.innerWidth < 768) {
    els.sidebar.classList.add('expanded');
    els.handleHint.textContent = ui('collapse');
    els.sidebarBody.scrollTop = 0;
  }
}

function openLightbox(src) {
  els.lightboxImg.src = src;
  els.lightbox.classList.add('open');
}

function closeLightbox() {
  els.lightbox.classList.remove('open');
}

function markSelected(item) {
  if (!item) return;
  els.sidebarBody.querySelectorAll('.tl-item').forEach(function(node) {
    node.classList.remove('selected');
  });
  item.classList.add('selected');
  setActiveChip(item.dataset.chip || null);
}

function previewOnMap(item, href) {
  markSelected(item);
  var embedUrl = href ? convertToEmbed(href) : null;
  var iframe = els.mapPanel.querySelector('.map-wrap.active iframe');
  if (embedUrl && iframe) updateIframeSrc(iframe, embedUrl);
  if (window.innerWidth < 768) {
    els.sidebar.classList.remove('expanded');
    els.handleHint.textContent = ui('expand');
  }
}

function handleTimelineClick(event) {
  var mapBtn = event.target.closest('.tl-map-btn');
  if (mapBtn) {
    previewOnMap(mapBtn.closest('.tl-item'), mapBtn.dataset.href);
    return;
  }

  var extLink = event.target.closest('.tl-external-link');
  if (extLink) {
    markSelected(extLink.closest('.tl-item'));
    return;
  }
}

function setupResize() {
  var divider = els.resizeDivider;
  var isDragging = false;

  function startDrag(event) {
    if (window.innerWidth < 768) return;
    isDragging = true;
    divider.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }

  function onDrag(clientX) {
    if (!isDragging) return;
    var minW = Math.floor(window.innerWidth / 4);
    var maxW = Math.floor(window.innerWidth / 2);
    var newW = Math.max(minW, Math.min(maxW, window.innerWidth - clientX));
    els.sidebar.style.width = newW + 'px';
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    divider.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  divider.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', function(event) { onDrag(event.clientX); });
  document.addEventListener('mouseup', stopDrag);
  divider.addEventListener('touchstart', function(event) { startDrag(event.touches[0]); }, { passive: false });
  document.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    onDrag(event.touches[0].clientX);
    event.preventDefault();
  }, { passive: false });
  document.addEventListener('touchend', stopDrag);
}

function setupEvents() {
  Site.onLangChange(function(lang) {
    state.lang = lang;
    render();
  });

  els.sheetHandle.addEventListener('click', toggleSidebar);
  els.sidebarHeader.addEventListener('click', toggleSidebar);
  els.printBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    window.print();
  });
  window.addEventListener('beforeprint', renderPrintContent);
  els.sidebarBody.addEventListener('click', handleTimelineClick);
  els.lightbox.addEventListener('click', closeLightbox);
  els.lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLightbox();
  });

  els.sidebarBody.addEventListener('scroll', function() {
    els.backToTop.classList.toggle('show', els.sidebarBody.scrollTop > 280);
  });
  els.backToTop.addEventListener('click', function() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.sidebarBody.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  setupResize();
}

function init(data) {
  state.data = data;
  state.lang = Site.getLang();
  if (!state.data.languages[state.lang]) state.lang = state.data.defaultLanguage;
  setupEvents();
  render();
}

init(ITINERARY_DATA);
