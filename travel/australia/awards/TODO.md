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
- [x] 👤 D7：SEO 靜態摘要 → 第一版不做，Step 6（原 Step 7）再評估（2026-10-27）
- [x] 👤 D8：JS 架構 → 方案 B，拆出 `list-map-shell.js`（2026-10-27）
- [x] 每個決定寫進 `PLAN.md` 第 10 節決定紀錄

## Step 1b：研究補完

- [x] 依 D1、D2 篩出第一批店家，名單寫進 `CANDIDATES.md` 2.5 節（烘焙 46、咖啡 5；2026-10-27）
- [x] 每家查實體門市：官網門市頁、Google Maps 地址、座標、營業狀態，記查核日期（51 家，2026-10-28）
- [x] 多門市品牌（Bonfire Bread、Burleigh Baker、Wholegreen）：每個獎對到哪間門市，對不到就記在品牌（2026-10-28）
- [x] 同名店確認：Piece of Cake Bakery、Wandin Bakery、Sourdough Portland（2026-10-28；另查 Ottimo、Country Cob、The Beekeeper's）
- [ ] 上線前再確認 PARTIAL 的 8 家：ISEO、Cacao、The Beekeeper's Bakery、White Horse、The Bean Cartel、Latitude、The Purple Haze、Riviera Bakery（2026-11-02 加入，查有沒有零售櫃台）；Crois 官網
- [x] Golden Bean 2024 分類投影片：只轉錄金牌 → `research/golden_bean_gold_2024-2025.csv`（11 類 14 面，2026-10-28）
- [x] Golden Bean 2025 分類投影片：只轉錄金牌 → 同一份 CSV（11 類 11 面，2026-10-28）
- [x] Golden Bean 金牌得主：篩出澳洲的，查有沒有咖啡廳或門市（新增 4 家 VERIFIED，2026-10-28）
- [x] Golden Bean 已過門檻的店：補轉錄它的銀牌（D1「也推薦」）→ `research/golden_bean_silver_selected_2024-2025.csv`（5 家共 31 面，2026-10-28）
- [x] 檢查 Golden Bean 2026 結果頁是否已公布 → 2026-10-28 還沒有（`/pages/2026-winners` 404；首頁只寫總冠軍 Sam Shih, Espresso Club Australia）。之後每月再看一次
- [x] RAS 2024 冠軍：找 2024 冠軍手冊存檔（Wayback）→ 找到，4 筆改 VERIFIED（2026-10-28）
- [x] ~~👤 要不要寫信問 RAS 2024 冠軍紀錄~~ → 不用了，存檔已確認
- [x] 重要官方頁存 Wayback，網址記下來 → 已有存檔的 11 個記在 `RESEARCH.md`「Wayback 存檔」（2026-10-28）
- [ ] 👤 還沒存的 28 個網址要使用者自己送（Claude Code 自動權限檢查擋下代送）；清單在 `RESEARCH.md`「Wayback 存檔」
- [x] 更新 `CANDIDATES.md`：第一批每家都是獎項 VERIFIED＋門市 VERIFIED，或寫明不收的原因 → 2.6 節最終名單（38 品牌、65 門市，2026-10-28）
- [x] 更新 `RESEARCH.md` 覆蓋矩陣（2026-10-28）

Step 1b 還沒打勾的兩項（PARTIAL 再查、使用者送 Wayback）留到 Step 8 上線前，不擋 Step 2。

## Step 2：CSV 欄位定案

- [x] 依 D5 確定 `DATA-SCHEMA.md` 的欄位（定案 v1，差異見第 7 節，2026-10-28）
- [x] 建 7 個 CSV（2026-10-28）
- [x] `competitions.csv`：RAS-PB、NABC、GBA
- [x] 填 5 家試驗資料：Bonfire Bread、Burleigh Baker、Three Mills Bakery、Adelaide's Finest、Glee Coffee Roasters（17 門市、88 獎、13 來源；由研究 CSV 用一次性腳本轉出，腳本在 scratchpad，沒進 repo）
- [x] 檢查：每種情況都有欄位可以記：多門市（Bonfire 4、Three Mills 5）、超市專櫃（Bonfire ×3、Majura Park）、超市內烘焙（Adelaide's Finest ×2）、烘焙廠不上地圖（Burleigh Varsity Lakes）、獎對到門市（Bonfire NABC）、個人代表店家（NABC「人名 - 店名」）、冠軍、金銀牌、名次、烘豆商自營咖啡店（Glee）
- [x] 👤 決定 Ottimo、Country Cob 收不收 → 先不收（D9，2026-10-28）
- [x] 👤 決定工廠門市的標籤文字 →「工廠門市 · Factory shop」（2026-10-28，記在 `UI-PLAN.md` 3.4b）
- [x] 👤 看過試驗資料（2026-10-29；Glee HQ 改標 `factory_shop`）

## Step 3：資料產生工具

- [x] 寫 `travel/tools/make_awards_data.py`（只 import `list_data.read_csv`，不改 `list_data.py`）
- [x] 實作 `DATA-SCHEMA.md` 第 6 節的每一項檢查（另補型別、ID 開頭等 4 列，見第 6 節表格）
- [x] 每項檢查都用一份故意寫錯的小 CSV 測過會報錯 → `travel/tools/tests/`，56 個測試（使用者 2026-10-29 決定留在 repo）
- [x] 👤 `category_group` 手填＋班名關鍵字交叉比對（WARNING）（使用者 2026-10-29 選 B）
- [x] 有 ERROR 時不寫 `data.js`、結束碼非 0
- [x] 輸出摘要：各狀態獎項數、上網站／沒上網站的數量和原因、各州店家數
- [x] `--mymaps-out` 輸出 My Maps 匯入檔
- [x] 5 家試驗資料產生 `data.js`（5 家、16 門市、88 獎全部上網站）
- [x] 重跑咖啡廳、烘焙頁的 `make_data_js.py`，`git diff` 必須 0 行
- [x] 更新 `travel/tools/README.md`
- [ ] （選用）`import_ras_results.py`：研究 CSV → `awards.csv` 草稿列

## Step 4a：拆出共用外殼（D8 = B，要做）

- [x] 改之前：咖啡廳、烘焙頁的頁面內容雜湊值和截圖當基準（本機 `a88ba70`，和線上版相同；每頁 25 種狀態）
- [x] 新增 `scripts/list-map-shell.js`（抽屜、拖曳、地圖嵌入、chip strip、scroll-spy、回到頂部、lightbox）
- [x] 備用地圖縮放改成可設定（`fallbackZoom`）
- [x] `scripts/map-list.js` 改成呼叫外殼
- [x] 咖啡廳、烘焙 `index.html` 載入新檔，`?v=` 改新
- [x] 本機比對雜湊值，和基準完全相同（50/50）
- [x] Console 無錯誤
- [x] `python tools/check_tokens.py` 無 ERROR
- [x] `DESIGN.md` 依賴表加 `list-map-shell.js`
- [x] 👤 `file://` 直接開兩頁確認（2026-10-31 使用者確認 OK）

## Step 4：頁面原型

- [x] 👤 卡片版面討論（scratchpad demo，一次一題）：門市列表、介紹位置、摘要文字、店家類型標籤（`UI-PLAN.md` 3.5、3.6；2026-10-31）
- [x] `travel/australia/awards/index.html`（外殼照烘焙頁，路徑用 `../../../`；2026-10-31）
- [x] `page.js`：中英標題、類型篩選分組（烘焙；咖啡 = 烘豆＋咖啡廳）、`fallbackPlace` Australia＋`fallbackZoom` 4。品項類別對照留到 Step 5（更多篩選才用得到）
- [x] `scripts/awards.js`：卡片、最高榮譽徽章、獎項摘要、獎項明細 `<details>`（介紹在第一段）、門市列表（前 2 間＋收起來、得獎門市排前面）；展開狀態在篩選、切換語言後保留
- [x] 👤 使用者看原型後提出「不知道吃哪一個」→ 卡片加「得獎品項」（前 3 項＋拿過的獎＋最近年份；demo 比較後選 B、只加最近一次年份；`UI-PLAN.md` 3.7；2026-10-31）
- [x] 州別、類型兩列篩選（按鈕家數、0 家停用）
- [x] 👤 使用者提出：點州別時地圖移到那個州 → 選 A（直接移動；`list-map-shell.js` 加 `showArea()`；`DESIGN.md` map-interaction rule 加例外；2026-10-31）
- [x] `styles/awards.css`：徽章、獎項摘要與明細、門市列表（只用 token）。搜尋框、更多篩選移到 Step 5 一起做
- [x] `python tools/check_tokens.py` 無 ERROR
- [x] 截圖：360px、768px、1280px × 中英 × 深淺色（2026-11-02 用最新版重拍 12 種組合＋手機抽屜打開、往下捲收起、獎項明細展開；無 console 錯誤、無橫向捲動）
- [x] 鍵盤可以操作所有控制（2026-11-02 實測：Tab 順序合理、每個控制都有焦點框；Enter／Space 開關明細、📍 移動地圖。修正：選篩選後焦點掉回頁首 → 重畫後放回同一顆按鈕。Google 地圖 iframe 吃約 8 次 Tab，改不了）
  - [ ] 類型篩選是 `role="tab"` 但不能用左右鍵切換 → Step 5 做篩選時一起處理（咖啡廳、烘焙頁同樣問題）
- [x] Console 無錯誤（上面 8 種畫面＋篩選、📍 操作）
- [x] 👤 看截圖，確認徽章和版面（2026-11-01，看 12 張截圖的 5 個重點，3 個用 demo 選定後改好）：
  - [x] 第 1 名徽章灰 → 藍（藍、紫、深色實心三選一；澳洲農展會第 1 名是藍彩帶；`UI-PLAN.md` 3.3；a68eba0）
  - [x] 獎項明細太長 → C 品項優先＋班名縮短＋也推薦收起（2092 → 約 980px；`UI-PLAN.md` 3.4；d51a6c5）；順手修查證日期斷行
  - [x] 手機清單只剩 340px → C 往下捲收起標題和篩選（490px；`UI-PLAN.md` 4.2；f0e1d5d）；行為實測 13 項通過
  - [x] 點州別地圖移動：正常
  - [x] 5 家有 4 家是冠軍徽章、第 1 名徽章沒用到 → 2026-11-02 完整資料：冠軍 11、金牌 21、第 1 名 2（Coles、Sourdough Portland）；使用者看實際卡片後確認維持
- [x] `DESIGN.md`：獎項徽章（第 1 名藍色要標成「藍色 = 導覽」的例外）、手機往下捲收起、依賴表加新頁、重畫後保留焦點（2026-11-02 使用者確認；`DECISIONS.md` 加藍色徽章一列）。搜尋框、兩層篩選移到 Step 5 做完再寫

## Step 5：搜尋與篩選

- [x] 👤 進階篩選只看招牌獎（冠軍、金牌、第 1 名），銀牌、第 2 名不算（2026-11-02 使用者選 A；`UI-PLAN.md` 第 5 節）
- [x] 寫測試案例表（至少 10 組條件和預期家數），特別是「同一個獎要同時符合年份＋等級」（25 組＋按鈕家數，`UI-PLAN.md` 5.1；手算後用獨立腳本核對；使用者 2026-11-02 確認，含 #21 關鍵字和年份不必同一個獎）
- [x] 篩選規則拆成 `scripts/awards-filter.js`（不碰 DOM），`awards.js` 改用它；改前改後 8 種狀態 DOM 雜湊相同
- [x] 關鍵字搜尋（店名、城市、suburb、產品；去重音；150ms 延遲）；✕ 和 Esc 清除
- [x] 選州別後出現城市列（換州別時城市清掉）
- [x] 更多篩選：賽事、年份、獎項等級、品項類別（只列有招牌獎的值；品項中英名在 `page.js` `itemGroups`）
- [x] 按鈕家數、0 家停用
- [x] 結果列、✕ 全部清除（「另有 N 個條件」；英文 1 shop／N shops）
- [x] 網址參數 `?state=…&year=…` 讀寫（`replaceState`；不存在的值丟掉並從網址移除；有進階條件時自動展開更多篩選）
- [x] 符合條件的獎項自動展開、排在前面（左邊 accent 邊線＋螢幕閱讀器文字「符合篩選」）
- [x] 類型篩選左右鍵、Home／End（roving tabindex）
- [x] 本機行為檢查 38 項通過（scratchpad 腳本），無 console 錯誤
- [x] 👤 看截圖；手機 360×640 清單只剩 250px（更多篩選展開 80px）→ 對比網頁比較 A／B，使用者選 A 維持（`UI-PLAN.md` 4.2）；結果列縮短文字，中文 360px 一行（英文 390px 以上一行）
- [x] `DESIGN.md`：搜尋框、兩層篩選、tablist 左右鍵（2026-11-02 使用者確認）
- [x] 用 node 跑篩選函式，測試案例全部符合（`travel/tools/tests/awards_filter.test.js`，31 個測試通過）

> **2026-11-02 流程調整**：原 Step 7（完整資料）提前成 Step 6，原 Step 6（地圖）變成 Step 7，首頁入口移到 Step 8。理由：My Maps 是匯入當下的快照，資料補齊後只要匯入一次（使用者選 A）。

## Step 6：完整資料、中英文、SEO（原 Step 7）

- [x] 👤 決定 RAS 對照表沒涵蓋的班別歸哪一類（2026-11-02 使用者選 A：新增 `tart_choux`「塔／泡芙」收 Shortcrust、Choux；Filo → `pastry_pie`；Creative → `viennoiserie`。`GROUP_KEYWORDS`＋測試 57 個通過；`page.js` 品項名；`DATA-SCHEMA.md` 2.4）
- [x] 店家介紹改寫成店家特色，不重複卡片上已有的城市、門市數（試驗 5 家 2026-11-02 改好、使用者確認語氣；每句有來源，寫在 `businesses.csv` 備註欄）
- [ ] 第一批全部店家寫進 CSV（`CANDIDATES.md` 2.6：36 家、61 間門市）；介紹照試驗 5 家的寫法：一句、講特色、附來源
  - [x] 第 1 批 10 家（2026-11-02，7952456）：Gumnut、Wholegreen、Slowbreads、Crois、Parfait、Hearthe、Sacrebleu!、Madame and Yves、Sébastien Sans Gluten、Tuga → 累計 15 家、35 門市、222 獎。RAS 冠軍重新打開官方 PDF 核對（2024 手冊 p.16、2025 目錄 p.12、2026 手冊 p.11–12）。產生工具加「已確認不同店」備註（Tuga 同一棟兩間店）
  - [x] 第 2 批（2026-11-02）：Hudson's、Doughheads、Bakehouse Delights、Sweet Ivy、Bakealicious、V's Dessert、Pudding Lane、Comeco、Forestway Fresh、Bakers Delight（一個品牌、兩間得獎加盟店，獎掛到門市；Bowral 沒過門檻不收）→ 累計 25 家、46 門市、265 獎。Doughheads 的 RAS 2025 參賽名稱是 MilkJam Co（生產者欄寫 DOUGHHEADS），收進並寫歸屬備註
  - [x] Doughheads 上線前再確認營業 → 2026-11-02 Google Maps 營業中、地址相同
  - [x] 第 3 批（2026-11-02）：VIC 4 家（Brazen Brownies、Piece of Cake、Wandin、Sourdough Portland）、NT Coles（Casuarina，烘焙師 staff_entry 掛到門市）、咖啡 4 家（Peak、Coffee Mentality、O'GaBee、Coffee Presto；烘焙廠兼咖啡店比照 Glee HQ 標工廠門市）→ 累計 34 家、60 門市、314 獎；新增來源 NABC 2024＋金豆賽 11 個分類
  - [x] 👤 Riviera Bakery（SA）：多個來源說是批發麵包廠 → 使用者 2026-11-02 選 A，先不收，改列 PARTIAL，和 Step 1b 的 7 家一起在上線前用 Chrome 再查（`CANDIDATES.md` 2.6）
  - [x] 上線前再查的門市（2026-11-02 Step 8，無頭 Chrome 查 Google Maps）：Coffee Mentality Google Maps 只有 3 間（就是收的 3 間），維持；**Coffee Presto Annandale Central 有自家濃縮咖啡吧 → 補上**（使用者選 A，My Maps 重新匯入 61 間，舊 60 間圖層由使用者刪除）；Wandin Bakery 店名在 Google Maps 就是 Wandin Bakery
  - [ ] 手機副標題「34 家 · 60 間門市 · 官方結果 2024–2026」折行時把年份切開
- [ ] Burleigh Baker 門市重查：報導（BOQ、2026）說另有 Tweed Heads 門市（NSW）、Harris Farm Isle of Capri 專櫃、Currumbin 總部；目前只收 Burleigh Heads、Paradise Point（專櫃照 D2 要收；總部看是不是門市）
- [ ] `make_awards_data.py` 無 ERROR、無 WARNING
- [x] 篩選測試不怕補資料：25 組案例改跑在 5 家試驗資料的凍結副本 `awards_filter_fixture.js`（使用者 2026-11-02 選 A，不重算）；另加 5 個讀真實 `data.js` 的檢查，node 測試 36 個通過
- [x] 👤 回頭看 Step 4 截圖第 2 點：冠軍徽章是不是太多、第 1 名徽章有沒有用到（2026-11-02 確認維持，見 Step 4）
- [x] 完整資料的截圖：12 種組合無 console 錯誤、無橫向捲動；手機副標題改成在「 · 」之間換行（年份不再被切開）
- [x] 英文介面文字完整（腳本比對中英 key 全部對上；34 家都有中英介紹）
- [x] `<title>`、description、canonical、Open Graph（沒有分享圖，og:image 先不放；全站第一個有 OG 的頁面）
- [x] 頁尾說明：資料來源、NSW 偏差（38/60 門市）、咖啡店多在昆士蘭（8/12）、金牌≠名次、篩選只作用在清單、資料整理日期；改成條列（eb6837d）
- [x] `DECISIONS.md` 新增決定紀錄（2026-11-02 的 6 個：進階篩選只看招牌、手機更多篩選維持 A、先補資料再做地圖、塔／泡芙、測試固定資料、Riviera 先不收）
- [x] 👤（看 D7）SEO 靜態摘要 → 2026-11-02 再評估，使用者選 A：第一版維持不做（Googlebot 會執行 JavaScript，`data.js` 是同站靜態檔；分享預覽靠 Open Graph）

## Step 7：地圖（原 Step 6）

- [x] 產生 My Maps 匯入檔的指令可用（2026-11-02 用 5 家試驗資料跑過：16 列；`data.js` 不變。PowerShell 5.1 會吃掉空字串參數，`--mymaps-url ""` 要整個省略）
- [x] 確認 My Maps 嵌入網址接受 `&ll=…&z=…`（2026-11-02 用布里斯本烘焙地圖實測：雪梨 z10、全澳 z4 正確，點都還在）
- [x] 查 My Maps 匯入筆數上限，寫進 `UI-PLAN.md`（官方：一次匯入不超過 2,000 列）
- [x] 👤 決定 My Maps 點開後的資訊和語言 → 2026-11-02 看 A／B／C 對比網頁後選 A 中英並列；標題「店名 · 門市」、摘要拿掉「也推薦」、加前 3 個得獎品項（Python 版和頁面 JS 版逐家比對，34 家一致）；測試 62 個通過
- [x] 用完整資料重新產生匯入檔：`Downloads\australia-awards-mymaps.csv`，60 列（2026-11-02）
- [x] My Maps 建地圖、匯入（使用者在選檔視窗選檔，其餘用 Claude in Chrome 操作）、依「類型 Type」上色（烘焙 48 珊瑚紅、咖啡 12 深棕）、圖層「得獎店家 60 間（依類型）」、設預設畫面（2026-11-02）
- [x] 👤 開「知道連結的人都可以查看」（分享權限變更由使用者自己按；不開放搜尋），嵌入關掉擁有者頭像（`noprof=1`）；沒登入也看得到
- [x] 嵌入網址寫進產生工具參數，重新產生 `data.js`；總覽固定 `&ll=-25.5,142&z=4`（My Maps 預設畫面在窄地圖框裡太小；中心偏東讓手機框得住 Darwin～東岸）。`list-map-shell.js` 組州別網址時先換掉總覽網址原有的 `ll`／`z`；咖啡廳、烘焙頁 `?v=` 一起更新，兩頁載入正常、無錯誤
- [x] 在新地圖上點每個州別（6 州），地圖框住該州門市、點都還在；點「全部」回總覽
- [x] 確認總覽點數 = `data.js` 門市數：My Maps 圖例 48＋12＝60，`data.js` 60 間門市
- [x] 每個 📍 對到正確地點：60 間逐一點過，地圖查詢都是「店名＋該門市地址」
- [x] 每個 ↗ Maps 搜尋結果是那間店：無頭 Chrome 打開 60 個搜尋網址，55 間直接開到那間店（名稱、地址相符），5 間出現清單、清單第一筆（不算廣告）就是那間店（Glee HQ、O'GaBee Brisbane Quarter／Queen Street、Tuga x Village、Coles Casuarina）

## Step 8：QA、首頁入口與上線

- [x] 首頁「旅行與探店」加入口（`index.html`，接在布里斯本烘焙地圖後面，🏆；meta description 也加上；2026-11-02，**未 push**）
- [x] 首頁英文（`scripts/home.js` 翻譯表＋英文 description；`?v=` 更新）；中英、360／1280、淺深色截圖正常，點入口開到得獎地圖，無錯誤
- [x] 跑完 `PLAN.md` 第 6 節 16 項檢查表，逐項記結果（結果欄寫在 `PLAN.md` 第 6 節）
- [x] 做不到的明確標「未測」（線上版 Network 要 push 後才能看；iPhone 實機、列印要使用者）
- [x] 👤 iPhone 實機（2026-11-02 使用者看過，沒問題）
- [x] 👤 列印（2026-11-02 使用者看過，沒問題）
- [x] 👤 同意 push（2026-11-02，1253506；首頁入口上線）
- [x] push 後看線上版：Network 沒有 404（只有原本就沒有的 favicon.ico）、`?v=` 生效、首頁入口正常、61 間門市
- [x] `PLAN.md` 狀態改成「已完成」（2026-11-02）

## 上線後

- [ ] 👤 第二版第一項（插隊，2026-11-02 使用者決定，排在昆州前面）：**World's 100 Best Coffee Shops**（世界百大咖啡店，2025 起每年在 CoffeeFest Madrid 公布，專業評審＋公開投票，排名單位是店家）。使用者：「我覺得是一個肯定」。媒體報導的澳洲上榜：2025 共 9 間（Toby's Estate 1、Proud Mary 4、Coffee Anthology〔布里斯本〕8、Veneziano 19、Calēre 28、Exchange Coffee〔阿德萊德〕37、Fonzie Abbott〔布里斯本〕70、Vacation 71、Seven Seeds 87）；2026 共 7 間（Only Coffee Project 4、Toby's Estate 5、Beta Coffee 13、Proud Mary 27、Coffee Anthology 29、Single O 53、Vacation 100）。2026-11-02 進度：
    - [x] 官方網站核對：2026 官方 TOP 100 頁的澳洲 7 間、名次和媒體一致；官方只放最新一年、只寫國家不寫城市 → **2025 名單要從 Wayback 找**
    - [x] 👤 上網站規則：**進世界百大就算**（使用者選 A；全球約 15,000 間選 100 間，約 0.7%），徽章寫「世界百大 第 N 名」
    - [x] 👤 頁面要註明主辦和贊助（使用者要求）。查到的：主辦 The World's 100 Best Coffee Shops（執行長 César Ramírez，創辦者查不到）；冠名贊助 DaVinci Gourmet（Kerry 集團旗下），主要贊助 Slayer、Markibar、Cropster、CoffeeFest Madrid，另有 Fidatec、哥倫比亞咖啡生產者協會（來源：Kerry 新聞稿 https://www.kerry.com/about/news-and-media/2026/global-rankings-announced-for-the-worlds-best-coffee-shops、GlobeNewswire 2026-02-16）。評分：專業評審 70%＋公開投票 30%，評審名單未公開；官網沒寫報名費。有媒體（Switzer）質疑公信力。頁尾草稿：「世界百大咖啡店是『排名』，不是評分比賽：由 The World's 100 Best Coffee Shops（執行長 César Ramírez）舉辦，冠名贊助是 Kerry 集團旗下的 DaVinci Gourmet，另有 Slayer、Cropster 等咖啡品牌贊助；專業評審佔 70%、公開投票佔 30%，評審名單沒有公開。」
    - [ ] Wayback 找 2025 官方名單、核對媒體的 9 間
    - [ ] 資料結構：新賽事（例如 `W100BCS`，award_system 新增「ranking」）、徽章與篩選（等級列要不要加「世界百大」）、`make_awards_data.py` 門檻規則和測試
    - [ ] 查約 13 間不重複的店的門市（官方不寫城市）
  - 同時查過、不收的：世界咖啡師大賽（個人賽，D3；2025 冠軍 Jack Simpson／Axil Coffee）；世界級烘焙比賽（甜點世界盃、Mondial du Pain 是國家隊或個人，D3），也沒有權威的「世界最佳麵包店」排名

- [ ] 👤 第二版：**先做昆州**（使用者 2026-11-02 決定）。布里斯本只有 7 間（全是咖啡、沒有烘焙），原因是 RAS 在雪梨（三年 818 件參賽品 NSW 591、QLD 41；QLD 金牌只有 5 面）、昆士蘭州賽第一版沒收（D4）。第一步：BAA **Queensland Baking Show**（2024–2026 官方結果 PDF 在 bakingbusiness.com.au/results/）的研究摘要：等級制度（有沒有金牌／冠軍）、結果有沒有地址、大概多幾家，給使用者決定
  - 備註，之後再決定要不要收的其他比賽：
    - BAA 其他州／地區烘焙展：Victorian、South Australia、Tasmania、Canberra Baking Show，以及 NSW 的 Newcastle、Wollongong Baking Show（BAA 清單上沒有 WA、NT）
    - 各州皇家農展會的烘焙組（例如 Royal Adelaide Show，Adelaide's Finest 有報導在那裡得很多獎）；還沒研究，不確定每州都有、官方結果查不查得到
- [ ] 8 家 PARTIAL 重查（見 Step 1b：ISEO、Cacao、The Beekeeper's Bakery、White Horse、The Bean Cartel、Latitude、The Purple Haze、Riviera）；查完只會增加店家，加店要重新匯入 My Maps

- [ ] 👤 要不要每年更新（RAS 9 月、NABC 6–7 月、Golden Bean 6 月公布）
- [ ] 咖啡廳、烘焙頁（`scripts/map-list.js`）和 Noosa 頁（`scripts/noosa.js`）也有「選篩選後焦點掉回頁首」的問題（同樣是 `innerHTML = ''` 重畫）；修法照 `awards.js` `renderFilters()`，改之前先拍 DOM 雜湊基準（2026-11-02 使用者選先只修得獎頁）
- [ ] 之後的擴充候選：RAS Champion Coffee、BAA 其他賽事（Pie、Donut、各州 Baking Show）、和布里斯本咖啡廳頁互相標註（Espresso Club、Bellissimo）
