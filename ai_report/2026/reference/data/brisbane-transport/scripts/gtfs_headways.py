"""Scheduled headways on trunk services, from one Translink GTFS snapshot.

Usage:
    python -I scripts/gtfs_headways.py <SEQ_GTFS.zip> <weekday YYYYMMDD> <saturday YYYYMMDD> [out.csv]

What it measures (rules agreed with the author on 2026-11-14, README section 9):
- Rail: one measuring station per line, the first station from the city that only that
  line serves. Counts trains that stop there and later stop at Central or Roma Street
  (toward the city). Outbound counts are the trains that stopped at Central or Roma
  Street earlier in the trip.
- Brisbane Metro M1, M2 and CityCat F1: one measuring stop each, both directions,
  split by GTFS direction_id and labelled with the most common headsign.
- Time bands use the departure time at the measuring station.
- Output per point, direction and band: departures, average headway (band minutes /
  departures) and the longest gap between two consecutive departures inside the band.

These are timetable figures, not observed operations.
"""
import collections
import csv
import io
import sys
import zipfile

# (label, line or route, measuring station name as in GTFS parent station)
RAIL_POINTS = [
    ("火車", "Airport", "International Airport station"),
    ("火車", "Doomben", "Clayfield station"),
    ("火車", "Shorncliffe", "Bindha station"),
    ("火車", "Caboolture", "Dakabin station"),
    ("火車", "Redcliffe Peninsula", "Kallangur station"),
    ("火車", "Sunshine Coast", "Elimbah station"),
    ("火車", "Ferny Grove", "Windsor station"),
    ("火車", "Ipswich/Rosewood", "Wacol station"),
    ("火車", "Springfield", "Richlands station"),
    ("火車", "Beenleigh", "Dutton Park station"),
    ("火車", "Gold Coast", "Holmview station"),
    ("火車", "Cleveland", "Buranda station"),
]
ROUTE_POINTS = [
    ("Metro", "M1", "Buranda busway station"),
    ("Metro", "M2", "Boggo Road busway station"),
    ("渡輪", "F1", "South Bank ferry terminal"),
]
CITY_STATIONS = ["Central station", "Roma Street station"]
BANDS = {
    "weekday": [("07:00-09:00", 7 * 60, 9 * 60), ("10:00-15:00", 10 * 60, 15 * 60), ("19:00-22:00", 19 * 60, 22 * 60)],
    "saturday": [("10:00-15:00", 10 * 60, 15 * 60)],
}


def reader(z, name):
    return csv.DictReader(io.TextIOWrapper(z.open(name), encoding="utf-8-sig"))


def active_services(z, date):
    weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    import datetime
    d = datetime.date(int(date[:4]), int(date[4:6]), int(date[6:]))
    col = weekday[d.weekday()]
    active = set()
    for c in reader(z, "calendar.txt"):
        if c["start_date"] <= date <= c["end_date"] and c[col] == "1":
            active.add(c["service_id"])
    if "calendar_dates.txt" in z.namelist():
        for c in reader(z, "calendar_dates.txt"):
            if c["date"] == date:
                if c["exception_type"] == "1":
                    active.add(c["service_id"])
                elif c["exception_type"] == "2":
                    active.discard(c["service_id"])
    return active


def minutes(t):
    h, m, _ = t.split(":")
    return int(h) * 60 + int(m)


def main():
    path, wk, sat = sys.argv[1], sys.argv[2], sys.argv[3]
    out = sys.argv[4] if len(sys.argv) > 4 else None
    z = zipfile.ZipFile(path)

    stops = list(reader(z, "stops.txt"))
    parents = {s["stop_name"]: s["stop_id"] for s in stops if s.get("location_type") == "1"}
    children = collections.defaultdict(set)
    for s in stops:
        if s.get("parent_station"):
            children[s["parent_station"]].add(s["stop_id"])

    def stop_set(name):
        if name in parents:
            return children[parents[name]] | {parents[name]}
        ids = {s["stop_id"] for s in stops if s["stop_name"] == name}
        if not ids:
            raise SystemExit(f"stop not found: {name}")
        return ids

    city = set().union(*(stop_set(n) for n in CITY_STATIONS))
    point_stops = {name: stop_set(name) for _, _, name in RAIL_POINTS + ROUTE_POINTS}

    routes = {r["route_id"]: r for r in reader(z, "routes.txt")}
    days = {"weekday": active_services(z, wk), "saturday": active_services(z, sat)}
    wanted_routes = {p[1] for p in ROUTE_POINTS}

    trips = {}
    for t in reader(z, "trips.txt"):
        r = routes[t["route_id"]]
        is_rail = r["route_type"] == "2"
        short = r["route_short_name"]
        if not (is_rail or short in wanted_routes):
            continue
        day_kinds = [k for k, svc in days.items() if t["service_id"] in svc]
        if day_kinds:
            trips[t["trip_id"]] = (is_rail, short, t["direction_id"], t["trip_headsign"], day_kinds)

    seqs = collections.defaultdict(list)
    for st in reader(z, "stop_times.txt"):
        if st["trip_id"] in trips:
            seqs[st["trip_id"]].append((int(st["stop_sequence"]), st["stop_id"], st["departure_time"]))

    # results[(mode, line, point, direction_label, day_kind)] = list of departure minutes
    results = collections.defaultdict(list)
    headsigns = collections.defaultdict(collections.Counter)
    for trip_id, (is_rail, short, dir_id, headsign, day_kinds) in trips.items():
        seq = sorted(seqs[trip_id])
        points = RAIL_POINTS if is_rail else [p for p in ROUTE_POINTS if p[1] == short]
        for mode, line, name in points:
            hits = [(i, dep) for i, (_, sid, dep) in enumerate(seq) if sid in point_stops[name]]
            if not hits:
                continue
            i, dep = hits[0]
            if is_rail:
                later_city = any(sid in city for _, sid, _ in seq[i + 1:])
                earlier_city = any(sid in city for _, sid, _ in seq[:i])
                if later_city:
                    direction = "往市區"
                elif earlier_city:
                    direction = "離開市區"
                else:
                    continue
            else:
                direction = f"direction_id={dir_id}"
                headsigns[(line, direction)][headsign] += 1
            for k in day_kinds:
                results[(mode, line, name, direction, k)].append(minutes(dep))

    rows = []
    for (mode, line, name, direction, kind), deps in sorted(results.items()):
        label = direction
        if direction.startswith("direction_id"):
            label = f"{direction}（往 {headsigns[(line, direction)].most_common(1)[0][0]}）"
        deps.sort()
        for band, lo, hi in BANDS[kind]:
            inside = [d for d in deps if lo <= d < hi]
            n = len(inside)
            avg = round((hi - lo) / n, 1) if n else ""
            gaps = [b - a for a, b in zip(inside, inside[1:])]
            rows.append({
                "mode": mode, "line": line, "point": name, "direction": label,
                "day": "平日" if kind == "weekday" else "週六",
                "date": wk if kind == "weekday" else sat, "band": band,
                "departures": n, "avg_headway_min": avg, "max_gap_min": max(gaps) if gaps else "",
            })

    fields = list(rows[0].keys())
    w = csv.DictWriter(open(out, "w", encoding="utf-8", newline="") if out else sys.stdout, fieldnames=fields)
    w.writeheader()
    w.writerows(rows)
    print(f"rows: {len(rows)}  trips used: {len(trips)}", file=sys.stderr)


if __name__ == "__main__":
    main()
