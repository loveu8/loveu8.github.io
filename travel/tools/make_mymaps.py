"""Build a Google My Maps import csv from a list-map page's csv files (see README.md).

One row per published shop (C excluded), coloured in My Maps by 主分類.
"""
import argparse
import csv
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from list_data import category_codes, published_shops, read_categories, read_top3

HEADER = ["店名", "緯度", "經度", "主分類", "分類", "區域", "優先級", "Google評分",
          "各分類推薦（✅ 為大家推薦）", "訪前提醒", "地址", "Instagram"]


def picks(top3, labels, shop_id, groups):
    # "分類A：品項1✅、品項2｜分類B：..."; ✅ marks 大家推薦. groups are category codes, or 區塊 names.
    parts = []
    for g in groups:
        items = top3.get(shop_id, {}).get(g, [])
        if g not in labels and not items:
            continue  # a block with no reviewed items is left out, as on the page
        names = ["%s%s" % (t["品項中文"], "✅" if t["判定"] == "大家推薦" else "") for t in items]
        parts.append("%s：%s" % (labels.get(g, g), "、".join(names)))
    return "｜".join(parts)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("shops_csv", help="the page's shop list, e.g. bakery/bakery.csv")
    p.add_argument("out", help="import csv to write (put it outside the repo, e.g. Downloads)")
    args = p.parse_args()

    folder = os.path.dirname(os.path.abspath(args.shops_csv))
    labels = {c: zh for c, zh, _ in read_categories(folder)}
    top3, uses_blocks = read_top3(folder)
    shops = published_shops(args.shops_csv)
    blocks = []
    if uses_blocks:
        for groups in top3.values():
            blocks += [g for g in groups if g not in blocks]

    with open(args.out, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(HEADER)
        for r in shops:
            codes = category_codes(r)
            w.writerow([r["店家"], r["緯度"], r["經度"], labels[codes[0]], "、".join(labels[c] for c in codes),
                        r["大區域"], r["優先級"], "%s（%s 則）" % (r["Google 評分"], r["Google 評論數"]),
                        picks(top3, labels, r["ID"], blocks or codes), r["試吃備註及訪前提醒"], r["地址"], r["Instagram"]])
    print(len(shops), "shops ->", args.out)


if __name__ == "__main__":
    main()
