"""Tests for make_awards_data.py. Run from the repo root:

    python -m unittest discover travel/tools/tests

awards_fixture/ is a small valid set of the seven csv files that covers every
publish rule. Each check test breaks one cell and expects that check's message.
"""
import copy
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

    def test_similar_business_names(self):
        row(self.t, "businesses", "business_id", "B-delta")["official_name"] = "ALPHA BAKERY PTY LTD"
        self.assertWarning("B-alpha and B-delta have nearly the same name")


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
        self.assertEqual(alpha["summary"], {"champion": 1, "gold": 1, "first": 0, "also": 1, "years": [2025]})

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
        with open(mymaps, encoding="utf-8-sig") as f:
            self.assertEqual(len(f.read().splitlines()), 1 + 4)  # header + alpha 2, beta 1, gamma 1
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
