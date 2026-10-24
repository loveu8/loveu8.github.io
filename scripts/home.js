// Homepage translation. Theme, language choice and the two toggles live in scripts/site.js.
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
function applyLanguage(language) {
  var en = language === 'en';
  document.title = en ? '阿星 (Lorn) · Places in everyday life' : '阿星 · 生活裡的目的地';
  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = en ? 'Travel, technology, and everyday notes by 阿星 (Lorn). Java backend development and career reflections, Australian itineraries, and Brisbane cafe and bakery maps.' : '阿星的旅行、技術與日常筆記。分享 Java 後端開發與職涯經驗，收集澳洲旅行路線、布里斯本咖啡與烘焙地圖。';
  translations.forEach(function (item) {
    item.element.firstChild.nodeValue = en ? item.en + (item.element.classList.contains('btn-pill') ? ' ' : '') : item.zh;
  });
  document.querySelector('.item img').alt = en ? 'View along the Noosa coastal walk' : 'Noosa 海岸步道景色';
}
applyLanguage(Site.getLang());
Site.onLangChange(applyLanguage);
