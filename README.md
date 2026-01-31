# React MUI TTAS 急診檢傷系統範例

這是一個基於 **React**, **Material UI (MUI)**, **React Hook Form** 以及 **Zod** 構建的急診檢傷五級 (Taiwan Triage and Acuity Scale, TTAS) 判定表單範例。

## 🌟 核心功能

- **狀態驅動表單**：使用 `React Hook Form` 進行高效的表單狀態管理與渲染優化。
- **即時自動判定**：當醫護人員輸入 SBP, HR, SpO2 或 GCS 等生命徵象時，系統會根據內建邏輯自動計算建議的檢傷級別 (Level 1-5)。
- **人工覆核機制**：系統自動判定後，預設帶入最終確認欄位，允許醫護人員根據臨床判斷進行手動修改與最終確認。
- **資料驗證**：整合 `Zod` 進行嚴格的欄位驗證（例如病人主訴為必填）。
- **現代化 UI**：採用 Material UI 5.x 構建，具備響應式設計，適合平板與 PC 使用。

## 🛠️ 技術棧

- **Frontend**: React 18+
- **UI Framework**: Material UI (MUI) v5
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Logic**: 簡化版 TTAS (急診檢傷與急迫性分級)
- **Testing**: Jest + React Testing Library

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

## 🧪 測試

本專案包含完整的測試套件，使用 Jest 和 React Testing Library 進行測試。

### 執行測試

```bash
# 執行所有測試
npm test

# 監看模式（自動重新執行測試）
npm run test:watch

# 生成測試覆蓋率報告
npm run test:coverage
```

### 測試覆蓋率

目前測試覆蓋率：
- **Statements**: 100%
- **Branches**: 96.77%
- **Functions**: 100%
- **Lines**: 100%

測試覆蓋率報告會在執行 `npm run test:coverage` 後顯示在終端機中。

### 測試架構

測試套件包含以下幾個主要部分：

#### 1. 基本渲染測試
- 驗證元件正確渲染
- 驗證所有表單欄位存在（SBP, HR, SpO2, RR, Temp, GCS）
- 驗證病人主訴輸入框和提交按鈕

#### 2. 自動檢傷級別計算測試
測試 `calculateLevel` 函數的各種情境：
- **Level 1 (復甦救援)**: SpO2 < 80% 或 GCS ≤ 8
- **Level 2 (危急)**: SpO2 80-89% 或 SBP > 220 或 HR > 150 或 HR < 40
- **Level 3 (緊急)**: SpO2 90-94% 或 SBP > 180 或 HR > 120
- **Level 4 (次緊急)**: 一般生命徵象異常但穩定
- **Level 5 (非緊急)**: 正常生命徵象

#### 3. 表單互動測試
- 測試生命徵象輸入時系統建議級別的更新
- 測試 GCS 下拉選單變更功能
- 測試病人主訴輸入功能
- 測試最終級別可以手動調整（覆寫自動判定）

#### 4. 驗證測試
- 測試未填寫必填欄位時的錯誤訊息顯示
- 驗證錯誤訊息文字正確

#### 5. 提交測試
- 測試成功提交表單
- 驗證 onSubmit 函數被正確呼叫
- 驗證提交的資料格式正確

### 測試最佳實踐

本專案遵循 React Testing Library 的最佳實踐：
- 使用查詢優先級：`getByRole` > `getByLabelText` > `getByText`
- 使用 `user-event` 而非 `fireEvent` 進行互動測試
- 所有測試都包含中文註解說明測試目的
- 使用 `waitFor` 處理非同步更新

## 📋 檢傷判定邏輯 (簡化參考)

| 級別 | 定義 | 關鍵指標 (範例) |
| :--- | :--- | :--- |
| **Level 1** | 復甦救援 | SpO2 < 80% 或 GCS ≤ 8 |
| **Level 2** | 危急 | SpO2 80-90% 或 SBP > 220 |
| **Level 3** | 緊急 | SpO2 90-95% 或 SBP > 180 |
| **Level 4** | 次緊急 | 一般生命徵象異常但穩定 |
| **Level 5** | 非緊急 | 生命徵象正常 |

## 📝 授權

MIT License.
