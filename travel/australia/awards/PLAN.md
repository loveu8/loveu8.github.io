# 澳洲得獎咖啡與烘焙地圖：開發計畫

- 日期：2026-10-26
- 狀態：**Step 0、Step 1（研究第一輪）完成；D1～D8 已在 2026-10-27 決定（第 10 節）；下一步 Step 1b**
- 待辦：`TODO.md`（每個 Step 拆成可打勾的小項目；這份的進度表只記每個 Step 的狀態）
- 文件：`RESEARCH.md`（賽事研究、覆蓋矩陣、衝突）、`CANDIDATES.md`（候選與查證狀態）、`DATA-SCHEMA.md`（CSV 欄位、產生工具）、`UI-PLAN.md`（介面）
- 參考：根目錄 `AGENTS.md`、`DESIGN.md`、`DECISIONS.md`；`travel/australia/brisbane/cafe/PLAN.md`（共用化的前例）

## 進度表

**接手時先看這裡**：找第一個不是 ✅ 的列，照「下一步」做；那一步的細項在 `TODO.md`。每完成一步就更新這張表，和那一步的程式放在同一個 commit。

| 步驟 | 內容 | 狀態 | 完成日期 | Commit | 下一步／備註 |
|---|---|---|---|---|---|
| 0 | 既有專案盤點 | ✅ 完成 | 2026-10-26 | （本 commit） | 結論在第 1 節 |
| 1 | 官方賽事研究（第一輪） | ✅ 完成 | 2026-10-26 | （本 commit） | RAS 三年逐筆、NABC 三年、GB 冠軍、ASCA 2025。缺口見 `RESEARCH.md` 第 6 節 |
| — | D1～D8 決定 | ✅ 完成 | 2026-10-27 | （本 commit） | 第 10 節 |
| 1b | 研究補完：門市查證、GB 分類金牌轉錄 | 🔄 進行中 | | `76c4a90`（第 1 項） | 第一批名單已篩（`CANDIDATES.md` 2.5）。**2026-10-27 停在這裡**。下一項：逐家查門市，要使用者先開 Chrome（擴充功能連線）；每 10 家停下來給使用者看；從得獎最多的開始（Bonfire Bread、Gumnut、Wholegreen、Slowbreads、Three Mills、Burleigh Baker） |
| 2 | CSV 欄位定案、建立空 CSV | ⬜ | | | D5 已決定：7 個 CSV |
| 3 | `make_awards_data.py` | ⬜ | | | |
| 4a | 拆出 `list-map-shell.js`（D8 = B） | ⬜ | | | 獨立 commit，雜湊比對 |
| 4 | 頁面原型（少量 VERIFIED 資料） | ⬜ | | | |
| 5 | 搜尋與篩選 | ⬜ | | | |
| 6 | 地圖（My Maps） | ⬜ | | | 需要使用者匯入 |
| 7 | 完整資料、中英文、SEO、首頁入口 | ⬜ | | | |
| 8 | QA 與上線 | ⬜ | | | push 要使用者同意 |

狀態符號：⬜ 未開始、🔄 進行中、⏸️ 等使用者決定、✅ 完成

## 1. 既有專案盤點（Step 0）

### 1.1 架構

| 項目 | 現況 | 對新功能的意義 |
|---|---|---|
| 部署 | GitHub Pages，legacy 建置，`main` 分支根目錄（`gh api .../pages` 確認），沒有 GitHub Actions、沒有 `.nojekyll` | push 到 main 就上線；`.md`、`.csv` 也會公開（咖啡廳的 PLAN.md 也是） |
| 共用 CSS | `tokens.css` → `base.css` →（旅行頁）`app-shell.css` → 頁面 CSS；顏色只能寫在 `tokens.css`，`tools/check_tokens.py`＋pre-commit hook 檢查 | 新 CSS 只能用 token；hook 已啟用（`core.hooksPath = .githooks`） |
| 共用 JS | `site.js`（主題、語言、兩個切換鈕）；`map-list.js`（清單地圖頁，783 行） | 主題和語言直接用 `site.js`，不另做 |
| 清單地圖頁 | `index.html`（外殼）＋`page.js`（`PAGE_CONFIG`：介面文字、試吃欄位、幣別、備用地圖）＋`data.js`（`var PAGE_DATA`，產生的） | 新頁沿用同樣三件式 |
| 資料工具 | `travel/tools/`：`make_data_js.py`（CSV → data.js）、`make_mymaps.py`（CSV → My Maps 匯入檔）、`list_data.py`（共用讀取、布里斯本區域） | 形狀是「一店一列＋前三名」，不適合獎項；只能共用 `read_csv()` |
| 地圖 | My Maps 嵌入當總覽；📍 換成免費單點嵌入；篩選只作用在清單 | 新頁照用 |
| 快取 | 每個 CSS／JS 用 `?v=YYYYMMDD[字母]`，共用檔改了要改所有載入它的頁面（`DESIGN.md` 依賴表） | 新頁要加進依賴表 |
| 路徑 | 全部相對路徑，`file://` 可開 | 新頁在 `travel/australia/awards/`，往上 3 層到根目錄（`../../../`），和 Noosa 相同 |
| SEO | 各頁只有 `<title>`、`<meta name="description">`；沒有 canonical、Open Graph、sitemap.xml、robots.txt | 新頁補齊自己的；全站 sitemap 不在這次範圍 |

### 1.2 `map-list.js` 的組成

| 行數（約） | 內容 | 通用嗎 |
|---|---|---|
| 9–105 | 常數、共用介面文字 `UI`、`state`、`els` | 一半通用 |
| 107–167 | 小工具（`el`、`t`、`isMobile`）、分類／區域標籤、`matches()` | 小工具通用；篩選是咖啡／烘焙專用 |
| 169–271 | 手機抽屜、篩選按鈕、橫捲 ‹ › 按鈕 | 抽屜和橫捲通用；按鈕內容專用 |
| 292–345 | 頂部 chip strip、scroll-spy | 通用 |
| 347–574 | 店家卡片（優先級、星等、前三名、試吃、照片） | 專用 |
| 590–635 | 地圖（My Maps、單點嵌入、載入中、回總覽） | 通用（備用縮放寫死 11） |
| 637–647 | lightbox | 通用 |
| 650–782 | 文字更新、語言切換、拖曳寬度、事件、`init()` | 大半通用 |

大約 300 行是「地圖＋側欄外殼」，和卡片、篩選綁在同一個檔案、同一個全域 `state` 裡。

### 1.3 需要的檔案（和指令草案比較）

| 草案的檔案 | 結論 | 理由 |
|---|---|---|
| `travel/australia/awards/index.html`、`page.js`、`data.js` | **需要** | 三件式 |
| 7 個 CSV | **需要**（D5 可能少一個） | `DATA-SCHEMA.md` 第 1 節 |
| `PLAN.md`、`RESEARCH.md`、`DATA-SCHEMA.md`、`UI-PLAN.md`、`CANDIDATES.md` | 本輪已建 | |
| `research/`（草案沒有） | **新增** | 官方成績的逐筆轉檔，讓研究結論可以回查 |
| `travel/tools/make_awards_data.py` | **需要** | 形狀和 `make_data_js.py` 完全不同（`DATA-SCHEMA.md` 第 6 節） |
| `scripts/awards.js` | **需要** | 篩選邏輯、卡片、獎項明細都是新的 |
| `styles/awards.css` | **需要，但很小** | 只放搜尋框、更多篩選、徽章、獎項明細、門市列表（`UI-PLAN.md` 第 3 節）；其餘直接載入 `map-list.css` |
| 修改 `scripts/map-list.js` | **看 D8** | 見第 3 節 |
| 修改 `styles/map-list.css` | **不需要** | 新頁直接載入它，沒有要改的 |

## 2. 新增／修改檔案清單

| 檔案 | 新增／修改 | 步驟 |
|---|---|---|
| `travel/australia/awards/{PLAN,RESEARCH,DATA-SCHEMA,UI-PLAN,CANDIDATES}.md`、`research/*.csv` | 新增 | 0–1（本輪） |
| `travel/australia/awards/*.csv`（7 個） | 新增 | 2 |
| `travel/tools/make_awards_data.py` | 新增 | 3 |
| `travel/tools/README.md` | 修改：加得獎頁指令 | 3 |
| `travel/australia/awards/index.html`、`page.js`、`data.js` | 新增 | 4 |
| `styles/awards.css`、`scripts/awards.js` | 新增 | 4–5 |
| `scripts/list-map-shell.js`＋`scripts/map-list.js`＋咖啡、烘焙的 `index.html` | 新增＋修改（**只有 D8 選 B 時**） | 4 前的獨立步驟 4a |
| `index.html`、`scripts/home.js` | 修改：首頁加入口（中英文） | 7 |
| `DESIGN.md` | 修改：搜尋框、獎項徽章、兩層篩選、依賴表 | 4、7 |
| `DECISIONS.md` | 修改：新增決定紀錄 | 每個有決定的步驟 |

**不會動的**：布里斯本咖啡廳、烘焙的 CSV 和 `data.js`、Noosa、STARLUX 報告、`site.js`、`tokens.css`（除非新徽章需要新 token，目前判斷不需要）。

## 3. 技術方案

### 3.1 JS：共用外殼要不要拆（D8）

| 方案 | 做法 | 優點 | 缺點 |
|---|---|---|---|
| A. 複製 | `awards.js` 自己寫一份抽屜、拖曳、地圖、chip strip | 不碰咖啡、烘焙頁，零回歸風險 | 約 300 行重複；違反 `DESIGN.md`「新清單地圖頁要重用 map-list.js，不要複製」；以後修 bug 要改兩份 |
| **B. 拆出外殼（建議）** | 把通用的 300 行搬到 `scripts/list-map-shell.js`（`ListMapShell.init({...})`，回傳 `previewPlace`、`showOverview`、`setSheet`、`refreshChips` 等）；`map-list.js` 改成呼叫它；`awards.js` 也呼叫它 | 一份外殼；這正是 2026-10-16 抽出 `map-list.js` 的延續；新頁的程式只剩自己的篩選和卡片 | 要改咖啡、烘焙兩頁；需要一次回歸檢查 |
| C. 加 hook | 在 `map-list.js` 加 `PAGE_CONFIG.renderCard`、`PAGE_CONFIG.filters` 等設定 | 檔案數不變 | `map-list.js` 會變成用設定驅動的大型通用程式，更難讀；8 種篩選、兩層邏輯硬塞進現有的 `matches()` |

**建議 B**，做成獨立的 Step 4a，自己一個 commit，驗收方式照咖啡廳 PLAN 步驟 2：改之前用線上版截基準，改完在本機比對咖啡廳、烘焙頁 8 種篩選／語言／📍 組合的頁面內容雜湊值，必須完全相同。B 也順便把備用地圖縮放（寫死 11）改成可設定，得獎頁要用 4（全澳）。

### 3.2 CSS

直接載入 `map-list.css`（卡片、篩選列、pill 都在裡面），新元件放 `styles/awards.css`。不改 `map-list.css`，所以咖啡、烘焙頁的 CSS 版本號不用動。

### 3.3 資料流程

```text
官方結果（HTML／PDF／圖片）
  → research/*.csv（逐筆轉檔，研究用）
  → 人工查證、建 7 個 CSV（DATA-SCHEMA.md）
  → python travel/tools/make_awards_data.py travel/australia/awards --data-as-of ...
       ├─ 檢查（ERROR 就不寫檔）
       ├─ data.js（var PAGE_DATA，只含可上網站的資料）
       └─ My Maps 匯入檔（Downloads，不 commit）
  → 使用者在 My Maps 匯入
  → index.html 改 ?v=、git diff 看 data.js
```

## 4. 待決定（一次一題）

| # | 問題 | 建議 | 理由 |
|---|---|---|---|
| D1 | 什麼等級才算「得獎」上網站 | ✅ **已決定**（第 10 節）：冠軍＋金牌＋第 1 名當店家門檻；過門檻的店，銀牌＋第 2 名也列出 | RAS 2024–2026 有 75～86% 參賽品拿到獎牌，金牌只有 15～20% |
| D2 | 收哪些店 | ✅ **已決定**（第 10 節）：有門市的店都收；超市內烘焙、連鎖加盟店只收得獎的那一間並加標籤；製造商、批發不收 | |
| D3 | ASCA 等個人賽 | ✅ **已決定**（第 10 節）：**第一版不收** | 個人獎不是店家獎（規則 4）；官方多數公告沒寫任職店家；2024、2026 賽季沒有官方公告 |
| D4 | 賽事範圍 | ✅ **已決定**（第 10 節）：**第一版：RAS、NABC、Golden Bean（冠軍＋已轉錄的金牌）**；RAS Champion Coffee、BAA 其他賽事（Pie、Donut、各州 Baking Show）列為之後 | 先用三個有官方完整資料的賽事做出頁面 |
| D5 | `award_attributions.csv` 要不要併進 `awards.csv` | ✅ **已決定**（第 10 節）：**保留分開** | 一個獎對到兩間門市、或「個人代表店家」時才寫得清楚 |
| D6 | 徽章樣式 | ✅ **已決定**（第 10 節）：**文字徽章（冠軍 coral、金牌 amber、第 1 名中性），不用 🥇** | `UI-PLAN.md` 3.3 |
| D7 | SEO 靜態摘要 | ✅ **已決定**（第 10 節）：**第一版不做**；Step 7 再評估由產生工具在 `index.html` 標記區塊寫入靜態清單 | 個人網站，先把資料做對 |
| D8 | JS 架構 | ✅ **已決定**（第 10 節）：**方案 B：拆出 `list-map-shell.js`** | 第 3.1 節 |

## 5. 執行步驟

每一步各自一個 commit，完成後先給使用者看過再做下一步。所有步驟都**不 push**，push 前問使用者。

### Step 0：既有專案盤點 ✅

- **Objective**：根據實際程式碼確認可重用的部分。
- **Tasks**：讀 AGENTS／DESIGN／DECISIONS、首頁、共用 CSS／JS、咖啡廳和烘焙頁、`travel/tools/`；確認 Pages 設定。
- **Files**：無（結論寫在本檔第 1 節）。
- **Acceptance**：第 1 節每項都有對應檔案或指令佐證。
- **Status／Commit**：✅／本 commit。**Next**：Step 1。

### Step 1：官方賽事研究 ✅（第一輪）

- **Objective**：取得 2024–2026 官方結果，建立覆蓋矩陣與候選名單。
- **Tasks**：RAS（myRAS 三年＋冠軍）、NABC（三年 PDF）、Golden Bean（冠軍＋抽樣）、ASCA（官網公告）；記錄衝突。
- **Files to Add**：`RESEARCH.md`、`CANDIDATES.md`、`research/ras_professional_bakery_2024-2026.csv`、`research/nabc_results_2024-2026.csv`。
- **Risks**：官方頁會換年份（RAS 已經換成 2026）。→ 來源要記 `verified_at`，重要頁面存 Wayback。
- **Acceptance**：覆蓋矩陣每格有狀態；每個候選有獎項狀態和門市狀態；衝突有紀錄。
- **Status／Commit**：✅／本 commit。**Next**：使用者決定 D1～D4。

### Step 1b：研究補完

- **Objective**：讓第一批店家的獎項和門市都到 VERIFIED。
- **Tasks**：
  1. 依 D1、D2 篩出第一批店家（預估 30～45 家）。
  2. 每家查實體門市：官網門市頁＋Google Maps（地址、座標、營業狀態、是否仍營業），記查核日期。
  3. 多門市品牌：獎項對到哪間門市，對不到就記在品牌（`location_id` 空白）。
  4. Golden Bean 2024、2025：逐張讀投影片，**只轉錄金牌**（D1），篩出澳洲的烘豆商，再查是否有咖啡廳或門市。
  5. RAS 2024 冠軍：找 2024 冠軍手冊存檔，或寫信問 RAS。
- **Dependencies**：D1～D4。
- **Estimated Effort**：門市查證每家約 10 分鐘 → 5～8 小時；GB 金牌轉錄約 2～3 小時／年。
- **Risks**：同名店家（Piece of Cake Bakery）；已歇業或搬遷；超市門市的歸屬。
- **Acceptance**：`CANDIDATES.md` 第一批每家都有兩個 VERIFIED，或寫明為什麼不收。
- **Status**：⏸️。**Next**：Step 2。

### Step 2：CSV 欄位定案

- **Objective**：建立 7 個 CSV（含標題列）和第一批資料。
- **Tasks**：依 `DATA-SCHEMA.md` 建檔；`competitions.csv` 先填 3～4 個賽事；從 Step 1b 的結果填 5 家當試驗資料（建議 Bonfire Bread〔多門市〕、Burleigh Baker〔QLD〕、Three Mills〔ACT〕、Adelaide's Finest〔個人代表店家，看 D2〕、Glee Coffee〔咖啡〕），刻意涵蓋最難的情況。
- **Files to Add**：`travel/australia/awards/*.csv`。
- **Dependencies**：D5、Step 1b 至少完成 5 家。
- **Estimated Effort**：2 小時。
- **Risks**：欄位定得太早，之後改欄位要回頭修資料。→ 先只填 5 家。
- **Acceptance**：5 家的每個欄位都填得進去，沒有「這個情況沒地方記」。
- **Next**：Step 3。

### Step 3：資料產生工具

- **Objective**：CSV → `data.js`＋My Maps 匯入檔，含全部檢查。
- **Tasks**：寫 `make_awards_data.py`（import `list_data.read_csv`）；每一項檢查都用一份故意寫錯的小 CSV 測過會報錯；更新 `travel/tools/README.md`。
- **Files to Add／Modify**：`travel/tools/make_awards_data.py`（新）、`travel/tools/README.md`（改）。
- **Estimated Effort**：3～4 小時。
- **Risks**：不小心改到 `list_data.py` 影響既有工具。→ 只 import，不修改；驗收時重跑兩個既有頁的 `make_data_js.py`，`git diff` 必須是 0 行。
- **Acceptance**：5 家試驗資料產生 `data.js`；每種錯誤都會報；既有兩頁的 `data.js` 不變。
- **Next**：Step 4a 或 4。

### Step 4a：拆出共用外殼（只有 D8 = B）

- **Objective**：`map-list.js` 的通用部分搬到 `scripts/list-map-shell.js`，咖啡、烘焙頁畫面和行為完全不變。
- **Files to Add／Modify**：`scripts/list-map-shell.js`（新）、`scripts/map-list.js`、`travel/australia/brisbane/{cafe,bakery}/index.html`（載入新檔、改 `?v=`）、`DESIGN.md` 依賴表。
- **Estimated Effort**：3 小時＋回歸檢查 2 小時。
- **Risks**：咖啡、烘焙頁回歸（全域變數順序、事件綁定）。
- **Acceptance**：兩頁 × 8 種狀態（篩選、語言、深淺色、📍、手機寬度）的頁面內容雜湊值和改之前相同；console 無錯誤；`file://` 可開（請使用者確認）。
- **Next**：Step 4。

### Step 4：頁面原型

- **Objective**：用 5 家試驗資料做出完整外觀，先不做進階篩選。
- **Tasks**：`index.html`（複製咖啡廳的外殼結構，換標題、加搜尋框位置）、`page.js`、`awards.js`（卡片、徽章、獎項明細、門市列表、州別與類型篩選）、`awards.css`。
- **Files to Add**：`travel/australia/awards/index.html`、`page.js`、`styles/awards.css`、`scripts/awards.js`。
- **Dependencies**：Step 3；D6、D8。
- **Estimated Effort**：5～6 小時。
- **Risks**：新元件不符合 `DESIGN.md`；手機抽屜固定區太高。
- **Acceptance**：`python tools/check_tokens.py` 沒有 ERROR；桌機和手機（360px、768px、1280px）× 中英 × 深淺色截圖給使用者看；鍵盤可以操作所有控制；console 無錯誤。
- **Next**：使用者看過截圖後 Step 5。

### Step 5：搜尋與篩選

- **Objective**：8 種篩選、兩層邏輯、網址參數。
- **Tasks**：關鍵字（含去重音）、州別＋城市、類型、更多篩選（賽事、年份、等級、類別）、按鈕家數、結果列、✕ 清除、`?state=…` 讀寫。
- **Estimated Effort**：4 小時。
- **Risks**：獎項層條件沒有「同一個獎同時符合」。→ 先寫測試案例表（至少 10 組組合和預期家數），用 node 跑 `awards.js` 的篩選函式比對。
- **Acceptance**：測試案例全部符合；按鈕家數和實際結果一致；網址參數重新整理後還在。
- **Next**：Step 6。

### Step 6：地圖

- **Objective**：全澳 My Maps 總覽、單店預覽、↗ Maps。
- **Tasks**：產生匯入檔 → **使用者**在 My Maps 建新地圖、匯入、依主類型上色、設全澳預設畫面、開「知道連結的人可以查看」→ 把嵌入網址傳給我 → 寫進產生工具參數。
- **Dependencies**：Step 3；使用者操作。
- **Estimated Effort**：我 1 小時；使用者約 20 分鐘。
- **Risks**：匯入後座標偏移；忘了公開分享導致嵌入空白。
- **Acceptance**：總覽點數和 `data.js` 門市數相同；每個 📍 都對到正確地點；↗ Maps 搜尋結果是那間店。**沒收到使用者的嵌入網址前，不寫「地圖已完成」**。
- **Next**：Step 7。

### Step 7：完整資料、中英文、SEO、首頁

- **Objective**：所有 VERIFIED 店家上線前的內容完整度。
- **Tasks**：填完第一批全部店家；英文介面文字；`<title>`、description、canonical、Open Graph；頁尾說明（資料來源、NSW 偏差、金牌≠名次、篩選只作用在清單）；首頁「旅行與探店」加一項（`index.html`＋`home.js` 的英文）；`DESIGN.md`、`DECISIONS.md`。
- **Estimated Effort**：4～6 小時（不含 Step 1b）。
- **Acceptance**：`make_awards_data.py` 沒有 ERROR／WARNING；首頁中英切換正常。
- **Next**：Step 8。

### Step 8：QA 與上線

- **Tasks**：第 6 節的檢查表全部跑過；問使用者是否 push；push 後看線上版、確認 `?v=` 生效。
- **Acceptance**：檢查表每一項有結果；做不到的（例如 iPhone 實機、列印）明確標「未測」。

## 6. QA 檢查表（Step 8 用，Step 4 起逐步填）

| # | 項目 | 方法 |
|---|---|---|
| 1 | 布里斯本咖啡廳頁正常 | 本機＋線上，篩選、語言、📍 |
| 2 | 布里斯本烘焙頁正常 | 同上 |
| 3 | Noosa 正常 | 開頁、切語言、深淺色（不碰它的檔案，只確認） |
| 4 | 首頁正常 | 新入口、中英切換 |
| 5 | 中英切換 | 得獎頁所有文字都有兩種語言 |
| 6 | 深淺色、跟隨系統 | 三種狀態截圖 |
| 7 | 手機 | 360×640、390×844；抽屜、更多篩選展開 |
| 8 | `file://` | 直接開 `travel/australia/awards/index.html` |
| 9 | Console 無錯誤 | 三種寬度 |
| 10 | CSV 和 data.js 一致 | 重跑產生工具，`git diff data.js` 0 行 |
| 11 | 每個獎可追溯 | 抽 10 個獎點來源連結 |
| 12 | 未驗證不公開 | 產生工具摘要：PARTIAL／DISPUTED 數量 = 0 筆出現在 data.js |
| 13 | 篩選正確 | Step 5 測試案例 |
| 14 | 地圖連結、地址 | 每間門市的 📍、↗ Maps |
| 15 | 共用 CSS／JS 無回歸 | `check_tokens.py`；Step 4a 的雜湊比對 |
| 16 | `?v=` 與相對路徑 | 線上版 Network 面板沒有 404；依賴表有新頁 |

## 7. 需要人工操作的工作

| 工作 | 誰 | 什麼時候 |
|---|---|---|
| D1～D8 決定 | 使用者 | 現在 |
| 門市查證（Google Maps） | 我（Chrome 擴充）＋使用者抽查 | Step 1b |
| Golden Bean 投影片轉錄 | 我讀圖，使用者抽查 | Step 1b |
| 問 RAS 2024 冠軍紀錄 | 使用者（如果要） | Step 1b |
| My Maps 建立、匯入、上色、公開 | 使用者 | Step 6 |
| iPhone 實機、列印 | 使用者 | Step 8 |
| push | 使用者同意後 | Step 8 |
| 之後每年更新（RAS 9 月、NABC 6–7 月、GB 6 月公布） | 使用者決定要不要 | 上線後 |

## 8. 回歸風險

| 風險 | 影響 | 預防 |
|---|---|---|
| Step 4a 拆外殼 | 咖啡、烘焙頁壞掉 | 獨立 commit、雜湊比對、可整個 revert |
| 共用檔 `?v=` 沒改 | 線上讀到舊檔 | 依 `DESIGN.md` 依賴表逐頁改 |
| 新 CSS 用了原始色碼 | pre-commit 擋下 | 只用 token；先跑 `check_tokens.py` |
| 首頁 `home.js` 翻譯表 | 首頁英文缺一項或錯位 | `home.js` 是用 selector 對應，新增 id 對應的一列 |
| `list_data.py` 被改 | 既有兩頁 data.js 改變 | 不修改，只 import；重跑比對 |
| 相對路徑層數 | 新頁在 `awards/`，比咖啡廳少一層 | 用 `../../../`，`file://` 實測 |
| 研究 CSV 公開 | `research/` 會被 Pages 公開 | 內容都是官方公開資料，可以接受；不放個人資料 |

## 9. 必須回答的問題

1. **哪些程式碼可以直接重用？** `site.js`（主題、語言）、`app-shell.css`、`map-list.css`（卡片、篩選列、pill、tips-box）、`map-list.js` 的外殼約 300 行（抽屜、拖曳、地圖嵌入、chip strip、scroll-spy、回到頂部）、`list_data.read_csv()`、My Maps 的做法。第 1 節。
2. **真的需要 `awards.js`、`awards.css` 嗎？** 需要。`awards.js` 放兩層篩選、卡片、獎項明細，這些和咖啡／烘焙無關；`awards.css` 只放 5 個新元件，其餘載入 `map-list.css`。
3. **要改 `map-list.js` 嗎？** 建議改：把外殼拆成 `list-map-shell.js`（D8 方案 B），獨立一步並做回歸比對。如果不想動既有頁，方案 A 也可行，代價是 300 行重複。
4. **CSV 設計適合靜態網站嗎？** 適合。CSV 手動維護、Python 檢查並產生 `data.js`、頁面只讀 `data.js`，沒有後端。7 個檔是為了不重複資料（`DATA-SCHEMA.md` 第 1 節）。
5. **怎麼避免重複資料與錯誤獎項？** ID 可以從官方資料重算（不會重複匯入）；`medal_type`、`rank`、冠軍分開存；獎項和門市各自有狀態；上網站要 8 個條件全部成立；產生工具有 ERROR 就不寫檔。
6. **My Maps 全澳的限制？** 不能跟篩選、不能切語言、雪梨的點會擠在一起、要手動重新匯入、有匯入筆數上限（這頁遠低於上限）。`UI-PLAN.md` 第 6 節。
7. **怎麼維持 UI 一致？** 用同一個外殼和元件；新元件只用 token；寫進 `DESIGN.md` 前先給使用者看截圖。
8. **哪些要人工？** 第 7 節。
9. **可能的回歸？** 第 8 節。
10. **MVP 先做什麼？** 三個賽事（RAS、NABC、GB 冠軍）的冠軍＋金牌＋第 1 名、只收有門市的店、州別＋類型＋關鍵字篩選、卡片＋獎項明細＋來源連結、My Maps 總覽。進階篩選、網址參數、SEO 摘要排後面。
11. **新增／修改哪些檔案？** 第 2 節。
12. **怎麼分階段驗收？** 第 5 節每步的 Acceptance；每步一個 commit，先給使用者看過。

## 10. 決定紀錄

（使用者決定後逐題填入：日期、問題、決定、影響。）

### D1：上網站的獎項等級（2026-10-27）

- **決定**：分兩層。
  - 店家門檻：至少有一個冠軍、金牌或第 1 名，店家才上網站。
  - 商品清單：過門檻的店，卡片列出「招牌」（冠軍、金牌、第 1 名）和「也推薦」（銀牌、第 2 名）。銅牌、第 3 名不顯示，留在 CSV。
- **依據**（研究 CSV 實算）：RAS 參賽件數／有獎牌／金牌，2024 年是 263／227（86%）／40（15%）；2025 年是 310／263（85%）／56（18%）；2026 年是 245／185（75%）／48（20%）。門檻 A 有 174 個獎、65 個參賽單位（合併同名店、扣掉製造商後估 40～50 家）；放寬到銀牌會變成 108 個，全部收會變成 123 個（RAS 103 個參賽單位大約 9 成上榜）。
- **使用者的想法**：以「冠軍店家」為單位，去店裡時看得到這家還有哪些值得買。
- **影響**：`DATA-SCHEMA.md` 第 5 節改成兩層；`UI-PLAN.md` 3.4 獎項明細分兩組；Step 1b 也要查證銀牌和第 2 名（只查已經過門檻的店）。

### D2：收哪些店（2026-10-27）

- **決定**：收有實體門市可以去的店，包括超市內烘焙（Adelaide's Finest、Coles Casuarina）和連鎖加盟店（Bakers Delight Lane Cove、Albion Park Rail）。後兩種**只收得獎的那一間**，不帶出同品牌其他分店，卡片加「超市內烘焙」「連鎖加盟店」標籤。製造商、批發（Tucker's Natural、Kurrajong Kitchen、Falcones、Woolworths 等）不收。
- **理由**：獎是那一間店的烘焙師做出來的，換一間分店水準不一定一樣；Coles Casuarina 是 NT 唯一的得獎者；加了標籤讀者可以自己判斷。
- **已知風險**：超市、連鎖店的烘焙師比較常換人。頁尾統一說明「獎項代表得獎當年那間店的水準」。
- **影響**：`DATA-SCHEMA.md` `scope` 欄位和第 5 節條件 5（這兩種的獎一定要對到門市）；`UI-PLAN.md` 3.4b 標籤。
- **補充（2026-10-27，篩第一批名單時）**：主業不是麵包店、甜點店、咖啡店的店不收，即使得獎品項是烘焙品。第一個案例是肉舖 Hungerford Meat Co（RAS 2024 豬肉派金牌）。

### D3：ASCA 等個人賽（2026-10-27）

- **決定**：第一版不收。咖啡店家獎先用 Golden Bean。
- **理由**：個人獎不是店家獎；官方多數沒寫任職店家（2025 只有 Barista 冠軍寫了 Axil）；選手會換工作；2024、2026 賽季沒有官方公告。
- **之後要加的話**：只收官方寫了任職店家的獎，卡片標「咖啡師個人獎（比賽當時任職）」，而且不能讓店家過門檻。欄位已經預留（`recipient_type = individual`）。
- **影響**：無。`DATA-SCHEMA.md` 第 5 節條件 8 本來就排除個人獎。

### D4：賽事範圍（2026-10-27）

- **決定**：第一版收 RAS Professional Bakery、NABC、Golden Bean。Golden Bean 收總冠軍，再加上 2024、2025 分類投影片轉錄的**金牌**；已經過門檻的店再補轉錄它的銀牌（D1「也推薦」）。只收澳洲的店（Golden Bean 是澳紐合辦）。RAS 咖啡賽、BAA 其他比賽等第一版上線後再評估。
- **理由**：D1 用金牌當門檻，Golden Bean 如果只收總冠軍，咖啡店只有大約 3～5 家，和「得獎咖啡與烘焙地圖」名不符實。
- **工作量**：轉錄兩年估 5～6 小時，由我讀圖，使用者抽查。2026 分類結果公布後再補。
- **影響**：Step 1b 的 Golden Bean 轉錄項目（`TODO.md`）照原計畫做，另外加一項「過門檻的店補轉錄銀牌」。

### D5：`award_attributions.csv` 獨立（2026-10-27）

- **決定**：保留分開，維持 7 個 CSV。
- **理由**：一個獎對到多間門市時（Adelaide's Finest 的兩家 Foodland），合併版要把同一個獎寫兩列，產生工具也會算成兩個獎。D2 規定超市、連鎖店的獎一定要對到門市，所以這種情況一定會遇到。
- **影響**：`DATA-SCHEMA.md` 照原設計。

### D6：徽章樣式（2026-10-27）

- **決定**：文字徽章。冠軍用 coral soft 底＋`--color-accent-strong` 字，金牌用 amber soft 底＋`--color-warning-text` 字，第 1 名用中性底。不用 🥇🥈🥉。「也推薦」（銀牌、第 2 名）只用文字，不加徽章。
- **理由**：🥇🥈🥉 在咖啡廳、烘焙頁代表 Google 評論前三名（`scripts/map-list.js` 的 `MEDALS`），而且會讓金牌和第 1 名看起來一樣；每個徽章都有文字，不是只靠顏色區分（WCAG 1.4.1）；不新增顏色 token。
- **影響**：`UI-PLAN.md` 3.3；Step 4 截圖後使用者確認顏色，再寫進 `DESIGN.md`。

### D7：SEO 靜態摘要（2026-10-27）

- **決定**：第一版不做。Step 7 再評估要不要讓產生工具把店家清單寫進 `index.html` 的標記區塊。`<title>`、description、canonical、Open Graph 照常在 Step 7 做。
- **理由**：個人網站，以自己探店為主；Google 會執行 JavaScript，看得到卡片；之後要加只需要改產生工具，頁面不用重做。
- **影響**：無。

### D8：JS 架構（2026-10-27）

- **決定**：方案 B。把 `map-list.js` 的通用外殼（約 300 行）拆到 `scripts/list-map-shell.js`，咖啡廳、烘焙頁和得獎頁都呼叫它。備用地圖縮放改成可以設定（`fallbackZoom`）。
- **理由**：只維護一份外殼；延續 2026-10-16 抽出 `map-list.js` 的做法；`DESIGN.md` 規定新清單地圖頁要重用、不要複製。
- **驗收**：Step 4a 單獨一個 commit；咖啡廳、烘焙頁 8 種狀態的頁面內容雜湊值要和拆之前完全相同。
- **影響**：Step 4a 要做（`TODO.md`）。
