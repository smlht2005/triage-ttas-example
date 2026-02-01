<!--
更新時間：2026-02-01 12:20
作者：AI Assistant
更新摘要：補齊 Agent 已安裝項目結論與 MCP 手動設定總覽
-->

<!--
更新時間：2026-02-01
作者：AI Assistant
更新摘要：BrowserLoop 安裝與 Cursor MCP 設定步驟
-->

# BrowserLoop 安裝指南

BrowserLoop 為 MCP 伺服器，用 Playwright 擷取網頁截圖（支援 **PNG、JPEG、WebP**），供 Cursor 在 Chrome 測試時產出 JPG 截圖。

---

## Agent 已安裝 vs 需手動設定（總覽）

| 項目 | 類型 | 狀態 | 說明 |
|------|------|------|------|
| **Chrome 測試 Skill** | Cursor Skill | ✅ Agent 已安裝 | 專案內 `.cursor/skills/chrome-browser-testing/SKILL.md`，教 AI 何時用 Chrome 測試、截圖流程與測試結果文件撰寫。 |
| **Chromium（Playwright）** | 本機環境 | ✅ Agent 已執行 | 已在本機執行 `npx playwright install chromium`，BrowserLoop 或專案內 Playwright 腳本皆可用。 |
| **BrowserLoop MCP** | MCP 伺服器 | ⚠️ 需使用者手動 | Cursor 的 MCP 設定檔（如 `%USERPROFILE%\.cursor\mcp.json`）由使用者環境管理，Agent 無法代為寫入；需依下方步驟二在 Cursor Settings → MCP 手動加入。 |
| **cursor-ide-browser / cursor-browser-extension** | MCP 伺服器 | 依 Cursor 設定 | 若已啟用，可與 Agent 搭配用於導航、點擊、輸入；截圖 JPG 仍建議用 BrowserLoop 或專案腳本。 |
| **專案測試腳本** | 本機腳本 | ✅ 專案內可選 | 如 `scripts/full-test-screenshots.js` 等 Playwright 腳本，可不依賴 BrowserLoop MCP 直接產出 `docs/screenshots/*.jpg` 與 `docs/TEST_RESULTS.md`。 |

**結論**：Agent 已安裝 **Skill** 與 **Chromium**；**BrowserLoop MCP** 需使用者在 Cursor 中手動加入後，AI 才能透過 MCP 直接擷取 JPG。未加入 BrowserLoop 時，仍可用專案內 Playwright 腳本完成測試與截圖。

---

## 前置需求

- Node.js 20+
- npm / npx

---

## 步驟一：安裝 Chromium（一次性）

BrowserLoop 依賴 Playwright 的 Chromium，請在本機執行：

```bash
npx playwright install chromium
```

驗證：

```bash
npx playwright --version
```

---

## 步驟二：在 Cursor 中加入 BrowserLoop MCP

### 方式 A：手動編輯 MCP 設定

1. 開啟 Cursor。
2. 開啟 **Settings** → **MCP**（或直接編輯 MCP 設定檔）。
3. 在 MCP 設定中新增一筆 `browserloop`，例如：

**若使用 `mcp.json`（專案或使用者目錄）：**

```json
{
  "mcpServers": {
    "browserloop": {
      "command": "npx",
      "args": ["-y", "browserloop@latest"],
      "description": "Screenshot and console log capture for web pages using Playwright"
    }
  }
}
```

**Windows 使用者常見路徑**：`%USERPROFILE%\.cursor\mcp.json` 或 Cursor 設定畫面上的 MCP 編輯區。

### 方式 B：一鍵加入 Cursor（Deeplink）

官方提供一鍵安裝連結，可自動寫入上述設定：

- [BrowserLoop - One-Click Install for Cursor](https://github.com/mattiasw/browserloop#-one-click-install-for-cursor)

點擊後依 Cursor 提示完成新增。

---

## 步驟三：驗證

1. 儲存 MCP 設定後，重新載入 Cursor 或重啟 MCP。
2. 在對話中要求 AI：「用 BrowserLoop 擷取 https://example.com 的截圖，格式 jpeg」。
3. 若可成功取得截圖，表示安裝成功。

---

## 常用參數（擷取 JPG 時）

- `format`: `"jpeg"` 可產出 JPG。
- `quality`: 1–100，建議 80–95。
- `fullPage`: `true` 可擷取整頁。
- `width` / `height`: 視窗寬高（例如 1280 x 720）。

本專案截圖建議存至 `docs/screenshots/`，檔名可採 `YYYYMMDD_步驟簡述.jpg`。

---

## 疑難排解

| 問題 | 建議 |
|------|------|
| "Executable doesn't exist" | 再執行一次 `npx playwright install chromium` |
| MCP 無法啟動 | 檢查 `node --version`、`npx --version`，確認 JSON 語法正確 |
| localhost 截圖失敗 | 先確認開發伺服器已啟動（如 `npm start`），再擷取 `http://localhost:3000` |

更多說明見 [BrowserLoop 官方文件](https://github.com/mattiasw/browserloop)。

---

## 結論（Agent 安裝項目摘要）

- **Skill（已安裝）**：`.cursor/skills/chrome-browser-testing/` — 專案內 Cursor Skill，Agent 已建立；觸發 Chrome 測試、截圖與測試結果文件流程。
- **MCP（需手動）**：BrowserLoop 需在 Cursor → Settings → MCP 手動加入上述 `mcpServers.browserloop` 設定；Agent 無法修改使用者 `mcp.json`。
- **Chromium（已就緒）**：本機已執行 `npx playwright install chromium`，供 BrowserLoop 或專案 Playwright 腳本使用。
- **測試與截圖**：未安裝 BrowserLoop MCP 時，可執行專案內 Playwright 腳本（如 `node scripts/full-test-screenshots.js`）產出 `docs/screenshots/*.jpg` 與 `docs/TEST_RESULTS.md`。
