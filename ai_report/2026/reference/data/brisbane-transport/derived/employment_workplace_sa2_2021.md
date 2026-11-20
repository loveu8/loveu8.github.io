# 2021 年大布里斯本就業分布

以 ABS 定義的大布里斯本統計區（2021 年 GCCSA，代碼 `3GBRI`）為範圍，按主要工作的地址統計 246 個 SA2 的就業人數。完整排名見 [CSV](employment_workplace_sa2_2021.csv)。

本表用於通勤目的地與活動中心分析。近期居民就業趨勢採用 ABS Regional Labour Force（S-064），其地理口徑為居住地。

| 排名 | SA2 | 就業人數 |
|---:|---|---:|
| 1 | Brisbane City | 146,393 |
| 2 | South Brisbane | 32,771 |
| 3 | Fortitude Valley | 27,914 |
| 4 | Rocklea - Acacia Ridge | 26,668 |
| 5 | Newstead - Bowen Hills | 24,748 |
| 6 | Brisbane Airport | 21,187 |

## 與區域計畫對照

[ShapingSEQ 2023 表 7（第 93 頁）](https://www.planning.qld.gov.au/__data/assets/pdf_file/0024/86145/shapingseq-2023-Low.pdf) 把 Brisbane CBD 與周邊列為首府中心。計畫也把 Chermside、Upper Mount Gravatt、Indooroopilly 和 Carindale 列為主要區域活動中心。這四個同名 SA2 分別有 16,353、10,878、8,247 和 5,431 名就業者。這是用同名統計區做的初步對照，中心範圍可能跨越統計區邊界。

Rocklea - Acacia Ridge 和 Brisbane Airport 也排在前六，後續挑選通勤案例時，可與區域活動中心一起納入考量。

## 資料與重現

- [ABS 昆士蘭州 Working Population Profile 資料包](https://www.abs.gov.au/census/find-census-data/datapacks/download/2021_WPP_SA2_for_QLD_short-header.zip) 提供 W01B 表。取 `P_Tot_Tot`（所有年齡、性別和工作時數類別的就業人數總計）。
- [ABS 2021 SA2 地理服務](https://geo.abs.gov.au/arcgis/rest/services/ASGS2021/SA2/FeatureServer/0) 提供大布里斯本的 SA2 名單。以 `gccsa_code_2021='3GBRI'` 篩選並保留 SA2 代碼與名稱，原始回應存於 `raw/abs/sa2_3gbri_2021.json`。
- 將 ZIP 放入 `raw/abs/`，在本目錄執行 `python scripts/abs_workplace_sa2.py` 即可重建 CSV。
- 工作地點指普查前一週主要工作的地址。疫情期間暫時在家工作的人應填平時的工作地址，ABS 指出部分人可能填了住址。這些數字適合描述就業分布，若要估計實際通勤人次，需另用旅次資料。[ABS 工作地點定義](https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/location/place-work-powp)
