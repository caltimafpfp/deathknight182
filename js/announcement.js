import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from "./firebase-client.js";

const card=document.querySelector('#announcement');
const id=new URLSearchParams(location.search).get('id');
function toDate(value){if(value?.toDate)return value.toDate();const date=new Date(value);return Number.isNaN(date.getTime())?null:date}
function formatDate(value){const date=toDate(value);return date?date.toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}):''}
function safeUrl(value){try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)?url.href:null}catch{return null}}
function showError(message){card.innerHTML='';const box=document.createElement('div');box.className='content-error';const text=document.createElement('p');text.textContent=message;const back=document.createElement('a');back.href='./index.html#news';back.textContent='返回最新公告';box.append(text,back);card.append(box)}

async function load(){
  if(!id){showError('找不到公告編號。');return}
  try{
    const snapshot=await getDoc(doc(db,'announcements',id));
    if(!snapshot.exists()){showError('這篇公告不存在或尚未發布。');return}
    const data=snapshot.data();document.title=`${data.title||'最新公告'}｜死亡騎士182`;card.innerHTML='';
    const meta=document.createElement('div');meta.className='announcement-meta';
    const category=document.createElement('span');category.className='announcement-category';category.textContent=data.category||'公告';
    const date=document.createElement('time');date.textContent=formatDate(data.publishedAt);meta.append(category,date);
    const title=document.createElement('h1');title.textContent=data.title||'未命名公告';card.append(meta,title);
    if(data.excerpt){const excerpt=document.createElement('p');excerpt.className='announcement-excerpt';excerpt.textContent=data.excerpt;card.append(excerpt)}
    const content=document.createElement('div');content.className='announcement-content';content.textContent=data.content||'';card.append(content);
    const urls=Array.isArray(data.images)?data.images.map(safeUrl).filter(Boolean):[];
    if(urls.length){const gallery=document.createElement('div');gallery.className='announcement-gallery';urls.forEach((url,index)=>{const img=document.createElement('img');img.src=url;img.alt=`${data.title||'公告'} 圖片 ${index+1}`;img.loading='lazy';img.referrerPolicy='no-referrer';gallery.append(img)});card.append(gallery)}
  }catch(error){console.error(error);showError('公告暫時無法讀取，請稍後再試。')}
}
load();
