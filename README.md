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

`announcements` 陣列只在 Firebase 暫時無法連線時作為備用公告。

## Firebase 公告後台

後台網址為：

`https://caltimafpfp.github.io/deathknight182/admin/`

使用已在 Firebase Authentication 建立的管理員帳號登入。後台支援新增、修改、刪除、草稿、發布、置頂及多張圖片網址。

公告資料儲存在 Firestore 的 `announcements` 集合。首頁只顯示已發布公告，點擊標題會開啟 `announcement.html?id=...` 詳細頁。

Firebase 公開網頁設定位於 `js/firebase-config.js`；管理員存取權同時受到 Firebase Authentication UID 與 Firestore 規則限制。

Firestore 規則備份位於 `firebase/firestore.rules`。若管理員 UID 變更，必須同時更新該檔案、Firebase 控制台規則及 `js/firebase-config.js`。

### 免費方案圖片

本版本不使用 Firebase Storage。請先將圖片上傳至可公開讀取的圖片空間，再於後台「圖片網址」欄位每行貼上一個 `https://` 圖片網址。

## 遊戲介紹

七個分類內容位於 `data/game-guide.js`。修改標題、介紹與項目後，首頁會自動更新。

## GitHub Pages 部署

1. 將本資料夾所有檔案上傳到 `caltimafpfp/deathknight182` 的預設分支根目錄。
2. 開啟 GitHub 儲存庫的 Settings → Pages。
3. Source 選擇 `Deploy from a branch`，分支選預設分支、資料夾選 `/ (root)`。
4. 儲存後等待 GitHub Pages 更新。

網站使用相對路徑，支援 `https://caltimafpfp.github.io/deathknight182/` 這類專案網址。
