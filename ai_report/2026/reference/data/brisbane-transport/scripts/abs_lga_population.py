"""Population of the SEQ_PLAN local government areas (without Toowoomba), from ABS
Regional population 2024-25, data cube 32180DS0004 Table 1 (ERP at 30 June).

Usage:
    python -I scripts/abs_lga_population.py raw/abs/32180DS0004_2001-25.xlsx derived/population_lga_2020-2025.csv

Reads the xlsx with the standard library only. Writes one row per LGA plus a total row:
ERP 2020 and 2025, change, percent change and average yearly growth. Also prints the
table footnotes to stderr so they can be checked against the README.
"""
import csv
import sys
import zipfile
import xml.etree.ElementTree as ET

LGAS = ["Brisbane", "Gold Coast", "Moreton Bay", "Logan", "Ipswich", "Sunshine Coast",
        "Redland", "Noosa", "Scenic Rim", "Lockyer Valley", "Somerset"]
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
T = "{%s}t" % NS["m"]


def col(ref):
    letters = "".join(ch for ch in ref if ch.isalpha())
    n = 0
    for ch in letters:
        n = n * 26 + ord(ch) - 64
    return n


def main():
    z = zipfile.ZipFile(sys.argv[1])
    ss = ["".join(t.text or "" for t in si.iter(T))
          for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS)]
    root = ET.fromstring(z.read("xl/worksheets/sheet2.xml"))  # Table 1, LGAs
    rows = []
    for row in root.find("m:sheetData", NS):
        cells = {}
        for c in row:
            v = c.find("m:v", NS)
            if v is None:
                continue
            cells[col(c.get("r"))] = ss[int(v.text)] if c.get("t") == "s" else v.text
        rows.append(cells)

    header = next(r for r in rows if r.get(3) == "2001")
    year_col = {int(v): k for k, v in header.items() if k >= 3}
    data = {}
    for r in rows:
        if r.get(2) in LGAS and r.get(1, "").startswith("3"):
            data[r[2]] = (r[1], int(r[year_col[2020]]), int(r[year_col[2025]]))
        elif len(r) == 1 and 1 in r and r[1].startswith("("):
            print("footnote:", r[1], file=sys.stderr)
    missing = [n for n in LGAS if n not in data]
    if missing:
        raise SystemExit(f"missing LGAs: {missing}")

    out = []
    for name in LGAS + ["合計（11 個地方政府）"]:
        if name in data:
            code, p20, p25 = data[name]
        else:
            code = ""
            p20 = sum(v[1] for v in data.values())
            p25 = sum(v[2] for v in data.values())
        out.append({
            "lga_code": code, "lga_name": name, "erp_2020": p20, "erp_2025": p25,
            "change": p25 - p20, "change_pct": round((p25 / p20 - 1) * 100, 1),
            "avg_yearly_pct": round(((p25 / p20) ** (1 / 5) - 1) * 100, 2),
        })
    with open(sys.argv[2], "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    for r in out:
        print(r, file=sys.stderr)


if __name__ == "__main__":
    main()
