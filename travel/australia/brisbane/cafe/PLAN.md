# 布里斯本咖啡廳地圖＋清單地圖共用化：開發計畫

- 日期：2026-10-16
- 狀態：**方向已和使用者逐題確認（第 1 節），已做 QA（第 6 節），尚未開工**
- 參考：`travel/australia/brisbane/bakery/`（PLAN.md、CANDIDATES.md、TOP3.md）、根目錄 `DESIGN.md`、`DECISIONS.md`、`AGENTS.md`

## 進度表

**接手時先看這裡**：找第一個不是 ✅ 的列，照「下一步」做。每完成一步就更新這張表（狀態、日期、commit、下一步），和那一步的程式放在同一個 commit。

| 步驟 | 內容 | 狀態 | 完成日期 | Commit | 下一步／備註 |
|---|---|---|---|---|---|
| 0 | 討論、寫計畫、QA | ✅ 完成 | 2026-10-16 | `a82de6d` | — |
| 1 | 工具進 repo（`travel/tools/`、`bakery/categories.csv`） | ✅ 完成 | 2026-10-16 | （本 commit） | 新工具產生的 `data.js` 和 repo 版本完全相同（`git diff` 0 行）；My Maps 匯入檔和 Downloads 的 `brisbane-bakery-mymaps-all-32.csv` 雜湊值相同。另外抽出 `list_data.py` 放兩支工具共用的 csv 讀取 |
| 2 | 抽出共用程式（`travel/shared/`、`bakery/page.js`） | ⬜ 未開始 | | | **從這裡開始**：照第 3 節步驟 2。產生指令見 `travel/tools/README.md`，這步要把 `--var` 預設改成 `PAGE_DATA`、拿掉 `--title`。需要使用者手動檢查列印 |
| 3 | 文件（DECISIONS.md、bakery/PLAN.md） | ⬜ 未開始 | | | |
| 4 | 咖啡廳候選調查（`cafe/CANDIDATES.md`） | ⬜ 未開始 | | | 可以分幾次做；做到一半時把已查的店家寫在這一列 |
| 5 | 使用者定案分類、區域、名單 | ⬜ 未開始 | | | 第 5 節「待決定」 |
| 6 | 咖啡廳 csv、前三名查核 | ⬜ 未開始 | | | 第 4 節 |
| 7 | 咖啡廳頁面、My Maps | ⬜ 未開始 | | | 第 4 節 |

狀態符號：⬜ 未開始、🔄 進行中、⏸️ 等使用者決定、✅ 完成

## 0. 背景

使用者想做「咖啡廳系列」，問是否開一個 `cafe/` 目錄照烘焙地圖做一次。討論後的結論是：

- 咖啡廳不能照搬烘焙「依品項分類」的做法，分類和前三名要重新設計。
- 烘焙頁的 `script.js`（771 行）和 `style.css`（1022 行）幾乎都是通用的，複製第二份會讓之後的修正都要改兩次，所以**先把程式抽成共用，再做咖啡廳**。

## 1. 決定紀錄（2026-10-16，逐題與使用者確認）

### 咖啡廳

| # | 問題 | 決定 | 影響 |
|---|---|---|---|
| 1 | 地圖重點 | **咖啡和早午餐並重** | 入選門檻：咖啡**或**早午餐其中一項有證據（榜單、評論）就可以。卡片有兩個前三名區塊：☕ 咖啡（招牌飲品＋豆子來源／烘焙商）、🍳 早午餐（招牌餐點，有供餐才顯示） |
| 2 | 和烘焙地圖重疊的店 | **不重複，但互相標註** | 每家只放一張主地圖：評論裡麵包品項被提到的次數多於咖啡和餐點，就放烘焙地圖，反過來就放咖啡廳地圖。在另一張地圖那邊也很有名的店（提及 ≥ 20 次，且提到它的評論平均 ≥ 4.5★），卡片加「☕ 咖啡也有名」或「🥐 麵包也有名」，點了跳到另一頁 |
| 3 | 規模 | **約 30 家** | 每個主分類 4～8 家，並且平均分到各區域 |
| 3b | 區域 | **先沿用烘焙的 6 區**（市中心周邊、北、西、南、東、郊外） | 咖啡廳可能集中在內城區，候選名單出來後再決定要不要把「市中心周邊」拆細 |

**主分類草案（待候選調查驗證後定案）**：01 精品咖啡（自家烘豆、手沖）、02 早午餐、03 抹茶／茶飲、04 亞洲風（日、韓、越南咖啡）、05 甜點咖啡廳。

**附加標記**（不當分類）：🌱 Vegan 友善（和烘焙共用）；🌅 景觀、💻 適合工作、🐶 寵物友善、⏰ 下午還開，都等調查完再決定要不要做。

### 共用架構

| # | 問題 | 決定 | 影響 |
|---|---|---|---|
| S1 | 共用程式放哪 | **`travel/shared/`** | 烘焙、咖啡廳共用，以後其他城市的清單地圖也能用。**Noosa 不動** |
| S2 | 每頁設定放哪 | **每頁一個手寫的 `page.js`** | 標題、試吃欄位、卡片區塊、跨頁連結都寫在這裡；`data.js` 只放店家資料 |
| S3 | 產生資料的工具 | **放進 repo 的 `travel/tools/`，共用一份** | 分類和中英對照改放在每頁的 `categories.csv`。**這推翻了烘焙 PLAN.md 第 8 節「不在 repo 放轉換腳本」的決定** |
| S4 | 執行順序 | **分 4 步、4 個 commit**，每一步完成後先給使用者看過 | 見第 3 節 |

## 2. 目標檔案結構

```
travel/
├── shared/
│   ├── map-list.js        ← 由 bakery/script.js 抽出，不含任何烘焙文字
│   └── map-list.css       ← 由 bakery/style.css 抽出
├── tools/
│   ├── make_data_js.py    ← csv（＋top3.csv、categories.csv）→ data.js
│   ├── make_mymaps.py     ← csv → Google My Maps 匯入檔
│   └── README.md          ← 用法：參數、輸出、改資料後要做的事
└── australia/brisbane/
    ├── bakery/
    │   ├── index.html     ← 改成載入 page.js、data.js、../../../shared/*
    │   ├── page.js        ← 新增：烘焙頁設定
    │   ├── categories.csv ← 新增：代碼、中文、英文
    │   ├── data.js        ← 產生，不手改
    │   ├── bakery.csv / top3.csv / *.md
    │   └── （刪除 script.js、style.css）
    └── cafe/
        ├── PLAN.md        ← 本檔
        └── （之後：CANDIDATES.md、cafe.csv、top3.csv、categories.csv、page.js、index.html）
```

HTML 載入順序（`file://` 也能用，不用 `fetch()`）：

```html
<link rel="stylesheet" href="../../../shared/map-list.css?v=…">
<script src="page.js?v=…"></script>                    <!-- var PAGE_CONFIG -->
<script src="data.js?v=…"></script>                    <!-- var PAGE_DATA -->
<script src="../../../shared/map-list.js?v=…"></script>
```

### page.js 要能設定的項目

目前寫死在 `bakery/script.js` 裡、和烘焙有關的部分：

| 現在的位置 | 內容 | 搬到 |
|---|---|---|
| `script.js:13,35` | 頁面標題（中、英） | `PAGE_CONFIG.ui.title` |
| `script.js:25,47` | 地圖 iframe 標題 | `PAGE_CONFIG.ui.mapTitle` |
| `script.js:21,43` | 試吃欄位（外觀、口感、香氣、回購） | `PAGE_CONFIG.tasting`（欄位清單＋中英標籤） |
| `script.js:28-31,50-53` | 頁尾說明裡的「款式」等名詞 | `PAGE_CONFIG.ui.footnote`，各頁可以覆寫 |
| `script.js:771` | `init(BAKERY_DATA)` | `init(PAGE_DATA, PAGE_CONFIG)` |
| `script.js:1-4` | 檔頭註解寫「布里斯本烘焙地圖」 | 改成通用說明 |
| `script.js:422` | 試吃花費固定顯示「AUD」 | `PAGE_CONFIG.currency`（共用程式放在 `travel/`，以後其他國家的頁面也會用到） |
| `index.html:7` | meta description 還寫「19 家」（現在是 32 家，舊資料沒更新） | 步驟 2 改 index.html 時順便修正 |

**不用搬的部分**：`'大家推薦'`（`script.js:376`）是 top3.csv 的判定值，咖啡廳沿用同一套判定，所以留在共用程式；優先級 A／B 也是兩頁通用。`localStorage` 的 `lang`、`theme` 兩個 key 本來就和 Noosa 共用，維持不變。

共用程式只放通用的文字（篩選、深淺色、列印等），每頁的 `PAGE_CONFIG.ui` 可以覆寫其中任何一項。

### make_data_js.py 要通用化的部分

| 現在寫死的 | 改成 |
|---|---|
| `CATEGORY_LABELS`、`CATEGORY_LABELS_EN` | 讀同一資料夾的 `categories.csv` |
| `REGIONS`、`REGIONS_EN` | 先放共用預設值，之後如果咖啡廳要細分市中心，再改成每頁可以設定 |
| 試吃欄位名稱（`外觀 1-5` 等） | 讀 csv 裡所有「試吃」相關欄位，或由參數指定 |
| `"title": "布里斯本烘焙地圖"` | 移到 `page.js`，data.js 不再放 |
| `var BAKERY_DATA` | `var PAGE_DATA` |
| My Maps 嵌入網址用第 3 個參數傳入 | 改成具名參數（例如 `--mymaps-url`），**仍然寫進 data.js**，這樣步驟 2 的 data.js 差異比較少 |
| `make_mymaps_v2.py` 的 `OLD_IDS` 和「只輸出新店」的第二個檔案 | 這是這次 19 → 32 家搬遷時才需要的，通用版拿掉，只輸出全部店家 |

## 3. 執行步驟

每一步各自一個 commit，完成後先給使用者看過，再進行下一步。

### 步驟 1：工具進 repo（烘焙頁不變）

1. 把 scratchpad 裡的 `make_data_js.py`、`make_mymaps_v2.py` 複製到 `travel/tools/`，依第 2 節通用化（這一步**先保留** `var BAKERY_DATA` 和 `title` 欄位，讓輸出不變）。
2. 新增 `bakery/categories.csv`（13 個分類，代碼、中文、英文）。
3. 寫 `travel/tools/README.md`。

**驗收**：用新工具重新產生 `bakery/data.js`，`git diff` 必須**完全沒有差異**；My Maps 匯入檔也和 Downloads 裡現有的 `brisbane-bakery-mymaps-all-32.csv` 比對，內容一致。

（QA 已確認基準可用：2026-10-16 用 scratchpad 裡的舊腳本重新產生，輸出和 repo 裡的 `data.js` 完全相同，Downloads 的匯入檔也還在。）

### 步驟 2：抽出共用程式（烘焙頁畫面不變）

1. `bakery/script.js` → `travel/shared/map-list.js`，烘焙專用的文字移到 `bakery/page.js`。
2. `bakery/style.css` → `travel/shared/map-list.css`。
3. 工具改輸出 `var PAGE_DATA`、拿掉 `title`；重新產生 data.js（**預期 diff 只有這兩處**）。
4. 改 `bakery/index.html` 的載入路徑，`?v=` 換新版號；刪掉 `bakery/script.js`、`style.css`。

**驗收**：改版前先用**線上版**截一組基準圖；改版後還沒 push，所以用**本機版**（`file://`，加上 `python -m http.server` 各一次）比對；push 之後再看一次線上版。

| 項目 | 方法 |
|---|---|
| 清單、卡片、前三名、標籤 | 基準截圖和本機版比對 |
| 分類 × 區域篩選、點分類標籤篩選、頂部 chip scroll-spy | 實際操作 |
| 中英切換、深淺色切換 | 兩種語言 × 兩種主題 |
| 📍 單店地圖、「回到全部店家」、My Maps 全覽 | 實際操作 |
| 手機寬度（底部抽屜） | 縮小視窗到 < 768px |
| 桌機 ‹ › 捲動按鈕、滾輪橫向捲動 | ≥ 768px 操作 |
| `file://` 直接開啟 | 本機開 `bakery/index.html`，確認相對路徑正確 |
| Console 沒有錯誤 | 讀 console |
| 列印 | 我沒辦法看列印預覽，請使用者按 🖨️ 確認（烘焙頁上線時也還沒檢查過列印） |
| CSS 色碼 | `map-list.css` 的 hex 色碼只能出現在 token 區（`:root` 和列印的 token 區），依 AGENTS.md |

**風險**：相對路徑（`../../../shared/`）在線上和 `file://` 都要正確；`?v=` 沒換的話，GitHub Pages 會繼續給舊的快取。

### 步驟 3：文件

1. 本檔的狀態改成「步驟 1、2 完成」。
2. `DECISIONS.md` 補「清單地圖共用架構」的紀錄（S1～S3），並檢查第 10、29、30 行提到 `script.js`、`style.css`、`bakery/` 的舊描述。
3. `bakery/PLAN.md` 第 8 節第 3 點（「不在 repo 放轉換腳本」）加註已改變，連到本檔。
4. `DESIGN.md:216` 用烘焙頁當 My Maps 的範例，路徑仍然正確，不用改；如果要記錄「清單地圖共用 `travel/shared/`」，就加在同一段。

### 步驟 4：咖啡廳候選調查

沿用烘焙 CANDIDATES.md 的方法：

1. **找候選店**：Broadsheet、Time Out、Urban List、Concrete Playground、Must Do Brisbane 的咖啡和早午餐榜單；Google 搜尋 `site:reddit.com/r/brisbane` 的摘要（Reddit 本身打不開）。
2. **Google Maps 確認**：總評分、評論數、營業狀態、最新 20 則的平均和低分則數、評論關鍵字。另外記錄**營業時間**（很多店下午 2～3 點就關門）和**豆子來源／烘焙商**。
3. **判定**：⭐／○／△／✗，標準和烘焙相同。
4. **分配主地圖**：比較評論裡麵包和咖啡、餐點各被提到幾次。如果候選店已經在烘焙清單裡，就照第 1 節第 2 題的規則判斷要不要移過來或只加跨頁標記。
5. 產出 `cafe/CANDIDATES.md`，包含每個主分類的家數和區域分布，**交給使用者定案分類和區域後**再建立 `cafe.csv`。

## 4. 之後的工作（這 4 步不做）

| 項目 | 前提 | 備註 |
|---|---|---|
| 咖啡廳 csv、top3.csv、前三名查核 | 步驟 4 定案 | 卡片分 ☕ 和 🍳 兩個區塊，和烘焙「依分類分區塊」的方式不同：top3.csv 要加一欄「區塊」，或用固定的區塊代碼，到時再定 |
| 咖啡廳頁面、My Maps | csv 完成 | 共用程式要支援「固定區塊」模式 |
| 🌱 Vegan 標記 | 共用架構完成 | 兩張地圖都要逐家查（Google 評論搜 vegan / dairy free / plant based＋官網菜單）。2026-10-16 抽查烘焙的 Beurre Pastries：沒有找到 vegan 的證據 |
| ☕／🥐 跨頁標記 | 兩張地圖都上線 | 連結格式例如 `../cafe/#<店家 ID>`；共用程式目前**沒有**讀網址 hash 的功能，要新增「讀 hash 並捲到那張卡片」 |
| vegan 專門烘焙店 | — | 搜尋時看到 VeganYumm（北區，全 vegan），還沒查核 |

## 5. 待決定

- 咖啡廳主分類的最終名單（步驟 4 之後）
- 「市中心周邊」要不要拆細（步驟 4 之後）
- 卡片 ☕／🍳 區塊在 top3.csv 的格式（建 csv 之前）
- 咖啡廳的試吃欄位（例如酸度、口感、餐點、回購）
- 咖啡廳的店家 ID 格式：烘焙用 `B01`。咖啡廳如果用 `C01`，會和優先級「C」混淆，建議用 `F01` 或 `CF01`（建 csv 之前決定）

## 6. QA 紀錄（2026-10-16）

| # | 檢查項目 | 結果 | 處理 |
|---|---|---|---|
| 1 | 日期 | 初稿寫成 2026-10-17，但 git commit 時間是 2026-10-16（+10:00） | 已改成 10-16。另外 bakery 的 `CANDIDATES.md`、`top3.csv`、`TOP3.md` 和 `DECISIONS.md` 共 59 處也寫成 10-17，已一併改成 10-16（`index.html` 的 `?v=20261017a` 只是快取版號，不改） |
| 2 | 第 2 節列的 `script.js` 行號 | 13、35、25、47、21、43、28-31、50-53、771 都核對過，正確 | — |
| 3 | 是否漏列烘焙專用的程式 | 漏了檔頭註解、`AUD` 幣別、index.html 的「19 家」 | 已補進第 2 節表格 |
| 4 | 步驟 1「data.js 完全一樣」做得到嗎 | 用舊腳本重新產生，輸出和 repo 的 data.js 完全相同 | 已註明在步驟 1 |
| 5 | 相對路徑 `../../../shared/` | 從 `brisbane/bakery/` 往上三層到 `travel/`，正確 | — |
| 6 | 步驟 2 的驗收能不能執行 | 初稿寫「線上版改版前後比對」，但改版後還沒 push，線上看不到 | 改成：線上基準 → 本機比對 → push 後再看線上 |
| 7 | 步驟 2「data.js 差異只有兩處」 | 初稿同時寫「嵌入網址可能移到 page.js」，兩者矛盾 | 定為嵌入網址留在 data.js，改用具名參數 |
| 8 | AGENTS.md 色碼規定 | `style.css` 的 98 個 hex 都在 token 區（`:root`、深色、列印 token） | 加進步驟 2 驗收 |
| 9 | 文件引用 | `DECISIONS.md` 第 10、29、30 行和 `DESIGN.md:216` 有提到烘焙頁的檔案 | 步驟 3 改成具體列出 |
| 10 | My Maps 工具 | `make_mymaps_v2.py` 有只在這次搬遷才需要的 `OLD_IDS` | 通用版拿掉 |
| 11 | 跨頁連結的 ID 範例 `C05` | 會和優先級 C 混淆；共用程式目前也沒有讀 hash 的功能 | 範例改掉，ID 格式列入待決定 |
| 12 | 列印 | 烘焙頁上線時就沒檢查過列印，我也看不到列印預覽 | 步驟 2 驗收請使用者手動確認 |
