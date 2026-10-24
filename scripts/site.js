// Site-wide behaviour shared by every page: theme (light / dark / follow the
// system), language (zh-TW / en) and the two header toggle buttons.
// Load it before the page's own script (Noosa: defer, after data.js). On load it
// only settles the current language and theme; it never notifies. Each page then
// reads Site.getLang(), renders once, and subscribes with Site.onLangChange().
// Toggle buttons are found by data-toggle="theme" / data-toggle="lang".
(function () {
  'use strict';

  var root = document.documentElement;

  var LABELS = {
    'zh-TW': { themeDark: '切換深色模式', themeLight: '切換淺色模式' },
    en: { themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode' }
  };

  // The language button is labelled in the language it switches to (STYLE-PLAN C.7 #3).
  var LANG_BUTTON = {
    'zh-TW': { text: 'EN', label: 'Switch to English', lang: 'en' },
    en: { text: '中文', label: '切換為中文', lang: 'zh-TW' }
  };

  var ICONS = {
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<circle cx="12" cy="12" r="4"></circle>' +
      '<line x1="12" y1="2" x2="12" y2="4"></line>' +
      '<line x1="12" y1="20" x2="12" y2="22"></line>' +
      '<line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>' +
      '<line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>' +
      '<line x1="2" y1="12" x2="4" y2="12"></line>' +
      '<line x1="20" y1="12" x2="22" y2="12"></line>' +
      '<line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>' +
      '<line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>' +
      '</svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"></path>' +
      '</svg>'
  };

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var langListeners = [];
  var lang;

  // localStorage can be blocked (private mode, file:// in some browsers):
  // the page still works, it just doesn't remember.
  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* not remembered */ }
  }

  // ── language ──
  // Order (P1, D5): ?lang= in the URL → remembered `lang` → browser language → Chinese.
  // Only a valid URL value or the toggle button writes the memory.
  function langFromUrl() {
    try {
      var value = new URLSearchParams(window.location.search).get('lang');
      if (value === 'en') return 'en';
      if (value === 'zh' || value === 'zh-TW') return 'zh-TW';
    } catch (e) { /* URLSearchParams unavailable */ }
    return null;  // missing or unknown (e.g. ?lang=fr): fall through
  }

  function langFromBrowser() {
    var nav = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (!nav) return 'zh-TW';
    return nav.indexOf('zh') === 0 ? 'zh-TW' : 'en';
  }

  function initialLang() {
    var fromUrl = langFromUrl();
    if (fromUrl) {
      storageSet('lang', fromUrl);
      return fromUrl;
    }
    var saved = storageGet('lang');
    // Any remembered value other than `en` (including the old `zh`) means Chinese,
    // not "unknown": it does not fall through to the browser language.
    if (saved) return saved === 'en' ? 'en' : 'zh-TW';
    return langFromBrowser();
  }

  function getLang() {
    return lang;
  }

  function setLang(next) {
    next = next === 'en' ? 'en' : 'zh-TW';
    storageSet('lang', next);
    if (next === lang) return;
    lang = next;
    root.lang = lang;
    updateButtons();
    langListeners.forEach(function (fn) { fn(lang); });
  }

  function onLangChange(fn) {
    langListeners.push(fn);
  }

  // ── theme ──
  // Only `light` / `dark` are accepted; anything else (or nothing) follows the system.
  function savedTheme() {
    var value = storageGet('theme');
    return value === 'light' || value === 'dark' ? value : null;
  }

  function getTheme() {
    return savedTheme() || 'system';
  }

  function isDark() {
    var theme = root.getAttribute('data-theme');
    if (theme === 'light' || theme === 'dark') return theme === 'dark';
    return systemDark.matches;
  }

  function setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
      storageSet('theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    updateButtons();
  }

  // ── toggle buttons ──
  function themeButton() {
    return document.querySelector('[data-toggle="theme"]');
  }

  function langButton() {
    return document.querySelector('[data-toggle="lang"]');
  }

  function updateButtons() {
    var theme = themeButton();
    if (theme) {
      var dark = isDark();
      var label = dark ? LABELS[lang].themeLight : LABELS[lang].themeDark;
      theme.innerHTML = dark ? ICONS.sun : ICONS.moon;
      theme.setAttribute('aria-label', label);
      theme.setAttribute('title', label);
    }
    var language = langButton();
    if (language) {
      var button = LANG_BUTTON[lang];
      language.textContent = button.text;
      language.setAttribute('aria-label', button.label);
      language.setAttribute('title', button.label);
      language.lang = button.lang;
    }
  }

  function setupButtons() {
    var theme = themeButton();
    if (theme) {
      theme.addEventListener('click', function () {
        // Flip what is on screen now, so the first click always changes something
        // even when the page is following a dark system theme.
        setTheme(isDark() ? 'light' : 'dark');
      });
    }
    var language = langButton();
    if (language) {
      language.addEventListener('click', function () {
        setLang(lang === 'en' ? 'zh-TW' : 'en');
      });
    }
    updateButtons();
  }

  // ── start ──
  lang = initialLang();
  root.lang = lang;
  var theme = savedTheme();
  if (theme) root.setAttribute('data-theme', theme);
  else root.removeAttribute('data-theme');

  systemDark.addEventListener('change', updateButtons);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupButtons);
  } else {
    setupButtons();
  }

  window.Site = {
    getLang: getLang,
    setLang: setLang,
    onLangChange: onLangChange,
    getTheme: getTheme,
    setTheme: setTheme,
    isDark: isDark,
    icon: function (name) { return ICONS[name] || ''; }
  };
})();
