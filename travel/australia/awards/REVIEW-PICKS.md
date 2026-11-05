# 得獎店家：Google 評論的大家推薦

- 調查日期：世界百大 12 家 2026-11-02；其他 41 家 2026-11-04（`PLAN.md` v2-4）。Google Maps 英文介面，為當天快照。
- 對象：每家一間代表門市。世界百大用官方店家頁寫的那一間；其他店官方寫了得獎門市就用那間，沒有就取 Google 評論最多的門市（v2-4 Q1）。
- 為什麼要做：世界百大是「排名」，不像比賽有得獎品項，卡片上沒有東西可以點，使用者 2026-11-02 決定補 Google 評論的推薦品項（`PLAN.md` D10）。2026-11-04 使用者決定補給全部 53 家（v2-4）。
- 資料：`review_picks.csv`（欄位見 `DATA-SCHEMA.md` 2.8）。網頁版面（v2-4 Q4 B，2026-11-04）：卡片一行「Google 評論推薦：A、B、C」，只放大家推薦，依提及數最多 3 項（2026-11-05 使用者決定）；獎項明細「Google 評論常點」放飲品、餐點各前三名，大家推薦另附星等。
- 門市星等和評論數（v2-4 Q2）：83 間門市都查了，寫在 `locations.csv` 的 `google_rating`、`google_reviews`、`google_checked_at`，顯示在 📍 按鈕上。原始資料 `research/google_ratings_2026-11-04.tsv`。

## 方法

和布里斯本咖啡廳 `../brisbane/cafe/TOP3.md` 相同：

1. 每間分「☕ 飲品」和「🍽️ 餐點」，各取前三名；評論沒提到的區塊不列。
2. 候選品項：Google Maps 評論的熱門關鍵字（前 10 個）。排除非食物（店員、座位、排隊、等候）、太籠統的詞（specialty coffee、takeaway coffee、bean selection、coffee quality）、植物奶（oat milk、almond milk）和免費氣泡水。
3. 提及數：關鍵字旁 Google 顯示的則數（全部評論累計）。
4. 評價：點關鍵字、改成「最新」排序，取最新 30 則（提及較少就全部算），記平均星等和 1～2 星則數。
5. 判定：提及 ≥ 5 則、平均 ≥ 4.5 星，而且 1～2 星不超過 1 成，標 ✅「大家推薦」；其他是「評論常提到」。「5 則」是 v2-4 Q3（2026-11-04）加的，和咖啡廳、烘焙頁同一條規則；因此世界百大的 Toby's 碎蛋烤三明治、Beta 的手沖和藝伎不再算大家推薦，Beta 沒有大家推薦。
6. 名次依提及數；同數時選評價較高或較具體的，另一項寫在備註。

## 總表

✅ = 大家推薦；其他為評論常提到。括號是提及數，後面是最新評論的平均星等。

| 店家 | ☕ 飲品 | 🍽️ 餐點 |
|---|---|---|
| Toby's Estate（Chippendale） | Flat white（27，3.85）、單品咖啡（14，3.64）、✅ 濾泡咖啡（6，4.50） | 可頌（13，3.69）、✅ 碎蛋烤三明治（2，5.0） |
| Proud Mary（Collingwood） | Long black（20，3.90）、冷滴（12，4.25） | 馬鈴薯餅（46，4.43）、鬆餅（33，4.33）、泡菜（24，4.25） |
| Coffee Anthology（Brisbane City） | 抹茶拿鐵（10，3.90）、手沖（8，4.38）、拉花咖啡（6，4.17） | 酥皮點心（90，4.00）、班尼迪克蛋（48，4.47）、✅ 酪梨吐司（24，4.75） |
| Veneziano（墨爾本機場 T1） | 冰 Long black（6，1.50）、熱可可（4，2.25）、冰巧克力（2，1.50） | 杏仁可頌（2，3.00） |
| Calēre（Fitzroy） | Flat white（13，4.38）、批次滴濾（7，4.57）、Big White Rabbit 特調（4，4.00） | 瑞士捲（29，4.41）、抹茶捲（9，4.44）、抹茶蛋糕（5，3.40） |
| Exchange Coffee（Adelaide） | — | ✅ 土耳其蛋（16，4.69）、香蕉麵包（11，4.09）、酪梨吐司（7，4.43） |
| Fonzie Abbott（Albion） | ✅ 啤酒（32，4.50） | 班尼迪克蛋（7，4.00）、牛排三明治（5，4.20）、杏仁可頌（4，3.00） |
| Vacation Coffee（Exhibition St） | ✅ Flat white（14，4.50） | ✅ 烤三明治（18，4.61）、✅ 酪梨吐司（10，4.80）、杏仁可頌（4，3.75） |
| Seven Seeds（Carlton） | — | ✅ 法式吐司（38，4.67）、鬆餅班尼迪克蛋（38，3.97）、辣味炒蛋（25，3.48） |
| Only Coffee Project（Crows Nest） | 濾泡咖啡（17，4.59）、✅ 手沖（9，4.67）、Long black（7，4.57） | — |
| Beta Coffee（Surry Hills） | Flat white（13，4.23）、✅ 手沖（3，5.0）、✅ 藝伎（2，5.0） | — |
| Single O（Surry Hills） | ✅ Flat white（170，4.63） | 香蕉麵包（289，4.30）、✅ 酪梨吐司（47，4.83）、✅ 雞肉烤三明治（26，4.77） |

上表是 2026-11-02 的判定，✅ 照當時的規則；套用 5 則門檻後的結果見 `review_picks.csv`。

## 其他 41 家（2026-11-04）

用使用者的 Chrome 查。每家先記前 10 個評論關鍵字（`research/google_review_topics_2026-11-04.txt`），再挑 5 則以上的飲品和餐點，各讀最新 30 則（`research/google_review_keywords_2026-11-04.tsv`，共 90 項）。

- 26 家有大家推薦，共 58 項（卡片最多列 3 項）。
- 7 家有評論常提到的品項，但都沒有達到推薦標準：LTT Patisserie、Glee Coffee Roasters、Parfait Patisserie、Wandin Bakery、Tuga Pastries（葡式蛋塔 121 則，但只有 4.37 星）、Brumby's Bakery、Yamanto Central Patisserie。
- 8 家沒有 5 則以上的具體品項，沒有資料列：Adelaide's Finest、Bakers Delight、Coffee Mentality、O'GaBee、Forestway、Pudding Lane、Peak Coffee、Coffee Presto。
- 除了 Comeco Foods 的抹茶和焙茶拿鐵是飲品，其他都是餐點。
- 每區最多 3 項：Bakehouse Delights 的餐點有 5 項，同為 6 則的香腸捲和酸種麵包排第 4、5（同數時評價高的優先，香草千層 4.83 星排第 3），所以沒有列；這兩項其實都是大家推薦。

## 備註

- **差一點的**：Calēre 批次滴濾 4.57 星，但 7 則有 1 則低分（14%）；Only Coffee Project 濾泡咖啡 4.59 星、17 則有 2 則低分（12%），Long black 4.57 星、7 則有 1 則低分（14%）。照規則都不算大家推薦。
- **同數時的選擇**：Beta 的藝伎和冰 Long black 都是 2 則、5.0 星，選比較具體的藝伎；Seven Seeds 的法式吐司和鬆餅班尼迪克蛋都是 38 則，法式吐司評價較高排前面。Only Coffee Project 的冷萃（6 則、4.83 星）排第 4，沒有列。
- **合併**：Single O 的「Avocado Show」是店裡的酪梨吐司（評論也寫 avo show），和「avo toast」（13 則）是同一道，取提及數多的。Proud Mary 的「pancakes」包含評論寫的 hotcakes（瑞可塔鬆餅）。「泡菜」是 Google 的關鍵字，評論提到的是有泡菜的餐點，看不出是哪一道。
- **Fonzie Abbott 也賣啤酒**（評論提到早上 10 點到晚上 10 點），所以飲品第一名是啤酒，沒有咖啡品項進前 10 個關鍵字。
- **Veneziano 機場店**：Google 整體 2.3 星，品項評價也都很低，多數是抱怨價格和服務。照規則收進世界百大（官方寫的是這間），但卡片上不會有大家推薦。
- **Toby's Estate**：2025 年世界第 1 名，但 Google 評論的 flat white、單品咖啡、可頌都在 4 星以下，抱怨主要是排隊和等候。
- **沒有飲品或餐點的店**：Exchange、Seven Seeds 的前 10 個關鍵字沒有具體飲品；Only Coffee Project、Beta 沒有餐點（這兩間主要賣咖啡）。

## 限制

- 評價只取最新 30 則，熱門品項只代表近期評價；提及少於 5 則的品項信心度低。
- 精品咖啡店的評論常寫「咖啡很好」而不點名品項，所以飲品的提及數普遍偏少。
