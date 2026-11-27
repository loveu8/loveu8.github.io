"""Bus routes per local government area (LGA), one GTFS capture per row group.

For each capture:
- pick a sample Wednesday (first Wednesday at least 7 days after the earliest
  calendar start date, so the feed is fully in effect);
- keep bus routes (route_type 3) with at least one trip that day, keyed by
  route_short_name (one route number = one route, versions merged);
- collect the stops those trips use that day and place each stop in one of the
  11 LGAs (ABS ASGS 2025 boundaries, raw/abs/lga_seq11_2025.json) or "outside";
- a route belongs to the LGA holding most of its stops (ties: the LGA listed
  first in LGA_ORDER); it is "cross-LGA" when its stops fall in 2+ LGAs.

Usage: python gtfs_route_regions.py OUT.csv CAPTURE.zip [CAPTURE.zip ...]
The output file is opened only after every input has been processed.
"""
import csv, datetime, io, json, sys, zipfile
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
LGA_FILE = HERE.parent / "raw" / "abs" / "lga_seq11_2025.json"
LGA_ORDER = ["Brisbane", "Gold Coast", "Moreton Bay", "Logan", "Ipswich", "Sunshine Coast",
             "Redland", "Noosa", "Scenic Rim", "Lockyer Valley", "Somerset"]
OUTSIDE = "outside 11 LGAs"


def load_lgas():
    feats = json.loads(LGA_FILE.read_text(encoding="utf-8"))["features"]
    out = []
    for f in feats:
        rings = f["geometry"]["rings"]
        xs = [p[0] for r in rings for p in r]; ys = [p[1] for r in rings for p in r]
        out.append((f["attributes"]["LGA_NAME_2025"], rings, (min(xs), min(ys), max(xs), max(ys))))
    names = {n for n, _, _ in out}
    assert names == set(LGA_ORDER), names
    return out


def inside(x, y, rings):
    # even-odd rule over all rings: handles islands and holes
    c = False
    for r in rings:
        j = len(r) - 1
        for i in range(len(r)):
            xi, yi = r[i]; xj, yj = r[j]
            if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
                c = not c
            j = i
    return c


def lga_of(x, y, lgas):
    for name, rings, (x0, y0, x1, y1) in lgas:
        if x0 <= x <= x1 and y0 <= y <= y1 and inside(x, y, rings):
            return name
    return OUTSIDE


def rd(z, n):
    return csv.DictReader(io.TextIOWrapper(z.open(n), encoding="utf-8-sig"))


def sample_wed(z):
    d = datetime.datetime.strptime(min(r["start_date"] for r in rd(z, "calendar.txt")), "%Y%m%d").date()
    d += datetime.timedelta(days=7)
    while d.weekday() != 2:
        d += datetime.timedelta(days=1)
    return d


def active_services(z, d):
    ds, wd, s = d.strftime("%Y%m%d"), d.strftime("%A").lower(), set()
    for r in rd(z, "calendar.txt"):
        if r["start_date"] <= ds <= r["end_date"] and r[wd] == "1":
            s.add(r["service_id"])
    if "calendar_dates.txt" in z.namelist():
        for r in rd(z, "calendar_dates.txt"):
            if r["date"] == ds:
                (s.add if r["exception_type"] == "1" else s.discard)(r["service_id"])
    return s


def process(path, lgas):
    z = zipfile.ZipFile(path)
    d = sample_wed(z); svc = active_services(z, d)
    bus = {r["route_id"]: r["route_short_name"] for r in rd(z, "routes.txt") if r["route_type"] == "3"}
    trip_route = {t["trip_id"]: bus[t["route_id"]] for t in rd(z, "trips.txt")
                  if t["service_id"] in svc and t["route_id"] in bus}
    route_stops = defaultdict(set)
    for st in rd(z, "stop_times.txt"):
        r = trip_route.get(st["trip_id"])
        if r is not None:
            route_stops[r].add(st["stop_id"])
    used = set().union(*route_stops.values())
    stop_lga = {}
    for s in rd(z, "stops.txt"):
        if s["stop_id"] in used:
            stop_lga[s["stop_id"]] = lga_of(float(s["stop_lon"]), float(s["stop_lat"]), lgas)
    rank = {n: i for i, n in enumerate(LGA_ORDER + [OUTSIDE])}
    routes, cross = Counter(), Counter()
    for r, stops in route_stops.items():
        c = Counter(stop_lga[s] for s in stops)
        home = sorted(c.items(), key=lambda kv: (-kv[1], rank[kv[0]]))[0][0]
        routes[home] += 1
        if len([k for k in c if k != OUTSIDE]) >= 2:
            cross[home] += 1
    capture = Path(path).name
    print(capture, d, sum(routes.values()), "bus routes", file=sys.stderr)
    return [{"capture": capture, "sample_date": d.isoformat(), "lga": n,
             "bus_routes": routes[n], "of_which_cross_lga": cross[n]}
            for n in LGA_ORDER + [OUTSIDE]]


def main():
    out, inputs = sys.argv[1], sys.argv[2:]
    lgas = load_lgas()
    rows = [row for p in inputs for row in process(p, lgas)]
    with open(out, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader(); w.writerows(rows)


if __name__ == "__main__":
    main()
