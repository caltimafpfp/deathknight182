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


const guideData = Array.isArray(window.GAME_GUIDE) ? window.GAME_GUIDE : [];
const guideTabs = document.querySelector("#guideTabs");
const guideContent = document.querySelector("#guideContent");

function esc(v){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function renderGuide(id){
  const section = guideData.find(x => x.id === id) || guideData[0];
  if(!section) return;
  document.querySelectorAll(".guide-tabs button").forEach(b => b.classList.toggle("active", b.dataset.id === section.id));
  const cards = (section.items || []).map(item => `
    <article class="guide-card">
      ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}">` : `<div class="guide-empty-image">尚未上傳圖片</div>`}
      <div class="guide-card-body">
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.description)}</p>
      </div>
    </article>`).join("");
  guideContent.innerHTML = `<div class="guide-hero"><h3>${esc(section.title)}</h3><p>${esc(section.intro)}</p></div><div class="guide-cards">${cards}</div>`;
}
if(guideTabs){
  guideTabs.innerHTML = guideData.map((x,i) => `<button type="button" data-id="${esc(x.id)}" class="${i===0?"active":""}">${esc(x.title)}</button>`).join("");
  guideTabs.addEventListener("click", e => { const b=e.target.closest("button[data-id]"); if(b) renderGuide(b.dataset.id); });
  renderGuide(guideData[0]?.id);
}
