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

  var el = ReportCore.el;
  var charts = ReportCore.createCharts(t, function () { return currentLang === "zh"; },
    function () { return t(UI.fleetUnit); });

  /* ============ SECTION RENDER ============ */

  function renderBox(b) {
    var box = el("div", { class: "box " + b.type });
    box.appendChild(el("h4", { html: t(b.title) }));
    box.appendChild(el("p", { html: t(b.body) }));
    return box;
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
      section.appendChild(charts.build(c));
      if (c.sourceNote) section.appendChild(el("p", { class: "src-note", html: t(c.sourceNote) }));
    });

    if (story.timeline) section.appendChild(ReportCore.renderTimeline(story.timeline, t));
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
    charts.clear();

    var chaptersEl = document.getElementById("chapters");
    chaptersEl.innerHTML = "";
    D.STORIES.forEach(function (s, i) {
      if (i > 0) chaptersEl.appendChild(renderDivider("✈ " + (i + 1 < 10 ? "0" : "") + (i + 1)));
      chaptersEl.appendChild(renderStory(s, i));
    });
    chaptersEl.appendChild(renderDivider(t(UI.dividerConclusion)));
    chaptersEl.appendChild(renderConclusion());
    // Plots have a width only once they are in the page.
    charts.draw(true);

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
