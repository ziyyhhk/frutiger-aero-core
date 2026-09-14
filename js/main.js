/* ============================================
   FRUTIGER AERO CORE — Animations & Interactions
   ============================================ */

(function () {
  "use strict";

  // ---------- Bubble Generator ----------
  const bubblesContainer = document.getElementById("bubbles");
  const BUBBLE_COUNT = 28;

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 60 + 20; // 20–80px
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 14; // 14–32s
    const delay = Math.random() * -20;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    // Slight horizontal drift via custom property
    const drift = (Math.random() - 0.5) * 80;
    bubble.style.setProperty("--drift", `${drift}px`);

    bubblesContainer.appendChild(bubble);

    // Clean up after animation cycles for performance
    setTimeout(() => {
      if (bubble.parentNode) bubble.remove();
      createBubble(); // keep the count stable
    }, (duration + Math.abs(delay)) * 1000);
  }

  // Seed initial bubbles
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    setTimeout(() => createBubble(), i * 180);
  }

  // ---------- Smooth Nav Active State ----------
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // Also handle click for smooth scroll + active
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // ---------- Button Interactions ----------
  const primaryBtn = document.querySelector(".aero-btn.primary");
  const secondaryBtn = document.querySelector(".aero-btn.secondary");
  const starBtn = document.querySelector(".cta-card .aero-btn");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", () => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", () => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (starBtn) {
    starBtn.addEventListener("click", () => {
      window.open("https://github.com/ziyyhhk/frutiger-aero-core", "_blank");
    });
  }

  // ---------- Subtle Mouse Parallax on Orb ----------
  const orb = document.querySelector(".glossy-orb");
  if (orb) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ---------- Window Content Scroll Listener ----------
  const content = document.querySelector(".window-content");
  if (content) {
    content.addEventListener("scroll", updateActiveNav);
  }

  // Initial call
  updateActiveNav();

  // ---------- Performance: Reduce motion preference ----------
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) {
    document.querySelectorAll(".bubble").forEach((b) => b.remove());
    document.querySelector(".aurora")?.style.setProperty("animation", "none");
  }
})();
