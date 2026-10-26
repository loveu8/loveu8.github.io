# 澳洲得獎咖啡與烘焙：資料結構

- 日期：2026-10-26
- 狀態：**草稿**，欄位在 Step 2 定案（`PLAN.md`）
- 原則：CSV 是唯一要手動維護的資料；`data.js` 只能由 `travel/tools/make_awards_data.py` 產生

## 1. 為什麼要 7 個 CSV，不能更少嗎

既有的咖啡廳和烘焙頁是「一家店一列」的單一 CSV，因為一家店只有一組 Google 評論資料。得獎資料不一樣：

| 需求 | 單一 CSV 會發生什麼 |
|---|---|
| 一家店有很多獎（Gumnut Patisserie 兩年 17 面金牌） | 店家資料（地址、網站）要重複 17 次，改一次地址要改 17 列 |
| 一個品牌有很多門市（Bonfire Bread 4 個地點） | 地址欄放不下；或每個門市都要複製一份獎項 |
| 一個獎可能對到品牌、某間門市或某個人（NABC「Robert Trimboli - Adelaide's Finest」） | 沒有地方記「這個獎和這家店是什麼關係」 |
| 一個獎要兩個來源才算確定，或兩個來源互相矛盾（`RESEARCH.md` 第 5 節） | 來源欄只能放一個網址，放不下衝突 |

所以至少要：店家、門市、獎項、獎項↔店家的關係、來源。賽事資料（7 筆以內）和「獎項↔來源」也拆開，是因為賽事名稱和主辦單位會在每個獎重複，「獎項↔來源」要記頁碼和是否矛盾。

**評估過的簡化**：

| 簡化方案 | 結論 |
|---|---|
| 把 `competitions.csv` 寫進 `page.js` | 可以，但產生工具就讀不到賽事 ID，沒辦法檢查。**不採用**，賽事少，多一個小 CSV 成本很低 |
| 把 `award_sources.csv` 併進 `awards.csv`（`source_ids` 欄用 `；` 分隔） | 會失去「每個來源的頁碼、是支持還是矛盾」。**不採用** |
| 把 `award_attributions.csv` 併進 `awards.csv`（`business_id`、`location_id` 兩欄） | 一個獎只能對一家店。實際上大多數獎確實只對一家店，**這是可以考慮的簡化**；代價是 Adelaide's Finest 這種「一個獎、兩間門市」要寫兩列一樣的獎。**建議保留分開**，見待決定 D5 |

## 2. 檔案和欄位

型別：`id`（見第 3 節）、`text`、`enum`（只能填列出的值）、`int`、`decimal`、`date`（`YYYY-MM-DD`）、`url`（`https://` 開頭）。**必填**欄位空白時，產生工具會報 ERROR。

### 2.1 `businesses.csv`：品牌

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `business_id` | id | ✔ | `B-` 開頭，例如 `B-bonfire-bread` |
| `official_name` | text | ✔ | 店家自己用的名稱（不是比賽登記的公司名，例如不寫 PTY LTD） |
| `business_type` | enum | ✔ | `bakery`、`cafe`、`roaster`，可以多個，用 `；` 分隔，第一個是主類型 |
| `scope` | enum | ✔ | `retail`（有門市可去）、`wholesale`、`manufacturer`、`supermarket`、`chain_franchise`、`other`。只有通過 D2 的值會上網站 |
| `website_url` | url | | 官網 |
| `instagram_url` | url | | |
| `description_zh` | text | | 一句話，**只寫查得到的事實**，不寫製程、發酵時數、豆子產地，除非有來源 |
| `description_en` | text | | 同上 |
| `notes` | text | | 研究備註，不上網站 |

### 2.2 `locations.csv`：實體門市

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `location_id` | id | ✔ | `L-` 開頭，例如 `L-bonfire-bread-marrickville` |
| `business_id` | id | ✔ | 對到 `businesses.csv` |
| `location_name` | text | ✔ | 例如 `Marrickville` |
| `street_address` | text | ✔ | |
| `suburb` | text | ✔ | |
| `city` | text | ✔ | 大城市或地區名（Sydney、Wollongong、Gold Coast、Canberra），用來篩選和顯示 |
| `state_code` | enum | ✔ | `NSW`、`VIC`、`QLD`、`SA`、`WA`、`TAS`、`ACT`、`NT` |
| `postcode` | text | ✔ | 4 位數字；工具檢查和州別的郵遞區號範圍是否吻合 |
| `latitude`、`longitude` | decimal | ✔ | 工具檢查在澳洲範圍內（緯度 -44～-10、經度 112～154） |
| `location_role` | enum | ✔ | `shop`（門市）、`bakehouse`（只有製作）、`hq`；只有 `shop` 上地圖 |
| `operating_status` | enum | ✔ | `open`、`temporarily_closed`、`closed`、`moved`、`unknown`；只有 `open` 上網站 |
| `moved_to_location_id` | id | | `operating_status = moved` 時必填 |
| `location_source_url` | url | ✔ | 查到地址的來源（官網門市頁或 Google Maps） |
| `location_verified_at` | date | ✔ | 超過 180 天，工具印 WARNING |
| `notes` | text | | |

### 2.3 `competitions.csv`：賽事

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `competition_id` | id | ✔ | 短代碼：`RAS-PB`、`NABC`、`GBA`、`ASCA` |
| `official_name` | text | ✔ | |
| `short_name_zh`、`short_name_en` | text | ✔ | 卡片和篩選按鈕用 |
| `organiser` | text | ✔ | |
| `competition_type` | enum | ✔ | `bakery`、`coffee` |
| `award_system` | enum | ✔ | `medal_by_score`（RAS、GBA）、`placing`（NABC、ASCA） |
| `entrant_scope` | enum | ✔ | `business`、`individual`、`mixed`（NABC 有「人名 - 店名」） |
| `region_scope` | text | ✔ | `Australia`、`Australasia (AU, NZ + others)` |
| `website_url` | url | ✔ | |
| `medal_rules` | text | | 例如「Gold ≥ 90；Silver 82–<90；Bronze 74–<82（RAS 2025、2026 目錄）」 |

### 2.4 `awards.csv`：得獎紀錄（一列＝官方結果上的一行）

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `award_id` | id | ✔ | 見第 3 節，例如 `RAS-PB-2026-C18-E109` |
| `competition_id` | id | ✔ | |
| `award_year` | int | ✔ | **官方頭銜上的年份**（ASCA「2026 Barista Champion」是 2025-11 比的，填 2026） |
| `event_date` | date | | 評審或頒獎日期，知道才填 |
| `class_code` | text | ✔ | 官方班號，例如 `18`、`22A`、`001`、`Cat 1`；冠軍填 `CHAMPION` |
| `category` | text | ✔ | 官方班名原文，例如 `Viennoiserie (e.g., Danish, vanilla slice, brioche, croissant, pain au chocolat, etc.)` |
| `category_group` | enum | ✔ | 網站篩選用的歸類：`bread`、`sourdough`、`viennoiserie`、`pastry_pie`、`cake`、`biscuit`、`gluten_free`、`coffee_espresso`、`coffee_milk`、`coffee_filter`、`coffee_other`、`overall` |
| `product_name` | text | | 官方寫的產品名，**照抄不改寫**（全大寫也照抄，顯示時再處理大小寫） |
| `official_award_title` | text | ✔ | 例如 `Gold Medal`、`First`、`Champion Bread`、`Overall Champion` |
| `award_level` | enum | ✔ | `champion`（冠軍／總冠軍）、`medal`、`placing` |
| `medal_type` | enum | | `gold`、`silver`、`bronze`；`award_level = medal` 時必填，其他必空白 |
| `rank` | int | | 1、2、3；`award_level = placing` 時必填，其他必空白 |
| `score` | decimal | | 官方有公布才填 |
| `entry_number` | text | | 官方目錄編號 |
| `recipient_type` | enum | ✔ | `business`、`location`、`individual_for_business`、`individual` |
| `recipient_name` | text | ✔ | **照官方原文**，例如 `BONFIRE BREAD AVALON NSW 2107`、`Robert Trimboli - Adelaide's Finest Bakeries & Patisserie` |
| `verification_status` | enum | ✔ | `VERIFIED`、`PARTIAL`、`DISPUTED`、`REJECTED` |
| `verification_note` | text | | PARTIAL／DISPUTED／REJECTED 必填理由 |

**`medal_type` 和 `rank` 分開存**，所以「金牌」和「第一名」在資料層就不可能混在一起（查證規則 1、3）。冠軍是自己一列，不是在金牌那列加註（規則 2）。

### 2.5 `award_attributions.csv`：獎項和店家的關係

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `attribution_id` | id | ✔ | `AT-` ＋ `award_id` ＋ 序號 |
| `award_id` | id | ✔ | |
| `business_id` | id | ✔ | |
| `location_id` | id | | 官方寫到門市（Bonfire Bread Marrickville）才填；只寫品牌就空白，**不可以自己挑一間門市**（規則 6） |
| `relationship_type` | enum | ✔ | `entrant`（店家本身參賽）、`entrant_location`（門市參賽）、`staff_entry`（「人名 - 店名」代表店家參賽）、`employee_individual`（個人賽選手任職於此，例如 ASCA） |
| `attribution_status` | enum | ✔ | 同 `verification_status`。獎項是真的不代表「是這家店的」：例如比賽寫 `PIECE OF CAKE BAKERY`，但同名店不只一家時就是 PARTIAL |
| `attribution_notes` | text | | |

### 2.6 `sources.csv`：來源

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `source_id` | id | ✔ | `S-` 開頭，例如 `S-RAS-PB-2026-RESULTS` |
| `source_title` | text | ✔ | |
| `source_url` | url | ✔ | |
| `publisher` | text | ✔ | |
| `source_type` | enum | ✔ | `official_results`、`official_pdf`、`official_page`、`media`、`business_site`、`map` |
| `is_official` | enum | ✔ | `yes`、`no`（主辦單位或其直接發布的檔案才算 `yes`） |
| `published_at` | date | | |
| `verified_at` | date | ✔ | 最後一次打開確認內容的日期 |
| `source_reference` | text | | 頁碼、班號或章節，例如「p.13 Professional Bakery」 |
| `archive_url` | url | | 有存 Wayback 就填（官方頁會換年份，例如 RAS 頁已經換成 2026） |

### 2.7 `award_sources.csv`：獎項和來源

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `award_id` | id | ✔ | |
| `source_id` | id | ✔ | |
| `stance` | enum | ✔ | `supports`、`conflicts` |
| `evidence_note` | text | ✔ | 來源上的原文或位置，例如「Class 18, G 94.5, SOURDOUGH CROISSANT」 |

## 3. ID 規則

| 類型 | 格式 | 範例 | 理由 |
|---|---|---|---|
| 店家 | `B-<slug>` | `B-burleigh-baker` | 讀得懂；slug 一旦建立就不改，改名只改 `official_name` |
| 門市 | `L-<店家 slug>-<地點 slug>` | `L-bonfire-bread-avalon` | |
| 賽事 | 大寫短碼 | `RAS-PB` | |
| 獎項 | `<賽事>-<年>-<班>-<官方識別>` | RAS：`RAS-PB-2026-C18-E109`（目錄編號）；NABC：`NABC-2025-C005-P1`（名次）；冠軍：`NABC-2025-CHAMP-SHOW`；GB：`GBA-2025-CAT1-<slug>` | 從官方資料就能重新算出同一個 ID，重跑匯入不會產生重複 |
| 來源 | `S-<賽事或出版者>-<年>-<內容>` | `S-NABC-2025-PDF` | |

slug：小寫英數和連字號，去掉 `pty-ltd`。

## 4. 資料關係

```text
competitions 1 ── * awards * ── * sources        （透過 award_sources，含 stance）
                       │
                       * award_attributions
                       │        │
                       │        └── 0..1 locations
                       └── 1 businesses 1 ── * locations
```

網站以**店家**為一張卡片（同一品牌不重複出卡片），卡片內列出門市（每間門市一組 📍／↗ Maps）和獎項明細。地圖以**門市**為單位，一間門市一個點。

## 5. 上網站的條件

一個獎出現在網站上，**全部**條件都要成立：

1. `awards.verification_status = VERIFIED`
2. 至少一個 `award_sources` 是 `supports`，而且那個來源 `is_official = yes`
3. 沒有任何 `conflicts` 的官方來源（有的話自動降為 DISPUTED，見第 6 節）
4. `award_attributions.attribution_status = VERIFIED`
5. 店家的 `scope` 在 D2 允許的清單內
6. 店家至少有一間 `location_role = shop` 且 `operating_status = open` 的門市
7. 獎項等級在 D1 允許的清單內（建議：`champion`、`medal_type = gold`、`rank = 1`）
8. `recipient_type` 不是 `individual`（純個人獎不上網站，D3）

其餘資料留在 CSV 當研究紀錄。產生工具會印出「沒上網站的獎」和原因，數量要和 CSV 對得起來。

## 6. 產生工具 `travel/tools/make_awards_data.py`

### 為什麼不改 `make_data_js.py`

`make_data_js.py` 是「一家店一列＋前三名」的形狀（`shop_entry()`、`top3`、`tasting`、`REGIONS` 是布里斯本的區），和獎項資料沒有共同欄位。硬塞進去會讓咖啡廳、烘焙頁的工具變複雜，還可能改變它們的輸出。可以共用的只有 `list_data.read_csv()`（讀 UTF-8 CSV），新工具直接 import 它。

### 輸出

`travel/australia/awards/data.js`：

```js
// 由 make_awards_data.py 產生，請勿手改；csv 更新後重新產生。
var PAGE_DATA = {
  "dataAsOf": "2026-11",
  "myMapsEmbedUrl": "",
  "competitions": [ { "id": "RAS-PB", "zh": "雪梨皇家烘焙賽", "en": "Sydney Royal Bakery", ... } ],
  "businesses": [
    {
      "id": "B-bonfire-bread", "name": "Bonfire Bread", "types": ["bakery"],
      "descZh": "...", "descEn": "...", "website": "...",
      "locations": [ { "id": "L-bonfire-bread-avalon", "name": "Avalon", "address": "...", "city": "Sydney", "state": "NSW", "lat": -33.6, "lng": 151.3, "mapsUrl": "https://www.google.com/maps/search/?api=1&query=..." } ],
      "awards": [ { "id": "NABC-2025-CHAMP-SHOW", "comp": "NABC", "year": 2025, "level": "champion", "medal": null, "rank": null,
                   "title": "Champion Product of Show", "category": "...", "group": "overall", "product": "",
                   "locationId": "L-bonfire-bread-marrickville", "relation": "entrant_location",
                   "sources": [ { "title": "...", "url": "...", "ref": "..." } ], "verifiedAt": "2026-11-02" } ],
      "summary": { "champion": 2, "gold": 7, "first": 2, "years": [2024, 2025, 2026] }
    }
  ]
};
```

- 只放上網站的資料（第 5 節），所以 `data.js` 不會帶研究用的 PARTIAL 紀錄。
- 獎項掛在店家下面，前端不用再做 join，也避免重複資料。
- `summary` 由工具算好，前端排序和卡片摘要直接用。
- 用一般 `<script>` 載入，`file://` 可以開。

### 檢查項目

| 檢查 | 等級 | 範例訊息 |
|---|---|---|
| 必填欄位 | ERROR | `awards.csv:42 award_level is empty` |
| ID 唯一 | ERROR | `duplicate award_id RAS-PB-2026-C18-E109 (rows 40, 88)` |
| ID 參照存在 | ERROR | `award_attributions.csv:7 business_id B-bonfire not in businesses.csv` |
| enum 合法 | ERROR | `locations.csv:3 state_code 'Qld' must be one of NSW, VIC, ...` |
| `award_level` 和 `medal_type`／`rank` 一致 | ERROR | `awards.csv:12 award_level=placing needs rank and no medal_type` |
| 年份在 2024–2026 | ERROR | |
| 重複獎項（同賽事＋年＋班＋目錄編號或名次＋得獎者） | ERROR | |
| 郵遞區號和州別吻合 | ERROR | `postcode 4227 is not in NSW` |
| 座標在澳洲範圍 | ERROR | |
| 已驗證的獎沒有官方 `supports` 來源 | ERROR | |
| 有 `conflicts` 的官方來源但狀態是 VERIFIED | ERROR | |
| `moved` 沒有 `moved_to_location_id` | ERROR | |
| 來源、門市查核超過 180 天 | WARNING | |
| 同一店家兩間門市座標距離 < 20 公尺 | WARNING | 可能重複建檔 |
| 店家名稱相似（去掉大小寫、PTY LTD 後相同） | WARNING | 可能同一家建了兩個 ID |

有 ERROR 就**不寫出 `data.js`**、結束碼非 0。最後印出摘要：各狀態的獎項數、上網站／沒上網站的數量和原因、各州店家數。

### 指令（預計）

```powershell
python travel/tools/make_awards_data.py travel/australia/awards `
  --data-as-of 2026-11 `
  --mymaps-url "" `
  --mymaps-out "$env:USERPROFILE\Downloads\australia-awards-mymaps.csv"
```

`--mymaps-out` 另外寫 My Maps 匯入檔（一間門市一列：店名、門市、緯度、經度、主類型、最高榮譽、獎項摘要、地址），放 repo 外面，不 commit，和既有工具的規則相同（`travel/tools/README.md`）。

### 研究資料匯入（選用）

`research/ras_professional_bakery_2024-2026.csv` 有 818 筆官方成績。Step 3 可以加一支 `import_ras_results.py`，把符合條件的列轉成 `awards.csv` 的草稿列（`verification_status` 先填 PARTIAL，人工核對後改 VERIFIED），避免手抄錯誤。這支只在研究時用，不在建置流程裡。
