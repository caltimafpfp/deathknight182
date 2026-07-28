const cfg = window.SITE_CONFIG || {};

const linkMap = {
  line: cfg.lineUrl,
  donate: cfg.donateUrl,
  client: cfg.clientUrl,
  patch: cfg.patchUrl,
  drive: cfg.driveUrl
};

document.querySelectorAll("[data-link]").forEach(el => {
  const url = linkMap[el.dataset.link];

  if (url && url !== "#") {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.addEventListener("click", event => {
      event.preventDefault();
      alert("此連結尚未設定，請在 js/config.js 貼上正式網址。");
    });
  }
});

const newsList = document.querySelector("#newsList");
const announcements = Array.isArray(cfg.announcements) ? cfg.announcements : [];

newsList.innerHTML = announcements.map(item => `
  <div class="news-item">
    <span>${item.title}</span>
    <time>${item.date}</time>
  </div>
`).join("");
