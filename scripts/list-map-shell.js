// Shared shell for list-map pages (map + sidebar layout, e.g. travel/australia/brisbane/bakery/):
// the mobile sheet, the drag divider, the map iframe (overview ⇄ area ⇄ single place), the filter-row
// scroll buttons, the top chip strip with scroll-spy, back-to-top, the lightbox and the print
// button. The page script owns its data, filters and cards, and calls
// ListMapShell.create({...}) once; the returned object is how it talks to the shell.
//
// Cards must be `.shop-card` elements with `id="shop-<id>"` and `data-id="<id>"` inside
// #sidebarBody, so chips, scroll-spy and scrollToCard can find them.

var ListMapShell = (function() {
  var MOBILE_MAX = 768;

  // Strings the shell renders. A page's `ui[lang]` may override any of them, and must add
  // `title` and `mapTitle`.
  var SHELL_UI = {
    'zh-TW': {
      mapLang: 'zh-TW', brandEn: '', homeTitle: '回到首頁',
      expand: '▲ 查看清單', collapse: '▼ 收起清單', print: '🖨️ 列印',
      chipStrip: '目前清單的店家', overview: '🗺️ 回到全部店家', mapLoading: '地圖更新中',
      backToTop: '回到頂部', closeLightbox: '關閉圖片',
      divider: '拖曳調整地圖與清單寬度', scrollPrev: '往左捲動', scrollNext: '往右捲動'
    },
    en: {
      mapLang: 'en', brandEn: ' (Lorn)', homeTitle: 'Back to home',
      expand: '▲ View list', collapse: '▼ Hide list', print: '🖨️ Print',
      chipStrip: 'Shops in this list', overview: '🗺️ Back to all shops', mapLoading: 'Updating map',
      backToTop: 'Back to top', closeLightbox: 'Close photo',
      divider: 'Drag to resize the map and list', scrollPrev: 'Scroll left', scrollNext: 'Scroll right'
    }
  };

  // options:
  //   ui            { 'zh-TW': {...}, en: {...} } — page strings; merged over SHELL_UI.
  //   overviewUrl   the My Maps embed URL; empty → single-place view of fallbackPlace.
  //   fallbackPlace map query used while there is no overviewUrl (e.g. 'Brisbane QLD').
  //   fallbackZoom  zoom for that fallback view (default 11).
  //   onLangChange  function(lang) — re-render page text; the shell keeps the list's scroll.
  //   onOverview    function() — called when the map returns to the overview.
  function create(options) {
    var ui = {};
    Object.keys(SHELL_UI).forEach(function(lang) {
      ui[lang] = Object.assign({}, SHELL_UI[lang], options.ui[lang]);
    });

    var state = {
      lang: Site.getLang(),
      placeQuery: null,  // the 📍 single-place map query; null = overview
      area: null,        // the showArea() view, e.g. one state; null = none
      mapTimer: null,
      chipObserver: null,
      chipVisibility: {}
    };

    var els = {
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
      printBtn: document.getElementById('printBtn'),
      homeLink: document.getElementById('homeLink'),
      brandEn: document.getElementById('brandEn'),
      resizeDivider: document.getElementById('resizeDivider'),
      backToTop: document.getElementById('backToTop'),
      lightbox: document.getElementById('lightbox'),
      lightboxImg: document.getElementById('lightboxImg'),
      lightboxClose: document.getElementById('lightboxClose'),
      scrollBtns: Array.prototype.slice.call(document.querySelectorAll('.scroll-btn'))
    };

    // ── helpers ──
    function isMobile() {
      return window.innerWidth < MOBILE_MAX;
    }

    function reduceMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // t('key', {n: 3}) — look up a UI string and fill {placeholders}.
    function t(key, vars) {
      var text = ui[state.lang][key];
      Object.keys(vars || {}).forEach(function(k) { text = text.split('{' + k + '}').join(vars[k]); });
      return text;
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

    // ── filter rows (horizontal scrollers with ‹ › buttons) ──
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

    // The scrollers are whatever the ‹ › buttons point at (data-target).
    function filterScrollers() {
      var scrollers = [];
      els.scrollBtns.forEach(function(btn) {
        var target = document.getElementById(btn.dataset.target);
        if (scrollers.indexOf(target) === -1) scrollers.push(target);
      });
      return scrollers;
    }

    function setupFilterScroll() {
      var reduce = reduceMotion();
      els.scrollBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var target = document.getElementById(btn.dataset.target);
          target.scrollBy({ left: Number(btn.dataset.dir) * target.clientWidth * 0.7, behavior: reduce ? 'auto' : 'smooth' });
        });
      });
      filterScrollers().forEach(function(scroller) {
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

    // ── top chip strip (scroll-spy, never touches the map) ──
    function renderChips(items) {
      els.chipStrip.innerHTML = '';
      els.chipStrip.setAttribute('aria-label', t('chipStrip'));
      items.forEach(function(item) {
        var chip = document.createElement('button');
        chip.className = 'chip';
        chip.textContent = item.name;
        chip.type = 'button';
        chip.dataset.id = item.id;
        chip.addEventListener('click', function() {
          scrollToCard(item.id);
          setActiveChip(item.id);
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

    // Call after the list is rendered: rebuilds the chips for `items` ({id, name}) and
    // re-attaches scroll-spy to the new cards.
    function refreshChips(items) {
      renderChips(items);
      setupScrollSpy();
    }

    function scrollToCard(id) {
      var card = document.getElementById('shop-' + id);
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    }

    // ── map (Google embeds, no API key) ──
    function singlePlaceEmbedUrl(query, zoom) {
      return 'https://maps.google.com/maps?q=' + encodeURIComponent(query) +
        '&output=embed&z=' + zoom + '&language=' + t('mapLang');
    }

    function overviewUrl() {
      // Until the My Maps embed URL is filled in, fall back to a plain view of the page's area.
      return options.overviewUrl || singlePlaceEmbedUrl(options.fallbackPlace, options.fallbackZoom || 11);
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
      if (options.onOverview) options.onOverview();
      state.placeQuery = null;
      state.area = null;
      els.overviewBtn.hidden = true;
      setMapSrc(overviewUrl());
    }

    // The My Maps overview re-centred on an area, keeping its pins; without My Maps, the
    // single-place embed of the area's name at the area's fallback zoom.
    function areaUrl(area) {
      if (options.overviewUrl) return options.overviewUrl + '&ll=' + area.lat + ',' + area.lng + '&z=' + area.zoom;
      return singlePlaceEmbedUrl(area.query, area.fallbackZoom);
    }

    // Frame an area (e.g. the state a filter picked) and offer the way back to the overview.
    // area: { lat, lng, zoom, query, fallbackZoom }. Leaves the mobile sheet as it is.
    function showArea(area) {
      state.placeQuery = null;
      state.area = area;
      els.overviewBtn.hidden = false;
      setMapSrc(areaUrl(area));
    }

    // 📍: show one place (a Google Maps search query) and offer the way back to the overview.
    function previewPlace(query) {
      state.area = null;
      state.placeQuery = query;
      setMapSrc(singlePlaceEmbedUrl(query, 16));
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
    function renderText() {
      els.title.textContent = t('title');
      els.brandEn.textContent = t('brandEn');
      els.homeLink.setAttribute('title', t('homeTitle'));
      els.pageTitle.textContent = t('title');
      els.handleHint.textContent = els.sidebar.classList.contains('expanded') ? t('collapse') : t('expand');
      els.printBtn.textContent = t('print');
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
    }

    function switchLanguage(lang) {
      state.lang = lang;
      var scroll = els.sidebarBody.scrollTop;
      renderText();
      options.onLangChange(lang);
      els.sidebarBody.scrollTop = scroll;
      // Keep the single-place map in the new language; the My Maps overview has no language switch.
      if (state.placeQuery) setMapSrc(singlePlaceEmbedUrl(state.placeQuery, 16));
      if (state.area) setMapSrc(areaUrl(state.area));
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
      Site.onLangChange(switchLanguage);

      els.sheetHandle.addEventListener('click', toggleSheet);
      els.sidebarHeader.addEventListener('click', toggleSheet);
      els.printBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        window.print();
      });

      els.mapFrame.addEventListener('load', hideMapLoading);
      els.overviewBtn.addEventListener('click', showOverview);

      els.sidebarBody.addEventListener('scroll', function() {
        els.backToTop.classList.toggle('show', els.sidebarBody.scrollTop > 280);
      });
      els.backToTop.addEventListener('click', function() {
        els.sidebarBody.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
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

    renderText();
    setupEvents();

    return {
      lang: function() { return state.lang; },
      t: t,
      setSheet: setSheet,
      revealActive: revealActive,
      updateScrollButtons: updateScrollButtons,
      refreshChips: refreshChips,
      setActiveChip: setActiveChip,
      scrollToCard: scrollToCard,
      previewPlace: previewPlace,
      showArea: showArea,
      showOverview: showOverview,
      openLightbox: openLightbox
    };
  }

  return { create: create };
})();
