(function () {
  'use strict';

  const data = window.BRISBANE_TRANSPORT_REPORT;
  const report = document.getElementById('report');
  const sections = ['today', 'foundations', 'reforms', 'projects', 'games', 'funding', 'conclusions'];
  // Paragraphs per chapter (blank-line separated) that the figure positions in render() assume (Q85).
  const paragraphCounts = [4, 14, 5, 7, 5, 3, 3];
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
    [['昆士蘭新車', 'Queensland Train Manufacturing Program'], ['州政府', 'Queensland Government'], '0057', '0058']
  ];
  const scope = {
    '0003': ['約略資本預算', 'Approximate capital budget'], '0014': ['主案預算', 'Main project budget'],
    '0023': ['一期預算', 'Stage 1 budget'], '0029': ['交付預算', 'Delivery budget'],
    '0036': ['商業論證', 'Business cases'], '0041': ['2024–25 追加款', '2024–25 funding increase'],
    '0046': ['2024–25 至 2028–29 政策估計', '2024–25 to 2028–29 policy estimate'],
    '0057': ['列車計畫資本預算', 'Train program capital budget']
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
      ['Kuraby → Loganlea → Beenleigh → 黃金海岸；四線化範圍為 Kuraby 至 Beenleigh。', 'Kuraby → Loganlea → Beenleigh → Gold Coast. The upgrade from two tracks to four covers Kuraby to Beenleigh.'],
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

  // F5, chapter 5 (Q60, Q66, Q82): project years carry a text category, never colour alone.
  function milestones(t) {
    const tags = {
      ok: ['依估計趕得上', 'Expected before the Games on current estimates'],
      tight: ['時程緊', 'Tight, with almost no margin']
    };
    const estimate = ['估計交付年份。', 'Estimated delivery year.'];
    const events = [
      ['2024-08', ['50 分票價試辦', '50-cent fare trial']],
      ['2025-01', ['M2 上路', 'M2 enters service']],
      ['2025-02', ['50 分票價常態化（Airtrain 除外）', '50-cent fares made permanent (excluding Airtrain)']],
      ['2025-06', ['M1 與新版公車路網第二階段上路', 'M1 and stage 2 of the new bus network begin']],
      ['2029', ['跨河鐵路首批載客', 'Cross River Rail first passenger services'],
        ['估計交付年份；交付局說明為首批載客。', 'Estimated delivery year; the delivery authority states this is when first passenger services are expected.'], 'ok'],
      ['2031', ['Logan 至黃金海岸鐵路', 'Logan and Gold Coast Faster Rail'], estimate, 'tight'],
      ['2032', ['The Wave 一期', 'The Wave Stage 1'],
        ['估計交付年份；Infrastructure Australia 指出須在 2031 年實質完工才能在奧運營運。',
          'Estimated delivery year; Infrastructure Australia notes it must reach practical completion by 2031 to operate for the Games.'], 'tight'],
      ['2032', ['布里斯本奧運', 'Brisbane 2032 Games']]
    ];
    const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const items = events.map(([date, title, body, tag]) => ({
      date,
      title: escape(t(title)) + (tag ? ' <span class="tl-tag tl-tag-' + tag + '">' + escape(t(tags[tag])) + '</span>' : ''),
      body: body ? escape(t(body)) : '',
      dim: date >= '2029'
    }));
    const section = node('div');
    section.append(node('h3', t(['主要里程碑（2024–2032）', 'Key milestones, 2024–2032'])),
      ReportCore.renderTimeline(items, (field) => field));
    section.append(inline(node('p', null, { class: 'figure-note' }), t([
      '工程年份是審計署列出、由交付機構提供的估計，沒有區分完工或開始營運；跨河鐵路的首批載客另見交付局說法。〔C-03、C-04、C-06、C-07、C-26〕',
      'Project years are estimated delivery years provided by the delivery agencies and listed by the Queensland Audit Office, without distinguishing completion from the start of operations; for Cross River Rail’s first passenger services, see the delivery authority’s statement. [C-03, C-04, C-06, C-07, C-26]'
    ])));
    return section;
  }

  // N1, chapter 2 (Q63): growth rate and people added, highest rate first, 11-LGA total last.
  function populationChart(charts, t) {
    const rows = data.figures.n1.map((row) => ({
      label: row.name === 'total' ? t(['11 個地方政府合計', '11 LGAs combined']) : row.name,
      value: row.pct,
      display: row.pct.toFixed(1) + '% · +' + row.change.toLocaleString('en-US')
    }));
    const chart = charts.build({
      title: t(['人口增幅與增加人數（2020→2025）', 'Population growth and people added, 2020→2025']),
      type: 'bar', data: rows,
      labelsAboveWhenNarrow: true // Q91: on phones the long values left 10–28px bars
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t([
      '2020 年 6 月到 2025 年 6 月的估計常住人口。比例最高的在外圍，增加人數最多的是 Brisbane 市。2025 年為初步數字。〔C-01、C-27〕',
      'Estimated resident population, June 2020 to June 2025. The highest growth rates are on the outskirts, and Brisbane City added the most people. 2025 figures are preliminary. [C-01, C-27]'
    ])));
    return chart;
  }

  // N2, chapter 2 (Q64, Q88): shares of people who travelled to work, 2016 Census.
  function commuteChart(charts, t) {
    const parts = [
      ['car', ['只開車或搭車', 'Car only (driver or passenger)'], '--chart-1'],
      ['pt', ['大眾運輸', 'Public transport'], '--chart-2'],
      ['other', ['其他', 'Other'], '--chart-3']
    ];
    const names = { total: ['11 個地方政府', '11 LGAs'], brisbane: ['Brisbane 市', 'Brisbane City'] };
    const groups = data.figures.n2.map((row) => ({
      label: t(names[row.name]), total: row.travelled,
      segments: parts.map(([key, label, colorVar]) => ({ label: t(label), value: row[key], colorVar }))
    }));
    const chart = charts.build({
      title: t(['2016 年普查：怎麼去上班', 'How people travelled to work, 2016 Census']),
      type: 'stacked',
      data: {
        percent: true, unit: t(['人', 'people']), groups,
        legend: parts.map(([, label, colorVar]) => ({ label: t(label), colorVar }))
      }
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t([
      '2016 年普查（疫情前），只計普查當天有出門上班的人，柱頂為人數。大眾運輸只計原表可辨識的組合，其餘未拆分的多種方式組合歸入其他。2021 年普查日在疫情期間，在家工作佔全部就業者的比例從 5% 升到 17%，所以只畫 2016 年。〔C-17〕',
      '2016 Census (before the pandemic), counting only people who travelled to work on Census day; the number above each column is that count. Public transport counts only the combinations identifiable in the original table; other combinations of several modes that the table does not split are grouped as other. Census day in 2021 fell during the pandemic, and the share of all employed people working from home rose from 5% to 17%, so the chart shows 2016 only. [C-17]'
    ])));
    return chart;
  }

  const modes = {
    bus: ['--chart-1', ['公車', 'Bus']],
    rail: ['--chart-2', ['火車', 'Rail']],
    tram: ['--chart-3', ['輕軌', 'Light rail']],
    ferry: ['--chart-4', ['渡輪', 'Ferry']]
  };
  // 億 in Chinese, millions in English (the body text uses 2.14 億 / 214 million).
  function tripsLabel(t, millions, digits) {
    return t([(millions / 100).toFixed(2) + ' 億人次', millions.toFixed(digits) + ' million trips']);
  }

  // N6, chapter 1 (Q112–Q114): one card per mode under a one-line overview; 2025–26, growth
  // against 2018–19 (before the pandemic, Q113). Sizes are routes on a sampled weekday.
  function modeCards(t) {
    const n6 = data.figures.n6;
    const figure = node('figure', null, { class: 'mode-cards' });
    figure.append(node('h3', t(['四種運具一覽（2025–26 年度）', 'The four modes at a glance, 2025–26'])));
    const overview = node('p', null, { class: 'mode-overview' });
    overview.append(node('span', tripsLabel(t, n6.total, 0), { class: 'stat-value' }),
      node('span', t(['一年的搭乘次數，比疫情前（2018–19 年度）多 ' + n6.totalGrowth + '%',
        'trips a year, ' + n6.totalGrowth + '% more than before the pandemic (2018–19)']), { class: 'stat-label' }));
    figure.append(overview);
    const size = {
      bus: (c) => t(['約 ' + c.routes + ' 條路線', 'About ' + c.routes + ' routes']),
      rail: (c) => t([c.lines + ' 條線・' + c.stations + ' 個車站', c.lines + ' lines · ' + c.stations + ' stations']),
      tram: (c) => t([c.routes + ' 條（黃金海岸）', c.routes + ' line (Gold Coast)']),
      ferry: (c) => t([c.routes + ' 條路線', c.routes + ' routes'])
    };
    const grid = node('ul', null, { class: 'stat-grid' });
    for (const card of n6.modes) {
      const name = modes[card.key][1];
      const cell = node('li', null, { class: 'stat-cell', 'data-mode': card.key }); // colour rule in report-brisbane.css
      cell.append(node('strong', t(name), { class: 'mode-name' }),
        // English drops "trips" from the big number so it stays on one line on phones.
        node('span', t([(card.trips / 100).toFixed(2) + ' 億人次', card.trips.toFixed(1) + ' million']), { class: 'n' }),
        node('span', size[card.key](card), { class: 'l' }),
        node('span', t(['佔 ' + card.share + '%', card.share + '% of trips']), { class: 'l' }),
        node('span', t(['比疫情前 +' + card.growth + '%', '+' + card.growth + '% on 2018–19']), { class: 'l' }));
      grid.append(cell);
    }
    figure.append(grid);
    figure.append(inline(node('p', null, { class: 'figure-note' }), t([
      '搭乘次數是運輸部年報的東南昆士蘭政府簽約服務；公車含 Brisbane Metro。路線數是 2026 年 10 月 14 日（週三）表定有班次的路線；火車線數取 Translink 火車時刻表總表，車站數取運輸部 2024–25 年報。輕軌、渡輪的人數基數小，百分比看起來較大；2018–19 年度渡輪受 Queen’s Wharf 工程影響偏低。〔C-34、C-35〕',
      'Trips are TMR annual report figures for government contracted services in South East Queensland; bus includes Brisbane Metro. Route counts are routes with scheduled services on Wednesday 14 October 2026; the rail line count is from Translink’s list of all train timetables, and the station count from the TMR 2024–25 annual report. Light rail and ferry start from small numbers, so their percentages look large; ferry trips in 2018–19 were held down by Queen’s Wharf works. [C-34, C-35]'
    ])));
    return figure;
  }

  // N7, chapter 1 (Q107, Q116): trips a year by mode, stacked; replaces the N5 line (Q99).
  function modeTripsChart(charts, t) {
    const n7 = data.figures.n7;
    const keys = Object.keys(modes);
    const groups = n7.years.map((year, i) => ({
      // On phones "2018–19" does not fit eight slots; the short label is the end year ('19).
      label: year, shortLabel: '’' + year.slice(-2), total: Math.round(n7.total[i]),
      segments: keys.map((key) => ({ label: t(modes[key][1]), value: n7[key][i], colorVar: modes[key][0] }))
    }));
    const chart = charts.build({
      title: t(['每年搭乘次數，依運具（百萬人次）', 'Trips a year by mode (millions)']),
      type: 'stacked',
      data: {
        unit: t(['百萬', 'million']), groups,
        legend: keys.map((key) => ({ label: t(modes[key][1]), colorVar: modes[key][0] }))
      }
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t([
      '運輸部年報的東南昆士蘭政府簽約服務搭乘次數，柱頂是合計（四捨五入到百萬）。年度是 7 月到隔年 6 月，窄螢幕上以結束年份標示（’19 是 2018–19 年度）；2019–20 年度從 2020 年 3 月起受疫情影響，2020–21、2021–22 年度最低。2024–25 年度起有 50 分票價。〔C-34〕',
      'TMR annual report trips on government contracted services in South East Queensland; the number above each column is the total, rounded to the nearest million. Years run from July to June; on narrow screens each is labelled by its end year (’19 is 2018–19); 2019–20 was affected by the pandemic from March 2020, and 2020–21 and 2021–22 were the lowest. 50-cent fares apply from 2024–25. [C-34]'
    ])));
    return chart;
  }

  // N8, chapter 1 (Q106, Q108): bus routes per LGA with population growth, largest first.
  function busRoutesTable(t) {
    const n8 = data.figures.n8;
    const signed = (n) => (n > 0 ? '+' : '') + n;
    const rows = n8.map((row) => [
      row.name === 'total' ? t(['11 個地方政府合計', '11 LGAs combined']) : row.name,
      String(row.routes2020), String(row.routes2026), signed(row.routes2026 - row.routes2020),
      row.popPct.toFixed(1) + '%'
    ]);
    const figure = table(t(['各地方政府的公車路線數', 'Bus routes by local government area']),
      [t(['地方政府', 'Local government area']), t(['2020 年 4 月', 'April 2020']), t(['2026 年 10 月', 'October 2026']),
        t(['增減', 'Change']), t(['人口增幅（2020→2025）', 'Population growth, 2020→2025'])], rows);
    figure.append(inline(node('figcaption', null, { class: 'figure-note' }), t([
      '依人口由多到少排列。每條路線算在它多數站牌所在的地方政府，跨區路線只算一次；路線數不看長度和班次。各抽查一個週三（2020-04-01、2026-10-14）的表定班表，2020-04-01 在疫情封鎖期間。〔C-01、C-36〕',
      'Ordered by population, largest first. Each route is counted in the local government area holding most of its stops, so a route crossing areas is counted once; the count ignores route length and frequency. Scheduled timetable for one sampled Wednesday each (1 April 2020, 14 October 2026); 1 April 2020 fell during the pandemic lockdown. [C-01, C-36]'
    ])));
    return figure;
  }

  // N4, chapter 2 (Q96–Q98): public transport trips per person a year, the measure Australian
  // trend reports use (Q98). Pandemic years are shaded; 2025–26 waits for its population.
  function ridershipChart(charts, t) {
    const n4 = data.figures.n4;
    const at = (year) => n4.years.indexOf(year);
    const chart = charts.build({
      title: t(['每人每年搭乘大眾運輸次數', 'Public transport trips per person a year']),
      type: 'line',
      data: {
        categories: n4.years,
        series: [{ label: t(['每人每年搭乘次數', 'Trips per person a year']), colorVar: '--chart-1', data: n4.perPerson }],
        bands: [{ from: at('2019–20'), to: at('2021–22'), label: t(['疫情', 'Pandemic']) }],
        labelAt: [at('2018–19')] // the pre-pandemic year the text compares with
      }
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t([
      'Translink 東南昆士蘭全路網的年度搭乘次數（一人一次單向移動），除以 11 個地方政府的年中估計常住人口；兩者範圍接近但不相同。年度是 7 月到隔年 6 月，灰底是受疫情影響的年度。2025–26 年度的人口要到 2027 年才公布，所以只畫到 2024–25 年度。搭乘次數增加不代表班次和座位夠用。〔C-33〕',
      'Annual passenger trips on the whole Translink network in South East Queensland (one person making one one-way journey), divided by the mid-year estimated resident population of the 11 local government areas; the two areas are close but not identical. Years run from July to June, and the shaded years were affected by the pandemic. Population for 2025–26 will not be published until 2027, so the chart ends at 2024–25. More trips do not mean that services and seats are sufficient. [C-33]'
    ])));
    return chart;
  }

  // N3, chapter 3 (Q65, Q87): scheduled inbound trunk services by hour, line chart.
  function hourlyChart(charts, t) {
    const n3 = data.figures.n3;
    const chart = charts.build({
      title: t(['Eight Mile Plains 往市區主線逐時班次（表定）', 'Hourly inbound trunk services at Eight Mile Plains (scheduled)']),
      type: 'line',
      data: {
        categories: n3.hours.map((hour) => String(hour).padStart(2, '0') + t([' 時', ':00'])),
        series: [
          { label: t(['舊 111（2025-05-14 週三）', 'Old 111 (Wed 14 May 2025)']), colorVar: '--chart-1', data: n3.old },
          { label: t(['M1（2026-10-21 週三）', 'M1 (Wed 21 Oct 2026)']), colorVar: '--chart-2', data: n3.m1 }
        ],
        labelAt: [n3.hours.indexOf(9)] // Q92: the off-peak gap the text describes, 12 vs 4
      }
    });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t([
      '往市區方向的主線（舊 111／M1）。07–08 時是早尖峰，兩年都是每小時 12 班；增加的主要在其他時段。同站另有 555，未畫入（07 時 5→4 班、08 時 4→4 班）。表定班次，各抽查一個週三，不是實際行車紀錄。〔C-21〕',
      'Inbound trunk services (old 111 / M1). In the morning peak, both years have 12 services in the hour starting at 7 am and 12 in the hour starting at 8 am; the increase is mainly at other times. Route 555 also serves the stop and is not shown (7 am: 5 to 4 services; 8 am: 4 to 4). Scheduled timetable for one sampled Wednesday in each year, not operating records. [C-21]'
    ])));
    return chart;
  }

  // F8 and F9, chapter 6 (Q59): 億澳幣 in Chinese, A$ million in English, at the source's precision.
  function moneyChart(charts, t, lang, title, rows, note) {
    const zh = lang !== 'en';
    const values = rows.map(([label, id]) => {
      const amount = Number(data.funding[id].amount);
      const value = zh ? amount / 1e8 : amount / 1e6;
      const display = zh ? value.toFixed(2)
        : value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      return { label: Array.isArray(label) ? t(label) : label, value, display };
    });
    const chart = charts.build({ title: t(title), type: 'bar', data: values });
    chart.append(inline(node('p', null, { class: 'figure-note' }), t(note)));
    return chart;
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
      if (id === '0003') return t(['約 98 億澳幣', 'about A$9.8 billion']);
      // English follows the body text (Q93, U04): A$ billion from a billion up, otherwise A$ million.
      if (lang === 'en') {
        const n = Number(value);
        return n >= 1e9
          ? 'A$' + (n / 1e9).toLocaleString('en-AU', { maximumFractionDigits: 4 }) + ' billion'
          : 'A$' + (n / 1e6).toLocaleString('en-AU', { maximumFractionDigits: 1 }) + ' million';
      }
      return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 3 }).format(Number(value) / 1e8) + ' 億澳幣';
    }
    function amount(id, label, showEnd = false) {
      const record = data.funding[id];
      const result = node('span');
      result.append(label + ' ');
      const source = data.sources[record.source_id];
      result.append(link(displayAmount(id, record.amount), source.url));
      if (showEnd && record.period_end) result.append(' · ', node('span', record.period_end, { class: 'fund-date' }));
      return result;
    }
    const paid = {
      '0040': ['聯邦已付', 'Federal payments']
    };
    const label = t(['累計支出', 'Cumulative expenditure']);
    const rows = funding.map(([name, funder, budget, spent]) => [
      Array.isArray(name) ? t(name) : name, t(funder), amount(budget, t(scope[budget])),
      spent ? amount(spent, paid[spent] ? t(paid[spent]) : label, true)
        : t(['未取得同範圍的累計支出', 'No cumulative spending figure found for this scope'])
    ]);
    const figure = table(t(['八項工程與政策的財源', 'Funding for eight projects and policies']),
      [t(['項目', 'Item']), t(['出資者', 'Funders']), t(['金額與用途', 'Amount and scope']), t(['支出或付款（截至日）', 'Expenditure or payments (as at the date shown)'])], rows);
    figure.append(inline(node('figcaption', null, { class: 'figure-note' }), t([
      '跨河鐵路全案連同相關工程估計約 190.41 億，其中隧道與地下站的設計、興建與維護約 124 億；新列車計畫 95 億含興建與 20 年營運維護。表中兩案都用資本預算，跨河鐵路採審計摘要的約 98 億（細表 98.25 億）。Metro 開通準備與新版公車路網有共同項目。點金額可開啟來源。〔C-13、C-31〕',
      'Cross River Rail’s whole project, together with associated works, is estimated at about A$19.041 billion, of which about A$12.4 billion is for the design, construction and maintenance of the tunnels and underground stations; the Queensland Train Manufacturing Program’s A$9.5 billion includes construction and 20 years of operations and maintenance. The table uses capital budgets for both. For Cross River Rail it uses the audit summary figure of about A$9.8 billion; the detailed audit table gives A$9.825 billion. Metro launch preparation and the new bus network share some work. Select an amount to open its source. [C-13, C-31]'
    ])));
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
    cover.append(node('h1', content.title), node('p', t(['資料查核至 2026-11-27', 'Research checked to 27 November 2026']), { class: 'report-meta' }));
    // No opening text under the title (Q118): the numbered chapter list is the table of contents.
    const nav = node('nav', null, { class: 'report-nav', 'aria-label': t(['章節導覽', 'Chapters']) });
    const chapters = node('ol');
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
      // Figures sit right after the paragraph they support (Q85): chapter -> paragraph number -> figures.
      const figuresAfter = {
        0: {
          0: () => [modeCards(t)],
          1: () => [modeTripsChart(charts, t)],
          2: () => [busRoutesTable(t)]
        },
        1: {
          2: () => [networkOverview(t), map.figure, schematic(t)],
          4: () => [populationChart(charts, t)],
          7: () => [commuteChart(charts, t)],
          8: () => [ridershipChart(charts, t)]
        },
        2: {
          1: () => [hourlyChart(charts, t)],
          3: () => [comparisonChart(charts,
            t(['上車刷卡次數', 'Card taps at boarding']), '',
            [['111 + 160 · 2025-05', 193986], ['M1 · 2026-05', 382655]],
            t(['只計 go card 和感應銀行卡。轉乘一次就多一筆紀錄，同期路網也有調整。這不代表搭車的人加倍，也無法區分新乘客和原本乘客搭得更多。兩個月份都在 50 分票價常態化之後；上車紀錄也無法看出有多少人從開車改搭。〔C-04〕',
              'Go card and contactless bank cards only. Each transfer adds another record, and the network changed at the same time. This does not mean the number of people travelling doubled, and the data cannot separate new passengers from existing passengers travelling more. Both months fall after 50-cent fares became permanent; boarding records also cannot show how many people switched from driving. [C-04]']))]
        },
        4: { 3: () => [milestones(t)] },
        5: {
          0: () => [finance(t, lang)],
          1: () => [
            moneyChart(charts, t, lang, ['昆士蘭交通部帳列票收（億澳幣）', 'TMR departmental fare revenue (A$ million)'],
              [['2023–24', '0044'], ['2024–25', '0045'], ['2025–26', '0076']],
              ['部門帳列票收，範圍與東南昆士蘭營運補助不同。期間 50 分票價先試辦再常態實施。〔C-11〕',
                'Departmental fare revenue, with different coverage from the South East Queensland operating subsidy. 50-cent fares were first trialled and then made permanent during this period. [C-11]']),
            moneyChart(charts, t, lang, ['東南昆士蘭一般公共交通補助（億澳幣）', 'General SEQ public transport subsidy (A$ million)'],
              [[['2025–26 估計實支', '2025–26 estimated actual'], '0053'], [['2026–27 預算', '2026–27 budget'], '0054']],
              ['州預算所列，涵蓋東南昆士蘭一般公共交通營運。〔C-11〕',
                'State budget figures covering general public transport operations in South East Queensland. [C-11]'])
          ]
        }
      }[i] || {};
      const paragraphs = chapter.body.split('\n\n');
      if (paragraphs.length !== paragraphCounts[i]) {
        console.error('Chapter ' + (i + 1) + ' has ' + paragraphs.length + ' paragraphs; figure positions assume ' + paragraphCounts[i] + '.');
      }
      if (i === 3) {
        // Q89: the projects in chapter 4 are on the chapter 2 corridor map.
        const pointer = node('p');
        pointer.append(t(['這幾項工程的位置，見第 2 章的', 'The ']),
          link(t(['走廊地圖', 'corridor map']), '#corridor-map'),
          t(['。', ' in Chapter 2 shows where these projects are.']));
        section.append(pointer);
      }
      paragraphs.forEach((paragraph, p) => {
        prose(section, paragraph);
        if (figuresAfter[p]) section.append(...figuresAfter[p]());
      });
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
