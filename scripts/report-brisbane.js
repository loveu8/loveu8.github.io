(function () {
  'use strict';

  const data = window.BRISBANE_TRANSPORT_REPORT;
  const report = document.getElementById('report');
  const sections = ['network', 'changes', 'rail', 'expansion', 'journeys', 'funding', 'conclusions'];
  const routes = [
    [['南向 Busway · Metro M1', 'South East Busway · Metro M1'], [
      ['Eight Mile Plains', 'open'], ['Cultural Centre', 'open'], ['Roma Street Busway']]],
    [['市中心跨河鐵路', 'Cross River Rail'], [
      ['Dutton Park', 'works'], ['Boggo Road', 'works'], ['Woolloongabba', 'works'],
      ['Albert Street', 'works'], ['Roma Street', 'works'], ['Bowen Hills']]],
    [['南向鐵路', 'Southern rail corridor'], [
      ['Kuraby', 'upgrade'], ['Loganlea', 'upgrade'], ['Beenleigh', 'open'],
      ['Pimpama', 'open'], ['Hope Island', 'open'], ['Varsity Lakes']]],
    [['陽光海岸 · The Wave', 'Sunshine Coast · The Wave'], [
      ['Beerwah', 'planned'], ['Caloundra', 'planned'], ['Birtinya', 'planned', ['轉乘類 Metro 公車', 'Transfer to Metro-style bus']],
      ['Sunshine Coast Airport']]],
    [['西區公車 432', 'Western bus route 432'], [
      ['Indooroopilly Shopping Centre', 'open'], ['UQ St Lucia']]]
  ];
  const funding = [
    ['Cross River Rail', ['交付局、Queensland Rail 等；資本預算含私人融資', 'Delivery authority, Queensland Rail and others; capital budget includes private financing'], '0003', '0004'],
    ['Logan and Gold Coast Faster Rail', ['聯邦與州各半', 'Federal and state governments, equal shares'], '0014', '0017'],
    ['The Wave', ['一期聯邦與州各半；二、三期另有規劃經費', 'Stage 1 funded equally by federal and state governments; separate planning funds for stages 2 and 3'], '0023', '0026'],
    ['Brisbane Metro', ['市府與聯邦', 'Brisbane City Council and federal government'], '0029', '0032'],
    [['Brisbane Metro 擴建', 'Brisbane Metro extensions'], ['聯邦、州及協議所列其他出資', 'Federal, state and other contributions listed in the agreement'], '0036', '0040'],
    [['新版公車路網', 'New bus network'], ['州政府追加款；後續另有州、市分攤安排', 'State funding increase; subsequent state and council sharing arrangements'], '0041', null],
    [['50 分票價', '50-cent fares'], ['州政府', 'Queensland Government'], '0046', null],
    [['昆士蘭新車', 'Queensland Train Manufacturing Program'], ['州政府', 'Queensland Government'], '0057', '0058'],
    ['Coomera Connector · Stage 1', ['聯邦與州各半', 'Federal and state governments, equal shares'], '0065', '0068'],
    ['Kangaroo Point Bridge', ['聯邦與市府；開橋公告列交付成本', 'Federal government and council; delivery cost reported at opening'], '0075', null]
  ];
  const scope = {
    '0003': ['約略資本預算', 'Approximate capital budget'], '0014': ['主案預算', 'Main project budget'],
    '0023': ['一期預算', 'Stage 1 budget'], '0029': ['交付預算', 'Delivery budget'],
    '0036': ['商業論證', 'Business cases'], '0041': ['2024–25 追加款', '2024–25 funding increase'],
    '0046': ['2024–25 至 2028–29 政策估計', '2024–25 to 2028–29 policy estimate'],
    '0057': ['列車計畫資本預算', 'Train program capital budget'], '0065': ['一期資本預算', 'Stage 1 capital budget'],
    '0075': ['2024 年開橋公告', '2024 opening announcement']
  };

  const routeLegend = [
    '實線＝已營運；粗虛線＝既有服務營運中、沿線有擴建；細虛線＝新線施工中；點線＝規劃中。',
    'Solid = operating; thick dashes = operating with upgrade works; thin dashes = new line under construction; dots = planned.'
  ];

  function node(tag, value, attrs = {}) {
    const element = document.createElement(tag);
    if (value) element.textContent = value;
    for (const [key, field] of Object.entries(attrs)) element.setAttribute(key, field);
    return element;
  }

  function link(label, href) {
    return node('a', label, { href });
  }

  function inline(element, text) {
    const tokens = /\*\*(.+?)\*\*|\[([^\]]+?)\]\([^)]+\)|〔(C-[^〕]+)〕|\[(C-[^\]]+)\]/g;
    let end = 0;
    for (const match of text.matchAll(tokens)) {
      element.append(text.slice(end, match.index));
      if (match[1]) element.append(node('strong', match[1]));
      else if (match[2]) element.append(match[2]);
      else element.append(link(match[0], '#sources'));
      end = match.index + match[0].length;
    }
    element.append(text.slice(end));
    return element;
  }

  function prose(parent, text) {
    let list = null;
    for (const line of text.split('\n')) {
      if (!line.trim()) { list = null; continue; }
      if (line.startsWith('- ')) {
        if (!list) { list = node('ul'); parent.append(list); }
        list.append(inline(node('li'), line.slice(2)));
      } else {
        const heading = line.startsWith('### ');
        parent.append(inline(node(heading ? 'h3' : 'p'), heading ? line.slice(4) : line));
      }
    }
  }

  function networkOverview(t) {
    const overview = node('section', null, { class: 'network-overview', 'aria-labelledby': 'network-overview-title' });
    overview.append(node('h3', t(['東南昆士蘭公共交通路網', 'South East Queensland public transport network']), {
      id: 'network-overview-title'
    }));
    overview.append(node('p', t([
      '先看火車、輕軌、Metro 和主要公車怎麼接。官方路網圖也標出部分未來路線，查今天可搭的班次或單一路線，請用行程規劃。',
      'See how trains, trams, Metro and key bus routes connect. The official map also shows some future routes. Use the journey planner to check a route or services running today.'
    ])));
    const references = [
      ['S-037', ['Translink 官方地圖入口', 'Official Translink maps']],
      ['S-144', ['東南昆士蘭路網圖（英文 PDF）', 'South East Queensland network map (PDF)']],
      ['S-146', ['行程規劃', 'Journey planner']],
      ['S-145', ['高頻公車圖（英文 PDF）', 'High-frequency bus map (PDF)']]
    ];
    const links = node('ul', null, { class: 'network-links' });
    for (const [id, label] of references) {
      const item = node('li', null, id === 'S-145' ? { class: 'network-link-extra' } : {});
      item.append(link(t(label), data.sources[id].url));
      links.append(item);
    }
    overview.append(links);
    return overview;
  }

  function corridorMap(t) {
    const corridors = window.BRISBANE_CORRIDORS;
    const boundaries = window.BRISBANE_LGA_BOUNDARIES;
    const localities = window.BRISBANE_ROUTE_LOCALITIES;
    const corridorIds = ["m1", "cross-river", "southern-rail", "the-wave", "432"];
    const figure = node('figure', null, { class: 'corridor-map', id: 'corridor-map' });
    figure.append(node('h3', t(['本篇五條交通走廊', 'The five corridors in this report'])));
    figure.append(node('p', t([
      'M1、432 公車和南向鐵路都有車可搭，南向鐵路部分路段同時在擴建。跨河鐵路正在施工，The Wave 仍在規劃。',
      'M1, bus 432 and southern rail services are operating. Part of the southern rail corridor is also being upgraded. Cross River Rail is under construction and The Wave is planned.'
    ])));
    const controls = node('div', null, { class: 'map-controls', role: 'group', 'aria-label': t(['選擇走廊', 'Select a corridor']) });
    const canvas = node('canvas', null, { role: 'img', 'aria-describedby': 'corridor-map-summary' });
    const summary = node('p', null, { class: 'map-summary', id: 'corridor-map-summary', 'aria-live': 'polite' });
    const localitySummary = node("p", null, { class: "map-localities", id: "corridor-localities" });
    canvas.setAttribute("aria-describedby", "corridor-map-summary corridor-localities");
    const legend = node('figcaption', t(routeLegend) + ' ' + t([
      '新線以概略節點連接。總覽顯示地方政府邊界，選線後顯示郊區邊界。沿河的淡色粗線借用 CityCat 航跡標示河流位置。',
      'Future links are approximate. The overview shows council boundaries. Selecting a corridor adds suburb boundaries. The muted line along the river uses the CityCat path as a geographic reference.'
    ]), { class: 'figure-note' });
    const attribution = node('p', null, { class: 'figure-note' });
    attribution.append(
      link('Translink GTFS · CC BY 4.0', 'https://translink.com.au/about-translink/open-data'), ' · ',
      link('Cross River Rail', 'https://crossriverrail.qld.gov.au/about/rail-route/'), ' · ',
      link('The Wave', 'https://www.yoursay-projects.tmr.qld.gov.au/thewaverail/project-location-and-maps'), ' · ',
      link(t(['地方政府邊界', 'Council boundaries']), 'https://www.data.qld.gov.au/dataset/local-government-area-boundaries-queensland'), ' · ',
      link(t(['郊區邊界', 'Locality boundaries']), 'https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Boundaries/AdministrativeBoundaries/MapServer/2')
    );
    const labels = [
      ['Eight Mile Plains → Mount Gravatt → South Brisbane → 市中心', 'Eight Mile Plains → Mount Gravatt → South Brisbane → city centre'],
      ['Dutton Park → Woolloongabba → Brisbane River → 市中心 → Bowen Hills', 'Dutton Park → Woolloongabba → Brisbane River → city centre → Bowen Hills'],
      ['Kuraby → Loganlea → Beenleigh → 黃金海岸；四線化範圍為 Kuraby 至 Beenleigh。', 'Kuraby → Loganlea → Beenleigh → Gold Coast. The track upgrade covers Kuraby to Beenleigh.'],
      ['Beerwah 接既有鐵路往布里斯本。規劃新線經 Caloundra 到 Birtinya，再轉公車經 Mountain Creek、Maroochydore 到機場。', 'Beerwah connects to the existing railway towards Brisbane. The planned line runs via Caloundra to Birtinya, where passengers would change to a bus via Mountain Creek and Maroochydore to the airport.'],
      ['Indooroopilly → St Lucia 昆士蘭大學，顯示報告通勤案例路段。', 'Indooroopilly → University of Queensland at St Lucia, showing the section used in the report’s journey example.']
    ];
    const places = [
      ['Sunshine Coast', 152.87, -26.70], ['Moreton Bay', 152.86, -27.15],
      ['Brisbane', 152.94, -27.43], ['Logan', 153.04, -27.73],
      ['Gold Coast', 153.27, -27.99], ['Redland', 153.22, -27.56], ['Ipswich', 152.71, -27.64],
      ['Noosa', 152.92, -26.42], ['Scenic Rim', 152.92, -28.00]
    ];
    const routeAreas = [
      ['布里斯本市', 'Brisbane City'], ['布里斯本市', 'Brisbane City'],
      ['布里斯本市 → Logan → 黃金海岸市', 'Brisbane City → Logan → Gold Coast City'],
      ['陽光海岸區', 'Sunshine Coast Region'], ['布里斯本市', 'Brisbane City']
    ];
    const buttons = [];
    let selected = -1;

    function draw() {
      const ctx = canvas.getContext('2d');
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!ctx || !width || !height) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.scale(ratio, ratio);
      const css = getComputedStyle(canvas);
      const color = (name) => css.getPropertyValue(name).trim();
      const visible = selected < 0 ? corridors : [corridors[selected]];
      const longitudeScale = Math.cos(27.4 * Math.PI / 180);
      const points = visible.flatMap((route) => route.segments.flatMap(([, coords]) => coords));
      const xs = points.map(([lon]) => lon * longitudeScale);
      const ys = points.map(([, lat]) => lat);
      const xMin = Math.min(...xs), xMax = Math.max(...xs);
      const yMin = Math.min(...ys), yMax = Math.max(...ys);
      const pad = Math.min(width * 0.19, 112);
      const scale = Math.min((width - pad * 2) / Math.max(0.045, xMax - xMin),
        (height - 64) / Math.max(0.045, yMax - yMin));
      const project = (lon, lat) => [
        width / 2 + (lon * longitudeScale - (xMin + xMax) / 2) * scale,
        height / 2 - (lat - (yMin + yMax) / 2) * scale
      ];
      function line(coords, stroke, weight, dash = []) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = weight;
        ctx.setLineDash(dash);
        ctx.beginPath();
        coords.forEach(([lon, lat], index) => {
          const [x, y] = project(lon, lat);
          if (index) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = color('--color-surface-soft');
      ctx.fillRect(0, 0, width, height);
      const gridStep = scale > 4000 ? 0.02 : scale > 1200 ? 0.05 : 0.2;
      const left = ((xMin + xMax) / 2 - width / (2 * scale)) / longitudeScale;
      const right = left + width / (scale * longitudeScale);
      const bottom = (yMin + yMax) / 2 - height / (2 * scale);
      const top = bottom + height / scale;
      for (let x = Math.ceil(left / gridStep) * gridStep; x <= right; x += gridStep) {
        line([[x, bottom], [x, top]], color('--color-border-soft'), 1);
      }
      for (let y = Math.ceil(bottom / gridStep) * gridStep; y <= top; y += gridStep) {
        line([[left, y], [right, y]], color('--color-border-soft'), 1);
      }

      function drawAreas(areas, detail) {
        areas.forEach((polygons, index) => {
          ctx.fillStyle = color(index % 2 ? '--color-surface' : detail ? '--color-primary-soft' : '--color-surface-warm');
          ctx.strokeStyle = color(detail ? '--color-primary' : '--color-text-soft');
          ctx.lineWidth = detail ? 1.6 : 1.2;
          for (const rings of polygons) {
            ctx.beginPath();
            for (const ring of rings) {
              ring.forEach(([lon, lat], i) => {
                const [x, y] = project(lon, lat);
                if (i) ctx.lineTo(x, y);
                else ctx.moveTo(x, y);
              });
              ctx.closePath();
            }
            ctx.fill('evenodd');
            ctx.stroke();
          }
        });
      }
      drawAreas(Object.values(boundaries), false);
      if (selected >= 0) drawAreas(localities[selected].map(([, , polygons]) => polygons), true);
      line(window.BRISBANE_RIVER_REFERENCE, color('--color-primary-border'), 5);
      function routeDash(state, index) {
        if (state === 'open') return [];
        if (index === 3) return [1, 6];
        return [7, 6];
      }
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      corridors.forEach((route, index) => {
        if (index === selected) return;
        for (const [state, coords] of route.segments) {
          const stroke = selected < 0 ? color('--chart-1') : color('--color-border');
          line(coords, stroke, state === 'works' ? 4 : 2, routeDash(state, index));
        }
      });
      if (selected >= 0) {
        for (const [state, coords] of corridors[selected].segments) {
          line(coords, color(state === 'works' ? '--chart-3' : '--chart-1'), state === 'works' ? 6 : 4,
            routeDash(state, selected));
        }
      }

      const fontSize = parseFloat(color('--fs-sm')) || 14;
      ctx.font = '600 ' + fontSize + 'px ' + css.fontFamily;
      ctx.textBaseline = 'middle';
      const usedLabels = [];
      function mapLabel(label, x, y, major = false) {
        if (x < 0 || x > width || y < 12 || y > height - 12) return;
        const textWidth = ctx.measureText(label).width;
        const start = x + textWidth + 14 < width ? x + 8 : x - textWidth - 8;
        if (start < 4 || usedLabels.some((box) => Math.abs(box.y - y) < 17 && start < box.end + 6 && start + textWidth > box.start - 6)) return;
        usedLabels.push({ start, end: start + textWidth, y });
        ctx.strokeStyle = color('--color-surface-soft');
        ctx.lineWidth = 4;
        ctx.strokeText(label, start, y);
        ctx.fillStyle = color(major ? '--color-text' : '--color-text-muted');
        ctx.fillText(label, start, y);
      }
      if (selected >= 0) {
        for (const [label, lon, lat] of corridors[selected].stops) {
          const [x, y] = project(lon, lat);
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = color('--color-surface');
          ctx.fill();
          ctx.strokeStyle = color('--chart-1');
          ctx.lineWidth = 2;
          ctx.stroke();
          if (selected === 3 && label === 'Birtinya') {
            mapLabel(t(['Birtinya（轉公車）', 'Birtinya (bus transfer)']), x, y, true);
          } else mapLabel(label, x, y, true);
        }
      }
      if (selected < 0) {
        for (const [label, lon, lat] of places) mapLabel(label, ...project(lon, lat), true);
      } else {
        if (selected === 1) {
          mapLabel(t(['布里斯本河', 'Brisbane River']), ...project(153.039, -27.476));
          mapLabel(t(['市中心', 'City centre']), ...project(153.026, -27.468));
        }
        for (const [label, coords] of localities[selected]) mapLabel(label, ...project(...coords));
        if (selected === 2 || selected === 3) {
          const north = selected === 2;
          const label = north ? t(['↑ 往布里斯本市中心', '↑ Towards Brisbane city centre'])
            : t(['↓ 往布里斯本市中心', '↓ Towards Brisbane city centre']);
          ctx.fillStyle = color('--color-text');
          ctx.fillText(label, 12, north ? 20 : height - 49);
        }
      }
      const scaleKm = [1, 2, 5, 10, 20].reduce((best, km) => km / 111 * scale < width / 4 ? km : best, 1);
      ctx.strokeStyle = color('--color-text-muted');
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(12, height - 20);
      ctx.lineTo(12 + scaleKm / 111 * scale, height - 20);
      ctx.stroke();
      ctx.fillStyle = color('--color-text-muted');
      ctx.fillText(scaleKm + ' km', 12, height - 31);
      ctx.fillText('N', width - 22, 20);
    }

    function select(index) {
      selected = index;
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index + 1)));
      const description = index < 0
        ? t(['從陽光海岸經布里斯本到黃金海岸。點選走廊看主要區域。', 'From the Sunshine Coast via Brisbane to the Gold Coast. Select a corridor to zoom in.'])
        : t(labels[index]) + ' ' + t(['經過行政區：', 'Council areas: ']) + t(routeAreas[index]);
      canvas.setAttribute('aria-label', index < 0 ? t(['五條走廊總覽地圖', 'Map of the five corridors']) : t(routes[index][0]));
      summary.textContent = description;
      localitySummary.replaceChildren();
      if (index >= 0) {
        const approximate = index === 1 || index === 3;
        const caption = approximate
          ? t(['概略走廊經過的郊區', 'Suburbs along the indicative corridor'])
          : t(['沿線郊區', 'Suburbs along the route']);
        localitySummary.append(node('strong', caption + ' '),
          localities[index].map(([name]) => name).join(' · '));
      }
      draw();
    }

    const names = [t(['五條走廊總覽', 'Overview of the five corridors']), ...routes.map(([name]) => t(name))];
    names.forEach((name, i) => {
      const button = node('button', name, { type: 'button' });
      button.addEventListener('click', () => select(i - 1));
      controls.append(button);
      buttons.push(button);
    });
    figure.append(controls, canvas, summary, localitySummary, legend, attribution);
    select(corridorIds.indexOf(new URLSearchParams(location.search).get("corridor")));
    return { figure, draw };
  }

  function schematic(t) {
    const figure = node('figure');
    figure.append(node('h3', t(['五條走廊的主要站點', 'Key stops on the five corridors'])));
    figure.append(node('figcaption', t(routeLegend) + ' ' + t(['只列主要節點，非等比例。', 'Selected stops, schematic only.']), { class: 'figure-note' }));
    const status = { open: ['已營運', 'Operating'], works: ['新線施工中', 'New line under construction'], upgrade: ['營運中，沿線有擴建', 'Operating with upgrade works'], planned: ['規劃中', 'Planned'] };
    for (const [name, stops] of routes) {
      const row = node('div', null, { class: 'route' });
      row.append(node('strong', t(name)));
      const list = node('ol', null, { role: 'list' });
      for (const [label, state, transfer] of stops) {
        const stop = node('li', null, state ? { 'data-state': state } : {});
        stop.append(node('strong', label));
        if (state && (list.children.length === 0 || list.lastElementChild.dataset.state !== state)) {
          stop.append(node('span', t(status[state]), { class: 'figure-note' }));
        }
        if (transfer) stop.append(node('strong', t(transfer)));
        list.append(stop);
      }
      row.append(list);
      figure.append(row);
    }
    return figure;
  }

  function table(title, labels, rows) {
    const figure = node('figure');
    figure.append(node('h3', title));
    const grid = node('table', null, { class: 'report-table', role: 'table', 'aria-label': title });
    const head = node('thead', null, { role: 'rowgroup' });
    const headers = node('tr', null, { role: 'row' });
    for (const label of labels) headers.append(node('th', label, { scope: 'col', role: 'columnheader' }));
    head.append(headers);
    const body = node('tbody', null, { role: 'rowgroup' });
    for (const row of rows) {
      const tr = node('tr', null, { role: 'row' });
      row.forEach((value, index) => {
        const cell = index ? node('td', null, { role: 'cell' }) : node('th', null, { scope: 'row', role: 'rowheader' });
        if (index) cell.append(node('span', labels[index], { class: 'cell-label', 'aria-hidden': 'true' }));
        cell.append(value);
        tr.append(cell);
      });
      body.append(tr);
    }
    grid.append(head, body);
    figure.append(grid);
    return figure;
  }

  function milestones(t) {
    const events = [
      ['2024-08', ['50 分票價試辦', '50-cent fare trial'], ['適用的 Translink 服務開始試辦。', 'The trial begins on eligible Translink services.']],
      ['2024-12', ['Kangaroo Point Bridge 開放', 'Kangaroo Point Bridge opens'], ['步行與自行車可直接跨河。', 'A new river crossing for walking and cycling.']],
      ['2025-01 / 06', ['M2、M1 分階段上路', 'M2 and M1 enter service'], ['新版公車路網第二階段與 M1 同日上路。', 'M1 begins on the same day as stage 2 of the new bus network.']],
      ['2025-10 / 2026-05', ['Pimpama 與 Hope Island 新站開放', 'Pimpama and Hope Island stations open'], ['兩站加入 Gold Coast 線。', 'Both stations join the Gold Coast line.']],
      ['2029', ['Cross River Rail 首批載客', 'First Cross River Rail passenger services'], ['官方預期，須完成整合、試車及營運準備。', 'Official expectation, subject to integration, testing and operational readiness.'], true],
      ['2031', ['南向鐵路升級', 'Southern rail upgrade'], ['審計署估計完成年份。', 'Estimated completion year reported by the Queensland Audit Office.'], true],
      ['2032', ['The Wave 一期', 'The Wave Stage 1'], ['審計署估計完成年份。', 'Estimated completion year reported by the Queensland Audit Office.'], true]
    ];
    const items = events.map(([date, title, body, dim]) => ({ date, title, body, dim }));
    const section = node('div');
    section.append(node('h3', t(['主要里程碑', 'Key milestones'])),
      ReportCore.renderTimeline(items, (field) => Array.isArray(field) ? t(field) : field));
    section.append(inline(node('p', null, { class: 'figure-note' }), t([
      '已發生和預計事件按年份排列。〔C-03、C-04、C-05、C-06、C-07〕',
      'Observed and expected milestones are shown by year. [C-03, C-04, C-05, C-06, C-07]'
    ])));
    return section;
  }

  function journeyTable(t) {
    const rows = data.journeys.map((journey) => [
      journey.origin.replace(/ platform \d| stop C/g, '') + ' → ' +
        journey.destination.replace(/ platform \d|（1746）/g, ''), journey.travel_date,
      journey.wait_min, journey.in_vehicle_min, journey.total_min
    ]);
    const figure = table(t(['站到站旅程比較', 'Scheduled stop-to-stop journeys']), [
      t(['旅程', 'Journey']), t(['日期', 'Date']), t(['候車（分）', 'Wait (min)']),
      t(['車程（分）', 'On board (min)']), t(['08:00 起到下車（分）', '08:00 to arrival (min)'])
    ], rows);
    figure.append(inline(node('figcaption', null, { class: 'figure-note' }), t([
      '候車只代表 08:00 剛好到站時要等多久，不含兩端步行。〔C-08、C-09、C-10〕',
      'Waits apply to arrival at the stop at exactly 08:00. Walking at either end is outside the comparison. [C-08, C-09, C-10]'
    ])));
    return figure;
  }

  function comparisonChart(charts, title, suffix, values, note) {
    const chart = charts.build({
      title, suffix, type: 'bar',
      data: values.map(([label, value]) => ({ label, value }))
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), note));
    return chart;
  }

  function finance(t, lang) {
    function displayAmount(id, value) {
      if (id === '0003') return t(['約 98 億澳幣', 'about A$9.8 billion']);
      if (lang === 'en') return new Intl.NumberFormat('en-AU', {
        style: 'currency', currency: 'AUD', currencyDisplay: 'code', maximumFractionDigits: 0
      }).format(value);
      return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 3 }).format(Number(value) / 1e8) + ' 億澳幣';
    }
    function amount(id, label, showEnd = false) {
      const record = data.funding[id];
      const result = node('span');
      result.append(label + ' ');
      const source = data.sources[record.source_id];
      result.append(link(displayAmount(id, record.amount), source.url));
      if (showEnd && record.period_end) result.append(' · ' + record.period_end);
      return result;
    }
    const paid = {
      '0040': ['聯邦已付', 'Federal payments'],
      '0068': ['州資本表累計支出估計', 'Estimated cumulative spending in state capital statement']
    };
    const label = t(['累計支出', 'Cumulative expenditure']);
    const rows = funding.map(([name, funder, budget, spent]) => [
      Array.isArray(name) ? t(name) : name, t(funder), amount(budget, t(scope[budget])),
      spent ? amount(spent, paid[spent] ? t(paid[spent]) : label, true)
        : t(['未取得同範圍的累計支出', 'No cumulative spending figure found for this scope'])
    ]);
    const figure = table(t(['十案財源', 'Funding for ten cases']),
      [t(['項目', 'Project']), t(['出資者', 'Funding parties']), t(['金額與用途', 'Amount and scope']), t(['支出或付款（截至日）', 'Expenditure or payments (to date)'])], rows);
    figure.append(node('figcaption', t([
      '跨河鐵路全案估計 190.41 億澳幣，另含配套及維護；新車全案估計 95 億，含建造及 20 年營運維護。兩案表內使用資本預算，跨河鐵路按審計署同表取約 98 億（詳細列報 98.25 億）。Metro 開通準備與新版公車路網有共同工作。點選金額可查來源。',
      'Cross River Rail is estimated at A$19.041 billion overall, including related works and maintenance. The train program’s A$9.5 billion estimate includes construction and 20 years of operations and maintenance. The table uses capital budgets for both, including the audit summary’s rounded A$9.8 billion for Cross River Rail (A$9.825 billion in the detailed figure). Metro launch preparation and the new bus network share some work. Select an amount to open its source.'
    ]), { class: 'figure-note' }));
    return figure;
  }

  function sources(t) {
    const footer = node('section', null, { id: 'sources', class: 'report-panel' });
    footer.append(node('h2', t(['資料來源', 'Sources'])));
    const claims = node('details', null, { open: '' });
    claims.append(node('summary', t(['主張與來源編號', 'Claims and source IDs'])));
    const list = node('ul');
    for (const [id, ids] of Object.entries(data.claims)) {
      const item = node('li', id + ' · ');
      ids.forEach((sourceId, index) => {
        if (index) item.append(', ');
        item.append(link(sourceId, data.sources[sourceId].url));
      });
      list.append(item);
    }
    claims.append(list);
    const references = node('ul', null, { class: 'source-list' });
    for (const [id, source] of Object.entries(data.sources)) {
      const entry = node('li');
      entry.append(link(id + ' · ' + source.title, source.url));
      references.append(entry);
    }
    const details = node('details');
    details.append(node('summary', t(['完整來源名稱', 'Full source titles'])), references);
    footer.append(claims, details);
    return footer;
  }

  const charts = ReportCore.createCharts((field) => field, () => Site.getLang() !== "en");
  let mapObserver;
  let redrawMap;
  function render(lang) {
    const content = data[lang];
    const t = (labels) => labels[lang === 'en' ? 1 : 0];
    document.title = content.title;
    if (mapObserver) mapObserver.disconnect();
    const map = corridorMap(t);
    charts.clear();
    const cover = node('header', null, { class: 'report-panel' });
    cover.append(node('h1', content.title), node('p', t(['資料查核至 2026-11-20', 'Research checked to 20 November 2026']), { class: 'report-meta' }));
    prose(cover, content.summary);
    const nav = node('nav', null, { class: 'report-nav', 'aria-label': t(['章節導覽', 'Chapters']) });
    const chapters = node('ul');
    content.chapters.forEach((chapter, i) => {
      const entry = node('li');
      entry.append(link(chapter.title, '#' + sections[i]));
      chapters.append(entry);
    });
    nav.append(chapters);
    cover.append(nav);
    const panels = content.chapters.map((chapter, i) => {
      const section = node('section', null, { id: sections[i], class: 'report-panel' });
      const heading = node('div', null, { class: 'chapter-heading' });
      const share = link(t(['章節連結', 'Section link']), '#' + sections[i]);
      share.className = 'chapter-link';
      heading.append(node('h2', (i + 1) + '. ' + chapter.title), share);
      section.append(heading);
      const paragraphs = chapter.body.split(/\n(?=\*\*(?:本章結論。|Takeaway\.))/);
      if (i === 0) {
        const openingEnd = paragraphs[0].indexOf('\n\n');
        prose(section, paragraphs[0].slice(0, openingEnd));
        section.append(networkOverview(t), map.figure, schematic(t));
        prose(section, paragraphs[0].slice(openingEnd + 2));
      } else {
        prose(section, paragraphs[0]);
      }
      if (i === 1) section.append(comparisonChart(charts,
        t(['上車刷卡次數', 'Card taps at boarding']), '',
        [['111 + 160 · 2025-05', 193986], ['M1 · 2026-05', 382655]],
        t(['只計 go card 和感應銀行卡。轉乘可能另計，且同期路線有調整。〔C-04〕',
          'Go card and contactless bank cards only. Transfers can generate an additional tap, and the network changed between the samples. [C-04]'])));
      if (i === 1) section.append(milestones(t));
      if (i === 4) section.append(journeyTable(t));
      if (i === 5) {
        section.append(finance(t, lang));
        section.append(comparisonChart(charts,
          t(['昆士蘭交通部帳列票收（百萬澳幣）', 'TMR fare revenue (A$ million)']), '',
          [['2023–24', Number(data.funding['0044'].amount) / 1e6],
            ['2024–25', Number(data.funding['0045'].amount) / 1e6],
            ['2025–26', Number(data.funding['0076'].amount) / 1e6]],
          t(['部門帳列票收，範圍與東南昆士蘭營運補助不同。〔C-11〕', 'Departmental fare revenue, with different coverage from the South East Queensland operating subsidy. [C-11]'])));
        section.append(comparisonChart(charts,
          t(['東南昆士蘭一般公共交通補助（百萬澳幣）', 'General SEQ public transport subsidy (A$ million)']), '',
          [[t(['2025–26 估計實支', '2025–26 estimated actual']), Number(data.funding['0053'].amount) / 1e6],
            [t(['2026–27 預算', '2026–27 budget']), Number(data.funding['0054'].amount) / 1e6]],
          t(['州預算所列，涵蓋一般公共交通營運。〔C-11〕',
            'State budget figures for general public transport operations. [C-11]'])));
      }
      if (i === 6) section.append(table(t(['問題與工程對照', 'Service issues and projects']), [
        t(['問題', 'Issue']), t(['服務證據', 'Evidence']), t(['工程關聯', 'Project response']), t(['資料缺口', 'Evidence gap'])
      ], [[
        'Clayfield', t(['抽查週六最長 60 分鐘，同時段週三 30 分鐘。附近有進城公車。', 'Longest sampled gap: 60 minutes on Saturday, 30 in the same Wednesday window. Nearby buses run into the city.']),
        t(['尚無可核對的週六增班方案。', 'No verifiable Saturday service increase identified.']),
        t(['逐站運行紀錄及步行轉乘資料。', 'Stop-level operating records and walking access data.'])
      ]]));
      if (paragraphs[1]) prose(section, paragraphs[1]);
      return section;
    });
    report.replaceChildren(cover, ...panels, sources(t));
    charts.draw(true);
    redrawMap = map.draw;
    redrawMap();
    mapObserver = new ResizeObserver(map.draw);
    mapObserver.observe(map.figure);
    mapObserver.observe(map.figure.querySelector("canvas"));
  }

  render(Site.getLang());
  Site.onLangChange(render);
  const onThemeChange = () => redrawMap();
  new MutationObserver(onThemeChange).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onThemeChange);
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: 'instant' });
}());
