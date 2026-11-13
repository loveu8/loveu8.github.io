"""Greater Brisbane (3GBRI) membership from ABS ASGS Edition 4 allocation files.

Usage: python -P scripts/gbri_lga_overlap.py raw/abs
Needs SA2_2026_AUST.xlsx, MB_2026_AUST.xlsx and LGA_2026_AUST.xlsx (source S-031).
Prints the SA4s in 3GBRI, then for each Queensland LGA the share of its area
(sum of mesh block AREA_ALBERS_SQKM) that falls inside 3GBRI, and the 3GBRI SA2s
of LGAs that are only partly inside.
"""
import collections
import sys

import openpyxl

GBRI = "3GBRI"


def rows(folder, name):
    wb = openpyxl.load_workbook(f"{folder}/{name}", read_only=True)
    it = wb.worksheets[0].iter_rows(values_only=True)
    header = [str(h) for h in next(it)]
    for r in it:
        yield dict(zip(header, r))


def main(folder):
    sa4 = {}
    for r in rows(folder, "SA2_2026_AUST.xlsx"):
        if r["GCCSA_CODE_2026"] == GBRI:
            sa4[r["SA4_CODE_2026"]] = r["SA4_NAME_2026"]
    print("SA4 in 3GBRI:")
    for code, name in sorted(sa4.items()):
        print(f"  {code} {name}")

    mesh = {}
    for r in rows(folder, "MB_2026_AUST.xlsx"):
        if r["STATE_CODE_2026"] == "3":
            mesh[r["MB_CODE_2026"]] = (r["GCCSA_CODE_2026"], float(r["AREA_ALBERS_SQKM"] or 0), r["SA2_NAME_2026"])

    area = collections.defaultdict(lambda: collections.defaultdict(float))
    sa2 = collections.defaultdict(set)
    for r in rows(folder, "LGA_2026_AUST.xlsx"):
        m = mesh.get(r["MB_CODE_2026"])
        if not m:
            continue
        area[r["LGA_NAME_2026"]][m[0]] += m[1]
        if m[0] == GBRI:
            sa2[r["LGA_NAME_2026"]].add(m[2])

    print("LGA area inside 3GBRI:")
    for lga, g in sorted(area.items()):
        inside, total = g.get(GBRI, 0.0), sum(g.values())
        if inside > 0:
            share = 100 * inside / total
            extra = "" if share > 99.9 else f"  SA2: {', '.join(sorted(sa2[lga]))}"
            print(f"  {lga}: {inside:.0f} / {total:.0f} km2 ({share:.1f}%){extra}")


if __name__ == "__main__":
    main(sys.argv[1])
