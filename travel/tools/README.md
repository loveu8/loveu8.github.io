# 清單地圖工具

把清單地圖頁（目前是 `australia/brisbane/bakery/`、`cafe/`）的 csv 轉成網頁要用的 `data.js` 和 Google My Maps 匯入檔。計畫與決定見 `australia/brisbane/cafe/PLAN.md`。

| 檔案 | 用途 |
|---|---|
| `make_data_js.py` | csv → `data.js`（`var PAGE_DATA = {...}`，用 `<script>` 載入，`file://` 也能開） |
| `make_mymaps.py` | csv → My Maps 匯入 csv（每家一列，依主分類上色） |
| `list_data.py` | 兩支共用的 csv 讀取函式、區域清單 |

需要 Python 3（只用標準函式庫）。在 repo 根目錄執行。

## 頁面資料夾要有的檔案

| 檔案 | 內容 |
|---|---|
| `<店家>.csv`（例如 `bakery.csv`） | 一家一列。欄位名稱沿用 `bakery.csv`：`ID`、`店家`、`區域`、`大區域`、`分類`（`08 澳式派；01 酸種麵包`，第一個是主分類）、`優先級`、`Google 評分`、`緯度`、`經度`、`試吃日期`、`花費 <幣別>`、`平均分數`、`試吃備註及訪前提醒`、`訪前提醒（英）` 等 |
| `top3.csv` | 每家 × 每個分類的前三名，欄位同 bakery 的 `top3.csv`。**有「區塊」欄時**（例如咖啡廳的 飲品／餐點）改成每家 × 每個區塊，頁面的 `page.js` 要設定 `top3Blocks` |
| `categories.csv` | `代碼,中文,英文`，列的順序就是網頁上分類按鈕的順序 |

- **優先級 C 的店不會輸出**（只留在 csv 當調查紀錄）。
- 依分類的頁面：每家店的每個分類都要在 `top3.csv` 有資料；依區塊的頁面：每家至少要有一個區塊（沒資料的區塊不顯示）。缺的話 `make_data_js.py` 會印出 `MISSING top3`。
- 區域清單（CBD、市中心周邊、北、西、南、東、郊外）寫在 `list_data.py`，每頁只列出有店家的區域。csv 出現清單以外的區域會印出 `UNKNOWN region`。
- 選用欄位 `風格標籤`、`咖啡豆`、`跨頁標記`：csv 有這幾欄才會寫進 data.js。英文對照（`termsEn`）和跨頁標記的文字（`crossMarks`）寫在 page.js。

## 烘焙頁的指令

```powershell
python travel/tools/make_data_js.py travel/australia/brisbane/bakery/bakery.csv `
  --data-as-of 2026-10 `
  --mymaps-url "https://www.google.com/maps/d/embed?mid=1gePZ9RkPv8lT2xZKCcWq_5G4sLdwrdY&ehbc=2E312F&noprof=1" `
  --tasting "look=外觀 1-5;texture=口感 1-5;aroma=香氣 1-5;revisit=回購 1-5"

python travel/tools/make_mymaps.py travel/australia/brisbane/bakery/bakery.csv `
  "$env:USERPROFILE\Downloads\brisbane-bakery-mymaps.csv"
```

## 咖啡廳頁的指令

```powershell
python travel/tools/make_data_js.py travel/australia/brisbane/cafe/cafe.csv `
  --data-as-of 2026-10 `
  --mymaps-url "https://www.google.com/maps/d/embed?mid=1xEUC-e_cK8UF07UYMHLVjNKhm0XtAg4&ehbc=2E312F&noprof=1" `
  --tasting "drink=飲品 1-5;food=餐點 1-5;vibe=環境 1-5;revisit=回購 1-5"

python travel/tools/make_mymaps.py travel/australia/brisbane/cafe/cafe.csv `
  "$env:USERPROFILE\Downloads\brisbane-cafe-mymaps.csv"
```

## 參數說明

- `--tasting`：試吃評分欄位，格式是 `網頁用的 key=csv 欄位名稱`，用 `;` 分隔。`試吃日期`、`花費 …`、`平均分數` 會自動加上。key 要和頁面 `page.js` 的 `tasting` 清單一致（中英標籤寫在 page.js）。
- 頁面標題等文字不在 data.js，寫在頁面的 `page.js`。
- My Maps 匯入檔放在 repo 外面（例如 Downloads），不要 commit。

## 改了 csv 之後

1. 重新執行 `make_data_js.py`，用 `git diff` 看 `data.js` 的變動是否符合預期。
2. 頁面的 `index.html` 把 `?v=` 版號改新，否則 GitHub Pages 會給舊的快取。改了 `styles/`、`scripts/` 裡的共用檔（例如 `map-list.css`、`map-list.js`）的話，**每個用到它的頁面**都要改版號。
3. 店家、座標、分類或前三名有變的話，重新產生 My Maps 匯入檔：在 My Maps **先匯入新圖層，確認沒問題後再刪掉舊圖層**。匯入時「瀏覽」選檔要使用者自己點。
