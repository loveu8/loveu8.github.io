"""Shared csv readers for the list-map pages (e.g. brisbane/bakery).

A page folder holds three files with the same columns on every page:
  <shops>.csv     one row per shop (店家, 分類, 優先級, 緯度 ...)
  top3.csv        per shop × category top 3 items
  categories.csv  代碼, 中文, 英文 — category order and labels
Shops with priority C are research-only and never published.
"""
import csv
import os

REGIONS = ["市中心周邊", "北區", "西區", "南區", "東區", "郊外"]
REGIONS_EN = {"市中心周邊": "Inner city", "北區": "North", "西區": "West", "南區": "South",
              "東區": "East", "郊外": "Outer area"}


def read_csv(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def read_categories(folder):
    # -> [(code, zh, en)] in file order
    return [(r["代碼"].strip(), r["中文"].strip(), r["英文"].strip())
            for r in read_csv(os.path.join(folder, "categories.csv"))]


def read_top3(folder):
    # -> {shop id: {category code: [rows sorted by 名次]}}
    by_shop = {}
    for t in read_csv(os.path.join(folder, "top3.csv")):
        by_shop.setdefault(t["ID"], {}).setdefault(t["分類"].strip()[:2], []).append(t)
    for cats in by_shop.values():
        for items in cats.values():
            items.sort(key=lambda t: int(t["名次"]))
    return by_shop


def published_shops(shops_csv):
    return [r for r in read_csv(shops_csv) if r["優先級"] != "C"]


def category_codes(shop):
    # "08 澳式派；01 酸種麵包" -> ["08", "01"]
    return [c.strip()[:2] for c in shop["分類"].split("；") if c.strip()]
