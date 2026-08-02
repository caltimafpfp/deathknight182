export const defaultSiteButtons = {
  heroDownload: { label: "遊戲下載", url: "#download" },
  heroLine: { label: "LINE 官方客服", url: "#" },
  heroDonate: { label: "贊助支持", url: "#" },
  guideServer: { label: "伺服器設置", url: "#" },
  guideFeatures: { label: "特色介紹", url: "#" },
  guideWeapons: { label: "武器介紹", url: "#" },
  guideArmor: { label: "防具介紹", url: "#" },
  guideDolls: { label: "娃娃介紹", url: "#" },
  guideMaps: { label: "地圖介紹", url: "#" },
  guideItems: { label: "道具介紹", url: "#" },
  supportLine: { label: "LINE 官方客服", url: "#" },
  supportDonate: { label: "贊助支持", url: "#" },
  supportReferral: { label: "推廣回報", url: "#" },
  supportFacebook: { label: "FB 粉絲團", url: "#" },
  downloadClient: { label: "完整主程式", url: "#" },
  downloadDrive: { label: "Google Drive", url: "#" }
};

export const siteButtonSections = [
  { title: "上方主按鈕", keys: ["heroDownload", "heroLine", "heroDonate"] },
  { title: "中間遊戲介紹", keys: ["guideServer", "guideFeatures", "guideWeapons", "guideArmor", "guideDolls", "guideMaps", "guideItems"] },
  { title: "下方客服與支持", keys: ["supportLine", "supportDonate", "supportReferral", "supportFacebook"] },
  { title: "最下方下載專區", keys: ["downloadClient", "downloadDrive"] }
];

export function mergeSiteButtons(saved = {}) {
  return Object.fromEntries(Object.entries(defaultSiteButtons).map(([key, value]) => [
    key,
    { ...value, ...(saved?.[key] || {}) }
  ]));
}

export const defaultGuideContent = {
  server: { title: "伺服器設置", intro: "介紹伺服器版本、倍率、重啟時間與主要規則。", content: "基本設定\n經典 1.82 版本；請在此填寫經驗倍率、掉寶倍率、重啟時間與其他設定。\n\n遊戲規則\n請在此填寫禁止事項、交易規則與伺服器規範。", images: [] },
  features: { title: "特色介紹", intro: "整理伺服器的核心玩法與主要特色。", content: "經典耐玩\n保留熟悉的遊戲節奏，重視長期成長與玩家互動。\n\n公平環境\n平衡設定、長期更新，打造適合長期投入的遊戲環境。", images: [] },
  weapons: { title: "武器介紹", intro: "展示武器名稱、圖片、能力與取得方式。", content: "請在此填寫武器名稱、能力、安定值、職業限制、強化效果與取得方式。", images: [] },
  armor: { title: "防具介紹", intro: "展示防具名稱、圖片、能力與取得方式。", content: "請在此填寫防具名稱、能力、安定值、套裝效果、強化規則與取得方式。", images: [] },
  dolls: { title: "娃娃介紹", intro: "展示魔法娃娃能力、等級與取得方式。", content: "請在此填寫魔法娃娃能力、等級、合成方式、材料需求與取得方式。", images: [] },
  maps: { title: "地圖介紹", intro: "介紹地圖等級、怪物、BOSS、掉落物與進入條件。", content: "請在此填寫地圖名稱、建議等級、主要怪物、BOSS、掉落資訊、開放時間與進入條件。", images: [] },
  items: { title: "道具介紹", intro: "說明重要道具的用途、取得方式與注意事項。", content: "請在此填寫道具用途、能力、取得方式、製作材料、交易規則與使用限制。", images: [] }
};

export const guideContentOrder = ["server", "features", "weapons", "armor", "dolls", "maps", "items"];

function normalizeGuideItem(item, fallback, index = 0) {
  return {
    id: String(item?.id || `item-${index + 1}`),
    title: String(item?.title || fallback.title),
    intro: String(item?.intro || fallback.intro),
    content: String(item?.content || fallback.content),
    images: Array.isArray(item?.images) ? item.images : []
  };
}

export function mergeGuideContent(saved = {}) {
  return Object.fromEntries(guideContentOrder.map(key => {
    const fallback = defaultGuideContent[key];
    const stored = saved?.[key];
    let items;
    if (Array.isArray(stored?.items)) {
      items = stored.items.map((item, index) => normalizeGuideItem(item, fallback, index));
    } else if (stored && (stored.title || stored.content || stored.intro || Array.isArray(stored.images))) {
      // 舊版每個分類只有一份內容；升級時自動保留為第一篇。
      items = [normalizeGuideItem({ ...stored, id: `legacy-${key}` }, fallback)];
    } else {
      items = [normalizeGuideItem({ ...fallback, id: `default-${key}` }, fallback)];
    }
    return [key, { items }];
  }));
}
