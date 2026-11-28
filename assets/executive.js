/* Shared helpers for executive pages: badges, drill-down panel. Needs #drill markup on the page. */
(function () {
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  var BADGE = {
    g: "bg-[#f0fdf4] text-[#16a34a]",
    y: "bg-amber-50 text-amber-700",
    r: "bg-rose-50 text-rose-700",
    n: "bg-slate-100 text-slate-600",
  };
  var DOT = { g: "bg-emerald-500", y: "bg-amber-500", r: "bg-rose-500", n: "bg-slate-400" };

  function badge(tone, text) {
    return '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold whitespace-nowrap ' +
      BADGE[tone] + '">' + esc(text) + "</span>";
  }

  function pill(tone, text) {
    return '<span class="inline-flex items-center gap-1.5 text-[12px] whitespace-nowrap ' +
      (tone === "r" ? "text-rose-700 font-semibold" : tone === "y" ? "text-amber-700" : "text-[#4b5675]") +
      '"><span class="size-1.5 rounded-full shrink-0 ' + DOT[tone] + '"></span>' + esc(text) + "</span>";
  }

  function openDrill(d) {
    var drill = document.getElementById("drill");
    document.getElementById("drill-title").textContent = d.title;
    document.getElementById("drill-sub").textContent = d.sub || "";
    var rows = (d.items || []).map(function (i) {
      return '<li class="px-5 py-3"><div class="flex items-center justify-between gap-2">' +
        '<span class="text-[13px] font-bold text-[#111827]">' + esc(i[0]) + "</span>" +
        '<span class="text-[11px] text-[#64748b] text-right">' + esc(i[1]) + "</span></div>" +
        (i[2] ? '<p class="text-[12px] mt-0.5 ' + (i[3] === "red" ? "text-rose-700" : "text-[#4b5675]") + '">' + esc(i[2]) + "</p>" : "") +
        "</li>";
    }).join("");
    if (!rows) rows = '<li class="px-5 py-4 text-[12px] text-[#64748b]">' + esc(d.empty || "Tidak ada yang perlu ditindaklanjuti.") + "</li>";
    document.getElementById("drill-list").innerHTML = rows;
    drill.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
    drill.querySelector("button[data-close]").focus();
  }

  function closeDrill() {
    var drill = document.getElementById("drill");
    if (drill) drill.classList.add("hidden");
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-drill]");
    if (t && window.DRILL && window.DRILL[t.dataset.drill]) return openDrill(window.DRILL[t.dataset.drill]);
    if (e.target.closest("[data-close]")) closeDrill();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrill();
  });

  // Row action button. attrs: extra attributes, e.g. 'data-row="3"'.
  function actionBtn(attrs, label) {
    return '<button type="button" ' + attrs + ' title="' + esc(label || "Lihat detail") + '" aria-label="' + esc(label || "Lihat detail") + '" ' +
      'class="inline-flex size-8 items-center justify-center rounded-md text-[#9aa3bf] hover:bg-[#f5f6fa] hover:text-[#1a1f36] ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A0D] transition-colors">' +
      '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M2.06 12.35a1 1 0 0 1 0-.7C3.42 8.1 7.36 5 12 5s8.58 3.1 9.94 6.65a1 1 0 0 1 0 .7C20.58 15.9 16.64 19 12 19s-8.58-3.1-9.94-6.65"/>' +
      '<circle cx="12" cy="12" r="3"/></svg></button>';
  }

  window.Exec = { esc: esc, badge: badge, pill: pill, openDrill: openDrill, closeDrill: closeDrill, actionBtn: actionBtn };
})();

/* Filter dropdown: turns <select data-dd> into a styled button + menu, like the admin filters.
   The native select stays the source of truth, so existing input/change listeners keep working. */
(function () {
  var BTN = "h-10 inline-flex items-center justify-between gap-3 pl-4 pr-3 rounded-lg border border-[#e4e8f0] bg-white " +
    "text-[13px] font-medium text-[#1a1f36] hover:border-[#d0d6e8] focus:outline-none focus-visible:border-[#FF8A0D] " +
    "focus-visible:ring-2 focus-visible:ring-[#FF8A0D]/20 transition-colors whitespace-nowrap";
  var MENU = "absolute left-0 top-full mt-1.5 z-40 min-w-full w-max max-h-72 overflow-auto py-1.5 rounded-lg " +
    "border border-[#e4e8f0] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.08)] hidden";
  var all = [];

  function label(sel) { var o = sel.options[sel.selectedIndex]; return o ? o.text : ""; }
  function closeAll(except) {
    all.forEach(function (d) {
      if (d !== except) { d.menu.classList.add("hidden"); d.btn.setAttribute("aria-expanded", "false"); }
    });
  }
  function sync() { all.forEach(function (d) { d.text.textContent = label(d.sel); }); }

  function build(sel) {
    var wrap = document.createElement("div");
    wrap.className = "relative inline-block";
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.classList.add("sr-only");
    sel.tabIndex = -1;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = BTN;
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    if (sel.getAttribute("aria-label")) btn.setAttribute("aria-label", sel.getAttribute("aria-label"));
    btn.innerHTML = '<span></span><svg class="size-4 text-[#9aa3bf] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
    var menu = document.createElement("ul");
    menu.className = sel.hasAttribute("data-dd-up") ? MENU.replace("top-full mt-1.5", "bottom-full mb-1.5") : MENU;
    menu.setAttribute("role", "listbox");
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    var d = { sel: sel, btn: btn, menu: menu, text: btn.firstChild };

    function choose(i) {
      sel.selectedIndex = i;
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      closeAll(); sync(); btn.focus();
    }
    function open() {
      // Options can be added after load (e.g. the garage list), so the menu is rebuilt on each open.
      menu.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
        var on = i === sel.selectedIndex;
        return '<li role="option" tabindex="-1" data-i="' + i + '" aria-selected="' + on + '" class="px-4 py-2.5 text-[13px] cursor-pointer outline-none ' +
          (on ? "text-[#FF8A0D] font-semibold bg-[#fff7ed]" : "text-[#52607a] hover:bg-[#f8f9fc] focus:bg-[#f8f9fc]") + '">' + window.Exec.esc(o.text) + "</li>";
      }).join("");
      closeAll(d);
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      var cur = menu.querySelector('[aria-selected="true"]') || menu.firstChild;
      if (cur) cur.focus();
    }
    btn.addEventListener("click", function () { if (menu.classList.contains("hidden")) open(); else closeAll(); });
    btn.addEventListener("keydown", function (e) { if (e.key === "ArrowDown") { e.preventDefault(); open(); } });
    menu.addEventListener("click", function (e) { var li = e.target.closest("[data-i]"); if (li) choose(+li.dataset.i); });
    menu.addEventListener("keydown", function (e) {
      var li = document.activeElement.closest && document.activeElement.closest("[data-i]");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        var n = li && (e.key === "ArrowDown" ? li.nextElementSibling : li.previousElementSibling);
        if (n) n.focus();
      } else if ((e.key === "Enter" || e.key === " ") && li) { e.preventDefault(); choose(+li.dataset.i); }
      else if (e.key === "Escape" || e.key === "Tab") { closeAll(); btn.focus(); }
    });
    all.push(d);
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll("select[data-dd]"), build); sync(); }
  document.addEventListener("click", function (e) {
    if (!e.target.closest("select[data-dd] + button, select[data-dd] ~ ul")) closeAll();
    setTimeout(sync, 0); // picks up values set from code, e.g. the status filter cards
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.Exec.syncDropdowns = sync;
  window.Exec.dropdown = function (sel) { build(sel); sync(); };
})();

/* Table pagination: <tbody data-pager> gets a footer with Prev / pages / Next, a count, and Per Page.
   Works on rendered rows, so pages that re-render their tbody (e.g. after filtering) need no changes. */
(function () {
  var NAV = "h-9 inline-flex items-center gap-1 px-3 rounded-lg border border-[#e4e8f0] bg-white text-[13px] font-medium " +
    "text-[#52607a] hover:bg-[#f8f9fc] disabled:opacity-50 disabled:pointer-events-none transition-colors";
  var PAGE = "size-9 inline-flex items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ";
  var CHEV_L = '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
  var CHEV_R = '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  function setup(tbody) {
    var size = +(tbody.dataset.pager || 10), page = 1, busy = false;
    var foot = document.createElement("div");
    foot.className = "flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-[#e4e8f0]";
    foot.innerHTML =
      '<nav class="flex items-center gap-1.5" aria-label="Paginasi tabel">' +
        '<button type="button" data-prev class="' + NAV + '">' + CHEV_L + 'Prev</button>' +
        '<span data-pages class="flex items-center gap-1.5"></span>' +
        '<button type="button" data-next class="' + NAV + '">Next' + CHEV_R + '</button>' +
      "</nav>" +
      '<p data-info class="text-[12.5px] text-[#9aa3bf]"></p>' +
      '<label class="flex items-center gap-2 text-[12.5px] text-[#52607a]">Per Page :' +
        '<select data-dd data-dd-up aria-label="Baris per halaman"><option>5</option><option>10</option><option>20</option><option>50</option></select>' +
      "</label>";
    var wrap = tbody.closest(".overflow-x-auto") || tbody.closest("table");
    wrap.parentNode.insertBefore(foot, wrap.nextSibling);

    var sel = foot.querySelector("select");
    sel.value = String(size);
    window.Exec.dropdown(sel);
    sel.addEventListener("change", function () { size = +sel.value; page = 1; apply(); });
    foot.querySelector("[data-prev]").addEventListener("click", function () { page--; apply(); });
    foot.querySelector("[data-next]").addEventListener("click", function () { page++; apply(); });
    foot.querySelector("[data-pages]").addEventListener("click", function (e) {
      var b = e.target.closest("[data-page]");
      if (b) { page = +b.dataset.page; apply(); }
    });

    function apply() {
      busy = true;
      // An empty-state row (single cell spanning the table) is not a data row.
      var rows = Array.prototype.filter.call(tbody.rows, function (r) { return !r.querySelector("td[colspan]"); });
      var total = rows.length, pages = Math.max(1, Math.ceil(total / size));
      page = Math.min(Math.max(page, 1), pages);
      rows.forEach(function (r, i) { r.hidden = i < (page - 1) * size || i >= page * size; });
      var html = "";
      for (var p = 1; p <= pages; p++) {
        html += '<button type="button" data-page="' + p + '"' + (p === page ? ' aria-current="page"' : "") + ' class="' + PAGE +
          (p === page ? "bg-[#FF8A0D] text-white" : "text-[#52607a] hover:bg-[#f8f9fc]") + '">' + p + "</button>";
      }
      foot.querySelector("[data-pages]").innerHTML = html;
      foot.querySelector("[data-prev]").disabled = page <= 1;
      foot.querySelector("[data-next]").disabled = page >= pages;
      var from = total ? (page - 1) * size + 1 : 0, to = Math.min(page * size, total);
      foot.querySelector("[data-info]").textContent = total ? "Menampilkan " + from + "–" + to + " dari " + total + " data" : "Tidak ada data";
      busy = false;
    }
    // Re-run when the page re-renders the rows (filters, search); go back to page 1.
    new MutationObserver(function () { if (!busy) { page = 1; apply(); } }).observe(tbody, { childList: true });
    apply();
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll("tbody[data-pager]"), setup); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
