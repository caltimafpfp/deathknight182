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
