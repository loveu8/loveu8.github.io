"""Build the awards page's data.js from its seven csv files (see README.md).

The csv columns, checks and publish rules are defined in
australia/awards/DATA-SCHEMA.md (sections 2, 5 and 6). Every check runs first;
any ERROR stops the run before data.js is written. Only awards that pass the
publish rules go into data.js, so research rows (PARTIAL, wholesale ...) stay
in the csv files. data.js is a plain <script> so the page works from file://.
"""
import argparse
import csv
import datetime
import json
import math
import os
import re
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from list_data import read_csv

FILES = ["competitions", "businesses", "locations", "awards", "award_attributions", "sources", "award_sources"]

REQUIRED = {
    "competitions": ["competition_id", "official_name", "short_name_zh", "short_name_en", "organiser",
                     "competition_type", "award_system", "entrant_scope", "region_scope", "website_url"],
    "businesses": ["business_id", "official_name", "business_type", "scope"],
    "locations": ["location_id", "business_id", "location_name", "street_address", "suburb", "city", "state_code",
                  "postcode", "latitude", "longitude", "location_role", "location_type", "operating_status",
                  "location_source_url", "location_verified_at"],
    "awards": ["award_id", "competition_id", "award_year", "class_code", "category", "category_group",
               "official_award_title", "award_level", "recipient_type", "recipient_name", "verification_status"],
    "award_attributions": ["attribution_id", "award_id", "business_id", "relationship_type", "attribution_status"],
    "sources": ["source_id", "source_title", "source_url", "publisher", "source_type", "is_official", "verified_at"],
    "award_sources": ["award_id", "source_id", "stance", "evidence_note"],
}

STATES = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"]
STATUSES = ["VERIFIED", "PARTIAL", "DISPUTED", "REJECTED"]
ENUMS = {
    ("competitions", "competition_type"): ["bakery", "coffee"],
    ("competitions", "award_system"): ["medal_by_score", "placing"],
    ("competitions", "entrant_scope"): ["business", "individual", "mixed"],
    ("businesses", "business_type"): ["bakery", "cafe", "roaster"],
    ("businesses", "scope"): ["retail", "wholesale", "manufacturer", "supermarket", "chain_franchise", "other"],
    ("locations", "state_code"): STATES,
    ("locations", "location_role"): ["shop", "bakehouse", "hq"],
    ("locations", "location_type"): ["standalone", "supermarket_counter", "factory_shop", "in_supermarket"],
    ("locations", "operating_status"): ["open", "temporarily_closed", "closed", "moved", "unknown"],
    ("awards", "category_group"): ["bread", "sourdough", "viennoiserie", "pastry_pie", "cake", "biscuit",
                                   "gluten_free", "coffee_espresso", "coffee_milk", "coffee_filter",
                                   "coffee_other", "overall"],
    ("awards", "award_level"): ["champion", "medal", "placing"],
    ("awards", "medal_type"): ["gold", "silver", "bronze"],
    ("awards", "recipient_type"): ["business", "location", "individual_for_business", "individual"],
    ("awards", "verification_status"): STATUSES,
    ("award_attributions", "relationship_type"): ["entrant", "entrant_location", "staff_entry",
                                                  "employee_individual"],
    ("award_attributions", "attribution_status"): STATUSES,
    ("sources", "source_type"): ["official_results", "official_pdf", "official_page", "media", "business_site",
                                 "map"],
    ("sources", "is_official"): ["yes", "no"],
    ("award_sources", "stance"): ["supports", "conflicts"],
}
LIST_COLUMNS = {("businesses", "business_type"), ("businesses", "related_refs")}
URL_COLUMNS = {"website_url", "instagram_url", "location_source_url", "source_url", "archive_url"}
DATE_COLUMNS = {"event_date", "location_verified_at", "published_at", "verified_at"}
INT_COLUMNS = {"award_year", "rank"}
DECIMAL_COLUMNS = {"latitude", "longitude", "score"}

ID_COLUMNS = {"competitions": "competition_id", "businesses": "business_id", "locations": "location_id",
              "awards": "award_id", "award_attributions": "attribution_id", "sources": "source_id"}
ID_PREFIX = {"businesses": "B-", "locations": "L-", "award_attributions": "AT-", "sources": "S-"}
REFS = [("locations", "business_id", "businesses"), ("locations", "moved_to_location_id", "locations"),
        ("awards", "competition_id", "competitions"), ("award_attributions", "award_id", "awards"),
        ("award_attributions", "business_id", "businesses"), ("award_attributions", "location_id", "locations"),
        ("award_sources", "award_id", "awards"), ("award_sources", "source_id", "sources")]

YEARS = (2024, 2026)
# Australia Post ranges; 0200-0299 and 0800-0999 are written without the leading 0 here.
POSTCODES = {"NSW": [(1000, 2599), (2619, 2899), (2921, 2999)], "ACT": [(200, 299), (2600, 2618), (2900, 2920)],
             "VIC": [(3000, 3999), (8000, 8999)], "QLD": [(4000, 4999), (9000, 9999)], "SA": [(5000, 5999)],
             "WA": [(6000, 6999)], "TAS": [(7000, 7999)], "NT": [(800, 999)]}
LAT_RANGE = (-44, -10)
LNG_RANGE = (112, 154)
STALE_DAYS = 180
NEAR_METRES = 20

# Publish rules (DATA-SCHEMA.md section 5, D1-D3).
PUBLISHED_SCOPES = ["retail", "supermarket", "chain_franchise"]
LEVEL_ORDER = {"champion": 0, "top": 1, "also": 2}
TYPE_ZH = {"bakery": "烘焙", "cafe": "咖啡", "roaster": "咖啡"}


def val(row, column):
    return (row.get(column) or "").strip()


def split_list(value):
    # business_type and related_refs: "roaster；cafe" (either ; or ；)
    return [v.strip() for v in re.split("[;；]", value) if v.strip()]


def to_int(value):
    return int(value) if re.fullmatch(r"\d+", value) else None


def to_float(value):
    try:
        return float(value)
    except ValueError:
        return None


def to_date(value):
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return None
    try:
        return datetime.date.fromisoformat(value)
    except ValueError:
        return None


def line(i):
    return i + 2  # row 0 is on line 2, under the header


def metres_apart(a, b):
    lat1, lng1, lat2, lng2 = map(math.radians, a + b)
    h = math.sin((lat2 - lat1) / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin((lng2 - lng1) / 2) ** 2
    return 6371000 * 2 * math.asin(math.sqrt(h))


def name_key(name):
    # "Bonfire Bread PTY LTD" and "bonfire-bread" -> "bonfirebread"
    return re.sub(r"[^a-z0-9]", "", re.sub(r"\bpty\.?\s*ltd\.?", "", name.lower()))


def load(folder):
    return {name: read_csv(os.path.join(folder, name + ".csv")) for name in FILES}


def check_cells(tables, errors):
    for name in FILES:
        rows = tables[name]
        for column in REQUIRED[name]:
            if rows and column not in rows[0]:
                errors.append("%s.csv column %s is missing" % (name, column))
        for i, r in enumerate(rows):
            where = "%s.csv:%d" % (name, line(i))
            if None in r:
                errors.append("%s has more cells than the header" % where)
            for column in r:
                if column is None:
                    continue
                value = val(r, column)
                if not value:
                    if column in REQUIRED[name]:
                        errors.append("%s %s is empty" % (where, column))
                    continue
                allowed = ENUMS.get((name, column))
                if allowed:
                    for v in split_list(value) if (name, column) in LIST_COLUMNS else [value]:
                        if v not in allowed:
                            errors.append("%s %s '%s' must be one of %s" % (where, column, v, ", ".join(allowed)))
                if column in URL_COLUMNS and not value.startswith("https://"):
                    errors.append("%s %s '%s' must start with https://" % (where, column, value))
                if column in DATE_COLUMNS and to_date(value) is None:
                    errors.append("%s %s '%s' must be a YYYY-MM-DD date" % (where, column, value))
                if column in INT_COLUMNS and to_int(value) is None:
                    errors.append("%s %s '%s' must be a whole number" % (where, column, value))
                if column in DECIMAL_COLUMNS and to_float(value) is None:
                    errors.append("%s %s '%s' must be a number" % (where, column, value))


def check_ids(tables, errors):
    ids = {}
    for name, column in ID_COLUMNS.items():
        seen = {}
        for i, r in enumerate(tables[name]):
            v = val(r, column)
            if not v:
                continue
            prefix = ID_PREFIX.get(name)
            if prefix and not v.startswith(prefix):
                errors.append("%s.csv:%d %s '%s' must start with %s" % (name, line(i), column, v, prefix))
            if v in seen:
                errors.append("%s.csv duplicate %s %s (rows %d, %d)" % (name, column, v, seen[v], line(i)))
            else:
                seen[v] = line(i)
        ids[name] = set(seen)
    for name, column, target in REFS:
        for i, r in enumerate(tables[name]):
            v = val(r, column)
            if v and v not in ids[target]:
                errors.append("%s.csv:%d %s %s not in %s.csv" % (name, line(i), column, v, target))


def check_awards(tables, errors):
    sources = {val(s, "source_id"): s for s in tables["sources"]}
    stances = {}
    for s in tables["award_sources"]:
        official = val(sources.get(val(s, "source_id"), {}), "is_official") == "yes"
        if official:
            stances.setdefault(val(s, "award_id"), set()).add(val(s, "stance"))
    seen = {}
    for i, a in enumerate(tables["awards"]):
        where = "awards.csv:%d" % line(i)
        award_id, comp, level, medal = (val(a, c) for c in ("award_id", "competition_id", "award_level",
                                                             "medal_type"))
        rank, year, status = to_int(val(a, "rank")), to_int(val(a, "award_year")), val(a, "verification_status")
        if level == "medal" and (not medal or val(a, "rank")):
            errors.append("%s award_level=medal needs medal_type and no rank" % where)
        if level == "placing" and (medal or not val(a, "rank")):
            errors.append("%s award_level=placing needs rank and no medal_type" % where)
        if level == "champion" and (medal or val(a, "rank")):
            errors.append("%s award_level=champion needs no medal_type and no rank" % where)
        if rank is not None and rank not in (1, 2, 3):
            errors.append("%s rank %d must be 1, 2 or 3" % (where, rank))
        if year is not None and not YEARS[0] <= year <= YEARS[1]:
            errors.append("%s award_year %d must be %d-%d" % (where, year, YEARS[0], YEARS[1]))
        if year is not None and comp and award_id and not award_id.startswith("%s-%d-" % (comp, year)):
            errors.append("%s award_id %s must start with %s-%d-" % (where, award_id, comp, year))
        if status and status != "VERIFIED" and not val(a, "verification_note"):
            errors.append("%s verification_note is empty (needed when status is %s)" % (where, status))
        if status == "VERIFIED" and "supports" not in stances.get(award_id, ()):
            errors.append("%s %s is VERIFIED but has no official supports source" % (where, award_id))
        if status == "VERIFIED" and "conflicts" in stances.get(award_id, ()):
            errors.append("%s %s is VERIFIED but an official source conflicts (make it DISPUTED)"
                          % (where, award_id))
        # GB has no entry numbers, so fall back to the title and product for the same-row test.
        ident = val(a, "entry_number") or val(a, "rank") or (val(a, "official_award_title"), val(a, "product_name"))
        key = (comp, val(a, "award_year"), val(a, "class_code"), ident, val(a, "recipient_name").lower())
        if key in seen:
            errors.append("awards.csv duplicate award (rows %d, %d): %s" % (seen[key], line(i), award_id))
        else:
            seen[key] = line(i)


def check_attributions(tables, errors):
    locations = {val(l, "location_id"): l for l in tables["locations"]}
    for i, at in enumerate(tables["award_attributions"]):
        where = "award_attributions.csv:%d" % line(i)
        award_id, business_id, location_id = (val(at, c) for c in ("award_id", "business_id", "location_id"))
        if award_id and not val(at, "attribution_id").startswith("AT-%s-" % award_id):
            errors.append("%s attribution_id must start with AT-%s-" % (where, award_id))
        loc = locations.get(location_id)
        if loc and val(loc, "business_id") != business_id:
            errors.append("%s location %s belongs to %s, not %s"
                          % (where, location_id, val(loc, "business_id"), business_id))
        if val(at, "relationship_type") == "entrant_location" and not location_id:
            errors.append("%s relationship_type=entrant_location needs location_id" % where)


def check_locations(tables, today, errors, warnings):
    coords = {}
    for i, l in enumerate(tables["locations"]):
        where = "locations.csv:%d" % line(i)
        postcode, state = val(l, "postcode"), val(l, "state_code")
        if postcode and not re.fullmatch(r"\d{4}", postcode):
            errors.append("%s postcode '%s' must be 4 digits" % (where, postcode))
        elif postcode and state in POSTCODES and not any(lo <= int(postcode) <= hi for lo, hi in POSTCODES[state]):
            errors.append("%s postcode %s is not in %s" % (where, postcode, state))
        lat, lng = to_float(val(l, "latitude")), to_float(val(l, "longitude"))
        if lat is not None and not LAT_RANGE[0] <= lat <= LAT_RANGE[1]:
            errors.append("%s latitude %s is outside Australia (%d to %d)" % (where, lat, LAT_RANGE[0], LAT_RANGE[1]))
        if lng is not None and not LNG_RANGE[0] <= lng <= LNG_RANGE[1]:
            errors.append("%s longitude %s is outside Australia (%d to %d)" % (where, lng, LNG_RANGE[0], LNG_RANGE[1]))
        if val(l, "operating_status") == "moved" and not val(l, "moved_to_location_id"):
            errors.append("%s operating_status=moved needs moved_to_location_id" % where)
        stale(where, "location_verified_at", val(l, "location_verified_at"), today, warnings)
        if lat is not None and lng is not None:
            for other_id, other in coords.get(val(l, "business_id"), []):
                gap = metres_apart((lat, lng), other)
                if gap < NEAR_METRES:
                    warnings.append("locations.csv %s and %s are %d m apart (same shop twice?)"
                                    % (other_id, val(l, "location_id"), gap))
            coords.setdefault(val(l, "business_id"), []).append((val(l, "location_id"), (lat, lng)))
    for i, s in enumerate(tables["sources"]):
        stale("sources.csv:%d" % line(i), "verified_at", val(s, "verified_at"), today, warnings)


def stale(where, column, value, today, warnings):
    checked = to_date(value)
    if checked and (today - checked).days > STALE_DAYS:
        warnings.append("%s %s %s is over %d days old" % (where, column, value, STALE_DAYS))


def check_names(tables, warnings):
    seen = {}
    for b in tables["businesses"]:
        key = name_key(val(b, "official_name"))
        if key in seen:
            warnings.append("businesses.csv %s and %s have nearly the same name (same business twice?)"
                            % (seen[key], val(b, "business_id")))
        else:
            seen[key] = val(b, "business_id")


def check(tables, today):
    # -> (errors, warnings); data.js is only written when errors is empty.
    errors, warnings = [], []
    check_cells(tables, errors)
    check_ids(tables, errors)
    check_awards(tables, errors)
    check_attributions(tables, errors)
    check_locations(tables, today, errors, warnings)
    check_names(tables, warnings)
    return errors, warnings


def tier(a):
    # D1: champion, gold and 1st place make a business qualify ("top");
    # silver and 2nd place are only listed once it does ("also"); bronze and 3rd are never listed.
    if val(a, "award_level") == "champion" or val(a, "medal_type") == "gold" or val(a, "rank") == "1":
        return "top"
    if val(a, "medal_type") == "silver" or val(a, "rank") == "2":
        return "also"
    return None


def skip_reason(a, at, b, open_shops, official_supports):
    # The first publish rule (DATA-SCHEMA.md section 5) this award link fails, or None.
    if val(a, "verification_status") != "VERIFIED":
        return "award is %s" % val(a, "verification_status")
    if val(a, "award_id") not in official_supports:
        return "no official supports source"
    if val(at, "attribution_status") != "VERIFIED":
        return "attribution is %s" % val(at, "attribution_status")
    if val(b, "scope") not in PUBLISHED_SCOPES:
        return "business scope is %s (D2)" % val(b, "scope")
    if val(a, "recipient_type") == "individual":
        return "individual award (D3)"
    if tier(a) is None:
        return "%s is not listed (D1)" % (val(a, "medal_type") or "rank %s" % val(a, "rank"))
    location_id = val(at, "location_id")
    if val(b, "scope") == "chain_franchise" and not location_id:
        return "franchise award has no location (D2)"
    if location_id and val(b, "scope") != "retail" and location_id not in open_shops:
        return "awarded location is not an open shop"
    return None


def pick_locations(b, links, open_shops):
    # retail: every open shop; supermarket: the awarded ones, or all when an award names only the brand;
    # chain_franchise: only the awarded ones (skip_reason already dropped brand-only franchise awards).
    shops = [l for l in open_shops.values() if val(l, "business_id") == val(b, "business_id")]
    awarded = {val(at, "location_id") for _, at in links}
    if val(b, "scope") == "retail" or (val(b, "scope") == "supermarket" and "" in awarded):
        return shops
    return [l for l in shops if val(l, "location_id") in awarded]


def location_entry(b, l):
    address = "%s, %s %s %s" % (val(l, "street_address"), val(l, "suburb"), val(l, "state_code"), val(l, "postcode"))
    query = urllib.parse.quote(val(b, "official_name") + " " + address)
    return {
        "id": val(l, "location_id"),
        "name": val(l, "location_name"),
        "address": address,
        "suburb": val(l, "suburb"),
        "city": val(l, "city"),
        "state": val(l, "state_code"),
        "lat": float(val(l, "latitude")),
        "lng": float(val(l, "longitude")),
        "type": val(l, "location_type"),
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=" + query,
    }


def award_entry(a, at, shown_ids, sources_for):
    score = to_float(val(a, "score")) if val(a, "score") else None
    sources = sources_for.get(val(a, "award_id"), [])
    entry = {
        "id": val(a, "award_id"),
        "comp": val(a, "competition_id"),
        "year": int(val(a, "award_year")),
        "level": val(a, "award_level"),
        "medal": val(a, "medal_type") or None,
        "rank": int(val(a, "rank")) if val(a, "rank") else None,
        "tier": tier(a),
        "score": score,
        "title": val(a, "official_award_title"),
        "category": val(a, "category"),
        "group": val(a, "category_group"),
        "product": val(a, "product_name"),
        # A retail award whose location has closed is kept at brand level.
        "locationId": val(at, "location_id") if val(at, "location_id") in shown_ids else None,
        "relation": val(at, "relationship_type"),
        "sources": [{"title": val(s, "source_title"), "url": val(s, "source_url"),
                     "archive": val(s, "archive_url"), "ref": val(s, "source_reference")} for s in sources],
        "verifiedAt": max(val(s, "verified_at") for s in sources),
    }
    if entry["relation"] == "staff_entry":
        entry["recipient"] = val(a, "recipient_name")  # shown as 由 X 代表參賽
    return entry


def award_sort_key(e):
    return (-e["year"], LEVEL_ORDER["champion" if e["level"] == "champion" else e["tier"]], -(e["score"] or 0), e["id"])


def summary(awards):
    return {
        "champion": sum(e["level"] == "champion" for e in awards),
        "gold": sum(e["medal"] == "gold" for e in awards),
        "first": sum(e["rank"] == 1 for e in awards),
        "also": sum(e["tier"] == "also" for e in awards),
        "years": sorted({e["year"] for e in awards}),
    }


def build(tables):
    # -> (businesses for data.js, [(award_id, business_id, reason)] for every award link left out)
    awards = {val(a, "award_id"): a for a in tables["awards"]}
    sources = {val(s, "source_id"): s for s in tables["sources"]}
    open_shops = {val(l, "location_id"): l for l in tables["locations"]
                  if val(l, "location_role") == "shop" and val(l, "operating_status") == "open"}
    sources_for, official_supports = {}, set()
    for s in tables["award_sources"]:
        if val(s, "stance") == "supports":
            source = sources[val(s, "source_id")]
            sources_for.setdefault(val(s, "award_id"), []).append(source)
            if val(source, "is_official") == "yes":
                official_supports.add(val(s, "award_id"))

    links, skipped = {}, []
    businesses = {val(b, "business_id"): b for b in tables["businesses"]}
    for at in tables["award_attributions"]:
        a, b = awards[val(at, "award_id")], businesses[val(at, "business_id")]
        reason = skip_reason(a, at, b, open_shops, official_supports)
        if reason:
            skipped.append((val(a, "award_id"), val(b, "business_id"), reason))
        else:
            links.setdefault(val(b, "business_id"), []).append((a, at))

    out = []
    for business_id, b in businesses.items():
        mine = links.get(business_id, [])
        if not mine:
            continue
        reason = None
        if not any(tier(a) == "top" for a, _ in mine):
            reason = "business has no champion, gold or 1st place (D1)"
        shops = pick_locations(b, mine, open_shops) if not reason else []
        if not reason and not shops:
            reason = "business has no open shop"
        if reason:
            skipped += [(val(a, "award_id"), business_id, reason) for a, _ in mine]
            continue
        shown_ids = {val(l, "location_id") for l in shops}
        entries = sorted((award_entry(a, at, shown_ids, sources_for) for a, at in mine), key=award_sort_key)
        out.append({
            "id": business_id,
            "name": val(b, "official_name"),
            "types": split_list(val(b, "business_type")),
            "scope": val(b, "scope"),
            "descZh": val(b, "description_zh"),
            "descEn": val(b, "description_en"),
            "website": val(b, "website_url"),
            "instagram": val(b, "instagram_url"),
            "related": split_list(val(b, "related_refs")),
            "locations": [location_entry(b, l) for l in shops],
            "awards": entries,
            "summary": summary(entries),
        })
    # UI-PLAN.md section 5: champions, then gold + 1st, then the latest year, then the name.
    out.sort(key=lambda s: (-s["summary"]["champion"], -(s["summary"]["gold"] + s["summary"]["first"]),
                            -max(s["summary"]["years"]), s["name"].lower()))
    return out, skipped


def competitions(tables):
    return [{"id": val(c, "competition_id"), "name": val(c, "official_name"), "zh": val(c, "short_name_zh"),
             "en": val(c, "short_name_en"), "type": val(c, "competition_type"),
             "system": val(c, "award_system"), "website": val(c, "website_url")} for c in tables["competitions"]]


def summary_text(s):
    # "冠軍 2 · 金牌 7 · 第 1 名 2 ／ 也推薦 7", as on the card
    parts = ["%s %d" % (label, s[key]) for key, label in (("champion", "冠軍"), ("gold", "金牌"), ("first", "第 1 名"))
             if s[key]]
    text = " · ".join(parts)
    return text + (" ／ 也推薦 %d" % s["also"] if s["also"] else "")


def write_mymaps(businesses, path):
    # One row per published location, coloured in My Maps by 主類型 (烘焙／咖啡).
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["店名", "門市", "緯度", "經度", "主類型", "最高榮譽", "獎項摘要", "地址"])
        for b in businesses:
            s = b["summary"]
            best = "冠軍" if s["champion"] else "金牌" if s["gold"] else "第 1 名"
            for l in b["locations"]:
                w.writerow([b["name"], l["name"], l["lat"], l["lng"], TYPE_ZH[b["types"][0]], best,
                            summary_text(s), l["address"]])


def report(tables, businesses, skipped):
    statuses = {}
    for a in tables["awards"]:
        statuses[val(a, "verification_status")] = statuses.get(val(a, "verification_status"), 0) + 1
    print("awards.csv by status:", ", ".join("%s %d" % (k, statuses[k]) for k in STATUSES if k in statuses))
    published = sum(len(b["awards"]) for b in businesses)
    print("award links: %d published, %d not published (of %d in award_attributions.csv)"
          % (published, len(skipped), len(tables["award_attributions"])))
    reasons = {}
    for award_id, business_id, reason in skipped:
        reasons.setdefault(reason, []).append("%s %s" % (business_id, award_id))
    for reason, items in sorted(reasons.items()):
        print("  not published, %s: %d" % (reason, len(items)))
        for item in items:
            print("    " + item)
    states = {}
    for b in businesses:
        for state in {l["state"] for l in b["locations"]}:
            states[state] = states.get(state, 0) + 1
    print("businesses by state:", ", ".join("%s %d" % (k, states[k]) for k in STATES if k in states))


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("folder", help="the awards page folder, e.g. travel/australia/awards")
    p.add_argument("--out", help="default: data.js in the folder")
    p.add_argument("--data-as-of", required=True, help="shown on the page, e.g. 2026-11")
    p.add_argument("--mymaps-url", default="", help="Google My Maps embed URL for the overview map")
    p.add_argument("--mymaps-out", help="also write a My Maps import csv (put it outside the repo, e.g. Downloads)")
    p.add_argument("--today", help="date for the %d-day freshness check, default today" % STALE_DAYS)
    args = p.parse_args(argv)

    tables = load(args.folder)
    today = datetime.date.fromisoformat(args.today) if args.today else datetime.date.today()
    errors, warnings = check(tables, today)
    for w in warnings:
        print("WARNING", w)
    for e in errors:
        print("ERROR", e)
    if errors:
        print("%d errors; data.js not written" % len(errors))
        return 1

    businesses, skipped = build(tables)
    data = {
        "dataAsOf": args.data_as_of,
        "myMapsEmbedUrl": args.mymaps_url,
        "competitions": competitions(tables),
        "businesses": businesses,
    }
    out = args.out or os.path.join(args.folder, "data.js")
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write("// 由 make_awards_data.py 產生，請勿手改；csv 更新後重新產生。\n")
        f.write("var PAGE_DATA = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("%d businesses, %d locations -> %s"
          % (len(businesses), sum(len(b["locations"]) for b in businesses), out))
    report(tables, businesses, skipped)
    if args.mymaps_out:
        write_mymaps(businesses, args.mymaps_out)
        print("My Maps ->", args.mymaps_out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
