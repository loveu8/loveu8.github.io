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
  figures  N1 population growth, N2 2016 travel to work, N3 Eight Mile Plains hourly
           services, N4 public transport trips per person (Q97, Q98), read from
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
    rows = [r for r in rows if r['trips_per_person']]  # 2025-26 has no population yet
    n4 = {'years': [r['financial_year'].replace('-', '–') for r in rows],
          'perPerson': [float(r['trips_per_person']) for r in rows]}
    expect('N4 years', (n4['years'][0], n4['years'][-1]), ('2015–16', '2024–25'))
    expect('N4 trips per person', [n4['perPerson'][i] for i in (0, 3, 6, 9)], [54.6, 54.2, 30.7, 48.7])
    return {'n1': n1, 'n2': n2, 'n3': n3, 'n4': n4}


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
