# 故障排除指南 (Troubleshooting)

如果在設置或運行 **TTAS 急診檢傷系統** 時遇到問題，請參考以下常見問題解決方案。

---

## 🚀 運行與佈署問題

### 1. 執行 `npm start` 失敗
*   **問題描述**：出現 "Command not found" 或模組缺失錯誤。
*   **解決方案**：
    *   確保已安裝 Node.js (建議 v18+)。
    *   執行 `npm install` 重新安裝所有依賴套件。
    *   如果還是失敗，刪除 `node_modules` 與 `package-lock.json` 後再執行一次 `npm install`。

### 2. TypeScript 類型錯誤
*   **問題描述**：VS Code 或編譯器提示 Property 'xxx' does not exist on type 'yyy'。
*   **解決方案**：
    *   本專案已全面 TypeScript 化，請確保使用的是 `.tsx` 或 `.ts` 擴充位。
    *   執行 `npx tsc --noEmit` 檢查是否有未處理的型別衝突。
    *   檢查 `src/constants.ts` 中的介面定義是否與你的輸入數據一致。

### 3. MUI 元件樣式跑掉
*   **問題描述**：按鈕或輸入框看起來像傳統 HTML 標籤，沒有 MUI 樣式。
*   **解決方案**：
    *   檢查 `src/index.tsx` 是否正確導入了 `ThemeProvider`。
    *   確認 `@mui/material` 與 `@emotion/react` 等依賴已正確安裝。

---

## 🐙 Git 與 GitHub 問題

### 1. 無法 Push 到 GitHub
*   **問題描述**：出現 "Permission denied" 或 403 錯誤。
*   **解決方案**：
    *   確認你已執行過 `gh auth login`。
    *   如果是透過 SSH 連線，請檢查 SSH Key 是否已加入 GitHub 帳號。
    *   確保你有該儲存庫的寫入權限。

### 2. Merge PR 後本地代碼未同步
*   **問題描述**：GitHub 網頁端已合併，但電腦裡的程式碼還是舊版。
*   **解決方案**：
    *   執行 `git pull origin main` 同步遠端最新改動。

---

## 🏥 業務邏輯問題

### 1. 檢傷級別判定不準確
*   **問題描述**：輸入數值後，建議級別與預期不符。
*   **解決方案**：
    *   請檢查 `src/utils/triageCalculator.ts` 中的邏輯判斷。
    *   參考 `src/constants.ts` 中的 `TRIAGE_THRESHOLDS` 常量設定。
    *   執行 `npm test` 跑一遍單元測試，查看是哪個測試案例失敗。

---

## 📜 更新日誌概要 (Recent Changes)

*   **2026-02-01**: 全面轉換為 TypeScript，增加 `tsconfig.json`。
*   **2026-02-01**: 專案結構優化，將程式碼移入 `src/` 資料夾，增加 `public/index.html`。
*   **2026-01-31**: 引入 React Hook Form 與 Zod 進行狀態管理與表單驗證。

---

## 建置與套件問題排除紀錄（2026-02-01）

### 🎯 目標
整理本次因專案結構與套件設定導致的建置風險，並完成修復與提交。

---

### ✅ 問題摘要
- 專案結構與設定檔內容不一致，導致建置流程與路徑可能失效。
- 入口檔與靜態資源配置缺漏，影響 React 應用啟動與 build 輸出。
- TypeScript 與測試檔案位置與設定不一致，可能造成編譯或測試路徑錯誤。
- ESLint 設定未同步更新，可能造成 lint 規則或路徑解析錯誤。
- 重新啟動或 build 時可能出現入口檔或路徑相關錯誤。

---

### 🛠 排除與修正內容
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

### 🧯 常見執行（run）錯誤與修復

#### 1) `Module not found` 或 `Cannot find module`
**原因**：入口檔或路徑調整後，實際檔案位置與 import 路徑不一致。

**修復**：
- 確認 `src/index.tsx` 存在且路徑正確。
- 檢查 import 路徑是否仍指向舊位置。

#### 2) `Cannot find entry file` / `index.html not found`
**原因**：缺少 `public/index.html` 或建置工具找不到入口 HTML。

**修復**：
- 確認 `public/index.html` 存在。
- 若使用自訂 build 設定，確認入口設定指向 `public/index.html`。

#### 3) `TS2307: Cannot find module`（TypeScript）
**原因**：tsconfig 路徑或目錄結構未同步更新。

**修復**：
- 更新 `tsconfig.json` 的 include / baseUrl / paths。
- 確保 `src/` 內檔案位置與 tsconfig 一致。

---

### ✅ 結果
- 建置流程與依賴結構已一致化。
- Git 提交與推送完成。
- 文件與實際專案結構同步。

---

### 📌 建議
- 專案若再次調整結構，應同步更新 `README.md` 與相關設定檔。
- 建置前先執行 `npm install` 及 `npm run build` 做快速驗證。
