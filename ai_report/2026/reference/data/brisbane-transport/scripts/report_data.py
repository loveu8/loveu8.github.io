"""Rebuild the claims / sources / funding entries of the site data file from the CSVs.

Usage (from the repo root, after report_text.py):
    python ai_report/2026/reference/data/brisbane-transport/scripts/report_data.py DATA_DIR DATA_JS PAGE_JS

DATA_DIR  folder holding claims.csv, sources.csv, funding.csv
DATA_JS   ai_report/2026/brisbane-transport-report.data.js (zh-TW / en / journeys kept)
PAGE_JS   scripts/report-brisbane.js (scanned for the IDs its figures use)

What goes in (only what the page actually uses):
  claims   every C-id cited in the zh-TW / en text or in PAGE_JS ("C-15 至 C-19" /
           "C-15 to C-19" ranges expanded), with source_ids from claims.csv
  funding  every funding row whose 4-digit ID ('0003' for F-0003) appears quoted in PAGE_JS
  sources  sources of those claims and funding rows, plus S-ids named in PAGE_JS
  figures  N6 mode cards, N7 trips by mode, N8 bus routes per LGA (chapter 1, Q112–Q116),
           N1 population growth, N2 2016 travel to work, N3 Eight Mile Plains hourly
           services, N5 total trips a year (Q99; replaced by N7 in Q116, back
           before N4 in Q124), N4 public transport trips per person (Q97, Q98),
           N9 crowded train lines in the weekday morning peak (Q120), N10
           average weekly trips per half year (Q123), N11 inbound trains per hour
           by line and time of day (Q127), read from
           DATA_DIR/derived (Q86) and checked against the figures in
           stage-4-figures-six-chapter.md
Any cited ID missing from its CSV, or a figure number that no longer matches,
stops the script without writing. The unused "journeys" entry is removed (Q58).
"""
import csv
import json
import re
import sys

PREFIX = 'window.BRISBANE_TRANSPORT_REPORT = '
RANGE = re.compile(r'C-(\d+)\s*(?:至|to)\s*C-(\d+)')
CLAIM = re.compile(r'C-\d{2}')


def read_csv(path, key):
    with open(path, encoding='utf-8-sig', newline='') as f:
        return {row[key]: row for row in csv.DictReader(f)}


def claim_ids(text):
    found = set(CLAIM.findall(text))
    for a, b in RANGE.findall(text):
        found.update(f'C-{n:02d}' for n in range(int(a), int(b) + 1))
    return found


def by_number(ids):
    return sorted(ids, key=lambda x: int(x.split('-')[1]))


def read_rows(path):
    with open(path, encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def expect(name, got, want):
    if got != want:
        sys.exit(f'{name}: got {got}, stage-4-figures-six-chapter.md has {want}')


def figures(data_dir):
    derived = f'{data_dir}/derived'
    total_name = '合計（11 個地方政府）'

    rows = read_rows(f'{derived}/population_lga_2020-2025.csv')
    lgas = [r for r in rows if r['lga_name'] != total_name]
    total = next(r for r in rows if r['lga_name'] == total_name)
    lgas.sort(key=lambda r: float(r['change_pct']), reverse=True)
    n1 = [{'name': r['lga_name'], 'pct': float(r['change_pct']), 'change': int(r['change'])}
          for r in lgas]
    n1.append({'name': 'total', 'pct': float(total['change_pct']), 'change': int(total['change'])})
    expect('N1 rows', len(n1), 12)
    expect('N1 first', (n1[0]['name'], n1[0]['pct'], n1[0]['change']), ('Ipswich', 18.3, 41494))
    expect('N1 total', (n1[-1]['pct'], n1[-1]['change']), (11.2, 402568))

    rows = [r for r in read_rows(f'{derived}/travel_to_work_lga_2016_2021.csv') if r['census_year'] == '2016']
    n2 = []
    for key, name in (('total', total_name), ('brisbane', 'Brisbane')):
        r = next(x for x in rows if x['lga_name'] == name)
        car, pt = float(r['car_pct_of_travelled']), float(r['pt_pct_of_travelled'])
        n2.append({'name': key, 'travelled': int(r['travelled']),
                   'car': car, 'pt': pt, 'other': round(100 - car - pt, 1)})
    expect('N2 total', tuple(n2[0][k] for k in ('travelled', 'car', 'pt', 'other')), (1267836, 80.7, 10.8, 8.5))
    expect('N2 Brisbane', tuple(n2[1][k] for k in ('travelled', 'car', 'pt', 'other')), (485868, 70.9, 18.5, 10.6))

    rows = read_rows(f'{derived}/emp_hourly_2025_2026.csv')
    hours = list(range(4, 24))

    def series(date, route):
        counts = {int(r['hour']): int(r['departures']) for r in rows if r['date'] == date and r['route'] == route}
        return [counts.get(h, 0) for h in hours]
    n3 = {'hours': hours, 'old': series('20250514', '111'), 'm1': series('20261021', 'M1')}
    expect('N3 old 111 day total', sum(n3['old']), 99)
    expect('N3 M1 day total', sum(n3['m1']), 182)
    expect('N3 07-08 h', (n3['old'][3:5], n3['m1'][3:5]), ([12, 12], [12, 12]))

    rows = read_rows(f'{derived}/patronage_population_2015-16_2025-26.csv')
    n5 = {'years': [r['financial_year'].replace('-', '–') for r in rows],
          'millions': [round(int(r['trips']) / 1e6) for r in rows]}
    expect('N5 trips (million)', [n5['millions'][i] for i in (0, 3, 6, 9, 10)], [180, 190, 113, 193, 214])
    # Same years as N5 so the two charts line up (Q125); 2025-26 has no population yet -> null.
    n4 = {'years': n5['years'],
          'perPerson': [float(r['trips_per_person']) if r['trips_per_person'] else None for r in rows]}
    expect('N4 years', (n4['years'][0], n4['years'][-1]), ('2015–16', '2025–26'))
    expect('N4 trips per person', [n4['perPerson'][i] for i in (0, 3, 6, 9, 10)], [54.6, 54.2, 30.7, 48.7, None])

    # N7, chapter 1 (Q107, Q116): trips a year by mode, 2018-19 to 2025-26, millions.
    rows = read_rows(f'{derived}/patronage_by_mode_2018-19_2025-26.csv')
    modes = ['bus', 'rail', 'tram', 'ferry']
    n7 = {'years': [r['financial_year'].replace('-', '–') for r in rows]}
    for m in modes + ['total']:
        n7[m] = [float(r[f'{m}_m']) for r in rows]
    expect('N7 years', (n7['years'][0], n7['years'][-1], len(n7['years'])), ('2018–19', '2025–26', 8))
    expect('N7 totals', [n7['total'][i] for i in (0, 1, 3, 7)], [189.72, 152.59, 113.42, 214.36])

    # N6, chapter 1 (Q112–Q114): one card per mode, 2025-26 against 2018-19.
    first, last = 0, len(n7['years']) - 1
    routes = read_rows(f'{derived}/routes_by_mode_2020-2026.csv')[-1]  # 2026-10 capture
    expect('N6 route capture', routes['sample_date'], '2026-10-14')
    n6 = {'total': n7['total'][last], 'totalGrowth': round((n7['total'][last] / n7['total'][first] - 1) * 100),
          'modes': []}
    size = {'bus': {'routes': int(routes['bus_routes'])},
            'rail': {'lines': 12, 'stations': 153},  # S-176 line list, S-175 stations (C-35)
            'tram': {'routes': int(routes['tram_routes'])},
            'ferry': {'routes': int(routes['ferry_routes'])}}
    for m in modes:
        n6['modes'].append(dict(key=m, trips=n7[m][last],
                                share=round(n7[m][last] / n7['total'][last] * 100),
                                growth=round((n7[m][last] / n7[m][first] - 1) * 100), **size[m]))
    expect('N6 total', (n6['total'], n6['totalGrowth']), (214.36, 13))
    expect('N6 cards', [(c['key'], c['share'], c['growth']) for c in n6['modes']],
           [('bus', 62, 14), ('rail', 26, 3), ('tram', 7, 42), ('ferry', 4, 32)])
    expect('N6 sizes', [n6['modes'][0]['routes'], n6['modes'][2]['routes'], n6['modes'][3]['routes']], [435, 1, 9])

    # N8, chapter 1 (Q106, Q108): bus routes per LGA, April 2020 and October 2026, with
    # population growth 2020-2025; largest population first, total last.
    rows = read_rows(f'{derived}/bus_routes_lga_2020-2026.csv')
    first_cap, last_cap = rows[0]['capture'], rows[-1]['capture']
    count = {(r['capture'], r['lga']): int(r['bus_routes']) for r in rows}
    if any(count[(c, 'outside 11 LGAs')] for c in (first_cap, last_cap)):
        sys.exit('N8: routes outside the 11 LGAs')
    pop = {r['lga_name']: r for r in read_rows(f'{derived}/population_lga_2020-2025.csv')}
    names = sorted((n for n in pop if n != total_name), key=lambda n: -int(pop[n]['erp_2025']))
    n8 = [{'name': n, 'routes2020': count[(first_cap, n)], 'routes2026': count[(last_cap, n)],
           'popPct': float(pop[n]['change_pct'])} for n in names]
    n8.append({'name': 'total', 'routes2020': sum(r['routes2020'] for r in n8),
               'routes2026': sum(r['routes2026'] for r in n8), 'popPct': float(pop[total_name]['change_pct'])})
    expect('N8 dates', (rows[0]['sample_date'], rows[-1]['sample_date']), ('2020-04-01', '2026-10-14'))
    expect('N8 first', tuple(n8[0][k] for k in ('name', 'routes2020', 'routes2026')), ('Brisbane', 227, 217))
    expect('N8 total', (n8[-1]['routes2020'], n8[-1]['routes2026'], n8[-1]['popPct']), (431, 435, 11.2))

    # N9, chapter 2 (Q120): share of "limited space" cells by train line, weekday 7-9 am inbound.
    rows = read_rows(f'{derived}/capacity_am_peak_by_line_2025-06.csv')
    n9 = [{'line': r['line'], 'limited': float(r['limited_pct']), 'cells': int(r['cells'])} for r in rows]
    expect('N9 rows', len(n9), 13)
    expect('N9 first', (n9[0]['line'], n9[0]['limited']), ('Springfield Line', 46.0))
    expect('N9 all lines', (n9[-1]['line'], n9[-1]['limited'], n9[-1]['cells']), ('All train lines', 18.7, 8800))

    # N10, chapter 3 (Q123): average weekly trips per complete half year, whole SEQ network.
    rows = read_rows(f'{derived}/patronage_weekly_halfyear_2018-2026.csv')
    n10 = [{'period': r['period'], 'trips': int(r['avg_weekly_trips'])} for r in rows if r['complete'] == '1']
    expect('N10 range', (len(n10), n10[0]['period'], n10[-1]['period']), (16, '2018H1', '2025H2'))
    expect('N10 points', tuple(r['trips'] for r in n10 if r['period'] in ('2019H2', '2024H1', '2024H2', '2025H2')),
           (3670573, 3236068, 3681185, 4040791))

    # N11, chapter 2 (Q127): inbound trains per hour by line, weekday peak / off-peak / evening and
    # Saturday, at each line's own measuring station; ordered by weekday peak, busiest first.
    hours = {'07:00-09:00': 2, '10:00-15:00': 5, '19:00-22:00': 3}
    bands = [('平日', '07:00-09:00', 'peak'), ('平日', '10:00-15:00', 'day'),
             ('平日', '19:00-22:00', 'evening'), ('週六', '10:00-15:00', 'saturday')]
    rows = [r for r in read_rows(f'{derived}/headways_2026-10.csv') if r['mode'] == '火車' and r['direction'] == '往市區']
    n11 = []
    for line in dict.fromkeys(r['line'] for r in rows):
        got = {(r['day'], r['band']): r for r in rows if r['line'] == line}
        item = {'line': line, 'station': got[bands[0][:2]]['point'].removesuffix(' station')}
        for day, band, key in bands:
            item[key] = round(int(got[(day, band)]['departures']) / hours[band], 1)
        n11.append(item)
    n11.sort(key=lambda r: -r['peak'])  # stable: lines with the same peak keep the CSV order
    expect('N11 dates', sorted({r['date'] for r in rows}), ['20261021', '20261024'])
    expect('N11 rows', len(n11), 12)
    expect('N11 Cleveland', tuple(n11[0][k] for k in ('line', 'peak', 'day', 'evening', 'saturday')),
           ('Cleveland', 6.0, 4.0, 3.0, 2.0))
    expect('N11 sparse', [(r['line'], r['day'], r['saturday']) for r in n11 if r['line'] in ('Doomben', 'Sunshine Coast')],
           [('Doomben', 2.0, 1.0), ('Sunshine Coast', 0.6, 0.6)])
    expect('N11 two an hour', (sum(r['day'] == 2 for r in n11), sum(r['saturday'] == 2 for r in n11)), (9, 10))
    return {'n1': n1, 'n2': n2, 'n3': n3, 'n4': n4, 'n5': n5, 'n6': n6, 'n7': n7, 'n8': n8, 'n9': n9, 'n10': n10,
            'n11': n11}


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    data_dir, data_path, page_path = sys.argv[1:]
    claims_csv = read_csv(f'{data_dir}/claims.csv', 'claim_id')
    sources_csv = read_csv(f'{data_dir}/sources.csv', 'source_id')
    funding_csv = read_csv(f'{data_dir}/funding.csv', 'funding_id')
    with open(data_path, encoding='utf-8') as f:
        body = f.read().strip()
    if not body.startswith(PREFIX) or not body.endswith(';'):
        sys.exit(f'{data_path}: unexpected wrapper')
    data = json.loads(body[len(PREFIX):-1])
    with open(page_path, encoding='utf-8') as f:
        page = f.read()

    text = json.dumps([data['zh-TW'], data['en']], ensure_ascii=False)
    cited = claim_ids(text) | claim_ids(page)
    missing = [c for c in cited if c not in claims_csv]
    if missing:
        sys.exit(f'claims not in claims.csv: {by_number(missing)}')
    claims = {}
    for cid in by_number(cited):
        ids = [s for s in claims_csv[cid]['source_ids'].split('|') if s]
        if not ids:
            sys.exit(f'{cid} has no source_ids')
        claims[cid] = ids

    funding = {}
    for fid in sorted(set(re.findall(r"'(\d{4})'", page))):
        row = funding_csv.get('F-' + fid)
        if row:
            funding[fid] = {k: row[k] for k in ('amount', 'source_id', 'period_start', 'period_end')}

    wanted = {s for ids in claims.values() for s in ids}
    wanted |= {f['source_id'] for f in funding.values()}
    wanted |= set(re.findall(r'S-\d{3}', page))
    missing = [s for s in wanted if s not in sources_csv]
    if missing:
        sys.exit(f'sources not in sources.csv: {by_number(missing)}')
    sources = {s: {'title': sources_csv[s]['title'], 'url': sources_csv[s]['url']} for s in by_number(wanted)}

    figs = figures(data_dir)
    data['claims'] = claims
    data['funding'] = funding
    data['sources'] = sources
    data['figures'] = figs
    data.pop('journeys', None)
    out = PREFIX + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
    with open(data_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    print(f'claims {len(claims)}, funding {len(funding)}, sources {len(sources)}, figures {len(figs)} -> {data_path}')


if __name__ == '__main__':
    main()
