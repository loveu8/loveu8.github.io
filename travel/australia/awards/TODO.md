# 澳洲得獎咖啡與烘焙地圖：待辦清單

- 建立：2026-10-26
- 用法：做完一項就打勾（`- [x]`），和那一項的程式放在同一個 commit。每個 Step 全部打勾後，再更新 `PLAN.md` 進度表那一列（狀態、日期、commit）。
- 每個 Step 的目標、風險和驗收條件寫在 `PLAN.md` 第 5 節；這份只放要做的事。
- 標 👤 的項目要使用者做或決定。

## Step 0：既有專案盤點 ✅

- [x] 讀 `AGENTS.md`、`DESIGN.md`、`DECISIONS.md`
- [x] 讀首頁、`styles/` 共用 CSS、`scripts/site.js`、`scripts/map-list.js`
- [x] 讀咖啡廳、烘焙頁（`index.html`、`page.js`、CSV、`PLAN.md`）
- [x] 讀 `travel/tools/`（README、三支 Python）
- [x] 確認 GitHub Pages 設定（legacy 建置，`main` 分支根目錄）
- [x] 結論寫進 `PLAN.md` 第 1 節

## Step 1：官方賽事研究（第一輪）✅

- [x] Sydney Royal Professional Bakery：myRAS 2024–2026 逐筆成績 → `research/ras_professional_bakery_2024-2026.csv`
- [x] Sydney Royal：2025、2026 冠軍、獎牌分數門檻
- [x] NABC 2024–2026 官方結果 → `research/nabc_results_2024-2026.csv`
- [x] Golden Bean 2024、2025 冠軍；2025 Category 1 抽樣
- [x] ASCA 官網公告（只有 2025）
- [x] 原始 12 家候選查證 → `CANDIDATES.md`
- [x] 覆蓋矩陣、來源衝突、研究缺口 → `RESEARCH.md`

## 待決定（一次一題）

- [x] 👤 D1：上網站的獎項等級 → 冠軍＋金牌＋第 1 名當店家門檻；過門檻的店，銀牌＋第 2 名列為「也推薦」（2026-10-27）
- [x] 👤 D2：收哪些店 → 有門市的都收；超市內烘焙、連鎖加盟店只收得獎的那一間並加標籤；製造商、批發不收（2026-10-27）
- [x] 👤 D3：ASCA 等個人賽 → 第一版不收（2026-10-27）
- [x] 👤 D4：賽事範圍 → RAS、NABC、Golden Bean（總冠軍＋分類金牌轉錄）（2026-10-27）
- [x] 👤 D5：`award_attributions.csv` → 獨立，7 個 CSV（2026-10-27）
- [x] 👤 D6：徽章樣式 → 文字徽章（冠軍 coral、金牌 amber、第 1 名中性），不用 🥇；「也推薦」只用文字（2026-10-27）
- [x] 👤 D7：SEO 靜態摘要 → 第一版不做，Step 7 再評估（2026-10-27）
- [x] 👤 D8：JS 架構 → 方案 B，拆出 `list-map-shell.js`（2026-10-27）
- [x] 每個決定寫進 `PLAN.md` 第 10 節決定紀錄

## Step 1b：研究補完

- [x] 依 D1、D2 篩出第一批店家，名單寫進 `CANDIDATES.md` 2.5 節（烘焙 46、咖啡 5；2026-10-27）
- [x] 每家查實體門市：官網門市頁、Google Maps 地址、座標、營業狀態，記查核日期（51 家，2026-10-28）
- [x] 多門市品牌（Bonfire Bread、Burleigh Baker、Wholegreen）：每個獎對到哪間門市，對不到就記在品牌（2026-10-28）
- [x] 同名店確認：Piece of Cake Bakery、Wandin Bakery、Sourdough Portland（2026-10-28；另查 Ottimo、Country Cob、The Beekeeper's）
- [ ] 上線前再確認 PARTIAL 的 7 家：ISEO、Cacao、The Beekeeper's Bakery、White Horse、The Bean Cartel、Latitude、The Purple Haze；Crois 官網
- [x] Golden Bean 2024 分類投影片：只轉錄金牌 → `research/golden_bean_gold_2024-2025.csv`（11 類 14 面，2026-10-28）
- [x] Golden Bean 2025 分類投影片：只轉錄金牌 → 同一份 CSV（11 類 11 面，2026-10-28）
- [x] Golden Bean 金牌得主：篩出澳洲的，查有沒有咖啡廳或門市（新增 4 家 VERIFIED，2026-10-28）
- [x] Golden Bean 已過門檻的店：補轉錄它的銀牌（D1「也推薦」）→ `research/golden_bean_silver_selected_2024-2025.csv`（5 家共 31 面，2026-10-28）
- [x] 檢查 Golden Bean 2026 結果頁是否已公布 → 2026-10-28 還沒有（`/pages/2026-winners` 404；首頁只寫總冠軍 Sam Shih, Espresso Club Australia）。之後每月再看一次
- [ ] RAS 2024 冠軍：找 2024 冠軍手冊存檔（Wayback）
- [ ] 👤 要不要寫信問 RAS 2024 冠軍紀錄
- [ ] 重要官方頁存 Wayback，網址記下來
- [ ] 更新 `CANDIDATES.md`：第一批每家都是獎項 VERIFIED＋門市 VERIFIED，或寫明不收的原因
- [ ] 更新 `RESEARCH.md` 覆蓋矩陣

## Step 2：CSV 欄位定案

- [ ] 依 D5 確定 `DATA-SCHEMA.md` 的欄位
- [ ] 建 7 個 CSV（標題列）
- [ ] `competitions.csv`：RAS-PB、NABC、GBA
- [ ] 填 5 家試驗資料：Bonfire Bread、Burleigh Baker、Three Mills Bakery、Adelaide's Finest（看 D2）、Glee Coffee Roasters
- [ ] 檢查：每種情況（多門市、個人代表店家、冠軍、金牌、名次）都有欄位可以記
- [ ] 👤 看過試驗資料

## Step 3：資料產生工具

- [ ] 寫 `travel/tools/make_awards_data.py`（只 import `list_data.read_csv`，不改 `list_data.py`）
- [ ] 實作 `DATA-SCHEMA.md` 第 6 節的每一項檢查
- [ ] 每項檢查都用一份故意寫錯的小 CSV 測過會報錯
- [ ] 有 ERROR 時不寫 `data.js`、結束碼非 0
- [ ] 輸出摘要：各狀態獎項數、上網站／沒上網站的數量和原因、各州店家數
- [ ] `--mymaps-out` 輸出 My Maps 匯入檔
- [ ] 5 家試驗資料產生 `data.js`
- [ ] 重跑咖啡廳、烘焙頁的 `make_data_js.py`，`git diff` 必須 0 行
- [ ] 更新 `travel/tools/README.md`
- [ ] （選用）`import_ras_results.py`：研究 CSV → `awards.csv` 草稿列

## Step 4a：拆出共用外殼（D8 = B，要做）

- [ ] 改之前：線上版咖啡廳、烘焙頁 8 種狀態的頁面內容雜湊值和截圖當基準
- [ ] 新增 `scripts/list-map-shell.js`（抽屜、拖曳、地圖嵌入、chip strip、scroll-spy、回到頂部、lightbox）
- [ ] 備用地圖縮放改成可設定（`fallbackZoom`）
- [ ] `scripts/map-list.js` 改成呼叫外殼
- [ ] 咖啡廳、烘焙 `index.html` 載入新檔，`?v=` 改新
- [ ] 本機比對雜湊值，和基準完全相同
- [ ] Console 無錯誤
- [ ] `python tools/check_tokens.py` 無 ERROR
- [ ] `DESIGN.md` 依賴表加 `list-map-shell.js`
- [ ] 👤 `file://` 直接開兩頁確認

## Step 4：頁面原型

- [ ] `travel/australia/awards/index.html`（外殼照咖啡廳，路徑用 `../../../`）
- [ ] `page.js`：中英介面文字、品項類別對照、`fallbackPlace`
- [ ] `scripts/awards.js`：卡片、最高榮譽徽章、獎項摘要、獎項明細 `<details>`、門市列表
- [ ] 州別、類型兩列篩選
- [ ] `styles/awards.css`：搜尋框、更多篩選、徽章、獎項明細、門市列表（只用 token）
- [ ] `python tools/check_tokens.py` 無 ERROR
- [ ] 截圖：360px、768px、1280px × 中英 × 深淺色
- [ ] 鍵盤可以操作所有控制
- [ ] Console 無錯誤
- [ ] 👤 看截圖，確認徽章和版面
- [ ] `DESIGN.md`：搜尋框、獎項徽章、兩層篩選、依賴表加新頁（使用者確認後）

## Step 5：搜尋與篩選

- [ ] 寫測試案例表（至少 10 組條件和預期家數），特別是「同一個獎要同時符合年份＋等級」
- [ ] 關鍵字搜尋（店名、城市、suburb、產品；去重音；150ms 延遲）
- [ ] 選州別後出現城市列
- [ ] 更多篩選：賽事、年份、獎項等級、品項類別
- [ ] 按鈕家數、0 家停用
- [ ] 結果列、✕ 全部清除
- [ ] 網址參數 `?state=…&year=…` 讀寫
- [ ] 符合條件的獎項自動展開、排在前面
- [ ] 用 node 跑篩選函式，測試案例全部符合

## Step 6：地圖

- [ ] 產生 My Maps 匯入檔
- [ ] 👤 My Maps 建新地圖、匯入、依主類型上色、設全澳預設畫面
- [ ] 👤 開「知道連結的人都可以查看」，把嵌入網址給我
- [ ] 嵌入網址寫進產生工具參數，重新產生 `data.js`
- [ ] 確認總覽點數 = `data.js` 門市數
- [ ] 每個 📍 對到正確地點
- [ ] 每個 ↗ Maps 搜尋結果是那間店
- [ ] 查 My Maps 匯入筆數上限，寫進 `UI-PLAN.md`

## Step 7：完整資料、中英文、SEO、首頁

- [ ] 第一批全部店家寫進 CSV
- [ ] `make_awards_data.py` 無 ERROR、無 WARNING
- [ ] 英文介面文字完整
- [ ] `<title>`、description、canonical、Open Graph
- [ ] 頁尾說明：資料來源、NSW 偏差、金牌≠名次、篩選只作用在清單
- [ ] 首頁「旅行與探店」加入口（`index.html`）
- [ ] 首頁英文（`scripts/home.js` 翻譯表）
- [ ] `DECISIONS.md` 新增決定紀錄
- [ ] （看 D7）SEO 靜態摘要

## Step 8：QA 與上線

- [ ] 跑完 `PLAN.md` 第 6 節 16 項檢查表，逐項記結果
- [ ] 做不到的明確標「未測」
- [ ] 👤 iPhone 實機
- [ ] 👤 列印
- [ ] 👤 同意 push
- [ ] push 後看線上版：Network 沒有 404、`?v=` 生效、首頁入口正常
- [ ] `PLAN.md` 狀態改成「已完成」

## 上線後

- [ ] 👤 要不要每年更新（RAS 9 月、NABC 6–7 月、Golden Bean 6 月公布）
- [ ] 之後的擴充候選：RAS Champion Coffee、BAA 其他賽事（Pie、Donut、各州 Baking Show）、和布里斯本咖啡廳頁互相標註（Espresso Club、Bellissimo）
