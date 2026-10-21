"""Build a list-map page's data.js from its csv files (see README.md).

data.js is a plain <script> (var PAGE_DATA = {...}) so the page also works from
file:// — browsers block fetch() of local JSON there (AGENTS.md). It is read by
scripts/map-list.js together with the page's hand-written page.js.
"""
import argparse
import json
import os
import re
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from list_data import (REGIONS, REGIONS_EN, category_codes, published_shops,
                       read_categories, read_top3)


# data.js key -> csv column; added only when the csv has the column.
OPTIONAL_COLUMNS = [("style", "風格標籤"), ("beans", "咖啡豆"), ("crossMark", "跨頁標記")]


def num_or_none(value, kind=float):
    value = value.strip()
    return kind(value) if value else None


def parse_tasting(spec):
    # "look=外觀 1-5;texture=口感 1-5" -> [("look", "外觀 1-5"), ("texture", "口感 1-5")]
    pairs = []
    for part in filter(None, (p.strip() for p in spec.split(";"))):
        key, column = part.split("=", 1)
        pairs.append((key.strip(), column.strip()))
    return pairs


def top3_item(t):
    return {
        "rank": int(t["名次"]),
        "zh": t["品項中文"],
        "en": t["品項英文"],
        "flavor": t["口味說明"] if t["口味說明"] not in ("", "—") else "",
        "flavorEn": t["口味說明（英）"],
        "count": int(t["評論提及數"]) if t["評論提及數"].strip() else None,
        "rating": float(t["提及評論平均星等"]) if t["提及評論平均星等"].strip() else None,
        "verdict": t["判定"],
        "confidence": t["信心度"],
        "note": t["備註"],
    }


def tasting(r, score_columns):
    # The cost column is named after its currency (花費 AUD), so find it by prefix.
    cost_column = next((c for c in r if re.match(r"^花費", c)), None)
    out = {"date": r["試吃日期"], "cost": r[cost_column] if cost_column else ""}
    for key, column in score_columns:
        out[key] = r[column]
    out["average"] = r["平均分數"]
    return out


def shop_entry(r, top3, uses_blocks, score_columns):
    query = urllib.parse.quote(r["店家"] + " " + r["地址"])
    top3_key = "top3ByBlock" if uses_blocks else "top3ByCategory"
    entry = {
        "id": r["ID"],
        "name": r["店家"],
        "suburb": r["區域"],
        "region": r["大區域"],
        "categories": category_codes(r),
        "priority": r["優先級"],
        "status": r["進度"],
        "target": r["目標品項"],
        top3_key: {group: [top3_item(t) for t in items] for group, items in top3.get(r["ID"], {}).items()},
        "rating": num_or_none(r["Google 評分"]),
        "reviews": num_or_none(r["Google 評論數"], int),
        "note": r["試吃備註及訪前提醒"],
        "noteEn": r["訪前提醒（英）"],
        "address": r["地址"],
        "lat": float(r["緯度"]),
        "lng": float(r["經度"]),
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=" + query,
        "instagram": r["Instagram"],
        "source": r["查核來源網址"],
        "photos": [p.strip() for p in r["照片"].split("；") if p.strip()],
        "tasting": tasting(r, score_columns),
    }
    # Optional columns (the cafe csv has them, the bakery csv does not).
    for key, column in OPTIONAL_COLUMNS:
        if column in r:
            entry[key] = r[column].strip()
    return entry


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("shops_csv", help="the page's shop list, e.g. bakery/bakery.csv")
    p.add_argument("--out", help="default: data.js next to the csv")
    p.add_argument("--data-as-of", required=True, help="shown on the page, e.g. 2026-10")
    p.add_argument("--mymaps-url", default="", help="Google My Maps embed URL for the overview map")
    p.add_argument("--tasting", required=True,
                   help='tasting score columns as key=csv column, ";"-separated, e.g. "look=外觀 1-5;texture=口感 1-5"')
    args = p.parse_args()

    folder = os.path.dirname(os.path.abspath(args.shops_csv))
    out = args.out or os.path.join(folder, "data.js")
    top3, uses_blocks = read_top3(folder)
    score_columns = parse_tasting(args.tasting)

    shops = [shop_entry(r, top3, uses_blocks, score_columns) for r in published_shops(args.shops_csv)]
    order = {"A": 0, "B": 1}
    shops.sort(key=lambda s: (order[s["priority"]], -(s["reviews"] or 0)))

    # Page title and other page text live in the page's page.js, not here.
    data = {
        "dataAsOf": args.data_as_of,
        "myMapsEmbedUrl": args.mymaps_url,
        "categories": [{"code": c, "label": zh, "labelEn": en} for c, zh, en in read_categories(folder)],
        "regions": [g for g in REGIONS if any(s["region"] == g for s in shops)],
        "regionsEn": {g: REGIONS_EN[g] for g in REGIONS if any(s["region"] == g for s in shops)},
        "shops": shops,
    }

    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write("// 由 %s 產生，請勿手改；csv 更新後重新產生。C 級店不收錄。\n" % os.path.basename(args.shops_csv))
        f.write("var PAGE_DATA = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(len(shops), "shops ->", out)
    unknown = sorted({s["region"] for s in shops} - set(REGIONS))
    if unknown:
        print("UNKNOWN region (add it to list_data.REGIONS):", unknown)
    for s in shops:
        # Block pages may leave out a block (e.g. no drinks reviewed); category pages need every category.
        if uses_blocks:
            missing = [] if s["top3ByBlock"] else ["any block"]
        else:
            missing = [c for c in s["categories"] if c not in s["top3ByCategory"]]
        if missing:
            print("MISSING top3:", s["id"], s["name"], missing)


if __name__ == "__main__":
    main()
