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
