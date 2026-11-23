"""Vehicles on register in TMR's South East Region (the same 11 LGAs as chapter 1), June 2020, 2025, 2026.

Inputs in raw/tmr/ (git-ignored, re-download from the URLs in sources.csv):
- 2020: vehicles_south-east_region_qld_0620.txt, made with `pdftotext -raw` from the Wayback copy of the PDF.
- 2025, 2026: vehicles_south-east_region_queensland_june_<year>.docx. The table is an EMF picture
  inside the docx; its text is read from the EMR_EXTTEXTOUTW records and grouped into rows by y position.
Column order (checked against the header positions in both formats): Cars, Light commercial,
Campervans/motorhomes, Motorcycles, Trucks, Prime movers, Buses, Mobile machinery, Trailers, Other,
Conditional vehicles, Total. Every row's columns are checked to add up to its Total.
"""

import csv
import struct
from pathlib import Path
from zipfile import ZipFile

COLS = ["cars", "light_commercial", "campervans", "motorcycles", "trucks", "prime_movers", "buses",
        "mobile_machinery", "trailers", "other", "conditional", "total"]
LGA = {
    "Brisbane City North": "Brisbane", "Brisbane City South": "Brisbane",
    "Gold Coast City": "Gold Coast", "Ipswich City": "Ipswich",
    "Lockyer Valley Regional": "Lockyer Valley", "Logan City": "Logan",
    "Moreton Bay Regional": "Moreton Bay", "Moreton Bay City": "Moreton Bay",
    "Noosa Shire": "Noosa", "Redland City": "Redland", "Scenic Rim Regional": "Scenic Rim",
    "Somerset Regional": "Somerset", "Sunshine Coast Regional": "Sunshine Coast",
}


def num(s):
    return int(s.replace(",", ""))


def rows_from_raw_text(path):
    for line in path.read_text(encoding="utf-8").splitlines():
        for name in sorted(LGA, key=len, reverse=True) + ["Total for Region"]:
            if line.startswith(name + " "):
                yield name, [num(v) for v in line[len(name):].split()]
                break


def rows_from_docx_emf(path):
    with ZipFile(path) as z:
        emf = z.read("word/media/image1.emf")
    lines, i = {}, 0
    while i + 8 <= len(emf):
        typ, size = struct.unpack_from("<II", emf, i)
        if size < 8:
            break
        if typ == 84:  # EMR_EXTTEXTOUTW
            rec = emf[i:i + size]
            x, y = struct.unpack_from("<ii", rec, 36)
            n, off = struct.unpack_from("<II", rec, 44)
            text = rec[off:off + 2 * n].decode("utf-16-le").strip()
            if text:
                lines.setdefault(y, []).append((x, text))
        i += size
    for y in sorted(lines):
        parts = [t for _, t in sorted(lines[y])]
        if parts[0] in LGA or parts[0] == "Total for Region":
            yield parts[0], [num(v) for v in parts[1:]]


def main():
    root = Path(__file__).resolve().parents[1]
    raw = root / "raw" / "tmr"
    sources = {
        2020: rows_from_raw_text(raw / "vehicles_south-east_region_qld_0620.txt"),
        2025: rows_from_docx_emf(raw / "vehicles_south-east_region_queensland_june_2025.docx"),
        2026: rows_from_docx_emf(raw / "vehicles_south-east_region_queensland_june_2026.docx"),
    }
    out = []
    for year, rows in sources.items():
        by_lga, region_total = {}, None
        for name, values in rows:
            if len(values) != len(COLS) or sum(values[:-1]) != values[-1]:
                raise ValueError(f"{year} {name}: columns do not add up: {values}")
            rec = dict(zip(COLS, values))
            if name == "Total for Region":
                region_total = rec
                continue
            acc = by_lga.setdefault(LGA[name], dict.fromkeys(COLS, 0))
            for k in COLS:
                acc[k] += rec[k]
        if len(by_lga) != 11 or region_total is None:
            raise ValueError(f"{year}: expected 11 LGAs and a region total, got {sorted(by_lga)}")
        summed = {k: sum(r[k] for r in by_lga.values()) for k in COLS}
        if summed != region_total:
            raise ValueError(f"{year}: LGA sum differs from the region total")
        for name in sorted(by_lga) + ["合計（11 個地方政府）"]:
            r = by_lga.get(name, summed)
            out.append([year, name, r["cars"], r["light_commercial"], r["cars"] + r["light_commercial"], r["total"]])
    output = root / "derived" / "vehicles_on_register_seq_2020_2025_2026.csv"
    with output.open("w", encoding="utf-8", newline="") as data:
        writer = csv.writer(data)
        writer.writerow(["june_year", "lga_name", "cars", "light_commercial", "cars_plus_light_commercial",
                         "all_vehicles"])
        writer.writerows(out)
    for r in out:
        if r[1].startswith("合計") or r[1] == "Brisbane":
            print(r)


if __name__ == "__main__":
    main()
