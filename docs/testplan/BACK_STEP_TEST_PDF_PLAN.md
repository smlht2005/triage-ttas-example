<!--
更新時間：2026-02-01 14:00
作者：AI Assistant
更新摘要：結論與相關 md 更新；計畫已完成，測試資料與截圖、PDF 已對齊

更新時間：2026-02-01 12:30
作者：AI Assistant
更新摘要：建立「返回上一步」測試與 PDF 報告生成技能計劃
-->

# Back Step 測試與 PDF 報告生成技能計劃

## 概述

新增「返回上一步」測試情境，並建立 PDF 生成技能，將 TEST_RESULTS.md 與截圖合併輸出為 PDF 報告。

## 待辦事項

- [x] 執行「返回上一步」測試並擷取截圖（從確認提交返回病人主訴、再返回生命徵象）
- [x] 更新 docs/TEST_RESULTS.md 新增測試案例 6-8
- [x] ~~安裝 md-to-pdf 套件~~ 改用 Playwright + marked（避免 EBUSY 衝突）
- [x] 建立 .cursor/skills/pdf-report-generator/SKILL.md 技能檔案
- [x] 建立 scripts/generate-pdf-report.js 轉換腳本
- [x] 新增 npm script: report:pdf
- [x] 建立 docs/reports/ 目錄存放 PDF 輸出
- [x] 執行 npm run report:pdf 驗證 PDF 生成

---

## 一、新增「返回上一步」測試情境

### 目前缺失的測試案例

現有測試只涵蓋「下一步」導航，需補充以下情境：

| 測試編號 | 情境 | 驗證重點 |
|---------|------|---------|
| 6 | 從「確認提交」點擊「返回」 | 回到「病人主訴」步驟，資料保留 |
| 7 | 從「病人主訴」點擊「返回」 | 回到「生命徵象」步驟，資料保留 |
| 8 | 返回後再前進 | 資料狀態一致、無遺失 |

### 測試流程

使用 `cursor-ide-browser` MCP 執行：

```
1. 輸入完整生命徵象（SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15）後完成前進流程到「確認提交」
2. 點擊「返回」按鈕
3. 截圖驗證步驟回到「病人主訴」
4. 檢查先前輸入的主訴文字是否保留
5. 再次點擊「返回」
6. 截圖驗證步驟回到「生命徵象」
7. 檢查全部生命徵象數值是否保留
```

### 測試腳本

- `npm run test:screenshots`：執行 `scripts/full-test-screenshots.js` 擷取全部 8 張截圖
- 測試資料與 `docs/TEST_RESULTS.md` 一致：SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15

### 更新文件

- 更新 `docs/TEST_RESULTS.md`：新增測試案例 6-8，Step 2 為完整生命徵象
- 截圖：`20260201_01`～`08` 共 8 張

---

## 二、建立 PDF 生成技能

### 安裝依賴

```bash
npm install --save-dev md-to-pdf
```

### 建立新技能檔案

建立 `.cursor/skills/pdf-report-generator/SKILL.md`：

**技能功能**：

- 將 `docs/TEST_RESULTS.md` 轉換為 PDF
- 自動內嵌 `docs/screenshots/` 目錄下的截圖
- 輸出至 `docs/reports/` 目錄

### 建立生成腳本

新增 `scripts/generate-pdf-report.js`：

```javascript
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

async function generateReport() {
  const pdf = await mdToPdf({
    path: 'docs/TEST_RESULTS.md'
  }, {
    dest: 'docs/reports/TEST_REPORT.pdf',
    basedir: path.resolve(__dirname, '../docs')
  });
  console.log('PDF generated:', pdf.filename);
}

generateReport();
```

### 更新 package.json

新增 npm script：

```json
{
  "scripts": {
    "report:pdf": "node scripts/generate-pdf-report.js"
  }
}
```

---

## 三、目錄結構變更

```
docs/
├── TEST_RESULTS.md        # 測試結果（更新）
├── screenshots/           # 截圖目錄
│   ├── 20260201_01_initial_load.jpg
│   ├── ...
│   ├── 20260201_06_back_to_complaint.jpg  # 新增
│   └── 20260201_07_back_to_vital.jpg      # 新增
└── reports/               # PDF 報告輸出目錄（新增）
    └── TEST_REPORT.pdf

.cursor/skills/
├── chrome-browser-testing/
│   └── SKILL.md
└── pdf-report-generator/  # 新增
    └── SKILL.md

scripts/
└── generate-pdf-report.js # 新增
```

---

## 四、使用方式

執行完整測試後，生成 PDF 報告：

```bash
# 生成 PDF 報告
npm run report:pdf
```

輸出：`docs/reports/TEST_REPORT.pdf`

---

## 結論

- **計畫狀態**：待辦已完成；Step 2 為完整生命徵象（SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15），與 `docs/TEST_RESULTS.md` 及 `scripts/full-test-screenshots.js` 一致。
- **產出**：8 張截圖（`docs/screenshots/20260201_01`～`08`）、PDF 報告（`docs/reports/TEST_REPORT.pdf`）。
- **指令**：`npm run test:screenshots` 擷取截圖；`npm run report:pdf` 產生 PDF。
