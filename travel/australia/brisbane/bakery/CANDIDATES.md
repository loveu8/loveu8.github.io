# 布里斯本烘焙清單：在地人常去、但清單還沒有的類型（候選調查）

- 調查日期：2026-10-16
- 狀態：**已加入 `bakery.csv`（B26～B43，2026-10-16）**；A、B 級 13 家的前三名、座標、IG 已補齊（見 `TOP3.md`），網頁已更新為 32 家。My Maps 全覽地圖已於 2026-10-16 換成 32 家的新圖層「烘焙店 32 家（依主分類）」（舊的 19 家圖層已刪除，預設畫面改為 10 級縮放，涵蓋郊外兩家）

## 加入 csv 的處理（2026-10-16）

- **新分類**：08 澳式派、09 義式／葡式點心、10 單品專門店、11 韓式麵包、12 德式麵包、13 中東甜點（Kabul Sweets）
- **新區域**：「郊外」，給 Yatala（往黃金海岸）和 Strathpine（遠北）
- **優先級**：⭐ → A、○ → B、△ 與評價差的 → C（C 級不會出現在網頁上）
- **The Whisk** 歸到原本的「02 可頌」；Queen Amann 同時掛「10 單品專門店；02 可頌」
- **沒有加入**：Wholly Crumpets（已歇業）、Lüneburger、25 Standard Bread、Black Forest German Bakery（查不到）、KP Gourmet Bakery（無法確認是否就是 Carindale Bakery）
- **還缺的欄位**：大家推薦前三名、前三名信心度、緯度、經度、Instagram。網頁需要座標和 `top3.csv` 的資料，補齊前不要重新產生 `data.js`，否則會出錯
- 起因：使用者問「有沒有我沒想到、但澳洲人或在地人也會去的烘焙店類型」，選定 5 類調查

## 方法

1. **找候選店**：網路搜尋（Time Out、Broadsheet、Urban List、Concrete Playground、Must Do Brisbane）＋ Google 搜尋 `site:reddit.com/r/brisbane` 的討論串摘要。
2. **Google Maps 確認**：每家記錄總評分與評論數、營業狀態、最新 20 則評論的平均星等與 1～2 星則數、20 則的時間跨度（越短代表近期越熱門），以及 Google 評論關鍵字（品項：提及次數）。
3. **判定**
   - ⭐ 值得去：總分 ≥ 4.5、最新 20 則平均 ≥ 4.5，而且有媒體或社群佐證
   - ○ 可考慮：有亮點，但評分、近期評價或距離有一項偏弱
   - △ 偏弱：近期評價 < 4.0 或評論量很少
   - ✗ 排除：歇業、查不到、評價差

## 結果

### 1. 澳式傳統麵包店（派、香腸卷）

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 佐證 |
|---|---|---|---|---|---|---|
| ⭐ | **David's Hot Bread** | Wynnum West（東） | 4.8（263） | 4.80，0 則低分，5 天前～3 個月前 | 派 173、香腸卷 11、牛排派 9、牛排培根派 8、咖哩派 5 | Reddit 多個「最好吃的派」討論串的高讚回覆 |
| ⭐ | **Stone Artisan Bakers** | Greenslopes（南） | 4.6（507） | 4.60，1 則低分，4 天前～2 個月前 | 派 125、酸種 48、香腸卷 10、胡椒牛排派 6、羊肉派 5 | Reddit 酸種麵包討論串有人推薦 |
| ⭐ | **Bella & Tortie** | Stafford（北） | 4.6（359） | 4.55，2 則低分，3 小時前～2 個月前 | 派 72、香腸卷 52、可麗露 32、牛胸肉 12 | Urban List 烘焙榜、蛋糕榜；Reddit 推薦派和可麗露 |
| ○ | Davies Bakery | Tarragindi（南） | 4.4（414） | 4.90（只載入 10 則） | 甜甜圈 35、香腸卷 28、派 20、沙拉捲 15 | Reddit 推薦；偏社區型老麵包店 |
| ○ | Famous Yatala Pies | Yatala（往黃金海岸，約 40 分鐘車程） | 4.5（**12,230**） | 4.00，4 則低分，1 天前～1 週前 | 免下車 308、香腸卷 102、咖哩派 91、焦糖塔 91、胡椒牛排派 55 | 老字號，Reddit 討論派時常被當比較基準 |
| ○ | Flourish Bakery | Keperra（西北） | 4.5（192） | 4.20（只載入 10 則） | 越式法包 25、甜甜圈 12、香腸卷 9、胡椒牛排派 7 | Reddit：通心粉起司牛肉派值得專程 |
| ✗ | Gabba Bakery | Woolloongabba | **2.9**（102） | 2.20，15 則低分 | 派 44 | 評價差，排除 |
| ✗ | KP Gourmet Bakery | Carindale | — | — | — | Google Maps 找到的是同商場的「Carindale Bakery」（4.4、近期 4.0、5 則低分），無法確認是否同一家 |
| ✗ | Petit Four Hot Bread Shop | Ashgrove | 4.6（41） | 20 則跨 3 年 | 派 11 | 評論太少、近期不活躍 |

### 2. 義式、葡式點心店

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 佐證 |
|---|---|---|---|---|---|---|
| ⭐ | **Lisboa Caffe** | South Brisbane（市中心周邊） | 4.8（198） | 4.80，0 則低分 | 葡式蛋塔 53、卡士達塔 22、pastel de nata 10、羊乳酪塔 8 | Broadsheet、Concrete Playground |
| ⭐ | **Gerbino's** | Ashgrove（西） | 4.5（1,131） | 4.45，3 則低分 | 卡諾里 105、派 87、炸飯糰 25、香腸卷 17 | Time Out 烘焙榜、Urban List 蛋糕榜 |
| ○ | Torrisi's Delights | Strathpine（遠北） | 4.9（379） | **5.00**，0 則低分 | 炸飯糰 70、卡諾里 51、香草千層 15、冰沙 13 | Must Do Brisbane；Google 分類為義式雜貨店，距離市中心較遠 |

### 3. 單品專門店

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 備註 |
|---|---|---|---|---|---|---|
| ○ | Kürtősh | West End（市中心周邊） | 4.2（891） | 4.45，2 則低分 | 煙囪捲 117、提拉米蘇 65、蛋糕 111 | 營業到晚上 11 點，適合晚上 |
| ○ | Brooki | Fortitude Valley | 4.4（**1,895**） | **3.60**，6 則低分 | 紅絲絨餅乾 99、布朗尼 57、Biscoff 餅乾 53 | 很熱門，但近期評價下滑 |
| △ | The Whisk | Upper Mount Gravatt（南） | 4.6（441） | 4.20，4 則低分 | 可頌 111 | Urban List 列入；比較適合放進原本的「可頌」分類 |
| △ | Queen Amann Bakery | Bowen Hills | 4.1（124） | 3.95，2 則低分 | Kouign-amann 19、抹茶 13 | 唯一的 Kouign-amann 專門店，但評價偏弱 |
| ✗ | Wholly Crumpets | Bulimba | 4.9（68） | 最新評論是 2～3 年前 | — | **已永久歇業**；市府指南資料過時 |

### 4. 韓式麵包店

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 備註 |
|---|---|---|---|---|---|---|
| ○ | Bake-It Bakery & Cafe | Underwood（南） | 4.4（535） | 4.30，2 則低分 | 甜甜圈 86、韓式奶油甜甜圈 21、抹茶 23、黃豆粉 9 | 招牌其實是韓式奶油甜甜圈；CBD 也有分店 |
| ✗ | 25 Standard Bread | — | — | — | — | Reddit 摘要提到，Google Maps 查不到 |

### 5. 德式、東歐麵包

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 備註 |
|---|---|---|---|---|---|---|
| ○ | King of Cakes | Taringa（西） | 4.1（417） | 4.25，3 則低分 | 派 41、德式椒鹽脆餅 23、丹麥酥 16、匈牙利燉牛肉派 5、黑森林蛋糕 5 | 唯一確認的德式麵包店；Reddit 推薦它的黑麥麵包 |
| ✗ | Lüneburger German Bakery | — | — | — | — | 布里斯本查不到，應是外州 |
| ✗ | Black Forest German Bakery | Greenslopes | — | — | — | Google Maps 查不到 |

### 額外發現

| 判定 | 店家 | 區域 | Google | 最新 20 則 | 評論最常提到 | 備註 |
|---|---|---|---|---|---|---|
| ○ | Kabul Sweets Bakery | Acacia Ridge（南） | 4.5（251） | 4.50，2 則低分 | 巴克拉瓦 16、餅乾 12 | 阿富汗、波斯甜點，Reddit「亞洲與中東麵包店」討論串的高讚回覆 |

## 結論

- **最值得加的 5 家**：David's Hot Bread、Stone Artisan Bakers、Bella & Tortie（澳式派）、Lisboa Caffe、Gerbino's（義式、葡式）。
- **澳式派是最大的缺口**：3 家 ⭐ 都是派店，評論裡派被提到 72～173 次，而且都在住宅區，觀光客很少去。
- **單品、韓式、德式這幾類**沒有找到同時評價高又有媒體佐證的店，比較適合當作補充。
- **市府指南和舊文章要小心**：Wholly Crumpets 已歇業，Lüneburger 不在布里斯本。

## 來源

- [Time Out：Brisbane 最佳烘焙店](https://www.timeout.com/brisbane/restaurants/the-best-bakeries-in-brisbane)、[Time Out：Gerbino's](https://www.timeout.com/brisbane/restaurants/gerbinos)
- [Concrete Playground：Lisboa Caffe 開店](https://concreteplayground.com/brisbane/food-drink/lisboa-caffe-portuguese-custard-tart-south-brisbane)、[Broadsheet：Lisboa Caffe](https://www.broadsheet.com.au/brisbane/food-and-drink/article/coming-soon-dedicated-portuguese-tart-cafe-south-brisbane)
- [Must Do Brisbane：Torrisi's Delights](https://www.mustdobrisbane.com/bakeries-cake-patisserie/torrisis-delights-strathpine)、[Must Do Brisbane：Queen Amann](https://www.mustdobrisbane.com/eat-drink-specialty-foods-bakeries/queen-amann-bakery-bowen-hills)
- [Broadsheet：Brisbane 最佳 Kouign-amann](https://www.broadsheet.com.au/brisbane/food-and-drink/article/five-try-brisbanes-best-kouign-amanns)
- [King of Cakes 官網](https://www.kingofcakes.com.au/product-category/pies-savoury/)
- Reddit r/brisbane：只讀 Google 搜尋摘要（「Best Pies in Brisbane?」「Brisbanes Best Pie / Sausage Roll Shop」「Bakery Treats!」「Asian and Middle Eastern Bakeries?」等）
- Google Maps：各店頁面（2026-10-16 快照）
