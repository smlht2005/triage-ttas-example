# React MUI TTAS 急診檢傷系統範例

這是一個基於 **React**, **Material UI (MUI)**, **React Hook Form** 以及 **Zod** 構建的急診檢傷五級 (Taiwan Triage and Acuity Scale, TTAS) 判定表單範例。

## 🆕 最近更新 (2026-02-04)

- ✅ **修復 AppBar 固定位置**：解決 InfoBar 打開時 AppBar 向左移動的問題
- ✅ **優化表單佈局**：將導航按鈕向上移動，減少不必要的空白間距
- ✅ **修復元素重疊**：解決帳戶資訊與病人 Chip 在窄視窗中的重疊問題
- ✅ **消除內容間隙**：修復主內容區域與側邊欄之間的不必要間隙

詳細更新內容請參見下方的「最新更新」章節。

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

- **🚀 線上預覽**: [https://triage-ttas.zeabur.app/](https://triage-ttas.zeabur.app/)
- **狀態驅動表單**：使用 `React Hook Form` 進行高效的表單狀態管理與渲染優化。
- **TypeScript 型別安全**：全面使用 TS 定義醫療數據結構，避免計算錯誤。
- **即時自動判定**：當醫護人員輸入 SBP, HR, SpO2 或 GCS 等生命徵象時，系統會根據內建邏輯自動計算建議的檢傷級別 (Level 1-5)。
- **人工覆核機制**：系統自動判定後，預設帶入最終確認欄位，允許醫護人員根據臨床判斷進行手動修改與最終確認。
- **資料驗證**：整合 `Zod` 進行嚴格的欄位驗證（例如病人主訴為必填）。
- **現代化 UI**：採用 Material UI 5.x 構建，具備響應式設計，適合平板與 PC 使用。

---

## 📅 最新更新 (2026-02-04)

### UI/UX 佈局優化

#### 1. AppBar 固定位置修復
- **問題**：當點擊 InfoBar 的 brain icon 時，AppBar 會向左移動
- **修復**：
  - 移除 AppBar `width` 對 `infoOpen` 狀態的依賴，保持固定寬度
  - 移除 AppBar `marginRight` 對 `infoOpen` 狀態的依賴，保持固定位置
  - AppBar 現在始終保持固定位置，只有 InfoBar 從右側滑入/滑出
- **檔案**：`src/components/MainLayout.tsx`

#### 2. 表單導航按鈕位置優化
- **問題**：表單內容與導航按鈕（上一步/下一步）之間有大量空白間距
- **修復**：
  - 減少步驟內容區域的 `minHeight`（從 300/400/450px 調整為 200/250px）
  - 減少按鈕區域的上方間距（`mt: 4→2`, `pt: 3→2`）
  - 優化表單佈局，讓按鈕更緊貼表單內容
- **檔案**：`src/components/StepperForm.tsx`

#### 3. AppBar 元素重疊問題修復
- **問題**：帳戶資訊與病人 Chip 在窄視窗中重疊
- **修復**：
  - 病人 Chip 改用 flex 居中佈局，移除絕對定位
  - 響應式優化：病人 Chip 在窄視窗中自動收縮，避免重疊
  - 優化 Toolbar 的 padding，確保元素正確對齊
- **檔案**：`src/components/MainLayout.tsx`

#### 4. 主內容區域間隙修復
- **問題**：主內容區域與側邊欄之間存在不必要的間隙
- **修復**：
  - 移除主內容區域多餘的 `margin-left`
  - 調整 Container 內部 padding，確保內容可讀性的同時消除間隙
- **檔案**：`src/components/MainLayout.tsx`

### 技術細節

- **使用 Chrome DevTools 進行調試**：所有修復都經過 Chrome DevTools 驗證，確保 CSS 計算值正確
- **響應式設計優化**：確保在不同視窗大小下都能正常顯示
- **動畫過渡優化**：保持流暢的 UI 動畫效果

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

## ☁️ 部署到 Zeabur Cloud

本專案已配置 Zeabur 雲端部署，版本為 **v1.1.0**。

### 快速部署

1. **連接 GitHub 倉庫**
   - 前往 [Zeabur](https://zeabur.com)
   - 選擇「從 GitHub 導入」
   - 選擇 `smlht2005/triage-ttas-example` 倉庫

2. **自動檢測**
   - Zeabur 會自動檢測 React 專案
   - 使用 `zeabur.yaml` 配置文件進行部署

3. **環境變數**（可選）
   - `NODE_ENV=production`
   - `REACT_APP_VERSION=1.1.0`

### 配置文件

- **zeabur.yaml**: Zeabur 部署配置
- **.dockerignore**: 優化構建排除不必要文件

### 部署後驗證

部署完成後，訪問您的 Zeabur 域名，確認：
- ✅ 應用程式正常運行
- ✅ 表單功能正常
- ✅ 版本顯示為 1.1.0

---

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

---

## 📋 更新日誌

### 2026-02-04 - UI/UX 佈局優化

本次更新主要針對使用者介面的佈局問題進行修復和優化：

1. **AppBar 固定位置修復** - 解決 InfoBar 打開時 AppBar 向左移動的問題
2. **表單導航按鈕優化** - 減少表單內容與按鈕之間的空白間距
3. **元素重疊問題修復** - 解決響應式設計中的元素重疊問題
4. **內容間隙修復** - 優化主內容區域與側邊欄之間的間距

所有修復都經過 Chrome DevTools 驗證，確保在不同視窗大小下都能正常顯示。

詳細技術細節請參見各組件檔案的更新註解：
- `src/components/MainLayout.tsx`
- `src/components/StepperForm.tsx`
