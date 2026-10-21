(function () {
  "use strict";

  var D = window.STARLUX_REPORT_DATA;
  var UI = D.UI;

  /* ============ LANGUAGE STATE ============ */

  function detectInitialLang() {
    // 1) explicit ?lang=zh|en in the URL always wins, and is remembered for next visit
    try {
      var params = new URLSearchParams(window.location.search);
      var urlLang = params.get("lang");
      if (urlLang === "zh" || urlLang === "en") {
        try { localStorage.setItem("starlux-report-lang", urlLang); } catch (e2) { /* ignore */ }
        return urlLang;
      }
    } catch (e) { /* URLSearchParams unavailable — skip */ }

    // 2) a previously remembered choice (from the toggle button or a past ?lang= visit)
    try {
      var saved = localStorage.getItem("starlux-report-lang");
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) { /* localStorage unavailable (private mode etc.) */ }

    // 3) fall back to the browser's own display language
    try {
      var nav = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
      if (nav.indexOf("zh") === 0) return "zh";
      if (nav) return "en";
    } catch (e) { /* navigator unavailable */ }

    // 4) default
    return "zh";
  }

  var currentLang = detectInitialLang();

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
  /* Colors are set via style="fill/stroke:var(--token)" so they follow the
     prefers-color-scheme media query automatically — no redraw needed. */

  function buildBarChart(data, opts) {
    opts = opts || {};
    var w = 600, h = 220, padL = 6, padR = 6, padTop = 34, padBottom = 30;
    var n = data.length;
    var gap = 14;
    var barW = (w - padL - padR - gap * (n - 1)) / n;
    var max = Math.max.apply(null, data.map(function (d) { return d.value; })) * 1.2;
    var svg = svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": t(opts.title) });
    svg.appendChild(svgEl("line", { x1: padL, y1: h - padBottom, x2: w - padR, y2: h - padBottom, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));
    data.forEach(function (d, i) {
      var x = padL + i * (barW + gap);
      var barH = max > 0 ? (d.value / max) * (h - padTop - padBottom) : 0;
      var y = h - padBottom - barH;
      svg.appendChild(svgEl("rect", { x: x, y: y, width: barW, height: barH, rx: 3, style: "fill:var(" + (opts.colorVar || "--color-primary") + ")" }));
      var valText = svgEl("text", { class: "c-val", x: x + barW / 2, y: y - 8, "text-anchor": "middle", "font-size": 13.5, "font-weight": 700, style: "fill:var(--color-text)" });
      valText.textContent = fmtNum(d.value) + (opts.suffix || "");
      svg.appendChild(valText);
      var lbl = svgEl("text", { class: "c-cat", x: x + barW / 2, y: h - padBottom + 19, "text-anchor": "middle", "font-size": 13, style: "fill:var(--color-text-soft)" });
      lbl.textContent = t(d.label);
      svg.appendChild(lbl);
    });
    return svg;
  }

  function buildLineChart(chartData, opts) {
    opts = opts || {};
    var series = chartData.series || [{ label: opts.title, colorVar: opts.colorVar || "--color-primary", data: chartData.data }];
    var categories = chartData.categories;
    var w = 600, h = 220, padL = 30, padR = 30, padTop = 28, padBottom = 28;
    var allVals = [];
    series.forEach(function (s) { allVals = allVals.concat(s.data); });
    var max = Math.max.apply(null, allVals) * 1.18;
    var min = Math.min(0, Math.min.apply(null, allVals));
    var n = categories.length;
    var stepX = (w - padL - padR) / (n - 1);
    function xFor(i) { return padL + i * stepX; }
    function yFor(v) { return h - padBottom - ((v - min) / (max - min || 1)) * (h - padTop - padBottom); }
    function anchorFor(i) { return i === 0 ? "start" : (i === n - 1 ? "end" : "middle"); }

    var svg = svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": t(opts.title) });
    svg.appendChild(svgEl("line", { x1: padL, y1: h - padBottom, x2: w - padR, y2: h - padBottom, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));

    series.forEach(function (s) {
      var pts = s.data.map(function (v, i) { return xFor(i) + "," + yFor(v); }).join(" ");
      svg.appendChild(svgEl("polyline", { points: pts, fill: "none", style: "stroke:var(" + s.colorVar + ")", "stroke-width": 2.5, "stroke-linejoin": "round" }));
      s.data.forEach(function (v, i) {
        svg.appendChild(svgEl("circle", { cx: xFor(i), cy: yFor(v), r: 3, style: "fill:var(" + s.colorVar + ")" }));
      });
    });

    // Value labels are drawn after every line and dot so no line runs through a number.
    series.forEach(function (s) {
      // label first + last always; label the low point only for single-series charts (avoids overlapping labels when series share a near-zero minimum)
      var labelIdxs = [0, s.data.length - 1];
      if (series.length === 1) {
        var minIdx = s.data.indexOf(Math.min.apply(null, s.data));
        if (labelIdxs.indexOf(minIdx) === -1) labelIdxs.push(minIdx);
      }
      labelIdxs.forEach(function (i) {
        var v = s.data[i];
        var y = yFor(v);
        var isLow = series.length === 1 && v === Math.min.apply(null, s.data) && s.data.length > 3;
        // With several series, when another series' point at this position is very close (within 30 units) and
        // higher, this label goes below its point so the two labels don't sit on top of each other.
        var isBelow = isLow;
        if (series.length > 1) {
          var self = series.indexOf(s);
          isBelow = series.some(function (o, oi) {
            if (oi === self) return false;
            var ov = o.data[i];
            return Math.abs(yFor(ov) - y) < 30 && (ov > v || (ov === v && oi < self));
          });
        }
        var txt = svgEl("text", { class: isBelow ? "c-val c-val-below" : "c-val", x: xFor(i), y: isBelow ? y + 18 : y - 9, "text-anchor": anchorFor(i), "font-size": 13, "font-weight": 700, style: "fill:var(" + s.colorVar + ")" });
        txt.textContent = fmtNum(v) + (opts.suffix || "");
        svg.appendChild(txt);
      });
    });

    categories.forEach(function (c, i) {
      // With many categories, every other middle label is hidden on phones (.c-cat-alt) so they don't collide at the larger phone font size.
      var isAlt = n > 8 && i > 0 && i < n - 1 && i % 2 === 1;
      var txt = svgEl("text", { class: isAlt ? "c-cat c-cat-alt" : "c-cat", x: xFor(i), y: h - padBottom + 18, "text-anchor": anchorFor(i), "font-size": 12, style: "fill:var(--color-text-soft)" });
      txt.textContent = t(c);
      svg.appendChild(txt);
    });

    return svg;
  }

  function buildStackedChart(chartData, opts) {
    opts = opts || {};
    var w = 600, h = 220, padL = 10, padR = 10, padTop = 36, padBottom = 30;
    var groups = chartData.groups;
    var n = groups.length;
    var gap = chartData.gap || 100;
    var unit = chartData.unit ? t(chartData.unit) : t(UI.fleetUnit);
    var barW = (w - padL - padR - gap * (n - 1)) / n;
    var max = Math.max.apply(null, groups.map(function (g) { return g.total; })) * 1.2;
    var svg = svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": t(opts.title) });
    svg.appendChild(svgEl("line", { x1: padL, y1: h - padBottom, x2: w - padR, y2: h - padBottom, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));
    groups.forEach(function (g, i) {
      var x = padL + i * (barW + gap);
      var yCursor = h - padBottom;
      g.segments.forEach(function (seg) {
        var segH = (seg.value / max) * (h - padTop - padBottom);
        yCursor -= segH;
        if (segH > 0) svg.appendChild(svgEl("rect", { x: x, y: yCursor, width: barW, height: segH, style: "fill:var(" + seg.colorVar + ")" }));
      });
      var totalLabel = svgEl("text", { x: x + barW / 2, y: yCursor - 9, "text-anchor": "middle", "font-size": 15.5, "font-weight": 800, style: "fill:var(--color-text)" });
      if (chartData.unit) {
        // Charts with a unit (e.g. seats): the unit is a separate tspan so narrow screens can hide it.
        totalLabel.setAttribute("class", "lbl-total");
        totalLabel.appendChild(document.createTextNode(fmtNum(g.total)));
        var unitSpan = svgEl("tspan", { class: "lbl-unit" });
        unitSpan.textContent = " " + unit;
        totalLabel.appendChild(unitSpan);
      } else {
        totalLabel.setAttribute("class", "c-val");
        totalLabel.textContent = fmtNum(g.total) + " " + unit;
      }
      svg.appendChild(totalLabel);
      var lbl = svgEl("text", { x: x + barW / 2, y: h - padBottom + 20, "text-anchor": "middle", "font-size": 13, style: "fill:var(--color-text-soft)" });
      lbl.textContent = t(g.label);
      svg.appendChild(lbl);
      lbl.setAttribute("class", chartData.unit ? (g.shortLabel ? "lbl-full" : "lbl-plain") : "c-cat");
      if (g.shortLabel) {
        // Optional short label, swapped in by CSS on narrow screens (see .lbl-full / .lbl-short).
        var lblShort = svgEl("text", { x: x + barW / 2, y: h - padBottom + 20, "text-anchor": "middle", "font-size": 13, class: "lbl-short", style: "fill:var(--color-text-soft)" });
        lblShort.textContent = t(g.shortLabel);
        svg.appendChild(lblShort);
      }
    });
    return svg;
  }

  function buildChartCard(chart) {
    var card = el("div", { class: "chart-card" });
    card.appendChild(el("div", { class: "chart-title", html: t(chart.title) }));
    var svg;
    if (chart.type === "bar") svg = buildBarChart(chart.data, chart);
    else if (chart.type === "line") svg = buildLineChart(chart.data, chart);
    else if (chart.type === "stacked") svg = buildStackedChart(chart.data, chart);
    card.appendChild(svg);

    if (chart.type === "line" && chart.data.series && chart.data.series.length > 1) {
      var legend = el("div", { class: "chart-legend" });
      chart.data.series.forEach(function (s) {
        var item = el("span", {});
        var sw = el("span", { class: "sw" });
        sw.style.background = "var(" + s.colorVar + ")";
        item.appendChild(sw);
        item.appendChild(document.createTextNode(t(s.label)));
        legend.appendChild(item);
      });
      card.appendChild(legend);
    }
    if (chart.type === "stacked") {
      var legend2 = el("div", { class: "chart-legend" });
      chart.data.legend.forEach(function (s) {
        var item = el("span", {});
        var sw = el("span", { class: "sw" });
        sw.style.background = "var(" + s.colorVar + ")";
        item.appendChild(sw);
        item.appendChild(document.createTextNode(t(s.label)));
        legend2.appendChild(item);
      });
      card.appendChild(legend2);
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
    document.documentElement.lang = currentLang === "en" ? "en" : "zh-TW";
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

    var chaptersEl = document.getElementById("chapters");
    chaptersEl.innerHTML = "";
    D.STORIES.forEach(function (s, i) {
      if (i > 0) chaptersEl.appendChild(renderDivider("✈ " + (i + 1 < 10 ? "0" : "") + (i + 1)));
      chaptersEl.appendChild(renderStory(s, i));
    });
    chaptersEl.appendChild(renderDivider(t(UI.dividerConclusion)));
    chaptersEl.appendChild(renderConclusion());

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

    var toggle = document.getElementById("langToggle");
    toggle.textContent = t(UI.langToggleLabel);
    toggle.setAttribute("aria-label", t(UI.langToggleAria));
  }

  document.getElementById("langToggle").addEventListener("click", function () {
    currentLang = currentLang === "zh" ? "en" : "zh";
    try { localStorage.setItem("starlux-report-lang", currentLang); } catch (e) { /* ignore */ }
    render();
  });

  render();
})();
