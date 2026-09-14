/* ============================================
   FRUTIGER AERO CORE — Animations
   ============================================ */

(function () {
  "use strict";

  const bubblesContainer = document.getElementById("bubbles");
  const BUBBLE_COUNT = 34;

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 70 + 18;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * -25;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    const drift = (Math.random() - 0.5) * 100;
    bubble.style.setProperty("--drift", `${drift}px`);

    bubblesContainer.appendChild(bubble);

    setTimeout(() => {
      if (bubble.parentNode) bubble.remove();
      createBubble();
    }, (duration + Math.abs(delay)) * 1000);
  }

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    setTimeout(() => createBubble(), i * 140);
  }

  // Nav
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollPos = (document.querySelector(".window-content")?.scrollTop || window.scrollY) + 100;

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

  // Buttons
  const primaryBtn = document.querySelector(".hero .aero-btn.primary");
  const secondaryBtn = document.querySelector(".hero .aero-btn.secondary");
  const starBtn = document.querySelector(".cta-card .aero-btn");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", () => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", () => {
      document.getElementById("elements")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (starBtn) {
    starBtn.addEventListener("click", () => {
      window.open("https://github.com/ziyyhhk/frutiger-aero-core", "_blank");
    });
  }

  // Parallax on orb
  const orb = document.querySelector(".glossy-orb");
  if (orb) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 9;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  const content = document.querySelector(".window-content");
  if (content) {
    content.addEventListener("scroll", updateActiveNav);
  }

  updateActiveNav();

  // Reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".bubble").forEach((b) => b.remove());
    const aurora = document.querySelector(".aurora");
    if (aurora) aurora.style.animation = "none";
  }
})();
