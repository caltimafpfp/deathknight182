import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from "./firebase-client.js";

const cfg = window.SITE_CONFIG || {};
const guideData = Array.isArray(window.GAME_GUIDE) ? window.GAME_GUIDE : [];
const linkMap = {line:cfg.lineUrl,donate:cfg.donateUrl,client:cfg.clientUrl,patch:cfg.patchUrl,drive:cfg.driveUrl,referral:cfg.referralUrl,facebook:cfg.facebookUrl};

function safeText(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function toDate(value){if(value?.toDate)return value.toDate();const date=new Date(value);return Number.isNaN(date.getTime())?new Date(0):date}
function formatDate(value){const date=toDate(value);return date.getTime()?date.toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-'):''}

document.querySelectorAll('[data-link]').forEach(el=>{const url=linkMap[el.dataset.link];if(url&&url!=="#"){el.href=url;el.target="_blank";el.rel="noopener noreferrer"}else{el.addEventListener('click',e=>{e.preventDefault();alert('此連結尚未設定，請在 js/config.js 貼上正式網址。')})}});

const newsList=document.querySelector('#newsList');
function renderNews(items,firebaseEnabled=true){
  if(!items.length){newsList.innerHTML='<p class="news-status">目前尚無公告</p>';return}
  newsList.innerHTML=items.slice(0,5).map((item,i)=>{
    const href=firebaseEnabled&&item.id?`announcement.html?id=${encodeURIComponent(item.id)}`:'#news';
    return `<a class="news-item" href="${href}"><span class="tag">${safeText(item.category||['活動','公告','活動','系統','更新'][i]||'公告')}</span><span>${safeText(item.title)}</span><time>${safeText(formatDate(item.publishedAt||item.date))}</time><span class="arrow">›</span></a>`
  }).join('');
}

async function loadNews(){
  newsList.innerHTML='<p class="news-status">公告讀取中…</p>';
  try{
    const snapshot=await getDocs(query(collection(db,'announcements'),where('published','==',true)));
    const items=snapshot.docs.map(doc=>({id:doc.id,...doc.data()})).sort((a,b)=>Number(b.pinned)-Number(a.pinned)||toDate(b.publishedAt)-toDate(a.publishedAt));
    renderNews(items.length?items:(Array.isArray(cfg.announcements)?cfg.announcements:[]),items.length>0);
  }catch(error){
    console.warn('Firebase announcements unavailable; using local fallback.',error);
    renderNews(Array.isArray(cfg.announcements)?cfg.announcements:[],false);
  }
}
loadNews();

const glyphs=['♜','✥','⚔','♞','♟','⌖','⚗'];
const tabs=document.querySelector('#guideTabs');
const detail=document.querySelector('#guideDetail');
tabs.innerHTML=guideData.map((item,i)=>`<button type="button" class="guide-tab" data-id="${safeText(item.id)}"><span class="guide-glyph">${glyphs[i]||'◆'}</span><span class="guide-name">${safeText(item.title)}</span><span class="guide-more">VIEW MORE »</span></button>`).join('');
function renderGuide(id){const section=guideData.find(item=>item.id===id);if(!section)return;tabs.querySelectorAll('.guide-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===id));detail.innerHTML=`<header><div><h3>${safeText(section.title)}</h3><p>${safeText(section.intro)}</p></div><a class="more-link" href="#game-guide">返回分類</a></header><div class="guide-items">${(section.items||[]).map(item=>`<article class="guide-item"><h4>${safeText(item.title)}</h4><p>${safeText(item.description)}</p></article>`).join('')}</div>`;detail.classList.add('open');detail.scrollIntoView({behavior:'smooth',block:'center'})}
tabs.addEventListener('click',e=>{const btn=e.target.closest('[data-id]');if(btn)renderGuide(btn.dataset.id)});

const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('#mobileMenu');toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});menu.addEventListener('click',e=>{if(e.target.closest('a')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
