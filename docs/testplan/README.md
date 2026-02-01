<!--
更新時間：2026-02-01 14:00
作者：AI Assistant
更新摘要：結論與相關 md 更新；補充完整測試腳本與 PDF 報告產出

更新時間：2026-02-01
作者：AI Assistant
更新摘要：Chrome 測試技能與截圖、測試結果文件計畫，存於 docs/testplan
-->

# Chrome 測試技能與截圖、測試結果文件計畫

## 現況摘要

- **專案**：React TTAS 急診檢傷表單（StepperForm、步驟：生命徵象 → 病人主訴 → 確認提交），本地開發為 `npm start`（預設 `http://localhost:3000`）。
- **既有 MCP**：已啟用 **cursor-ide-browser**、**cursor-browser-extension**，可導航、鎖定分頁、`browser_snapshot`、點擊、輸入等，但**不提供畫面截圖／JPG 輸出**。
- **截圖需求**：需額外安裝支援「擷取畫面並輸出 JPG」的 MCP（建議 **BrowserLoop**）。

---

## 方案架構

- **Skill**：教 AI 何時用 Chrome 測試、如何用既有瀏覽器 MCP + 截圖 MCP，以及如何撰寫測試結果文件。
- **截圖 MCP**：建議 **BrowserLoop**（支援 JPEG、NPX 一鍵、Cursor 有 deeplink）。
- **產出**：專案內 `docs/TEST_RESULTS.md` 與 `docs/screenshots/*.jpg`，文件中以路徑引用 JPG。

---

## 實作項目

1. **Cursor Skill**：`.cursor/skills/chrome-browser-testing/SKILL.md` — Chrome 測試 + 截圖流程 + 測試結果文件撰寫指引。
2. **BrowserLoop 安裝**：見 [INSTALL_BROWSERLOOP.md](./INSTALL_BROWSERLOOP.md)。
3. **測試結果文件範本**：`docs/TEST_RESULTS.md`。
4. **截圖目錄**：`docs/screenshots/`。
5. **README / TROUBLESHOOTING**：新增「Chrome 測試與截圖」一節。

---

## 產出清單

| 產出 | 說明 |
|------|------|
| `.cursor/skills/chrome-browser-testing/SKILL.md` | Chrome 測試 + 截圖流程 + 測試結果文件撰寫指引 |
| `docs/testplan/INSTALL_BROWSERLOOP.md` | BrowserLoop 安裝與 Cursor MCP 設定步驟 |
| `docs/TEST_RESULTS.md` | 測試結果文件範本 |
| `docs/screenshots/` | 截圖目錄（JPG 存放處） |
| README 或 TROUBLESHOOTING 增修 | 一節說明 Skill 與 MCP 設定 |

---

## 注意事項

- Skill 僅指引流程，不修改業務邏輯；測試以 MCP 操作與截圖為主。
- 未安裝 BrowserLoop 時，Skill 會引導先安裝再擷取 JPG，或僅產出測試結果文字。

---

## 結論（2026-02-01）

- **完整測試腳本**：`npm run test:screenshots` 執行 `scripts/full-test-screenshots.js`，擷取 8 張截圖（生命徵象完整輸入 SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15）。
- **PDF 報告**：`npm run report:pdf` 將 `docs/TEST_RESULTS.md` 與截圖合併產出 `docs/reports/TEST_REPORT.pdf`；技能見 `.cursor/skills/pdf-report-generator/SKILL.md`。
- **計畫**：返回上一步測試與 PDF 技能計畫見 [BACK_STEP_TEST_PDF_PLAN.md](./BACK_STEP_TEST_PDF_PLAN.md)。
