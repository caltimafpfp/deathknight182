const cfg = window.SITE_CONFIG || {};
const guideData = Array.isArray(window.GAME_GUIDE) ? window.GAME_GUIDE : [];
const linkMap = {line:cfg.lineUrl,donate:cfg.donateUrl,client:cfg.clientUrl,patch:cfg.patchUrl,drive:cfg.driveUrl,referral:cfg.referralUrl,facebook:cfg.facebookUrl};

function safeText(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
document.querySelectorAll('[data-link]').forEach(el=>{const url=linkMap[el.dataset.link];if(url&&url!=="#"){el.href=url;el.target="_blank";el.rel="noopener noreferrer"}else{el.addEventListener('click',e=>{e.preventDefault();alert('此連結尚未設定，請在 js/config.js 貼上正式網址。')})}});

const tags=['活動','公告','活動','系統','更新'];
const announcements=Array.isArray(cfg.announcements)?cfg.announcements:[];
document.querySelector('#newsList').innerHTML=announcements.slice(0,5).map((item,i)=>`<a class="news-item" href="#news"><span class="tag">${tags[i]||'公告'}</span><span>${safeText(item.title)}</span><time>${safeText(item.date)}</time><span class="arrow">›</span></a>`).join('');

const glyphs=['♜','✥','⚔','♞','♟','⌖','⚗'];
const tabs=document.querySelector('#guideTabs');
const detail=document.querySelector('#guideDetail');
tabs.innerHTML=guideData.map((item,i)=>`<button type="button" class="guide-tab" data-id="${safeText(item.id)}"><span class="guide-glyph">${glyphs[i]||'◆'}</span><span class="guide-name">${safeText(item.title)}</span><span class="guide-more">VIEW MORE »</span></button>`).join('');
function renderGuide(id){const section=guideData.find(item=>item.id===id);if(!section)return;tabs.querySelectorAll('.guide-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===id));detail.innerHTML=`<header><div><h3>${safeText(section.title)}</h3><p>${safeText(section.intro)}</p></div><a class="more-link" href="#game-guide">返回分類</a></header><div class="guide-items">${(section.items||[]).map(item=>`<article class="guide-item"><h4>${safeText(item.title)}</h4><p>${safeText(item.description)}</p></article>`).join('')}</div>`;detail.classList.add('open');detail.scrollIntoView({behavior:'smooth',block:'center'})}
tabs.addEventListener('click',e=>{const btn=e.target.closest('[data-id]');if(btn)renderGuide(btn.dataset.id)});

const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('#mobileMenu');toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});menu.addEventListener('click',e=>{if(e.target.closest('a')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
