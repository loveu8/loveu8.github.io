"""Hourly scheduled departures from Eight Mile Plains toward Cultural Centre.

Usage:
    python -I scripts/emp_hourly.py <out.csv> <SEQ_GTFS.zip> <YYYYMMDD> [<SEQ_GTFS.zip> <YYYYMMDD> ...]

    The 2025-04-11 Wayback capture is gzip-wrapped; pass the unwrapped
    SEQ_GTFS_wayback_20250411000903.unzipped.zip.

Rule (narrative QA section 5 item 2, 2026-11-23; chart decision Q65, 2026-11-25):
- A trip counts when it allows boarding at stop 10824 (Eight Mile Plains platform 1)
  and later allows alighting at stop 10802 (Cultural Centre platform 1).
- The hour is taken from the departure time at 10824 (GTFS hours past 23 stay as 24, 25 ...).
- Service days come from calendar.txt plus calendar_dates.txt exceptions.
- Output one row per date, route and hour; route "全部" sums every route.

These are timetable figures, not observed operations.
"""
import collections
import csv
import datetime
import io
import sys
import zipfile

ORIGIN, DEST = "10824", "10802"


def reader(z, name):
    return csv.DictReader(io.TextIOWrapper(z.open(name), encoding="utf-8-sig"))


def active_services(z, date):
    cols = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    d = datetime.date(int(date[:4]), int(date[4:6]), int(date[6:]))
    col = cols[d.weekday()]
    active = {c["service_id"] for c in reader(z, "calendar.txt")
              if c["start_date"] <= date <= c["end_date"] and c[col] == "1"}
    if "calendar_dates.txt" in z.namelist():
        for c in reader(z, "calendar_dates.txt"):
            if c["date"] == date:
                (active.add if c["exception_type"] == "1" else active.discard)(c["service_id"])
    return active


def count(path, date):
    z = zipfile.ZipFile(path)
    routes = {r["route_id"]: r["route_short_name"] for r in reader(z, "routes.txt")}
    svc = active_services(z, date)
    trips = {t["trip_id"]: routes[t["route_id"]] for t in reader(z, "trips.txt") if t["service_id"] in svc}
    seqs = collections.defaultdict(list)
    for st in reader(z, "stop_times.txt"):
        if st["trip_id"] in trips and st["stop_id"] in (ORIGIN, DEST):
            seqs[st["trip_id"]].append((int(st["stop_sequence"]), st["stop_id"], st["departure_time"],
                                        st.get("pickup_type", "0") or "0", st.get("drop_off_type", "0") or "0"))
    hours = collections.Counter()
    for trip_id, seq in seqs.items():
        seq.sort()
        board = [(s, dep) for s, sid, dep, pu, _ in seq if sid == ORIGIN and pu != "1"]
        if not board:
            continue
        s0, dep = board[0]
        if any(s > s0 and sid == DEST and do != "1" for s, sid, _, _, do in seq):
            h = int(dep.split(":")[0])
            hours[(trips[trip_id], h)] += 1
            hours[("全部", h)] += 1
    return hours


def main():
    out, args = sys.argv[1], sys.argv[2:]
    rows = []
    for path, date in zip(args[::2], args[1::2]):
        hours = count(path, date)
        for (route, h), n in sorted(hours.items(), key=lambda x: (x[0][0] != "全部", x[0][0], x[0][1])):
            rows.append([date, route, h, n])
        totals = collections.Counter()
        for (route, _), n in hours.items():
            totals[route] += n
        print(date, dict(totals), file=sys.stderr)
    # Open the output only after every input has loaded, so a failed run leaves no partial file.
    with open(out, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["date", "route", "hour", "departures"])
        w.writerows(rows)


if __name__ == "__main__":
    main()
