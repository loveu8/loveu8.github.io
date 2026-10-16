# 布里斯本烘焙清單 QA 紀錄

- 檢查日期：2026-10-15
- 檢查對象：`bakery.csv`（23 家，B01–B23；與 `bakery.txt`、`Brisbane Bakery.xlsx` 內容一致）
- 檢查問題：
  1. 清單上的店是否屬於布里斯本「有名、大家喜歡」的烘焙店？
  2. 分類（01–06）與目標品項是否合理？
  3. 查核來源網址是否真的支持該筆資料？
- 本次只做檢查、留紀錄，**未修改** csv / txt / xlsx。建議修改見文末，待確認後再改。

## 參考基準（主流榜單）

| 代號 | 來源 | 日期 | 家數 |
|---|---|---|---|
| UL | [Urban List – Brisbane's best bakeries](https://www.theurbanlist.com/brisbane/a-list/brisbanes-best-bakeries) | 頁面標示 "Just Updated"，無確切日期 | 25 |
| TO | [Time Out – The best bakeries in Brisbane](https://www.timeout.com/brisbane/shopping/the-best-bakeries-in-brisbane) | 頁面日期 2026-05-15 | 11 |
| BS | [Broadsheet – The Best Bakeries in Brisbane](https://www.broadsheet.com.au/brisbane/guides/best-bakeries-brisbane) | Updated 2026-01-23 | 16 |
| UL-cake | [Urban List – Where to buy a birthday cake in Brisbane](https://www.theurbanlist.com/brisbane/a-list/where-to-buy-a-birthday-cake-in-brisbane) | 無確切日期 | 19 |

「有名」判定標準：出現在 UL / TO / BS 至少一份 = 主流認可；三份都有 = 最高共識。
限制：03 日式吐司、05 台式麵包屬小眾分類，主流榜單本來就不太收錄，這兩類不能用同一把尺評分。

## 逐店檢查結果

圖例：✅ 通過　⚠️ 需注意　❌ 有問題

| ID | 店家 | 主流榜單 | 分類判定 | 來源網址判定 | 備註 |
|---|---|---|---|---|---|
| B01 | Riser | UL、BS | ✅ 01 | ✅ | UL 主打 danish、bear claw；BS 主打 sourdough。可考慮加 02 |
| B02 | Danny's Bread | UL、BS | ✅ 01 | ✅ | |
| B03 | Sprout Artisan Bakery | UL、TO、BS | ✅ 01；02 | ✅ | TO 指 New Farm 店 2025 年已關；Newstead、Albion 仍在，清單用 Newstead 正確 |
| B04 | Oh My Bread! | 無 | ✅ 01；02 | ❌ | UL 現行名單**沒有**此店。實際來源為 [Weekend Edition 2024 開幕報導](https://www.indailyqld.com.au/theweekendedition-brisbane/food-drink/2024/03/16/oh-my-bread-grange)。前身是 Crust & Co.。優先級 A 缺乏榜單支撐 |
| B05 | Banneton Bakery | UL | ✅ 01；04 | ✅ | UL 寫「various locations」；Woolloongabba 門牌未另行核對 |
| B06 | Christian Jacques | UL、TO | ✅ 01；02 | ✅ | |
| B07 | Lune Croissanterie | UL、TO、BS | ✅ 02 | ✅ | 另有 CBD 分店（79 Adelaide St） |
| B08 | Time & Temp | TO、BS | ✅ 02 | ❌ | UL 現行名單**沒有**此店，來源應改為 TO 或 BS。TO、BS 都以 cardamom bun 為招牌 |
| B09 | Beurre Pastries | UL | ✅ 02 | ✅ | |
| B10 | NOS. Bakehouse | 無（小眾類） | ✅ 03 | ✅ | Broadsheet 店家頁 + [Baking Business](https://bakingbusiness.com.au/nos-bakehouse-elevates-shokupan-in-brisbane/) 支持；是本清單唯一有明確證據的日式吐司專門店 |
| B11 | Le Boulangerie Amour Fou | 無 | ⚠️ 03 | ⚠️ | 外送平台來源。[Must Do Brisbane（2021）](https://www.mustdobrisbane.com/node/51316) 列主店在 Salisbury，Sunnybank Plaza 為銷售點；**查無** milk loaf／日式吐司證據 |
| B12 | Miettes Bakery | 無（市府指南有） | ⚠️ 03；04 | ❌ | UL 現行名單**沒有**此店。[布里斯本市府指南](https://brisbane.qld.gov.au/brisbetter/explore/brisbanes-best-bakeries) 主打 cornbread、black Russian rye、sourdough → 應歸 01／04，不屬 03。有評論提到換老闆後品質不穩 |
| B13 | Breadtop | 無 | ✅ 03；05（基準店） | ✅ | 連鎖店，作比較基準合理；C 級合理 |
| B14 | Jocelyn's Provisions | UL、TO、BS、UL-cake | ⚠️ 04；06 | ✅ | 四份名單都有，知名度最高之一。但各榜單招牌都是蛋糕、lamington、派、sausage roll，**沒有**任何來源提到 Pain de Mie → 主分類建議改為 06，04 降為待確認 |
| B15 | Le'Artisan Bakery & Cafe | 無 | ✅ 04 | ✅ | 自家網站支持；非主流名店，B 級合理 |
| B16 | Kangti Bakery | 無 | ⚠️ 05 | ❌ | UL 現行名單**沒有**此店。唯一找到的是 magicpin 目錄（Calamvale 地址吻合，4.2 分）；「台式」屬性無來源證實。A 級缺乏支撐 |
| B17 | The Wheat House | 無 | ⚠️ 05 | ✅（已標需查核） | [Must Do Brisbane（2024-06）](https://www.mustdobrisbane.com/cafes-runcorn-bakeries/wheat-house-runcorn) 描述為「Asian bakery」，招牌是方塊可頌、肉鬆可頌；**沒有**來源說是台式。營業狀態仍待確認 |
| B18 | La Casa Patisserie | 無 | ⚠️ 05 | ✅（已標需查核） | [Must Do Brisbane（2023-10）](https://www.mustdobrisbane.com/node/27696) 描述為法式＋亞洲式，有肉鬆牛奶麵包；偏港式，與既有備註一致 |
| B19 | Flour & Chocolate | UL、TO、UL-cake | ✅ 06 | ✅ | UL-cake 招牌就是 flourless chocolate & hazelnut cake，目標品項吻合。TO、UL 也列可頌，可加 02 |
| B20 | Chouette Cake & Dessert | 無 | ⚠️ 06 | ✅ | 甜點咖啡館，主打馬卡龍、巴斯克乳酪蛋糕（可整模買）、可頌類；資料停在 2024-07。非主流名店 |
| B21 | Icing Hill | UL-cake | ✅ 06 | ✅ | UL-cake 明列 chiffon cakes，目標品項有支撐；另有 Rochedale 分店 |
| B22 | Dello Mano | 無 | ⚠️ 06 | ✅ | 不在任何主流蛋糕榜單；B 級合理，可考慮降 C 或換掉 |
| B23 | Idle | UL（第 1）、TO（第 1）、BS | ✅ 01；02 | ✅ | **三份榜單都有，其中兩份排第一**，優先級 B 偏低 → 建議升 A |

## 統計

- 出現在至少一份主流烘焙榜單（UL／TO／BS）：**12 / 23**
  - B01、B02、B03、B05、B06、B07、B08、B09、B14、B19、B23，加上只在蛋糕榜的 B21
- 三份都有（最高共識）：B03 Sprout、B07 Lune、B14 Jocelyn's、B23 Idle
- 來源網址與內容不符（引用 UL，但 UL 現行名單沒有這家）：**B04、B08、B12、B16**
- 分類可疑：B12（03 → 01／04）、B14（主分類應為 06）、B11（日式吐司無證據）

## 分類層級結論

| 分類 | 結論 |
|---|---|
| 01 酸種麵包 | ✅ 名店覆蓋好 |
| 02 可頌 | ✅ 名店覆蓋好 |
| 03 日式吐司 | ⚠️ 只有 NOS 是真正的 shokupan 店；Amour Fou、Miettes 證據不足或分錯類 |
| 04 歐式吐司 | ⚠️ Jocelyn's Pain de Mie 無來源；可改放 Miettes、Banneton |
| 05 台式麵包 | ❌ **沒有任何一家能證實是台式**，都只是「亞洲式／港式／泛亞洲」。建議把分類名改成「05 亞洲式麵包」，或另做中文社群（臉書社團、小紅書）查核 |
| 06 蛋糕店 | ✅ Jocelyn's、Flour & Chocolate、Icing Hill 有榜單支撐；Chouette、Dello Mano 偏弱 |

## 主流榜單常見、但清單沒有的店

| 店家 | 區域 | 出現於 | 適合分類 |
|---|---|---|---|
| Darvella Patisserie | Bulimba | UL、TO、BS、UL-cake | 02 可頌、06 蛋糕（**四份都有，最值得補**） |
| Baker D. Chirico | Newstead | UL、BS | 01 酸種 |
| Cerin Pasticceria | Woolloongabba | UL、BS | 義式（cornetti、bomboloni） |
| Superthing | West End | UL、BS | 02 可頌 |
| Doughcraft | Brisbane City | UL、BS | 02 可頌、01 |
| Rise Bakery | Hamilton／Newstead | UL、BS | 02 可頌 |
| Cordelia Sourdough Bakehouse | South Brisbane | UL、BS | 01 酸種 |

## 建議修改（待確認，尚未執行）

1. B23 Idle：優先級 B → A
2. B04 Oh My Bread!、B16 Kangti：優先級 A → B，或補上能支撐 A 的來源
3. B04、B08、B12、B16：更換查核來源網址（建議分別換成 Weekend Edition、TO/BS、市府指南、magicpin 或 Google Maps）
4. B12 Miettes：分類改為 01；04，移出 03
5. B14 Jocelyn's：分類改為 06；04（Pain de Mie 待確認）
6. 05 分類：改名為「亞洲式麵包」，或保留名稱但補中文社群查核
7. 考慮新增 Darvella Patisserie（B24）

---

# 第二輪：Google Maps 評價 ＋ 社群口碑交叉確認

- 檢查日期：2026-10-15（Google Maps 為當天快照）
- 目的：除了媒體榜單，再用 Google Maps 評分和社群討論，確認 2024–2026 年間是否仍受歡迎。

## 方法與限制

**Google Maps**
- 用 Chrome 開每家店的 Google Maps 頁面，記錄總星等與總評論數。
- 把評論依「最新」排序，取最新 20 則，計算平均星等、≤2 星則數，並記錄第 1 則與第 20 則的時間。
- **20 則的時間跨度越短，代表近期來客／討論越熱**。例如 1 個月內就有 20 則，比 1 年才 20 則熱門得多。
- Google 只顯示相對時間（「3 週前」）；20 則多半落在 2025–2026，**沒有逐店回溯到 2024**。

**社群**
- Reddit 對本工具與 Chrome 都封鎖，無法直接開討論串。改用 Google 搜尋 `site:reddit.com/r/brisbane` 並限定 2024-01-01 之後收錄，只讀搜尋摘要。
  - 這個日期篩選是依 Google 收錄時間，不保證貼文本身是 2024 年後發的。
  - 只能看到摘要裡的店名，**無法統計完整留言次數**。
- 中文社群：用 Google 搜尋 Threads、Dcard、Instagram、Facebook 的公開摘要。小紅書與私人 FB 社團需登入，未查。

## 逐店結果（清單 23 家）

圖例：🔥 近期熱度高　✅ 穩定　⚠️ 需注意　❌ 建議移除

| ID | 店家 | Google 總分（評論數） | 最新 20 則平均 | 最新 20 則中 ≤2 星 | 最新 20 則時間跨度 | 社群（Reddit／中文） | 判定 |
|---|---|---|---|---|---|---|---|
| B01 | Riser | 4.8（476） | 4.70 | 0 | 4 天前 ～ 2 個月前 | 多串 sourdough 討論推薦，「Easily the best」「god tier」 | 🔥 |
| B02 | Danny's Bread | 4.6（222） | 4.05 | 4 | 2 天前 ～ 6 個月前 | 1 串（northside sourdough）提到 | ⚠️ 近期評價下滑、熱度普通 |
| B03 | Sprout（Newstead） | 4.4（43） | 4.35 | 2 | 1 週前 ～ 3 個月前 | Reddit 提到的是 James St 店（已關） | ⚠️ 品牌有名，但現存的 Newstead（43 則）、Albion（4.3／29 則）評論量都很少 |
| B04 | Oh My Bread! | 4.7（119） | 4.75 | 1 | 2 週前 ～ 6 個月前 | 未見 | ✅ 口碑好但規模小、熱度低 |
| B05 | Banneton | 4.4（459） | 4.25 | 3 | 1 週前 ～ 8 個月前 | 未見 | ⚠️ 熱度低 |
| B06 | Christian Jacques | **4.8（1,530）** | **5.00** | 0 | 1 天前 ～ 1 個月前 | Reddit 提及最多；「the only answer to any pastry related questions」 | 🔥 全清單最強 |
| B07 | Lune（South Brisbane） | 4.2（1,159） | 4.05 | 4 | 1 週前 ～ 1 個月前 | 多串推薦；中文 IG 也常見 | 🔥 熱度高，但近期評價分歧 |
| B08 | Time & Temp | 4.9（142） | 4.90 | 0 | 4 天前 ～ 3 個月前 | 未見 | ✅ 評分極高 |
| B09 | Beurre Pastries | 4.4（247） | 4.35 | 1 | 3 天前 ～ 2 個月前 | 1 串提到 | ✅ |
| B10 | NOS. Bakehouse | 4.6（462） | 4.25 | 2 | 2 天前 ～ 1 個月前 | 未見 | 🔥 日式吐司類唯一熱門店 |
| B11 | Le Boulangerie Amour Fou | **3.3（98）** | **2.10** | **15** | 1 週前 ～ 5 個月前 | Reddit「哪裡買 shokupan」串的頂樓有提到（發文日期無法確認） | ❌ 近期大量負評：麵包不新鮮、芋頭麵包變質、甜甜圈有異味、服務差 |
| B12 | Miettes | 4.4（251） | **3.60** | 5 | 1 個月前 ～ 1 年前 | Reddit 推 sourdough、vanilla slice | ⚠️ 近期下滑；近期評論多談派、香腸卷，沒有人提到吐司 |
| B13 | Breadtop（Sunnybank Plaza） | 3.1（178） | 4.65 | 1 | 5 小時前 ～ 2 個月前 | Reddit milk bun 串被提到 | ✅ 作為基準店合理；近期評價回升 |
| B14 | Jocelyn's（James St） | 4.3（220） | 4.50 | 0 | 1 天前 ～ 5 個月前 | Reddit sourdough 串首推 | ✅ 品牌口碑穩；評論分散在多家分店 |
| B15 | Le Artisan | 4.8（118） | 4.90 | 0 | 4 天前 ～ 4 個月前 | 未見 | ✅ 在地小店，評分高 |
| B16 | Kangti（康緹） | 4.2（121） | 3.95 | 4 | 1 週前 ～ 1 年前 | **Threads 台灣社群列為「康緹（麵包店）」**；Google 評論有「蠻台灣味的麵包」 | ⚠️ 台式屬性**已證實**，但熱度低、評價普通 |
| B17 | The Wheat House | 4.6（143） | **4.90** | 0 | 4 天前 ～ 11 個月前 | **Threads 台灣社群推薦「好吃麵包」**；Google 評論寫「Taiwanese style bakery」 | ✅ **確認營業中**，台式屬性已證實 |
| B18 | La Casa Patisserie | 4.5（173） | 3.95 | 5 | 3 週前 ～ 6 個月前 | Google 評論稱「Hong Kong style breads, cakes」 | ⚠️ 確認營業中（週四公休），偏港式 |
| B19 | Flour & Chocolate | 4.6（552） | 4.50 | 2 | 6 天前 ～ 3 個月前 | Reddit 多串「my go-to」 | 🔥 |
| B20 | Chouette | 4.2（387） | 3.85 | 4 | 2 週前 ～ 2 個月前 | 未見 | ⚠️ 評價偏弱 |
| B21 | Icing Hill | 4.1（453） | 4.25 | 3 | 6 天前 ～ 2 個月前 | 未見 | ✅ 熱度中上；最新 20 則沒有人提到 chiffon |
| B22 | Dello Mano（West End） | 4.6（**19**） | 4.63 | 2 | 1 週前 ～ 1 年前 | 未見 | ⚠️ 評論量極少，幾乎沒有熱度 |
| B23 | Idle | 4.0（435） | 4.45 | 1 | **7 小時前 ～ 3 週前** | Reddit 提到 | 🔥 近期熱度全清單最高之一；近期評價高於總分 |

## 候選店（主流榜單常見、清單沒有）

| 店家 | Google 總分（評論數） | 最新 20 則平均 | ≤2 星 | 時間跨度 | 社群 | 判定 |
|---|---|---|---|---|---|---|
| Darvella Patisserie（Bulimba） | 4.4（883） | 4.30 | 3 | 5 天前 ～ 1 個月前 | — | 🔥 建議新增 |
| Cerin Pasticceria（Woolloongabba） | 4.7（608） | **4.65** | 1 | 6 天前 ～ **2 週前** | Reddit 2 串推薦（義式點心） | 🔥 建議新增（另開「義式」或歸 02） |
| Doughcraft（CBD） | 4.6（722） | 4.25 | 2 | 6 小時前 ～ 1 個月前 | — | 🔥 可考慮 |
| Rise Bakery（Portside） | 4.4（522） | 4.05 | 2 | 4 天前 ～ 2 個月前 | Reddit 1 串 | ✅ |
| Cordelia Sourdough | 4.1（192） | 4.05 | 3 | 2 天前 ～ 3 個月前 | — | ✅ 普通 |
| Baker D. Chirico | 4.1（229） | 4.00 | 4 | 4 天前 ～ 3 個月前 | — | ⚠️ 普通 |
| Superthing | 4.0（340） | 3.70 | 6 | 1 天前 ～ 8 個月前 | — | ⚠️ 近期評價偏弱，不建議 |

## 第二輪結論（修正第一輪）

1. **B11 Amour Fou：建議移除。** 最新 20 則平均 2.10，有 15 則 ≤2 星，內容是食品新鮮度與服務問題。
2. **05 台式麵包分類可以保留。** 第一輪說「沒有任何一家能證實是台式」，這輪由社群與評論修正：
   - The Wheat House、Kangti 都有台灣社群與評論證實是台式。
   - Wheat House 確認營業中，評分最高，建議優先級升 A、進度改回「待調查」，地址更正為 Shop B, 66 Condamine St, Runcorn。
   - La Casa 偏港式，維持 C。
3. **B23 Idle：升 A 的建議更確定。** 三份媒體榜單都有，Google 近期熱度也是全清單最高之一。
4. **B06 Christian Jacques：** 媒體、Google、Reddit 三方都最強，維持 A。
5. **B12 Miettes：** 近期評價下滑（3.60），也沒有吐司相關評論。建議移出 03，降為 C 或移除。
6. **B03 Sprout：** 品牌有名，但現存兩店的評論量很少。可維持 A，但要知道熱門的舊店已經不在。
7. **B04 Oh My Bread!：** 口碑好但熱度低，第一輪「A → B」的建議維持。
8. **B22 Dello Mano：** 熱度極低，建議降 C 或移除。
9. **03 日式吐司：** 移除 Amour Fou、Miettes 後，只剩 NOS。這類在布里斯本本來就少，可接受只有 1～2 家。
10. **新增候選：** Darvella、Cerin Pasticceria 在三方來源都強，建議新增。

## 第二輪來源

- Google Maps（2026-10-15 快照）：各店頁面，依店名＋地址搜尋
- Reddit r/brisbane：只讀 Google 搜尋摘要，查詢詞為 best bakery、best croissant、best sourdough bread、shokupan／milk bread／asian bakery
- Threads（weekend.assembly）：「布里斯本的台灣菜真的好多」，提到康緹（麵包店）、The Wheat House
- Dcard／Instagram（ABC 澳打遊留學，2026-09-16）：「布里斯本 8 大台菜口袋名單」；名單在圖片裡，未能讀取店名，且屬業配性質，不列入判定

---

# 前三名品項 QA（2026-10-16）

使用者質疑前三名多為泛稱、看不出口味。查核結果：資料真實，但有「只有大類、沒有口味」與「被提到不等於被推薦」兩個限制，16 家共 34 個品項受影響。詳細紀錄與待決定的補強方式見 `TOP3.md` 的「QA 紀錄」段落。

---

# 決定紀錄（2026-10-16，已套用至 `bakery.csv`）

逐項與使用者確認後執行。原始的 `bakery.txt`、`Brisbane Bakery.xlsx` 已由使用者刪除，`bakery.csv` 是唯一資料來源。

| # | 項目 | 決定 | csv 變更 |
|---|---|---|---|
| 1 | B11 Amour Fou | 移除 | 刪除 B11（其他 ID 不重編） |
| 2 | 05 台式麵包 | 保留分類；La Casa、Breadtop 移出 | B18 分類改「07 港式麵包」（新分類）；B13 分類改「03 日式吐司」 |
| 3 | B23 Idle | 升級 | 優先級 B → A |
| 4 | B06 Christian Jacques | 維持 A，補營業時間 | 備註加「週一、二公休，週三至日 06:00–13:00；週末常於 9 點前售完」（來源：Time Out 店家頁；使用者原說週二公休，查證後為週一、二） |
| 5 | B12 Miettes | 移出 03，降級 | 分類「01 酸種麵包；04 歐式吐司」；目標品項 Sourdough / Black Russian Rye；優先級 B → C；備註更新 |
| 6 | B03 Sprout | 維持 A | 備註改為 New Farm 店已關、現存兩店評論量少 |
| 7 | B04 Oh My Bread! | 降級 | 優先級 A → B；來源換 Weekend Edition |
| 8 | B22 Dello Mano | 降級 | 優先級 B → C；備註加「無榜單支撐、Google 評論極少」 |
| 9 | 03 日式吐司 | 接受現況 | 無（只剩 NOS、Breadtop） |
| 10 | 新增店家 | 新增兩家 | B24 Darvella Patisserie（02；06，A，來源 Time Out）；B25 Cerin Pasticceria（02，A，備註義式 cornetto，來源 Broadsheet） |
| 11 | B17 The Wheat House | 全部照建議改 | 優先級 B → A；進度「需查核」→「待調查」；地址更正為 Shop B, 66 Condamine St (Compton Centre)；備註更新；來源換 Google Maps |
| 12 | B16 Kangti | 降級 | 優先級 A → B；備註加台式認證與近期評價；來源換 Google Maps |
| 13 | B14 Jocelyn's | 改主分類 | 分類「06 蛋糕店；01 酸種麵包」；目標品項拿掉 Pain de Mie，改 Sour Cream Chocolate Cake / Flourless Chocolate Cake / Sourdough；備註更新 |
| 14 | 來源網址 | 更正 | B08 → Time Out；B12 → 布里斯本市府指南；B16 → Google Maps（B04 見 #7） |
| 15 | 小調整 | 三項都改 | B01 加「02 可頌」與 Almond Croissant；B19 加「02 可頌」與 Chocolate Almond Croissant；B20 優先級 B → C、備註加評價偏弱 |
| 16 | B18 La Casa | 改進度 | 進度「需查核」→「待調查」；備註改為「確認營業中（2026-10 Google）；週四公休；偏港式」 |

## 改完後的分類分布（24 家）

| 分類 | 店家 |
|---|---|
| 01 酸種麵包 | B01、B02、B03、B04、B05、B06、B12、B14、B23 |
| 02 可頌 | B01、B03、B04、B06、B07、B08、B09、B19、B23、B24、B25 |
| 03 日式吐司 | B10、B13 |
| 04 歐式吐司 | B05、B12、B15 |
| 05 台式麵包 | B16、B17 |
| 06 蛋糕店 | B14、B19、B20、B21、B22、B24 |
| 07 港式麵包 | B18 |
