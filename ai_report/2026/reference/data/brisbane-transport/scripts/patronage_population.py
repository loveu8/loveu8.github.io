"""SEQ public transport trips per financial year against the 11-LGA population (Q96, Q97).

Usage (from DATA_DIR):
    python -I scripts/patronage_population.py raw/data.qld/patronage-and-complaints_weekly_20261126.csv raw/data.qld/datastore_patronage-southeast-queensland.json raw/abs/32180DS0004_2001-25.xlsx derived/patronage_population_2015-16_2025-26.csv

Trips (SEQ_TL, Translink passenger trips):
  2015-16 to 2024-25  weekly "Patronage and complaints" file (S-172). Each week goes to the
                      financial year of its week-ending date; the year total is the average
                      week times days in the year / 7, so 53-week years are not inflated.
  2025-26             monthly "Patronage - South East Queensland" (S-013), summed over
                      July 2025 to June 2026, because the weekly file has no weeks from
                      26 Jan to 4 Apr 2026.
Population: ABS ERP at 30 June for the 11 SEQ_PLAN LGAs (S-060, 2025 boundaries); a year's
population is the mean of the 30 June before and after it. 2025-26 has none yet (June 2026
ERP is not published), so its per-person and population index cells stay empty.
Index: 2015-16 = 100 for both.

Checks (stop without writing when they fail): every weekly year has 52 or 53 weeks with no
gaps; the weekly and monthly totals for 2024-25 agree within 0.1%; the published totals the
QA note relies on still come out the same.
"""
import csv
import datetime
import json
import sys
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict

LGAS = ["Brisbane", "Gold Coast", "Moreton Bay", "Logan", "Ipswich", "Sunshine Coast",
        "Redland", "Noosa", "Scenic Rim", "Lockyer Valley", "Somerset"]
FIRST, LAST_WEEKLY, LAST = 2016, 2025, 2026  # financial years by their ending year
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
T = "{%s}t" % NS["m"]


def fy_end(d):
    return d.year + 1 if d.month >= 7 else d.year


def label(y):
    return f"{y - 1}-{str(y)[2:]}"


def weekly_trips(path):
    weeks = defaultdict(list)
    with open(path, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.reader(f))[1:]
    dates = []
    for r in rows:
        d = datetime.datetime.strptime(r[0].strip(), "%a, %d %b %Y %I:%M %p").date()
        dates.append(d)
        weeks[fy_end(d)].append(float(r[1].replace(",", "")))
    dates.sort()
    out = {}
    for y in range(FIRST, LAST_WEEKLY + 1):
        inside = [d for d in dates if fy_end(d) == y]
        gaps = [a for a, b in zip(inside, inside[1:]) if (b - a).days != 7]
        if len(weeks[y]) not in (52, 53) or gaps:
            sys.exit(f"{label(y)}: {len(weeks[y])} weeks, gaps after {gaps}")
        days = (datetime.date(y, 7, 1) - datetime.date(y - 1, 7, 1)).days
        out[y] = sum(weeks[y]) / len(weeks[y]) * days / 7
    return out


def monthly_trips(path, y):
    with open(path, encoding="utf-8") as f:
        records = json.load(f)["result"]["records"]
    months = defaultdict(float)
    for r in records:
        d = datetime.datetime.strptime(r["Month-Year"], "%b-%Y").date()
        if fy_end(d) == y:
            months[d] += float(r["Passenger trips"])
    if len(months) != 12:
        sys.exit(f"{label(y)}: monthly file has {len(months)} months")
    return sum(months.values())


def col(ref):
    n = 0
    for ch in "".join(c for c in ref if c.isalpha()):
        n = n * 26 + ord(ch) - 64
    return n


def population(path):
    z = zipfile.ZipFile(path)
    ss = ["".join(t.text or "" for t in si.iter(T))
          for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS)]
    rows = []
    for row in ET.fromstring(z.read("xl/worksheets/sheet2.xml")).find("m:sheetData", NS):
        cells = {}
        for c in row:
            v = c.find("m:v", NS)
            if v is not None:
                cells[col(c.get("r"))] = ss[int(v.text)] if c.get("t") == "s" else v.text
        rows.append(cells)
    header = next(r for r in rows if r.get(3) == "2001")
    year_col = {int(v): k for k, v in header.items() if k >= 3}
    total, found = defaultdict(int), set()
    for r in rows:
        if r.get(2) in LGAS and r.get(1, "").startswith("3"):
            found.add(r[2])
            for y, k in year_col.items():
                total[y] += int(r[k])
    if found != set(LGAS):
        sys.exit(f"missing LGAs: {set(LGAS) - found}")
    return total


def main():
    weekly_path, monthly_path, abs_path, out_path = sys.argv[1:5]
    trips = weekly_trips(weekly_path)
    check = monthly_trips(monthly_path, 2025)
    if abs(trips[2025] / check - 1) > 0.001:
        sys.exit(f"2024-25 weekly {trips[2025]:.0f} vs monthly {check:.0f}")
    trips[LAST] = monthly_trips(monthly_path, LAST)
    erp = population(abs_path)

    base_t = trips[FIRST]
    base_p = (erp[FIRST - 1] + erp[FIRST]) / 2
    out = []
    for y in range(FIRST, LAST + 1):
        pop = (erp[y - 1] + erp[y]) / 2 if y in erp else None
        out.append({
            "financial_year": label(y),
            "trips_source": "S-172 weekly" if y <= LAST_WEEKLY else "S-013 monthly",
            "trips": round(trips[y]),
            "population_mid": round(pop) if pop else "",
            "trips_per_person": round(trips[y] / pop, 1) if pop else "",
            "trips_index": round(trips[y] / base_t * 100, 1),
            "population_index": round(pop / base_p * 100, 1) if pop else "",
        })

    published = {"2018-19": 189.8, "2023-24": 167.8, "2024-25": 192.9, "2025-26": 214.4}
    for r in out:
        want = published.get(r["financial_year"])
        if want is not None and round(r["trips"] / 1e6, 1) != want:
            sys.exit(f"{r['financial_year']}: {r['trips'] / 1e6:.1f} million, QA note has {want}")

    with open(out_path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    for r in out:
        print(r, file=sys.stderr)


if __name__ == "__main__":
    main()
