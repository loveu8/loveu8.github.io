var button = document.getElementById('theme');
var language = 'zh-TW';
try { if (localStorage.getItem('lang') === 'en') language = 'en'; } catch (e) {}
var translations = [
  ['.brand small', 'Travel, technology & everyday notes'],
  ['#title', 'Places in everyday life'],
  ['.intro p:last-child', 'Trips, coffee, and little discoveries worth keeping.'],
  ['#about-heading', 'About me'],
  ['#about-role', 'Java backend engineer · Project manager · Technology & career writer'],
  ['#about-summary', 'I am 阿星, based in Brisbane, with over eight years of experience in Java backend development and project collaboration. I write about technology and careers as 阿星學長. This is a collection of work reflections, travel, coffee, and everyday discoveries.'],
  ['#about-more', 'More about me'],
  ['#about-experience', 'My work focuses on payments, membership, and authentication for travel e-commerce, spanning architecture, performance, and observability. I have also led cross-functional teams from requirements through delivery.'],
  ['#about-writing', 'Drawing on hands-on experience, I write about SQL, data analysis, project communication, career transitions into engineering, and interview preparation. I aim to explain both the technology and the trade-offs, helping readers decide what fits their circumstances. Beyond work, this site collects travel routes, cafes, and everyday discoveries.'],
  ['#about-skills', 'Java / Spring · API design · PostgreSQL / Oracle / Redis · CI/CD · Team leadership'],
  ['#about-link', 'Browse my articles'],
  ['#travel-heading', 'Travel & local finds'],
  ['section[aria-labelledby="travel-heading"] .section-head span', 'Queensland, Australia'],
  ['.tag', 'Coast · Walks · Markets'],
  ['.feature h3', 'A Noosa getaway'],
  ['.feature .description', 'Mountains, coastal walks, and markets, with a handy itinerary and maps for the journey.'],
  ['.feature .pill', 'View itinerary'],
  ['.compact:not(.bakery) h3', 'Brisbane cafe map'],
  ['.compact:not(.bakery) .description', 'Find your next cafe by type and area, and see what people like to order.'],
  ['.compact:not(.bakery) .pill', 'Explore cafes'],
  ['.bakery h3', 'Brisbane bakery map'],
  ['.bakery .description', 'Sourdough, croissants, and cakes worth a detour. Find your next stop on the map.'],
  ['.bakery .pill', 'Explore bakeries'],
  ['#notes-heading', 'Research notes'],
  ['.notes .section-head span', 'Observations & analysis'],
  ['.report h3', 'STARLUX entering Australia'],
  ['.report p', 'Research on the market, routes, and opportunities.'],
  ['.report .pill', 'Read report'],
  ['footer>span:first-child', '阿星 · Travel, technology & everyday notes'],
  ['.demo', 'Homepage demo · Design preview']
].map(function (row) {
  var element = document.querySelector(row[0]);
  if (!element) return null;
  return { element: element, zh: element.firstChild.nodeValue, en: row[1] };
}).filter(Boolean);
function isDark() {
  return document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
}
function updateLabel() {
  button.textContent = language === 'en' ? (isDark() ? 'Light mode' : 'Dark mode') : (isDark() ? '切換淺色模式' : '切換深色模式');
}
function applyLanguage() {
  var en = language === 'en';
  document.documentElement.lang = en ? 'en' : 'zh-Hant';
  document.title = en ? '阿星 · Places in everyday life' : '阿星 · 生活裡的目的地';
  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = en ? 'Travel, technology, and everyday notes by 阿星. Java backend development and career reflections, Australian itineraries, and Brisbane cafe and bakery maps.' : '阿星的旅行、技術與日常筆記。分享 Java 後端開發與職涯經驗，收集澳洲旅行路線、布里斯本咖啡與烘焙地圖。';
  translations.forEach(function (item) {
    item.element.firstChild.nodeValue = en ? item.en + (item.element.classList.contains('pill') ? ' ' : '') : item.zh;
  });
  document.querySelector('.feature img').alt = en ? 'View along the Noosa coastal walk' : 'Noosa 海岸步道景色';
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
document.getElementById('about-more').addEventListener('click', function () {
  var expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', String(!expanded));
  document.getElementById('about-details').hidden = expanded;
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLabel);
applyLanguage();
