# 布里斯本交通發展：第一章路網總覽 QA（Claude）

審查日期：2026-11-20
審查角度：第一次來布里斯本、對當地路網陌生的讀者
檢查頁面：`ai_report/2026/brisbane-transport-report.html`（第一章由 `scripts/report-brisbane.js` 的 `corridorMap()` 與 `schematic()` 產生）
相關前一份 QA：`布里斯本交通發展_可讀性QA_Claude.md` 的 R-3（地圖）

本輪只新增這份 QA 檔，沒有改網頁、原稿或資料檔。

---

## 先確認的事實（2026-11-20 讀取 Translink 網頁）

以下內容來自 Translink 官方頁面。官方 PDF 我**沒有打開**，所以圖上畫了什麼、檔案多大都還沒核對。

| 項目 | 官方頁面上的名稱與位置 | 連結 |
|---|---|---|
| 地圖入口頁 | Plan your journey › Maps | https://translink.com.au/plan-your-journey/maps |
| 東南昆士蘭路網圖 | 頁首「SEQ network map (PDF)」，另有「Low vision version」 | https://translink.widen.net/s/lsqgxrsw82/260907-seq-network-map |
| 高頻服務圖 | 在 South East Queensland › Brisbane 區塊下，名稱是「High frequency services (PDF)」 | https://translink.widen.net/s/ncghcgdtdk/250630-seq-high-frequency-services |
| 公車專用道圖 | 同區塊「Busway maps」：South East、Northern、Eastern 三張 | 見入口頁 |
| 個別路線 | 入口頁寫「You can view bus, train and ferry route maps on our journey planner.」 | https://jp.translink.com.au/ |

幾個需要注意的地方：

- 入口頁上**沒有**名為「布里斯本高頻公車圖」的檔案。對應的檔案叫「High frequency services」，檔名是 `seq-high-frequency-services`，涵蓋範圍可能是東南昆士蘭，也可能不只公車。打開 PDF 前不要寫成「布里斯本高頻公車圖」。
- 入口頁沒有標更新日期。Widen 檔名開頭的 `260907`、`250630` 看起來像日期碼，但頁面沒有說明。如果真的是日期，高頻服務圖是 2025-06-30 版，剛好是 M1 和新版公車路網第二階段上路的時間，要先核對圖上的公車路線是不是新路網。
- PDF 連結是 Widen 的分享連結。官方換新版時，網址可能跟著換（檔名有日期碼）。
- 入口頁沒有 Brisbane Metro 專屬地圖，最接近的是 Busway maps 和 Ferry network。

---

## 建議一覽

| 編號 | 建議 | 優先度 |
|---|---|---|
| N-1 | 新區塊要直接說「這張不是完整路網」，並說出五條走廊中哪些現在搭得到 | 高 |
| N-2 | 新區塊放在走廊圖前面，但壓成一張小卡，避免把人口段落再往下推 | 高 |
| N-3 | 主要連結指向官方入口頁，PDF 為次要連結並標明「英文 PDF」 | 高 |
| N-4 | 「總覽圖涵蓋鐵路和主要公車」這句話，要等打開 PDF 確認後再寫 | 高 |
| N-5 | 手機上直接顯示三個連結，其他收進入口頁 | 中 |
| N-6 | 改名「本篇五條交通走廊」與「五條走廊總覽」可行；示意圖標題與底部連結也要一起調整 | 中 |
| N-7 | 首版只放連結就夠用；暫不內嵌官方地圖。日後若要加，先只加淡色的既有鐵路底層 | 中（日後） |

---

## N-1　讓讀者分清「現在有什麼車可搭」和「本篇選了哪些走廊」（高）

**理由**

只靠改標題還不夠。五條走廊裡，現在能搭的只有 M1、432，以及南向鐵路（一邊營運、一邊施工）。跨河鐵路在施工，The Wave 還在規劃。新讀者看到「五條走廊總覽」，畫面上又只有這五條線，很容易以為布里斯本的交通就是這五條，或以為跨河鐵路現在就能搭。

目前畫面還有兩個容易誤會的地方：

- 總覽圖的 CityCat 航線只是用來標出河流位置（圖說有寫），但新讀者可能把它當成第六條路線。
- 前一份 QA 的 R-3 指出，示意圖把仍在通車的 Kuraby 至 Loganlea 標成「施工中」。如果新區塊說「去官方圖看現有路網」，讀者在官方圖上看到這段有車，回來又看到「施工中」，會更混亂。R-3 的狀態標示建議應該和本項一起處理。

**可直接採用的改法**

新區塊最後一句，以及走廊圖標題下方的一行說明：

> 新區塊：本篇只選五條走廊來討論，不是完整路網。日常搭車請以官方路網圖和行程規劃為準。
>
> 走廊圖標題下方：五條中，M1、432 公車和南向鐵路現在都有車可搭（南向鐵路部分路段同時在擴建）；跨河鐵路在施工，The Wave 在規劃。沿著河流的淡色粗線是 CityCat 航線，只用來標出河流位置。

**必須保留**：跨河鐵路「官方預計 2029 年首批載客」（如要寫）；Kuraby 至 Beenleigh 四線化範圍；The Wave 為規劃中。

---

## N-2　官方地圖放在走廊圖前面是順的，但只能是一張小卡（高）

**理由**

讀者的順序是「先知道全貌，再看本篇挑了哪幾段」，所以官方路網放前面是對的。

但第一章目前的順序是：章名 → 走廊圖（桌機約 900px，手機約 1,100px，三排按鈕）→ 示意圖 → 才到人口和 Clayfield 的正文。手機上，讀者要滑過兩張圖才讀到本章第一句話。如果新區塊再加縮圖或多個連結，正文會被推得更遠。

**可直接採用的改法**

一個不帶縮圖的小卡，三行內完成：

> **現有公共交通路網**
> 東南昆士蘭的火車、公車與渡輪路網，請看 Translink 官方地圖（英文 PDF）。查單一路線或規劃行程，請用 Translink 行程規劃。本篇只選五條走廊來討論，不是完整路網。
> [官方地圖總覽](https://translink.com.au/plan-your-journey/maps) · [東南昆士蘭路網圖 PDF](https://translink.widen.net/s/lsqgxrsw82/260907-seq-network-map) · [行程規劃](https://jp.translink.com.au/)

第一句裡「火車、公車與渡輪」的範圍，要等 N-4 核對後再定稿。

實作備註：目前 `schematic()` 的最後已經有一個「Translink 官方路網圖」連結。加了新區塊後，這個連結重複了，建議移除（見 N-6）。

---

## N-3　主要連結指向入口頁；PDF 為次要，並標明英文 PDF（高）

**理由**

- 入口頁網址比 Widen PDF 穩定。PDF 檔名帶日期碼，官方換版時舊連結可能失效或停在舊版。
- 入口頁同時有路網圖、高頻圖、Busway 圖和地區圖，一個連結就能滿足不同讀者。
- PDF 會離開頁面，也可能是大檔案；在手機上開大型 PDF 的體驗不好。標「英文 PDF」讓讀者先知道會發生什麼。

**可直接採用的改法**

連結文字：

- 主要：「官方地圖總覽（Translink）」→ 入口頁
- 次要：「東南昆士蘭路網圖（英文 PDF）」→ SEQ network map
- 次要：「高頻服務圖（英文 PDF）」→ High frequency services（名稱待 N-4 核對）

並在 `sources.csv` 新增這幾個連結的來源列，記下讀取日期 2026-11-20。

---

## N-4　「總覽圖涵蓋鐵路和主要公車」這句話要先打開 PDF 核對（高）

**理由**

預計改法中「總覽圖涵蓋鐵路和主要公車」和「布里斯本高頻公車圖」，目前都只是根據檔名推測：

- SEQ network map 是否畫了公車？有些官方路網圖只畫鐵路、輕軌、渡輪和 busway。若沒有一般公車，這句話就是錯的。
- High frequency services 的檔名是 `seq-high-frequency-services`，涵蓋範圍可能是東南昆士蘭，內容可能同時包含火車與公車。
- 若檔名日期碼代表版本日，高頻圖是 2025-06-30 版，要確認它是不是 M1 上路後的新路網。

**需要核對的證據**

1. 打開 SEQ network map PDF：圖例列了哪些運具，是否畫出 M1、M2 和一般公車。
2. 打開 High frequency services PDF：標題、涵蓋地區、運具、版本日期。
3. 兩張圖上是否找得到本篇用到的 Eight Mile Plains、Loganlea、Indooroopilly、Clayfield。

**可直接採用的改法**

核對前先用不會出錯的寫法：

> 官方路網圖標出東南昆士蘭的主要大眾運輸路線；單一公車路線請用行程規劃查詢。

核對後，再依圖例改成「火車、Metro 與主要公車」之類的具體說法。

---

## N-5　手機上直接顯示三個連結（中）

**理由**

手機讀者最需要的是：一張能看全貌的圖，以及一個能查自己那條路線的工具。高頻圖對「哪條路線班次多」有幫助，但優先度低一些。Busway 圖和地區圖數量多，放入口頁就好。

**可直接採用的改法**

| 連結 | 手機 | 桌機 |
|---|---|---|
| 官方地圖總覽（入口頁） | 直接顯示 | 直接顯示 |
| 東南昆士蘭路網圖（英文 PDF） | 直接顯示 | 直接顯示 |
| 行程規劃（查單一路線） | 直接顯示 | 直接顯示 |
| 高頻服務圖（英文 PDF） | 不直接顯示，入口頁可找到 | 直接顯示 |
| Low vision 版、Busway 圖、地區圖 | 不顯示，入口頁可找到 | 不顯示 |

三個連結在 390px 寬度下用「·」分隔排成一段即可，不要做成按鈕；按鈕會和下方走廊圖的六個按鈕混在一起，讓讀者以為它們是同一組控制項。

---

## N-6　改名可行；示意圖和底部連結要一起調整（中）

**理由**

「本篇五條交通走廊」和「五條走廊總覽」能清楚表示這是本篇的選擇。不過第一章還有第二張圖叫「主要交通走廊」，「主要」兩字又會讓讀者以為這五條是布里斯本最重要的路線。示意圖底部的「Translink 官方路網圖」連結也和新區塊重複。

**可直接採用的改法**

| 位置 | 現在 | 建議 |
|---|---|---|
| 地圖標題 | 五條走廊在哪裡？ | 本篇五條交通走廊 |
| 第一個按鈕 | 全部走廊 | 五條走廊總覽 |
| 總覽時的地圖說明 | 從陽光海岸經布里斯本到黃金海岸。點選走廊看主要區域。 | 本篇五條走廊從陽光海岸經布里斯本到黃金海岸。點選一條走廊，可看經過的郊區。 |
| 示意圖標題 | 主要交通走廊 | 五條走廊的主要站點 |
| 示意圖底部連結 | Translink 官方路網圖 | 刪除（已移到新區塊） |

可點選路線、沿線郊區、施工或規劃狀態等功能都保留。英文版要同步改：例如「The five corridors in this report」「Overview of the five corridors」。

---

## N-7　首版只放連結就夠；暫不內嵌官方地圖（中，日後評估）

**只放連結是否足以達成總覽目的？**

就「讓讀者知道有完整路網、知道去哪裡查」這個目的，連結就夠了。

但連結解決不了一個具體問題：讀者在**本篇地圖上**看不出五條走廊和現有路網怎麼接。前一份 QA 的 R-3 已經看到三個例子：

- The Wave 從 Beerwah 開始，但地圖上看不出 Beerwah 已有往布里斯本的鐵路。
- 南向鐵路放大後，看不出它往北怎麼接回市中心。
- 第一章正文主角 Clayfield 不在地圖上。

讀者只能在官方 PDF 和本篇地圖之間來回對照，而兩張圖的比例、方位、語言都不同。

**不建議內嵌官方 PDF 或截圖**

Translink 版權頁寫：屬昆士蘭州版權的內容，可以「in unaltered form for your personal, non-commercial use」重製；其他用途需要書面同意（copyright@tmr.qld.gov.au）。版權頁另寫，來自 Google Maps 的地圖資料版權屬 Google。公開網站內嵌、裁切或縮放官方地圖，是否符合「不改動、個人非商業用途」，並不清楚。

**若日後要補，建議的最小做法**

不做可開關的完整公車圖層，只在本篇地圖加一層**淡色的既有鐵路線**，作為背景參考，不加控制項。這一層能直接解決上面三個接駁問題：Beerwah 往南、南向鐵路往北、Clayfield 所在的路線。全部公車路線太密，在 390px 手機上會蓋過五條走廊，反而更難讀。

需要核對的來源與使用條件：

1. **GTFS 授權**：Translink open data 頁寫「Our data is licensed under a Creative Commons Attribution 4.0 International License」。本篇地圖已標示「Translink GTFS · CC BY 4.0」，新增鐵路底層沿用即可。
2. **Open data 條款中的核准條文**：條款寫，若要在公開資料中傳達「information about the Translink network, logo or images」，須寄信至 translink.opendata@tmr.qld.gov.au 申請核准。這句話是否也適用於用 GTFS 自繪的路網圖，條文不夠明確。本篇現有的走廊圖本來就用 GTFS 繪製，所以**無論是否加圖層，都建議先確認這條**。
3. **資料版本**：用哪一天的 GTFS（目前地圖與研究使用 2026-10 的存檔），並在圖說寫明日期。
4. **檔案大小**：`brisbane-corridors.data.js` 目前約 133 KB。加鐵路底層前，先估算簡化後的座標量，避免拖慢手機載入。
5. **離線預覽**：底層資料要放在同一個 `.data.js`，不能用 `fetch()`，以符合 AGENTS.md 的 `file://` 規定。

**可直接採用的改法（首版）**

不內嵌，只在走廊圖圖說補一句：

> 本圖只畫本篇五條走廊。它們和其他火車、公車路線怎麼銜接，請對照上方官方路網圖。

---

## 待查

| 編號 | 疑點 | 需要核對的證據 |
|---|---|---|
| Q-1 | SEQ network map 是否包含一般公車與 Metro | 打開 PDF 看圖例 |
| Q-2 | High frequency services 的涵蓋範圍、運具與版本日期；是否為 M1 上路後的路網 | 打開 PDF 看標題與日期 |
| Q-3 | Widen 檔名的 `260907`、`250630` 是否為版本日期 | PDF 內頁的版本或生效日 |
| Q-4 | Open data 條款中「information about the Translink network」的核准要求，是否適用於本篇自繪的 GTFS 走廊圖 | 條款全文；必要時寄信至 translink.opendata@tmr.qld.gov.au 詢問 |
| Q-5 | 公開網站內嵌官方地圖是否符合版權頁的「unaltered、personal non-commercial」條件 | https://translink.com.au/legal/copyright；/legal/disclaimer（本輪未讀） |

本輪讀取的官方頁面：
- https://translink.com.au/plan-your-journey/maps
- https://translink.com.au/about-translink/open-data
- https://translink.com.au/about-translink/open-data/terms-and-conditions
- https://translink.com.au/legal/copyright

未讀取：各 PDF 本身、/legal/disclaimer、data.qld.gov.au 的 GTFS 資料集頁。
