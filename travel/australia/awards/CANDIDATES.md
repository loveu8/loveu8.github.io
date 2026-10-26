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
