const s=window.SITE_SETTINGS||{};
const byId=id=>document.getElementById(id);
byId("onlineCount").textContent=s.onlineCount??258;
byId("openDate").textContent=s.openDate??"2025 / 08 / 05";
byId("restartTime").textContent=s.restartTime??"每日 04:00";
byId("expRate").textContent=s.expRate??"5倍";
byId("adenaRate").textContent=s.adenaRate??"3倍";
byId("dropRate").textContent=s.dropRate??"2倍";
byId("year").textContent=new Date().getFullYear();

document.querySelectorAll("[data-link]").forEach(el=>{
  const key=el.dataset.link;
  el.href=s.links?.[key]||"#";
  if(el.getAttribute("href")==="#") el.addEventListener("click",e=>e.preventDefault());
});
const esc=v=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const items=Array.isArray(window.ANNOUNCEMENTS)?window.ANNOUNCEMENTS:[];
byId("announcementList").innerHTML=items.length?items.map(i=>`<article class="news-item"><span class="news-tag ${esc(i.color||"red")}">${esc(i.category||"公告")}</span><div><h3>${esc(i.title||"")}</h3><p>${esc(i.content||"")}</p></div><time>${esc(i.date||"")}</time></article>`).join(""):'<p style="padding:20px;color:#999">目前尚無公告。</p>';
const menu=document.querySelector(".menu-button");
const nav=document.querySelector(".main-nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
