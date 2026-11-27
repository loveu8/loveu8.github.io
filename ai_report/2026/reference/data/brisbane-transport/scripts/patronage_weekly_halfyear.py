"""Average weekly passenger trips per half year, SEQ network (Q123).

Usage (from the repo root):
    python ai_report/2026/reference/data/brisbane-transport/scripts/patronage_weekly_halfyear.py RAW_CSV OUT_CSV

RAW_CSV  Translink "Patronage and complaints" weekly file (data.qld.gov.au,
         Translink monthly performance data; source S-172)
OUT_CSV  derived/patronage_weekly_halfyear_2018-2026.csv

Each week is assigned to the half year of its week-ending date (a Sunday).
Half years: H1 = January to June, H2 = July to December. Rows run from 2018 H1;
a half year has 25 to 27 Sundays, and one with fewer than 25 weeks is written
but marked complete=0 (2026 H1
lacks the weeks ending after 2026-01-25 and before 2026-04-05; 2026 H2 has data
only to August). The page charts complete half years only.

Also prints the year-on-year comparisons quoted in chapter 3:
  weeks ending 2025-02-16 to 2025-06-29 vs 2024-02-18 to 2024-06-30
  (checks the official +15.3% for 10 Feb to 30 Jun 2025, S-089), and
  weeks ending 2026-04-12 to 2026-08-30 vs 2025-04-13 to 2025-08-31.
"""
import csv
import sys
from collections import defaultdict
from datetime import date, datetime


def read(raw):
    rows = []
    with open(raw, encoding='utf-8-sig', newline='') as f:
        r = csv.reader(f)
        next(r)
        for line in r:
            if line and line[0].strip():
                d = datetime.strptime(line[0].strip(), '%a, %d %b %Y %I:%M %p').date()
                rows.append((d, float(line[1].replace(',', ''))))
    return sorted(rows)


def change(rows, a1, b1, a0, b0):
    new = [v for d, v in rows if a1 <= d <= b1]
    old = [v for d, v in rows if a0 <= d <= b0]
    if len(new) != len(old):
        sys.exit(f'week counts differ: {len(new)} vs {len(old)}')
    return sum(new), sum(old), sum(new) / sum(old) - 1


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    raw, out = sys.argv[1:]
    rows = read(raw)
    halves = defaultdict(list)
    for d, v in rows:
        if d.year >= 2018:
            halves[(d.year, 1 if d.month <= 6 else 2)].append(v)
    with open(out, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f)
        w.writerow(['period', 'weeks', 'avg_weekly_trips', 'complete'])
        for (y, h) in sorted(halves):
            v = halves[(y, h)]
            w.writerow([f'{y}H{h}', len(v), round(sum(v) / len(v)), int(len(v) >= 25)])
    t1, t0, c = change(rows, date(2025, 2, 16), date(2025, 6, 29), date(2024, 2, 18), date(2024, 6, 30))
    print(f'2025-02/06 vs 2024: {t1:,.0f} vs {t0:,.0f} ({c:+.1%})')
    t1, t0, c = change(rows, date(2026, 4, 12), date(2026, 8, 30), date(2025, 4, 13), date(2025, 8, 31))
    print(f'2026-04/08 vs 2025: {t1:,.0f} vs {t0:,.0f} ({c:+.1%})')
    print(f'{len(halves)} half years -> {out}')


if __name__ == '__main__':
    main()
