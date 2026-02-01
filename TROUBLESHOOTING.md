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
