const cfg = window.SITE_CONFIG || {};
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const links = {
  line: cfg.lineUrl,
  donate: cfg.donateUrl,
  client: cfg.clientUrl,
  patch: cfg.patchUrl,
  drive: cfg.driveUrl
};

document.querySelectorAll("[data-link]").forEach(el => {
  const url = links[el.dataset.link];
  if (url && url !== "#") {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.addEventListener("click", e => {
      e.preventDefault();
      alert("此連結尚未設定，請打開 js/config.js 貼上正式網址。");
    });
  }
});

const list = document.querySelector("#newsList");
const toggle = document.querySelector("#toggleNews");
const announcements = Array.isArray(cfg.announcements) ? cfg.announcements : [];
let expanded = false;

function renderNews() {
  const rows = expanded ? announcements : announcements.slice(0, 4);
  list.innerHTML = rows.map(item => `
    <div class="news-item">
      <span class="tag ${item.tag === "HOT" ? "hot" : ""}">${item.tag || "NEWS"}</span>
      <span class="title">${item.title}</span>
      <time>${item.date}</time>
    </div>
  `).join("");
  toggle.textContent = expanded ? "收合公告" : "查看全部";
}
renderNews();
toggle?.addEventListener("click", () => {
  expanded = !expanded;
  renderNews();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });