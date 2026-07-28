# 死亡騎士182 官方網站

這是一個可直接放到 GitHub Pages 的靜態網站。

## 更新公告

1. 在 GitHub 儲存庫首頁點 `announcements.js`
2. 點右上角鉛筆圖示「編輯」
3. 修改最上方公告，或複製一整段公告
4. 按右上角綠色的 `Commit changes...`
5. 再按一次 `Commit changes`
6. 約 1～2 分鐘後網站會自動更新

## 新增一則公告的格式

```js
{
  category: "官方公告",
  date: "2026-07-28",
  title: "公告標題",
  content: `公告第一行
公告第二行`
},
```

最新公告請放在最上方。

## GitHub Pages 設定

- Source：Deploy from a branch
- Branch：main
- Folder：/(root)
