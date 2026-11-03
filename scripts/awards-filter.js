// Award-winning shops map — the filter rules, with no DOM, so node can test them
// (travel/tools/tests/awards_filter.test.js runs UI-PLAN.md 5.1's cases).
// Loaded by travel/australia/awards/index.html before scripts/awards.js.
//
// Two layers, both must hold (UI-PLAN 5):
//   shop layer  — keyword, state, city, type: any store / any type may match;
//   award layer — competition, year, level, item group: ONE headline award (tier "top":
//                 champion, gold, 1st place) must meet all of them. Silver and 2nd place
//                 never make a shop match (D1; user chose A on 2026-11-02).
// The keyword is shop layer, so it need not hit the same award as the award conditions.

var AwardsFilter = (function() {
  var ALL = 'all';
  // Champion titles that name no item (best in show, or a whole class).
  var NO_ITEM = /^(champion )?(product of show|overall champion|viennoiserie)$/i;
  var SMALL_WORDS = ['a', 'an', 'and', 'au', 'de', 'di', 'in', 'of', 'on', 'or', 'the', 'with'];
  var AWARD_KEYS = ['comp', 'year', 'level', 'group'];

  // Level keys: champion, gold, silver (medal_by_score), first, second (placing),
  // top100 (a place in The World's 100 Best Coffee Shops ranking; any place counts).
  function levelKey(award) {
    if (award.level === 'champion') return 'champion';
    if (award.level === 'ranking') return 'top100';
    if (award.level === 'medal') return award.medal;
    return award.rank === 1 ? 'first' : 'second';
  }

  // Official product names are often all caps; show them in Title Case, small words kept lower.
  function titleCase(text) {
    if (!text || text !== text.toUpperCase()) return text;
    return text.toLowerCase().replace(/(^|[\s\-(\/])([a-z]+)/g, function(m, sep, word, offset) {
      if (offset > 0 && sep === ' ' && SMALL_WORDS.indexOf(word) !== -1) return m;
      return sep + word.charAt(0).toUpperCase() + word.slice(1);
    });
  }

  // Official class names without the examples and specs ("International Bread (e.g. baguette…)"
  // → "International Bread"; "Traditional Rye Sourdough - Minimum 680gm" → "Traditional Rye
  // Sourdough"). The full name stays in the row's title and behind the source link (UI-PLAN 3.4).
  function shortClass(category) {
    return category
      .replace(/^(\d+\s*x\s+|\d+\s*gm?\s+|\d+\s+)+/i, '')  // Queensland: "2 x Caramel Slice", "450gm Wholemeal Cob"
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/,\s*including.*$/i, '')
      .replace(/\s*-\s*Minimum.*$/i, '')
      .replace(/,?\s*etc\.?$/i, '')
      .trim();
  }

  // The item an award names: the product if the result gives one (minus a repeated brand
  // prefix), else the short class name for placings and class champions, cut at the first
  // comma ("Cakes, Tortes & Gateaux" → "Cakes"). Best-in-show titles name no item.
  function itemName(business, award) {
    var text;
    if (award.level === 'ranking') return null;  // a shop ranking names no drink or dish
    if (award.product) {
      text = award.product;
      var brand = business.name.toUpperCase() + ' ';
      if (text.toUpperCase().indexOf(brand) === 0) text = text.slice(brand.length);
    } else {
      if (award.level === 'champion' && NO_ITEM.test(award.category)) return null;
      text = shortClass(award.category).replace(/^Champion /, '').replace(/,.*$/, '');
    }
    return titleCase(text.trim()) || null;
  }

  // Lower case, accents off ("Café" → "cafe"), spaces collapsed.
  function normalize(text) {
    return String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function isSet(value) {
    return value != null && value !== '' && value !== ALL;
  }

  function topAwards(business) {
    return business.awards.filter(function(a) { return a.tier === 'top'; });
  }

  // The text a keyword is looked for in: shop name, each store's name, suburb and city,
  // and the headline awards' item names (UI-PLAN 3.1).
  function searchText(business) {
    if (business._search) return business._search;
    var parts = [business.name];
    business.locations.forEach(function(l) { parts.push(l.name, l.suburb, l.city); });
    topAwards(business).forEach(function(a) { parts.push(itemName(business, a) || ''); });
    var text = normalize(parts.join(' | '));
    Object.defineProperty(business, '_search', { value: text, enumerable: false });
    return text;
  }

  function awardMatches(award, f) {
    return award.tier === 'top' &&
      (!isSet(f.comp) || award.comp === f.comp) &&
      (!isSet(f.year) || award.year === Number(f.year)) &&
      (!isSet(f.level) || levelKey(award) === f.level) &&
      (!isSet(f.group) || award.group === f.group);
  }

  function hasAwardFilter(f) {
    return AWARD_KEYS.some(function(k) { return isSet(f[k]); });
  }

  // f: { q, state, city, type, comp, year, level, group }; unset = missing, '' or ALL.
  // typeGroups: PAGE_CONFIG.typeGroups ({ code, types }).
  function matches(business, f, typeGroups) {
    if (isSet(f.state) && !business.locations.some(function(l) { return l.state === f.state; })) return false;
    if (isSet(f.city) && !business.locations.some(function(l) {
      return l.city === f.city && (!isSet(f.state) || l.state === f.state);
    })) return false;
    if (isSet(f.type)) {
      var group = (typeGroups || []).find(function(g) { return g.code === f.type; });
      if (!group || !business.types.some(function(t) { return group.types.indexOf(t) !== -1; })) return false;
    }
    var q = normalize(f.q);
    if (q && searchText(business).indexOf(q) === -1) return false;
    if (hasAwardFilter(f) && !business.awards.some(function(a) { return awardMatches(a, f); })) return false;
    return true;
  }

  function filter(businesses, f, typeGroups) {
    return businesses.filter(function(b) { return matches(b, f, typeGroups); });
  }

  // How many shops a button would show: every other condition kept, this one set to value.
  function countWith(businesses, f, key, value, typeGroups) {
    var g = {};
    Object.keys(f).forEach(function(k) { g[k] = f[k]; });
    g[key] = value;
    return filter(businesses, g, typeGroups).length;
  }

  var api = {
    ALL: ALL,
    AWARD_KEYS: AWARD_KEYS,
    levelKey: levelKey,
    titleCase: titleCase,
    shortClass: shortClass,
    itemName: itemName,
    normalize: normalize,
    isSet: isSet,
    awardMatches: awardMatches,
    hasAwardFilter: hasAwardFilter,
    matches: matches,
    filter: filter,
    countWith: countWith
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  return api;
})();
