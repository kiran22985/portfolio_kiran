/* ============================================================
   Kiran Kumari Giri — Portfolio interactions
   ============================================================ */

(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const progress = document.getElementById("scrollProgress");
  const links = navLinks ? navLinks.querySelectorAll("a") : [];

  /* ---- Sticky nav + scroll progress ---- */
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);

    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (y / height) * 100 : 0;
    progress.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  function closeMenu() { nav.classList.remove("open"); }
  navToggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  links.forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Active link on scroll (scroll spy) ---- */
  const sections = Array.from(links)
    .map(function (a) {
      const id = a.getAttribute("href");
      return id && id.startsWith("#") ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  const spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (s) { spy.observe(s); });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          const el = entry.target;
          // gentle stagger for siblings entering together
          setTimeout(function () { el.classList.add("in"); }, (i % 6) * 70);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
