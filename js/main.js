const cfg = window.SITE_CONFIG || {};

const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".menu-toggle");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

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
      alert("此連結尚未設定，請在 js/config.js 貼上正式網址。");
    });
  }
});

const newsList = document.querySelector("#newsList");
const items = Array.isArray(cfg.announcements) ? cfg.announcements : [];

newsList.innerHTML = items.map(item => `
  <div class="news-item">
    <span>${item.title}</span>
    <time>${item.date}</time>
  </div>
`).join("");
