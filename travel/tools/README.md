# 清單地圖工具

把清單地圖頁（目前是 `australia/brisbane/bakery/`、`cafe/`）的 csv 轉成網頁要用的 `data.js` 和 Google My Maps 匯入檔。計畫與決定見 `australia/brisbane/cafe/PLAN.md`。

| 檔案 | 用途 |
|---|---|
| `make_data_js.py` | csv → `data.js`（`var PAGE_DATA = {...}`，用 `<script>` 載入，`file://` 也能開） |
| `make_mymaps.py` | csv → My Maps 匯入 csv（每家一列，依主分類上色） |
| `list_data.py` | 兩支共用的 csv 讀取函式、區域清單 |
| `make_awards_data.py` | 得獎地圖（`australia/awards/`）的 7 個 csv → `data.js`＋My Maps 匯入檔，先跑全部檢查 |
| `tests/` | `make_awards_data.py` 的測試和範例 csv（`awards_fixture/`）；得獎地圖篩選規則的 node 測試（`awards_filter.test.js`） |

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

## 得獎地圖的指令

欄位、檢查和上網站的規則在 `australia/awards/DATA-SCHEMA.md`（第 2、5、6 節）。這支工具只 import `list_data.read_csv`，和上面兩頁的工具互不影響。

```powershell
python travel/tools/make_awards_data.py travel/australia/awards `
  --data-as-of 2026-11 `
  --mymaps-url "https://www.google.com/maps/d/embed?mid=1dNSM5BwCtwvCcUahY4jQAP_PADdrWBA&ehbc=2E312F&noprof=1&ll=-25.5,142&z=4" `
  --mymaps-out "$env:USERPROFILE\Downloads\australia-awards-mymaps.csv"
```

- My Maps「澳洲得獎咖啡與烘焙地圖」（2026-11-02 建立）：圖層「得獎店家 61 間（依類型）」（2026-11-02 補 Coffee Presto Annandale 後重新匯入，舊的 60 間圖層已刪），依「類型 Type」上色（烘焙珊瑚紅、咖啡深棕），預設畫面全澳，分享「知道連結的人都可以查看」（不開放搜尋），嵌入時關掉擁有者頭像（`noprof=1`）。網址最後的 `&ll=-25.5,142&z=4` 是頁面總覽的固定畫面：My Maps 的預設畫面在窄的地圖框裡會縮得太小，中心放在東經 142° 讓手機也框得住 Darwin 到東岸（所有門市在 131°～153°）；點州別時 `list-map-shell.js` 會換掉這組 `ll`／`z`，不會重複。資料改了要重新匯入：照下面「之後更新」第 3 點，先匯入新圖層、確認後再刪舊的，嵌入網址不變。
- PowerShell 5.1 會把空字串參數吃掉，所以 `--mymaps-url ""` 這種寫法會讓指令出錯；不需要網址時整個省略。

- 有 `ERROR` 就不寫 `data.js`，結束碼是 1。`WARNING`（查核超過 180 天、兩間門市距離不到 20 公尺、店名幾乎一樣）不會擋。
- 最後印出摘要：各狀態的獎項數、上網站／沒上網站的獎和原因（兩個數字加起來要等於 `award_attributions.csv` 的列數）、各州店家數。

改了 `make_awards_data.py` 或檢查規則之後，跑測試：

```powershell
python -m unittest discover travel/tools/tests
```

`tests/awards_fixture/` 是一份正確的小範例，涵蓋每一條上網站規則；每個測試改錯一個地方，確認對應的檢查會報。新增檢查時，也在 `test_make_awards_data.py` 加一個測試。

得獎地圖的篩選規則（`scripts/awards-filter.js`）用 node 內建的測試跑。改了篩選規則或重新產生 `data.js` 之後跑：

```powershell
node --test travel/tools/tests/awards_filter.test.js
```

- `travel/australia/awards/UI-PLAN.md` 5.1 的 25 組案例跑在 `tests/awards_filter_fixture.js` 上：這是 5 家試驗資料的凍結副本（2026-11-02），**不要重新產生**，所以補資料不會弄壞這些案例（使用者選 A）。
- 另外幾個測試讀真正的 `data.js`：每家都有招牌獎、每個品項類別都有按鈕名稱（`page.js` `itemGroups`）、州別家數和直接計算的一致、每個招牌獎都找得到自己的店而銀牌和第 2 名找不到。

## 參數說明

- `--tasting`：試吃評分欄位，格式是 `網頁用的 key=csv 欄位名稱`，用 `;` 分隔。`試吃日期`、`花費 …`、`平均分數` 會自動加上。key 要和頁面 `page.js` 的 `tasting` 清單一致（中英標籤寫在 page.js）。
- 頁面標題等文字不在 data.js，寫在頁面的 `page.js`。
- My Maps 匯入檔放在 repo 外面（例如 Downloads），不要 commit。

## 改了 csv 之後

1. 重新執行 `make_data_js.py`，用 `git diff` 看 `data.js` 的變動是否符合預期。
2. 頁面的 `index.html` 把 `?v=` 版號改新，否則 GitHub Pages 會給舊的快取。改了 `styles/`、`scripts/` 裡的共用檔（例如 `map-list.css`、`map-list.js`）的話，**每個用到它的頁面**都要改版號。
3. 店家、座標、分類或前三名有變的話，重新產生 My Maps 匯入檔：在 My Maps **先匯入新圖層，確認沒問題後再刪掉舊圖層**。匯入時「瀏覽」選檔要使用者自己點。
