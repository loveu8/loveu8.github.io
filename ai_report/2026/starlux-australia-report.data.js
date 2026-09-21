/*
 * Bilingual content for starlux-australia-report.html.
 * Every user-facing string is either a plain string (language-neutral: model
 * names, ISO-ish dates, currency codes, percent signs) or a { zh, en } pair.
 * Loaded via a plain <script src> tag (not fetch) so it works both when the
 * page is opened directly via file:// and when served over GitHub Pages.
 */
var STARLUX_REPORT_DATA = (function () {
  "use strict";

  var UI = {
    docTitle: { zh: "星宇飛雪梨，能不能站穩？旅客、經貿到競爭對手全部拆開看", en: "STARLUX to Sydney: Can It Stand Firm? Breaking Down Passengers, Trade, and Competitors" },
    metaDescription: { zh: "星宇航空 2027 雪梨航線：十個重點，看懂這條航線背後的邏輯。", en: "STARLUX's 2027 Sydney route: ten key points behind the business logic." },
    flightTag: { zh: "✈ TPE ⇄ SYD · 星宇航空 2027 計畫開航", en: "✈ TPE ⇄ SYD · STARLUX targets 2027 launch" },
    reportTitle: { zh: "星宇飛雪梨，能不能站穩？旅客、經貿到競爭對手全部拆開看", en: "STARLUX to Sydney: Can It Stand Firm? Breaking Down Passengers, Trade, and Competitors" },
    coreQuestion: {
      zh: "星宇航空預計 2027 年開航台北—雪梨。這是單純押注旅遊復甦，還是台灣和澳洲之間早就有足夠深的往來基礎，撐得起一條長程航線？以下十個重點，用公開數據拼出這條航線背後的邏輯，每一段都附資料來源，方便你自己核對。",
      en: "STARLUX plans to launch Taipei–Sydney service in 2027. Is this simply a bet on tourism recovery, or is there already a deep enough economic relationship between Taiwan and Australia to support a long-haul route? Here are ten key points, built from public data, laying out the logic behind this route — each one comes with its sources so you can check them yourself."
    },
    aboutLabel: { zh: "星宇航空是誰", en: "Who is STARLUX?" },
    aboutText: {
      zh: "星宇航空（STARLUX Airlines）2018 年成立、2020 年首航，是台灣近年新成立的航空公司，定位偏精品服務。目前機隊約 29 架，機型包含 A321neo、A330neo、A350-900 與 A350-1000，主要飛航亞洲、北美與部分歐洲航點；雪梨會是它在澳洲的第一個航點。",
      en: "STARLUX Airlines was founded in 2018 and took its first flight in 2020 — a newer Taiwanese carrier positioned as a boutique, premium airline. Its fleet is currently about 29 aircraft, including A321neo, A330neo, A350-900 and A350-1000 types, flying mainly to Asia, North America, and parts of Europe. Sydney will be its first destination in Australia."
    },
    methodLabel: { zh: "這份報告怎麼推理", en: "How this report reasons" },
    methodText: {
      zh: "這份報告是先看市場撐不撐得住，再回頭看星宇這波投入合不合理，不是反過來用星宇自己的動作證明市場夠大。星宇的招募、機隊擴充代表的是星宇自己的信心，信心可能對也可能錯，所以報告主要拿旅客量、經貿基礎、法規、競爭對手、星宇財務體質這些市場條件，來檢驗這份信心站不站得住腳。",
      en: "This report starts from whether the market can support the route, then works back to whether STARLUX's own investment makes sense — not the other way around, using STARLUX's own moves to prove the market is big enough. STARLUX's hiring and fleet expansion reflect its own confidence, which could turn out right or wrong. So the report leans on market conditions — passenger volume, economic ties, regulation, competitors, and STARLUX's own financial health — to test whether that confidence actually holds up."
    },
    reportMeta: { zh: "更新日期：2026 年 9 月 18 日 · 個人研究整理，非投資建議", en: "Last updated: September 18, 2026 · Personal research notes, not investment advice" },
    fullSourceSummary: { zh: "完整資料來源列表", en: "Full source list" },
    pendingSummary: { zh: "還在查證中的項目", en: "Still being verified" },
    footerNote: {
      zh: "內容整理自作者個人研究筆記，數據以官方與公司公告為主、部分引用媒體報導；圖表為輔助視覺化，數字若與官方最新公布有出入，請以官方原始來源為準。",
      en: "Content compiled from the author's personal research notes. Data comes mainly from official and company sources, with some media reports cited as well; charts are for visual reference only. If any figure differs from the latest official release, defer to the original source."
    },
    conclusionKicker: { zh: "回到最初的問題", en: "Back to the original question" },
    conclusionHeadline: { zh: "所以，答案是什麼？", en: "So, what's the answer?" },
    authorNoteLabel: { zh: "個人觀點，非本報告的數據結論", en: "Personal take — not a data-driven conclusion of this report" },
    authorNoteProcessLabel: { zh: "寫在最後：這份報告是怎麼來的", en: "One more thing: how this report came about" },
    dividerConclusion: { zh: "✈ 結論", en: "✈ Conclusion" },
    fleetUnit: { zh: "架", en: "aircraft" },
    langToggleLabel: { zh: "EN", en: "中文" },
    langToggleAria: { zh: "切換語言", en: "Switch language" }
  };

  var CH1_HISTORY = {
    categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [
      { label: { zh: "澳洲居住旅客來臺", en: "Australia residents" }, colorVar: "--color-primary", data: [102541, 111788, 18906, 568, 11509, 87288, 112547, 125288] },
      { label: { zh: "紐西蘭居住旅客來臺", en: "New Zealand residents" }, colorVar: "--color-accent", data: [16362, 19831, 3093, 159, 2792, 15040, 17053, 18242] }
    ]
  };

  var CH1_H1_COMPARE = {
    categories: [
      { zh: "1月", en: "Jan" }, { zh: "2月", en: "Feb" }, { zh: "3月", en: "Mar" },
      { zh: "4月", en: "Apr" }, { zh: "5月", en: "May" }, { zh: "6月", en: "Jun" }
    ],
    series: [
      { label: { zh: "2025 年", en: "2025" }, colorVar: "--color-secondary", data: [13381, 7306, 12294, 14090, 8658, 7295] },
      { label: { zh: "2026 年", en: "2026" }, colorVar: "--color-warm", data: [14626, 8013, 12384, 13767, 7901, 7872] }
    ]
  };

  var CH2_PURPOSE = [
    { label: { zh: "商務", en: "Business" }, value: 2 },
    { label: { zh: "留學", en: "Study" }, value: 5 },
    { label: { zh: "工作", en: "Work" }, value: 5 },
    { label: { zh: "探親訪友", en: "VFR" }, value: 18 },
    { label: { zh: "度假", en: "Holiday" }, value: 67 }
  ];

  var CH2_LENGTH = [
    { label: { zh: "1–7 晚", en: "1–7 nights" }, value: 25 },
    { label: { zh: "8–14 晚", en: "8–14 nights" }, value: 32 },
    { label: { zh: "15–30 晚", en: "15–30 nights" }, value: 14 },
    { label: { zh: "31 晚以上", en: "31+ nights" }, value: 29 }
  ];

  var CH6_LOADFACTOR = {
    categories: ["FY15/16", "FY16/17", "FY17/18", "FY18/19", "FY19/20", "FY20/21", "FY21/22", "FY22/23", "FY23/24", "FY24/25", "FY25/26"],
    data: [82, 80, 78, 78, 75, 14, 15, 65, 77, 82, 88]
  };

  var CH6_SCENARIO = {
    unit: { zh: "席", en: "seats" },
    gap: 40,
    groups: [
      { label: "2019", total: 146268, segments: [
        { label: { zh: "既有航班", en: "Existing flights" }, value: 146268, colorVar: "--color-primary" },
        { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, value: 0, colorVar: "--color-secondary" },
        { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, value: 0, colorVar: "--color-warm" }
      ]},
      { label: "2025", total: 78603, segments: [
        { label: { zh: "既有航班", en: "Existing flights" }, value: 78603, colorVar: "--color-primary" },
        { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, value: 0, colorVar: "--color-secondary" },
        { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, value: 0, colorVar: "--color-warm" }
      ]},
      { label: { zh: "情境：星宇 4 班", en: "Scenario: 4x/wk" }, total: 173976, segments: [
        { label: { zh: "既有航班", en: "Existing flights" }, value: 0, colorVar: "--color-primary" },
        { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, value: 112200, colorVar: "--color-secondary" },
        { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, value: 61776, colorVar: "--color-warm" }
      ]},
      { label: { zh: "情境：星宇 5 班", en: "Scenario: 5x/wk" }, total: 189420, segments: [
        { label: { zh: "既有航班", en: "Existing flights" }, value: 0, colorVar: "--color-primary" },
        { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, value: 112200, colorVar: "--color-secondary" },
        { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, value: 77220, colorVar: "--color-warm" }
      ]},
      { label: { zh: "情境：星宇每日", en: "Scenario: daily" }, total: 220308, segments: [
        { label: { zh: "既有航班", en: "Existing flights" }, value: 0, colorVar: "--color-primary" },
        { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, value: 112200, colorVar: "--color-secondary" },
        { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, value: 108108, colorVar: "--color-warm" }
      ]}
    ],
    legend: [
      { label: { zh: "既有航班", en: "Existing flights" }, colorVar: "--color-primary" },
      { label: { zh: "華航每日（情境）", en: "China Airlines daily (scenario)" }, colorVar: "--color-secondary" },
      { label: { zh: "星宇（情境）", en: "STARLUX (scenario)" }, colorVar: "--color-warm" }
    ]
  };


  var CH5_PORTS = [
    { label: { zh: "布里斯本", en: "Brisbane" }, value: 6841 },
    { label: { zh: "墨爾本", en: "Melbourne" }, value: 5425 },
    { label: { zh: "雪梨", en: "Sydney" }, value: 3621 }
  ];

  var CH5_SYDNEY = {
    categories: [2019, 2023, 2024, 2025],
    series: [
      { label: { zh: "雪梨—台北貨運量", en: "Sydney–Taipei freight" }, colorVar: "--color-primary", data: [9313, 5803, 4599, 3621] }
    ]
  };

  var CH9_FLEET = {
    groups: [
      { label: { zh: "2025 年底", en: "End of 2025" }, total: 29, segments: [
        { label: "A321neo", value: 13, colorVar: "--color-primary" },
        { label: "A330neo", value: 6, colorVar: "--color-secondary" },
        { label: "A350-900", value: 10, colorVar: "--color-accent" },
        { label: "A350-1000", value: 0, colorVar: "--color-warm" }
      ]},
      { label: { zh: "2026 年底目標", en: "End-2026 target" }, total: 43, segments: [
        { label: "A321neo", value: 16, colorVar: "--color-primary" },
        { label: "A330neo", value: 11, colorVar: "--color-secondary" },
        { label: "A350-900", value: 10, colorVar: "--color-accent" },
        { label: "A350-1000", value: 6, colorVar: "--color-warm" }
      ]}
    ],
    legend: [
      { label: "A321neo", colorVar: "--color-primary" },
      { label: "A330neo", colorVar: "--color-secondary" },
      { label: "A350-900", colorVar: "--color-accent" },
      { label: "A350-1000", colorVar: "--color-warm" }
    ]
  };

  var STORIES = [
    {
      id: "s1",
      kicker: { zh: "有多少人在往來", en: "How many people are traveling" },
      headline: { zh: "台灣飛澳洲的人，去年多了 18%", en: "18% more Taiwanese flew to Australia last year" },
      body: [
        { zh: "2025 年有 <strong>19.3 萬名</strong>台灣人到澳洲旅遊，比前一年成長 <strong>18%</strong>，成長速度比澳洲整體國際旅客還快。反過來，住在澳洲、回台灣的旅客約 12.5 萬人，也成長了 11%。兩個方向都在成長，但台灣去澳洲的人數明顯更多，大約是 1.5 倍。",
          en: "In 2025, about <strong>193,000</strong> Taiwanese traveled to Australia — up <strong>18%</strong> from the year before, growing faster than Australia's international visitor market overall. In the other direction, about 125,000 Australia-resident travelers visited Taiwan, up 11%. Both directions are growing, but the Taiwan-to-Australia flow is clearly larger — roughly 1.5 times as many." },
        { zh: "從下面這張圖也可以看出，澳洲居民來台已經超過 2019 疫情前高點約 12%，但紐西蘭居民還沒回到疫情前水準，落後約 8%——兩邊復甦的速度不一樣。台灣去澳洲的方向則大致回到 2019 年水準：澳洲 ABS 統計 2025 年 19.3 萬人、2019 年 19.5 萬人，差不到 1%。（台灣觀光署以「首站」口徑統計的赴澳人次，2025 年 16.0 萬仍低於 2019 年的 18.0 萬，但那個口徑只計第一個抵達的目的地，和 ABS 不能直接比較。）",
          en: "As the chart below shows, Australia-resident visitors to Taiwan have already surpassed the 2019 pre-pandemic peak by about 12%, while New Zealand residents still haven't recovered to pre-pandemic levels — about 8% behind. The two are recovering at very different speeds. The Taiwan-to-Australia direction has roughly returned to its 2019 level: Australia's ABS counts 193,000 in 2025 against 195,000 in 2019, a gap of under 1%. (Taiwan's Tourism Administration counts Australia as a first stop at 160,000 in 2025, still below 180,000 in 2019, but that basis only counts the first destination reached and can't be compared directly with ABS.)" }
      ],
      chart: {
        type: "line", id: "ch1-history",
        title: { zh: "住在澳洲、紐西蘭的旅客回台灣，人數變化（2018–2025）", en: "Australia- and New Zealand-resident visitors to Taiwan, 2018–2025" },
        data: CH1_HISTORY,
        sourceNote: { zh: "資料來源：交通部觀光署《觀光統計資料庫》", en: "Source: Taiwan Tourism Administration, Tourism Statistics Database" }
      },
      chart2: {
        type: "line", id: "ch1-h1-compare",
        title: { zh: "澳洲居住旅客來台，2025 vs 2026 上半年逐月比較", en: "Australia-resident visitors to Taiwan, monthly Jan–Jun: 2025 vs 2026" },
        data: CH1_H1_COMPARE, suffix: "",
        sourceNote: {
          zh: "資料來源：交通部觀光署《觀光統計資料庫》。這張圖只畫「澳洲→台灣」方向；反向「台灣→澳洲」（19.3 萬那個方向）的月資料來自澳洲 ABS，數字見下方說明。",
          en: "Source: Taiwan Tourism Administration, Tourism Statistics Database. This chart shows only the Australia→Taiwan direction; monthly data for the reverse direction (Taiwan→Australia — the 193,000 figure above) comes from Australia's ABS, with figures in the note below."
        }
      },
      boxes: [
        { type: "info",
          title: { zh: "1.5 倍，是不是代表回程班機是空的？", en: "Does the 1.5x ratio mean return flights fly empty?" },
          body: { zh: "不是。這個比例算的是「兩邊住在哪裡的人」各自出去玩了幾次，不是同一班飛機去程、回程各自賣了幾張票。大部分旅客自己買去程也買回程，兩個方向其實都各自貢獻了一張機票。真的要看哪個方向比較空，要看直飛班機每個方向實際的載客數。澳洲 BITRE 有這份資料：雪梨—台北直飛 2025 年，台北→雪梨載了 64,553 人、雪梨→台北載了 68,070 人，兩個方向幾乎相等（2019 年是 106,327 對 111,982，也接近 1:1）。這是該航段實際載客，包含在台北轉機到第三地的旅客，但不含經香港、新加坡等其他樞紐飛的旅客。（資料來源：BITRE《International airline activity》城市對資料，截至 2026 年 6 月）",
            en: "No. This ratio measures how many trips residents on each side take — not how many seats are sold on the outbound versus return leg of the same flight. Most travelers buy both an outbound and a return ticket, so each direction gets its own segment either way. To see which direction runs emptier you need actual passengers carried per direction on direct flights, and Australia's BITRE publishes exactly that: on Sydney–Taipei direct flights in 2025, 64,553 passengers flew Taipei→Sydney and 68,070 flew Sydney→Taipei — nearly identical (2019 was 106,327 vs 111,982, also close to 1:1). This counts passengers actually carried on that sector, including those connecting onward at Taipei to a third destination, but excluding those who fly via other hubs such as Hong Kong or Singapore. (Source: BITRE, International airline activity, city-pair data, to June 2026)" } },
        { type: "gold",
          title: { zh: "2026 上半年最新數字：兩個方向的走勢不同", en: "Latest H1 2026 numbers: the two directions are moving differently" },
          body: { zh: "我實際查了 2026 年 1–6 月的官方數字。住在澳洲、回台灣的旅客有 64,563 人次，比 2025 同期（63,024）只成長約 2.4%，比 2025 全年 +11.32% 慢了不少。但台灣人去澳洲的方向沒有放緩：ABS 統計 2026 年 1–6 月台灣居民短期入境 101,020 人次，比 2025 同期（87,600）成長約 15.3%；加上 7 月（23,910，約 +1%），1–7 月為 124,930，成長約 12.3%，和 2025 全年 +17.6% 相比仍是雙位數成長。單月波動很大（1 月 -19%、2 月 +85%），可能主要受春節落點不同影響（2025 年在 1 月底、2026 年在 2 月中），因此不宜只看單月。班機端也一致：台澳直飛（三個航點城市對合計）2026 上半年載客比去年同期多約 11%，雪梨—台北一線約多 13%。所以目前「放緩」只出現在澳洲→台灣方向；較大的台灣居民赴澳市場仍維持雙位數成長。這只是半年的快照，後續季度仍要追蹤。（資料來源：交通部觀光署《觀光統計資料庫》；ABS《Overseas Arrivals and Departures》2026 年 7 月號 Table 5；BITRE）",
            en: "I pulled the official Jan–Jun 2026 figures. Australia-resident visitors to Taiwan came to 64,563 — only about 2.4% higher than the same period in 2025 (63,024), well below 2025's full-year +11.32%. But the Taiwan-to-Australia direction is not slowing: ABS counts 101,020 short-term arrivals from Taiwan residents in Jan–Jun 2026, up about 15.3% on the same period of 2025 (87,600). Adding July (23,910, about +1%), Jan–Jul totals 124,930, up about 12.3% — still double-digit growth, against 2025's full-year +17.6%. Single months swing widely (January -19%, February +85%), possibly driven mainly by Lunar New Year falling in different months (late January in 2025, mid-February in 2026), so single months shouldn't be over-read. Flights tell the same story: passengers carried on Taiwan–Australia direct flights (three gateways' city pairs combined) in H1 2026 were about 11% higher than a year earlier, and about 13% higher on Sydney–Taipei. So the slowdown appears only in the Australia→Taiwan direction; the larger market of Taiwan residents traveling to Australia is still growing at double digits. This is only a half-year snapshot and still needs tracking over coming quarters. (Sources: Taiwan Tourism Administration Tourism Statistics Database; ABS, Overseas Arrivals and Departures, July 2026 release, Table 5; BITRE)" } }
      ]
    },
    {
      id: "s2",
      kicker: { zh: "這些旅客是誰", en: "Who are these travelers" },
      headline: { zh: "不是一次性熱潮，是有回頭客的市場", en: "Not a one-off wave — a market with repeat visitors" },
      body: [
        { zh: "台灣旅客去澳洲，<strong>67%</strong> 是純粹度假，比澳洲一般國際旅客平均（約 43%）高出不少。有將近三成的人一待就是一個月以上，而且超過一半（<strong>56%</strong>）不是第一次去。換句話說，這個市場不是只靠新鮮感撐起來的，有相當比例是熟客。",
          en: "Of Taiwanese travelers to Australia, <strong>67%</strong> are on a pure holiday trip — well above Australia's overall international-visitor average of about 43%. Nearly 30% stay a month or longer, and more than half (<strong>56%</strong>) are repeat visitors. In other words, this market isn't carried by novelty alone — a good share of it is regulars." }
      ],
      chart: {
        type: "bar", id: "ch2-purpose",
        title: { zh: "台灣旅客去澳洲的目的", en: "Purpose of visit: Taiwanese travelers to Australia" },
        data: CH2_PURPOSE, colorVar: "--color-secondary", suffix: "%",
        sourceNote: { zh: "資料來源：Tourism Research Australia《Taiwan Visitor Economy Profile 2025》", en: "Source: Tourism Research Australia, Taiwan Visitor Economy Profile 2025" }
      },
      chart2: {
        type: "bar", id: "ch2-length",
        title: { zh: "在澳洲待多久", en: "Length of stay in Australia" },
        data: CH2_LENGTH, colorVar: "--color-warm", suffix: "%"
      },
      boxes: [
        { type: "info",
          title: { zh: "商務出差只占 2%，不代表商務艙賣不掉", en: "Business travel is only 2% — that doesn't mean business class won't sell" },
          body: { zh: "「旅遊目的」不等於「艙等選擇」。商務艙的需求可能來自消費力高的度假客、探親旅客，或是經台北轉機的旅客——這些都還需要更細的票價資料才能確認。",
            en: "Purpose of visit isn't the same as cabin class. Business-class demand can still come from high-spending holidaymakers, VFR travelers, or passengers connecting through Taipei — confirming that still needs finer fare and booking-class data." } },
        { type: "caution",
          title: { zh: "澳洲 9/17 移民改革：方向會壓縮長天數停留，但對這條航線的衝擊還量不出來", en: "Australia's 17 September migration changes: they push toward shorter stays, but the impact on this route can't yet be measured" },
          body: { zh: "澳洲移民部長 Tony Burke 在 2026 年 9 月 17 日宣布兩項改革。第一，打工度假簽證（417/462）第二年名額從 57,000 降到 45,000（約 -21%），第三年從 31,000 降到 5,000（約 -84%），改為抽籤，且需先完成 88 天（第二年）或 6 個月（第三年）偏鄉工作才有資格；第一年名額沒有被砍。第二，新發出的觀光簽證一律加註「不得境內續留」，堵住先以觀光簽證入境、再就地轉簽打工度假或學生簽證的「visa hopping」。兩項都讓「留久一點」變難。<br><br>但影響要老實校準。台灣旅客有 <strong>67%</strong> 是純度假，多半買好來回機票，應該不受直接影響；「停留 31 晚以上占 29%」裡有多少是打工度假或境內轉簽，TRA 沒有拆分，目前無法得知。公告沒有提到台灣，台灣申請人適用一般規則。所以這是方向合理的推論，實際量級沒有航線層級數據可以驗證，不宜寫成重大衝擊。（資料來源：ABC News 2026-09-17）",
            en: "Australia's immigration minister, Tony Burke, announced two changes on 17 September 2026. First, Working Holiday visa (417/462) second-year places were cut from 57,000 to 45,000 (about -21%) and third-year places from 31,000 to 5,000 (about -84%), moving to a ballot that also requires 88 days (year 2) or 6 months (year 3) of regional work to be eligible; first-year places weren't cut. Second, every newly issued visitor visa now carries a 'no further stay' condition, closing the 'visa hopping' path of entering on a visitor visa and then converting onshore to a working holiday or student visa. Both make staying longer harder.<br><br>But the impact needs honest calibration. <strong>67%</strong> of Taiwanese travelers are on a pure holiday trip, mostly on round-trip tickets already booked, so they should not be directly affected. How much of the 'stay 31 nights or more — 29%' group is working-holiday or onshore-conversion travel isn't broken out by TRA, so it's unknown. The announcement didn't mention Taiwan, so Taiwanese applicants face the standard rules. The direction is a reasonable inference, but there's no route-level data to verify the scale, so it shouldn't be written up as a major shock. (Source: ABC News, 2026-09-17)" } }
      ]
    },
    {
      id: "s3",
      kicker: { zh: "對澳洲來說，這值多少錢", en: "What this is worth to Australia" },
      headline: { zh: "澳洲政府和雪梨機場，為什麼想要台灣航班", en: "Why Australia's government and Sydney Airport want Taiwan flights" },
      stat: { value: { zh: "A$9.78 億", en: "A$978m" }, label: { zh: "2025 年台灣旅客在澳洲的消費總額（約合新台幣 222 億元），年增 8%（新台幣以約 1 澳幣≈22.7 新台幣概算，僅供參考）", en: "Total spend by Taiwanese visitors in Australia in 2025 (roughly NT$22.2b), up 8% year-on-year (NT dollar figure is a rough conversion at about A$1 ≈ NT$22.7, for reference only)" } },
      body: [
        { zh: "這一段是「澳洲政府 / 機場的角度」，不是「星宇會不會賺錢」的角度——旅客花多少錢，決定的是澳洲政府願不願意招商，不直接等於航空公司的營收。這筆錢也解釋了為什麼雪梨所在的新南威爾斯州政府把台灣列為「優先市場」，並設補助金鼓勵新航線。",
          en: "This part is about the Australian government's and airport's perspective, not about whether STARLUX itself makes money — how much visitors spend determines whether Australian authorities want to court more capacity, not whether the airline turns a profit. That spending is also why the New South Wales government, home to Sydney, has named Taiwan a 'priority market' and set up a grant to encourage new routes." }
      ],
      boxes: [
        { type: "caution",
          title: { zh: "反過來問：澳洲人在台灣花多少錢？查不到同等精細的數字", en: "Flip the question: how much do Australians spend in Taiwan? No figure that detailed exists" },
          body: { zh: "交通部觀光署 2025 年的官方消費調查，只列出美、日、韓、中國大陸、港澳、歐洲、新南向 7 國的市場別消費金額，沒有把澳洲、紐西蘭單獨列出來。新聞稿提到「紐澳合計」人次已達疫情前的 109.05%——但這是人次恢復率，不是消費金額，也不能拆開解讀成兩國各自都超過 2019 年（事實上澳洲已超過、紐西蘭還沒），這是一個老實標記的資料缺口。",
            en: "Taiwan's 2025 official spending survey breaks out spending by market only for the US, Japan, Korea, mainland China, Hong Kong/Macau, Europe, and the seven priority New Southbound markets — Australia and New Zealand aren't listed separately. A press release notes that combined 'Australia + New Zealand' visitor headcount reached 109.05% of the pre-pandemic (2019) level — but that's a headcount recovery rate, not a spending figure, and it's a combined total that can't be split into 'both countries individually exceeded 2019' (in fact Chapter 1 already shows Australia has passed 2019 while New Zealand hasn't). So there's currently no way to estimate Australia-resident visitors' total or per-visitor spending in Taiwan from public data — an honestly-flagged data gap." } },
        { type: "gold",
          title: { zh: "NSW 政府剛好在同一時間點推出「拉新航線」補助", en: "NSW's new-route grant happens to land at the same moment" },
          body: { zh: "新南威爾斯州的 Take-Off Fund 要求新航線每週至少 3 班、2027 年 6 月底前開航，台灣被列為優先市場——條件跟星宇的計畫高度重疊。但這筆補助的申請人是機場、不是航空公司，目前也沒有證據顯示星宇拿到這筆錢。時間點對得上，不等於因果關係已經證實。",
            en: "New South Wales' Take-Off Fund requires a new route to fly at least 3 times a week and start by end of June 2027, with Taiwan named a priority market — conditions that overlap heavily with STARLUX's plans. But the grant applicant is the airport, not the airline, and there's no evidence yet that STARLUX has received this money. The timing lines up; that alone doesn't prove causation." } }
      ]
    },
    {
      id: "s4",
      kicker: { zh: "不只是觀光", en: "More than just tourism" },
      headline: { zh: "兩國的關係，比觀光更深一層", en: "The relationship runs deeper than tourism" },
      statGrid: [
        { n: { zh: "A$279 億", en: "A$27.9b" }, l: { zh: "2025 台澳雙邊貿易額（約合新台幣 6,330 億元）；台灣是澳洲第 14 大貿易夥伴", en: "2025 two-way Taiwan–Australia trade (roughly NT$633b); Taiwan is Australia's 14th-largest trading partner" } },
        { n: { zh: "第 9 名", en: "#9" }, l: { zh: "台灣是澳洲第 9 大出口市場", en: "Taiwan is Australia's 9th-largest export market" } },
        { n: { zh: "A$30 億", en: "A$3.0b" }, l: { zh: "雙邊服務貿易（約合新台幣 680 億元，含教育、觀光）", en: "Two-way services trade (roughly NT$68b, including education and tourism)" } },
        { n: "11,792", l: { zh: "在澳洲就讀的台灣留學生人數", en: "Taiwanese students studying in Australia" } }
      ],
      body: [
        { zh: "除了貿易，還有雙向投資往來——台灣在澳洲投資約 A$200 億（約合新台幣 4,540 億元，較 2024 年下降 15%），澳洲在台灣投資約 A$392 億（約合新台幣 8,900 億元，台灣為澳洲第 17 大對外投資目的地）。這些數字說明台灣和澳洲之間，本來就有比「觀光」更深一層的往來基礎。（新台幣金額以約 1 澳幣≈22.7 新台幣概算，僅供參考，實際匯率會浮動）",
          en: "Beyond trade, there's two-way investment: Taiwan has invested about A$20b (roughly NT$454b) in Australia — down 15% from 2024 — while Australia has invested about A$39.2b (roughly NT$890b) in Taiwan, making Taiwan Australia's 17th-largest outward investment destination. These figures show Taiwan and Australia already have ties that run deeper than tourism alone. (NT dollar figures are rough conversions at about A$1 ≈ NT$22.7, for reference only — actual exchange rates fluctuate.)" }
      ],
      sourceNote: {
        zh: "資料來源：澳洲外交貿易部（DFAT）<a href=\"https://www.dfat.gov.au/geo/taiwan/australia-taiwan-relationship\" target=\"_blank\" rel=\"noopener\">《Australia-Taiwan relationship》</a>官方頁面",
        en: "Source: Australian Department of Foreign Affairs and Trade (DFAT), <a href=\"https://www.dfat.gov.au/geo/taiwan/australia-taiwan-relationship\" target=\"_blank\" rel=\"noopener\">Australia-Taiwan relationship</a> official page"
      },
      boxes: [
        { type: "caution",
          title: { zh: "貿易額大，不代表空運貨量大", en: "A large trade figure doesn't mean large air-cargo volume" },
          body: { zh: "澳洲對台灣的出口大宗是煤炭、天然氣這類大宗商品，主要不是航空貨運的目標市場。真正能撐起貨艙的是高價、時效敏感的商品，例如生鮮、藥品、半導體零組件——這部分要留到下一段用真正的空運數據確認。",
            en: "Australia's exports to Taiwan are dominated by bulk commodities like coal and natural gas, which mostly aren't targets for air freight. What actually fills a cargo hold is high-value, time-sensitive goods — fresh produce, pharmaceuticals, semiconductor components — and that needs real air-freight data to confirm, which comes in the next section." } }
      ]
    },
    {
      id: "s5",
      kicker: { zh: "會不會載貨", en: "Will it carry cargo" },
      headline: { zh: "貨運：台澳貨量不大、雪梨最少，星宇目前只有籌備跡象", en: "Cargo: Taiwan–Australia freight is modest and Sydney carries the least — STARLUX so far shows only preparation" },
      body: [
        { zh: "星宇在雪梨機場的招募清單裡，除了分公司總經理、人資經理、機場站長，還有一個貨運經理，職務內容包含貨運銷售、倉儲與貨代關係，職缺文字也寫明澳洲分公司是為客運與貨運營運而設。這說明貨運在籌備範圍內，但不代表它會貢獻多少收入。星宇 2025 年的貨運收入占公司總營收超過一成，且成長超過 <strong>50%</strong>，但這是整個航網的數字，不是雪梨航線專屬的。",
          en: "Among STARLUX's Sydney hiring list — branch general manager, HR manager, station manager — there's also a cargo manager, covering cargo sales, warehousing, and freight-forwarder relationships, and the listing states the Australian branch was set up to support both passenger and cargo operations. That shows cargo is within the launch planning, but it doesn't show how much revenue it will contribute. STARLUX's cargo revenue made up over a tenth of total company revenue in 2025 and grew more than <strong>50%</strong> — though that's a network-wide figure, not specific to the Sydney route." },
        { zh: "那台澳之間實際有多少貨？澳洲官方 BITRE 的統計顯示：2025 年台澳之間定期航班載運的貨量，雙向合計約 <strong>1.59 萬噸</strong>，比 2019 年的約 1.96 萬噸少了約 19%。雪梨—台北這一條線 2025 年約 <strong>3,621 噸</strong>（台灣→澳洲 2,375 噸、澳洲→台灣 1,247 噸），只有 2019 年（9,313 噸）的約四成，其中澳洲→台灣方向降幅最大（5,766 噸降到 1,247 噸）。在台澳三個航點裡，雪梨的貨量也是最少的。2026 年上半年台澳合計 8,483 噸，比 2025 年同期成長約 19%，但雪梨只成長約 4%（1,919 噸），成長主要來自墨爾本與布里斯本。",
          en: "So how much freight actually moves between Taiwan and Australia? Australia's official BITRE statistics show that scheduled flights carried about <strong>15,900 tonnes</strong> in both directions in 2025 — roughly 19% below 2019's ~19,600 tonnes. The Sydney–Taipei route alone carried about <strong>3,621 tonnes</strong> in 2025 (2,375 Taiwan→Australia, 1,247 Australia→Taiwan), only about 40% of 2019's 9,313 tonnes, with the Australia→Taiwan direction falling most (5,766 down to 1,247). Among the three Taiwan–Australia gateways, Sydney also carries the least. In H1 2026, Taiwan–Australia freight totalled 8,483 tonnes, up about 19% on the same period of 2025 — but Sydney grew only about 4% (1,919 tonnes), with the growth coming mainly from Melbourne and Brisbane." }
      ],
      chart: {
        type: "bar", id: "ch5-ports",
        title: { zh: "2025 年台澳定期航班載運貨量，按澳洲航點（噸）", en: "Taiwan–Australia scheduled-flight freight in 2025, by Australian gateway (tonnes)" },
        data: CH5_PORTS, colorVar: "--color-secondary",
        sourceNote: { zh: "資料來源：澳洲 BITRE《International airline activity》城市對資料（截至 2026 年 6 月），雙向合計、單位為公噸", en: "Source: Australia's BITRE, International airline activity, city-pair data (to June 2026); both directions combined, in tonnes" }
      },
      chart2: {
        type: "line", id: "ch5-sydney",
        title: { zh: "雪梨—台北定期航班載運貨量（噸，雙向合計）", en: "Sydney–Taipei scheduled-flight freight (tonnes, both directions)" },
        data: CH5_SYDNEY, suffix: "",
        sourceNote: { zh: "資料來源：同上", en: "Source: same as above" }
      },
      boxes: [
        { type: "info",
          title: { zh: "這些數字說明什麼、不說明什麼", en: "What these numbers do and don't show" },
          body: { zh: "這是定期國際航班實際載運的貨量，按上下機點計，不是台澳貿易中「適合走空運的貨」有多少，也沒有貨物種類。雪梨貨量下降的原因（例如長榮退出雪梨、貨轉往其他航點）目前沒有拆分資料，不能直接歸因。就數字本身來看，目前看不出貨運能成為雪梨線的重要收入來源，但也不能就此排除——星宇帶來的是新增貨艙，價格與貨物結構可能不同，這部分沒有資料。",
            en: "This is freight actually carried on scheduled international flights, counted by boarding and landing points — not how much of Taiwan–Australia trade is suited to air freight, and it has no commodity breakdown. The reasons behind Sydney's decline (for example EVA Air leaving Sydney, or freight shifting to other gateways) aren't broken out in the data and can't be attributed directly. On the numbers alone, cargo doesn't look like a major revenue source for the Sydney route — but it can't be ruled out either, since STARLUX adds new hold capacity whose pricing and cargo mix may differ, and there's no data on that." } },
        { type: "gap",
          title: { zh: "還缺什麼", en: "What's still missing" },
          body: { zh: "貨物品項（BITRE 只有噸數，需另查澳洲 ABS 進出口按運輸模式，或台灣關務署資料）、2026 年 7–8 月（BITRE 最新資料到 6 月）、星宇 A330neo 實際可售貨艙。這幾項目前是明確的資料缺口。",
            en: "Commodity mix (BITRE gives tonnes only; it needs Australia's ABS trade-by-transport-mode data or Taiwan customs data), July–August 2026 (BITRE's latest data is June), and the actual sellable hold capacity of STARLUX's A330neo. These remain clear data gaps." } }
      ]
    },
    {
      id: "s7",
      kicker: { zh: "法規過不過得了關", en: "Can it clear the regulatory hurdles" },
      headline: { zh: "台澳之間沒有航班數上限，但雪梨機場本身很擠", en: "No cap on Taiwan–Australia flights, but Sydney Airport itself is crowded" },
      body: [
        { zh: "要飛一條新航線，得先過三關：兩國政府談好的「航權」、機場實際能不能排到起降時段，如果還想延伸到第三地，更要多一份當地許可。",
          en: "Launching a new route has to clear three gates: the traffic rights the two governments have agreed on, whether the airport can actually fit in a takeoff/landing slot, and — if it wants to extend to a third country — a separate local approval on top of that." }
      ],
      boxes: [
        { type: "info",
          title: { zh: "第一關：台澳雙邊運能——沒有總量上限", en: "Gate 1: Taiwan–Australia bilateral capacity — no overall cap" },
          body: { zh: "澳洲政府公布的文件寫著：台灣市場的容量上限是「Open」，目前每週每方向約使用 20 班，可用額度無限制。也就是說，星宇要不要多開班次，卡在容量額度上不是問題。",
            en: "Australian government documents list Taiwan's capacity limit as 'Open,' with about 20 flights per direction per week currently in use and unlimited capacity available. In other words, whether STARLUX adds more flights isn't constrained by a capacity ceiling." } },
        { type: "caution",
          title: { zh: "第二關：雪梨機場本身有總量管制", en: "Gate 2: Sydney Airport itself is capacity-controlled" },
          body: { zh: "雪梨機場是國際航空運輸協會定義的「Level 3 協調機場」——需求早就超過機場本身能負荷的容量，每小時最多 80 架次、每天最多 1,360 架次起降，所有航空公司都得先申請「時段」才能排進去。星宇能拿到幾點的時段，會直接影響轉機銜接的品質。",
            en: "Sydney Airport is a 'Level 3 coordinated airport' under IATA's definition — demand has long outstripped what the airport can physically handle, with a hard cap of 80 movements per hour and 1,360 per day, and every airline needs a slot to operate. Which slot STARLUX secures will directly affect how well its connections work; that's an operational-access question, separate from traffic rights." } },
        { type: "gold",
          title: { zh: "第三關：雪梨到奧克蘭這段，還缺一份官方文件", en: "Gate 3: the Sydney–Auckland leg is still missing an official document" },
          body: { zh: "星宇規劃把航班延伸到紐西蘭奧克蘭，並單獨賣票——這需要澳洲和紐西蘭都同意台灣籍航空公司在雪梨載客飛奧克蘭。目前只有星宇高層受訪這樣說，還沒看到政府正式核准文件。",
            en: "STARLUX plans to extend the route to Auckland, New Zealand, and sell that leg separately — which requires both Australia and New Zealand to agree that a Taiwanese carrier can pick up local passengers in Sydney bound for Auckland. So far this is only something STARLUX executives have said in interviews; no formal government approval has been seen yet." } }
      ]
    },
    {
      id: "s6",
      kicker: { zh: "現有位子夠不夠", en: "Is there enough capacity already" },
      headline: { zh: "直飛座位比疫情前少、載客率創高——但新運力正要進場", en: "Direct seats are below pre-pandemic levels and load factor is at a high — but new capacity is about to arrive" },
      body: [
        { zh: "這是整份報告的關鍵轉折。前面確認了需求存在、法規上也飛得成，這裡開始檢查「供給」接不接得住——如果現有的直飛班機已經很難再擠進更多人，新進者就有機會。澳洲 BITRE 的實測資料顯示：台澳直飛（全澳洲、雙向合計）載客率在疫情前約 78–82%，FY24/25 為 82%，最近一個完整財年 FY25/26（2025 年 7 月到 2026 年 6 月）已到 <strong>88%</strong>；同期單向座位從 FY18/19 的 36.9 萬降到 FY24/25 的 27.8 萬（約 -25%），FY25/26 小幅回升到 29.2 萬。雪梨這條線更明顯：2025 年單向座位只有 2019 年的約 54%，載客率從 74.7% 升到 84.4%。星宇規劃用 A330neo（297 席）飛這條航線，每週先開 4 到 5 班，之後逐步加到每天一班。",
          en: "This is the pivotal turn in the whole report. Up to here we've confirmed demand exists and the regulatory path is clear — this is where we check whether existing supply can absorb it. If current direct flights are already nearly full, there's room for a new entrant. Australia's BITRE data shows Taiwan–Australia direct load factor (all of Australia, both directions combined) ran around 78–82% before the pandemic, was 82% in FY24/25, and reached <strong>88%</strong> in the latest full fiscal year, FY25/26 (July 2025 to June 2026). Over the same span, one-way seats fell from 369,000 in FY18/19 to 278,000 in FY24/25 (about -25%), then edged back up to 292,000 in FY25/26. Sydney is starker: 2025 one-way seats were only about 54% of 2019, while load factor rose from 74.7% to 84.4%. STARLUX plans to fly this route with an A330neo (297 seats), starting at 4–5 flights a week and building up to daily." }
      ],
      statGrid: [
        { n: { zh: "14.6 萬 → 7.9 萬", en: "146k → 79k" }, l: { zh: "雪梨—台北直飛單向年座位，2019 → 2025（約 -46%）", en: "Sydney–Taipei direct one-way annual seats, 2019 → 2025 (about -46%)" } },
        { n: "74.7% → 84.4%", l: { zh: "同線雙向載客率，2019 → 2025；2026 上半年為 88.9%", en: "Same route, both directions combined, 2019 → 2025; H1 2026 was 88.9%" } },
        { n: "≈ 1 : 1", l: { zh: "同線 2025 年兩方向旅客（64,553 對 68,070），直飛沒有方向失衡", en: "Same route, 2025 passengers by direction (64,553 vs 68,070) — no directional imbalance on direct flights" } },
        { n: "92–100%", l: { zh: "2025–2026 年雪梨線多個月份的單向單月載客率", en: "Sydney route single-direction monthly load factor in several months of 2025–2026" } }
      ],
      chart: {
        type: "line", id: "ch6-loadfactor",
        title: { zh: "台澳直飛航班的載客率（全澳洲、雙向合計），近十一個財年", en: "Taiwan–Australia direct load factor (all Australia, both directions), last eleven fiscal years" },
        data: CH6_LOADFACTOR, colorVar: "--color-primary", suffix: "%",
        sourceNote: { zh: "資料來源：澳洲 BITRE 航空統計（按航空公司與國家）；載客率＝旅客 ÷ 座位，財年為 7 月至次年 6 月。TRA《Taiwan Visitor Economy Profile 2025》圖中 FY24/25 的 79% 與這裡「入境方向」的載客率（79.4%）一致，雙向合計則為 82.3%。國家層級統計按同班號服務的起訖國家分類，含同班號延伸航段（如經澳洲過境）的旅客，不是純粹的台澳 O&D；雪梨單線載客率另由城市對資料計算。", en: "Source: Australia's BITRE aviation statistics (by airline and country); load factor = passengers ÷ seats, fiscal year runs July to June. The 79% for FY24/25 in TRA's Taiwan Visitor Economy Profile 2025 matches the inbound-direction load factor here (79.4%); both directions combined is 82.3%. Country-level statistics classify by the origin and destination countries of same-flight-number services and include passengers on extended sectors of the same flight (for example, transiting Australia), so they aren't a pure Taiwan–Australia O&D; the Sydney single-route load factor is calculated separately from city-pair data." }
      },
      chart2: {
        type: "stacked", id: "ch6-scenario",
        title: { zh: "雪梨—台北直飛單向年座位：2019、2025，與新增運力的情境", en: "Sydney–Taipei direct one-way annual seats: 2019, 2025, and new-capacity scenarios" },
        data: CH6_SCENARIO,
        sourceNote: {
          zh: "2019、2025 為 BITRE 實際座位（單向）。情境為簡單算術，不是預測：華航自 2026 年 10 月起雪梨每日（7 班／週），假設每班座位等於 2025 年平均（約 308 席）、全年營運，約 112,200 席；星宇部分為 A330neo 297 席 × 每週班次 × 52 週（每週 4 班 61,776 席、5 班 77,220 席、每日 108,108 席）。實際班表與機型配置尚未公布。",
          en: "2019 and 2025 are BITRE actual seats (one-way). The scenarios are simple arithmetic, not forecasts: China Airlines lifts Sydney to daily (7 flights a week) from October 2026, assuming seats per flight equal to the 2025 average (about 308) and a full year of operation, about 112,200 seats; the STARLUX portion is A330neo 297 seats × weekly frequency × 52 weeks (4x weekly 61,776, 5x weekly 77,220, daily 108,108). The actual schedule and aircraft configuration haven't been published."
        }
      },
      boxes: [
        { type: "caution",
          title: { zh: "既有業者的動態：長榮退出、華航加碼", en: "What incumbents are doing: EVA exits, China Airlines doubles down" },
          body: { zh: "長榮的雪梨、墨爾本航線已經停飛，目前在澳洲只剩布里斯本一個航點（每週 3 班）——雪梨這條線現在等於是華航一家獨飛。華航自己也沒閒著：2026 年冬季班表把台北—雪梨從每週 5 班加到每日、墨爾本加到 5 班，還新增一班不經奧克蘭、直飛布里斯本的班次，全數換用 A350-900，生效日都落在星宇宣布進場（2026 年 6 月）之後。這可能代表市場成長快到連在位者都要加碼，也可能是防禦性卡位——兩種都有可能，現在還看不出來是哪一種。（資料來源：Wikipedia《List of EVA Air destinations》、AeroRoutes、2PAXfly）",
            en: "EVA Air has discontinued its Sydney and Melbourne routes, leaving only Brisbane in Australia (3x weekly) — so the Sydney route is now effectively a China Airlines monopoly. China Airlines itself hasn't been sitting still either: its Northern Winter 2026 schedule lifts Taipei–Sydney from 5x weekly to daily, adds a 5th weekly Melbourne flight, and adds a new Taipei–Brisbane nonstop that doesn't route via Auckland — all switching to A350-900 aircraft, with every change taking effect after STARLUX announced its entry (June 2026). This could mean the market is growing fast enough that even the incumbent needs more capacity, or it could be defensive positioning — both are plausible, and it's too early to say which. (Sources: Wikipedia, List of EVA Air destinations; AeroRoutes; 2PAXfly)" } },
        { type: "info",
          title: { zh: "載客率 88% 是強的正向訊號，但新運力即將進來，還不能說「位子不夠」", en: "An 88% load factor is a strong positive signal — but new capacity is about to arrive, so it isn't yet proof there 'aren't enough seats'" },
          body: { zh: "載客率高、座位比疫情前少，說明現有直飛供給確實被坐滿，但有三件事要小心。第一，這只算直飛；經香港（國泰航空）、新加坡（新加坡航空）轉機的間接選項分走多少人，BITRE 沒有資料——國泰雪梨—香港一條線就約每週 27 班，比星宇規劃的整條雪梨直飛還多好幾倍，詳細比較留給第八段。第二，高載客率不等於獲利，也沒有票價資料。第三，供給正在回來：上面的情境圖顯示，華航加到每日再加上星宇，雪梨直飛單向座位會超過 2019 年；要維持 80% 載客率，單向需要約 14–15 萬名旅客，是 2025 年（約 6.5–6.8 萬）的兩倍以上。這是簡單的情境算術，不是預測，但它說明真正的問題不是「現有座位夠不夠」，而是「新增座位能不能從轉機選項或成長中的需求裡吸收」。",
            en: "A high load factor on fewer seats than before the pandemic shows existing direct supply is genuinely being filled, but three cautions apply. First, this counts direct flights only; how many passengers the indirect options via Hong Kong (Cathay Pacific) or Singapore (Singapore Airlines) are siphoning off isn't in BITRE's data — Cathay's Sydney–Hong Kong route alone runs about 27 flights a week, several times STARLUX's entire planned Sydney service (more in the next section). Second, a high load factor isn't profit, and there's no fare data. Third, supply is coming back: the scenario chart above shows that with China Airlines at daily plus STARLUX, Sydney direct one-way seats would exceed 2019 levels; holding an 80% load factor would need about 140,000–150,000 passengers each way, more than double 2025's roughly 65,000–68,000. This is simple scenario arithmetic, not a forecast, but it shows the real question isn't whether existing seats are enough — it's whether the added seats can be absorbed from connecting alternatives or growing demand." } }
      ]
    },
    {
      id: "s8",
      kicker: { zh: "台北轉運站的算盤", en: "The math behind using Taipei as a hub" },
      headline: { zh: "雪梨飛台北，不只是賣給要去台灣的人", en: "Sydney–Taipei isn't just for people headed to Taiwan" },
      body: [
        { zh: "對星宇來說，這條航線不只靠「雪梨—台北」的旅客撐起來，還可以讓雪梨旅客經台北轉機到東京、首爾、東南亞等地，等於同一班飛機多賣一種票——雪梨機場官方公告也把星宇的價值描述成「銜接亞洲乃至更遠地方的台北轉機網路」。但台北不是唯一的轉運選項，最接近的對手是國泰航空的香港樞紐——兩者做的是同一種生意：拿一個城市當轉運中心，賣第六自由轉機客。",
          en: "For STARLUX, this route doesn't rely only on Sydney–Taipei traffic — it can also let Sydney passengers connect through Taipei to Tokyo, Seoul, Southeast Asia, and beyond, effectively selling a second kind of ticket on the same flight. Sydney Airport's own announcement described STARLUX's value in exactly these terms: connections through Taipei across Asia and beyond. But Taipei isn't the only transit option — the closest rival is Cathay Pacific's Hong Kong hub, running the same kind of business: using one city as a connecting point to sell sixth-freedom transfer traffic." }
      ],
      statGrid: [
        { n: "34", l: { zh: "星宇台北樞紐：國際航點數（13 個國家）", en: "STARLUX's Taipei hub: international destinations (13 countries)" } },
        { n: "81", l: { zh: "國泰香港樞紐：航點數（30 個國家）", en: "Cathay's Hong Kong hub: destinations (30 countries)" } },
        { n: { zh: "每週 4–5 班", en: "4–5x weekly" }, l: { zh: "星宇規劃的雪梨直飛頻率", en: "STARLUX's planned Sydney direct frequency" } },
        { n: { zh: "每週 ~27 班", en: "~27x weekly" }, l: { zh: "國泰現有的雪梨—香港頻率", en: "Cathay's existing Sydney–Hong Kong frequency" } }
      ],
      boxes: [
        { type: "caution",
          title: { zh: "台北樞紐 vs 香港樞紐：規模差距要老實講", en: "Taipei hub vs. Hong Kong hub: the scale gap, stated plainly" },
          body: { zh: "國泰的香港樞紐規模大約是星宇台北樞紐的 2.4 倍航點數、2.3 倍國家數；雪梨更是國泰在澳洲最熱門的航點（2026 Q1 從香港出發 351 班，領先墨爾本、伯斯、布里斯本），頻率是星宇規劃的好幾倍。而且香港—台北目前是國泰全公司運能最大的單一航線（雙向約 290 萬座位、年增 7%），代表台灣出發的旅客早就有成熟的「經香港轉機」習慣。這不代表星宇打不贏——精品定位、機型、服務都是差異化空間——但基期差距這麼大，樂觀敘事要收斂，不能只講「星宇多了一個轉運選項」，不提對手規模。",
            en: "Cathay's Hong Kong hub is roughly 2.4 times STARLUX's Taipei hub in destination count and 2.3 times in country count. Sydney is also Cathay's busiest Australian destination (351 departures from Hong Kong in Q1 2026, ahead of Melbourne, Perth, and Brisbane), at a frequency several times STARLUX's planned schedule. And Hong Kong–Taipei is currently Cathay's single largest route company-wide (roughly 2.9 million two-way seats, up 7% year-on-year) — meaning Taiwan-origin travelers already have a well-established habit of connecting via Hong Kong. None of this means STARLUX can't compete — boutique positioning, aircraft, and service are all real differentiators — but with a gap this large, the optimistic version of this story needs to stay in check rather than presenting 'Taipei as a hub' as if it had no serious rival." } },
        { type: "caution",
          title: { zh: "經台北轉去北美、歐洲，這段要保守看待", en: "Connecting via Taipei to North America or Europe — treat this cautiously" },
          body: { zh: "經台北轉機通常會增加轉機次數與總飛行時間，跟直飛比競爭力如何，必須實際比較時間、票價才能判斷——目前沒有這些實測資料，不能只靠星宇自己的說法就認定「打得贏」。",
            en: "Routing through Taipei usually adds a connection and total travel time, so how competitive it really is against direct flights needs an actual comparison of time and fares — no such data exists yet, so this can't be judged a win just from STARLUX's own claims." } },
        { type: "info",
          title: { zh: "紐西蘭來台的 1.8 萬人次，不能拿來推算雪梨—奧克蘭市場", en: "New Zealand's 18,000 visitors to Taiwan can't be used to size the Sydney–Auckland market" },
          body: { zh: "這個數字量的是「紐西蘭→台灣」的旅客流量，跟雪梨—奧克蘭這段跨塔斯曼航線的市場大小是兩件事。真正要查的是澳洲官方的雪梨—奧克蘭城市對客運資料，目前還沒查到，列入待查清單。",
            en: "That figure measures the New Zealand-to-Taiwan visitor flow — a completely different thing from the size of the Sydney–Auckland Trans-Tasman market. What's actually needed is Australia's official Sydney–Auckland city-pair passenger data, which hasn't been found yet and is on the to-check list." } }
      ]
    },
    {
      id: "s9",
      kicker: { zh: "為什麼是現在", en: "Why now" },
      headline: { zh: "三個訊號，剛好在這個時間點疊在一起", en: "Three signals happen to stack up at the same moment" },
      body: [
        { zh: "機隊擴充、政府補助窗口、實際招募動作——這三件事各自獨立發生，時間點卻高度重疊。時間點吻合不等於因果關係已經被證實，但值得放在一起看。",
          en: "Fleet expansion, a government grant window, and actual hiring activity — three things that each happened independently, yet whose timing overlaps heavily. Timing lining up doesn't prove causation, but it's worth looking at together." }
      ],
      timeline: [
        { date: "2018 / 2020", title: { zh: "星宇成立、首航", en: "STARLUX founded, first flight" }, body: { zh: "機隊逐步納入 A321neo、A330neo、A350-900／-1000。", en: "Fleet gradually added A321neo, A330neo, and A350-900/-1000 aircraft." }, dim: true },
        { date: { zh: "2025 年底", en: "End of 2025" }, title: { zh: "機隊實際 29 架，2026 目標 43 架", en: "Fleet at 29 aircraft, targeting 43 by end of 2026" }, body: { zh: "高層曾提到「飛機不夠，所以先挑兩三個新航點」，雪梨被選進這批名單本身就是訊號。", en: "Executives have said the airline doesn't have enough aircraft yet, so it's picking two or three new destinations first — Sydney making that list is itself a signal." } },
        { date: "2025/11–12", title: { zh: "NSW Take-Off Fund 開放申請", en: "NSW Take-Off Fund opens for applications" }, body: { zh: "台灣列優先市場，新航線須每週至少 3 班、2027/6/30 前開航。", en: "Taiwan named a priority market; new routes must fly at least 3x weekly and start before June 30, 2027." } },
        { date: "2026/06/02", title: { zh: "雪梨機場官方宣布星宇進駐", en: "Sydney Airport officially announces STARLUX" }, body: { zh: "雪梨為星宇第一個澳洲航點，之後延伸奧克蘭。", en: "Sydney is STARLUX's first Australian destination, with an extension to Auckland to follow." } },
        { date: "2026/09", title: { zh: "SEEK 上出現四個雪梨職缺", en: "Four Sydney job listings appear on SEEK" }, body: { zh: "分公司總經理、人資經理、機場站長、貨運經理——職缺文字寫明已成立澳洲分公司。", en: "Branch general manager, HR manager, station manager, cargo manager — the listings state an Australian branch office is already set up." } },
        { date: "2027", title: { zh: "計畫開航，正式班表尚未公布", en: "Planned launch — no official schedule yet" }, body: { zh: "每週 4–5 班起步，逐步加到每天一班（目前為高層受訪說法，非正式時刻表）。", en: "Starting at 4–5 flights a week, building up to daily (currently only executive interview statements, not a formal timetable)." }, dim: true }
      ],
      chart: {
        type: "stacked", id: "ch9-fleet",
        title: { zh: "星宇的機隊規模，2025 → 2026", en: "STARLUX fleet size, 2025 → 2026" },
        data: CH9_FLEET,
        sourceNote: { zh: "資料來源：星宇航空 2025 年度年報", en: "Source: STARLUX Airlines 2025 Annual Report" }
      }
    },
    {
      id: "s10",
      kicker: { zh: "這筆生意划算嗎", en: "Does the math actually work" },
      headline: { zh: "收入可能來自四塊，但成本完全是空白", en: "Revenue could come from four pillars, but costs are a total blank" },
      body: [
        { zh: "這條航線的收入可能來自下面四塊，能不能成立要看它們能不能一起撐起營收，加上成本與競爭條件——不是單靠「台灣觀光客多不多」就能回答的問題。其中雪梨—奧克蘭尚無政府文件、貨運目前的數字偏小，只能算潛在來源。",
          en: "Revenue for this route could come from the four streams below; whether it works out depends on whether they can support it together, plus costs and competitive conditions — it isn't a question 'how many Taiwanese tourists are there' alone can answer. Of these, Sydney–Auckland has no government document yet and cargo's current numbers are small, so both count only as potential sources." }
      ],
      pillars: [
        { title: { zh: "台北—雪梨直飛客", en: "Taipei–Sydney direct traffic" }, body: { zh: "台灣端度假需求是重要基本盤；商務出差占比僅 2%，實際商務艙需求仍需票價資料驗證。", en: "Taiwan-side holiday demand is the core base; business travel is only 2%, so real business-class demand still needs fare data to confirm." } },
        { title: { zh: "經台北轉亞洲", en: "Connecting via Taipei to Asia" }, body: { zh: "賣給澳洲出發、要去日本、韓國、東南亞的旅客，擴大可銷售市場。", en: "Selling to Australia-origin passengers headed to Japan, Korea, or Southeast Asia — expanding the sellable market." } },
        { title: { zh: "雪梨—奧克蘭", en: "Sydney–Auckland" }, body: { zh: "公司規劃跨塔斯曼段獨立販售，但第五航權尚無政府文件確認，目前只算潛在來源。", en: "The company plans to sell the trans-Tasman leg separately, but fifth-freedom approval has no government document yet, so it counts only as a potential source." } },
        { title: { zh: "貨運", en: "Cargo" }, body: { zh: "已設貨運經理職位，但這只是籌備跡象。BITRE 顯示台澳貨量不大、雪梨最少（2025 年 3,621 噸），目前只算可能的額外收入，尚待證明。", en: "A cargo manager role is already in place, but that is only a sign of preparation. BITRE shows Taiwan–Australia freight is modest and Sydney carries the least (3,621 tonnes in 2025), so cargo counts only as a possible extra revenue source, still to be proven." } }
      ],
      boxes: [
        { type: "caution",
          title: { zh: "星宇今年上半年由盈轉虧，華航同期仍賺錢", en: "STARLUX swung to a loss this H1, while China Airlines stayed profitable" },
          body: { zh: "星宇 2026 上半年營收 285.53 億元創同期新高，但稅後轉虧 3.46 億元（EPS -0.11 元）——主因第二季燃油價格受美伊地緣政治衝突影響大漲 124%，而星宇目前沒有專屬貨機、貨運仰賴客機腹艙，對油價波動相對敏感。同期華航營收、獲利都創同期新高（淨利 65.82 億元、EPS 1.08 元）。這不是雪梨航線本身的成本，但可以合理推論：星宇是在公司財務體質相對脆弱的階段，規劃這條長程新航線。（資料來源：經濟日報、工商時報、華航法人說明會）",
            en: "STARLUX's H1 2026 revenue hit NT$28.55 billion, a record for the period, but it posted a net loss after tax of NT$346 million (EPS -NT$0.11) — mainly because Q2 fuel prices spiked 124% amid the US–Iran geopolitical conflict, and STARLUX has no dedicated freighter fleet, relying on belly cargo, which makes it more exposed to fuel-price swings. China Airlines, over the same period, posted record revenue and profit (net profit NT$6.58 billion, EPS NT$1.08). This isn't the Sydney route's own cost, but it reasonably supports one conclusion: STARLUX is planning this long-haul new route while its overall financial footing is relatively weaker than the incumbent's. (Sources: Economic Daily News, Commercial Times, China Airlines investor briefing)" } }
      ],
      riskList: [
        { pill: "evidenced", text: { zh: "台灣端商務出差旅客占比僅 2%", en: "Business travel makes up only 2% of Taiwan-side visitors" } },
        { pill: "evidenced", text: { zh: "華航已在星宇宣布進場後把雪梨加到每日、墨爾本加班——是市場成長還是防禦性卡位，尚無法判定", en: "China Airlines has already added Sydney to daily and boosted Melbourne frequency since STARLUX's announcement — whether that's market growth or defensive positioning can't yet be determined" } },
        { pill: "evidenced", text: { zh: "星宇 2026 上半年因燃油成本大漲由盈轉虧（EPS -0.11 元），同期華航仍獲利（EPS 1.08 元）——公司整體數字，非雪梨航線專屬", en: "STARLUX swung to a loss in H1 2026 on surging fuel costs (EPS -NT$0.11), while China Airlines stayed profitable over the same period (EPS NT$1.08) — company-wide figures, not specific to the Sydney route" } },
        { pill: "inference", text: { zh: "經台北轉飛東京的時間、票價，是否真的比直飛有競爭力，尚待驗證", en: "Whether connecting via Taipei to Tokyo is actually competitive on time and fare versus flying direct is still unverified" } },
        { pill: "official", text: { zh: "雪梨—奧克蘭段的第五航權，目前只有公司說法，沒有政府正式文件", en: "Fifth-freedom rights for the Sydney–Auckland leg currently rest only on company statements, with no formal government document" } },
        { pill: "official", text: { zh: "正式班表與開航日期尚未公布，4–5 班為高層受訪說法", en: "No official schedule or launch date has been published yet; 4–5 weekly flights is only an executive interview statement" } },
        { pill: "gap", text: { zh: "台澳空運貨物種類與星宇可售貨艙沒有公開數據；BITRE 噸數顯示貨量不大、雪梨最少，貨運目前只能算潛在來源", en: "Taiwan–Australia air cargo commodity mix and STARLUX's sellable hold capacity have no public data; BITRE tonnage shows freight is modest and Sydney carries the least, so cargo counts only as a potential source" } },
        { pill: "gap", text: { zh: "雪梨航線本身的逐航線成本（燃油分攤、機組、機場費等）完全沒有資料——這是最大的盲區", en: "The Sydney route's own per-route costs (fuel allocation, crew, airport fees, etc.) have no data at all — this is the biggest blind spot" } },
        { pill: "inference", text: { zh: "新增運力能否扛住國泰、華航的競爭反應，這不是缺資料的問題，而是要等星宇實際開航、營運一段時間後才會知道", en: "Whether the added capacity can withstand Cathay Pacific's and China Airlines' competitive response isn't a data-gap problem — it's something only knowable once STARLUX is actually flying and has been operating for a while" } },
        { pill: "inference", text: { zh: "澳洲移民改革（2026-09-17 公告）：打工度假第二、三年名額大砍，加上所有新觀光簽證禁止境內轉簽（堵住 visa hopping），兩者都指向同一個方向——壓縮長天數旅客的停留意願與運量貢獻，但對這條航線需求的實際量化衝擊仍是推論，且政策不是針對台灣", en: "Australia's migration overhaul (announced 2026-09-17): sharp cuts to second- and third-year working holiday places, plus a ban on onshore visa conversion for all new visitor visas (closing the 'visa hopping' path) — both point the same way, toward less traffic from long-stay travelers, but the actual quantified impact on this route's demand is still an inference, and the policy isn't targeted at Taiwan" } }
      ]
    }
  ];

  var CONCLUSION_STEPS = [
    { title: { zh: "台灣和澳洲的「經濟走廊」存在嗎？", en: "Does a Taiwan–Australia 'economic corridor' actually exist?" },
      body: { zh: "現有資料支持存在——不只是觀光客數字，旅客成長、消費金額、雙邊貿易、雙向投資與留學生同時存在、方向一致。但這不代表星宇這條航線的商業邏輯一定成立，這是整份報告最重要的分界線。",
        en: "The available evidence supports that it does — not just tourist numbers, but traveler growth, spending, bilateral trade, two-way investment, and student flows all point the same direction at once. But that doesn't mean STARLUX's route makes commercial sense — that's the most important dividing line in this whole report." } },
    { title: { zh: "新增運力有市場空間嗎？", en: "Is there market room for added capacity?" },
      body: { zh: "部分證據支持——直飛座位比疫情前少、載客率回升到 88%（BITRE，FY25/26）是正向訊號，但這只算直飛，而且華航加班與星宇進場後，雪梨直飛座位會超過 2019 年水準，空間有多大要看能否吸收轉機客與新增需求。而「星宇能不能扛住國泰（經香港轉機亞洲）與華航（雪梨加班）的競爭反應」是另一個層次的問題：這不是補資料就能算出來的，要等星宇實際開航、營運一段時間後才會知道。",
        en: "Partly supported — direct seats below pre-pandemic levels and a load factor back up to 88% (BITRE, FY25/26) are positive signals, but they count direct flights only, and once China Airlines adds frequencies and STARLUX enters, Sydney direct seats would exceed 2019 levels — so how much room there is depends on absorbing connecting passengers and new demand. Separately, whether STARLUX can actually withstand competitive responses from Cathay Pacific (via its Hong Kong connecting hub) and China Airlines (added Sydney frequency) is a different kind of question — not one more data can answer, but one that will only be knowable once STARLUX is actually flying and has been operating for a while." } },
    { title: { zh: "星宇的商業邏輯站得住腳嗎？", en: "Does STARLUX's business logic hold up?" },
      body: { zh: "目前證據還不足以下定論。最大的缺口是正式班表尚未公布，以及完全沒有航線成本資料——這兩塊補齊之前，只能說「訊號一致」，還不能說「一定會成功」。",
        en: "Not enough evidence yet to conclude either way. The biggest gaps are the still-unpublished official schedule and the complete absence of route cost data — until those are filled in, the most honest statement is 'the signals line up,' not 'this will succeed.'" } }
  ];

  var AUTHOR_NOTE = {
    zh: "星宇開這條新航線，對台灣旅客是一大福音——度假、回鄉多一個選擇，對澳洲旅客也是多一個選擇。對星宇來說，這是拓點的正向開始，但也要面對國泰、華航既有班次的競爭，撐不撐得住，得等 2027 年 6 月底前後實際開航，看星宇怎麼經營、怎麼摸清當地市場，能不能真的讓台灣旅客願意選它飛過去。我個人期待星宇能在這條線站穩，之後拓展更多澳洲航點，讓台灣旅客有更多選擇。",
    en: "STARLUX launching this new route is good news for Taiwanese travelers — one more option for both holidays and visiting family, and one more option for Australian travelers too. For STARLUX, it's a positive step in its expansion, but it'll also face competition from Cathay Pacific's and China Airlines' existing schedules. Whether it can hold up won't be clear until the route actually launches around the end of June 2027 — it'll come down to how STARLUX runs the route, how well it learns the local market, and whether it can actually get Taiwanese travelers to choose it. Personally, I hope STARLUX gets a solid footing on this route and goes on to add more Australian destinations, giving Taiwanese travelers even more choices."
  };

  var AUTHOR_NOTE_PROCESS = {
    zh: "做這份報告，也是我找回好久沒用的資料分析技能的機會。用 Codex 跟 Claude 查資料真的方便很多，能快速看到更多資訊，但也更考驗自己判斷什麼才值得關注。第一次這樣嘗試，體驗很好，期待下次找到有趣的議題，繼續研究、繼續分享 :D",
    en: "Making this report was also a chance for me to dust off data-analysis skills I hadn't used in a while. Using Codex and Claude to dig up data made things much easier and let me see far more information, fast — but it also meant working harder to judge what actually mattered. First time trying this, and it was a great experience. Looking forward to finding another interesting topic next time — more research, more sharing :D"
  };

  var SOURCES = [
    { title: "Tourism Research Australia — Taiwan Visitor Economy Profile 2025", url: "https://www.tra.gov.au/content/dam/austrade-assets/global/wip/tra/documents/market-profiles/tra-market-profiles-taiwan-2025.pdf" },
    { title: { zh: "交通部觀光署《觀光統計資料庫》", en: "Taiwan Tourism Administration — Tourism Statistics Database" }, url: "https://stat.taiwan.net.tw/inboundSearch" },
    { title: { zh: "澳洲 BITRE — International airline activity 時間序列（貨運量、直飛旅客與座位，截至 2026 年 6 月）", en: "Australia's BITRE — International airline activity time series (freight, direct-flight passengers and seats, to June 2026)" }, url: "https://www.bitre.gov.au/publications/ongoing/international_airline_activity-time_series" },
    { title: { zh: "交通部觀光署《來臺旅客消費及動向調查》", en: "Taiwan Tourism Administration — Visitor Expenditure and Trends Survey" }, url: "https://admin.taiwan.net.tw/fapi/AttFile?id=41764&type=NewsAttFile" },
    { title: "DFAT — Australia-Taiwan relationship", url: "https://www.dfat.gov.au/geo/taiwan/australia-taiwan-relationship" },
    { title: "Destination NSW — Take-Off Fund", url: "https://www.destinationnsw.com.au/destination-nsw-business-support/grants-and-funding/take-off-fund-2025" },
    { title: "Destination NSW — Sydney / International statistics", url: "https://www.destinationnsw.com.au/insights/sydney-statistics" },
    { title: { zh: "Sydney Airport — 新聞稿與營運報告", en: "Sydney Airport — press releases and operational reports" }, url: "https://www.sydneyairport.com.au/corporate/media/corporate-newsroom/sydney-airport-lands-starlux-airlines" },
    { title: { zh: "澳洲基礎建設部 — Growth Potential for Foreign Airlines, NS26", en: "Australian Department of Infrastructure — Growth Potential for Foreign Airlines, NS26" }, url: "https://www.infrastructure.gov.au/sites/default/files/documents/ns26-growth-potential-foreign-airlines.pdf" },
    { title: { zh: "澳洲基礎建設部 — Sydney Airport slot 與需求管理", en: "Australian Department of Infrastructure — Sydney Airport slot and demand management" }, url: "https://www.infrastructure.gov.au/infrastructure-transport-vehicles/aviation/airports/demand-management-sydney-airport" },
    { title: { zh: "紐西蘭 Ministry of Transport — 航空協議與執照", en: "New Zealand Ministry of Transport — air services agreements and licences" }, url: "https://www.transport.govt.nz/about-us/queries/new-zealands-air-services-agreements" },
    { title: { zh: "星宇航空 2025 年度年報", en: "STARLUX Airlines 2025 Annual Report" }, url: "https://webassets2.starlux-airlines.com/en-TW/Images/260508-%E6%98%9F%E5%AE%87%E8%88%AA%E7%A9%BA2025%E5%B9%B4%E5%BA%A6%E5%B9%B4%E5%A0%B1%28%E8%8B%B1%E6%96%87%E7%89%88%29-V2_tcm14-15751.pdf" },
    { title: { zh: "Executive Traveller — Starlux 相關報導", en: "Executive Traveller — STARLUX coverage" }, url: "https://www.executivetraveller.com/news/starlux-sydney-taipei-australia-taiwan-flights" },
    { title: { zh: "SEEK — Starlux Airlines 雪梨職缺", en: "SEEK — STARLUX Airlines Sydney job listings" }, url: "https://au.seek.com/Starlux-Airlines-jobs" },
    { title: { zh: "經濟部國際貿易署 — 台澳雙邊貿易", en: "Bureau of Foreign Trade, MOEA — Taiwan-Australia bilateral trade" }, url: "https://www.trade.gov.tw/english/Pages/Detail.aspx?nodeID=4639&pid=743482" },
    { title: "Wikipedia — List of EVA Air destinations", url: "https://en.wikipedia.org/wiki/List_of_EVA_Air_destinations" },
    { title: "AeroRoutes — China Airlines NW26 Australia Network Expansion", url: "https://www.aeroroutes.com/eng/260624-cinw26au" },
    { title: "AeroRoutes — EVA Air Brisbane Flight Number Changes From late-Oct 2026", url: "https://www.aeroroutes.com/eng/260901-brnw26bne" },
    { title: "2PAXfly — China Airlines: More flights to Australia from October 2026", url: "https://www.2paxfly.com/2026/06/29/china-airlines-more-flights-to-australia-from-october-2026/" },
    { title: { zh: "經濟日報 — 星宇財報：第2季受高油價衝擊轉虧，上半年EPS -0.11元", en: "Economic Daily News — STARLUX Q2 hit by high fuel prices, H1 EPS -NT$0.11" }, url: "https://money.udn.com/money/story/5710/9685160" },
    { title: { zh: "中華航空 2026年第二次法人說明會（2026-05-28）", en: "China Airlines investor briefing #2, 2026 (2026-05-28)" }, url: "https://mopsov.twse.com.tw/nas/STR/261020260528M001.pdf" },
    { title: { zh: "工商時報 — 華航上半年淨利65.82億元、EPS為1.08元", en: "Commercial Times — China Airlines H1 net profit NT$6.58b, EPS NT$1.08" }, url: "https://www.ctee.com.tw/news/20260807701596-430201" },
    { title: "ABS — Overseas Arrivals and Departures, Australia, July 2026", url: "https://www.abs.gov.au/statistics/industry/tourism-and-transport/overseas-arrivals-and-departures-australia/latest-release" },
    { title: { zh: "Air Service One — 國泰航空 2026 年從香港服務 81 個航點、30 個國家", en: "Air Service One — Cathay Pacific serves 81 destinations in 30 countries from Hong Kong in 2026" }, url: "https://airserviceone.com/cathay-pacific-serves-81-destinations-in-30-countries-from-hong-kong-in-2026/" },
    { title: { zh: "Simple Flying — 國泰航空 2026 年澳紐航班增加 12%", en: "Simple Flying — Cathay Pacific Adds 12% More Flights To Australia And New Zealand In 2026" }, url: "https://simpleflying.com/cathay-pacific-boosts-australia-new-zealand-flights/" },
    { title: { zh: "巡日旅行攝 — 星宇台中—札幌新航線開航促銷", en: "roundtripjp.com — STARLUX Taichung–Sapporo launch promotion" }, url: "https://roundtripjp.com/2026/07/01/fsa-sale-guide-30/" },
    { title: { zh: "星宇航空官方新聞稿 — 首條歐洲航線開賣，8月1日起直飛布拉格", en: "STARLUX Airlines official press release — first European route on sale, direct to Prague from Aug 1" }, url: "https://www.starlux-airlines.com/zh-Global/about-us/media-center/news/2026/20260225" },
    { title: { zh: "ABC News — Labor tightens visa rules as Tony Burke vows migration targets will be met（2026-09-17）", en: "ABC News — Labor tightens visa rules as Tony Burke vows migration targets will be met (2026-09-17)" }, url: "https://www.abc.net.au/news/2026-09-17/labor-immigration-crackdown-students-backpackers-overstay-visa/107164354" },
    { title: { zh: "ABC News — 聯邦政治直播：Tony Burke 公布移民政策（2026-09-17）", en: "ABC News — Federal politics live: government's migration policy unveiled by Tony Burke (2026-09-17)" }, url: "https://www.abc.net.au/news/2026-09-17/federal-politics-live-blog-sept-17/107161304" },
    { title: { zh: "solmigration.com — 打工度假簽證（417/462）2026 年 7 月起的變動", en: "solmigration.com — Working Holiday Visa (417/462) Changes From 1 July 2026" }, url: "https://www.solmigration.com/blog/australia-working-holiday-visa-417-462-changes/" }
  ];

  var PENDING = [
    { zh: "華航雪梨、墨爾本、布里斯本各航班精確座位數與艙位配置（A350-900 兩種艙位版本各用在哪條線）", en: "Exact seat counts and cabin configuration for China Airlines' Sydney, Melbourne, and Brisbane flights (which A350-900 cabin variant flies which route)" },
    { zh: "華航現有「台北—布里斯本—奧克蘭」掛班服務是否實際販售 BNE–AKL 在地客，能否作為星宇 SYD–AKL 規劃的對照案例", en: "Whether China Airlines' existing Taipei–Brisbane–Auckland tag flight actually sells local BNE–AKL traffic, and whether it can serve as a precedent for STARLUX's SYD–AKL plan" },
    { zh: "BITRE 只計直飛班機實際載客；經香港、新加坡等第三地轉機的台澳旅客，仍沒有城市對城市或票價資料", en: "BITRE counts only passengers actually carried on direct flights; Taiwan–Australia travelers connecting via Hong Kong, Singapore or other third cities still have no city-to-city or fare data" },
    { zh: "台澳空運貨物種類（BITRE 只有噸數）與 2026 年 7–8 月貨量（BITRE 最新到 6 月）", en: "Taiwan–Australia air cargo commodity mix (BITRE gives tonnes only) and July–August 2026 volumes (BITRE's latest data is June)" },
    { zh: "台紐之間對星宇雪梨—奧克蘭段的第五航權核准文件", en: "Taiwan–New Zealand fifth-freedom approval document for STARLUX's Sydney–Auckland leg" },
    { zh: "雪梨飛東京：直飛 vs 經台北 vs 經香港，同日期的時間與票價比較（需要抓即時訂票系統資料，非文獻查證）", en: "Sydney to Tokyo: direct vs. via Taipei vs. via Hong Kong — same-date time and fare comparison (needs live booking-system data, not a literature lookup)" },
    { zh: "星宇台北航網 34 航點、13 國家的數字目前只經搜尋引擎摘要確認，建議直接開星宇官網／Wikipedia 頁面交叉核對", en: "STARLUX's Taipei network figures (34 destinations, 13 countries) are currently confirmed only via a search-engine summary — worth cross-checking directly against STARLUX's own site or Wikipedia" },
    { zh: "星宇正式班表與開航日期公布後更新", en: "Update once STARLUX's official schedule and launch date are announced" },
    { zh: "雪梨航線本身的逐航線營運成本資料", en: "The Sydney route's own per-route operating cost data" },
    { zh: "《來臺旅客消費及動向調查》完整報告是否有澳洲、紐西蘭單獨的消費金額", en: "Whether the full Visitor Expenditure and Trends Survey report breaks out spending for Australia and New Zealand separately" },
    { zh: "雪梨線目前尚未見任何開航促銷公告或早鳥票開賣消息，待星宇正式公布班表後追蹤是否比照台中—札幌、布拉格兩案辦理", en: "No launch promotion or early-bird sale has been announced for the Sydney route yet — worth tracking once STARLUX publishes its official schedule to see whether it follows the Taichung–Sapporo and Prague pattern" },
    { zh: "打工度假簽證改革的官方公告全文（內政部長官網目前擋爬蟲），以及台灣籍申請人在這個簽證類別中的實際規模，才能評估對台澳航線需求的量級", en: "The full official announcement of the working holiday visa reform (the minister's site currently blocks crawlers), plus the actual scale of Taiwanese applicants in this visa category, to properly assess the magnitude of impact on Taiwan–Australia route demand" }
  ];

  var PILL_LABEL = {
    evidenced: { zh: "已有證據", en: "Evidenced" },
    inference: { zh: "推論待驗", en: "Inference, unverified" },
    official: { zh: "待官方確認", en: "Pending official confirmation" },
    gap: { zh: "待實際公布後確認", en: "Pending future disclosure" }
  };

  return {
    UI: UI,
    CH1_HISTORY: CH1_HISTORY,
    CH2_PURPOSE: CH2_PURPOSE,
    CH2_LENGTH: CH2_LENGTH,
    CH6_LOADFACTOR: CH6_LOADFACTOR,
    CH5_PORTS: CH5_PORTS,
    CH5_SYDNEY: CH5_SYDNEY,
    CH6_SCENARIO: CH6_SCENARIO,
    CH9_FLEET: CH9_FLEET,
    STORIES: STORIES,
    CONCLUSION_STEPS: CONCLUSION_STEPS,
    AUTHOR_NOTE: AUTHOR_NOTE,
    AUTHOR_NOTE_PROCESS: AUTHOR_NOTE_PROCESS,
    SOURCES: SOURCES,
    PENDING: PENDING,
    PILL_LABEL: PILL_LABEL
  };
})();
