# React MUI TTAS 急診檢傷系統範例

這是一個基於 **React**, **Material UI (MUI)**, **React Hook Form** 以及 **Zod** 構建的急診檢傷五級 (Taiwan Triage and Acuity Scale, TTAS) 判定表單範例。

---

## 📚 重要文檔（繁體中文）

### 🎯 初學者請先看這裡！

如果您是初學者或第一次接觸 Pull Request，請按以下順序閱讀文檔：

1. **[📄 完成報告-請先閱讀.md](./完成報告-請先閱讀.md)**  
   👉 **從這裡開始！** 了解代碼審查結果和下一步該做什麼

2. **[🛠️ TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**  
   👉 **常見問題解決** 遇到底層錯誤或設定問題時的求救指南

3. **[📄 CODE_REVIEW_ZH-TW.md](./CODE_REVIEW_ZH-TW.md)**  
   詳細的代碼審查報告，包含優點、需要改進的地方和具體建議

4. **[📘 PULL_REQUEST_GUIDE_ZH-TW.md](./PULL_REQUEST_GUIDE_ZH-TW.md)**  
   Pull Request 完整指南，適合初學者學習 Git 和 GitHub 工作流程

5. **[📊 IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)**  
   代碼改進摘要，列出所有已實施的改進

---

## Chrome 測試與截圖

- **Chrome 測試 Skill**：專案內 `.cursor/skills/chrome-browser-testing/` 提供 Cursor 用於在 Chrome 上測試表單、擷取畫面並產出測試結果文件的指引。
- **測試結果文件**：撰寫於 [docs/TEST_RESULTS.md](./docs/TEST_RESULTS.md)；截圖存放於 `docs/screenshots/`（建議檔名 `YYYYMMDD_步驟簡述.jpg`）。
- **擷取 JPG**：需在 Cursor 中啟用 **BrowserLoop** MCP；安裝步驟見 [docs/testplan/INSTALL_BROWSERLOOP.md](./docs/testplan/INSTALL_BROWSERLOOP.md)。計畫說明見 [docs/testplan/README.md](./docs/testplan/README.md)。
- **完整測試與 PDF**：執行 `npm run test:screenshots` 擷取 8 張截圖；執行 `npm run report:pdf` 產生 `docs/reports/TEST_REPORT.pdf`。PDF 技能見 `.cursor/skills/pdf-report-generator/SKILL.md`。

---

## 🌟 核心功能

- **狀態驅動表單**：使用 `React Hook Form` 進行高效的表單狀態管理與渲染優化。
- **TypeScript 型別安全**：全面使用 TS 定義醫療數據結構，避免計算錯誤。
- **即時自動判定**：當醫護人員輸入 SBP, HR, SpO2 或 GCS 等生命徵象時，系統會根據內建邏輯自動計算建議的檢傷級別 (Level 1-5)。
- **人工覆核機制**：系統自動判定後，預設帶入最終確認欄位，允許醫護人員根據臨床判斷進行手動修改與最終確認。
- **資料驗證**：整合 `Zod` 進行嚴格的欄位驗證（例如病人主訴為必填）。
- **現代化 UI**：採用 Material UI 5.x 構建，具備響應式設計，適合平板與 PC 使用。

## 🛠️ 技術棧

- **Frontend**: React 18+ (TypeScript)
- **Language**: TypeScript 5.x
- **UI Framework**: Material UI (MUI) v5
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Logic**: 簡化版 TTAS (急診檢傷與急迫性分級)

## 🚀 快速開始

1. **複製專案**
   ```bash
   git clone https://github.com/smlht2005/triage-ttas-example.git
   cd triage-ttas-example
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm start
   ```

4. **建置專案**
   ```bash
   npm run build
   ```

## 📋 檢傷判定邏輯 (簡化參考)

| 級別 | 定義 | 關鍵指標 (範例) |
| :--- | :--- | :--- |
| **Level 1** | 復甦救援 | SpO2 < 80% 或 GCS ≤ 8 |
| **Level 2** | 危急 | SpO2 80-90% 或 SBP > 220 |
| **Level 3** | 緊急 | SpO2 90-95% 或 SBP > 180 |
| **Level 4** | 次緊急 | 一般生命徵象異常但穩定 |
| **Level 5** | 非緊急 | 生命徵象正常 |

---

## 📁 專案結構

```
triage-ttas-example/
├── public/                      # 靜態檔案
│   └── index.html               # 入口 HTML
├── src/                         # 原始碼
│   ├── index.tsx                # React 入口點
│   ├── TriageForm.tsx           # 主要表單組件
│   ├── constants.ts             # 常量與型別定義
│   ├── utils/
│   │   └── triageCalculator.ts  # 檢傷計算邏輯
│   └── __tests__/               # 自動化測試
│       └── utils/
│           └── triageCalculator.test.ts
├── .eslintrc.json               # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .env.example                 # 環境變數範例
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 專案配置和依賴
└── [繁體中文文檔]               # 完整的中文文檔

```

---

## 🧪 測試

運行測試（需要先安裝測試依賴）：

```bash
# 安裝測試依賴
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# 運行測試
npm test
```

測試涵蓋：
- ✅ 所有檢傷級別計算邏輯
- ✅ 錯誤處理和邊界情況
- ✅ 優先級判定

---

## 🔍 代碼品質工具

### ESLint（代碼檢查）

```bash
# 安裝 ESLint
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks

# 運行 linter
npm run lint
```

### Prettier（代碼格式化）

```bash
# 安裝 Prettier
npm install --save-dev prettier

# 格式化代碼
npx prettier --write .
```

---

## 📝 授權

MIT License.
