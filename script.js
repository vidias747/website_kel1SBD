const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const themeToggle = document.querySelector(".theme-toggle");
const resumeModal = document.querySelector("[data-resume-modal]");
const resumeOpen = document.querySelector("[data-resume-open]");
const resumeClose = document.querySelectorAll("[data-resume-close]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark-mode");

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light" : "Dark";
});

const setModal = (open) => {
  resumeModal?.classList.toggle("is-open", open);
  resumeModal?.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
};

resumeOpen?.addEventListener("click", () => setModal(true));
resumeClose.forEach((button) => button.addEventListener("click", () => setModal(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setModal(false);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(".content-section, .project-card, .timeline-item").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});
