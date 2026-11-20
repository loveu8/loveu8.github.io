"""Summarise the published OD boarding counts for three rail stations."""

import csv
from collections import Counter
from io import TextIOWrapper
from pathlib import Path
from zipfile import ZipFile


def main():
    root = Path(__file__).resolve().parents[1]
    stations = {"600411": "Bindha", "600430": "Clayfield", "600479": "Elimbah"}
    directory = root / "raw" / "od-trips"
    totals = Counter()
    for month in ("2026-07", "2026-08", "2026-09"):
        archive_path, = directory.glob(f"{month.replace('-', '')}*.zip")
        with ZipFile(archive_path) as archive:
            member, = (name for name in archive.namelist() if name.endswith(".csv"))
            with archive.open(member) as data:
                rows = csv.DictReader(TextIOWrapper(data, encoding="utf-8-sig"))
                for row in rows:
                    if row["MONTH"] != month:
                        raise ValueError(f"Unexpected month in {archive_path.name}")
                    stop = row["ORIGIN_STOP"]
                    if stop in stations:
                        key = (month, stations[stop], stop, row["TIME_GROUPING"])
                        totals[key] += int(row["QUANTITY"])
        for station in stations.values():
            if not any(key[:2] == (month, station) for key in totals):
                raise ValueError(f"Missing boarding records for {station}, {month}")

    output = root / "derived" / "od_rail_station_boardings_2026-07_to_09.csv"
    with output.open("w", encoding="utf-8", newline="") as data:
        writer = csv.writer(data)
        writer.writerow(["month", "station", "origin_stop_id", "time_grouping", "boardings"])
        writer.writerows((*key, total) for key, total in sorted(totals.items()))


if __name__ == "__main__":
    main()
