"""Tests for make_awards_data.py. Run from the repo root:

    python -m unittest discover travel/tools/tests

awards_fixture/ is a small valid set of the seven csv files that covers every
publish rule. Each check test breaks one cell and expects that check's message.
"""
import copy
import csv
import datetime
import io
import os
import shutil
import sys
import tempfile
import unittest
from contextlib import redirect_stdout

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import make_awards_data as m

FIXTURE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "awards_fixture")
TODAY = datetime.date(2026, 10, 29)
TABLES = m.load(FIXTURE)


def row(tables, name, key, value):
    return next(r for r in tables[name] if r[key] == value)


class CheckTest(unittest.TestCase):
    def setUp(self):
        self.t = copy.deepcopy(TABLES)

    def award(self, award_id="RAS-PB-2025-C2-E10"):
        return row(self.t, "awards", "award_id", award_id)

    def location(self, location_id="L-alpha-north"):
        return row(self.t, "locations", "location_id", location_id)

    def attribution(self, award_id):
        return row(self.t, "award_attributions", "award_id", award_id)

    def assertError(self, text):
        errors, _ = m.check(self.t, TODAY)
        self.assertTrue(any(text in e for e in errors), "no error containing %r in %s" % (text, errors))

    def assertWarning(self, text):
        errors, warnings = m.check(self.t, TODAY)
        self.assertEqual(errors, [])
        self.assertTrue(any(text in w for w in warnings), "no warning containing %r in %s" % (text, warnings))

    def test_fixture_is_clean(self):
        self.assertEqual(m.check(self.t, TODAY), ([], []))

    # cells
    def test_required_empty(self):
        self.award()["award_level"] = ""
        self.assertError("awards.csv:2 award_level is empty")

    def test_required_column_missing(self):
        for r in self.t["sources"]:
            del r["publisher"]
        self.assertError("sources.csv column publisher is missing")

    def test_more_cells_than_header(self):
        self.location()[None] = ["extra"]
        self.assertError("locations.csv:2 has more cells than the header")

    def test_enum(self):
        self.location()["state_code"] = "Qld"
        self.assertError("locations.csv:2 state_code 'Qld' must be one of NSW")

    def test_enum_in_list(self):
        row(self.t, "businesses", "business_id", "B-alpha")["business_type"] = "bakery；patisserie"
        self.assertError("business_type 'patisserie' must be one of")

    def test_url(self):
        self.location()["location_source_url"] = "http://example.com"
        self.assertError("location_source_url 'http://example.com' must start with https://")

    def test_date(self):
        self.location()["location_verified_at"] = "2026/10/01"
        self.assertError("location_verified_at '2026/10/01' must be a YYYY-MM-DD date")

    def test_int(self):
        self.award()["award_year"] = "2025a"
        self.assertError("award_year '2025a' must be a whole number")

    def test_decimal(self):
        self.location()["latitude"] = "-33,87"
        self.assertError("latitude '-33,87' must be a number")

    # ids
    def test_duplicate_id(self):
        self.t["awards"].append(dict(self.award()))
        self.assertError("awards.csv duplicate award_id RAS-PB-2025-C2-E10 (rows 2, 12)")

    def test_id_prefix(self):
        row(self.t, "sources", "source_id", "S-NEWS-2025-ALPHA")["source_id"] = "NEWS-2025-ALPHA"
        self.assertError("source_id 'NEWS-2025-ALPHA' must start with S-")

    def test_missing_reference(self):
        self.attribution("RAS-PB-2025-C2-E10")["business_id"] = "B-alfa"
        self.assertError("award_attributions.csv:2 business_id B-alfa not in businesses.csv")

    def test_attribution_id_prefix(self):
        self.attribution("RAS-PB-2025-C2-E10")["attribution_id"] = "AT-RAS-PB-2025-C2-E99-1"
        self.assertError("attribution_id must start with AT-RAS-PB-2025-C2-E10-")

    # awards
    def test_placing_with_medal(self):
        self.award("NABC-2025-C004-P1")["medal_type"] = "gold"
        self.assertError("award_level=placing needs rank and no medal_type")

    def test_medal_without_medal_type(self):
        self.award()["medal_type"] = ""
        self.assertError("award_level=medal needs medal_type and no rank")

    def test_champion_with_rank(self):
        self.award("NABC-2025-CHAMP-SHOW")["rank"] = "1"
        self.assertError("award_level=champion needs no medal_type and no rank")

    def test_rank_range(self):
        self.award("NABC-2025-C004-P1")["rank"] = "4"
        self.assertError("rank 4 must be 1, 2 or 3")

    def test_class_places_awarded_range(self):
        self.award("NABC-2025-C004-P1")["class_places_awarded"] = "4"
        self.assertError("class_places_awarded needs award_level=placing and 1-3")

    def test_class_places_awarded_only_on_placings(self):
        self.award()["class_places_awarded"] = "1"
        self.assertError("awards.csv:2 class_places_awarded needs award_level=placing")

    def test_rank_beyond_places_awarded(self):
        a = self.award("NABC-2025-C004-P1")
        a["rank"], a["class_places_awarded"] = "2", "1"
        self.assertError("rank 2 but the class handed out only 1 place(s)")

    def test_ranking_rank_range_and_fields(self):
        a = self.award("NABC-2025-C004-P1")
        a["award_level"] = "ranking"
        a["rank"] = "101"
        self.assertError("rank 101 must be 1-100 in a ranking")
        a["rank"] = ""
        self.assertError("award_level=ranking needs rank and no medal_type")

    def test_year_range(self):
        a = self.award()
        a["award_year"], a["award_id"] = "2023", "RAS-PB-2023-C2-E10"
        for r in self.t["award_attributions"] + self.t["award_sources"]:
            if r["award_id"] == "RAS-PB-2025-C2-E10":
                r["award_id"] = "RAS-PB-2023-C2-E10"
        self.attribution("RAS-PB-2023-C2-E10")["attribution_id"] = "AT-RAS-PB-2023-C2-E10-1"
        self.assertError("award_year 2023 must be 2024-2026")

    def test_award_id_matches_competition_and_year(self):
        self.award()["award_year"] = "2026"
        self.assertError("award_id RAS-PB-2025-C2-E10 must start with RAS-PB-2026-")

    def test_note_needed_when_not_verified(self):
        self.award("RAS-PB-2025-C2-E12")["verification_note"] = ""
        self.assertError("verification_note is empty (needed when status is PARTIAL)")

    def test_duplicate_award_row(self):
        copy_row = dict(self.award())
        copy_row["award_id"] = "RAS-PB-2025-C2-E10B"
        self.t["awards"].append(copy_row)
        self.assertError("awards.csv duplicate award (rows 2, 12): RAS-PB-2025-C2-E10B")

    def test_verified_needs_official_source(self):
        row(self.t, "award_sources", "award_id", "RAS-PB-2025-C2-E11")["source_id"] = "S-NEWS-2025-ALPHA"
        self.assertError("RAS-PB-2025-C2-E11 is VERIFIED but has no official supports source")

    def test_verified_with_official_conflict(self):
        self.t["award_sources"].append({"award_id": "RAS-PB-2025-C2-E11", "source_id": "S-NABC-2025-PDF",
                                        "stance": "conflicts", "evidence_note": "lists a different score"})
        self.assertError("RAS-PB-2025-C2-E11 is VERIFIED but an official source conflicts")

    # attributions
    def test_location_of_another_business(self):
        self.attribution("NABC-2025-C004-P1")["location_id"] = "L-alpha-north"
        self.assertError("location L-alpha-north belongs to B-alpha, not B-beta")

    def test_entrant_location_needs_location(self):
        self.attribution("NABC-2025-C004-P1")["location_id"] = ""
        self.assertError("relationship_type=entrant_location needs location_id")

    # locations
    def test_postcode_state(self):
        self.location()["postcode"] = "4227"
        self.assertError("locations.csv:2 postcode 4227 is not in NSW")

    def test_postcode_digits(self):
        self.location()["postcode"] = "200"
        self.assertError("postcode '200' must be 4 digits")

    def test_act_postcode_inside_nsw_range(self):
        self.location()["state_code"], self.location()["postcode"] = "ACT", "2609"
        self.assertEqual(m.check(self.t, TODAY)[0], [])

    def test_coordinates_in_australia(self):
        self.location()["latitude"] = "33.87"
        self.assertError("latitude 33.87 is outside Australia")

    def test_moved_needs_target(self):
        self.location("L-alpha-old")["operating_status"] = "moved"
        self.assertError("operating_status=moved needs moved_to_location_id")

    # Google stars on the 📍 button (v2-4 Q2)
    def google(self, rating="4.6", reviews="1203", checked="2026-11-04"):
        loc = self.location()
        loc["google_rating"], loc["google_reviews"], loc["google_checked_at"] = rating, reviews, checked
        return loc

    def test_google_rating_reaches_the_store(self):
        self.google()
        self.assertEqual(m.check(self.t, TODAY)[0], [])
        stores = {l["id"]: l for b in m.build(self.t)[0] for l in b["locations"]}
        self.assertEqual(stores["L-alpha-north"]["google"],
                         {"rating": 4.6, "reviews": 1203, "checkedAt": "2026-11-04"})
        self.assertNotIn("google", stores["L-alpha-south"])  # optional

    def test_google_columns_filled_together(self):
        self.google(reviews="")
        self.assertError("google_rating, google_reviews, google_checked_at must be filled together")

    def test_google_rating_range(self):
        self.google(rating="5.3")
        self.assertError("google_rating 5.3 must be 1-5")

    def test_google_reviews_whole_number(self):
        self.google(reviews="1,203")
        self.assertError("google_reviews '1,203' must be a whole number")

    # warnings
    def test_stale_location(self):
        self.location()["location_verified_at"] = "2026-01-01"
        self.assertWarning("locations.csv:2 location_verified_at 2026-01-01 is over 180 days old")

    def test_stale_source(self):
        row(self.t, "sources", "source_id", "S-NABC-2025-PDF")["verified_at"] = "2026-01-01"
        self.assertWarning("sources.csv:3 verified_at 2026-01-01 is over 180 days old")

    def test_locations_too_close(self):
        south = self.location("L-alpha-south")
        south["latitude"], south["longitude"] = "-33.87005", "151.21"
        self.assertWarning("L-alpha-north and L-alpha-south are 5 m apart")

    def test_locations_close_but_confirmed_distinct(self):
        south = self.location("L-alpha-south")
        south["latitude"], south["longitude"] = "-33.87005", "151.21"
        south["notes"] = "同一棟樓的內用店；%s" % m.DISTINCT_MARK
        errors, warnings = m.check(self.t, TODAY)
        self.assertEqual(errors, [])
        self.assertFalse(any("m apart" in w for w in warnings), warnings)

    def test_similar_business_names(self):
        row(self.t, "businesses", "business_id", "B-delta")["official_name"] = "ALPHA BAKERY PTY LTD"
        self.assertWarning("B-alpha and B-delta have nearly the same name")

    def test_group_differs_from_class_name(self):
        self.award()["category"] = "Sweet Breads (e.g., banana bread, fruit log, etc.)"
        self.assertWarning("category_group is sourdough but class name 'Sweet Breads (e.g., banana bread, "
                           "fruit log, etc.)' looks like cake")

    def test_group_keyword_unknown(self):
        self.award()["category"] = "Pizza"
        self.assertWarning("class name 'Pizza' matches no category_group keyword; check sourdough by hand")


class GroupTest(unittest.TestCase):
    def group(self, category, comp="RAS-PB", level="medal", class_code="1"):
        return m.expected_group({"competition_id": comp, "award_level": level, "class_code": class_code,
                                 "category": category})

    def test_examples_in_brackets_are_ignored(self):
        self.assertEqual(self.group("International Bread (e.g. baguette, ciabatta, chapatti, flatbread, etc.)"),
                         "bread")
        self.assertEqual(self.group("Viennoiserie (e.g., Danish, vanilla slice, brioche, croissant, etc.)"),
                         "viennoiserie")

    def test_class_names_from_the_schema_table(self):
        for category, group in [("Sour Dough, including Rye", "sourdough"), ("Specialty Loaf, including Artisan "
                                "Bread", "bread"), ("Cakes, Tortes & Gateaux", "cake"), ("Christmas Cake & "
                                "Puddings", "cake"), ("Brownies & Slices", "cake"), ("Macaron", "biscuit"),
                                ("Savoury Pie, Pastie or Sausage Roll", "pastry_pie"), ("Sweet Pie／Tart",
                                "tart_choux"), ("Gluten Free Bread", "gluten_free"),
                                ("Traditional Rye Sourdough - Minimum 680gm", "sourdough"),
                                ("Ciabatta Loaf - Minimum 200gm", "bread"), ("Croissants", "viennoiserie")]:
            self.assertEqual(self.group(category), group, category)

    def test_the_four_classes_decided_on_2026_11_02(self):
        # Real RAS class names from research/ras_professional_bakery_2024-2026.csv.
        for category, group in [
                ("15 Shortcrust Pastry (e.g., sweet pies, tarts, flans, etc.) Excluding Quiches", "tart_choux"),
                ("20 Choux Pastry (e.g., eclairs, profiteroles, etc.)", "tart_choux"),
                ("16 Filo or Kataifi Pastry (e.g. spanakopita, filo rolls or wraps, baklava, strudel, etc.)",
                 "pastry_pie"),
                ("25A Creative - Three (3) Individual Viennoiserie Portions (e.g., Danish, croissant, etc.)",
                 "viennoiserie"),
                ("25A Creative – Three (3) different types of Viennoiserie Portions (e.g. Danish, etc.)",
                 "viennoiserie"),
                # Savoury pies and quiches made with shortcrust stay pastry_pie: the name is cut at the comma.
                ("17 Savoury Pie, Pastie or Sausage/Vegetarian Roll. Made with shortcrust or puff pastry",
                 "pastry_pie"),
                ("18 Savoury Quiche, made with shortcrust or puff pastry (e.g spinach, etc)", "pastry_pie")]:
            self.assertEqual(self.group(category), group, category)

    def test_champions(self):
        self.assertEqual(self.group("Champion Biscuit", level="champion"), "biscuit")
        self.assertEqual(self.group("Champion Sourdough Loaf", "NABC", "champion"), "sourdough")
        self.assertEqual(self.group("Champion Product of Show", "NABC", "champion"), "overall")
        self.assertEqual(self.group("Overall Champion", "GBA", "champion", "CHAMPION"), "overall")

    def test_queensland_baking_show_classes(self):
        # Real class names from research/qld_baking_show_2024-2026.csv (2026-11-03).
        for category, group in [("680gm White Hi-Top Half Married (2 Piece)", "bread"),
                                ("680g White Loaf Condensed Square (4 Piece)", "bread"),  # "Piece" is no pie
                                ("450gm Five Strand Plait", "bread"), ("450gm Wholemeal Cob", "bread"),
                                ("2 x Grain Rolls (max 100gm each)", "bread"),
                                ("680gm Sourdough Rye (Baked on a Tray)", "sourdough"),
                                ("Decorated Sponge (Any type) (No larger than 203mm) With Inscription", "cake"),
                                ("2 x Caramel Slice", "cake"), ("2 Sausage Rolls", "pastry_pie"),
                                ("2 Chunky Beef Pies", "pastry_pie"), ("2 Pasties", "pastry_pie"),
                                ("Family Size Apple Pie, using Shortcrust Pastry", "tart_choux"),
                                ("4 Individual Tartlets, all to be decorated the same", "tart_choux")]:
            self.assertEqual(self.group(category, "QLDBS", "placing"), group, category)

    def test_champion_naming_two_kinds_fits_either(self):
        for filled in ("cake", "pastry_pie"):
            a = {"competition_id": "QLDBS", "award_level": "champion", "class_code": "CHAMPION",
                 "category": "Champion Cake / Pastry of the Show", "category_group": filled}
            self.assertEqual(m.expected_group(a), filled)

    def test_golden_bean_goes_by_class_number(self):
        self.assertEqual(self.group("Elite", "GBA", class_code="Cat 6"), "coffee_other")
        self.assertEqual(self.group("Milk Based", "GBA", class_code="Cat 11"), "coffee_milk")


class AloneInClassTest(unittest.TestCase):
    """D11: a 1st place in a class with no 2nd place is "also", never a headline (user chose, 2026-11-03)."""

    def build(self, *alone):
        t = copy.deepcopy(TABLES)
        # Gamma's gold names only the brand, so a franchise skips it; tie it to the awarded shop
        # so Gamma qualifies on the gold alone.
        row(t, "award_attributions", "award_id", "RAS-PB-2025-C3-E20")["location_id"] = "L-gamma-one"
        for award_id in alone:
            row(t, "awards", "award_id", award_id)["class_places_awarded"] = "1"
        self.assertEqual(m.check(t, TODAY)[0], [])
        businesses, skipped = m.build(t)
        return {b["id"]: b for b in businesses}, {a: r for a, _, r in skipped}

    def test_contested_first_place_is_unchanged(self):
        a = {"award_level": "placing", "rank": "1", "class_places_awarded": "2"}
        self.assertEqual(m.tier(a), "top")
        self.assertEqual(m.tier(dict(a, class_places_awarded="")), "top")

    def test_lone_first_place_does_not_qualify_a_business(self):
        by_id, skipped = self.build("NABC-2025-C004-P1")  # Beta's only headline award
        self.assertNotIn("B-beta", by_id)
        self.assertEqual(skipped["NABC-2025-C004-P1"], "business has no champion, gold or 1st place (D1)")

    def test_lone_first_place_is_listed_as_also(self):
        by_id, _ = self.build("NABC-2025-C002-P1")  # Gamma still has a gold medal
        gamma = by_id["B-gamma"]
        first = next(a for a in gamma["awards"] if a["id"] == "NABC-2025-C002-P1")
        self.assertEqual(first["tier"], "also")
        self.assertTrue(first["aloneInClass"])
        self.assertEqual((gamma["summary"]["first"], gamma["summary"]["also"]), (0, 1))
        self.assertNotIn("aloneInClass", next(a for a in gamma["awards"] if a["id"] != "NABC-2025-C002-P1"))


class RankingTest(unittest.TestCase):
    """World's 100 Best Coffee Shops: a place in a ranking is its own level (user chose A, 2026-11-02)."""

    def award(self, **kw):
        a = {"award_level": "ranking", "rank": "5", "medal_type": "", "category": "World's 100 Best Coffee Shops",
             "competition_id": "W100BCS", "class_code": "RANKING"}
        a.update(kw)
        return a

    def test_any_place_in_the_top_100_is_a_headline_award(self):
        for rank in ("1", "2", "3", "57", "100"):
            self.assertEqual(m.tier(self.award(rank=rank)), "top", rank)

    def test_placing_ranks_still_mean_podium_places(self):
        self.assertEqual(m.tier(self.award(award_level="placing", rank="2")), "also")
        self.assertIsNone(m.tier(self.award(award_level="placing", rank="3")))

    def test_ranking_names_no_item_group(self):
        self.assertEqual(m.expected_group(self.award()), "overall")

    def test_summary_keeps_a_rank_1_apart_from_a_1st_place(self):
        def entry(level, rank, year=2026):
            return {"level": level, "rank": rank, "medal": None, "tier": "top", "year": year}
        s = m.summary([entry("ranking", 1, 2025), entry("ranking", 5), entry("placing", 1)])
        self.assertEqual((s["top100"], s["best100"], s["first"]), (2, 1, 1))


class ReviewPicksTest(unittest.TestCase):
    """Google review picks for World's 100 Best shops (REVIEW-PICKS.md; user chose C, 2026-11-02)."""

    def setUp(self):
        self.t = copy.deepcopy(TABLES)
        self.assertEqual(self.t[m.REVIEW_PICKS], [])  # the file is optional
        self.t[m.REVIEW_PICKS] = [
            self.pick("food", "2", "香蕉麵包", "Banana bread", "289", "4.30", "3", "30", "mentioned"),
            self.pick("drink", "1", "Flat white", "Flat white", "170", "4.63", "1", "30", "recommended"),
            self.pick("food", "1", "酪梨吐司", "Avocado toast", "47", "4.83", "0", "30", "recommended"),
        ]

    def pick(self, section, rank, zh, en, mentions, avg, low, sample, verdict, business_id="B-alpha"):
        return {"business_id": business_id, "section": section, "rank": rank, "item_zh": zh, "item_en": en,
                "mentions": mentions, "avg_stars": avg, "low_count": low, "sample_size": sample,
                "verdict": verdict, "checked_at": "2026-11-02", "note": ""}

    def errors(self):
        return m.check(self.t, TODAY)[0]

    def assertError(self, text):
        errors = self.errors()
        self.assertTrue(any(text in e for e in errors), "no error containing %r in %s" % (text, errors))

    def test_rule_is_5_mentions_4_5_stars_and_at_most_1_in_10_low(self):
        self.assertTrue(m.recommended(10, 4.5, 1, 10))
        self.assertTrue(m.recommended(5, 5.0, 0, 5))
        self.assertFalse(m.recommended(4, 5.0, 0, 4))   # under 5 mentions (v2-4 Q3)
        self.assertFalse(m.recommended(7, 4.57, 1, 7))  # 14% low
        self.assertFalse(m.recommended(5, 4.49, 0, 5))

    def test_under_5_mentions_must_be_mentioned(self):
        self.t[m.REVIEW_PICKS].append(self.pick("drink", "2", "藝伎", "Geisha", "2", "5.00", "0", "2", "recommended"))
        self.assertError("verdict recommended does not match the rule (2 mentions")

    def test_clean_picks_pass_and_reach_the_shop_in_rank_order(self):
        self.assertEqual(self.errors(), [])
        shops = {b["id"]: b for b in m.build(self.t)[0]}
        picks = shops["B-alpha"]["reviewPicks"]
        self.assertEqual(picks["checkedAt"], "2026-11-02")
        self.assertEqual([p["zh"] for p in picks["food"]], ["酪梨吐司", "香蕉麵包"])
        self.assertEqual([(p["mentions"], p["stars"], p["rec"]) for p in picks["drink"]], [(170, 4.6, True)])
        self.assertTrue(all("reviewPicks" not in b for i, b in shops.items() if i != "B-alpha"))
        self.assertNotIn("icon", picks["drink"][0])  # the icon column is optional

    def test_item_icon_overrides_the_section_icon(self):
        self.t[m.REVIEW_PICKS][1]["icon"] = "🍺"
        picks = {b["id"]: b for b in m.build(self.t)[0]}["B-alpha"]["reviewPicks"]
        self.assertEqual(picks["drink"][0]["icon"], "🍺")

    def test_verdict_must_follow_the_rule(self):
        self.t[m.REVIEW_PICKS][0]["verdict"] = "recommended"
        self.assertError("verdict recommended does not match the rule")

    def test_rank_listed_twice(self):
        self.t[m.REVIEW_PICKS][2]["rank"] = "2"
        self.assertError("B-alpha food rank 2 is listed twice")

    def test_unknown_business_and_bad_section(self):
        self.t[m.REVIEW_PICKS][1]["business_id"] = "B-nobody"
        self.t[m.REVIEW_PICKS][1]["section"] = "dessert"
        self.assertError("business_id B-nobody is not in businesses.csv")
        self.assertError("section 'dessert' must be one of drink, food")


class MyMapsTest(unittest.TestCase):
    """My Maps import: Chinese and English side by side (user chose A, 2026-11-02)."""

    @classmethod
    def setUpClass(cls):
        cls.businesses, _ = m.build(TABLES)
        cls.rows = m.mymaps_rows(cls.businesses)

    def test_one_row_per_published_store(self):
        self.assertEqual(len(self.rows), sum(len(b["locations"]) for b in self.businesses))
        self.assertEqual(len(m.MYMAPS_HEADER), len(self.rows[0]))

    def test_title_names_the_store_and_types_are_bilingual(self):
        for row in self.rows:
            self.assertIn(" · ", row[0])
            self.assertIn(row[3], m.TYPE_BOTH.values())
            self.assertIn(row[4], m.TOP_AWARD.values())

    def test_awards_text_is_headline_only_in_two_languages(self):
        for row in self.rows:
            zh, en = row[5].split("\n")
            self.assertNotIn("也推薦", row[5])
            self.assertTrue(zh and en)

    def test_winning_items_follow_the_card_rules(self):
        def award(level, product="", category="", year=2026, medal=None, rank=None, tier="top"):
            return {"level": level, "product": product, "category": category, "year": year, "medal": medal,
                    "rank": rank, "tier": tier}
        shop = {"name": "Alpha Bakery", "awards": [
            award("medal", "ALPHA BAKERY CROISSANT", medal="gold", year=2025),
            award("placing", category="Croissants", rank=1),                      # merges with Croissant
            award("champion", category="Champion Product of Show"),               # names no item
            award("champion", "OLIVE SOURDOUGH", "Champion Bread"),               # champions come first
            award("medal", "WHITE LOAF", medal="silver", tier="also")]}           # also-recommended: left out
        self.assertEqual(m.winning_items(shop), ["Olive Sourdough", "Croissant"])

    def test_queensland_class_names_lose_counts_and_weights(self):
        for category, item in [("2 x Caramel Slice", "2 x Caramel Slice"[4:]), ("450gm Five Strand Plait",
                                "Five Strand Plait"), ("680g White Loaf Condensed Square (4 Piece)",
                                "White Loaf Condensed Square"), ("2 Sausage Rolls", "Sausage Rolls"),
                               ("Sourdough, White Min. 500gm", "Sourdough"), ("Croissants", "Croissants")]:
            a = {"level": "placing", "product": "", "category": category}
            self.assertEqual(m.item_name({"name": "Rays Patisserie"}, a), item, category)


class BuildTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.businesses, skipped = m.build(TABLES)
        cls.by_id = {b["id"]: b for b in cls.businesses}
        cls.skipped = {award_id: reason for award_id, _, reason in skipped}

    def location_ids(self, business_id):
        return [l["id"] for l in self.by_id[business_id]["locations"]]

    def award_ids(self, business_id):
        return [a["id"] for a in self.by_id[business_id]["awards"]]

    def test_order(self):
        # champions first, then gold + 1st, then the latest year, then the name
        self.assertEqual([b["id"] for b in self.businesses], ["B-alpha", "B-beta", "B-gamma"])

    def test_every_link_is_published_or_explained(self):
        published = sum(len(b["awards"]) for b in self.businesses)
        self.assertEqual(published + len(self.skipped), len(TABLES["award_attributions"]))

    def test_retail_lists_every_open_shop(self):
        # not the bakehouse, not the closed shop
        self.assertEqual(self.location_ids("B-alpha"), ["L-alpha-north", "L-alpha-south"])

    def test_retail_award_at_closed_shop_stays_at_brand_level(self):
        champ = next(a for a in self.by_id["B-alpha"]["awards"] if a["id"] == "NABC-2025-CHAMP-SHOW")
        self.assertIsNone(champ["locationId"])

    def test_supermarket_lists_only_the_awarded_store(self):
        self.assertEqual(self.location_ids("B-beta"), ["L-beta-east"])

    def test_supermarket_brand_award_lists_every_store(self):
        t = copy.deepcopy(TABLES)
        row(t, "award_attributions", "award_id", "NABC-2025-C004-P1")["location_id"] = ""
        row(t, "award_attributions", "award_id", "NABC-2025-C004-P1")["relationship_type"] = "entrant"
        beta = next(b for b in m.build(t)[0] if b["id"] == "B-beta")
        self.assertEqual([l["id"] for l in beta["locations"]], ["L-beta-east", "L-beta-west"])

    def test_franchise_lists_only_the_awarded_shop(self):
        self.assertEqual(self.location_ids("B-gamma"), ["L-gamma-one"])
        self.assertEqual(self.skipped["RAS-PB-2025-C3-E20"], "franchise award has no location (D2)")

    def test_skip_reasons(self):
        self.assertEqual(self.skipped["RAS-PB-2025-C2-E12"], "award is PARTIAL")
        self.assertEqual(self.skipped["NABC-2025-C001-P1"], "individual award (D3)")
        self.assertEqual(self.skipped["RAS-PB-2025-C3-E21"], "business has no champion, gold or 1st place (D1)")
        self.assertEqual(self.skipped["RAS-PB-2025-C3-E22"], "business scope is wholesale (D2)")

    def test_national_supermarket_is_never_published(self):
        # D12 (2026-11-03): Woolworths and Coles stay in the csv as research only.
        t = copy.deepcopy(TABLES)
        row(t, "businesses", "business_id", "B-beta")["scope"] = "national_supermarket"
        self.assertEqual(m.check(t, TODAY)[0], [])
        businesses, skipped = m.build(t)
        self.assertNotIn("B-beta", [b["id"] for b in businesses])
        self.assertEqual({a: r for a, _, r in skipped}["NABC-2025-C004-P1"],
                         "business scope is national_supermarket (D12)")

    def test_partial_attribution_is_skipped(self):
        t = copy.deepcopy(TABLES)
        row(t, "award_attributions", "award_id", "NABC-2025-C004-P1")["attribution_status"] = "PARTIAL"
        skipped = {award_id: reason for award_id, _, reason in m.build(t)[1]}
        self.assertEqual(skipped["NABC-2025-C004-P1"], "attribution is PARTIAL")

    def test_bronze_is_skipped(self):
        t = copy.deepcopy(TABLES)
        a = row(t, "awards", "award_id", "RAS-PB-2025-C2-E11")
        a["medal_type"], a["official_award_title"] = "bronze", "Bronze Medal"
        skipped = {award_id: reason for award_id, _, reason in m.build(t)[1]}
        self.assertEqual(skipped["RAS-PB-2025-C2-E11"], "bronze is not listed (D1)")

    def test_tiers_and_summary(self):
        alpha = self.by_id["B-alpha"]
        self.assertEqual(self.award_ids("B-alpha"), ["NABC-2025-CHAMP-SHOW", "RAS-PB-2025-C2-E10",
                                                     "RAS-PB-2025-C2-E11"])
        self.assertEqual([a["tier"] for a in alpha["awards"]], ["top", "top", "also"])
        self.assertEqual(alpha["summary"], {"champion": 1, "top100": 0, "best100": None, "gold": 1, "first": 0,
                                            "also": 1, "years": [2025]})

    def test_award_sources_include_non_official_support(self):
        gold = next(a for a in self.by_id["B-alpha"]["awards"] if a["id"] == "RAS-PB-2025-C2-E10")
        self.assertEqual([s["title"] for s in gold["sources"]], ["Test RAS 2025 results",
                                                                 "Local news on Alpha Bakery"])

    def test_staff_entry_keeps_recipient(self):
        first = self.by_id["B-gamma"]["awards"][0]
        self.assertEqual(first["recipient"], "Kim Lee - Gamma Franchise One")
        self.assertEqual(first["locationId"], "L-gamma-one")


class MainTest(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.mkdtemp()
        self.folder = os.path.join(self.dir, "awards")
        shutil.copytree(FIXTURE, self.folder)

    def tearDown(self):
        shutil.rmtree(self.dir)

    def run_main(self, *extra):
        with redirect_stdout(io.StringIO()) as out:
            code = m.main([self.folder, "--data-as-of", "2026-11", "--today", "2026-10-29"] + list(extra))
        return code, out.getvalue()

    def test_writes_data_js_and_mymaps(self):
        mymaps = os.path.join(self.dir, "mymaps.csv")
        code, out = self.run_main("--mymaps-out", mymaps)
        self.assertEqual(code, 0, out)
        with open(os.path.join(self.folder, "data.js"), encoding="utf-8") as f:
            self.assertTrue(f.read().startswith("// 由 make_awards_data.py 產生"))
        with open(mymaps, encoding="utf-8-sig", newline="") as f:
            rows = list(csv.reader(f))  # the awards cell holds a line break, so count records, not lines
        self.assertEqual(len(rows), 1 + 4)  # header + alpha 2, beta 1, gamma 1
        self.assertEqual(rows[0], m.MYMAPS_HEADER)
        self.assertIn("award links: 5 published, 5 not published (of 10", out)

    def test_error_in_csv_stops_before_data_js(self):
        path = os.path.join(self.folder, "locations.csv")
        with open(path, encoding="utf-8") as f:
            text = f.read()
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(text.replace(",NSW,2000,", ",QLD,2000,", 1))
        code, out = self.run_main()
        self.assertEqual(code, 1)
        self.assertIn("ERROR locations.csv:2 postcode 2000 is not in QLD", out)
        self.assertFalse(os.path.exists(os.path.join(self.folder, "data.js")))


if __name__ == "__main__":
    unittest.main()
