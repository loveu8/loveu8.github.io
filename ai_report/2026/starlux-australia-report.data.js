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
      zh: "這份報告的推理方向，是從市場往回看星宇，不是從星宇的動作往前推理由。星宇自己的招募職缺、機隊擴充這類投入，代表的是星宇對市場的信心，不是市場本身的證據——信心可能判斷正確，也可能判斷錯誤。所以報告把旅客量、經貿基礎、法規空間、競爭對手、星宇自身財務體質這些市場條件當作主要證據，用來檢驗星宇的信心站不站得住腳，而不是反過來拿星宇的投入去證明市場一定夠大。",
      en: "This report reasons from the market back to STARLUX, not from STARLUX's own actions forward to a rationale. Things like STARLUX's hiring or fleet expansion represent STARLUX's own confidence in the market — not evidence of the market itself, since that confidence could turn out to be right or wrong. So this report treats market conditions — passenger volume, economic ties, regulatory room, competitors, and STARLUX's own financial health — as the primary evidence, used to test whether STARLUX's confidence holds up, rather than using STARLUX's own investment as proof the market must be big enough."
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
    categories: ["FY15/16", "FY16/17", "FY17/18", "FY18/19", "FY19/20", "FY20/21", "FY21/22", "FY22/23", "FY23/24", "FY24/25"],
    data: [81, 79, 76, 76, 73, 7, 16, 66, 76, 79]
  };

  var CH6_CAPACITY = [
    { label: { zh: "每週 4 班", en: "4x weekly" }, value: 61776 },
    { label: { zh: "每週 5 班", en: "5x weekly" }, value: 77220 },
    { label: { zh: "每日 1 班", en: "Daily" }, value: 108108 }
  ];

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
        { zh: "從下面這張圖也可以看出，澳洲居民來台已經超過 2019 疫情前高點約 12%，但紐西蘭居民還沒回到疫情前水準，落後約 8%——兩邊復甦的速度不一樣。",
          en: "As the chart below shows, Australia-resident visitors to Taiwan have already surpassed the 2019 pre-pandemic peak by about 12%, while New Zealand residents still haven't recovered to pre-pandemic levels — about 8% behind. The two are recovering at very different speeds." }
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
          zh: "資料來源：交通部觀光署《觀光統計資料庫》。這裡只能做「澳洲→台灣」方向的逐月比較，因為只有這個方向查得到完整月資料；反向「台灣→澳洲」（19.3 萬那個方向）目前只有 2026 年 7 月單月數字，沒有逐月資料可以比。",
          en: "Source: Taiwan Tourism Administration, Tourism Statistics Database. This monthly comparison is only possible for the Australia→Taiwan direction, since that's the only one with a complete monthly series. The reverse direction (Taiwan→Australia — the 193,000 figure above) currently has only a single July 2026 data point, with no month-by-month data to compare."
        }
      },
      boxes: [
        { type: "info",
          title: { zh: "1.5 倍，是不是代表回程班機是空的？", en: "Does the 1.5x ratio mean return flights fly empty?" },
          body: { zh: "不是。這個比例算的是「兩邊住在哪裡的人」各自出去玩了幾次，不是同一班飛機去程、回程各自賣了幾張票。大部分旅客自己買去程也買回程，兩個方向其實都各自貢獻了一張機票。真的要看哪個方向比較空，得查航空公司每個方向實際的載客率——這部分目前還查不到公開數據。",
            en: "No. This ratio measures how many trips residents on each side take — not how many seats are sold on the outbound versus return leg of the same flight. Most travelers buy both an outbound and a return ticket, so each direction gets its own segment either way. To actually see which direction runs emptier you'd need each airline's real load factor by direction, and that data isn't public yet." } },
        { type: "gold",
          title: { zh: "2026 上半年最新數字：成長似乎在放慢", en: "Latest H1 2026 numbers: growth looks like it's slowing" },
          body: { zh: "我實際去查了 2026 年 1–6 月的官方數字：住在澳洲、回台灣的旅客有 64,563 人次，比 2025 同期（63,024）只成長約 2.4%——比 2025 全年 +11.32% 慢了不少。反過來（台灣人去澳洲）目前只查到澳洲官方 2026 年 7 月單月數字：23,910 人次，比去年同月成長約 1%，也是放緩。這只是半年的快照，還不能斷定是短期波動還是趨勢真的轉彎，要再看接下來幾季的數字。（資料來源：交通部觀光署《觀光統計資料庫》、ABS 2026 年 7 月號）",
            en: "I actually pulled the official Jan–Jun 2026 figures: Australia-resident visitors to Taiwan came to 64,563 — only about 2.4% higher than the same period in 2025 (63,024), well below 2025's full-year +11.32%. In the other direction (Taiwan residents to Australia), the only figure available is Australia's official July 2026 monthly number — 23,910, up about 1% year-on-year, also a slowdown. This is only a half-year snapshot, so it's too early to tell whether it's a short-term wobble or a real trend change; it needs a few more quarters of data. (Sources: Taiwan Tourism Administration Tourism Statistics Database; ABS, July 2026 release)" } }
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
          title: { zh: "澳洲移民部長剛宣布兩項改革，都指向同一個方向：壓縮運量", en: "Australia's immigration minister just announced two changes pointing the same way: less traffic" },
          body: { zh: "澳洲移民部長 Tony Burke 在 2026 年 9 月 17 日（就在最近）宣布移民改革，有兩項都跟這條航線的運量直接相關。第一，打工度假簽證（417/462）第二年名額從 57,000 砍到 45,000（約 -21%），第三年從 31,000 砍到 5,000（約 -84%），並改成抽籤制，還要先完成 88 天（第二年）或 6 個月（第三年）偏鄉工作才有抽籤資格——直接打在「近三成旅客待一個月以上」這個長天數族群上，續簽名額大砍會讓部分旅客把停留拉長到數月甚至一年以上的意願下降。第二，所有新發出的觀光簽證一律加註「不得境內續留」，正面打擊「visa hopping」——過去旅客可以先用觀光簽證入境，再就地申請轉成打工度假、學生簽證等其他類別，把停留無限期延長而不用真的離境再入境；這條路現在被封死，代表想繼續留在澳洲的人必須先出境再重新申請，等於少了一種不用額外訂機票也能拉長停留的途徑。這兩項改變的方向一致：都讓「留久一點」變難，都可能壓縮長天數、高消費力旅客的運量貢獻。公告沒有特別提到台灣，台灣申請人適用一般規則，沒有豁免；第一年（初次入境）打工度假簽證名額本身沒被砍。（資料來源：ABC News 2026-09-17）",
            en: "Australia's immigration minister, Tony Burke, announced a migration overhaul on 17 September 2026 (just days ago), and two parts of it bear directly on this route's traffic. First, Working Holiday visa (417/462) second-year places were cut from 57,000 to 45,000 (about -21%) and third-year places from 31,000 to 5,000 (about -84%), moving to a ballot system that also requires 88 days (year 2) or 6 months (year 3) of regional work before you're even eligible to enter the ballot — a direct hit to this section's 'nearly 30% stay a month or more' long-stay segment, since a sharp cut to renewal places reasonably means fewer travelers extend their stay to several months or a year. Second, every newly issued visitor visa now carries a 'no further stay' condition, directly targeting 'visa hopping' — previously, a traveler could enter on a visitor visa and then apply onshore to convert to a working holiday or student visa, extending their stay indefinitely without ever actually leaving and re-entering. That path is now closed, meaning anyone wanting to stay longer must leave and re-apply from outside Australia — removing a way people used to extend their stay without booking another flight. Both changes point the same direction: staying longer just got harder, and both could dent the traffic contribution from long-stay, higher-spending travelers. The announcement made no specific mention of Taiwan, so Taiwanese applicants face the standard rules with no exemption, and first-year (initial) working holiday visa places weren't cut. (Source: ABC News, 2026-09-17)" } },
        { type: "info",
          title: { zh: "校準規模：67% 是純度假、來回機票早就買好，真正被打到的是一小部分", en: "Calibrating the scale: 67% are pure holidaymakers with round-trip tickets already booked — only a small slice is actually hit" },
          body: { zh: "要老實校準規模，不要看到政策就直接推論成「需求大跌」。台灣旅客有 <strong>67%</strong> 是純度假、本來就買好來回機票，這群人不太會用到打工度假或境內轉簽這兩條路，不受這次改革直接影響；真正被打到的是長天數、打工度假、境內轉簽這幾種身分交疊的族群，佔整體的一小部分。所以方向是需求會降低沒錯，但影響力道應該不會很巨大——政策本身已證實，方向也合理，但對台澳這條航線的實際運量衝擊多大，目前沒有航線層級數據可以量化，只能標成推論，不宜誇大成「重大衝擊」。",
            en: "To calibrate the scale honestly, a policy change shouldn't be read straight into 'demand will collapse.' <strong>67%</strong> of Taiwanese travelers are on a pure holiday trip and already fly on a round-trip ticket — they're unlikely to touch working holiday visas or onshore conversion, so this reform doesn't hit them directly. The people actually affected are the smaller slice at the intersection of long-stay, working holiday, and onshore-conversion status. So the direction is a real dip in demand, but the magnitude is unlikely to be large — the policy itself is confirmed and the logic holds, but there's no route-level data yet to quantify the actual impact on this route, so it stays an inference and shouldn't be overstated as a 'major shock.'" } }
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
      headline: { zh: "星宇同時在雪梨招貨運經理，這本身就是訊號", en: "STARLUX is hiring a cargo manager in Sydney too — that's a signal in itself" },
      body: [
        { zh: "星宇在雪梨機場的招募清單裡，除了分公司總經理、人資經理、機場站長，還有一個貨運經理，職務內容包含貨運銷售、倉儲與貨代關係——說明貨運從一開始就被規劃成航線收入的一部分。星宇 2025 年的貨運收入占公司總營收超過一成，且成長超過 <strong>50%</strong>，但這是公司整體數字，不是雪梨航線專屬的。",
          en: "Among STARLUX's Sydney hiring list — branch general manager, HR manager, station manager — there's also a cargo manager, covering cargo sales, warehousing, and freight-forwarder relationships, which shows cargo was built into the route's revenue plan from the start. STARLUX's cargo revenue made up over a tenth of total company revenue in 2025 and grew more than <strong>50%</strong> — though that's a company-wide figure, not specific to the Sydney route." }
      ],
      boxes: [
        { type: "gap",
          title: { zh: "老實說：這塊我們還沒有足夠數據", en: "Honestly: we don't have enough data here yet" },
          body: { zh: "台澳之間實際的空運貨量、貨物種類、飛機貨艙實際能載多少，這些都需要澳洲官方貨運統計、海關資料才能確認。目前這是明確的資料缺口，先誠實標記。",
            en: "How much air cargo actually moves between Taiwan and Australia, what kinds of goods, how much a hold can actually carry — all of this needs official Australian freight statistics and customs data to confirm. This is a clear data gap for now, flagged honestly rather than papered over." } }
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
      headline: { zh: "直飛座位供給收縮，載客率正在回升", en: "Direct-flight capacity has shrunk while load factor climbs back up" },
      body: [
        { zh: "這是整份報告的關鍵轉折。前面確認了需求存在、法規上也飛得成，這裡開始檢查「供給」接不接得住——如果現有的直飛班機已經很難再擠進更多人，新進者就有機會。台澳直飛航班的載客率，疫情前大約 76–81%，疫情期間幾乎掉到個位數，現在已經回升到 <strong>79%</strong>。星宇規劃用 A330neo（297 席）飛這條航線，每週先開 4 到 5 班，之後逐步加到每天一班。",
          en: "This is the pivotal turn in the whole report. Up to here we've confirmed demand exists and the regulatory path is clear — this is where we check whether existing supply can absorb it. If current direct flights are already nearly full, there's room for a new entrant. Taiwan–Australia direct load factor ran around 76–81% before the pandemic, collapsed to single digits during it, and has now climbed back to <strong>79%</strong>. STARLUX plans to fly this route with an A330neo (297 seats), starting at 4–5 flights a week and building up to daily." }
      ],
      chart: {
        type: "line", id: "ch6-loadfactor",
        title: { zh: "台澳直飛航班的載客率，近十年變化", en: "Taiwan–Australia direct load factor, past decade" },
        data: CH6_LOADFACTOR, colorVar: "--color-primary", suffix: "%",
        sourceNote: { zh: "資料來源：TRA《Taiwan Visitor Economy Profile 2025》，原始資料為澳洲 BITRE 航空統計", en: "Source: TRA, Taiwan Visitor Economy Profile 2025; underlying data from Australia's BITRE aviation statistics" }
      },
      chart2: {
        type: "bar", id: "ch6-capacity",
        title: { zh: "星宇雪梨航班，不同班次頻率一年能賣多少座位", en: "STARLUX Sydney route: annual sellable seats at different frequencies" },
        data: CH6_CAPACITY, colorVar: "--color-secondary",
        sourceNote: { zh: "單向（per direction）計算", en: "Calculated per direction (one-way)" }
      },
      boxes: [
        { type: "caution",
          title: { zh: "既有業者的動態：長榮退出、華航加碼", en: "What incumbents are doing: EVA exits, China Airlines doubles down" },
          body: { zh: "長榮的雪梨、墨爾本航線已經停飛，目前在澳洲只剩布里斯本一個航點（每週 3 班）——雪梨這條線現在等於是華航一家獨飛。華航自己也沒閒著：2026 年冬季班表把台北—雪梨從每週 5 班加到每日、墨爾本加到 5 班，還新增一班不經奧克蘭、直飛布里斯本的班次，全數換用 A350-900，生效日都落在星宇宣布進場（2026 年 6 月）之後。這可能代表市場成長快到連在位者都要加碼，也可能是防禦性卡位——兩種都有可能，現在還看不出來是哪一種。（資料來源：Wikipedia《List of EVA Air destinations》、AeroRoutes、2PAXfly）",
            en: "EVA Air has discontinued its Sydney and Melbourne routes, leaving only Brisbane in Australia (3x weekly) — so the Sydney route is now effectively a China Airlines monopoly. China Airlines itself hasn't been sitting still either: its Northern Winter 2026 schedule lifts Taipei–Sydney from 5x weekly to daily, adds a 5th weekly Melbourne flight, and adds a new Taipei–Brisbane nonstop that doesn't route via Auckland — all switching to A350-900 aircraft, with every change taking effect after STARLUX announced its entry (June 2026). This could mean the market is growing fast enough that even the incumbent needs more capacity, or it could be defensive positioning — both are plausible, and it's too early to say which. (Sources: Wikipedia, List of EVA Air destinations; AeroRoutes; 2PAXfly)" } },
        { type: "info",
          title: { zh: "79% 載客率，是正向訊號，還不足以說「位子不夠」", en: "79% load factor is a positive signal — not yet proof there 'aren't enough seats'" },
          body: { zh: "這是一個值得繼續查證的訊號，還不是定論。華航實際賣出多少座位、經香港（國泰航空）、新加坡（新加坡航空）轉機的間接選項又分走多少人，需要更細的官方航班數據才能精算——其中國泰的量級不小，雪梨—香港一條線就約每週 27 班，比星宇規劃的整條雪梨直飛還多好幾倍，詳細比較留給第八段。",
            en: "This is a signal worth watching, not a conclusion. How many seats China Airlines actually sells, and how many passengers the indirect options via Hong Kong (Cathay Pacific) or Singapore (Singapore Airlines) are siphoning off, both need finer official flight data to work out. Cathay in particular is no small player here — Sydney–Hong Kong alone runs about 27 flights a week, several times STARLUX's entire planned Sydney service; more on that comparison in the next section." } }
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
      headline: { zh: "收入靠四塊，但成本完全是空白", en: "Revenue rests on four pillars, but costs are a total blank" },
      body: [
        { zh: "這條航線能不能成立，取決於下面四塊收入能不能一起撐起營收，加上成本與競爭條件——不是單靠「台灣觀光客多不多」就能回答的問題。",
          en: "Whether this route works out depends on whether these four revenue streams can support it together, plus costs and competitive conditions — it isn't a question 'how many Taiwanese tourists are there' alone can answer." }
      ],
      pillars: [
        { title: { zh: "台北—雪梨直飛客", en: "Taipei–Sydney direct traffic" }, body: { zh: "台灣端度假需求是重要基本盤；商務出差占比僅 2%，實際商務艙需求仍需票價資料驗證。", en: "Taiwan-side holiday demand is the core base; business travel is only 2%, so real business-class demand still needs fare data to confirm." } },
        { title: { zh: "經台北轉亞洲", en: "Connecting via Taipei to Asia" }, body: { zh: "賣給澳洲出發、要去日本、韓國、東南亞的旅客，擴大可銷售市場。", en: "Selling to Australia-origin passengers headed to Japan, Korea, or Southeast Asia — expanding the sellable market." } },
        { title: { zh: "雪梨—奧克蘭", en: "Sydney–Auckland" }, body: { zh: "跨塔斯曼段獨立販售，但第五航權是否核准仍待確認。", en: "Planned to be sold as a separate leg across the Tasman, but fifth-freedom approval is still unconfirmed." } },
        { title: { zh: "貨運", en: "Cargo" }, body: { zh: "已設貨運經理職位，但實際貨量與貨艙運用尚無公開數據。", en: "A cargo manager role is already in place, but actual cargo volume and hold utilization have no public data yet." } }
      ],
      boxes: [
        { type: "caution",
          title: { zh: "星宇今年上半年由盈轉虧，華航同期仍賺錢", en: "STARLUX swung to a loss this H1, while China Airlines stayed profitable" },
          body: { zh: "星宇 2026 上半年營收 285.53 億元創同期新高，但稅後轉虧 3.46 億元（EPS -0.11 元）——主因第二季燃油價格受美伊地緣政治衝突影響大漲 124%，而星宇目前沒有專屬貨機、貨運仰賴客機腹艙，對油價波動相對敏感。同期華航營收、獲利都創同期新高（淨利 65.82 億元、EPS 1.08 元）。這不是雪梨航線本身的成本，但可以合理推論：星宇是在公司財務體質相對脆弱的階段，規劃這條長程新航線。（資料來源：經濟日報、工商時報、華航法人說明會）",
            en: "STARLUX's H1 2026 revenue hit NT$28.55 billion, a record for the period, but it posted a net loss after tax of NT$346 million (EPS -NT$0.11) — mainly because Q2 fuel prices spiked 124% amid the US–Iran geopolitical conflict, and STARLUX has no dedicated freighter fleet, relying on belly cargo, which makes it more exposed to fuel-price swings. China Airlines, over the same period, posted record revenue and profit (net profit NT$6.58 billion, EPS NT$1.08). This isn't the Sydney route's own cost, but it reasonably supports one conclusion: STARLUX is planning this long-haul new route while its overall financial footing is relatively weaker than the incumbent's. (Sources: Economic Daily News, Commercial Times, China Airlines investor briefing)" } },
        { type: "info",
          title: { zh: "星宇有開航促銷的先例，雪梨線很可能比照辦理", en: "STARLUX has a track record of launch promotions — Sydney will likely see the same" },
          body: { zh: "星宇開新航線時習慣用促銷衝早期載客率：台中—札幌線（2026-10-02 開航）來回含稅 NT$23,337 起、含 23kg 託運行李；布拉格線（2026-08-01 開航，星宇首條長程歐洲線）2/25 上午 10 點準時開賣早鳥票，來回約 NT$3.1 萬，促銷集中在淡季月份。一短程一長程都用同一套模式，可以合理推論雪梨線開航時也會有類似促銷。但要說清楚邊界：這兩個先例都是點對點票價，不是轉機票；「促銷會延伸到經台北轉機到第三國的票價，藉此衝轉機量」這一段目前沒有直接證據，是延續 hub 轉機邏輯的推論，星宇也尚未公布任何雪梨線的促銷或開賣消息。（資料來源：巡日旅行攝、星宇航空官方新聞稿）",
            en: "STARLUX has a habit of using promotions to build early load factor on new routes: the Taichung–Sapporo route (launching 2026-10-02) offered round-trip fares from NT$23,337 including tax and 23kg checked baggage; the Prague route (launching 2026-08-01, STARLUX's first long-haul European route) opened early-bird sales at exactly 10:00 on Feb 25, with round-trip fares around NT$31,000, concentrated in shoulder-season months. One short-haul and one long-haul route both followed the same pattern, so it's reasonable to infer Sydney will see something similar at launch. But the boundary needs to be stated clearly: both precedents were point-to-point fares, not connecting fares — the idea that 'the promotion will extend to connecting fares via Taipei to boost transfer volume' has no direct evidence behind it; it's an inference that follows from the hub-connectivity logic elsewhere in this report, and STARLUX hasn't announced any Sydney-route promotion or sale date yet. (Sources: roundtripjp.com, STARLUX Airlines official press release)" } }
      ],
      riskList: [
        { pill: "evidenced", text: { zh: "台灣端與澳洲端旅客流量不對稱，約 1.5 : 1（提醒：這不等於航班方向失衡）", en: "Traveler flow between Taiwan and Australia is asymmetric, roughly 1.5:1 (reminder: this doesn't mean flights are imbalanced by direction)" } },
        { pill: "evidenced", text: { zh: "台灣端商務出差旅客占比僅 2%", en: "Business travel makes up only 2% of Taiwan-side visitors" } },
        { pill: "evidenced", text: { zh: "華航已在星宇宣布進場後把雪梨加到每日、墨爾本加班——是市場成長還是防禦性卡位，尚無法判定", en: "China Airlines has already added Sydney to daily and boosted Melbourne frequency since STARLUX's announcement — whether that's market growth or defensive positioning can't yet be determined" } },
        { pill: "evidenced", text: { zh: "星宇 2026 上半年因燃油成本大漲由盈轉虧（EPS -0.11 元），同期華航仍獲利（EPS 1.08 元）——公司整體數字，非雪梨航線專屬", en: "STARLUX swung to a loss in H1 2026 on surging fuel costs (EPS -NT$0.11), while China Airlines stayed profitable over the same period (EPS NT$1.08) — company-wide figures, not specific to the Sydney route" } },
        { pill: "inference", text: { zh: "經台北轉飛東京的時間、票價，是否真的比直飛有競爭力，尚待驗證", en: "Whether connecting via Taipei to Tokyo is actually competitive on time and fare versus flying direct is still unverified" } },
        { pill: "official", text: { zh: "雪梨—奧克蘭段的第五航權，目前只有公司說法，沒有政府正式文件", en: "Fifth-freedom rights for the Sydney–Auckland leg currently rest only on company statements, with no formal government document" } },
        { pill: "official", text: { zh: "正式班表與開航日期尚未公布，4–5 班為高層受訪說法", en: "No official schedule or launch date has been published yet; 4–5 weekly flights is only an executive interview statement" } },
        { pill: "gap", text: { zh: "台澳實際空運貨量與貨物種類，目前沒有公開數據", en: "Actual Taiwan–Australia air cargo volume and commodity mix have no public data yet" } },
        { pill: "gap", text: { zh: "雪梨航線本身的逐航線成本（燃油分攤、機組、機場費等）完全沒有資料——這是最大的盲區", en: "The Sydney route's own per-route costs (fuel allocation, crew, airport fees, etc.) have no data at all — this is the biggest blind spot" } },
        { pill: "inference", text: { zh: "星宇有開航促銷先例（台中—札幌、布拉格），雪梨線很可能比照辦理；但促銷會延伸到經台北轉機的票價，目前只是推論，不是已證實", en: "STARLUX has launch-promotion precedents (Taichung–Sapporo, Prague) and Sydney will likely see similar; but the idea that promotions extend to connecting fares via Taipei is still an unverified inference, not a confirmed fact" } },
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
      body: { zh: "部分證據支持——直飛供給收縮、載客率回升是正向訊號，但還缺實際航班座位與載客數的第一手數據來確認空間有多大。而「星宇能不能扛住國泰（經香港轉機亞洲）與華航（雪梨加班）的競爭反應」是另一個層次的問題：這不是補資料就能算出來的，要等星宇實際開航、營運一段時間後才會知道。",
        en: "Partly supported — shrinking direct supply and a rebounding load factor are positive signals, but confirming how much room there really is still needs first-hand data on actual seat and passenger numbers. Separately, whether STARLUX can actually withstand competitive responses from Cathay Pacific (via its Hong Kong connecting hub) and China Airlines (added Sydney frequency) is a different kind of question — not one more data can answer, but one that will only be knowable once STARLUX is actually flying and has been operating for a while." } },
    { title: { zh: "星宇的商業邏輯站得住腳嗎？", en: "Does STARLUX's business logic hold up?" },
      body: { zh: "目前證據還不足以下定論。最大的缺口是正式班表尚未公布，以及完全沒有航線成本資料——這兩塊補齊之前，只能說「訊號一致」，還不能說「一定會成功」。",
        en: "Not enough evidence yet to conclude either way. The biggest gaps are the still-unpublished official schedule and the complete absence of route cost data — until those are filled in, the most honest statement is 'the signals line up,' not 'this will succeed.'" } }
  ];

  var AUTHOR_NOTE = {
    zh: "綜合以上這些因素，星宇開這條新航線，對台灣旅客來說是一大福音——讓度假和返鄉多了一個新選擇；對澳洲旅客來說，也是多了一個選擇的機會。對星宇持續拓展新航點而言，這是一個正向的開始。當然，星宇也會面臨國泰航空、華航既有班次的競爭，新增的運量扛不扛得住，要等 2027 年 6 月底前後實際開航，看星宇怎麼經營、怎麼摸清當地市場，以及能不能真正刺激台灣旅客願意選擇星宇飛過去——這些都是接下來值得關注的重點。我個人期待星宇能在這條航線站穩腳步，未來拓展更多澳洲航點，讓台灣旅客有更多選擇的機會。",
    en: "Taken together, STARLUX launching this new route is genuinely good news for Taiwanese travelers — it adds a new option for both holidays and visiting family back home, and it also gives Australian travelers another choice. For STARLUX itself, as it keeps expanding to new destinations, this is a positive start. Of course, it will also face competition from Cathay Pacific's and China Airlines' existing schedules — whether the added capacity can hold up will only become clear once the route is actually flying around the end of June 2027, and will depend on how STARLUX runs the route, how well it learns the local market, and whether it can actually persuade Taiwanese travelers to choose STARLUX for their trip. Those are the things worth watching next. Personally, I hope STARLUX can establish itself on this route and go on to add more Australian destinations, giving Taiwanese travelers even more choices."
  };

  var AUTHOR_NOTE_PROCESS = {
    zh: "做這份報告，對我來說也是找回好久沒用的資料分析技能的機會。透過 Codex 和 Claude 做這些數據調查，真的方便許多，能快速看到更多資訊；但相對地，也更需要自己判斷哪些才是真正值得關注的重點。這是我第一次這樣嘗試，得到很好的體驗，期待下一次還能找到有趣的議題，繼續研究、繼續分享 :D",
    en: "Making this report was also a chance for me to dust off data-analysis skills I hadn't used in a long time. Doing this research with Codex and Claude made things a lot easier — I could pull in far more information, much faster — but that also meant I had to work harder at judging what actually deserved attention. This was my first time trying something like this, and it was a great experience. Looking forward to finding another interesting topic to dig into and share next time :D"
  };

  var SOURCES = [
    { title: "Tourism Research Australia — Taiwan Visitor Economy Profile 2025", url: "https://www.tra.gov.au/content/dam/austrade-assets/global/wip/tra/documents/market-profiles/tra-market-profiles-taiwan-2025.pdf" },
    { title: { zh: "交通部觀光署《觀光統計資料庫》", en: "Taiwan Tourism Administration — Tourism Statistics Database" }, url: "https://stat.taiwan.net.tw/inboundSearch" },
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
    { zh: "澳洲官方台澳直飛旅客數、按方向的城市對資料", en: "Official Australian Taiwan–Australia direct passenger numbers, by direction, city-pair data" },
    { zh: "澳洲官方台澳空運貨量與貨物種類", en: "Official Australian data on Taiwan–Australia air cargo volume and commodity types" },
    { zh: "台紐之間對星宇雪梨—奧克蘭段的第五航權核准文件", en: "Taiwan–New Zealand fifth-freedom approval document for STARLUX's Sydney–Auckland leg" },
    { zh: "雪梨飛東京：直飛 vs 經台北 vs 經香港，同日期的時間與票價比較（需要抓即時訂票系統資料，非文獻查證）", en: "Sydney to Tokyo: direct vs. via Taipei vs. via Hong Kong — same-date time and fare comparison (needs live booking-system data, not a literature lookup)" },
    { zh: "星宇台北航網 34 航點、13 國家的數字目前只經搜尋引擎摘要確認，建議直接開星宇官網／Wikipedia 頁面交叉核對", en: "STARLUX's Taipei network figures (34 destinations, 13 countries) are currently confirmed only via a search-engine summary — worth cross-checking directly against STARLUX's own site or Wikipedia" },
    { zh: "星宇正式班表與開航日期公布後更新", en: "Update once STARLUX's official schedule and launch date are announced" },
    { zh: "雪梨航線本身的逐航線營運成本資料", en: "The Sydney route's own per-route operating cost data" },
    { zh: "《來臺旅客消費及動向調查》完整報告是否有澳洲、紐西蘭單獨的消費金額", en: "Whether the full Visitor Expenditure and Trends Survey report breaks out spending for Australia and New Zealand separately" },
    { zh: "台灣居民赴澳 2026 上半年累計（1–6月）——目前只有 ABS 7 月單月數字，需下載 ABS Table 5 Excel 逐月加總", en: "Taiwan-resident visitors to Australia, cumulative H1 2026 (Jan–Jun) — only the ABS July single-month figure is available so far; needs downloading ABS Table 5 Excel and summing month by month" },
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
    CH6_CAPACITY: CH6_CAPACITY,
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
