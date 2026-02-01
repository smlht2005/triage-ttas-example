# 建置與套件問題排除紀錄（2026-02-01）

## 🎯 目標
整理本次因專案結構與套件設定導致的建置風險，並完成修復與提交。

---

## ✅ 問題摘要
- 專案結構與設定檔內容不一致，導致建置流程與路徑可能失效。
- 入口檔與靜態資源配置缺漏，影響 React 應用啟動與 build 輸出。
- TypeScript 與測試檔案位置與設定不一致，可能造成編譯或測試路徑錯誤。
- ESLint 設定未同步更新，可能造成 lint 規則或路徑解析錯誤。
- 重新啟動或 build 時可能出現入口檔或路徑相關錯誤。

---

## 🛠 排除與修正內容
1. **專案結構調整**
   - 將 React 相關程式整理至 `src/` 目錄。
   - 將測試與工具程式依慣例搬移至 `src/__tests__/` 與 `src/utils/`。

2. **入口與靜態檔補齊**
   - 新增 `public/index.html` 以符合 React 建置流程。
   - 新增 `src/index.tsx` 作為 React 入口檔。

3. **設定與依賴同步**
   - 更新 `package.json` 與 `package-lock.json`，確保依賴一致。
   - 調整 `tsconfig.json` 以符合新的目錄結構。

4. **ESLint 錯誤修復**
   - 更新 `.eslintrc.json` 以配合新目錄結構與 TypeScript 設定。
   - 確認 lint 指令可正常執行並解析 `src/` 內檔案。

5. **文件同步更新**
   - 更新 README 的專案結構與 build 指令說明。

---

## 🧯 常見執行（run）錯誤與修復

### 1) `Module not found` 或 `Cannot find module`
**原因**：入口檔或路徑調整後，實際檔案位置與 import 路徑不一致。

**修復**：
- 確認 `src/index.tsx` 存在且路徑正確。
- 檢查 import 路徑是否仍指向舊位置。

### 2) `Cannot find entry file` / `index.html not found`
**原因**：缺少 `public/index.html` 或建置工具找不到入口 HTML。

**修復**：
- 確認 `public/index.html` 存在。
- 若使用自訂 build 設定，確認入口設定指向 `public/index.html`。

### 3) `TS2307: Cannot find module`（TypeScript）
**原因**：tsconfig 路徑或目錄結構未同步更新。

**修復**：
- 更新 `tsconfig.json` 的 include / baseUrl / paths。
- 確保 `src/` 內檔案位置與 tsconfig 一致。

---

## ✅ 結果
- 建置流程與依賴結構已一致化。
- Git 提交與推送完成。
- 文件與實際專案結構同步。

---

## 📌 建議
- 專案若再次調整結構，應同步更新 `README.md` 與相關設定檔。
- 建置前先執行 `npm install` 及 `npm run build` 做快速驗證。
