# 澳洲得獎咖啡與烘焙：官方賽事研究

- 研究日期：2026-10-26
- 範圍：2024–2026 年已正式公布的結果，澳洲全境
- 狀態：**草稿，等使用者確認收錄範圍**（見 `PLAN.md` 待決定 D1～D4）
- 原始資料：`research/ras_professional_bakery_2024-2026.csv`（Sydney Royal 三年逐筆成績，818 筆）、`research/nabc_results_2024-2026.csv`（NABC 三年名次，69 筆）。兩個檔都是從官方來源逐筆轉出，每列附來源網址

## 1. 結論先講

| 賽事 | 主辦 | 獎項制度 | 2024 | 2025 | 2026 | 可以直接用嗎 |
|---|---|---|---|---|---|---|
| Sydney Royal Fine Food Show – Professional Bakery | Royal Agricultural Society of NSW（RAS） | **分數制獎牌**：90 分以上金牌、82～未滿 90 銀牌、74～未滿 82 銅牌；另有 4 個 Champion | ✅ 逐筆成績；⚠️ 冠軍名單只有搜尋快取 | ✅ 逐筆成績＋冠軍 | ✅ 逐筆成績＋冠軍 | **可以**。官方 HTML 有參賽者郵遞區號，最可靠 |
| National Artisan Baking Competition（NABC） | Baking Association of Australia（BAA），在 Baking Industry Trade Show 舉辦 | **名次制**：每班第 1/2/3 名，另有 3 個 Champion | ✅（掃描檔，人工讀出） | ✅ | ✅ | **可以**，但官方表**沒有地址**，有些名次是**個人＋店名** |
| Golden Bean Australasia | Golden Bean（烘豆師競賽，含紐西蘭與其他國家參賽者） | 分數制金／銀／銅牌＋Overall／Large／Small Franchise Champion | ✅ 冠軍；⚠️ 分類獎牌是投影片圖片 | ✅ 冠軍；⚠️ 同左 | ⚠️ 官網只寫總冠軍 | **冠軍可以**；分類金牌要人工從圖片轉錄（每年約 11 類、上百張投影片） |
| ASCA Australian Coffee Championships | Australian Specialty Coffee Association | **個人賽**名次（Barista、Brewers Cup、Latte Art、Cup Tasters、Coffee in Good Spirits、Roasting） | ⚠️ 官網沒有公告，只有媒體 | ✅ 2025 ACC、2025 Barista | ⚠️ 2026 賽季（2025-11 比賽）官網沒有公告 | **不建議當成店家得獎**：是個人獎，官網多數公告不寫任職店家 |

三個最重要的發現：

1. **金牌 ≠ 第一名。** Sydney Royal 依分數給牌，同一班可以有好幾面金牌（2025 年 Savoury Pie 班 8 面金牌）。媒體常把「分數最高」寫成「第一名」，甚至寫錯牌別（見第 5 節衝突 C1）。
2. **得獎單位常常不是一家門市。** RAS 的參賽者地址是登記地址（常是中央廚房或總部）；NABC 有「人名 - 店名」和「Bonfire Bread Marrickville／Avalon／Lane Cove」這種門市別。所以**獎項查證和門市查證要分開**，各自有狀態。
3. **很多得獎者不是能去的店。** 例如 Woolworths、Falcones、Tucker's Natural、Kurrajong Kitchen 是製造商或超市品牌。網站要先決定「只收有實體門市可以去的店」（待決定 D2）。

## 2. 各賽事研究

### 2.1 Sydney Royal Fine Food Show – Professional Bakery（RAS）

**官方來源**

| 來源 | 網址 | 內容 |
|---|---|---|
| 賽事頁 | https://www.rasnsw.com.au/competitions/food-beverage-and-produce/professional-bakery-details | 類別、2026 時程（評審 2026-08-06～07，結果 08-10，冠軍 09-15） |
| 逐筆成績（myRAS） | `https://www.myras.com.au/res/results/CompetitonResults.aspx?...&SY=<年>&SN=17&CT=2...`（完整網址見 research csv 的 `source_url`） | 每筆：獎牌、目錄編號、參賽者＋城鎮＋州＋郵遞區號、產品、分數、生產者、網站。**2024、2025、2026 都有** |
| 2026 冠軍手冊 | https://www.rasnsw.com.au/globalassets/document-library/rasnsw/competitions/_shared/finefood/2026_finefoodchampionsbooklet_a5_online.pdf | 4 個烘焙冠軍 |
| 2026 成績目錄 | https://www.rasnsw.com.au/globalassets/document-library/rasnsw/competitions/_shared/finefood/2026finefoodcatalogueweb.pdf | 評審評語、獎牌分數門檻（第 299–301 行） |
| 2025 成績目錄 | https://www.rasnsw.com.au/globalassets/document-library/rasnsw/competitions/fine-food/competitions-fine-food-catalogue-2025.pdf | 冠軍名單（p.13）、分數門檻 |

**獎牌門檻**（2025、2026 目錄都寫明，烘焙組適用 100 分制）：金 ≥ 90；銀 82～未滿 90；銅 74～未滿 82。未達 74 分沒有獎牌（csv 的 `award` 是空白）。研究 csv 抽查：所有金牌 ≥ 90、銀牌 82–89.5，和門檻一致。

**三年筆數**（myRAS，含未得牌）

| 年 | 總筆數 | 金 | 銀 | 銅 | 無 |
|---|---|---|---|---|---|
| 2024 | 263 | 40 | 99 | 88 | 36 |
| 2025 | 310 | 56 | 121 | 86 | 47 |
| 2026 | 245 | 48 | 75 | 62 | 60 |

**冠軍**

| 年 | Champion Bread | Champion Cake | Champion Biscuit | Champion Pastry | 狀態 |
|---|---|---|---|---|---|
| 2024 | Slowbreads Roseville（White Sourdough） | The Gumnut Patisserie（ChocoBerry Swirl） | Three Mills Bakery（Salted Chocolate Rye Cookie） | Hungerford Meat Co（MR Charcuterie Pork Pie） | **PARTIAL**：只在搜尋引擎快取的 RAS 頁面看到，現在的 RAS 頁面已換成 2026。四項產品都在 myRAS 2024 有金牌紀錄，但「冠軍」這個頭銜沒有現存官方頁面可引用 |
| 2025 | Slowbreads Roseville（Fig, Cranberry and Walnut Sourdough） | The Gumnut Patisserie（Rock & Roll） | Continental Taralli Biscuits（Tarallini – Parmesan Cheese & Onion） | The Piefather（MICKTACO） | **VERIFIED**（2025 目錄 p.13） |
| 2026 | Wholegreen Bakery（Vegan Gluten-Free Plain Sourdough 500G） | ISEO Patisserie（ISEO Vegan G.F Banana Cake） | Sweet Ivy（Lemon Macaron） | Little Secrets Bakehouse（Citrus Meringue Tart） | **VERIFIED**（2026 冠軍手冊） |

2025、2026 另有 Best Professional Bakery Apprentice/Student Exhibit：2025 Not Awarded；2026 目錄有列這項，得主還沒逐字核對（學生獎，建議不收，見 D1）。

**班別每年不同**：例如 2026 新增 Class 20 Gluten Free Bread、Class 21 Gluten Free Sweet Bread Cake；2025 的 Class 16 Filo、2026 變成 Class 15。**不可以用班號跨年比對**，要用年＋班號＋班名。

**另外看到**：2025 Specialty Foods 有 **Champion Coffee**（Coffee Mentality，"Auditory" Blend 200g，2025 目錄 p.13）。這是 RAS 的咖啡獎，可以當咖啡的第五個來源（待決定 D4）。

### 2.2 National Artisan Baking Competition（BAA）

| 來源 | 網址 |
|---|---|
| 賽事頁 | https://bakingtradeshow.com.au/artisancompetition/ |
| 2026 官方結果 | https://bakingtradeshow.com.au/wp-content/uploads/2026/07/2026-ARTISAN_BAKING_official-results.pdf（另一份相同檔：https://bakingbusiness.com.au/wp-content/uploads/2026/06/2026ARTISAN_BAKING_officialresults.pdf） |
| 2025 官方結果 | https://bakingtradeshow.com.au/wp-content/uploads/2025/07/2025-National-Artisan-Baking-Competition-Official-results.pdf |
| 2024 官方結果 | https://bakingbusiness.com.au/wp-content/uploads/2024/06/National-Artisan-Results-2024.pdf（**掃描檔**） |
| 各年結果索引 | https://bakingbusiness.com.au/results/ |

- 檔頭寫「BAKING ASSOCATIONS OF AUSTRALIA OVERALL RESULTS SUMMARY」（原文拼字），7 個班＋3 個 Champion。
- 2024 是掃描檔，文字抽不出來；我把 PDF 裡的黑白文字圖層轉成圖片後人工讀取，三張圖層合起來是完整表格。研究 csv 的 note 欄有標註。
- 2026 在 Gold Coast 舉辦（媒體 2026-07-01 報導）；2027 在 Melbourne Caulfield Racecourse（2027-06-29～07-01）。2024、2025 的地點官方頁沒寫。
- **官方表只有名字，沒有地址和州別**。要另外查每家店的位置。
- **班別會變**：2024 的 002 是 Native or Heirloom Sourdough、004 是 Sourdough Tin Bread；2025/2026 的 002 是 Rye、004 是 Baguette。
- `bakingbusiness.com.au` 是業界媒體，但它的 Results 頁直接放 BAA 的官方結果 PDF（和 `bakingtradeshow.com.au` 上的檔案相同）。我把「PDF 本身」當官方來源，網站文章當媒體。**BAA 和 Baking Business 的確切關係還沒查證**。

**三年冠軍**

| 年 | Champion Product of Show | Champion Sourdough Loaf | Champion Viennoiserie |
|---|---|---|---|
| 2024 | Piece of Cake Bakery（Class 6） | Wandin Bakery（Class 7） | Piece of Cake Bakery（Class 6） |
| 2025 | Bonfire Bread Marrickville | Bonfire Bread Marrickville | Parfait Patisserie – Alex Miller |
| 2026 | Robert Trimboli – Adelaide's Finest Bakeries & Patisserie（Class 7 Open Sourdough） | 同左 | 同左（Class 5 Croissant） |

逐班名次見 `research/nabc_results_2024-2026.csv`。

**BAA 的其他賽事**（`bakingbusiness.com.au/results/` 都有 2024–2026 官方 PDF，這次**沒有研究內容**）：Great Aussie Meat Pie、Australia's Best Pie and Pastie、National Donut、Great Australian Vanilla Slice Triumph、National Excellence in Baking（個人）、Newcastle／Tasmania／Queensland／South Australia／Victorian／Canberra／Wollongong Baking Show。第一版不收，見 D4。

### 2.3 Golden Bean Australasia

| 來源 | 網址 |
|---|---|
| 首頁 | https://goldenbean.com.au/（列出 2026 Overall Winner、2026 舉辦資訊） |
| 2025 結果 | https://goldenbean.com.au/pages/2025-winners（冠軍文字＋11 類 `Cat_N_Medalists.pdf`） |
| 2024 結果 | https://goldenbean.com.au/pages/2024-winners（冠軍文字＋11 類 `GBA_2024_Category_N-results.pdf`） |
| 歷屆 | https://goldenbean.com.au/pages/past-winners |

**冠軍**（官網文字，VERIFIED）

| 年 | Overall Champion | Large Franchise Champion | Small Franchise Champion |
|---|---|---|---|
| 2024 | White Horse Coffee Roasters | Black Bag Coffee Roasters | Espresso Club Australia |
| 2025 | Glee Coffee Roasters | Black Bag Coffee Roasters | Espresso Club Australia |
| 2026 | 官網首頁：Sam Shih，Espresso Club Australia（2026-06-16～20，Brisbane，Latitude Coffee Roasters 承辦） | 官網沒有 | 官網沒有 |

- **2026 是 PARTIAL**：官網只有首頁一行，沒有結果頁；名字拼法和 BeanScene（Sam Shi）不同（衝突 C5）。
- **分類獎牌**：11 類（Espresso、Milk-Based、Pour Over/Filter、Alternative Milk、Decaf、Elite、Super Automatic Espresso、Large/Small Chain Espresso、Large/Small Chain Milk）。PDF 是投影片圖片，沒有文字層。抽查 2025 Category 1 Espresso：全 25 張投影片只有 1 面金牌（Alan Chan，The Bean Cartel，"Apricot Delight"），**其餘還沒轉錄**。
- 投影片格式是「烘豆師姓名／公司／產品」，**沒有地址和國家**。參賽者有紐西蘭與其他國家，要逐家確認是澳洲的店。
- 烘豆商不一定有可以去的店（規則 5）：要查有沒有附設咖啡廳或零售門市。

### 2.4 ASCA Australian Coffee Championships

| 來源 | 網址 | 內容 |
|---|---|---|
| 2025 ACC 結果 | https://australianspecialtycoffee.com.au/2025-australian-coffee-championship-results/ | Latte Art、Coffee in Good Spirits、Cup Tasters、Brewers Cup、Roasting 前三名，**只有姓名** |
| 2025 Barista 結果 | https://australianspecialtycoffee.com.au/2025-oatly-australian-barista-championship-results/ | 2025-06，Coffee Works Express（Epping）：1 Jack Simpson – Axil Coffee Roasters、2 Gabrel Tan – Veneziano Coffee Roasters、3 Tony Xie – Plus Two Coffee |
| 2026/27 賽季 | https://australianspecialtycoffee.com.au/australian-coffee-championships/ | 2026-11-19～22，Big Plans（North Melbourne），**還沒比** |

- 官網 sitemap 裡 2023-10 之後只有上面兩篇結果公告，**2024 全部項目、2026 賽季（2025-11 在 Big Plans 比的）都沒有官方公告**，只有 BeanScene 等媒體（BeanScene 擋自動讀取，回 403）。
- **年份命名**：ASCA 的「2026 Australian Barista Champion」是 2025 年 11 月比出來的。資料要分開記「頭銜年份」和「比賽日期」。
- 所有項目都是個人獎（規則 4）。即使官方寫了任職店家，那也是「選手當時任職的公司」，不是店家得獎。

## 3. 研究覆蓋矩陣（Competition × Year × Category × Status）

狀態：✅ 已取得官方完整資料　⚠️ 部分　❌ 找不到官方資料　— 不適用

| 賽事 | 類別 | 2024 | 2025 | 2026 | 備註 |
|---|---|---|---|---|---|
| RAS Professional Bakery | 全部班別（麵包、蛋糕、餅乾、酥皮／派、學徒班） | ✅ | ✅ | ✅ | myRAS 逐筆 |
| RAS Professional Bakery | 4 個 Champion | ⚠️ | ✅ | ✅ | 2024 只有快取 |
| RAS Specialty Foods | Champion Coffee | 未查 | ✅（冠軍） | 未查 | 範圍外，待 D4 |
| NABC | Class 001～007 | ✅ | ✅ | ✅ | 無地址 |
| NABC | 3 個 Champion | ✅ | ✅ | ✅ | |
| Golden Bean | Overall／Large／Small Franchise | ✅ | ✅ | ⚠️ | 2026 只有總冠軍 |
| Golden Bean | 11 個分類的金／銀／銅牌 | ⚠️ 圖片未轉錄 | ⚠️ 只轉錄 Cat 1 金牌 | ❌ 還沒公布 | 人工轉錄工作量大 |
| ASCA | Barista | ❌（只有媒體） | ✅ | ❌（只有媒體） | 個人獎 |
| ASCA | Brewers Cup、Latte Art、Cup Tasters、CIGS、Roasting | ❌（只有媒體） | ✅（無任職店家） | ❌（只有媒體） | 個人獎 |

## 4. 原始候選名單查證結果

詳細見 `CANDIDATES.md`。摘要：

| 候選 | 官方得獎紀錄 | 獎項狀態 | 門市狀態 |
|---|---|---|---|
| Burleigh Baker | RAS 2026 金牌 4 面（Sourdough Croissant 94.5 是 Viennoiserie 班最高分）；NABC 2026 Rye 第 1、Baguette 第 2（Maxine Bernard 名義） | VERIFIED | PARTIAL：參賽地址 Varsity Lakes QLD 4227，實際門市未查 |
| Adelaide's Finest | NABC 2026 三項 Champion＋5 個第 1（Class 003～007）、2 個第 2（Class 001、002）（Robert Trimboli 名義） | VERIFIED（個人代表店家） | PARTIAL：媒體說是 Frewville、Pasadena 兩家 Foodland，官方沒寫門市 |
| Crois | RAS 2026 Croissant Plain 金牌 93.67、White Sourdough 銀牌；NABC 2026 Croissants 第 2、Viennoiserie 第 2＋第 3 | VERIFIED | PARTIAL：參賽地址 Wollongong NSW 2500，Time Out 寫 75 Market St |
| Three Mills Bakery | RAS 2024 金 2、2025 金 4、2026 金 4；2024 Champion Biscuit（PARTIAL） | VERIFIED（冠軍除外） | PARTIAL：參賽地址 Fyshwick ACT 2609 |
| Wholegreen Bakery | RAS 2026 Champion Bread＋金 5；2025 金 5；2024 金 1 | VERIFIED | PARTIAL：參賽地址 Alexandria NSW 2015（可能是工廠）；零售店地點和營業狀態未確認 |
| Parfait Patisserie | NABC 2025 White Sourdough 第 1、Croissants 第 1、Champion Viennoiserie、Open Sourdough 第 2 | VERIFIED | PARTIAL：官方沒地址，媒體寫 Kiama NSW |
| Bonfire Bread | RAS 2024 金 1、2025 金 2、2026 金 5；NABC 2025 Champion Product of Show＋Champion Sourdough Loaf（Marrickville）等 | VERIFIED | PARTIAL：多門市（Balmain、Avalon、Marrickville、Lane Cove），獎項要對到門市 |
| Piece of Cake Bakery | NABC 2024 Champion Product of Show、Champion Viennoiserie、Class 6 第 1～3 名 | VERIFIED | PARTIAL：官方沒地址；業界訪談暗示在 Melbourne，未確認 |
| ONA Coffee | ASCA 2025 Latte Art 冠軍 Victor Vu、CIGS 冠軍 Danny Wilson（官方沒寫任職店家，媒體說是 Ona） | PARTIAL（個人獎） | — |
| Axil Coffee Roasters | ASCA 2025 Barista 冠軍 Jack Simpson – Axil（官方） | VERIFIED 為**個人獎**；當成店家獎 → REJECTED | — |
| Seven Miles Coffee Roasters | 已查的官方來源都沒有 | 未找到（Golden Bean 分類圖片轉錄後再判斷） | — |
| Bellissimo Coffee | 已查的官方來源都沒有；自家網站說得過 Golden Bean Overall Runner Up，但沒寫年份 | 未找到（同上） | — |

## 5. 來源衝突紀錄

規則：官方和媒體衝突時，網站只用官方；衝突寫在這裡，不自行選擇。

| # | 項目 | 媒體說法 | 官方紀錄 | 處理 |
|---|---|---|---|---|
| C1 | 2026 RAS 可頌 | Time Out：Burleigh Baker「top honours」、Crois「second place」、Three Mills「third (bronze)」 | myRAS 2026 Class 18：Burleigh Baker **Sourdough Croissant** 金 94.5、Crois Croissant Plain 金 93.67、Three Mills Croissant **金** 91.33（不是銅牌）。RAS 沒有頒名次 | 用官方。三家都是金牌，不寫名次 |
| C2 | 2025 NABC Parfait | 搜尋摘要：「best flavoured sourdough 第三名」 | 2025 官方 PDF：Class 007 Open Sourdough **第 2**（Alex Miller） | 用官方 |
| C3 | 2025 ASCA Cup Tasters | 搜尋摘要：第 2 Ning-Chi (Amber) Cheng、第 3 Sinwu Nam | ASCA 官方：第 2 Sinwu Nam、第 3 Ning-Chi (Amber) Cheng | 用官方 |
| C4 | Wholegreen 冠軍地點 | 冠軍手冊：「Sydney, NSW」 | myRAS：Alexandria NSW 2015 | 都是官方，層級不同；門市另查 |
| C5 | 2026 Golden Bean 總冠軍姓名 | BeanScene：Sam Shi | Golden Bean 首頁：Sam Shih | 等官方結果頁；人名不上網站（獎項記在 Espresso Club Australia） |
| C6 | Piece of Cake Bakery 2024 | 業界訪談：「Baking Industry Trade Show 的 Champion Product 和 Champion Viennoiserie」 | NABC 2024 官方表一致（NABC 就在 Trade Show 舉辦） | 一致，不是衝突；記錄名稱差異 |
| C7 | Bonfire Bread 參賽地址 | — | RAS 2024：Balmain；2025、2026：Avalon；NABC 2025 有 Marrickville、Avalon、Lane Cove | 不是衝突，是多門市；每個獎要對到門市 |

## 6. 研究缺口和下一步需要的人工作業

| 缺口 | 影響 | 建議 |
|---|---|---|
| Golden Bean 2024、2025 分類獎牌是圖片 | 咖啡烘豆商的金牌名單不完整 | 先只收三項冠軍；分類金牌在 Step 1b 逐張讀圖轉錄（估 2～3 小時／年），或只轉錄金牌 |
| Golden Bean 2026 結果頁還沒公布 | 2026 只有總冠軍 | 每月檢查一次 `goldenbean.com.au/pages/2026-winners` |
| RAS 2024 冠軍頭銜 | 4 筆冠軍只能標 PARTIAL | 寫信問 RAS，或找 2024 冠軍手冊的存檔；在那之前網站顯示為「金牌」 |
| ASCA 2024、2026 賽季 | 只有媒體 | 不收（個人獎＋非官方），見 D3 |
| 所有得獎者的實際門市 | 沒有門市就不能上地圖 | 沿用咖啡廳計畫的方法：Google Maps 查地址、營業狀態、座標；每家記查核日期 |
| NABC 的「人名 - 店名」 | 是個人代表店家參賽，還是店家獎？ | 官方表把店名寫在一起，視為「代表該店參賽」：`relationship_type = staff_entry`，卡片顯示「由 X 代表參賽」 |
| 製造商、超市、連鎖加盟店 | 不是探店目標 | 見 D2 |

## 7. 研究方法紀錄

- myRAS 成績頁是 HTML，用一次性腳本轉成 csv（scratchpad，未進 repo）；抽查 2026 年和成績目錄 PDF 的金銀銅數一致（48／75／62）。
- RAS PDF 用 `pdftotext`（Git Bash 內建）轉文字；2025 PDF 版面複雜，自動解析漏了幾筆，所以以 myRAS HTML 為準。
- NABC 2025、2026 用 `pdftotext -table` 讀出表格；2024 掃描檔用上面寫的圖層轉圖方式讀取。
- Golden Bean PDF 抽出投影片 JPEG 後讀圖。
- BeanScene、Time Out 只當線索，不當驗證來源。
