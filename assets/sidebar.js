/* Sidebar admin: mode tertutup (icon-only). Dipakai bersama oleh semua halaman admin. */
(function () {
  var KEY = "nexa-sidebar-collapsed";
  var root = document.documentElement;

  try {
    if (localStorage.getItem(KEY) === "1") root.classList.add("sb-collapsed");
  } catch (e) {}

  function setCollapsed(value) {
    root.classList.toggle("sb-collapsed", value);
    try {
      localStorage.setItem(KEY, value ? "1" : "0");
    } catch (e) {}
  }

  function isDesktop() {
    return window.matchMedia("(min-width: 1024px)").matches;
  }

  function init() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    // Logo: tambahkan versi icon (tampil saat tertutup)
    var logo = sidebar.querySelector('a[href="index.html"]');
    if (logo) {
      logo.classList.add("sb-logo-full");
      var iconLink = document.createElement("a");
      iconLink.href = "index.html";
      iconLink.className = "sb-logo-icon hover:opacity-90 transition-opacity";
      iconLink.innerHTML =
        '<img src="assets/nexa-icon.png" alt="Nexa" />';
      logo.parentNode.insertBefore(iconLink, logo.nextSibling);
    }

    // Menu: beri penanda class dan tooltip
    var nav = sidebar.querySelector(".overflow-y-auto");
    if (nav) {
      nav.classList.add("sb-nav");
      nav.querySelectorAll("p").forEach(function (p) {
        p.classList.add("sb-section");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.classList.add("sb-item");
        var span = a.querySelector("span");
        if (span) {
          span.classList.add("sb-label");
          a.title = span.textContent.trim();
        }
      });
    }

    // Footer user
    var footer = sidebar.lastElementChild;
    if (footer && footer.tagName === "DIV") {
      footer.classList.add("sb-footer");
    }

    // Profil: saat sidebar tertutup, klik avatar membuka pilihan logout
    var avatar = footer && footer.querySelector("div > div:first-child");
    var logoutLink = footer && footer.querySelector("a");
    if (avatar && logoutLink) {
      avatar.classList.add("sb-avatar");
      var texts = footer.querySelectorAll(".leading-tight span");
      var pop = document.createElement("div");
      pop.className = "sb-pop";
      pop.hidden = true;
      pop.innerHTML =
        '<div class="sb-pop-head"><span class="sb-pop-name"></span><span class="sb-pop-mail"></span></div>' +
        '<a class="sb-pop-logout"><i data-lucide="log-out"></i><span>Keluar</span></a>';
      pop.querySelector(".sb-pop-name").textContent = texts[0] ? texts[0].textContent.trim() : "";
      pop.querySelector(".sb-pop-mail").textContent = texts[1] ? texts[1].textContent.trim() : "";
      pop.querySelector(".sb-pop-logout").href = logoutLink.getAttribute("href") || "index.html";
      sidebar.appendChild(pop);

      var closePop = function () {
        pop.hidden = true;
      };
      avatar.addEventListener("click", function (e) {
        if (!isDesktop() || !root.classList.contains("sb-collapsed")) return;
        e.stopPropagation();
        pop.hidden = !pop.hidden;
      });
      document.addEventListener("click", function (e) {
        if (!pop.hidden && !pop.contains(e.target)) closePop();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closePop();
      });
      new MutationObserver(function () {
        if (!root.classList.contains("sb-collapsed")) closePop();
      }).observe(root, { attributes: true, attributeFilter: ["class"] });
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    // Tombol hamburger di header: di desktop = buka/tutup rail, di mobile tetap bawaan halaman
    document.addEventListener(
      "click",
      function (e) {
        var btn = e.target.closest && e.target.closest("#sidebar-toggle-btn");
        if (btn && isDesktop()) {
          e.stopImmediatePropagation();
          setCollapsed(!root.classList.contains("sb-collapsed"));
        }
      },
      true
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
