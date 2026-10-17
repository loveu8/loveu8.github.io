"""Shared csv readers for the list-map pages (e.g. brisbane/bakery).

A page folder holds three files with the same columns on every page:
  <shops>.csv     one row per shop (店家, 分類, 優先級, 緯度 ...)
  top3.csv        per shop × category top 3 items, or per shop × 區塊 (fixed
                  blocks such as 飲品 / 餐點) when the file has a 區塊 column
  categories.csv  代碼, 中文, 英文 — category order and labels
Shops with priority C are research-only and never published.
"""
import csv
import os

# Pages list only the regions their shops use (the bakery page has no CBD shops).
REGIONS = ["CBD", "市中心周邊", "北區", "西區", "南區", "東區", "郊外"]
REGIONS_EN = {"CBD": "CBD", "市中心周邊": "Inner city", "北區": "North", "西區": "West",
              "南區": "South", "東區": "East", "郊外": "Outer area"}


def read_csv(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def read_categories(folder):
    # -> [(code, zh, en)] in file order
    return [(r["代碼"].strip(), r["中文"].strip(), r["英文"].strip())
            for r in read_csv(os.path.join(folder, "categories.csv"))]


def read_top3(folder):
    # -> ({shop id: {group: [rows sorted by 名次]}}, uses_blocks)
    # group is the 區塊 name if top3.csv has that column, else the category code.
    rows = read_csv(os.path.join(folder, "top3.csv"))
    uses_blocks = bool(rows) and "區塊" in rows[0]
    by_shop = {}
    for t in rows:
        group = t["區塊"].strip() if uses_blocks else t["分類"].strip()[:2]
        by_shop.setdefault(t["ID"], {}).setdefault(group, []).append(t)
    for groups in by_shop.values():
        for items in groups.values():
            items.sort(key=lambda t: int(t["名次"]))
    return by_shop, uses_blocks


def published_shops(shops_csv):
    return [r for r in read_csv(shops_csv) if r["優先級"] != "C"]


def category_codes(shop):
    # "08 澳式派；01 酸種麵包" -> ["08", "01"]
    return [c.strip()[:2] for c in shop["分類"].split("；") if c.strip()]
