(function () {
  "use strict";

  var D = window.STARLUX_REPORT_DATA;
  var UI = D.UI;

  /* ============ LANGUAGE STATE ============ */
  /* site.js owns the language (URL, memory, browser; archive/2026-10-style-plan/STYLE-PLAN.md D5) and the
     toggle buttons. The report data is keyed zh / en, so map zh-TW to zh. */

  function dataLang(lang) {
    return lang === "en" ? "en" : "zh";
  }

  var currentLang = dataLang(Site.getLang());

  // "阿星 (Lorn)" back to the homepage (archive/2026-10-style-plan/STYLE-PLAN.md D6).
  var BRAND = {
    zh: { brandEn: "", homeTitle: "回到首頁" },
    en: { brandEn: " (Lorn)", homeTitle: "Back to home" }
  };

  function t(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    if (typeof field === "number") return String(field);
    return field[currentLang] != null ? field[currentLang] : field.zh;
  }

  /* ============ DOM HELPERS ============ */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "html") node.innerHTML = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    return node;
  }

  function fmtNum(n) {
    return n.toLocaleString("en-US");
  }

  /* ============ SVG CHART BUILDERS ============ */
  /* Charts are drawn at the plot's real width in CSS px, not on a fixed canvas
     scaled down, so chart text is true type-scale px on every screen; they are
     redrawn when that width changes (DESIGN.md, Charts). Colors are set via
     style="fill/stroke:var(--token)" so they follow the theme without a redraw.
     Value labels use text ink, never the series color (archive/2026-10-style-plan/STYLE-PLAN.md C.9 #4). */

  var FS_VAL = 13, FS_CAT = 12, FS_TOTAL = 14; // --fs-xs, --fs-2xs, --fs-sm
  var NARROW = 480; // below this the plots are shorter
  var LABEL_GAP = 10; // minimum space between two labels

  var measureCtx = document.createElement("canvas").getContext("2d");
  var fontFamily = "sans-serif";

  function textW(str, size, weight) {
    measureCtx.font = (weight || 400) + " " + size + "px " + fontFamily;
    return measureCtx.measureText(str).width;
  }

  function addText(svg, str, attrs) {
    var node = svgEl("text", attrs);
    node.textContent = str;
    svg.appendChild(node);
    return node;
  }

  function newSvg(w, h, chart) {
    return svgEl("svg", { viewBox: "0 0 " + w + " " + h, width: w, height: h, role: "img", "aria-label": chartSummary(chart) });
  }

  // Greedy word wrap for horizontal-bar labels (English names can be long; Chinese ones fit on one line).
  function wrapLabel(str, maxW, size) {
    var words = str.split(" ");
    var lines = [];
    var line = "";
    words.forEach(function (word) {
      var next = line ? line + " " + word : word;
      if (line && textW(next, size) > maxW) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    lines.push(line);
    return lines;
  }

  // Horizontal bars, one series, drawn in data order (the data lists them top to bottom).
  function drawBarChart(chart, w, plot) {
    var data = chart.data;
    var suffix = chart.suffix || "";
    var labels = data.map(function (d) { return t(d.label); });
    var values = data.map(function (d) { return fmtNum(d.value) + suffix; });
    var labelMax = Math.max.apply(null, labels.map(function (l) { return textW(l, FS_VAL); }));
    var labelW = Math.min(w * 0.42, labelMax) + 10;
    var wrapped = labels.map(function (l) { return wrapLabel(l, labelW - 10, FS_VAL); });
    var lineH = FS_VAL + 3;
    var rowH = Math.max.apply(null, wrapped.map(function (ls) { return ls.length; })) > 1 ? 40 : 30;
    var barH = 16;
    var valueW = Math.max.apply(null, values.map(function (v) { return textW(v, FS_VAL, 700); })) + 8;
    var barMax = w - labelW - valueW;
    var max = Math.max.apply(null, data.map(function (d) { return d.value; }));
    var h = data.length * rowH;
    var svg = newSvg(w, h, chart);

    data.forEach(function (d, i) {
      var mid = i * rowH + rowH / 2;
      var barW = Math.max(2, max > 0 ? (d.value / max) * barMax : 0);
      svg.appendChild(svgEl("rect", { x: labelW, y: mid - barH / 2, width: barW, height: barH, rx: 3, style: "fill:var(--chart-1)" }));
      var lbl = addText(svg, "", { class: "c-cat", x: labelW - 8, y: mid, "text-anchor": "end", "font-size": FS_VAL, style: "fill:var(--color-text-soft)" });
      var lines = wrapped[i];
      lines.forEach(function (line, li) {
        var span = svgEl("tspan", { x: labelW - 8, y: mid + (li - (lines.length - 1) / 2) * lineH, dy: "0.35em" });
        span.textContent = line;
        lbl.appendChild(span);
      });
      addText(svg, values[i], { class: "c-val", x: labelW + barW + 6, y: mid, dy: "0.35em", "font-size": FS_VAL, "font-weight": 700, style: "fill:var(--color-text)" });
    });
    svg.appendChild(svgEl("line", { x1: labelW, y1: 0, x2: labelW, y2: h, style: "stroke:var(--color-border)", "stroke-width": 1 }));
    plot.appendChild(svg);
  }

  // Which category labels to show: the fewest skipped that still leaves LABEL_GAP between neighbors.
  // The first and last are always shown.
  function visibleCategories(names, xFor, anchorFor) {
    var n = names.length;
    function extent(i) {
      var cw = textW(names[i], FS_CAT);
      var x = xFor(i);
      var a = anchorFor(i);
      return a === "start" ? [x, x + cw] : a === "end" ? [x - cw, x] : [x - cw / 2, x + cw / 2];
    }
    for (var step = 1; step < n; step++) {
      var shown = [];
      for (var i = 0; i < n - 1; i += step) shown.push(i);
      while (shown.length > 1 && extent(shown[shown.length - 1])[1] + LABEL_GAP > extent(n - 1)[0]) shown.pop();
      shown.push(n - 1);
      var ok = shown.every(function (idx, k) {
        return k === 0 || extent(shown[k - 1])[1] + LABEL_GAP <= extent(idx)[0];
      });
      if (ok) return shown;
    }
    return [0, n - 1];
  }

  function drawLineChart(chart, w, plot) {
    var chartData = chart.data;
    var series = chartData.series || [{ label: chart.title, colorVar: "--chart-1", data: chartData.data }];
    var names = chartData.categories.map(t);
    var suffix = chart.suffix || "";
    var n = names.length;
    var h = w < NARROW ? 200 : 220;
    var padX = 6, padTop = 26, padBottom = 28;
    var allVals = [];
    series.forEach(function (s) { allVals = allVals.concat(s.data); });
    var max = Math.max.apply(null, allVals) * 1.18;
    var min = Math.min(0, Math.min.apply(null, allVals));
    var stepX = (w - padX * 2) / (n - 1);
    var baseY = h - padBottom;
    function xFor(i) { return padX + i * stepX; }
    function yFor(v) { return baseY - ((v - min) / (max - min || 1)) * (baseY - padTop); }
    function anchorFor(i) { return i === 0 ? "start" : (i === n - 1 ? "end" : "middle"); }

    var svg = newSvg(w, h, chart);
    svg.appendChild(svgEl("line", { x1: padX, y1: baseY, x2: w - padX, y2: baseY, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));
    var cross = svgEl("line", { class: "c-cross", x1: 0, y1: padTop - 8, x2: 0, y2: baseY, style: "stroke:var(--color-text-soft)", "stroke-width": 1, "stroke-dasharray": "3 3", visibility: "hidden" });
    svg.appendChild(cross);

    series.forEach(function (s) {
      var pts = s.data.map(function (v, i) { return xFor(i) + "," + yFor(v); }).join(" ");
      svg.appendChild(svgEl("polyline", { points: pts, fill: "none", style: "stroke:var(" + s.colorVar + ")", "stroke-width": 2.5, "stroke-linejoin": "round" }));
      s.data.forEach(function (v, i) {
        svg.appendChild(svgEl("circle", { cx: xFor(i), cy: yFor(v), r: 3, style: "fill:var(" + s.colorVar + ")" }));
      });
    });

    // Value labels are drawn after every line and dot so no line runs through a number.
    series.forEach(function (s, si) {
      // Label first + last always; label the low point only for single-series charts
      // (avoids overlapping labels when series share a near-zero minimum).
      var minIdx = s.data.indexOf(Math.min.apply(null, s.data));
      var labelIdxs = [0, n - 1];
      if (series.length === 1 && labelIdxs.indexOf(minIdx) === -1) labelIdxs.push(minIdx);
      labelIdxs.forEach(function (i) {
        var v = s.data[i];
        var y = yFor(v);
        var isBelow = series.length === 1 && i === minIdx && n > 3;
        // With several series, when another series' point here is close (within two label heights)
        // and higher, this label goes below its point so the two labels don't overlap.
        if (series.length > 1) {
          isBelow = series.some(function (o, oi) {
            if (oi === si) return false;
            var ov = o.data[i];
            return Math.abs(yFor(ov) - y) < FS_VAL * 2 && (ov > v || (ov === v && oi < si));
          });
        }
        addText(svg, fmtNum(v) + suffix, { class: "c-val", x: xFor(i), y: isBelow ? y + FS_VAL + 6 : y - 9, "text-anchor": anchorFor(i), "font-size": FS_VAL, "font-weight": 700, style: "fill:var(--color-text)" });
      });
    });

    visibleCategories(names, xFor, anchorFor).forEach(function (i) {
      addText(svg, names[i], { class: "c-cat", x: xFor(i), y: baseY + 18, "text-anchor": anchorFor(i), "font-size": FS_CAT, style: "fill:var(--color-text-soft)" });
    });

    plot.appendChild(svg);
    addLineTooltip(plot, svg, cross, series, names, suffix, xFor, stepX, w, h);
  }

  // Hover (mouse) or tap (touch) shows a crosshair and every series' value at the nearest category.
  // Keyboard and screen-reader users get the same numbers from the chart's aria-label.
  function addLineTooltip(plot, svg, cross, series, names, suffix, xFor, stepX, w, h) {
    var tip = el("div", { class: "chart-tip", "aria-hidden": "true" });
    tip.hidden = true;
    plot.appendChild(tip);
    var hit = svgEl("rect", { class: "c-hit", x: 0, y: 0, width: w, height: h, fill: "transparent" });
    svg.appendChild(hit);

    function show(evt) {
      var box = svg.getBoundingClientRect();
      var x = (evt.clientX - box.left) * (w / box.width);
      var i = Math.max(0, Math.min(names.length - 1, Math.round((x - xFor(0)) / stepX)));
      var cx = xFor(i);
      cross.setAttribute("x1", cx);
      cross.setAttribute("x2", cx);
      cross.setAttribute("visibility", "visible");
      tip.innerHTML = "";
      tip.appendChild(el("div", { class: "tip-cat" }, [document.createTextNode(names[i])]));
      series.forEach(function (s) {
        var row = el("div", { class: "tip-row" });
        if (series.length > 1) {
          var sw = el("span", { class: "sw" });
          sw.style.background = "var(" + s.colorVar + ")";
          row.appendChild(sw);
          row.appendChild(document.createTextNode(t(s.label) + " "));
        }
        row.appendChild(el("b", {}, [document.createTextNode(fmtNum(s.data[i]) + suffix)]));
        tip.appendChild(row);
      });
      tip.hidden = false;
      var px = cx * (box.width / w);
      var tw = tip.offsetWidth;
      var left = px + 10 + tw <= box.width ? px + 10 : px - 10 - tw;
      tip.style.left = Math.max(0, left) + "px";
      if (openTip && openTip.plot !== plot) openTip.hide();
      openTip = { plot: plot, hide: hide };
    }
    function hide() {
      tip.hidden = true;
      cross.setAttribute("visibility", "hidden");
    }
    hit.addEventListener("pointermove", show);
    hit.addEventListener("pointerdown", show);
    hit.addEventListener("pointerleave", function (evt) { if (evt.pointerType === "mouse") hide(); });
  }

  // A tapped tooltip stays until the reader taps somewhere else.
  var openTip = null;
  document.addEventListener("pointerdown", function (evt) {
    if (openTip && !openTip.plot.contains(evt.target)) {
      openTip.hide();
      openTip = null;
    }
  });

  // Short form for totals that don't fit a narrow column: 22.0萬 / 220k, then 22萬.
  function compactNum(n, digits) {
    return currentLang === "zh" ? (n / 10000).toFixed(digits) + "萬" : Math.round(n / 1000) + "k";
  }

  // Vertical stacked columns, each centered in an equal slot so its labels never pass the
  // chart edge. Totals and category names shrink to fit the slot: the unit after totals
  // goes first, then the font steps down, then the number is shortened; long group names
  // switch to their shortLabel.
  function drawStackedChart(chart, w, plot) {
    var chartData = chart.data;
    var groups = chartData.groups;
    var n = groups.length;
    var unit = chartData.unit ? t(chartData.unit) : t(UI.fleetUnit);
    var h = w < NARROW ? 200 : 220;
    var padTop = 28, padBottom = 28;
    var baseY = h - padBottom;
    var slot = w / n;
    var barW = Math.min(110, slot * 0.7);
    var room = slot - 4; // labels are centered in their slots, so the slots keep them apart
    var max = Math.max.apply(null, groups.map(function (g) { return g.total; })) * 1.15;

    function fitsAll(texts, size, weight) {
      return texts.every(function (s) { return textW(s, size, weight) <= room; });
    }
    var withUnit = groups.map(function (g) { return fmtNum(g.total) + " " + unit; });
    var bare = groups.map(function (g) { return fmtNum(g.total); });
    var short1 = groups.map(function (g) { return g.total >= 10000 ? compactNum(g.total, 1) : fmtNum(g.total); });
    var short0 = groups.map(function (g) { return g.total >= 10000 ? compactNum(g.total, 0) : fmtNum(g.total); });
    var totals = withUnit;
    var totalSize = FS_TOTAL;
    [[withUnit, FS_TOTAL], [bare, FS_TOTAL], [bare, FS_VAL], [bare, FS_CAT], [short1, FS_CAT], [short0, FS_CAT]].some(function (opt) {
      totals = opt[0];
      totalSize = opt[1];
      return fitsAll(opt[0], opt[1], 800);
    });
    var names = groups.map(function (g) { return t(g.label); });
    if (!fitsAll(names, FS_CAT)) names = groups.map(function (g) { return t(g.shortLabel || g.label); });

    var svg = newSvg(w, h, chart);
    svg.appendChild(svgEl("line", { x1: 0, y1: baseY, x2: w, y2: baseY, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));
    groups.forEach(function (g, i) {
      var x = i * slot + (slot - barW) / 2;
      var yCursor = baseY;
      g.segments.forEach(function (seg) {
        var segH = (seg.value / max) * (baseY - padTop);
        yCursor -= segH;
        // A 2px stroke in the card colour leaves a gap between stacked segments (C.9 #4).
        if (segH > 0) svg.appendChild(svgEl("rect", { x: x, y: yCursor, width: barW, height: segH, style: "fill:var(" + seg.colorVar + ");stroke:var(--color-surface-soft)", "stroke-width": 2 }));
      });
      addText(svg, totals[i], { class: "c-val", x: x + barW / 2, y: yCursor - 9, "text-anchor": "middle", "font-size": totalSize, "font-weight": 800, style: "fill:var(--color-text)" });
      addText(svg, names[i], { class: "c-cat", x: x + barW / 2, y: baseY + 18, "text-anchor": "middle", "font-size": FS_CAT, style: "fill:var(--color-text-soft)" });
    });
    plot.appendChild(svg);
  }

  // The chart's accessible name: its title, then every number it shows.
  function chartSummary(chart) {
    var zh = currentLang === "zh";
    var sep = zh ? "、" : ", ";
    var title = t(chart.title).replace(/<[^>]+>/g, "");
    var suffix = chart.suffix || "";
    var parts;
    if (chart.type === "bar") {
      parts = [chart.data.map(function (d) { return t(d.label) + " " + fmtNum(d.value) + suffix; }).join(sep)];
    } else if (chart.type === "line") {
      var series = chart.data.series || [{ data: chart.data.data }];
      parts = series.map(function (s) {
        var pts = s.data.map(function (v, i) { return t(chart.data.categories[i]) + " " + fmtNum(v) + suffix; }).join(sep);
        return s.label ? t(s.label) + (zh ? "：" : ": ") + pts : pts;
      });
    } else {
      var unit = chart.data.unit ? t(chart.data.unit) : t(UI.fleetUnit);
      parts = chart.data.groups.map(function (g) {
        var segs = g.segments.filter(function (s) { return s.value > 0; })
          .map(function (s) { return t(s.label) + " " + fmtNum(s.value); }).join(sep);
        return t(g.label) + " " + fmtNum(g.total) + " " + unit + (zh ? "（" + segs + "）" : " (" + segs + ")");
      });
    }
    return title + (zh ? "。" : ". ") + parts.join(zh ? "；" : "; ");
  }

  /* Every chart on the page, redrawn when its plot changes width. */
  var plots = [];
  var resizeTimer = null;
  var observer = window.ResizeObserver ? new ResizeObserver(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { drawCharts(false); }, 150);
  }) : null;

  function drawCharts(force, fixedWidth) {
    fontFamily = getComputedStyle(document.body).fontFamily;
    plots.forEach(function (p) {
      var w = fixedWidth || Math.floor(p.node.clientWidth);
      if (!w || (w === p.width && !force)) return;
      p.width = w;
      p.node.innerHTML = "";
      if (p.chart.type === "bar") drawBarChart(p.chart, w, p.node);
      else if (p.chart.type === "line") drawLineChart(p.chart, w, p.node);
      else if (p.chart.type === "stacked") drawStackedChart(p.chart, w, p.node);
    });
  }

  if (!observer) window.addEventListener("resize", function () { drawCharts(false); });
  // The print layout can't be measured before printing, so print draws every chart at about
  // the A4 plot width and CSS stretches it to the page; the screen size comes back afterwards.
  var PRINT_WIDTH = 620;
  window.addEventListener("beforeprint", function () { drawCharts(true, PRINT_WIDTH); });
  window.addEventListener("afterprint", function () { drawCharts(true); });
  // Text is measured to place labels; measure again once the web fonts are in.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { drawCharts(true); });

  function buildChartCard(chart) {
    var card = el("div", { class: "chart-card" });
    card.appendChild(el("div", { class: "chart-title", html: t(chart.title) }));
    var plot = el("div", { class: "chart-plot" });
    card.appendChild(plot);
    plots.push({ node: plot, chart: chart, width: 0 });
    if (observer) observer.observe(plot);

    var legendItems = chart.type === "stacked" ? chart.data.legend
      : (chart.type === "line" && chart.data.series && chart.data.series.length > 1 ? chart.data.series : null);
    if (legendItems) {
      var legend = el("div", { class: "chart-legend" });
      legendItems.forEach(function (s) {
        var item = el("span", {});
        var sw = el("span", { class: "sw" });
        sw.style.background = "var(" + s.colorVar + ")";
        item.appendChild(sw);
        item.appendChild(document.createTextNode(t(s.label)));
        legend.appendChild(item);
      });
      card.appendChild(legend);
    }
    return card;
  }

  /* ============ SECTION RENDER ============ */

  function renderBox(b) {
    var box = el("div", { class: "box " + b.type });
    box.appendChild(el("h4", { html: t(b.title) }));
    box.appendChild(el("p", { html: t(b.body) }));
    return box;
  }

  function renderTimeline(items) {
    var tl = el("div", { class: "timeline" });
    items.forEach(function (it) {
      var item = el("div", { class: "tl-item" + (it.dim ? " dim" : "") });
      item.appendChild(el("div", { class: "tl-date", html: t(it.date) }));
      item.appendChild(el("h5", { html: t(it.title) }));
      item.appendChild(el("p", { html: t(it.body) }));
      tl.appendChild(item);
    });
    return tl;
  }

  function renderPillars(pillars) {
    var wrap = el("div", { class: "pillars" });
    pillars.forEach(function (p, i) {
      var card = el("div", { class: "pillar" });
      card.appendChild(el("div", { class: "p-num", html: "0" + (i + 1) }));
      card.appendChild(el("h4", { html: t(p.title) }));
      card.appendChild(el("p", { html: t(p.body) }));
      wrap.appendChild(card);
    });
    return wrap;
  }

  function renderRiskList(risks) {
    var wrap = el("div", { class: "risk-list" });
    risks.forEach(function (r) {
      var row = el("div", { class: "risk-row" });
      row.appendChild(el("span", { class: "pill " + r.pill, html: t(D.PILL_LABEL[r.pill]) }));
      row.appendChild(el("p", { html: t(r.text) }));
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderStory(story, index) {
    var section = el("section", { class: "story", id: story.id });
    var numStr = String(index + 1);
    section.appendChild(el("span", { class: "kicker" }, [
      el("span", { class: "k-num", html: numStr.length < 2 ? "0" + numStr : numStr }),
      el("span", { html: t(story.kicker) })
    ]));
    section.appendChild(el("h2", { html: t(story.headline) }));

    if (story.stat) {
      section.appendChild(el("div", { class: "stat" }, [
        el("span", { class: "stat-value", html: t(story.stat.value) }),
        el("span", { class: "stat-label", html: t(story.stat.label) })
      ]));
    }

    if (story.statGrid) {
      var grid = el("div", { class: "stat-grid" });
      story.statGrid.forEach(function (s) {
        grid.appendChild(el("div", { class: "stat-cell" }, [
          el("span", { class: "n", html: t(s.n) }),
          el("span", { class: "l", html: t(s.l) })
        ]));
      });
      section.appendChild(grid);
    }

    (story.body || []).forEach(function (p) {
      section.appendChild(el("p", { class: "body-text", html: t(p) }));
    });

    if (story.sourceNote) section.appendChild(el("p", { class: "src-note", html: t(story.sourceNote) }));

    [story.chart, story.chart2].forEach(function (c) {
      if (!c) return;
      section.appendChild(buildChartCard(c));
      if (c.sourceNote) section.appendChild(el("p", { class: "src-note", html: t(c.sourceNote) }));
    });

    if (story.timeline) section.appendChild(renderTimeline(story.timeline));
    if (story.pillars) section.appendChild(renderPillars(story.pillars));

    (story.boxes || []).forEach(function (b) { section.appendChild(renderBox(b)); });

    if (story.riskList) section.appendChild(renderRiskList(story.riskList));

    return section;
  }

  function renderConclusion() {
    var section = el("section", { class: "story conclusion", id: "conclusion" });
    section.appendChild(el("span", { class: "kicker", style: "color:var(--color-secondary-strong)", html: t(UI.conclusionKicker) }));
    section.appendChild(el("h2", { html: t(UI.conclusionHeadline) }));
    var tldr = el("div", { class: "conclusion-tldr" });
    D.CONCLUSION_SUMMARY.forEach(function (s, i) {
      var item = el("div", { class: "tldr-item" });
      item.appendChild(el("span", { class: "tldr-num", html: String(i + 1) }));
      item.appendChild(el("span", { class: "tldr-text", html: t(s) }));
      tldr.appendChild(item);
    });
    section.appendChild(tldr);
    D.CONCLUSION_STEPS.forEach(function (s, i) {
      var step = el("div", { class: "conclusion-step" });
      step.appendChild(el("div", { class: "cs-num", html: String(i + 1) }));
      var body = el("div", {});
      body.appendChild(el("h5", { html: t(s.title) }));
      body.appendChild(el("p", { html: t(s.body) }));
      step.appendChild(body);
      section.appendChild(step);
    });
    var note = el("div", { class: "author-note" });
    note.appendChild(el("span", { class: "author-note-label", html: t(UI.authorNoteLabel) }));
    note.appendChild(el("p", { html: t(D.AUTHOR_NOTE) }));
    section.appendChild(note);
    var note2 = el("div", { class: "author-note" });
    note2.appendChild(el("span", { class: "author-note-label", html: t(UI.authorNoteProcessLabel) }));
    note2.appendChild(el("p", { html: t(D.AUTHOR_NOTE_PROCESS) }));
    section.appendChild(note2);
    return section;
  }

  function renderDivider(tag) {
    return el("div", { class: "divider" }, [
      el("span", { class: "line" }),
      el("span", { class: "tag", html: tag }),
      el("span", { class: "line" })
    ]);
  }

  /* ============ TOP-LEVEL RENDER ============ */

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function render() {
    document.title = t(UI.docTitle);
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t(UI.metaDescription));

    setText("flightTag", t(UI.flightTag));
    setText("reportTitle", t(UI.reportTitle));
    setText("coreQuestion", t(UI.coreQuestion));
    setText("answerFirstLabel", t(UI.answerFirstLabel));
    setText("answerFirstText", t(UI.answerFirstText));
    setText("aboutLabel", t(UI.aboutLabel));
    setText("aboutText", t(UI.aboutText));
    setText("methodLabel", t(UI.methodLabel));
    setText("methodText", t(UI.methodText));
    setText("reportMeta", t(UI.reportMeta));
    setText("fullSourceSummary", t(UI.fullSourceSummary));
    setText("pendingSummary", t(UI.pendingSummary));
    setText("footerNote", t(UI.footerNote));

    // The old plots are about to be removed; stop watching them.
    plots.forEach(function (p) { if (observer) observer.unobserve(p.node); });
    plots = [];

    var chaptersEl = document.getElementById("chapters");
    chaptersEl.innerHTML = "";
    D.STORIES.forEach(function (s, i) {
      if (i > 0) chaptersEl.appendChild(renderDivider("✈ " + (i + 1 < 10 ? "0" : "") + (i + 1)));
      chaptersEl.appendChild(renderStory(s, i));
    });
    chaptersEl.appendChild(renderDivider(t(UI.dividerConclusion)));
    chaptersEl.appendChild(renderConclusion());
    // Plots have a width only once they are in the page.
    drawCharts(true);

    var sourceList = document.getElementById("sourceList");
    sourceList.innerHTML = "";
    D.SOURCES.forEach(function (s) {
      var li = document.createElement("li");
      li.innerHTML = '<a href="' + s.url + '" target="_blank" rel="noopener">' + t(s.title) + "</a>";
      sourceList.appendChild(li);
    });

    var pendingList = document.getElementById("pendingList");
    pendingList.innerHTML = "";
    D.PENDING.forEach(function (p) {
      var li = document.createElement("li");
      li.textContent = t(p);
      pendingList.appendChild(li);
    });

    setText("brandEn", BRAND[currentLang].brandEn);
    document.getElementById("homeLink").setAttribute("title", BRAND[currentLang].homeTitle);
  }

  Site.onLangChange(function (lang) {
    currentLang = dataLang(lang);
    render();
  });

  render();
})();
