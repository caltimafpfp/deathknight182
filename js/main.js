const cfg=window.SITE_CONFIG||{};
const links={
  guide:cfg.guideUrl,news:cfg.newsUrl,downloadPage:cfg.downloadPageUrl,
  download:cfg.downloadUrl,line:cfg.lineUrl,donate:cfg.donateUrl,discord:cfg.discordUrl,
  server:cfg.serverUrl,features:cfg.featuresUrl,weapons:cfg.weaponsUrl,
  armor:cfg.armorUrl,dolls:cfg.dollsUrl,maps:cfg.mapsUrl,items:cfg.itemsUrl
};
document.querySelectorAll("[data-link]").forEach(el=>{
  const url=links[el.dataset.link];
  if(url&&url!=="#"){
    el.href=url;el.target="_blank";el.rel="noopener noreferrer";
  }else{
    el.addEventListener("click",e=>{
      e.preventDefault();
      alert("此連結尚未設定，請在 js/config.js 貼上正式網址。");
    });
  }
});