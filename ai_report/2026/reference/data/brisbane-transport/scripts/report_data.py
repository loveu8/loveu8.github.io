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
Any cited ID missing from its CSV stops the script without writing.
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

    data['claims'] = claims
    data['funding'] = funding
    data['sources'] = sources
    out = PREFIX + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
    with open(data_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    print(f'claims {len(claims)}, funding {len(funding)}, sources {len(sources)} -> {data_path}')


if __name__ == '__main__':
    main()
