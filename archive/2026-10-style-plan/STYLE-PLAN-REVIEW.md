## 結論

計畫方向可行，但不建議直接照目前版本執行；應先修正語言值契約、列印主題與共用樣式邊界。
最高風險是報告頁使用 `zh`，Noosa 使用 `zh-TW`：若只統一 key，報告頁可能把會使 Noosa 初始化失敗的值寫進 `lang`。
行數、首頁未載入 600、selector 統計等盤點需要更新；對比度有部分可重現，部分缺少量測條件。
步驟 1c 可先做，但必須保留載入順序、建立可回退基準；後續驗證應區分純搬移與已核准的視覺變更。
本報告為原始碼與計畫審查，未執行瀏覽器截圖、實際列印或遠端部署測試；不能據此宣稱畫面已驗證通過。

## 事實核對

證據以本次工作目錄、UTF-8 讀取後的實體行號為準。表格中的「正確」只表示該敘述可由所列證據支持，不代表未實作的新架構已通過驗證。

| 說法 | 結果 | 證據 檔案:行號 |
|---|---|---|
| 首頁 CSS 100 行、JS 78 行 | 錯誤 | `home.css:107` 是末行，實際 107 行；`home.js:78` 是末行，78 行正確。 |
| `map-list.css` 969 行、`map-list.js` 745 行 | 錯誤 | 實際 1027／837 行，末行為 `travel/shared/map-list.css:1027`、`travel/shared/map-list.js:837`。 |
| Noosa CSS 1048 行、JS 924 行 | 錯誤 | 實際 1112／1018 行，末行為 `travel/australia/noosa/style.css:1112`、`travel/australia/noosa/script.js:1018`。 |
| 報告內嵌 CSS 約 450 行 | 正確 | `ai_report/2026/starlux-australia-report.html:11` 開始 `<style>`，`:458` 結束；內容 446 行。內嵌主程式則在 `:504`～`:951`。 |
| 三份淺色 token 共同欄位值相同 | 正確 | 比對各自第一個 `:root` 的 custom properties，26 個共同欄位值相同。`travel/shared/map-list.css:25`、`travel/australia/noosa/style.css:22`、`ai_report/2026/starlux-australia-report.html:12`。本次也比對系統深色區，26 個共同欄位值相同。 |
| 各份 token 有不同額外欄位 | 正確 | 第一個 `:root` 共 39／63／42 個 custom properties，依序為 map-list／Noosa／報告。map-list 的 `--scrim`、`--color-print-bg` 在 `travel/shared/map-list.css:60`、`:62`；Noosa 別名與字級在 `travel/australia/noosa/style.css:65`～`:90`；報告圓角與間距在 `ai_report/2026/starlux-australia-report.html:46`～`:55`。 |
| Noosa 有 18 個舊別名 | 正確 | `travel/australia/noosa/style.css:65` 起：`--orange`、`--orange-d`、`--orange-l`、`--orange-bg`、`--blue`、`--blue-d`、`--blue-l`、`--blue-bg`、`--green`、`--green-d`、`--green-l`、`--green-bg`、`--purple`、`--gray`、`--text`、`--text-s`、`--border`、`--bg`，共 18 個。 |
| 色票散在 8 個區塊，改一個顏色要改 8 處 | 錯誤 | 僅計旅遊與報告的螢幕色票，3＋3＋2＝8 正確：`travel/shared/map-list.css:25`、`:71`、`:107`；`travel/australia/noosa/style.css:22`、`:93`、`:136`；報告 `:12`、`:58`。但 map-list 還有列印 token 區 `:961`，首頁另有 3 區 `home.css:3`、`:16`、`:29`。並非每個 token 都出現在每區；不能泛稱全站只有 8 區或每色必改 8 處。 |
| 旅遊頁、報告有 18 處 `600/650/750` | 正確 | 以非凍結版樣式中的 `font-weight` 宣告計：map-list 7 處（`travel/shared/map-list.css:258`、`:389`、`:479`、`:598`、`:622`、`:631`、`:640`）；Noosa 8 處（`travel/australia/noosa/style.css:460`、`:552`、`:590`、`:627`、`:698`、`:740`、`:747`、`:780`）；報告 3 處（`:183`、`:236`、`:422`）。這是宣告數，不是元素數，也不重複計算咖啡與烘焙共用的檔案。 |
| 首頁沒載入 600 | 錯誤 | `index.html:10` 的 Noto Sans TC 是 400/500/700/800，但 Open Sans 是 400/600/700/800。應寫成「首頁 Noto Sans TC 未載入 600」。 |
| 目前三種 Google Fonts 網址 | 正確 | 首頁 `index.html:10`；三個旅遊頁同一條：咖啡／烘焙 `index.html:10`、Noosa `itinerary.html:9`；報告 `ai_report/2026/starlux-australia-report.html:10`。旅遊兩個字型均 400/600/700/800；報告兩個字型均 400/500/600/700/800。 |
| 現有非凍結頁樣式沒有使用 500 字重 | 正確 | 檢查 `home.css:45` 起、`travel/shared/map-list.css:145` 起、`travel/australia/noosa/style.css:181` 起、報告 `:103` 起的宣告，未找到 500 的 `font-weight` 或 font shorthand 用法。此結果不等於未來新增 500 用法也可保證畫面不變。 |
| 首頁／旅遊記憶 `lang`，報告記憶 `starlux-report-lang` | 正確 | `home.js:3`、`:74`；`travel/shared/map-list.js:733`、`:830`；Noosa `script.js:340`、`:978`；報告 HTML `:519`、`:526`、`:945`。但值不同：前者 `zh-TW/en`，後者 `zh/en`。 |
| 主題記憶使用 `theme`；報告沒有切換，只跟系統 | 正確 | 首頁 `index.html:12`、`home.js:69`；map-list `map-list.js:715`、`:781`；Noosa `script.js:859`、`:972`；報告僅有系統深色 CSS `:58` 與語言按鈕 `:464`，沒有主題 override。 |
| 太陽／月亮 SVG 在三支程式重複 | 正確 | `home.js:26`、`:37`；`travel/shared/map-list.js:177`、`:189`；Noosa `script.js:440`、`:452`。Noosa 初始 `◐` 在 `itinerary.html:18`。 |
| Noosa 165 條、map-list 125 條，50 個相同 selector、22 相同／28 不同 | 無法確認 | 計畫未提供統計程式、是否拆逗號、是否含 media/print、重複 selector 如何處理。以「移除註解、只計頂層 qualified rule、selector 原字串、宣告忽略空白但保留順序」重算，Noosa 158、map-list 118、共同 49，其中 28 相同／21 不同。若含巢狀規則並以最後宣告覆蓋同名 selector，則為 168／129 個唯一 selector、共同 53、相同 22；均未重現原數字。例：`.tag` 在 Noosa `style.css:698` 與 map-list `map-list.css:627` 確有差異；不能用未定義口徑的 50 條直接作抽取清單。 |
| 旅遊頁七級字全部隨寬度縮放 | 錯誤 | Noosa 有 7 級，`style.css:84`～`:90`；map-list 只有 5 級，`map-list.css:64`～`:68`。兩者 base 都是 `clamp(14px, 4.2vw, 16px)`。 |
| 約 390px 起內文為 16px | 正確 | 首頁 `home.css:45`、報告 HTML `:105` 都是 16px；旅遊 base 見上列，4.2vw 到 16px 的門檻約 380.95px，因此 390px 正確，但不是精確轉折點。 |
| 字級、圓角有特殊值 | 正確 | 報告 `:212` 13.5px、`:338` 14.5px、`:378` 12.5px、`:407` 21px；map-list `:300` 2px、`:257` 10px、`:879` 24px。Noosa `style.css:1105` 的 7px 是列印專用，應依計畫的列印例外排除，不當作螢幕不一致。 |
| 報告列印有 token 區外的 `#fff/#000/#ccc` | 正確 | `ai_report/2026/starlux-australia-report.html:455`、`:456`。另 map-list `map-list.css:965`～`:976` 有列印 custom-property 色票，屬 token 區的重複值，仍需納入集中化。 |
| 旅遊頁與報告沒有回首頁連結 | 正確 | 靜態頁與產生連結的程式均未找到指向根 `index.html` 的連結。頁面結構：咖啡／烘焙 `index.html:14`～`:84`、Noosa `itinerary.html:14`～`:65`；報告 `:464` 起，來源連結由 `:926` 產生。首頁本身已有往這四頁的連結 `index.html:29`、`:33`、`:37`、`:47`。 |
| D6 提供的相對首頁路徑適用所有旅遊頁 | 錯誤 | 咖啡、烘焙需 `../../../../index.html`；Noosa 少一層，需 `../../../index.html`，由 `travel/australia/noosa/itinerary.html:1` 所在目錄可確定。報告 `../../index.html` 正確。目標 CSS／JS 亦須按各頁深度分開列。 |
| `travel/tools` 產生的 `data.js` 應留在頁面旁 | 正確 | `travel/tools/make_data_js.py:98`、`:105`～`:106` 預設輸出 CSV 同目錄；`:124`～`:128` 輸出一般 script。`--out` 可覆寫。咖啡／烘焙 `index.html:82`～`:84` 依序載入 `page.js`、`data.js`、共用程式。 |
| 搬家需更新工具註解與 README，工具執行本身不依賴 `travel/shared/` | 正確 | `travel/tools/make_data_js.py:5` 是 docstring；`travel/tools/README.md:59` 是版號說明。另咖啡／烘焙 `page.js:1` 也提舊路徑，應補入文字更新清單。 |
| testLab 9 檔已刪除，home-demo 三檔仍保留 | 正確 | `git show --stat a020959` 列出 9 個 testLab 刪除檔，另含計畫更新；現有 `home-demo.html:13`、`:44` 分別引用凍結 CSS／JS。歷史內容如 `a020959^:testLab/Login.html:1` 可追回。刪除前使用者對話授權不在 repo，無法確認。 |
| D1 淺色最低 4.75（藍） | 正確 | 以 `home.css:5` 的 `#f2f1ed` 為背景，對 DESIGN 的文字安全色重算：藍 `#1967d2` 4.75、綠 `#24763a` 4.98、珊瑚 `#b32643` 5.67、琥珀文字 `#8a5a00` 5.24、紫 `#833ab4` 5.75。色值見 `DESIGN.md:65`、`:70`、`:75`、`:89`、`:83`。若「五種顏色」指 base 色而非 strong/text 色，這個結論不成立，須明訂。 |
| D1 深色最低 5.36（紫） | 無法確認 | 未列背景 token 與量測程式。用 `home.css:18` 的 `#242825` 重算 DESIGN 深色五色，最低紫 `#c58af9` 為 5.96，不能重現 5.36。若換 surface 背景會有不同結果，不能據此猜原量測條件。色值見報告 HTML `:86`。 |
| 石板藍對比度 6.56／9.17 | 正確 | `home.css:12` 的 `#365a6b` 對 `:5` 的 `#f2f1ed` 得 6.56；`:25` 的 `#bbced4` 對 `:18` 的 `#242825` 得 9.17。只證明這兩組，未證明所有 pill、solid、hover 背景。 |
| 全站搬完只要一般標籤即可保證 file 預覽完整可用 | 無法確認 | 一般標籤符合 `AGENTS.md:15` 的資料載入規則，但不能靜態保證瀏覽器對 `file://` 的 storage 行為、外部字型／地圖可用性。Noosa `script.js:340` 還直接讀 storage。應區分「本機檔案可開」與「無網路可完整使用」。 |

## 問題與風險

1. **高｜統一語言 key 可能讓 Noosa 直接失敗。** 報告 `:519`、`:945` 存 `zh`；Noosa `script.js:340` 不驗證就讀值，`:380`、`:845` 直接索引 `languages[state.lang]`。若改報告 key 卻保留值，切回中文再開 Noosa 可能取得 `undefined`。**建議怎麼改：** 全站 storage 契約定為 `zh-TW/en`，報告的資料查找仍可轉為 `zh/en`；URL 的 `?lang=zh` 對應存 `zh-TW`。統一無值、錯值、storage 不可用的 fallback，並測試報告→Noosa 雙向切換。報告目前以瀏覽器語言 fallback（HTML `:530`），其他頁預設中文；也需明訂是否保留差異。

2. **高｜共用 JS 缺少介面與初始化順序。** 首頁 `home.js:1`、`:2` 使用全域變數，三份程式都有圖示與主題事件；map-list `:715`、Noosa `:859` 在重繪文字時再次套主題。若只加 `site.js`，舊 listener 或舊狀態可能覆寫新值、重複切換。**建議怎麼改：** 先定義隔離的 site API、單一狀態來源與頁面翻譯 callback／事件，明確規定只綁定一次。頁面 renderer 仍負責翻譯與重繪；用相容介面逐頁切換，沒有改用新介面的頁面不得提前移除舊邏輯。保持 `PAGE_CONFIG`／`PAGE_DATA` 先於 map-list，以及報告資料先於主程式；避免 `async`，新增全域名稱不得碰撞。

3. **高｜列印沒有完整重設主題，且驗證漏報告。** Noosa `style.css:1003` 僅把 body 設 white，未重設深色文字／表面 token；報告 HTML `:455` 亦只改 body，子元件仍可繼承深色 token。map-list `:961` 雖有重設，但未覆蓋所有列印可能使用的語意 token。**建議怎麼改：** 設計完整、優先序足夠的列印 light token 覆蓋，放在共用 token 檔中；保留各頁列印版面與小字例外。三種旅遊頁與報告均從顯式 dark、顯式 light、system-dark 列印。把「現狀即正確」與「修正既有深色列印問題」分開列出，不能同時要求完全不變又修復。新 header、返回 pill、控制按鈕另有明確隱藏規則。

4. **高｜不能直接把同名 selector 當成同一元件。** 首頁 `.pill` 是 44px 互動連結（`home.css:76`）；報告 `.pill` 是 11px 證據標籤（HTML `:387`）；map-list `.pill` 是地圖等操作（CSS `:766`）。把首頁 `.pill` 放入 base，報告沒有覆寫的 `display/min-height/background` 等會滲入。共用 reset 也不同：map-list `:8` 全元素清 margin/padding，首頁 `home.css:44` 只有 box-sizing。**建議怎麼改：** 共用互動元件用明確 class 或作用域，報告的證據標籤與互動 pill 分開；列出 reset、body、header、h1～h3 的責任與覆寫順序。不要把旅遊的 `height:100%; overflow:hidden` 全站化。

5. **中｜D1「單一藍」與首頁不變的驗收矛盾。** 首頁 primary 是 `#496b7b/#a7bdc5`，strong 才是 D1-2 的 `#365a6b/#bbced4`（`home.css:11`、`:12`、`:24`、`:25`）；focus/hover 目前使用 primary（`:48`、`:58`）。**建議怎麼改：** 明確定義「一種藍」是同色系的 base/strong 階梯，還是兩個 token 要同值。若改同值，focus/hover 就是預期差異；步驟 3 與第 5 節不得要求首頁完全相同。品牌 17→18 本來也是預期差異。

6. **中｜D4 跨頁抽取不能以較新版本一概覆蓋。** Noosa `.chip` 依 d1/d2 分組，map-list 有自身預設色；`.tag` 尺寸也不同（Noosa `:698`、`:780`；map-list `:253`、`:627`）。CSS 外框高度、字級會影響兩支仍獨立的抽屜與拖曳程式。**建議怎麼改：** 先提供 selector＋media context＋宣告差異清單，再決定共用／變體／保留。跨頁不同狀態用 modifier 保留；截圖確認後才刪原規則。尤其測試 767/768px、拖曳上下限、抽屜展開／收合、active chip、lightbox 與 toast 疊層。

7. **中｜防閃色 script 不是每頁原本都有。** 只有首頁 head 有（`index.html:12`）；旅遊目前在主程式初始化才讀 theme，報告沒有。報告還有不受 `[data-theme]` 限制的深色按鈕陰影規則（HTML `:164`）。**建議怎麼改：** 各頁在第一份本機 CSS 前執行最小、含 try/catch 的 theme bootstrap；統一為淺色、顯式深色、無 override 的系統深色三種情境。所有殘留的系統 dark component 規則也要遷移，不能只抽 `:root`。

8. **中｜D2 搬移、凍結副本與資料例外需精確化。** 「所有 CSS／JS 集中」與 `home-demo.*` 凍結、`page.js/data.js` 留原地是明示例外，應列入 manifest，避免誤搬。Noosa 的 `ITINERARY_DATA` 本身就在 `script.js:1` 起，按目前方案會隨 `noosa.js` 搬走，與「內容資料留在頁面旁」也不完全一致。**建議怎麼改：** 明訂 Noosa 內嵌資料本次維持不拆的例外，不額外擴張工作。報告抽出主程式時維持 IIFE 與位置。現有受查 CSS 沒找到 `url(...)`；JS 的照片字串（map-list `:471`、Noosa `:116`）是交給 DOM 的相對 URL，仍以 HTML 目錄解析，不能因 JS 搬家改成相對 scripts 目錄。

9. **中｜回首頁路徑與點擊隔離需逐頁落實。** Noosa 必須用 `../../../index.html`，不能抄咖啡頁路徑。旅遊 header 的 click listener 見 map-list `:790`、Noosa `:987`。**建議怎麼改：** 返回連結保留原生 `<a>`，只阻止冒泡，不呼叫 `preventDefault()`；確認鍵盤 Enter 與滑鼠都能導航，抽屜狀態不被改動。新增連結也須測試 filter、語言重繪後仍存在、文字更新正確。

10. **中｜版本更新尚無完整依賴清單。** 咖啡與烘焙目前共用資源同版號（兩頁 `index.html:12`、`:84`），報告資料 `:503`、Noosa `itinerary.html:10`、`:65` 原本未加版號。**建議怎麼改：** 建立每頁→所有 CSS／JS／資料的依賴表；改共用檔要更新每個引用者，列出版本命名規則，包含新增 tokens/base/app-shell/site。`?v=` 不會保證 HTML 本身已更新；部署後必須核對實際 HTML 引用與資源內容，不能只看 console 沒 404。遠端快取時間須另外實測。

11. **中｜全站視覺一致尚漏 SVG 圖表、狀態與可及性。** 報告的 SVG 有 JS 內建字級 13.5／15.5（HTML `:595`、`:690`），CSS 有圖表專用 21px（`:407`），資料檔也引用語意色（`.data.js:55`、`:66`）。只整理 CSS 不會涵蓋全部。focus、disabled、selected、hover、loading、error、lightbox 與長標籤也未列入驗收矩陣。**建議怎麼改：** 把 JS/SVG 的視覺常數、資料中的 token 參照列入盤點；圖表字級可明列例外或另訂規則。統一 focus、減少動態、safe area 與控制尺寸；地圖／照片維持現有自然顯示的範圍例外。報告與旅遊頁版面目的不同，不應為一致強迫使用同一容器寬度。

12. **低｜圓角與間距只有盤點，沒有逐步落地要求。** 第 4 節主要明列換色、字級與外框，未規定哪些 2/10/24px 圓角、非 4px 間距要改，或作為功能例外保留。**建議怎麼改：** 補一張元件→spacing/radius/shadow token 對照，包含 999px 圓形／pill 例外；不要誤改列印的 7px。`DESIGN.md:182` 的單一斷點是旅遊 app 規則，報告已有 480/560/900px（HTML `:133`、`:327`、`:446`），文件要明訂適用範圍。

## 缺漏的步驟

1. **1c 前建立基準與搬移 manifest。** 列出舊→新檔名、每頁相對路徑、版本、載入順序與不搬例外。五個正式入口為首頁、咖啡、烘焙、Noosa、報告；另確認凍結 demo 未受共用檔影響。記錄基準 commit、瀏覽器、固定 viewport、字型已載入狀態及頁面狀態，避免地圖非同步內容造成假差異。
2. **先定義 site 契約與 token 契約。** 規定語言儲存值、報告資料語言轉換、URL 優先序、無效值 fallback、theme 狀態、storage 例外、事件綁定與翻譯回呼。列出每個舊 token／別名的目的地，驗證 `var()` 沒有缺漏、循環或非預期 fallback。
3. **搬移驗證不可只有 404。** 核對新舊 CSS／JS 主體相同（報告排除包覆標籤）、HTML 引用順序、Network 成功載入、語法／runtime error、DOM 內容與互動。資源找得到但載入順序錯仍會失敗。1c 的純搬移可以要求相同；後續另列已核准變更清單。
4. **補 D7 的實作落點。** 第 4 節沒有明確要求五個入口全數換同一 Fonts URL，或搜尋並改掉所有 650/750。將這些動作放入各頁接入步驟，並在最後全站搜尋；字型實際下載與最終 rendered weight 仍要用瀏覽器驗證。
5. **抽 app-shell 前先做可重現差異表。** 附 selector、media context、來源行號與預期差異；Noosa 的比較需有隔離預覽，再依既定流程確認。驗證 CSS 抽取不會改變兩支抽屜 JS 假設，才刪原規則。
6. **補完整狀態與尺寸矩陣。** 淺／深／system、中文／英文、320/375/390、767/768 與桌機；首頁文字連結／pill、店家多分類與長名稱、Noosa 兩天行程、報告全部圖表。互動含地圖預覽／回 overview、篩選／清除、抽屜／拖曳、照片／關閉、回頂端、回首頁與 Tab focus。跨頁驗證 `?lang=en`、`?lang=zh`、無 URL、錯誤 storage 值、storage 禁用。
7. **補對比度量測清單。** 保留可重跑的量測方式或把精確色對與輸出記在計畫；以 sRGB 相對亮度、`(L較亮+0.05)/(L較暗+0.05)` 計算。背景需分 bg/surface/soft/solid，另處理 opacity 合成後的顏色與 SVG 文字。一般文字至少 4.5:1；非文字控制邊界與 focus 也需檢查，不能只測五個分類色對 body。
8. **加入所有可列印頁的驗證。** 螢幕深色／系統深色切到 A4 預覽，兩種語言均檢查前景／背景、分頁、頁數、隱藏控制、內容完整。列印色票應集中定義但保留各頁版面例外。
9. **補工具與文件落點。** 將 `travel/tools` 的兩處文字更新明列於 1c 或文件步驟，另含兩頁 `page.js:1`、`home.js:25` 等舊路徑註解。工具輸出位置保持不變；若要驗證重新產生資料，輸出到暫存路徑比對，避免把無關資料更新混入樣式工作。
10. **補 file 預覽與部署收尾。** 人工逐頁開 `file://`，核對 CSS、JS、照片及 fallback；跨檔 storage 不保證共享，需另列平台實測結果。以 HTTP 同源驗證跨頁設定。部署後對實際 GitHub Pages 入口核對版本與資源，再檢查舊快取情境；本機通過不能代替部署驗證。
11. **補可執行的回退方式。** 每一步 commit 前必須通過該階段檢查；記錄階段基準與驗收結果。失敗時用針對該步 commit 的 `git revert <commit>` 回退，並連同 HTML 引用、檔案與文件成對還原；已部署時再以新版本更新引用，避免舊快取。不要使用 `git reset --hard`。共用檔變更失敗須回驗所有使用頁，不能只回驗最後改的一頁。
12. **最後才進行 demo 清理。** 刪除前三檔精確清單與使用者確認仍依原計畫保留；刪除完成後檢查引用、正式入口及文件。計畫開頭「等逐題決定」也應與已完成的進度表一致。

## 對 D1～D8 的意見

| 決定 | 意見 | 理由 |
|---|---|---|
| D1（含 D1-2） | 有疑慮 | 同意暖灰基底與分類色分工，但須明訂 primary／strong 是否保留階梯、列出所有 surface 與文字色對；深色最低值未重現。首頁不變的驗收也要配合已核准差異調整。 |
| D2 與 D2 改版 | 同意 | 用根目錄 `styles/`、`scripts/` 搭配逐頁相對路徑可行；以 3.1 的新版為準，避免執行舊 `shared/` 建議。需補 manifest、Noosa 路徑、demo／資料例外、Noosa 內嵌資料例外及版本依賴表。 |
| D3 | 同意 | 固定命名字級可降低漂移；需補 320px、英文長標籤、圖表字級及列印例外，不把報告本來的 display clamp 或所有 JS 字級默默遺漏。 |
| D4 | 有疑慮 | 共用外框、保留時間軸與獨立互動 JS 合理；「不同就採咖啡版本」不是足夠的技術準則，selector 統計也不可重現。先列狀態與 media context，再決定共用與變體。 |
| D5 | 有疑慮 | 同意統一 theme 與語言，但必須先處理 `zh`／`zh-TW`，包含 URL 寫回與 Noosa 無效值防護；僅換 key 有實際失敗風險。 |
| D6 | 同意 | 回首頁連結補足站內導覽；Noosa 路徑應改為三層，並明確保留原生導航、阻止冒泡、列印隱藏及語言重繪後狀態。 |
| D7 | 同意 | 統一 URL、保留 600、收斂 650/750 方向合理；補實作步驟與 rendered font 驗證。「多列字重不會多下載」不能當無條件保證，依 Google 回傳 CSS、瀏覽器及實際用字決定，尚未做 Network 實測。 |
| D8 | 同意 | 正式頁整理期間保留凍結 demo 有助對照。testLab 刪除已可由 git 查證；未來刪 demo 仍要依既定確認流程，此次審查不構成刪除授權。 |

## 無法確認的地方

- **原 selector 統計的精確口徑。** 未附程式或輸出，無法證明 165／125／50／22／28；本次提供兩種明訂口徑的重算結果，但不冒稱任一種就是原作者口徑。
- **深色 5.36 與未調好的暖色淡背景。** 原計畫未記錄精確背景與測試組合，新淡色底尚未落地，無法確認全站 AA。
- **瀏覽器最終字型與下載量。** 已核對 URL 與宣告；未取 Google Fonts 即時回應、未檢查 rendered fonts／Network，不能保證 650/750 的實際渲染在所有環境都一致，也不能保證新增字重一定零下載變化。
- **GitHub Pages 現行快取時間。** `DECISIONS.md`、工具 README 有歷史敘述，但本次未讀遠端 response headers 或部署紀錄；不能確認目前仍是約十分鐘、或 `?v=` 已涵蓋 HTML 快取。
- **file 協定的跨頁 storage 與真正離線體驗。** 相對檔案路徑可靜態核對；不同瀏覽器、設定及外部地圖／字型載入須實測，不能把 file 可開與無網路可用視為同一件事。
- **新共用檔的視覺與互動結果。** `styles/`、`scripts/` 的目標尚未實作，未取得新舊截圖、列印輸出或互動測試證據，因此本報告列的是計畫風險與驗收補強，沒有宣稱新方案已通過 QA。
- **歷史對話的核准。** repo 計畫與 git 可以證明記錄與變更存在，不能獨立證明使用者當時確認了哪些截圖或刪除清單。
