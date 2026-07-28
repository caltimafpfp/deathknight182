const config = window.SITE_CONFIG || {};
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const mapping = {
  line: config.lineUrl,
  donate: config.donateUrl,
  client: config.clientUrl,
  patch: config.patchUrl,
  drive: config.driveUrl
};

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  const url = mapping[key];
  if (url && url !== "#") {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.addEventListener("click", e => {
      e.preventDefault();
      alert("此連結尚未設定，請在 js/config.js 中貼上正式網址。");
    });
  }
});

const newsList = document.querySelector("#newsList");
const news = Array.isArray(config.announcements) ? config.announcements : [];
let expanded = false;

function renderNews() {
  const items = expanded ? news : news.slice(0, 4);
  newsList.innerHTML = items.map(item => `
    <div class="news-item">
      ${item.tag ? `<span class="badge ${item.tag === "NEW" ? "new" : ""}">${item.tag}</span>` : "<span>＋</span>"}
      <span>${item.title}</span>
      <time class="news-date">${item.date}</time>
    </div>
  `).join("");
}
renderNews();

document.querySelector("#showAllNews")?.addEventListener("click", e => {
  expanded = !expanded;
  e.currentTarget.textContent = expanded ? "收合公告 －" : "查看全部公告 ＋";
  renderNews();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
