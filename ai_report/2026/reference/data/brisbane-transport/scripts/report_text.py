"""Copy the six-chapter Chinese body and English draft into the site data file.

Usage (from the repo root):
    python ai_report/2026/reference/data/brisbane-transport/scripts/report_text.py ZH_MD EN_MD DATA_JS

Only the "zh-TW" and "en" entries of DATA_JS are replaced; claims, funding,
sources and journeys are kept as they are. Mapping:
    "# title"            -> title
    "## 開場" / Opening   -> summary
    "## N title"         -> chapters[N-1] (number dropped; the page adds it)
    "## 附錄" / Appendix  -> not copied (the page has its own sources section)
The line between the H1 and the first "##" is the draft's own note and is skipped.
"""
import json
import re
import sys

PREFIX = 'window.BRISBANE_TRANSPORT_REPORT = '
OPENING = {'開場', 'Opening'}
APPENDIX = {'附錄', 'Appendix'}
CHAPTER = re.compile(r'^(\d+)[\s　]+(.+)$')


def parse(path):
    with open(path, encoding='utf-8') as f:
        lines = f.read().splitlines()
    title = None
    blocks = []  # [heading, lines]
    for line in lines:
        if line.startswith('# '):
            title = line[2:].strip()
        elif line.startswith('## '):
            blocks.append([line[3:].strip(), []])
        elif blocks:
            blocks[-1][1].append(line)
    if not title:
        sys.exit(f'{path}: no "# " title')

    def text(body):
        joined = '\n'.join(body).strip()
        return re.sub(r'\n{3,}', '\n\n', joined)

    summary = None
    chapters = []
    for heading, body in blocks:
        if heading in OPENING:
            summary = text(body)
        elif heading in APPENDIX:
            continue
        else:
            m = CHAPTER.match(heading)
            if not m:
                sys.exit(f'{path}: unexpected heading "## {heading}"')
            if int(m.group(1)) != len(chapters) + 1:
                sys.exit(f'{path}: chapter {m.group(1)} out of order')
            chapters.append({'title': m.group(2).strip(), 'body': text(body)})
    if summary is None:
        sys.exit(f'{path}: no opening section')
    for ch in chapters[:-1]:  # the last chapter is itself the conclusion
        if not re.search(r'\n\*\*(本章結論。|Takeaway\.)\*\*', ch['body']):
            sys.exit(f'{path}: chapter "{ch["title"]}" has no takeaway marker')
    return {'title': title, 'summary': summary, 'chapters': chapters}


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    zh_path, en_path, data_path = sys.argv[1:]
    zh = parse(zh_path)
    en = parse(en_path)
    if len(zh['chapters']) != len(en['chapters']):
        sys.exit('Chinese and English chapter counts differ')

    with open(data_path, encoding='utf-8') as f:
        raw = f.read()
    body = raw.strip()
    if not body.startswith(PREFIX) or not body.endswith(';'):
        sys.exit(f'{data_path}: unexpected wrapper')
    data = json.loads(body[len(PREFIX):-1])
    data['zh-TW'] = zh
    data['en'] = en

    out = PREFIX + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
    with open(data_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    print(f'zh-TW: {len(zh["chapters"])} chapters, en: {len(en["chapters"])} chapters -> {data_path}')


if __name__ == '__main__':
    main()
