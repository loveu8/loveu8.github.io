var button = document.getElementById('theme');
var language = 'zh-TW';
try { if (localStorage.getItem('lang') === 'en') language = 'en'; } catch (e) {}
var translations = [
  ['.brand', '阿星 (Lorn)'],
  ['#title', 'Places in everyday life'],
  ['#intro', 'I am 阿星 (Lorn), a Java backend engineer living in Brisbane. This is where I keep notes on technology, travel, and little coffee discoveries.'],
  ['#about-link', 'Browse my articles'],
  ['#travel-heading', 'Travel & local finds'],
  ['#noosa-link', 'A Noosa getaway'],
  ['#noosa-desc', 'Mountains, coast, and markets in one trip, with routes and maps to take along.'],
  ['#cafe-link', 'Brisbane cafe map'],
  ['#cafe-desc', 'Find your next cafe by type and area, and see what people like to order.'],
  ['#bakery-link', 'Brisbane bakery map'],
  ['#bakery-desc', 'Sourdough, croissants, and cakes worth a detour. Find your next stop on the map.'],
  ['#notes-heading', 'Research notes'],
  ['#report-link', 'STARLUX entering Australia'],
  ['#report-desc', 'Research on the market, routes, and opportunities.'],
  ['footer', '© 2026 阿星 (Lorn)']
].map(function (row) {
  var element = document.querySelector(row[0]);
  if (!element) return null;
  return { element: element, zh: element.firstChild.nodeValue, en: row[1] };
}).filter(Boolean);
// Icons copied from travel/shared/map-list.js so the toggle matches the travel pages.
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
  return document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
}
function updateLabel() {
  var dark = isDark();
  var label = language === 'en' ? (dark ? 'Switch to light mode' : 'Switch to dark mode') : (dark ? '切換淺色模式' : '切換深色模式');
  button.innerHTML = dark ? SUN_ICON_SVG : MOON_ICON_SVG;
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
}
function applyLanguage() {
  var en = language === 'en';
  document.documentElement.lang = en ? 'en' : 'zh-Hant';
  document.title = en ? '阿星 (Lorn) · Places in everyday life' : '阿星 · 生活裡的目的地';
  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = en ? 'Travel, technology, and everyday notes by 阿星 (Lorn). Java backend development and career reflections, Australian itineraries, and Brisbane cafe and bakery maps.' : '阿星的旅行、技術與日常筆記。分享 Java 後端開發與職涯經驗，收集澳洲旅行路線、布里斯本咖啡與烘焙地圖。';
  translations.forEach(function (item) {
    item.element.firstChild.nodeValue = en ? item.en + (item.element.classList.contains('pill') ? ' ' : '') : item.zh;
  });
  document.querySelector('.item img').alt = en ? 'View along the Noosa coastal walk' : 'Noosa 海岸步道景色';
  var toggle = document.getElementById('language');
  toggle.textContent = en ? '中文' : 'EN';
  toggle.setAttribute('aria-label', en ? '切換為繁體中文' : 'Switch to English');
  toggle.lang = en ? 'zh-Hant' : 'en';
  updateLabel();
}
button.addEventListener('click', function () {
  var next = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  updateLabel();
});
document.getElementById('language').addEventListener('click', function () {
  language = language === 'en' ? 'zh-TW' : 'en';
  try { localStorage.setItem('lang', language); } catch (e) {}
  applyLanguage();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLabel);
applyLanguage();
