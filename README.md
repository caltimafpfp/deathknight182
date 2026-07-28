# 死亡騎士182 官方網站 V2

## 上傳 GitHub Pages
1. 解壓縮 ZIP。
2. 將資料夾內所有檔案上傳到 GitHub 儲存庫根目錄。
3. 確認 `index.html` 與 `css`、`js`、`images` 資料夾都在最外層。
4. 等待 GitHub Pages 約 1～3 分鐘完成部署。
5. 使用 Ctrl + F5 強制重新整理。

## 修改網址
打開 `js/config.js`，把 `#` 改成正式連結：
- lineUrl：LINE 官方客服
- donateUrl：贊助系統
- clientUrl：完整主程式
- patchUrl：更新檔
- driveUrl：Google Drive

## 修改公告
同樣在 `js/config.js` 的 `announcements` 裡新增或修改公告。

## 主視覺圖片
固定使用：
`images/deathknight-hero.jpg`

CSS 使用 `object-fit: cover` 搭配手機版獨立定位，避免電腦與手機出現圖片破圖或不合理裁切。
