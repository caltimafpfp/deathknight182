# 死亡騎士182 官方網站

此版本為 GitHub Pages 靜態網站，可直接覆蓋目前 `deathknight182` 儲存庫內容。

## 上線前必填

在 `js/config.js` 填入以下正式網址：

- `lineUrl`：LINE 官方客服
- `donateUrl`：贊助頁面
- `clientUrl`：完整主程式
- `patchUrl`：更新檔
- `driveUrl`：Google Drive 備用載點
- `referralUrl`：推廣回報
- `facebookUrl`：Facebook 粉絲專頁

公告也在同一個檔案的 `announcements` 陣列中更新。

## 遊戲介紹

七個分類內容位於 `data/game-guide.js`。修改標題、介紹與項目後，首頁會自動更新。

## GitHub Pages 部署

1. 將本資料夾所有檔案上傳到 `caltimafpfp/deathknight182` 的預設分支根目錄。
2. 開啟 GitHub 儲存庫的 Settings → Pages。
3. Source 選擇 `Deploy from a branch`，分支選預設分支、資料夾選 `/ (root)`。
4. 儲存後等待 GitHub Pages 更新。

網站使用相對路徑，支援 `https://caltimafpfp.github.io/deathknight182/` 這類專案網址。
