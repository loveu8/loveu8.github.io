"""Share of "Limited space available" by train line, weekday morning peak inbound (Q120).

Usage (from the repo root):
    python ai_report/2026/reference/data/brisbane-transport/scripts/capacity_peak_by_line.py RAW_CSV OUT_CSV

RAW_CSV  Translink Service Capacity Tracker, train/ferry/tram file (data.qld.gov.au,
         resource a0a83f8c-..., last modified 2025-06-06; source S-179)
OUT_CSV  derived/capacity_am_peak_by_line_2025-06.csv

The raw file has one row per route x direction x day type x stop x quarter hour,
with one of three levels: Space available / Some space available / Limited space
available. Every stop has all 73 quarter hours (5:00 AM to 11:00 PM), with no
separate label for quarter hours without a service, so the shares count those
cells too and may understate crowding.

Window: Monday to Friday, Inbound, quarter hours starting 7:00 to 8:45 AM.
Only the 12 train lines are kept (G:link and the Southern Moreton Bay Island
ferry have no Inbound direction). Unit: stop x quarter hour cells, not services
or passengers.
"""
import csv
import sys
from collections import Counter, defaultdict

WEEKDAYS = {'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'}
LIMITED, SOME, SPACE = 'Limited space available', 'Some space available', 'Space available'
START, END = 7 * 60, 9 * 60


def minutes(label):
    clock, ampm = label.split()
    h, m = (int(x) for x in clock.split(':'))
    return (h % 12 + (12 if ampm == 'PM' else 0)) * 60 + m


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    raw, out = sys.argv[1:]
    counts = defaultdict(Counter)
    with open(raw, encoding='utf-8-sig', newline='') as f:
        for r in csv.DictReader(f):
            if r['availability'] not in (LIMITED, SOME, SPACE):
                sys.exit(f'unexpected level: {r["availability"]}')
            if r['day_type'] in WEEKDAYS and r['direction'] == 'Inbound' \
                    and START <= minutes(r['stop_quarter_hour']) < END:
                counts[r['route']][r['availability']] += 1
                counts['All train lines'][r['availability']] += 1
    lines = [k for k in counts if k != 'All train lines']
    if len(lines) != 12:
        sys.exit(f'expected 12 train lines, got {len(lines)}: {sorted(lines)}')

    def share(c, level):
        return round(100 * c[level] / sum(c.values()), 1)

    lines.sort(key=lambda k: (-share(counts[k], LIMITED), k))
    with open(out, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f)
        w.writerow(['line', 'cells', 'limited_pct', 'some_pct', 'space_pct'])
        for k in lines + ['All train lines']:
            c = counts[k]
            w.writerow([k, sum(c.values()), share(c, LIMITED), share(c, SOME), share(c, SPACE)])
    print(f'{len(lines)} lines -> {out}; all lines limited {share(counts["All train lines"], LIMITED)}%')


if __name__ == '__main__':
    main()
