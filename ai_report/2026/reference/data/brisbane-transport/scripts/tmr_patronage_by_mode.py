"""SEQ patronage by mode, 2019-20 to 2025-26, from TMR annual report service-standard tables.

Inputs: text extracted with `pdftotext -raw` from the annual report PDFs in
raw/tmr/annual-reports/ (tmr_annual_report_YYYY-YY.txt).

Each report has a multi-year table "Patronage on government contracted services
(millions)": four prior actuals, the current target/estimate, the current actual.
Columns, read from each table header:
- 2023-24 report, Table 20: 2019-20..2022-23 actual, 2023-24 target, 2023-24 actual
- 2024-25 report: 2020-21..2023-24 actual, 2024-25 target, 2024-25 actual
- 2025-26 report, Table 29: 2021-22..2024-25 actual, 2025-26 target, 2025-26 actual

Every actual is taken from the latest report that lists it; the script stops if
any two reports disagree on the same year and mode, or if a total does not equal
the sum of the four modes (to 0.02 rounding).

Usage: python tmr_patronage_by_mode.py OUT.csv
"""
import csv, re, sys
from pathlib import Path

RAW = Path(__file__).resolve().parent.parent / "raw" / "tmr" / "annual-reports"
MODES = ["Bus", "Rail", "Tram", "Ferry", "Total"]
REPORTS = {  # report year -> actual-year labels of the six columns (None = target)
    "2023-24": ["2019-20", "2020-21", "2021-22", "2022-23", None, "2023-24"],
    "2024-25": ["2020-21", "2021-22", "2022-23", "2023-24", None, "2024-25"],
    "2025-26": ["2021-22", "2022-23", "2023-24", "2024-25", None, "2025-26"],
}
ROW = re.compile(r"South East Queensland--(Bus|Rail|Tram|Ferry|Total)\d?\s*$")
NUMS = re.compile(r"^((?:\d+\.\d\d\s+){5}\d+\.\d\d)(?:\s+\d)?\s*$")


def read_report(year):
    lines = (RAW / f"tmr_annual_report_{year}.txt").read_text(encoding="utf-8", errors="replace").splitlines()
    found = {}
    for i, line in enumerate(lines[:-1]):
        m = ROW.search(line)
        n = NUMS.match(lines[i + 1].strip())
        if m and n and m.group(1) not in found:
            found[m.group(1)] = [float(x) for x in n.group(1).split()]
    missing = [m for m in MODES if m not in found]
    if missing:
        sys.exit(f"{year} report: multi-year rows not found for {missing}")
    return found


def main():
    out = sys.argv[1]
    values = {}  # (fy, mode) -> (value, report)
    for rep, cols in REPORTS.items():
        rows = read_report(rep)
        for mode in MODES:
            for fy, v in zip(cols, rows[mode]):
                if fy is None:
                    continue
                old = values.get((fy, mode))
                if old and abs(old[0] - v) > 0.005:
                    sys.exit(f"{fy} {mode}: {old[1]} report {old[0]} vs {rep} report {v}")
                values[(fy, mode)] = (v, rep)  # later report wins (same value)
    years = sorted({fy for fy, _ in values})
    for fy in years:
        s = sum(values[(fy, m)][0] for m in MODES[:4])
        if abs(s - values[(fy, "Total")][0]) > 0.02:
            sys.exit(f"{fy}: modes sum {s:.2f} != total {values[(fy, 'Total')][0]}")
    with open(out, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["financial_year", "bus_m", "rail_m", "tram_m", "ferry_m", "total_m", "source_report"])
        for fy in years:
            w.writerow([fy] + [f"{values[(fy, m)][0]:.2f}" for m in MODES]
                       + [f"TMR Annual Report {values[(fy, 'Total')][1]}"])


if __name__ == "__main__":
    main()
