# 布里斯本交通專題網站驗證

查核日期 2026-11-20。以本機 Chrome 讀取 HTML，資料和地圖透過相對路徑載入。

| 項目 | 查核結果 |
|---|---|
| 布里斯本中英稿 | 分別以 URL 語言參數開啟，兩稿都產生七章、九個已核對的章節與來源錨點、三張圖表及郊區地圖。 |
| 地圖與窄版 | 已逐一看過五條走廊截圖。另以 390 像素 iframe 目視檢查 432，控制項自動換行，地圖保持在版面內。 |
| 列印 | Chrome 輸出英文 PDF，文字檢查通過，含三張比較圖、工程里程碑、財源及站序。地圖的文字替代保留於同章。 |
| 星宇回歸 | 抽出共用圖表與時間軸前後，桌機及 500 像素寬整頁 PNG 雜湊相同。另用明確設定的淺色及深色桌機樣本，前後各自相同，兩種配色的畫面彼此不同。列印版文字與位置輸出相同。 |
| 資料一致性 | TMR 最新財務附註為 2025–26 年 A$88.1m，比較欄 2024–25 年 A$100.188m。網站、雙語稿、圖表底稿及財源資料已更新。 |
| 程式檢查 | JavaScript 語法、色彩 token、文件連結和 Git 空白檢查通過。 |
| 發布 | 首頁入口已接到本機專題。公開發布與 Threads 發文仍待執行。 |

## 官方資料複查

- 跨河鐵路首批載客服務仍為 2029 年官方預期，須完成系統整合、測試及營運準備。[工程 FAQ](https://crossriverrail.qld.gov.au/about/frequently-asked-questions/)
- 南向四線化範圍為 Kuraby 至 Beenleigh；The Wave 第二期從 Caloundra 到 Birtinya，工程分期和 2031、2032 里程碑沿用審計署估計口徑。[南向鐵路](https://www.yoursay-projects.tmr.qld.gov.au/logan-and-gold-coast-faster-rail) · [The Wave](https://www.yoursay-projects.tmr.qld.gov.au/thewaverail/project-location-and-maps) · [昆士蘭審計署](https://www.qao.qld.gov.au/reports-resources/reports-parliament/major-projects-2026)
- M1、M2 已有服務，擴建仍屬商業論證。50 分票價仍按 Translink 公布的適用範圍。[Brisbane Metro](https://www.brisbane.qld.gov.au/transport-and-parking/public-transport/brisbane-metro) · [Translink 票價](https://translink.com.au/tickets-and-fares/50-cent-fares)
- 年報新取得的票收數字為部門層級，維持與 SEQ 一般公共交通補助分列。[TMR 年報](https://www.publications.qld.gov.au/dataset/tmr-annual-report-2025-2026/resource/7a13cc14-1115-45a1-8a51-0d6086f487c2)

以上驗證為本機檢查。實機觸控及公開部署後的連結仍待確認。

## 可讀性 QA 修正

依 Claude 的 R-1 至 R-5 同步更新中英文稿、網站與 Threads 草稿。財源表改列可比較的資本金額，並分別標明州資本表估計與付款。旅程表標出從 08:00 到下車的表定時間。兩種走廊圖沿用同一套狀態線型，保留南向鐵路營運中的擴建標記。Chrome 已以 file:// 核對兩種語言的實際 HTML 輸出，包括表頭、圖例、財源類型、結論位置和 S-143 來源名稱。

## 官方路網總覽

第 1 章先呈現正文開頭，接著提供 Translink 官方地圖入口、東南昆士蘭路網圖與行程規劃。桌機另提供高頻公車圖，窄版讀者可從官方入口找到該圖。中英文均標示官方路網圖含部分未來路線。本篇五條走廊保留互動地圖及站序，並說明目前可搭的服務與工程狀態。官方 PDF 連結和生效版本已登錄 S-037、S-144 至 S-146。
