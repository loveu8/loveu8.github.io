# 澳洲得獎咖啡與烘焙：候選名單

- 日期：2026-10-26
- 狀態：**研究用，不是正式名單**。這裡任何一筆都還沒上網站；上網站的條件見 `DATA-SCHEMA.md` 第 5 節
- 原始資料：`research/` 兩個 csv；賽事說明和衝突紀錄見 `RESEARCH.md`

## 判定方式

每家店分開記兩種狀態：

| 欄 | 意思 |
|---|---|
| 獎項狀態 | 這個獎是不是官方來源寫的、內容（年份、班別、牌別或名次、產品）是否完全對上 |
| 門市狀態 | 能不能對到一間**現在營業、可以去**的門市（地址、座標、營業狀態） |

狀態值：**VERIFIED**（官方來源完全對上）、**PARTIAL**（部分對上或缺資料）、**DISPUTED**（來源互相矛盾）、**REJECTED**（查證後不成立，或不符合收錄範圍）。

「範圍」欄是我依目前的建議（`PLAN.md` D2：只收有實體門市可去的店）先填的初判，等使用者定案。

縮寫：RAS = Sydney Royal Professional Bakery；NABC = National Artisan Baking Competition；GB = Golden Bean Australasia；金 = RAS 金牌（≥ 90 分）；第 1 = NABC 名次。

## 1. 原始候選（使用者提供的 12 家）

| # | 店家 | 類型 | 官方得獎（2024–2026） | 獎項狀態 | 門市線索 | 門市狀態 | 待確認 |
|---|---|---|---|---|---|---|---|
| 1 | Burleigh Baker | Bakery | RAS 2026 金 4：Sourdough Croissant 94.5（Class 18 Viennoiserie 最高分）、Sourdough Peanut Cookie 90.33、Chicken and Leek Meat Pie 90、Quiche Lorraine 90；NABC 2026：Rye 第 1、Baguette 第 2（「Maxine Bernard - Burleigh Baker」） | VERIFIED | RAS 參賽地址 Varsity Lakes QLD 4227 | PARTIAL | 有幾間門市？哪間是烘焙廠？NABC 的獎記在品牌，不指定門市 |
| 2 | Adelaide's Finest | Bakery（超市內烘焙） | NABC 2026：Champion Product of Show、Champion Sourdough Loaf、Champion Viennoiserie；Class 003～007 第 1；Class 001、002 第 2（「Robert Trimboli - Adelaide's Finest Bakeries & Patisserie」） | VERIFIED | 媒體（InDaily 2026-06-22）：Frewville、Pasadena 兩家 Foodland | PARTIAL | 店家類型算 Bakery 還是超市（D2）；獎項記在品牌還是兩家門市 |
| 3 | Crois | Bakery | RAS 2026：Croissant Plain 金 93.67、White Sourdough 銀 82.5；NABC 2026：Croissants 第 2、Open Speciality Viennoiserie 第 2＋第 3（「Matt Taylor - Crois」） | VERIFIED | RAS：Wollongong NSW 2500；Time Out：75 Market St | PARTIAL | 用 Google Maps 確認地址、營業 |
| 4 | Three Mills Bakery | Bakery | RAS 2024 金 2（含 Salted Chocolate Rye Cookie 93.33）、2025 金 4、2026 金 4（含 Croissant 91.33）；2024 Champion Biscuit | 金牌 VERIFIED；冠軍 PARTIAL | RAS：Fyshwick ACT 2609 | PARTIAL | Time Out 說 2026 可頌是「銅牌」，官方是金牌（衝突 C1，用官方） |
| 5 | Wholegreen Bakery | Bakery（無麩質） | RAS 2026 **Champion Bread**（Vegan GF Plain Sourdough 500G）＋金 5；2025 金 5；2024 金 1 | VERIFIED | RAS：Alexandria NSW 2015；冠軍手冊：Sydney NSW；舊報導：CBD 257 Clarence St、Waverley 原店、Bondi Junction 快閃 | PARTIAL | 現在營業的零售門市是哪幾家；Alexandria 是不是只有工廠 |
| 6 | Parfait Patisserie | Bakery | NABC 2025：White Sourdough 第 1（Troy Hindmarch）、Croissants 第 1＋**Champion Viennoiserie**（Alex Miller）、Open Sourdough 第 2 | VERIFIED | 媒體：Kiama NSW | PARTIAL | 官方沒地址，要確認 |
| 7 | Bonfire Bread | Bakery | RAS 2024 金 1（Balmain）、2025 金 2、2026 金 5（Avalon）；NABC 2025：**Champion Product of Show**、**Champion Sourdough Loaf**、Baguette 第 1（Marrickville）、Rye 第 1（Avalon）、White Sourdough 第 2、Baguette 第 3（Lane Cove） | VERIFIED | 至少 4 個地點：Balmain、Avalon、Marrickville、Lane Cove | PARTIAL | 每個地點是不是門市；RAS 的獎記在參賽地址還是品牌 |
| 8 | Piece of Cake Bakery | Bakery | NABC 2024：**Champion Product of Show**、**Champion Viennoiserie**、Open Speciality Viennoiserie 第 1～3、White Sourdough 第 2、Croissants 第 3 | VERIFIED | 官方沒地址；業界訪談提到店主一家搬到 Melbourne | PARTIAL | 找出地址、確認還在營業 |
| 9 | ONA Coffee | Roaster / Café | ASCA 2025 Latte Art 冠軍 Victor Vu、Coffee in Good Spirits 冠軍 Danny Wilson（**官方沒寫任職店家**，媒體說是 Ona） | PARTIAL（個人獎） | — | — | 依 D3：個人獎不算店家得獎 |
| 10 | Axil Coffee Roasters | Roaster / Café | ASCA 2025 Australian Barista Champion：Jack Simpson – Axil Coffee Roasters（官方） | 個人獎 VERIFIED；**當成店家獎 → REJECTED** | — | — | 依 D3 |
| 11 | Seven Miles Coffee Roasters | Roaster | 已查的官方來源都沒有 | 未找到 | — | — | GB 分類圖片轉錄後再判斷 |
| 12 | Bellissimo Coffee | Roaster / Café（Brisbane） | 已查的官方來源都沒有；自家網站寫「Golden Bean Overall Event Runner Up」和 Royal Fine Food 冠軍，但都沒寫年份 | 未找到 | Bulimba、Fortitude Valley（目錄網站）；布里斯本咖啡廳頁的 CF08 是 Bellissimo Coorparoo | — | 同上；如果有 2024–2026 的獎，可以和咖啡廳頁互相標註 |

## 2. 研究中新找到的店家

### 2.1 有冠軍頭銜的

| 店家 | 參賽地址（官方） | 冠軍 | 其他 | 範圍初判 |
|---|---|---|---|---|
| Slowbreads Roseville | Roseville NSW 2069 | RAS 2025 Champion Bread（Fig, Cranberry and Walnut Sourdough）；2024 Champion Bread（PARTIAL） | RAS 金：2024 3、2025 3、2026 3 | 收 |
| The Gumnut Patisserie | Mittagong NSW 2575 | RAS 2025 Champion Cake（Rock & Roll）；2024 Champion Cake（PARTIAL） | RAS 金：2024 7、2025 10；NABC 2025 Class 006 第 1～3（Tracy Nickl、Peter Theille） | 收 |
| The Piefather | Rosebery NSW 2018 | RAS 2025 Champion Pastry（MICKTACO） | RAS 金：2024 6、2025 5（2024 名稱是 THE PIEFATHER PTY LTD） | 收（要確認有門市） |
| ISEO Patisserie | Macquarie Park NSW 2113（網站只有 Instagram） | RAS 2026 Champion Cake | — | 待查：有沒有門市 |
| Sweet Ivy | Mosman NSW 2088 | RAS 2026 Champion Biscuit（Lemon Macaron） | — | 待查 |
| Little Secrets Bakehouse | Alexandria NSW 2015 | RAS 2026 Champion Pastry（Citrus Meringue Tart） | — | 待查 |
| Continental Taralli Biscuits | Magill SA 5072 | RAS 2025 Champion Biscuit | — | 初判不收（製造商） |
| Hungerford Meat Co | Branxton NSW 2335 | RAS 2024 Champion Pastry（MR Charcuterie Pork Pie，PARTIAL） | — | 初判不收（肉舖） |
| Wandin Bakery | 官方沒地址 | NABC 2024 Champion Sourdough Loaf | NABC 2024 Open Sourdough 第 1 | 待查地址 |

### 2.2 RAS 金牌（2024–2026，依金牌數排序，原始候選已列在上面的不重複）

| 店家 | 參賽地址 | 金牌（年：數） | 範圍初判 |
|---|---|---|---|
| Sacrebleu! Canelés and Co | Dee Why NSW 2099 | 2024：3、2025：2 | 待查 |
| Zweefers Cakes | Fairy Meadow NSW 2519 | 2024：3 | 待查 |
| Bakealicious by Gabriela | Forestville NSW 2087 | 2025：3 | 待查 |
| Hearthe | Stanmore NSW 2048 | 2024、2025、2026 各 1 | 待查 |
| This Is Us Baked Goods | Marrickville NSW 2204 | 2025：2、2026：1 | 待查（可能是批發） |
| Brazen Brownies | Thomastown VIC 3074 | 2024、2025 各 1 | 待查 |
| Sébastien Sans Gluten | Leichhardt NSW 2040 | 2024：2 | 待查 |
| Madame and Yves | Clovelly NSW 2031 | 2024：2（Plain Croissant 93.67、Valrhona Chocolate Eclair） | 待查 |
| Butter Baked Pastries | Rockdale NSW 2216 | 2025：2（Banana Bread 93、Croissant） | 待查 |
| Forestway Fresh | Terrey Hills NSW 2084 | 2025：2 | 待查（生鮮超市） |
| Bakers Delight Lane Cove | Lane Cove NSW 2066 | 2025：2 | D2（連鎖加盟店） |
| Racecourse Pie Company | Somersby NSW 2250 | 2025、2026 各 1 | 待查 |
| Tuga Pastries | Marrickville NSW 2204 | 2026：2（Rye & Caraway、Pastel de Nata） | 待查 |
| The Focaccia Factory | Georges Hall NSW 2198 | 2026：2 | 待查 |
| V's Dessert Gluten Free | Dee Why NSW 2099 | 2026：2 | 待查（網站只有 Instagram） |
| Cacao Chocolates & Patisserie | Cheltenham VIC 3192 | 2026：2 | 待查 |
| Bakehouse Delights | East Nowra NSW 2541 | 2026：2 | 待查 |
| Doughheads Junction | The Junction NSW 2291 | 2026：1 | 待查 |
| Hudson's Bakery | Bondi Junction NSW 2022 | 2026：1 | 待查 |
| Sussex Sourdough | Sussex Inlet NSW 2540 | 2026：1 | 待查 |
| Delicious & Simple by Svetlana | Ryde NSW 2112 | 2026：1 | 待查 |
| Pudding Lane | Sandgate NSW 2304 | 2026：1 | 待查（聖誕布丁專門） |
| Comeco Foods | Newtown NSW 2042 | 2025：1 | 待查 |
| Stoney Acre Produce | Caltowie West SA 5490 | 2025：1 | 待查 |
| Silver Tongue Foods | Maroochydore QLD 4558 | 2024：1 | 初判不收（餅乾製造） |
| 製造商與超市品牌：Tucker's Natural（SA）、Bite Size Coffee Treats、Kurrajong Kitchen Group、Woolworths、Falcones、Knutsford Gourmet（WA） | — | 合計 2024–2026 共 18 面 | 初判不收（D2） |

### 2.3 NABC 第 1 名（原始候選和上表已列的不重複）

| 得獎者（照官方寫法） | 年：班 | 範圍初判 |
|---|---|---|
| Sourdough Portland | 2024：001 | 待查（可能在 VIC Portland） |
| Riviera Bakery, Adelaide | 2024：002、003 | 待查 |
| Ottimo Bakery | 2024：004 | 待查 |
| Country Cob Bakery | 2024：005（Croissants） | 待查 |
| The Beekeeper's Bakery | 2025：007 | 待查 |
| Bakers Delight Albion Park Rail | 2025：003 | D2（連鎖加盟店） |
| Luke Moy - Coles Casuarina | 2026：001 | D2（超市內烘焙；**唯一的 NT 得獎**） |

### 2.4 咖啡

| 店家 | 官方得獎 | 獎項狀態 | 範圍初判 |
|---|---|---|---|
| White Horse Coffee Roasters（NSW） | GB 2024 Overall Champion | VERIFIED | 待查：有沒有咖啡廳 |
| Glee Coffee Roasters（NSW Central Coast／Hunter） | GB 2025 Overall Champion | VERIFIED | 待查 |
| Black Bag Coffee Roasters | GB 2024、2025 Large Franchise Champion | VERIFIED | 待查：所在州 |
| Espresso Club Australia（Brisbane） | GB 2024、2025 Small Franchise Champion；2026 Overall Champion（官網首頁，PARTIAL） | 2024–25 VERIFIED | 待查；在布里斯本，和咖啡廳頁可能有關聯 |
| The Bean Cartel（Melbourne） | GB 2025 Category 1 Espresso 金牌（"Apricot Delight"，Alan Chan） | VERIFIED | 待查 |
| Coffee Mentality | RAS 2025 Specialty Foods Champion Coffee（"Auditory" Blend 200g） | VERIFIED（RAS 2025 目錄 p.13） | D4（第五個來源） |
| Veneziano Coffee Roasters、Plus Two Coffee | ASCA 2025 Barista 第 2、第 3 名選手的任職公司 | 個人獎 | D3 |

## 2.5 第一批名單（Step 1b 第 1 項，2026-10-27）

依 D1（冠軍、金牌、第 1 名過門檻）、D2（有門市都收；超市、連鎖只收得獎那間；製造商不收）、D3（不收個人獎）、D4（RAS、NABC、Golden Bean）篩出。來源：兩份研究 CSV 全部的金牌、第 1 名、冠軍列，加上 Golden Bean 冠軍；同一家店的不同寫法已經合併（例：`HEARTHE`／`HEARTHE BAKERY`／空白 producer，`THE PIEFATHER`／`the pie father`，`Bitesize`／`Bite Size`）。

**門市都還沒查**。「門市疑問」欄是看名稱和參賽地址的初判，Step 1b 第 2 項逐家查證。

### A. 烘焙：要逐家查門市（46 家）

| 州 | 店家 | 過門檻的獎 | 門市疑問 |
|---|---|---|---|
| NSW | Bonfire Bread | RAS 金 8（2024 Balmain 1；2025、2026 Avalon 7）；NABC 2025 冠軍 2＋第 1 2（Marrickville、Avalon） | 多門市，獎要對到門市 |
| NSW | The Gumnut Patisserie | RAS 金 17（2024 7、2025 10）；NABC 2025 第 1 | Mittagong |
| NSW | Wholegreen Bakery | RAS 2026 Champion Bread＋金 11 | Alexandria 可能只是工廠 |
| NSW | Slowbreads Roseville | RAS 金 9；2025 Champion Bread | |
| NSW | The Piefather | RAS 金 11；2025 Champion Pastry | 有沒有門市 |
| NSW | Crois | RAS 2026 金 1 | |
| NSW | Parfait Patisserie | NABC 2025 Champion Viennoiserie＋第 1 2 | 官方沒地址（媒體：Kiama） |
| NSW | Hearthe | RAS 金 3（每年 1） | |
| NSW | Sacrebleu! Canelés and Co | RAS 金 5 | |
| NSW | Madame and Yves | RAS 2024 金 2 | |
| NSW | Sébastien Sans Gluten | RAS 2024 金 2 | |
| NSW | Tuga Pastries | RAS 2026 金 2 | |
| NSW | Hudson's Bakery | RAS 2026 金 1 | |
| NSW | Doughheads | RAS 2026 金 1 | |
| NSW | Sussex Sourdough | RAS 2026 金 1 | |
| NSW | Zweefers Cakes | RAS 2024 金 3 | |
| NSW | Butter Baked Pastries | RAS 2025 金 2 | |
| NSW | Bakehouse Delights | RAS 2026 金 2 | |
| NSW | Racecourse Pie Company | RAS 金 2 | |
| NSW | The Focaccia Factory | RAS 2026 金 2 | 名稱像批發 |
| NSW | ISEO Patisserie | RAS 2026 Champion Cake＋金 1 | 只有 Instagram |
| NSW | Sweet Ivy | RAS 2026 Champion Biscuit＋金 1 | |
| NSW | Little Secrets Bakehouse | RAS 2026 Champion Pastry＋金 1 | |
| NSW | This Is Us Baked Goods | RAS 金 3 | 可能是批發 |
| NSW | Bakealicious by Gabriela | RAS 2025 金 3 | 可能是在家接單 |
| NSW | Delicious & Simple by Svetlana | RAS 2026 金 1 | 可能是在家接單 |
| NSW | V's Dessert Gluten Free | RAS 2026 金 2 | 只有 Instagram |
| NSW | Pudding Lane | RAS 2026 金 1 | 聖誕布丁專賣，可能只有網購 |
| NSW | Comeco Foods | RAS 2025 金 1 | 名稱像製造商 |
| NSW | Forestway Fresh | RAS 2025 金 2 | 生鮮超市（D2：只收得獎那間，加標籤） |
| NSW | Bakers Delight Lane Cove | RAS 2025 金 2 | 連鎖加盟（D2） |
| NSW | Bakers Delight Albion Park Rail | NABC 2025 第 1 | 連鎖加盟（D2） |
| ACT | Three Mills Bakery | RAS 金 10；2024 Champion Biscuit（PARTIAL） | |
| QLD | Burleigh Baker | RAS 2026 金 4；NABC 2026 第 1 | 有幾間門市 |
| VIC | Brazen Brownies | RAS 金 2 | 可能是批發 |
| VIC | Cacao Chocolates & Patisserie | RAS 2026 金 2 | |
| SA | Adelaide's Finest | NABC 2026 冠軍 3＋第 1 5 | 超市內（D2）；兩家 Foodland 要確認 |
| SA | Riviera Bakery | NABC 2024 第 1 2 | |
| SA | Stoney Acre Produce | RAS 2025 金 1 | 農場，可能只有市集攤位 |
| NT | Coles Casuarina | NABC 2026 第 1 | 超市內（D2） |
| ? | Piece of Cake Bakery | NABC 2024 冠軍 2＋第 1 | 官方沒地址；店主可能搬到 Melbourne |
| ? | Wandin Bakery | NABC 2024 冠軍＋第 1 | 官方沒地址（可能 VIC Wandin） |
| ? | Sourdough Portland | NABC 2024 第 1 | 官方沒地址（可能 VIC Portland） |
| ? | Ottimo Bakery | NABC 2024 第 1 | 官方沒地址 |
| ? | Country Cob Bakery | NABC 2024 第 1 | 官方沒地址 |
| ? | The Beekeeper's Bakery | NABC 2025 第 1 | 官方沒地址 |

### B. 咖啡：要逐家查門市（5 家，Golden Bean 分類金牌轉錄後會再增加）

| 州 | 店家 | 過門檻的獎 |
|---|---|---|
| NSW | White Horse Coffee Roasters | GB 2024 Overall Champion |
| NSW | Glee Coffee Roasters | GB 2025 Overall Champion |
| ? | Black Bag Coffee Roasters | GB 2024、2025 Large Franchise Champion |
| QLD | Espresso Club Australia | GB 2024、2025 Small Franchise Champion；2026 Overall（PARTIAL） |
| VIC | The Bean Cartel | GB 2025 Category 1 金牌 |

### 門市查證：第 1～10 家（Step 1b 第 2 項，2026-10-28）

查核方式：先看官網的門市頁，再用 Google Maps 對地址、座標、營業狀態。查核日期都是 2026-10-28。「營業狀態」只記 Google Maps 有沒有標「永久歇業」或「暫停營業」；當下幾點開門不算。

| 店家 | 門市（官網寫法） | Google Maps 地址 | 座標 | 狀態 | 備註 |
|---|---|---|---|---|---|
| Bonfire Bread | Avalon Beach 旗艦店 | 68 Old Barrenjoey Rd, Avalon Beach NSW 2107 | -33.6370462,151.3293715 | 營業 | 官網稱「旗艦店」；RAS 2025、2026 的參賽地址是 Avalon |
| | Harris Farm Mosman（店中店） | Bridgepoint Shopping Centre, T9/1-3 Brady St, Mosman NSW 2088 | -33.8238999,151.2403635 | 營業 | Harris Farm 超市裡的櫃位 |
| | Harris Farm Lane Cove（店中店） | 4/56-60 Burns Bay Rd, Lane Cove NSW 2066 | -33.8148653,151.1676867 | 營業 | 同上；NABC 2025 Baguette 第 3 記在 Lane Cove |
| | Harris Farm Marrickville（店中店） | 186 Victoria Rd, Marrickville NSW 2204 | -33.9086824,151.1633063 | 營業 | 同上；NABC 2025 Baguette 第 1 記在 Marrickville |
| | Harris Farm Cronulla | 13-15 Kingsway, Cronulla | — | 官網寫「即將開幕」 | 先不收 |
| | ~~Balmain~~ | 300 Darling St, Balmain NSW 2041 | — | **已不是 Bonfire** | 官網門市頁沒有 Balmain；Google Maps 同地址現在是另一家「Balmain Bread」。Broadsheet 2021-08-31 報導 Bonfire 在 Balmain 開店。RAS 2024 金牌（Balmain）只能記在品牌 |
| The Gumnut Patisserie | Mittagong | Corner of Cavendish &, 16 Dalton St, Mittagong NSW 2575 | -34.4527297,150.4330786 | 營業 | RAS 參賽地址 |
| | Bowral | Shop 7, Grand Arcade, Bong Bong St, Bowral NSW 2576 | -34.4788577,150.4177186 | 營業 | |
| | Berrima | 1 Old Hume Hwy, Berrima NSW 2577 | -34.4896167,150.3353424 | 營業 | 官網寫「Shop 1, Post Office Corner, Hume Highway」；週二公休 |
| Wholegreen Bakery | Alexandria Bakery Café | 25 McCauley St, Alexandria NSW 2015 | -33.9035821,151.1987099 | 營業 | **不是只有工廠**：官網列為門市（解決第 1 節的疑問） |
| | Sydney CBD | 257 Clarence St, Sydney NSW 2000 | -33.8716284,151.2054569 | 營業 | |
| | Bondi Junction | 110 Bronte Rd, Bondi Junction NSW 2022 | -33.895466,151.2510484 | 營業 | Google Maps 名稱只寫「Wholegreen」 |
| | Manly | Unit 8/28 The Corso, Manly NSW 2095 | -33.7988564,151.285681 | 營業 | 2025-11-15 開幕 |
| | Neutral Bay | 5/12 Waters Rd（入口在 Grosvenor St）, Neutral Bay NSW 2089 | -33.8306515,151.2232817 | 營業 | |
| Slowbreads Roseville | Roseville（唯一門市） | 100 Pacific Hwy, Roseville NSW 2069 | -33.7845953,151.176711 | 營業 | |
| Three Mills Bakery | Leeton Street | 5 Leeton St, Fyshwick ACT 2609 | -35.3226558,149.1514271 | 營業 | RAS 參賽地址在 Fyshwick，但 Fyshwick 有兩間，對不到是哪一間 |
| | Newcastle Street | 75 Newcastle St, Fyshwick ACT 2609 | -35.3299515,149.1777186 | 營業 | |
| | Belconnen（Capital Food Markets） | Shop T44-T45/10 Market St, Belconnen ACT 2617 | -35.2458497,149.0654686 | 營業 | 週一、二公休 |
| | Woden | 193/35 Furzer St, Phillip ACT 2606 | -35.343451,149.085085 | 營業 | 只開平日 |
| | Harris Farm Majura Park（店中店） | Unit 3/10 Catalina Dr, Majura Park ACT 2609 | -35.2954122,149.1889051 | 營業 | Harris Farm 超市裡的咖啡櫃位 |
| | Capital Region Farmers Market | Exhibition Park (EPIC) | — | 只有週六早上 | 市集攤位，先不收 |
| Burleigh Baker | Burleigh Heads Shop & Cafe | 13/50 James St, Burleigh Heads QLD 4220 | -28.0893042,153.4496674 | 營業 | |
| | Paradise Point Shop & Cafe | Shop 7/46 The Esplanade, Paradise Point QLD 4216 | -27.8851941,153.3951239 | 營業 | |
| | ~~Bakehouse~~ | 7 Rina Ct, Varsity Lakes QLD 4227 | -28.0999314,153.4114149 | 烘焙廠 | RAS 參賽地址就是這裡。官網門市只列上面兩間，這裡不收；獎記在品牌 |
| The Piefather | Rosebery | 437 Gardeners Rd, Rosebery NSW 2018 | — | **永久歇業** | Google Maps 名稱「The Piefather by Mick's Pies」標永久歇業；官網 thepiefather.com.au 打不開 → **門市 REJECTED** |
| Crois | Wollongong（唯一門市） | 75 Market St, Wollongong NSW 2500 | -34.4233757,150.8919777 | 營業 | 官網 crois.au 是 Shopify 的「store unavailable」頁；Google Maps 正常、最新評論 2 個月前。上線前再確認一次 |
| Parfait Patisserie | Kiama（唯一門市） | 38-40 Manning St, Kiama NSW 2533 | -34.6727256,150.8560234 | 營業 | 官網寫店址；官網提到主廚 Troy，和 NABC 2025 得獎者 Troy Hindmarch 對上 |
| Hearthe | Stanmore（唯一門市） | 16 Douglas St, Stanmore NSW 2048 | -33.8937931,151.1645689 | 營業 | 官網：Black Star Pastry 創辦人 Christopher Thé 的新店 |

**這 10 家的小結**

- 門市 VERIFIED：9 家（Bonfire、Gumnut、Wholegreen、Slowbreads、Three Mills、Burleigh、Crois、Parfait、Hearthe）
- 門市 REJECTED：The Piefather（永久歇業）
- 獎記不到單一門市、只能記在品牌：Bonfire 的 Balmain 金牌（店已不在）、Three Mills（Fyshwick 有兩間）、Burleigh（參賽地址是烘焙廠）
- Harris Farm 超市裡的專櫃（Bonfire 3 間、Three Mills 1 間）：2026-10-28 使用者決定**算門市**，卡片加「超市內專櫃」標籤（`PLAN.md` 第 10 節 D2 補充）

### 門市查證：第 11～20 家（2026-10-28）

查核方式同上。

| 店家 | 門市（官網寫法） | Google Maps 地址 | 座標 | 狀態 | 備註 |
|---|---|---|---|---|---|
| Sacrebleu! Canelés and Co | La Boutique（旗艦店） | 701 Pittwater Rd, Dee Why NSW 2099 | -33.7526369,151.2861013 | 營業 | RAS 參賽地址 |
| | Crown Sydney | 1 Barangaroo Ave, Barangaroo NSW 2000 | -33.8620254,151.2014096 | 營業 | 週三到週日 |
| | ~~Freshwater~~ | — | — | 官網寫已永久關閉 | |
| Madame and Yves | Clovelly（唯一門市） | 343-345 Clovelly Rd, Clovelly NSW 2031 | -33.9121823,151.2596783 | 營業 | 也做批發 |
| Sébastien Sans Gluten | Leichhardt（唯一門市） | 131 Marion St, Leichhardt NSW 2040 | -33.883998,151.1506288 | 營業 | |
| Tuga Pastries | Clovelly（Bakery） | Shop 6/231 Clovelly Rd, Clovelly NSW 2031 | -33.9115076,151.2549011 | 營業 | |
| | Tuga x Village, Clovelly（Cafe & Bakery） | Shop 1/231 Clovelly Rd, Clovelly NSW 2031 | -33.911473,151.2547154 | 營業 | 和上一間同一棟 |
| | Alexandria（Cafe & Bakery） | 10/112 McEvoy St, Alexandria NSW 2015 | -33.9028552,151.1965566 | 營業 | |
| | | | | | RAS 參賽地址是 Marrickville，三間門市都不在 Marrickville → 獎記在品牌 |
| Hudson's Bakery | Bondi Junction（唯一門市） | 238 Oxford St, Bondi Junction NSW 2022 | -33.8904765,151.2436012 | 營業 | 無麩質；週日、一公休。另有 3 個週六農夫市集攤位（Shire、Kings Cross、Carriageworks），不收 |
| Doughheads | The Junction（唯一門市） | Shop 17a/204 Union St, The Junction NSW 2291 | -32.9385158,151.7584618 | 營業 | Google Maps 分類是甜甜圈店，算甜點店；官網 doughheads.com.au 打不開 |
| Bakehouse Delights | Nowra | 6/110 Kalandar St, Nowra NSW 2541 | -34.8884691,150.608724 | 營業 | 沒有官網。RAS 寫 East Nowra，Google Maps 寫 Nowra，郵遞區號都是 2541，附近只找到這一家同名店 |
| **Zweefers Cakes** | Fairy Meadow | 43 Princes Hwy, Fairy Meadow NSW 2519 | — | **永久歇業** | Google Maps 標永久歇業；Illawarra Mercury 2025-07-15、Region Illawarra 2025-07-16 報導因成本上漲關店；官網 Shopify 已停用 → **門市 REJECTED** |
| **Sussex Sourdough** | 沒有自己的店 | — | — | — | 店主 Daniel Turner 在家烘焙，在 Sussex Inlet 週末市集（Ellmoos Centre）擺攤，也放在 Sussex Greenhouse 農場商店寄賣（sussexinlet.nsw.au）→ 依 D2 沒有自己的門市，**REJECTED** |
| **Butter Baked Pastries** | 沒有門市 | — | — | — | Google Maps 分類「麵包批發商」、0 則評論；官網只有產品型錄，沒有店址；RAS 參賽名稱是「Butter Baked Pastries Pty Ltd」→ 依 D2 批發不收，**REJECTED** |

**這 10 家的小結**

- 門市 VERIFIED：7 家（Sacrebleu!、Madame and Yves、Sébastien Sans Gluten、Tuga、Hudson's、Doughheads、Bakehouse Delights）
- 門市 REJECTED：3 家（Zweefers 歇業、Sussex Sourdough 沒有店面、Butter Baked Pastries 批發）
- 獎記在品牌：Tuga（參賽地址 Marrickville 不是門市）
- 第 1～20 家累計：16 家 VERIFIED、4 家 REJECTED

### 門市查證：第 21～30 家（2026-10-28）

查核方式同上。這一批大多是 2.5 節初判「可能是批發／在家接單／只有 Instagram」的店。

| 店家 | 門市 | Google Maps 地址 | 座標 | 狀態 | 備註 |
|---|---|---|---|---|---|
| Sweet Ivy | Mosman（唯一門市） | 10 Reginald St, Mosman NSW 2088 | -33.8338592,151.2293332 | 營業 | 官網同地址；週一、二、四只開下午 |
| Bakealicious by Gabriela | Forestville（唯一門市） | Shop 13 The Centre（Coles 對面）, Forestville NSW 2087 | -33.7623997,151.2158884 | 營業 | 官網寫「our Forestville shop」；Google Maps 524 則評論。**不是在家接單**，2.5 節的疑問解除 |
| V's Dessert Gluten Free | Dee Why（唯一門市） | Shop 22/2b Francis St, Dee Why NSW 2099 | -33.7534332,151.2832929 | 營業 | 沒有官網，只有 Facebook；Google Maps 分類是咖啡店，208 則評論 |
| Pudding Lane | Sandgate 工廠門市 | 4 Guernsey St, Sandgate NSW 2304 | -32.876311,151.711431 | 營業 | 官網聯絡頁寫「PUDDING LANE SHOP」；Google Maps 分類是食品製造商，週一到週五 8:00–16:00。聖誕布丁、聖誕蛋糕專賣 |
| **Racecourse Pie Company** | 沒有門市 | — | — | — | Facebook：在 Wyong 賽馬場用派餐車（The Pie Cart）賣；Google Maps 找不到。ASIC 2026-10-02 公告收到公司註銷申請 → **REJECTED** |
| **The Focaccia Factory** | 沒有門市 | — | — | — | 官網只列寄賣店（Fruit World Roselands、La Frutteria Abbotsford 等 6 家），另有市集攤位；Google Maps 找不到 → 依 D2 **REJECTED** |
| **Little Secrets Bakehouse** | 沒有門市 | 10/566 Gardeners Rd, Alexandria NSW 2015 | — | — | Google Maps 分類「麵包批發商」、5 則評論；Google 搜尋結果的官網摘要寫專做蛋糕供應給咖啡店（官網本身連不上）；地址在工業區 → 依 D2 批發不收，**REJECTED**。注意：這家是 RAS 2026 Champion Pastry |
| **This Is Us Baked Goods** | 沒有門市 | 24 Meeks Rd, Marrickville NSW 2204 | — | — | Google Maps 分類「麵包批發商」、4 則評論；在 EuroStore 等零售商寄賣 → 依 D2 **REJECTED** |
| **Delicious & Simple by Svetlana** | 沒有門市 | — | — | — | 官網寫 homemade、網購蛋糕；Google Maps 找不到 → **REJECTED** |
| ISEO Patisserie | 找不到 | — | — | **PARTIAL** | Google Maps 找不到；只有商家目錄 Infobel 寫 120 Herring Rd, Macquarie Park（是辦公大樓）；Instagram `iseopatisserie` 不存在。RAS 2026 Champion Cake（Vegan GF Banana Cake）。先不收，上線前再找一次 |

**這 10 家的小結**

- 門市 VERIFIED：4 家（Sweet Ivy、Bakealicious、V's Dessert、Pudding Lane）
- 門市 REJECTED：5 家（Racecourse Pie、Focaccia Factory、Little Secrets、This Is Us、Delicious & Simple）
- PARTIAL：ISEO Patisserie（找不到店面）
- 第 1～30 家累計：20 家 VERIFIED、9 家 REJECTED、1 家 PARTIAL

### C. 依 D2 不收（製造商、批發、超市自有品牌）

Tucker's Natural（SA，金 7）、Kurrajong Kitchen Group（金 3）、Handy Foods（參賽者是 **Woolworths** Bella Vista，金 3，原本漏列）、Bite Size Coffee Treats（金 3）、Continental Taralli Biscuits（SA，2025 Champion Biscuit＋金 2）、Falcones（金 1）、Knutsford Gourmet（WA，金 1）、Silver Tongue Foods（QLD，金 1）。Step 1b 只快速確認「沒有門市」，有門市的話移回 A。

### D. 依 D4 不收

Coffee Mentality（RAS 2025 Specialty Foods Champion Coffee）：不在 RAS Professional Bakery 範圍內，第一版不收。

### E. 使用者決定不收

- Hungerford Meat Co（NSW Branxton）：肉舖，MR Charcuterie Pork Pie 拿到 RAS 2024 金牌（冠軍頭銜 PARTIAL）。2026-10-27 決定**不收**：地圖只放麵包店、甜點店、咖啡店，主業不是這三類的店不收，即使得獎品項是烘焙品（`PLAN.md` 第 10 節 D2 補充）。

## 3. 各州分布（只算有官方得獎、範圍初判不是「不收」的店）

| 州 | 店家 | 備註 |
|---|---|---|
| NSW | 大多數 | RAS 在雪梨，參賽者以 NSW 為主 |
| ACT | Three Mills Bakery、Evoke Bakery（NABC 名次，非第 1） | |
| QLD | Burleigh Baker、Espresso Club Australia | |
| VIC | Brazen Brownies、Cacao Chocolates、The Bean Cartel；NABC 的 Sourdough Portland、Wandin Bakery、Piece of Cake Bakery 可能在 VIC（待查） | |
| SA | Adelaide's Finest、Riviera Bakery | |
| NT | Coles Casuarina（D2 決定） | |
| WA、TAS | 目前沒有符合範圍的 | Knutsford Gourmet（WA）是製造商；TAS 只有 Shelduck Farm 的銅牌。不硬湊 |

**偏差提醒**：RAS 是 NSW 的賽事，NSW 店家參賽多，所以地圖會偏 NSW。這是資料來源的偏差，不代表其他州沒有好店；頁面註腳要寫出來。
