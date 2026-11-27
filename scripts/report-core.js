(function () {
  "use strict";

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

  function renderTimeline(items, t) {
    var tl = el("div", { class: "timeline" });
    items.forEach(function (it) {
      var item = el("div", { class: "tl-item" + (it.dim ? " dim" : "") });
      item.appendChild(el("div", { class: "tl-date", html: t(it.date) }));
      item.appendChild(el("h5", { html: t(it.title) }));
      if (it.body) item.appendChild(el("p", { html: t(it.body) }));
      tl.appendChild(item);
    });
    return tl;
  }

  function createCharts(t, isChinese, fleetUnit) {
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

    function isNum(v) {
      return typeof v === "number";
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

    // A bar's value label: its own `display` text when given (e.g. "18.3% · +41,494", or a
    // fixed number of decimals), otherwise the number plus the chart's suffix.
    function barValue(chart, d) {
      return d.display ? t(d.display) : fmtNum(d.value) + (chart.suffix || "");
    }

    // Horizontal bars, one series, drawn in data order (the data lists them top to bottom).
    function drawBarChart(chart, w, plot) {
      var data = chart.data;
      var labels = data.map(function (d) { return t(d.label); });
      var values = data.map(function (d) { return barValue(chart, d); });
      if (chart.labelsAboveWhenNarrow && w < NARROW) {
        drawBarChartLabelsAbove(chart, w, plot, labels, values);
        return;
      }
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

    // Opt-in narrow layout (chart.labelsAboveWhenNarrow): each name gets its own line above its bar,
    // so long value labels no longer squeeze the bars and names never wrap.
    function drawBarChartLabelsAbove(chart, w, plot, labels, values) {
      var data = chart.data;
      var barH = 14;
      var gap = 4;
      var rowH = FS_VAL + gap + barH + 12;
      var valueW = Math.max.apply(null, values.map(function (v) { return textW(v, FS_VAL, 700); })) + 8;
      var barMax = w - valueW;
      var max = Math.max.apply(null, data.map(function (d) { return d.value; }));
      var h = data.length * rowH;
      var svg = newSvg(w, h, chart);
      data.forEach(function (d, i) {
        var top = i * rowH;
        var barY = top + FS_VAL + gap;
        var barW = Math.max(2, max > 0 ? (d.value / max) * barMax : 0);
        addText(svg, labels[i], { class: "c-cat", x: 0, y: top + FS_VAL - 2, "font-size": FS_VAL, style: "fill:var(--color-text-soft)" });
        svg.appendChild(svgEl("rect", { x: 0, y: barY, width: barW, height: barH, rx: 3, style: "fill:var(--chart-1)" }));
        addText(svg, values[i], { class: "c-val", x: barW + 6, y: barY + barH / 2, dy: "0.35em", "font-size": FS_VAL, "font-weight": 700, style: "fill:var(--color-text)" });
      });
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
      // Opt-in: chartData.bands shades category ranges ({from, to, label}); their labels get a row above the plot.
      var bands = chartData.bands || [];
      var padX = 6, padTop = 26 + (bands.length ? FS_CAT + 6 : 0), padBottom = 28;
      // A null value is a category with no data for that series (e.g. not yet published): no dot, no label.
      var allVals = [];
      series.forEach(function (s) { allVals = allVals.concat(s.data.filter(isNum)); });
      var max = Math.max.apply(null, allVals) * 1.18;
      var min = Math.min(0, Math.min.apply(null, allVals));
      var stepX = (w - padX * 2) / (n - 1);
      var baseY = h - padBottom;
      function xFor(i) { return padX + i * stepX; }
      function yFor(v) { return baseY - ((v - min) / (max - min || 1)) * (baseY - padTop); }
      function anchorFor(i) { return i === 0 ? "start" : (i === n - 1 ? "end" : "middle"); }

      var svg = newSvg(w, h, chart);
      bands.forEach(function (b) {
        var x1 = Math.max(0, xFor(b.from) - stepX / 2);
        var x2 = Math.min(w, xFor(b.to) + stepX / 2);
        svg.appendChild(svgEl("rect", { class: "c-band", x: x1, y: padTop - FS_CAT - 10, width: x2 - x1, height: baseY - padTop + FS_CAT + 10, style: "fill:var(--color-border)" }));
        // Keep the label inside the chart when a band sits at either edge (narrow screens clipped it).
        var half = textW(t(b.label), FS_CAT) / 2 + 2;
        var labelX = Math.min(Math.max((x1 + x2) / 2, half), w - half);
        addText(svg, t(b.label), { class: "c-cat", x: labelX, y: padTop - FS_CAT, "text-anchor": "middle", "font-size": FS_CAT, style: "fill:var(--color-text-soft)" });
      });
      svg.appendChild(svgEl("line", { x1: padX, y1: baseY, x2: w - padX, y2: baseY, style: "stroke:var(--color-border-soft)", "stroke-width": 1 }));
      var cross = svgEl("line", { class: "c-cross", x1: 0, y1: padTop - 8, x2: 0, y2: baseY, style: "stroke:var(--color-text-soft)", "stroke-width": 1, "stroke-dasharray": "3 3", visibility: "hidden" });
      svg.appendChild(cross);

      series.forEach(function (s) {
        // Consecutive values form one line; a null breaks it.
        var run = [];
        s.data.concat([null]).forEach(function (v, i) {
          if (isNum(v)) { run.push(xFor(i) + "," + yFor(v)); return; }
          if (run.length > 1) svg.appendChild(svgEl("polyline", { points: run.join(" "), fill: "none", style: "stroke:var(" + s.colorVar + ")", "stroke-width": 2.5, "stroke-linejoin": "round" }));
          run = [];
        });
        s.data.forEach(function (v, i) {
          if (isNum(v)) svg.appendChild(svgEl("circle", { cx: xFor(i), cy: yFor(v), r: 3, style: "fill:var(" + s.colorVar + ")" }));
        });
      });

      // Value labels are drawn after every line and dot so no line runs through a number.
      var placed = [];
      series.forEach(function (s, si) {
        // Label the series' first + last values always; label the low point only for single-series charts
        // (avoids overlapping labels when series share a near-zero minimum).
        var known = s.data.map(function (v, i) { return isNum(v) ? i : -1; }).filter(function (i) { return i >= 0; });
        var minIdx = s.data.indexOf(Math.min.apply(null, s.data.filter(isNum)));
        var labelIdxs = [known[0], known[known.length - 1]];
        if (series.length === 1 && labelIdxs.indexOf(minIdx) === -1) labelIdxs.push(minIdx);
        // Opt-in: chartData.labelAt lists extra category indexes whose values the text relies on.
        (chartData.labelAt || []).forEach(function (i) { if (i > 0 && i < n - 1 && isNum(s.data[i]) && labelIdxs.indexOf(i) === -1) labelIdxs.push(i); });
        labelIdxs.forEach(function (i) {
          var v = s.data[i];
          var y = yFor(v);
          var isBelow = series.length === 1 && i === minIdx && n > 3;
          // With several series, when another series' point here is close (within two label heights)
          // and higher, this label goes below its point so the two labels don't overlap.
          if (series.length > 1) {
            isBelow = series.some(function (o, oi) {
              if (oi === si || !isNum(o.data[i])) return false;
              var ov = o.data[i];
              return Math.abs(yFor(ov) - y) < FS_VAL * 2 && (ov > v || (ov === v && oi < si));
            });
            // A point this close to the axis has no room below without running into the category
            // labels; go back above when the higher point leaves at least one label height.
            if (isBelow && y + FS_VAL + 6 > baseY) {
              isBelow = !series.every(function (o, oi) {
                return oi === si || !isNum(o.data[i]) || y - yFor(o.data[i]) >= FS_VAL + 4 || yFor(o.data[i]) >= y;
              });
            }
          }
          var str = fmtNum(v) + suffix;
          var lw = textW(str, FS_VAL, 700);
          // A line that stops early (later values null) labels its last value like a line end.
          var a = i === known[known.length - 1] ? "end" : (i === known[0] ? "start" : anchorFor(i));
          var left = a === "start" ? xFor(i) : (a === "end" ? xFor(i) - lw : xFor(i) - lw / 2);
          function boxAt(below) {
            var base = below ? y + FS_VAL + 6 : y - 9;
            return { l: left, r: left + lw, t: base - FS_VAL, b: base };
          }
          function hits(box) {
            return placed.some(function (p) { return box.l < p.r + 2 && p.l < box.r + 2 && box.t < p.b && p.t < box.b; });
          }
          // A label that would cover one already placed at a neighboring category (close values on a
          // narrow plot) moves to the other side of its point when that side is free and clear of the axis.
          if (hits(boxAt(isBelow)) && !hits(boxAt(!isBelow)) && (isBelow || y + FS_VAL + 6 <= baseY)) isBelow = !isBelow;
          placed.push(boxAt(isBelow));
          addText(svg, str, { class: "c-val", x: xFor(i), y: isBelow ? y + FS_VAL + 6 : y - 9, "text-anchor": a, "font-size": FS_VAL, "font-weight": 700, style: "fill:var(--color-text)" });
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
          row.appendChild(el("b", {}, [document.createTextNode(isNum(s.data[i]) ? fmtNum(s.data[i]) + suffix : "—")]));
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
      return isChinese() ? (n / 10000).toFixed(digits) + "萬" : Math.round(n / 1000) + "k";
    }

    // Vertical stacked columns, each centered in an equal slot so its labels never pass the
    // chart edge. Totals and category names shrink to fit the slot: the unit after totals
    // goes first, then the font steps down, then the number is shortened; long group names
    // switch to their shortLabel.
    function drawStackedChart(chart, w, plot) {
      var chartData = chart.data;
      var groups = chartData.groups;
      var n = groups.length;
      var unit = chartData.unit ? t(chartData.unit) : fleetUnit();
      var h = w < NARROW ? 200 : 220;
      var padTop = 28, padBottom = 28;
      var baseY = h - padBottom;
      var slot = w / n;
      // Percent columns are narrower so a segment too short for its label can carry it on the right.
      var barW = Math.min(110, slot * (chartData.percent ? 0.4 : 0.7));
      var room = slot - 4; // labels are centered in their slots, so the slots keep them apart
      // Percent mode: segments are shares that add up to 100, so every column is the same
      // height; each segment carries its share and the column top keeps the group total.
      var percent = !!chartData.percent;
      var max = (percent ? 100 : Math.max.apply(null, groups.map(function (g) { return g.total; }))) * 1.15;

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
        var outsideY = null;
        g.segments.forEach(function (seg) {
          var segH = (seg.value / max) * (baseY - padTop);
          yCursor -= segH;
          // A 2px stroke in the card colour leaves a gap between stacked segments (C.9 #4).
          if (segH > 0) svg.appendChild(svgEl("rect", { x: x, y: yCursor, width: barW, height: segH, style: "fill:var(" + seg.colorVar + ");stroke:var(--color-surface-soft)", "stroke-width": 2 }));
          if (percent && seg.value > 0) {
            var inside = segH >= FS_CAT + 4;
            var labelY = yCursor + segH / 2;
            // Outside labels stack upward with the segments; keep each one a line above the last.
            if (!inside && outsideY !== null) labelY = Math.min(labelY, outsideY - (FS_CAT + 4));
            if (!inside) outsideY = labelY;
            addText(svg, fmtNum(seg.value) + "%", { class: "c-val", x: inside ? x + barW / 2 : x + barW + 4, y: labelY, dy: "0.35em", "text-anchor": inside ? "middle" : "start", "font-size": FS_CAT, "font-weight": 700, style: "fill:var(--color-text)" });
          }
        });
        // The column total sits above the bar; an outside share label near the top pushes it up a little.
        var totalY = yCursor - 9;
        if (outsideY !== null) totalY = Math.min(totalY, outsideY - FS_CAT / 2 - 6);
        addText(svg, totals[i], { class: "c-val", x: x + barW / 2, y: totalY, "text-anchor": "middle", "font-size": totalSize, "font-weight": 800, style: "fill:var(--color-text)" });
        addText(svg, names[i], { class: "c-cat", x: x + barW / 2, y: baseY + 18, "text-anchor": "middle", "font-size": FS_CAT, style: "fill:var(--color-text-soft)" });
      });
      plot.appendChild(svg);
    }

    // The chart's accessible name: its title, then every number it shows.
    function chartSummary(chart) {
      var zh = isChinese();
      var sep = zh ? "、" : ", ";
      var title = t(chart.title).replace(/<[^>]+>/g, "");
      var suffix = chart.suffix || "";
      var parts;
      if (chart.type === "bar") {
        parts = [chart.data.map(function (d) { return t(d.label) + " " + barValue(chart, d); }).join(sep)];
      } else if (chart.type === "line") {
        var series = chart.data.series || [{ data: chart.data.data }];
        parts = series.map(function (s) {
          var pts = s.data.map(function (v, i) { return isNum(v) ? t(chart.data.categories[i]) + " " + fmtNum(v) + suffix : null; })
            .filter(function (p) { return p !== null; }).join(sep);
          return s.label ? t(s.label) + (zh ? "：" : ": ") + pts : pts;
        });
      } else {
        var unit = chart.data.unit ? t(chart.data.unit) : fleetUnit();
        parts = chart.data.groups.map(function (g) {
          var segs = g.segments.filter(function (s) { return s.value > 0; })
            .map(function (s) { return t(s.label) + " " + fmtNum(s.value) + (chart.data.percent ? "%" : ""); }).join(sep);
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


    function clear() {
      plots.forEach(function (p) { if (observer) observer.unobserve(p.node); });
      plots = [];
    }

    return { build: buildChartCard, draw: drawCharts, clear: clear };
  }

  window.ReportCore = { el: el, renderTimeline: renderTimeline, createCharts: createCharts };
}());
