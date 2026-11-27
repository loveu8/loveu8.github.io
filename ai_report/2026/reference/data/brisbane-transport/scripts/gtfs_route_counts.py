"""Routes running on a sample Wednesday, by mode, one row per GTFS capture (Q104).

Same sample day as gtfs_route_regions.py (first Wednesday at least 7 days after
the earliest calendar start date); a route is one route_short_name with at least
one trip that day. route_type: 3 bus, 2 rail, 4 ferry, 0 light rail (tram).
Rail route_short_names are origin-destination codes, not lines (Q105): the
rail column is kept for checking only; the line count comes from S-176.

Usage: python gtfs_route_counts.py OUT.csv CAPTURE.zip [CAPTURE.zip ...]
The output file is opened only after every input has been read.
"""
import sys
from collections import defaultdict
from pathlib import Path
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gtfs_route_regions import active_services, rd, sample_wed

TYPES = {"3": "bus_routes", "2": "rail_od_codes", "4": "ferry_routes", "0": "tram_routes"}


def process(path):
    z = zipfile.ZipFile(path)
    d = sample_wed(z)
    svc = active_services(z, d)
    run = {t["route_id"] for t in rd(z, "trips.txt") if t["service_id"] in svc}
    names = defaultdict(set)
    for r in rd(z, "routes.txt"):
        if r["route_id"] in run and r["route_type"] in TYPES:
            names[TYPES[r["route_type"]]].add(r["route_short_name"])
    row = {"capture": Path(path).name, "sample_date": d.isoformat()}
    row.update({col: len(names[col]) for col in TYPES.values()})
    print(row, file=sys.stderr)
    return row


def main():
    out, inputs = sys.argv[1], sys.argv[2:]
    rows = [process(p) for p in inputs]
    import csv
    with open(out, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)


if __name__ == "__main__":
    main()
