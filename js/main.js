import { collection, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from "./firebase-client.js";
import { defaultSiteButtons, mergeGuideContent, mergeSiteButtons } from "./site-settings.js";

const cfg = window.SITE_CONFIG || {};
const guideData = Array.isArray(window.GAME_GUIDE) ? window.GAME_GUIDE : [];
let siteButtons = mergeSiteButtons();
let siteGuides = mergeGuideContent();

function safeText(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function toDate(value){if(value?.toDate)return value.toDate();const date=new Date(value);return Number.isNaN(date.getTime())?new Date(0):date}
function formatDate(value){const date=toDate(value);return date.getTime()?date.toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-'):''}

function isExternalUrl(url){return /^https?:\/\//i.test(url||'')}
function applySiteButtons(){
  document.querySelectorAll('[data-site-button]').forEach(element=>{
    const item=siteButtons[element.dataset.siteButton]||defaultSiteButtons[element.dataset.siteButton];
    if(!item)return;
    const label=element.querySelector('[data-button-label]');
    if(label)label.textContent=item.label;
    element.setAttribute('aria-label',item.label);
    element.href=item.url||'#';
    if(isExternalUrl(item.url)){element.target='_blank';element.rel='noopener noreferrer'}
    else if((item.url||'#')==='#'){element.addEventListener('click',event=>{event.preventDefault();alert(`「${item.label}」連結尚未設定，請至管理後台的網站按鈕設定填入網址。`)})}
  });
}

async function loadSiteButtons(){
  try{
    const snapshot=await getDoc(doc(db,'siteSettings','main'));
    if(snapshot.exists()){siteButtons=mergeSiteButtons(snapshot.data().buttons);siteGuides=mergeGuideContent(snapshot.data().guides)}
  }catch(error){console.warn('Website settings unavailable; using defaults.',error)}
  applySiteButtons();
  renderGuideTabs();
}

const newsList=document.querySelector('#newsList');
function categoryClass(category){return ({'活動':'tag-activity','公告':'tag-announcement','系統':'tag-system','更新':'tag-update','下載':'tag-download'})[category]||'tag-announcement'}
function renderNews(items,firebaseEnabled=true){
  if(!items.length){newsList.innerHTML='<p class="news-status">目前尚無公告</p>';return}
  newsList.innerHTML=items.slice(0,5).map((item,i)=>{
    const href=firebaseEnabled&&item.id?`announcement.html?id=${encodeURIComponent(item.id)}`:'#news';
    const category=item.category||['活動','公告','活動','系統','更新'][i]||'公告';
    return `<a class="news-item" href="${href}"><span class="tag ${categoryClass(category)}">${safeText(category)}</span><span>${safeText(item.title)}</span><time>${safeText(formatDate(item.publishedAt||item.date))}</time><span class="arrow">›</span></a>`
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
const guideKeys={server:'guideServer',features:'guideFeatures',weapons:'guideWeapons',armor:'guideArmor',dolls:'guideDolls',maps:'guideMaps',items:'guideItems'};
const visibleGuides=guideData.filter(item=>guideKeys[item.id]);
let currentGuideId='';
function renderGuideTabs(){tabs.innerHTML=visibleGuides.map((item,i)=>{const key=guideKeys[item.id];const setting=siteButtons[key];return `<button type="button" class="guide-tab" data-id="${safeText(item.id)}" data-key="${safeText(key)}"><span class="guide-glyph">${glyphs[i]||'◆'}</span><span class="guide-name">${safeText(setting?.label||item.title)}</span><span class="guide-more">VIEW MORE »</span></button>`}).join('')}
function renderGuideEntry(item,shouldScroll=false){if(!item)return;detail.querySelectorAll('[data-guide-entry-id]').forEach(button=>button.classList.toggle('active',button.dataset.guideEntryId===item.id));const paragraphs=(item.content||'').split(/\n{2,}/).filter(Boolean).map(text=>`<p>${safeText(text).replaceAll('\n','<br>')}</p>`).join('');const gallery=(item.images||[]).map((src,index)=>`<img src="${safeText(src)}" alt="${safeText(item.title)}圖片 ${index+1}" loading="lazy">`).join('');const article=detail.querySelector('#guideArticle');article.innerHTML=`<header class="guide-article-heading"><div><h4>${safeText(item.title)}</h4><p>${safeText(item.intro)}</p></div></header><div class="guide-content-body">${paragraphs}</div>${gallery?`<div class="guide-content-gallery">${gallery}</div>`:''}`;if(shouldScroll)article.scrollIntoView({behavior:'smooth',block:'start'})}
function renderGuide(id){const section=guideData.find(item=>item.id===id);if(!section)return;currentGuideId=id;const heading=siteButtons[guideKeys[id]]?.label||section.title;const items=siteGuides[id]?.items||[];tabs.querySelectorAll('.guide-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===id));const cards=items.map((item,index)=>`<button type="button" class="guide-entry-card" data-guide-entry-id="${safeText(item.id)}">${item.images?.[0]?`<img src="${safeText(item.images[0])}" alt="" loading="lazy">`:''}<span><b>${safeText(item.title||`內容 ${index+1}`)}</b><small>${safeText(item.intro||'')}</small></span></button>`).join('');detail.innerHTML=`<header><div><h3>${safeText(heading)}</h3><p>共 ${items.length} 篇內容，請選擇下方項目查看完整介紹。</p></div><a class="more-link" href="#game-guide">返回分類</a></header>${cards?`<div class="guide-entry-grid">${cards}</div><article id="guideArticle" class="guide-article"></article>`:'<p class="guide-empty">這個分類目前尚無內容。</p>'}`;detail.classList.add('open');if(items[0])renderGuideEntry(items[0]);detail.scrollIntoView({behavior:'smooth',block:'center'})}
tabs.addEventListener('click',e=>{const btn=e.target.closest('[data-id]');if(!btn)return;const setting=siteButtons[btn.dataset.key];if(isExternalUrl(setting?.url)){window.open(setting.url,'_blank','noopener,noreferrer');return}renderGuide(btn.dataset.id)});
detail.addEventListener('click',event=>{const button=event.target.closest('[data-guide-entry-id]');if(!button||!currentGuideId)return;const item=siteGuides[currentGuideId]?.items?.find(entry=>entry.id===button.dataset.guideEntryId);renderGuideEntry(item,true)});

loadSiteButtons();

const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('#mobileMenu');toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});menu.addEventListener('click',e=>{if(e.target.closest('a')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
