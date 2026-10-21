# 全站樣式整理：盤點與調整計畫

- 日期：2026-10-21
- 狀態：**D1～D8 已定案；Codex 審查（`STYLE-PLAN-REVIEW.md`）已核對並修進本計畫（第 3.2 節）**。最新進度看下面的進度表
- 目標：首頁、旅遊頁、報告頁看起來是同一個網站——同一套顏色、字體、按鈕、間距，深淺色和語言切換的行為也一致
- 參考：`DESIGN.md`、`DECISIONS.md`、`AGENTS.md`、`travel/australia/brisbane/cafe/PLAN.md`（共用化的前例）

## 進度表

**接手時先看這裡**：找第一個不是 ✅ 的列，照「下一步」做。每完成一步就更新這張表（狀態、日期、commit、下一步），和那一步的程式放在同一個 commit。

| 步驟 | 內容 | 狀態 | 完成日期 | Commit | 下一步／備註 |
|---|---|---|---|---|---|
| 0 | 盤點、寫計畫 | ✅ 完成 | 2026-10-21 | `70451f9` | — |
| 1 | 使用者逐題決定（第 3 節 D1～D8） | ✅ 完成 | 2026-10-21 | | D1～D8 全部定案，見第 3.1 節 |
| 1b | 刪除 `testLab/`（D8） | ✅ 完成 | 2026-10-21 | `a020959` | 使用者在對話中確認 9 個檔案後刪除 |
| 1b-2 | Codex 審查、複查與修正計畫 | ✅ 完成 | 2026-10-21 | （本 commit） | 第一次審查見第 3.2 節、複查見第 3.4 節；P1～P3 由使用者決定（第 3.3 節）；最後 QA（`STYLE-PLAN-REVIEW-3.md`）沒有重大問題 |
| 1c | 搬家：CSS、JS 移到根目錄 `styles/`、`scripts/`（D2 改版） | ✅ 完成 | 2026-10-21 | `3b83c20` | manifest 見附錄 A。**內容**：5 個搬移檔和基準 `49be6ce` 相同（`home.js` 只差第 25 行註解）；Noosa `data.js`＋`noosa.js` 接起來和原 `script.js` 逐字相同；報告的 CSS／JS 和原內嵌內容相同。**瀏覽器**（127.0.0.1，6 頁 × 中／英 × 淺／深＝24 組）：CSS 指紋 24／24 相同；畫面結果指紋 20／24 相同，Noosa 4 組各多 1 字元，是兩個 `<script>` 之間的換行，去掉標籤間空白後和基準版（另開 port 4174 載入 `49be6ce`）完全相同；同源資源全部 200；Noosa 換天和語言、咖啡篩選（36→7 家）、報告語言切換和 11 張圖表正常，console 沒有錯誤。使用者 2026-10-21 同意 push；搬家後留下的空資料夾 `travel/shared/` 和比對用的暫時 worktree 經使用者確認後移除 |
| 2 | 建立全站共用檔（`styles/tokens.css`、`base.css`、`scripts/site.js`） | ⬜ 未開始 | | | 依第 4 節步驟 2 |
| 3 | 首頁改用共用檔 | ⬜ 未開始 | | | |
| 4 | 咖啡、烘焙頁改用共用檔 | ⬜ 未開始 | | | |
| 5 | Noosa 行程頁改用共用檔 | ⬜ 未開始 | | | |
| 6 | 星宇報告頁改用共用檔 | ⬜ 未開始 | | | |
| 7 | 文件（`DESIGN.md`、`DECISIONS.md`） | ⬜ 未開始 | | | |
| 8 | 刪除 `home-demo.*`（D8） | ⬜ 未開始 | | | 先列出 3 個檔案，等使用者確認 |

狀態符號：⬜ 未開始、🔄 進行中、⏸️ 等使用者決定、✅ 完成

## 1. 現況盤點

### 1.1 每一頁載入了什麼

行數為含空白行的實際行數（2026-10-21 依 Codex 審查更正；原數字用了會略過空白行的計數方式）。

| 頁面 | 樣式 | 程式 | 配色 | Google Fonts 字重 |
|---|---|---|---|---|
| `index.html`（首頁） | `home.css`（107 行） | `home.js`（78 行） | 暖灰米白（10/20 核准，只用在首頁） | Noto 400/500/700/800、Open Sans 400/600/700/800 |
| `home-demo.html`（舊版對照） | `home-demo.css`（凍結副本） | `home-demo.js`（凍結副本） | 同上 | 同上 |
| `travel/australia/brisbane/cafe/` | `travel/shared/map-list.css`（1027 行） | `page.js`＋`data.js`＋`travel/shared/map-list.js`（837 行） | `DESIGN.md` 的 Google 藍綠 | Noto 400/600/700/800、Open Sans 400/600/700/800 |
| `travel/australia/brisbane/bakery/` | 同上（共用） | 同上（共用） | 同上 | 同上 |
| `travel/australia/noosa/itinerary.html` | `noosa/style.css`（1112 行，獨立一份） | `noosa/script.js`（1018 行，獨立一份；第 1 行起是內嵌的行程資料 `ITINERARY_DATA`） | 同上，另有舊別名 `--blue`、`--orange-d`… | 同上 |
| `ai_report/2026/starlux-australia-report.html` | 內嵌 `<style>`（約 450 行） | 內嵌 `<script>`＋`starlux-australia-report.data.js` | 同上 | Noto 400/500/600/700/800、Open Sans 400/500/600/700/800 |
| ~~`testLab/*.html`（2022 年）~~ | 無 | Firebase、jQuery 測試（**已刪除**，`a020959`） | — | — |

### 1.2 不一致的地方

**A. 有兩套配色（最影響「一致感」）**
首頁是暖灰米白和低彩度藍，其他頁是 `DESIGN.md` 的 Google 白底和亮藍。從首頁點進任何一頁，背景色、文字色、按鈕色都會一起換掉。

**B. 同一份 token 抄了很多份**
- `DESIGN.md` 的色票在 `map-list.css`、`noosa/style.css`、報告頁內嵌樣式各有一份。三份淺色區的 26 個共同欄位值相同；Codex 另外比對了系統深色區，26 個共同欄位也相同。但各自多了不同的欄位：
  - `map-list.css` 有 `--scrim`、`--color-print-bg`
  - `noosa/style.css` 有舊別名 `--blue`、`--green`、`--orange-d`…（18 個）和 `--fs-lg`、`--fs-xl`
  - 報告頁有 `--radius-*`、`--space-*`，別處都沒有
- 旅遊頁的兩份各寫三次（淺色、`[data-theme="dark"]`、`prefers-color-scheme`），報告頁寫兩次（沒有 `[data-theme]`），所以 `DESIGN.md` 這套色票散在 8 個螢幕用區塊裡（不是每個 token 都出現在每一區）。另外還有 `map-list.css` 的列印色票區（第 961 行起）和首頁自己的 3 區暖灰色票，整理時一併集中。

**C. 深淺色、語言切換各寫各的**

| 頁面 | 深淺色切換 | 語言記憶 key |
|---|---|---|
| 首頁 | 有，SVG 圖示 | `lang` |
| 咖啡、烘焙 | 有，SVG 圖示（同一組） | `lang` |
| Noosa | 有，SVG 圖示（同一組，但 HTML 先寫 `◐` 再被程式換掉） | `lang` |
| 星宇報告 | **沒有**，只跟系統設定 | `starlux-report-lang`（跟別頁不共用），**存的值是 `zh`／`en`**，別頁是 `zh-TW`／`en` |

太陽、月亮的 SVG 字串在 `home.js`、`map-list.js`、`noosa/script.js` 各複製了一份。只有首頁在 `<head>` 先讀 `theme`（防止載入時閃一下錯的顏色）；旅遊頁要等主程式跑起來才套主題，報告頁完全沒有。

**D. 字級和圓角各自為政**
- 首頁用固定 px（12/13/16/18/20/26），旅遊頁用隨螢幕縮放的 `clamp()`（Noosa 7 級 `--fs-2xs`～`--fs-xl`，`map-list.css` 只有 5 級 `--fs-2xs`～`--fs-md`），報告頁混用 12.5、13.5、14.5、21px 等不在 `DESIGN.md` 字級表裡的值。
- `DESIGN.md` 規定圓角 6/8/12/20px，但螢幕樣式實際還出現 2、10、24px（另有 7px 只用在 Noosa 列印樣式，屬列印例外）。
- 報告頁的大標題用了依螢幕縮放的 `clamp()`（報告 `:192` 24～32px、`:277` 21～26px、`:302` 26～34px），不是全部固定值。
- 列印樣式裡的 7.5～10px 小字是刻意的（列印版要擠進 A4），**不列入**調整。

**E. 字體網址不同**
三種 Google Fonts 網址，載入的字重不一樣。旅遊頁和報告頁有 18 處宣告 600/650/750 字重，首頁的 Noto Sans TC 沒載入 600（Open Sans 有）。統一網址時要一起處理，否則會發生首頁那次「750 顯示成 800」的同樣問題。

**F. 沒有回首頁的路**
旅遊頁和報告頁都沒有連回首頁的連結。訪客從首頁點進去之後，只能按瀏覽器的上一頁。

**G. 小問題**
- 報告頁列印樣式用了 `#fff`、`#000`、`#ccc` 三個沒有放在 token 區的色碼（`AGENTS.md` 要求標出來）。
- `testLab/` 是 2022 年的 Firebase 登入測試，跟網站內容無關（已刪除，`a020959`）。
- **深色模式下列印會印成深色（現有 bug，Codex 審查發現）**：Noosa `style.css:1003` 起和報告頁的列印樣式只把 body 背景改成白色，文字、卡片仍用深色 token；只有 `map-list.css` 在列印時重設了色票。
- **同名 class 意思不同**：`.pill` 在首頁是 44px 的連結按鈕（`home.css:76`）、在報告頁是 11px 的證據小標籤（報告 `:387`）、在清單頁是地圖操作按鈕（`map-list.css:766`）。共用樣式不能直接用 `.pill` 這個名字。
- **報告頁圖表的字級寫在 JS 裡**（報告 `:595`、`:690` 的 13.5／15.5），整理 CSS 不會改到。

## 2. 建議的目標結構

2026-10-21 改版（D2 改版，見第 3.1 節）：**全站依檔案類型分資料夾**，所有 CSS 放根目錄 `styles/`、所有 JS 放 `scripts/`，同一層、用檔名區分。內容資料留在頁面旁邊。

```
index.html                     ← 首頁（GitHub Pages 規定要在根目錄）
styles/
  tokens.css                   ← 新增，全站：唯一的色票、字級、間距、圓角、陰影
  base.css                     ← 新增，全站：字體、D7 字重、focus 外框、圓形切換按鈕、減少動態（不放 reset、不放 .pill，見第 4 節步驟 2）
  app-shell.css                ← 新增（D4），兩種旅遊頁：地圖區、側欄、抽屜、chip、標籤、燈箱、回到頂端、提示框、「← 阿星」pill
  home.css                     ← 原 home.css：只留首頁版面
  map-list.css                 ← 原 travel/shared/map-list.css：只留店家清單元件
  noosa.css                    ← 原 travel/australia/noosa/style.css：只留時間軸
  report-starlux.css           ← 原報告頁內嵌 <style>
scripts/
  site.js                      ← 新增，全站：深淺色切換、SVG 圖示、語言記憶（key 統一 lang）
  home.js                      ← 原 home.js：首頁翻譯
  map-list.js                  ← 原 travel/shared/map-list.js
  noosa.js                     ← 原 travel/australia/noosa/script.js
  report-starlux.js            ← 原報告頁內嵌 <script>
travel/australia/brisbane/cafe/    index.html、page.js、data.js（資料留在原地）
travel/australia/brisbane/bakery/  index.html、page.js、data.js
travel/australia/noosa/            itinerary.html、data.js（P2，原 script.js 第 1～336 行）、pics/
ai_report/2026/                    starlux-australia-report.html、.data.js
```

原則：
- 每頁按順序載入 `styles/tokens.css` → `styles/base.css` →（旅遊頁）`styles/app-shell.css` → 該頁自己的 CSS。用一般的 `<link>` 和 `<script>` 標籤，`file://` 直接開也能用（`AGENTS.md` 的規定）。
- **一律用相對路徑**，深度依頁面而不同：咖啡、烘焙 `../../../../styles/…`、**Noosa `../../../styles/…`（少一層）**、報告 `../../styles/…`、首頁 `styles/…`。不能寫 `/styles/…`，`file://` 開啟時會指到磁碟根目錄而找不到。
- **只搬樣式和程式，不搬資料**：`page.js`、`data.js`、`starlux-australia-report.data.js` 由 `travel/tools/` 或手動維護、是頁面內容，留在頁面旁邊。Noosa 的行程資料原本內嵌在 `script.js` 裡，依 P2 拆成 `travel/australia/noosa/data.js`。
- **JS 裡的照片路徑不受搬家影響**：`map-list.js:471`、Noosa `script.js:116` 產生的相對圖片網址是交給 DOM 的，瀏覽器會以 HTML 所在目錄解析，不是以 JS 檔所在目錄，所以不用改。
- **載入順序不能變**：清單頁 `page.js` → `data.js` → `map-list.js`；Noosa `data.js` → `noosa.js`（兩個都 `defer`）；報告頁 `.data.js` → 主程式。不用 `async`。
- 新頁面的單頁檔案用「頁面類型-名稱」命名（例：`report-starlux.css`），避免以後同名。
- 頁面自己的 CSS 只能用 token，不能自己定義顏色。
- 首頁 head 裡那行「先讀 localStorage 設定主題」的小 script，**每頁都要加上**（目前只有首頁有），放在第一個 CSS 之前，含 try/catch。

## 3. 待決定問題（一題一題來）

| # | 問題 | 選項 | 建議 |
|---|---|---|---|
| D1 | 全站用哪一套配色？ | (a) 全站改成首頁的暖灰米白；(b) 全站改回 Google 白底亮藍；(c) 底色、文字、邊框用首頁的暖灰，藍綠紅黃紫等「有意義的顏色」保留 `DESIGN.md` 的分工，但調整到在暖灰底上對比度夠 | **(c)**：一致感主要來自底色和文字；旅遊頁的地圖按鈕、步道、美食標籤需要靠顏色分類，不能只剩一種藍。每個顏色都要重新量對比度 |
| D2 | 共用檔放哪裡？ | (a) 根目錄 `shared/`；(b) 根目錄 `assets/`；(c) 繼續放 `travel/shared/` | **(a)**：首頁和報告頁不屬於 `travel/`，放在 `travel/` 底下路徑會很奇怪 |
| D3 | 字級怎麼統一？（2026-10-21 更正：內文全站其實都約 16px。旅遊頁 `--fs-base` 是 `clamp(14px, 4.2vw, 16px)`，390px 以上就是 16px，只有更窄的手機會縮到 14～15px；報告頁固定 16px。差異在「定義方式」：旅遊頁的字級 token 全部跟螢幕寬度縮放（Noosa 7 級、map-list 5 級），首頁是固定值，報告頁內文固定但大標題用 `clamp()`；報告頁還有 12.5、13.5、14.5、21px 等不在字級表的值） | (a) 全站一套固定字級，旅遊頁拿掉縮放；(b) 全站同一組字級名稱，旅遊頁保留縮放；(c) 維持現狀，只收斂報告頁的特殊值 | 見第 3.1 節決定 |
| D4 | Noosa 頁要整理到什麼程度？ | (a) 只換 token 和切換按鈕；(b) 完整改用 `travel/shared/` 的清單地圖程式 | **(a)**：Noosa 是時間軸行程，不是清單地圖，硬套共用程式風險大、效益小 |
| D5 | 報告頁要不要加深淺色切換、語言 key 統一？ | (a) 加切換按鈕，語言 key 改成 `lang`；(b) 只統一配色 | **(a)**：全站行為一致，選過英文之後換頁不用再選一次 |
| D6 | 要不要加「回首頁」？ | (a) 每頁 header 左邊放「阿星」品牌字，點了回首頁；(b) 不加 | **(a)**：跟首頁 header 長得一樣，也是常見做法 |
| D7 | 字體網址怎麼統一？ | (a) 全站載入 400/500/600/700/800；(b) 全站只載入 400/500/700/800，旅遊頁和報告頁的 600/650/750 改成 500 或 700 | 見第 3.1 節決定（原建議 (b) 的理由「每多一個字重就多一大包下載」不正確，已更正） |
| D8 | `testLab/` 和 `home-demo.*` 怎麼處理？ | `testLab/`：保留／移到封存資料夾／刪除；`home-demo.*`：保留到你說可以為止 | 先不動，等你決定。刪除或移動前會先列清單給你確認 |

### 3.1 決定紀錄（逐題與使用者確認）

| # | 決定 | 日期 | 影響 |
|---|---|---|---|
| D1 | **(c)**：底色、文字、邊框全站用首頁的暖灰；綠、珊瑚紅、琥珀、紫保留 `DESIGN.md` 的分工，標籤淡色底重新調成偏暖 | 2026-10-21 | 已量過 `DESIGN.md` 五種「文字用」顏色（淺色用 `*-strong`／`--color-warning-text`，深色用 base／`--color-accent-strong`）在首頁暖灰的頁面底 `--color-bg` 和卡片底 `--color-surface` 上的對比度：淺色最低 4.75（藍，頁面底）、深色最低 5.36（紫 `#c58af9`，卡片底 `#2b302c`；頁面底是 5.96），都過 4.5:1。量測方式：WCAG 2 sRGB 相對亮度。淡色底、hover、focus、非文字邊界在步驟 2 依第 4 節的對比度清單全部重量 |
| D1-2 | **全站只用一種藍：首頁的石板藍**（淺色 `#365a6b`、深色 `#bbced4`），旅遊頁的地圖按鈕也改用它 | 2026-10-21 | 取代 `DESIGN.md` 的 Google 藍 `#1a73e8`／`#1967d2`。地圖按鈕維持 pill（有底色和邊框），靠形狀看出能點；對比度 6.56／9.17。`DESIGN.md`「Blue means navigation or map movement」的分工不變，只是換了色值。**「一種藍」指同一個色系的兩階**（審查後釐清）：`--color-primary` 淺色 `#496b7b`／深色 `#a7bdc5` 用在邊框、hover、focus 外框、圖示；`--color-primary-strong` 淺色 `#365a6b`／深色 `#bbced4` 用在文字和 pill 文字。就是首頁現在的用法，所以首頁不會因此改變 |
| D2 | ~~根目錄 `shared/` 放全站共用檔；`travel/shared/` 繼續只放清單地圖元件~~（同日改版，見下一列） | 2026-10-21 | — |
| D2 改版 | **全站依檔案類型分資料夾：所有 CSS 放根目錄 `styles/`、所有 JS 放 `scripts/`**（含首頁、清單地圖、Noosa、報告頁），`travel/shared/` 和 `shared/` 都不用 | 2026-10-21 | 使用者看到首頁 CSS／JS 和 `index.html` 一起放在根目錄覺得怪，選擇全站依類型集中，而不是只移首頁。預設細節（使用者可再改）：同一層不分子資料夾、單頁檔以頁面命名；資料檔（`page.js`、`data.js`、報告 `.data.js`）留在頁面旁邊；一律相對路徑。搬家當成獨立的步驟 1c 先做，內容不改。**要同步改**（已查過）：`travel/tools/make_data_js.py` 第 5 行註解、`travel/tools/README.md` 第 59 行（改了共用檔要更新版號的說明）都提到 `travel/shared/`，只是文字不影響執行；`DESIGN.md` 提到 `travel/shared/map-list.js`／`map-list.css` 的段落；`DECISIONS.md` 舊列是歷史紀錄，不改 |
| D3 | **(a) 全站一套固定字級**：`--fs-2xs` 12、`xs` 13、`sm` 14、`base` 16、`md` 18、`lg` 20、`xl` 26px（旅遊頁現有 clamp 的最大值），旅遊頁拿掉依螢幕寬度縮放 | 2026-10-21 | 390px 以上的手機和桌機幾乎沒變；320～375px 小手機的字會大 1～2px，**要逐頁檢查按鈕列、標籤列、chip 列不會擠爆或換行錯亂**。報告頁的 12.5／13.5／14.5／15／17／21／22／24px 收斂到最接近的級距；首頁品牌字 17px 改用 `md` 18px。列印樣式的小字不受影響。`DESIGN.md` 的字級表（11/12/13/15/17/20/26）要在步驟 7 改成新表 |
| D4 | **共用外框＋保留時間軸**：兩種旅遊頁共同的外框元件抽成 `app-shell.css`；`map-list.css` 只留店家清單元件、Noosa 的 CSS 只留時間軸；JS 只共用深淺色和語言切換（`site.js`）。路徑依 D2 改版放在 `styles/`、`scripts/`，底部抽屜、拖曳分隔線等互動程式這次不合併 | 2026-10-21 | 盤點時估計兩份有約 50 個同名 selector、其中約一半已各改各的（`.chip`、`.tag`、`.sidebar-header`、`.sidebar-name`、`.lightbox`、`.tips-box`、`.back-to-top`、`.resize-divider`…）。**審查後更正**：當時沒有留下統計方法，數字不可重現（Codex 用兩種口徑算出 49／53 個），不能當成抽取清單。改成：步驟 4 動手前先用寫進 repo 的腳本產生**可重現的差異表**（selector＋所在 media query＋來源行號＋宣告差異），逐條標「共用／共用加變體 modifier／各頁保留」。原本「不同就採咖啡頁版本」改為**每條依差異表決定**，Noosa 看得到的差異截圖給使用者確認後才刪原規則 |
| D5 | **報告頁加深淺色切換按鈕，語言記憶改用全站的 `lang`** | 2026-10-21 | 按鈕同全站（44px 圓形、SVG 圖示）；head 加上先讀 `theme` 的小 script，token 要補 `[data-theme]` 區。網址 `?lang=en` 保留，優先於記住的設定，並照現在的做法寫回記憶（改寫到 `lang`）。舊 key `starlux-report-lang` 不再讀取。**審查後補充（語言值契約）**：全站 `lang` 只存 `zh-TW` 或 `en`。報告頁內部仍可用 `zh`／`en` 查資料，但寫入時轉成 `zh-TW`；網址 `?lang=zh` 也存成 `zh-TW`。讀取時只接受這兩個值，其他值（含舊版存的 `zh`）一律當成 `zh-TW`；`site.js` 負責驗證，Noosa `script.js:340` 現在直接拿值用、沒驗證，要改成經過 `site.js`。沒有記憶時的預設語言依 P1：全站跟瀏覽器語言 |
| D6 | **旅遊頁：側欄標題上方加 pill「← 阿星」**（英文「← 阿星 (Lorn)」）；**報告頁：加一條跟首頁相同的 header**（左「阿星」連回首頁、右 EN 和深淺色按鈕，取代現在的 `.lang-toggle-row`） | 2026-10-21 | 旅遊頁的 `.sidebar-header` 在手機上點了會展開／收合抽屜，pill 的點擊要 `stopPropagation`，不能順便觸發抽屜。連結用相對路徑：咖啡、烘焙 `../../../../index.html`，**Noosa `../../../index.html`**（審查後更正，原本少算一層），報告 `../../index.html`；`file://` 也能用。用原生 `<a>`，只 `stopPropagation`、不 `preventDefault`，滑鼠和鍵盤 Enter 都要能導航，語言切換重繪後連結和文字要還在。列印時隱藏 |
| D7 | **全站同一條 Google Fonts 網址**：Open Sans 和 Noto Sans TC 都載入 400/500/600/700/800；CSS 的 650 改寫成 700、750 改寫成 800（就是現在實際顯示的值），600 保留 | 2026-10-21 | 更正第 3 節原本的理由：瀏覽器只下載頁面實際用到的字重，網址多列不會多下載字型檔。畫面不變：已查過旅遊頁、報告頁、首頁都沒有用到 500，所以補載 500 不會讓任何文字變粗。用法：400 內文、500 次要強調、600 小標籤／chip／時間、700 h2／h3／按鈕、800 h1／品牌 |
| D8 | **刪除 `testLab/`**（9 個檔案，網站沒有任何頁面連到它）；**`home-demo.*` 在整理完成後刪除**（`home-demo.html`、`home-demo.css`、`home-demo.js`），整理期間維持凍結、不套用新樣式 | 2026-10-21 | 兩次刪除都要先列出確切檔案、等使用者在對話中確認才執行（使用者的全域規則）。git 歷史仍可找回 |

### 3.2 Codex 審查的處理（2026-10-21）

原始回饋在 `STYLE-PLAN-REVIEW.md`。每一項都對照程式碼核對過，結果如下：

| 審查項目 | 處理 | 改在哪裡 |
|---|---|---|
| 行數錯誤 | 採納，已更正 | 1.1 |
| 首頁沒載入 600 應寫成 Noto | 採納 | 1.2 E |
| map-list 只有 5 級字 | 採納 | 1.2 D |
| 8 個區塊的說法不完整 | 採納，補上列印區和首頁 | 1.2 B |
| 深色最低 5.36 重現不了 | 部分採納：數字是卡片底量的，補上量測條件 | 3.1 D1 |
| selector 統計重現不了 | 採納，改成先產生可重現差異表 | 3.1 D4、第 4 節步驟 4 |
| 「一種藍」跟首頁不變矛盾 | 部分採納：釐清是同色系兩階，首頁不受影響 | 3.1 D1-2 |
| 語言值 `zh` 會讓 Noosa 壞掉（高） | 採納，訂語言值契約 | 3.1 D5、第 4 節步驟 2 |
| 共用 JS 缺介面與初始化順序（高） | 採納 | 第 4 節步驟 2 |
| 深色模式列印仍是深色（高） | 採納，使用者決定這次一起修，見 **P3** | 1.2 G、3.3、第 4 節步驟 2 |
| `.pill` 同名不同義（高） | 採納，共用元件改用新 class 名稱 | 1.2 G、第 4 節步驟 2 |
| 防閃色 script 不是每頁都有 | 採納 | 第 2 節原則 |
| Noosa 回首頁路徑少一層 | 採納 | 第 2 節、3.1 D6 |
| Noosa 行程資料在 `script.js` 裡 | 使用者決定拆出來，見 **P2** | 第 2 節、3.3 |
| JS 裡的照片路徑 | 採納（確認不用改） | 第 2 節原則 |
| 版號依賴表、部署後核對 | 採納 | 第 4 節步驟 1c、第 5 節 |
| 報告圖表字級在 JS 裡 | 採納，列為例外、步驟 6 一起看 | 1.2 G、第 4 節步驟 6 |
| 圓角、間距沒有落地規則 | 採納，步驟 2 補對照表 | 第 4 節步驟 2 |
| 驗證矩陣、對比度清單、回退方式 | 採納 | 第 4、5 節 |
| 「多列字重不會多下載」要實測 | 採納：保留結論，但步驟 3 用瀏覽器 Network 確認 | 第 4 節步驟 3 |
| 報告頁斷點 480／560／900 vs `DESIGN.md` 單一斷點 | 採納：`DESIGN.md` 的單一斷點只適用旅遊 app 版面，步驟 7 寫清楚 | 第 4 節步驟 7 |

### 3.3 審查後新增的決定（逐題與使用者確認）

| # | 決定 | 日期 | 影響 |
|---|---|---|---|
| P1 | **全站沒有語言記憶時跟瀏覽器語言**：瀏覽器語言是 `zh` 開頭→中文，其他→英文，取不到→中文。優先序：網址 `?lang=` → 記憶的 `lang` → 瀏覽器語言 → 中文 | 2026-10-21 | 套用報告頁現有的規則（報告 `:513`～`:539`）到全站，寫在 `site.js`。**行為變更**：首頁、旅遊頁原本一律中文，現在英文瀏覽器的新訪客會先看到英文。**寫入記憶的只有**：合法的網址參數（`?lang=en`、`?lang=zh`→存 `zh-TW`）和語言切換按鈕（切成中文或英文都寫）；瀏覽器語言判斷不寫入。不認得的網址值（例如 `?lang=fr`）直接略過、往下一個順位找。記憶裡有值但不合法（例如舊的 `zh`）時當成中文，**不**改用瀏覽器語言（D5） |
| P2 | **Noosa 行程資料拆成 `travel/australia/noosa/data.js`**，程式搬到 `scripts/noosa.js` | 2026-10-21 | 在步驟 1c 做：`script.js` 第 1～336 行（`var ITINERARY_DATA = …;`，全域變數）原樣剪到 `data.js`，內容不改。`itinerary.html` 現在用 `defer` 載入程式，`data.js` 也要 `defer` 並放在 `noosa.js` 前面，兩個才會照順序執行。和咖啡、烘焙頁「資料留在頁面旁」一致，第 2 節的例外取消 |
| P3 | **這次一起修深色模式列印**：`tokens.css` 加一個全站共用的列印區塊，列印時整套色票重設成淺色（照 `map-list.css` 第 961 行起的做法） | 2026-10-21 | 列印的版面和小字不動。**已核准的差異**：Noosa、報告頁在深色或跟系統深色時列印，會從「白底＋深色卡片＋淺色字」變成跟淺色模式一樣。第 5 節的列印檢查以這個為預期結果 |

### 3.4 Codex 複查的處理（2026-10-21）

原始回饋在 `STYLE-PLAN-REVIEW-2.md`。複查結論：可以開始步驟 1c；兩項部分採納的理由成立（重算 5.3637／5.9615，首頁確實已是兩階藍）。新發現的 N01～N10 都對照程式碼核對過，全部採納：

| # | 問題 | 改在哪裡 |
|---|---|---|
| N01 | P1 沒放進首頁驗收；「只有按 EN 寫入」漏了切成中文；不認得的網址值要略過 | 3.3 P1、第 4 節步驟 3、第 5 節 |
| N02 | `.pill` 改名漏了 `home.js:57`；結構圖還寫 base 放 pill | 第 2 節、第 4 節步驟 2 |
| N03 | `site.js` 沒有初始化順序和舊 listener 移除時點 | 第 4 節步驟 2 |
| N04 | 「內容一字不改」沒寫 Noosa 拆檔和註解的比對例外 | 第 4 節步驟 1c |
| N05 | 報告頁三處 650 沒列；圖表字級例外要精確列 | 第 4 節步驟 6、9 |
| N06 | P3 列印區塊的 selector 範圍和優先序 | 第 4 節步驟 2 |
| N07 | 對比度漏了透明度合成、SVG、資料檔顏色、各種狀態；safe area | 第 4 節步驟 2 |
| N08 | 「不會多下載」要以實測為準，每頁都看 | 第 4 節步驟 3 |
| N09 | 舊說法沒清乾淨（7 級字、7px、testLab、「本 commit」） | 1.1、1.2 D、第 3 節 D3、進度表 |
| N10 | 回退只寫了已 commit 的情況；版號規則 | 第 4 節回退方式、版號規則 |

## 4. 執行步驟（決定之後）

（編號對應進度表的步驟）

1c. **搬家**（純搬移，內容不改）
   - **先寫 manifest**（放在本計畫附錄）：舊路徑→新路徑、每頁的相對路徑和載入順序、每頁引用的所有 CSS／JS／資料和 `?v=` 版號（依賴表）、不搬的例外（資料檔、`home-demo.*` 凍結副本）。
   - **先存基準**：記下基準 commit 和當時已有的未 commit 檔案；記下瀏覽器版本、視窗大小。五個正式入口（首頁、咖啡、烘焙、Noosa、報告）在字型載入完成、地圖穩定後，各存淺色／深色、中／英的截圖和頁面文字，互動狀態固定（例如 Noosa 第 1 天、清單沒篩選）。報告頁還沒有主題切換，用系統深淺色取基準，不先加新功能。`home-demo.html` 也存一次，確認凍結副本沒被影響。外部服務（Google Maps、Fonts）偶爾載入失敗不算搬家錯誤，重試確認。
   - **比對例外**：Noosa `data.js` 要跟原 `script.js` 第 1～336 行逐字相同，`scripts/noosa.js` 要跟原第 337 行之後相同；報告頁的 CSS／JS 去掉外層 `<style>`／`<script>` 標籤後相同；唯一允許的文字差異是本步驟列出的舊路徑註解。Noosa 兩支都是一般 `<script>`、都加 `defer`、資料在前（`data.js?v=…` 在頁面旁，程式是 `../../../scripts/noosa.js?v=…`），檢查 `ITINERARY_DATA` 存在、`init(ITINERARY_DATA)` 只執行一次。
   - 用 `git mv` 搬檔；報告頁的內嵌 `<style>`、`<script>` 原樣搬成檔案（保留 IIFE 和原本的載入位置）；Noosa `script.js` 第 1～336 行原樣剪成 `noosa/data.js`（P2）；改引用路徑和 `?v=`；`travel/tools/make_data_js.py:5`、`travel/tools/README.md:59`、兩頁 `page.js:1`、`home.js:25` 的舊路徑註解一起改。
   - 檢查：Network 每個資源都 200、console 沒有錯誤、載入順序和 manifest 一致；搬出來的檔案內容跟原本完全相同（報告頁只差外層標籤）；頁面文字和截圖跟基準相同；互動（篩選、地圖預覽、抽屜、燈箱、語言、深淺色）正常。`file://` 由使用者手動確認。
2. **建立共用檔**（`styles/tokens.css`、`styles/base.css`、`scripts/site.js`）
   - **`tokens.css`**：D1 色票（暖灰中性色＋石板藍兩階＋重新調暖的分類色淡色底）、D3 字級、間距、圓角、陰影；淺色、`[data-theme="dark"]`、系統深色三區。舊 token 和 Noosa 18 個別名都列出對應到哪個新 token，用腳本檢查每個 `var(--…)` 都有定義、沒有循環。加全站共用的列印區塊，列印時整套色票重設成淺色（P3）：涵蓋 `:root`、`:root[data-theme="light"]`、`:root[data-theme="dark"]` 和系統深色，重設 `color-scheme` 和所有實際用到的顏色 token（不是只抄 `map-list.css` 第 965～976 行那幾個），寫在所有螢幕主題規則之後、specificity 要壓得過深色規則；各頁接入時刪掉後面載入的舊 token 定義，免得又蓋回去。Noosa 舊別名移除前先對應到新 token。淺色和深色模式列印都要得到同一套列印色。附一張元件→間距／圓角／陰影 token 對照表（999px 圓形和 pill 是例外；列印的 7px 不改）。
   - **`base.css`**：只放全站都適用的東西：字體、D7 字重用法、focus 外框、圓形切換按鈕（`.lang-toggle`／`.theme-toggle`）、減少動態。**不放 reset 和 `.pill`**：旅遊頁的 `* { margin:0; padding:0 }`、`height:100%; overflow:hidden` 留在 `app-shell.css`；首頁的連結按鈕改名為 `.btn-pill`（暫定），避免蓋到報告頁和清單頁的 `.pill`。`.btn-pill` 只有首頁用，所以放在 `home.css`、不放 `base.css`。改名時 `index.html`、`home.css` 的 selector、**`home.js:57` 的 `classList.contains('pill')`**（決定英文模式在箭頭前加空格）三處一起改；報告頁和清單頁的 `.pill` 不動，不做全 repo 取代。
   - **`site.js`** 的契約：一個全域物件（暫定 `window.Site`），提供讀寫主題、讀寫語言（只接受 `zh-TW`／`en`，見 D5；預設語言的優先序見 P1）、產生 SVG 圖示、「語言變了」的通知讓各頁自己重新翻譯。**初始化順序**：`site.js` 放在每頁自己的程式之前載入（Noosa 也用 `defer`、排在 `data.js` 之後、`noosa.js` 之前）；`site.js` 載入時只決定目前的語言和主題、不發通知；各頁程式自己讀目前值、畫一次畫面，再訂閱之後的變更。每頁改用 `site.js` 的**同一個 commit** 裡，刪掉那頁原本的切換按鈕 listener、主題重套和 SVG 常數，保留翻譯和重繪；檢查「按一次只切一次」。主題值只接受 `light`／`dark`，其他值或沒有值就跟系統；localStorage 被擋時照常顯示、只是不記住。
   - **每頁 `<head>` 加防閃色 script**（第 2 節原則）。
   - **對比度清單**：每一組文字／背景（頁面底、卡片底、淡色底、實心按鈕）、非文字邊界和 focus 外框（3:1）、淺色和深色都量；有透明度的顏色（例如 Noosa `rgba(237,137,54,0.06)` hover）先合成實際顏色再量；報告 SVG 圖表的文字、資料檔裡用 `colorVar` 指定的顏色、selected／hover／disabled／loading／error 狀態的文字也要量。量測腳本和結果記在附錄。
   - **safe area**：首頁已經用 `env(safe-area-inset-*)`，旅遊頁還沒有（`DESIGN.md` 列為已知缺口）。這次維持現況、不擴大範圍，只確認改完沒有變差。
3. **首頁**改用共用檔、統一字體網址（D7）。預期差異：品牌字 17→18px（D3）、`.pill`→`.btn-pill` 改名（看起來不變）、P1（沒有語言記憶時跟瀏覽器語言）。截圖比對時固定語言（先用切換按鈕設好），其他畫面要跟基準相同。字重：用瀏覽器 Network 記錄實際下載了哪些字型檔、用 rendered fonts 看實際顯示的字重，兩項分開記；「多列字重不一定會多下載」以實測結果為準，步驟 4～6 每頁都看一次。
4. **咖啡、烘焙頁**：先用腳本產生 Noosa／map-list 的**差異表**（D4），建立 `styles/app-shell.css`；`map-list.css` 刪掉 token 區和外框元件；切換按鈕改用 `site.js`；拿掉字級 clamp（D3）；650／750 改寫成 700／800、換字體網址（D7）；加「← 阿星」pill（D6）。
5. **Noosa 頁**：依差異表，**先截圖列出看得到的差異給使用者確認**，再改；舊別名換成正式 token 名稱；語言讀取改經 `site.js`；其餘同步驟 4。特別測 767／768px 切換、拖曳上下限、抽屜展開收合、active chip、燈箱和 toast 的疊層。
6. **報告頁**：`styles/report-starlux.css` 改用共用 token 和字級；三處 650 改成 700（報告 `:183`、`:236`、`:422`，D7）；大標題的 `clamp()`（`:192`、`:277`、`:302`）和圖表字級（JS `:595`、`:690` 的 13.5／15.5、CSS `:407` 的 21px）先列成精確清單，跟使用者確認哪些收斂、哪些當例外；加首頁同款 header、深淺色切換、語言 key 和值改成全站契約（D5、D6）；列印用的 `#fff`／`#000`／`#ccc` 改成 token；系統深色的元件規則（例如報告 `:164` 的按鈕陰影）也要移到 `[data-theme]` 架構；圖表 JS 裡的 13.5／15.5px 和 CSS 的 21px 圖表字級列為例外或改成 token（動手時再列給使用者看）。
7. **文件**：`DESIGN.md` 的色票、字級改成指向 `styles/tokens.css`，石板藍取代 Google 藍的說明、`travel/shared/` 路徑、單一斷點只適用旅遊 app 版面（報告頁另有 480／560／900px）一起改；`DECISIONS.md` 記下這次整理。
8. **刪除 `home-demo.*`**：先列出 3 個檔案，使用者確認後才刪；刪完確認沒有任何檔案還引用它們。
9. **收尾檢查**：全站搜尋 `font-weight: 650`／`750`、舊的字體網址、`travel/shared`、沒有對應到字級表的 px 值，應該都只剩列出的例外。

**版號規則**：`?v=` 用 `YYYYMMDD` 加一個字母（同一天第二次改用 `b`，例如 `20261021b`）。**改到共用檔（`tokens.css`、`base.css`、`app-shell.css`、`site.js`、`map-list.*`）時，manifest 依賴表裡所有引用它的頁面都要一起改版號**。

每一步一個 commit，**該步的檢查通過才 commit**，做完就更新進度表。

**回退方式**：
- **還沒 commit 就發現問題**：照 manifest 只把這一步的搬移、拆檔、引用改回去（例如 `git mv` 搬回、`git restore` 這一步改到的檔案），**保留**使用者原本就有的未 commit 修改；不用 `git reset --hard`、不用 `git checkout .`。
- **已經 commit**：用 `git revert <該步 commit>` 退回（HTML 引用、檔案、文件會一起退），不用 `git reset --hard`。已經 push 的話，退回後要再更新 `?v=` 版號，避免訪客卡在快取。共用檔出問題時，所有用到它的頁面都要重新檢查，不能只看最後改的那頁。

## 5. 驗證方式

- **對比度**：照第 4 節步驟 2 的清單，用腳本量，淺色、深色都要達到 WCAG AA（一般文字 4.5:1、非文字元件 3:1）。
- **畫面**：每一步跟步驟 1c 的基準截圖比對。步驟 1c 要完全相同；之後只能出現事先列出、使用者核准過的差異（例如首頁品牌字 17→18px）。
- **狀態矩陣**：淺色／深色／跟系統 × 中文／英文 × 320／375／390／767／768px／桌機。內容包含首頁的連結和按鈕、店家多分類和長店名、Noosa 兩天行程、報告全部圖表。
- **互動**：地圖預覽和回到全部、篩選和清除、抽屜和拖曳、照片燈箱開關、回到頂端、回首頁、Tab 鍵 focus。
- **跨頁設定**：在一頁切成深色和英文後換到別頁，設定要跟著走；也測 `?lang=en`、`?lang=zh`、`?lang=fr`（應略過）、沒有網址參數、記憶裡是錯誤值（例如舊的 `zh`，應當成中文）、瀏覽器擋住 localStorage。切換按鈕切成中文和切成英文都要寫入記憶；連按幾次、換語言後再切主題，都只切一次。
- **P1 預設語言**：清掉記憶後，把瀏覽器語言設成 `zh-TW`、`zh-HK`、`en-AU`、其他語言各開一次，結果分別是中、中、英、英，而且都**沒有**寫入記憶。
- **本機檔案預覽**：`file://` 直接開每一頁，本機的 CSS、JS、照片都要載入。Google Fonts、Google Maps 需要網路，沒網路時字型會退回系統字、地圖不會顯示，這不算錯誤；這項不代表「沒網路也能完整使用」。Chrome 擴充打不開 `file://`，這項請使用者手動確認。注意 `file://` 下不同頁之間不一定共用 localStorage，跨頁設定以本機 HTTP 伺服器的結果為準。
- **列印**：Noosa、咖啡、烘焙、報告四頁，分別從淺色、深色、跟系統深色三種狀態開列印預覽（A4），中英文都看：前景背景顏色、分頁、控制按鈕和「← 阿星」都隱藏、內容完整。
- **部署後**：push 後在 GitHub Pages 實際網址確認 HTML 引用的是新版號、資源內容是新的；本機通過不能代替線上檢查。

## 6. 不在這次範圍

- 各頁的內容、文案、版面結構（例如 Noosa 時間軸的排法）。
- 地圖和照片本身。
- 列印版的小字級。

## 附錄 A：步驟 1c 搬家 manifest（2026-10-21）

基準 commit：`49be6ce`（開始搬家前工作樹乾淨，沒有未 commit 的檔案）。新搬出或新建的檔案一律 `?v=20261021c`；內容沒動的資料檔維持原版號。

### A.1 搬移與拆檔

| 原本 | 搬到 | 做法 |
|---|---|---|
| `home.css` | `styles/home.css` | `git mv` |
| `home.js` | `scripts/home.js` | `git mv`；第 25 行註解 `travel/shared/map-list.js` → `scripts/map-list.js` |
| `travel/shared/map-list.css` | `styles/map-list.css` | `git mv` |
| `travel/shared/map-list.js` | `scripts/map-list.js` | `git mv` |
| `travel/australia/noosa/style.css` | `styles/noosa.css` | `git mv` |
| `travel/australia/noosa/script.js` 第 1～336 行 | `travel/australia/noosa/data.js` | 原樣剪出（P2） |
| `travel/australia/noosa/script.js` 第 337 行起 | `scripts/noosa.js` | `git mv` 後刪掉前 336 行 |
| 報告頁第 12～457 行（`<style>` 和 `</style>` 中間） | `styles/report-starlux.css` | 原樣搬出 |
| 報告頁第 505～950 行（`<script>` 和 `</script>` 中間） | `scripts/report-starlux.js` | 原樣搬出 |

### A.2 各頁引用（搬家後，順序和位置不變）

| 頁面 | `<head>` 樣式 | `</body>` 前的程式 |
|---|---|---|
| `index.html` | `styles/home.css?v=20261021c` | `scripts/home.js?v=20261021c` |
| `travel/australia/brisbane/cafe/index.html` | `../../../../styles/map-list.css?v=20261021c` | `page.js?v=20261017c` → `data.js?v=20261018a` → `../../../../scripts/map-list.js?v=20261021c` |
| `travel/australia/brisbane/bakery/index.html` | 同上 | 同上 |
| `travel/australia/noosa/itinerary.html` | `../../../styles/noosa.css?v=20261021c` | `data.js?v=20261021c`（defer）→ `../../../scripts/noosa.js?v=20261021c`（defer） |
| `ai_report/2026/starlux-australia-report.html` | `../../styles/report-starlux.css?v=20261021c`（取代內嵌 `<style>`，位置相同） | `starlux-australia-report.data.js`（不變）→ `../../scripts/report-starlux.js?v=20261021c`（取代內嵌 `<script>`，位置相同、不加 defer） |
| `home-demo.html` | `home-demo.css`（不動） | `home-demo.js`（不動） |

### A.3 不搬、不改

- 資料檔：`cafe/page.js`、`cafe/data.js`、`bakery/page.js`、`bakery/data.js`、`starlux-australia-report.data.js`（只改 `page.js` 第 1 行的路徑註解）。
- 凍結副本：`home-demo.html`、`home-demo.css`、`home-demo.js`。
- 歷史紀錄：`DECISIONS.md`、`travel/australia/brisbane/cafe/PLAN.md`、`bakery/PLAN.md` 裡的 `travel/shared/` 不改。

### A.4 只改文字的地方

- `home.js:25`、`cafe/page.js:1`、`bakery/page.js:1`、`travel/tools/make_data_js.py:5` 的註解：`travel/shared/map-list.js` → `scripts/map-list.js`。
- `travel/tools/README.md:59`：「改了 `travel/shared/`」→「改了 `styles/`、`scripts/` 的共用檔」。
- `DESIGN.md:222`：`travel/shared/map-list.js` 和 `map-list.css` → `scripts/map-list.js`、`styles/map-list.css`。

### A.5 基準與比對方法

用本機 HTTP 伺服器（`127.0.0.1`）載入五個正式入口和 `home-demo.html`，每頁在「中文／英文 × 淺色／深色」4 種狀態（用 localStorage 的 `lang`、`theme` 設定後重新載入；報告頁沒有 `theme`，只取系統色彩模式），等字型載入和初始化完成後記錄：

1. **CSS 指紋**：所有同源樣式表的 `cssRules` 文字串起來的 SHA-256（內嵌和外部檔案，只要規則相同指紋就相同）。
2. **畫面結果指紋**：初始化後 `document.body` 的 HTML 的 SHA-256（JS 執行結果相同就相同）。
3. **網路與錯誤**：每個資源的狀態碼，以及 console 錯誤。

搬家前記一次、搬家後記一次，兩次的 1 和 2 都要相同。另外每頁存一張截圖給人看。
