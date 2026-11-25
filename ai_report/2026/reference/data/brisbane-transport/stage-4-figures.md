# 第四階段圖表內容與計算紀錄

> 2026-11-25：本檔是 2026-11-20 七章版的紀錄。六章版圖表見 [stage-4-figures-six-chapter.md](stage-4-figures-six-chapter.md)。

## 走廊示意

以節點與連線表達，站間距離及方位不按比例。依 [工程清冊](projects.csv) 和 [狀態紀錄](status_log.csv)。

| 走廊 | 節點順序 | 圖例狀態 |
|---|---|---|
| 市中心跨河 | Dutton Park → Boggo Road → Woolloongabba → Albert Street → Roma Street → Bowen Hills | 交付及測試，首批載客預計 2029 |
| 南向鐵路 | Kuraby → Loganlea → Beenleigh → Pimpama → Hope Island → Varsity Lakes | Kuraby 至 Beenleigh 為四線化工作範圍；Pimpama 與 Hope Island 已營運 |
| 南向 Busway | Eight Mile Plains → Cultural Centre → Roma Street Busway | M1 已營運 |
| 陽光海岸 | Beerwah → Caloundra → Birtinya → Sunshine Coast Airport | 依序為一期重軌、二期重軌、三期類 Metro；Birtinya 為銜接點 |
| 西區公車 | Indooroopilly Shopping Centre → UQ St Lucia | 432 已營運 |

## 時間軸

| 日期 | 事件 | 標示 | 來源 |
|---|---|---|---|
| 2024-08 | 50 分票價試辦 | 已發生 | S-086 |
| 2024-12 | Kangaroo Point Bridge 開放 | 已發生 | S-140 |
| 2025-01、02、06 | M2 上路、50 分票價常態化、M1 與新版路網上路 | 已發生 | S-021、S-022、S-086 |
| 2025-10、12 | Pimpama 新站與 Coomera Connector 北段開放 | 已發生 | S-049、S-066 |
| 2026-05、09 | Hope Island 新站開放、Shorncliffe 部分列車使用數位訊號 | 已發生 | S-049、S-069、S-070 |
| 2027 | 新列車首批載客 | 官方預期 | S-066 |
| 2029 | Cross River Rail 首批載客 | 官方預期 | S-001、S-066 |
| 2031、2032 | 南向鐵路升級、The Wave 一期估計里程碑 | 官方預期 | S-066 |

## 比較圖表

| 圖表 | 期間、範圍與數值 | 計算及來源 |
|---|---|---|
| 人口 | 2020-06 至 2025-06，所選 11 個地方政府 3,602,475 → 4,005,043 人 | (4,005,043 ÷ 3,602,475 − 1) × 100 ≈ 11.2%。S-060，[逐區資料](derived/population_lga_2020-2025.csv) |
| 居民就業 | ABS 大布里斯本，截至 2024、2025、2026 年 9 月三個 12 個月平均，1,479,794／1,523,476／1,547,222 人 | 月估計值加總除以 12，換算為人後四捨五入。S-064、I-0001 至 I-0003 |
| 表定班次 | 2025-05-14 的 111／160 為 328 班，2026-10-21 的 M1 為 364 班 | 各路線雙向全天表定班次。200 + 128 = 328，S-025 |
| 上車計次 | 2025-05 的 111／160 為 193,986，2026-05 的 M1 為 382,655 | 舊線 118,898 + 28,906 + 36,367 + 9,815；只比較 go card 及 EMV。相差 (382,655 ÷ 193,986 − 1) × 100 ≈ 97.3%。轉乘可多次計入，S-084、S-085 |
| 站到站旅程 | 同為週三 08:00 開始計時，南區 22／23 分鐘，Logan 44 分鐘，西區 16 分鐘 | 等至上車加車程。站點為旅程端點，步行及轉乘欄為 0；住宅與目的地端步行未量測。S-025、[案例資料](journeys.csv) |

重算旅程時，於 2025-04-11 與 2026-10-07 的 GTFS 存檔以 calendar 和 calendar_dates 確定服務日，配對同一 trip 的站點與 stop_sequence，排除禁止上、下車的停靠，按 08:00 後最早到達選定列。南區限 111、160、M1，西區查 428、432，Logan 查兩端直達列車。出發及到站時刻與站碼保存在案例備註。08:00 恰巧遇上表定班車時，候車為 0，沒有加入安全裕度。

2026-11-20 複查：[ABS 人口原表](https://www.abs.gov.au/statistics/people/population/regional-population/2024-25)及[QGSO 地區人口資料](https://www.qgso.qld.gov.au/statistics/theme/population/population-estimates/regions)均有 2025 年地區資料。[ABS 區域勞動力](https://www.abs.gov.au/statistics/labour/employment-and-unemployment/regional-labour-force/latest-release)最新為 2026 年 9 月。[Translink 每月績效資料](https://www.data.qld.gov.au/dataset/translink-monthly-performance-data)於 11 月 17 日更新，口徑為區域運量，路線上車比較沿用起訖點原檔。[現行 50 分票價](https://translink.com.au/tickets-and-fares/50-cent-fares)及[Indooroopilly 站服務](https://jp.translink.com.au/plan-your-journey/stops/indooroopilly-shopping-centre-station?Direction=&RouteCode=433)用於核對服務；旅程時間仍按指定存檔日期。TMR 2025–26 年報財務附註 3 的票收已核對。[年報索引](https://www.publications.qld.gov.au/dataset/tmr-annual-report-2025-2026)

### 班表與實際營運

| 指標 | 2026 年 6 月 Citytrain 全網 | 口徑與來源 |
|---|---:|---|
| 尖峰準點率 | 95.16% | 早、晚尖峰合計。一般路線容許 3 分 59 秒，Gold Coast、Rosewood、North Coast 為 5 分 59 秒。上午多數於 Central 量測，下午於終點站量測。 |
| 全天班次履行率 | 99.84% | 以所有表定班次為基礎，計入部分與全程取消。 |

兩項均採官方不可抗力調整口徑。數值取 S-014 存檔的 Jun-2026 列，將 0.9516、0.9984 各乘以 100。兩項時間範圍不同，分開顯示。公車 S-015 為區域抽樣準點，抽樣方法與 Citytrain 不同，資料表也未提供履行率。[Translink 指標定義](https://translink.com.au/about-translink/reports-and-publications/performance)

## 財源表

單位為億澳幣；以 [funding.csv](funding.csv) 原始澳幣除以 100,000,000，照來源精度顯示。表內用途與期間不同的金額各自解讀。合約、預算和支出有交集，避免相加。詳見[逐案查核](stage-2-handoff.md)。

| 項目 | 出資與預算口徑 | 到位或支出 | 原表 |
|---|---|---|---|
| Cross River Rail | 全案估計 190.41，涵蓋主體、配套及維護；交付局資本預算 98.25，含私人融資 | 截至 2026-06-30，QAO 圖 1E 的資本預算約 98、累計資本支出約 84 | F-0001 至 F-0012 |
| 南向鐵路升級 | 聯邦及州各 28.75；合計 57.5 | 截至 2026-06-30 累計約 13；2026–27 年度預算約 6.51 | F-0014 至 F-0022 |
| The Wave | 一期 55，聯邦與州各半；二、三期共用規劃及招標準備 0.4 | 一期至 2026-06-30 累計 1.94；2026–27 年度編列 4.6 | F-0023 至 F-0028 |
| Brisbane Metro | 既有交付約 16.5，市府約 13、聯邦 3.515 | QAO 列截至 2025-06-30 累計支出 15.4；開通準備工作包包含公車路網共同項目 | F-0029 至 F-0035 |
| Metro 擴建 | 商業論證 1.5，聯邦、州、協議表列其他出資各 0.5 | 聯邦截至 2024–25 累計已付 0.02；各走廊施工資金仍待確認 | F-0036 至 F-0040 |
| 新版公車路網 | 2024–25 州追加 0.75；後續一般安排為州 75%、市府 25% | TMR 2024–25 列市府公車營運者款約 4.54；市府 2026–27 年度列三類服務合計補助 2.13 | F-0041 至 F-0043 |
| 50 分票價 | 州政府五年政策估計 15.22；2029–30 起每年約 3.688 | TMR 票收 2023–24 為 3.24704，2024–25 為 1.00188，2025–26 為 0.881；政策單獨實支公開資料看不出來 | F-0044 至 F-0054、F-0076 |
| 昆士蘭新車 | 州全案估計 95，含 20 年營運維護；TMR 資本預算 48.69 | QAO 至 2026-06-30 列資本支出約 22；州 2026–27 編列 4.10 | F-0055 至 F-0063 |
| Coomera Connector 一期 | 州資本表 35，最新查核聯邦和州各 17.5 | 至 2026-06-30 累計約 22.226，2026–27 編列 6.5 | F-0064 至 F-0070 |
| Kangaroo Point Bridge | 聯邦及市府原承諾分別為 0.632、1.27 | 2024 年開橋公告列交付 2.88；最終付款分攤待核 | F-0071 至 F-0075 |

東南昆士蘭一般公共交通補助（F-0053、F-0054）為 2025–26 估計實支 27.867 億及 2026–27 預算 29.458 億。所列年度「已有編列」。票收變動 (1.00188 ÷ 3.24704 − 1) × 100 ≈ −69.1%（2023–24 至 2024–25）。比較至 2025–26 為 (0.881 ÷ 3.24704 − 1) × 100 ≈ −72.9%。

## 問題與工程對照

| 已成立問題 | 服務差異 | 工程關聯 | 待驗證的資料 |
|---|---|---|---|
| P-0001 Clayfield 週六白天直達火車班距 | 抽查週六最長 60 分鐘，週三同時段 30 分鐘；附近公車提供進城選擇 | 尚無可核對的直接增班方案 | 週六正式班表、同地點步行及公車可達性、可比較的乘客資料 |

P-0002、P-0003 為現況描述，見[問題表](problems.csv)及[第二階段交接](stage-2-handoff.md)。
