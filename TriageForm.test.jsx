import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TriageForm from './TriageForm';

// 測試工具函數：自訂 render
const renderTriageForm = () => {
  return render(<TriageForm />);
};

// 輔助函數：獲取系統建議級別
const getSystemSuggestedLevel = () => {
  // 系統初步建議位於特定的 Box 中
  const suggestionText = screen.getByText(/系統初步建議/i);
  const suggestionBox = suggestionText.parentElement;
  // 在這個 Box 中找到 Chip (使用 MuiChip 的 class)
  const chipElement = suggestionBox.querySelector('[class*="MuiChip"]');
  if (chipElement) {
    return chipElement.textContent;
  }
  throw new Error('Could not find system suggested level');
};

describe('TriageForm 元件測試', () => {
  // ============================================
  // 基本渲染測試
  // ============================================
  describe('基本渲染測試', () => {
    test('測試元件是否正確渲染', () => {
      renderTriageForm();
      // 驗證標題存在
      expect(screen.getByText(/TTAS 急診檢傷系統/i)).toBeInTheDocument();
    });

    test('驗證所有表單欄位是否存在（SBP, HR, SpO2, RR, Temp, GCS）', () => {
      renderTriageForm();
      
      // 驗證生命徵象輸入欄位
      expect(screen.getByLabelText(/SBP/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^HR$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/SPO2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^RR$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/TEMP/i)).toBeInTheDocument();
      
      // 驗證 GCS 選單存在 - 使用文字內容搜尋
      expect(screen.getByText('GCS 15 (清醒)')).toBeInTheDocument();
    });

    test('驗證病人主訴輸入框存在', () => {
      renderTriageForm();
      
      // 使用 placeholder 來找到主訴輸入框
      expect(screen.getByPlaceholderText(/請輸入病人主訴/i)).toBeInTheDocument();
    });

    test('驗證提交按鈕存在', () => {
      renderTriageForm();
      
      // 驗證提交按鈕
      expect(screen.getByRole('button', { name: /完成檢傷並存檔/i })).toBeInTheDocument();
    });
  });

  // ============================================
  // 自動檢傷級別計算測試
  // ============================================
  describe('自動檢傷級別計算測試', () => {
    test('Level 1 測試：SpO2 < 80% 應該返回 Level 1', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const spo2Input = screen.getByLabelText(/SPO2/i);
      
      // 輸入 SpO2 = 75 (< 80)
      await user.clear(spo2Input);
      await user.type(spo2Input, '75');
      
      // 等待自動判定更新 - 查找系統建議
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 1');
      });
    });

    test('Level 1 測試：GCS ≤ 8 應該返回 Level 1', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 點擊 GCS 選單文字來打開選單
      const gcsButton = screen.getByText('GCS 15 (清醒)').closest('div[role="combobox"]');
      await user.click(gcsButton);
      
      // 選擇 GCS ≤ 8 選項
      const gcsOption = await screen.findByRole('option', { name: /GCS ≤ 8 \(昏迷\)/i });
      await user.click(gcsOption);
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 1');
      });
    });

    test('Level 2 測試：SpO2 80-89% 應該返回 Level 2', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const spo2Input = screen.getByLabelText(/SPO2/i);
      
      // 輸入 SpO2 = 85 (80-89)
      await user.clear(spo2Input);
      await user.type(spo2Input, '85');
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 2');
      });
    });

    test('Level 2 測試：SBP > 220 應該返回 Level 2', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const sbpInput = screen.getByLabelText(/SBP/i);
      
      // 輸入 SBP = 230 (> 220)
      await user.clear(sbpInput);
      await user.type(sbpInput, '230');
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 2');
      });
    });

    test('Level 2 測試：HR > 150 應該返回 Level 2', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const hrInput = screen.getByLabelText(/^HR$/i);
      
      // 輸入 HR = 160 (> 150)
      await user.clear(hrInput);
      await user.type(hrInput, '160');
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 2');
      });
    });

    test('Level 2 測試：HR < 40 應該返回 Level 2', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const hrInput = screen.getByLabelText(/^HR$/i);
      
      // 輸入 HR = 35 (< 40)
      await user.clear(hrInput);
      await user.type(hrInput, '35');
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 2');
      });
    });

    test('Level 3 測試：SpO2 90-94% 應該返回 Level 3', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const spo2Input = screen.getByLabelText(/SPO2/i);
      
      // 輸入 SpO2 = 92 (90-94)
      await user.clear(spo2Input);
      await user.type(spo2Input, '92');
      
      // 等待輸入完成並驗證值
      await waitFor(() => {
        expect(spo2Input).toHaveValue(92);
      });
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 3');
      });
    });

    test('Level 3 測試：SBP > 180 應該返回 Level 3', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const sbpInput = screen.getByLabelText(/SBP/i);
      
      // 輸入 SBP = 190 (> 180, <= 220)
      await user.clear(sbpInput);
      await user.type(sbpInput, '190');
      
      // 等待輸入完成並驗證值
      await waitFor(() => {
        expect(sbpInput).toHaveValue(190);
      });
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 3');
      });
    });

    test('Level 3 測試：HR > 120 應該返回 Level 3', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const hrInput = screen.getByLabelText(/^HR$/i);
      
      // 輸入 HR = 130 (> 120, <= 150)
      await user.clear(hrInput);
      await user.type(hrInput, '130');
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 3');
      });
    });

    test('Level 4 測試：一般異常但穩定的生命徵象', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const sbpInput = screen.getByLabelText(/SBP/i);
      
      // 輸入 SBP = 140 (一般異常但穩定)
      await user.clear(sbpInput);
      await user.type(sbpInput, '140');
      
      // 等待輸入完成並驗證值
      await waitFor(() => {
        expect(sbpInput).toHaveValue(140);
      });
      
      // 等待自動判定更新
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 4');
      });
    });

    test('Level 5 測試：正常生命徵象應該返回 Level 5', async () => {
      renderTriageForm();
      
      // 預設狀態（無輸入任何生命徵象）應該是 Level 5
      const levelText = getSystemSuggestedLevel();
      expect(levelText).toBe('Level 5');
    });
  });

  // ============================================
  // 表單互動測試
  // ============================================
  describe('表單互動測試', () => {
    test('測試輸入生命徵象數值時，系統建議級別是否正確更新', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 先確認初始是 Level 5
      let levelText = getSystemSuggestedLevel();
      expect(levelText).toBe('Level 5');
      
      const sbpInput = screen.getByLabelText(/SBP/i);
      
      // 輸入高血壓數值
      await user.clear(sbpInput);
      await user.type(sbpInput, '200');
      
      // 等待輸入完成
      await waitFor(() => {
        expect(sbpInput).toHaveValue(200);
      });
      
      // 驗證級別更新到 Level 3
      await waitFor(() => {
        levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 3');
      });
    });

    test('測試 GCS 下拉選單變更功能', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 點擊 GCS 選單文字來打開選單
      const gcsButton = screen.getByText('GCS 15 (清醒)').closest('div[role="combobox"]');
      await user.click(gcsButton);
      
      // 選擇中度意識障礙
      const gcsOption = await screen.findByRole('option', { name: /GCS 9-13 \(中度\)/i });
      await user.click(gcsOption);
      
      // 驗證選項已選中
      await waitFor(() => {
        expect(screen.getByText(/GCS 9-13 \(中度\)/i)).toBeInTheDocument();
      });
    });

    test('測試病人主訴輸入功能', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      const complaintInput = screen.getByPlaceholderText(/請輸入病人主訴/i);
      
      // 輸入主訴
      await user.type(complaintInput, '胸痛三小時');
      
      // 驗證輸入內容
      expect(complaintInput).toHaveValue('胸痛三小時');
    });

    test('測試最終級別可以手動調整（覆寫自動判定）', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 先輸入會產生 Level 2 的數值
      const hrInput = screen.getByLabelText(/^HR$/i);
      await user.clear(hrInput);
      await user.type(hrInput, '160');
      
      // 等待自動判定更新到 Level 2
      await waitFor(() => {
        const levelText = getSystemSuggestedLevel();
        expect(levelText).toBe('Level 2');
      });
      
      // 手動調整最終級別到 Level 3
      // 使用文字內容找到最終級別選單
      const allSelects = screen.getAllByRole('combobox');
      // 第一個應該是 GCS，第二個是最終級別
      const finalLevelSelect = allSelects[1];
      await user.click(finalLevelSelect);
      
      const level3Option = await screen.findByRole('option', { name: /^Level 3$/i });
      await user.click(level3Option);
      
      // 驗證最終級別已更新 - 檢查選項是否出現在選單中
      await waitFor(() => {
        const options = screen.queryAllByText(/^Level 3$/);
        expect(options.length).toBeGreaterThan(0);
      });
    });
  });

  // ============================================
  // 驗證測試
  // ============================================
  describe('驗證測試', () => {
    test('測試未填寫病人主訴時提交表單，應該顯示錯誤訊息', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 不輸入主訴，直接提交
      const submitButton = screen.getByRole('button', { name: /完成檢傷並存檔/i });
      await user.click(submitButton);
      
      // 驗證錯誤訊息顯示
      await waitFor(() => {
        expect(screen.getByText(/請輸入病人主訴/i)).toBeInTheDocument();
      });
    });

    test('測試錯誤訊息正確顯示「請輸入病人主訴」', async () => {
      const user = userEvent.setup();
      renderTriageForm();
      
      // 不輸入主訴，直接提交
      const submitButton = screen.getByRole('button', { name: /完成檢傷並存檔/i });
      await user.click(submitButton);
      
      // 驗證確切的錯誤訊息文字
      await waitFor(() => {
        const errorMessage = screen.getByText('請輸入病人主訴');
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // 提交測試
  // ============================================
  describe('提交測試', () => {
    test('測試成功填寫所有必填欄位並提交', async () => {
      const user = userEvent.setup();
      
      // Mock alert
      window.alert = jest.fn();
      
      renderTriageForm();
      
      // 填寫生命徵象
      const sbpInput = screen.getByLabelText(/SBP/i);
      const hrInput = screen.getByLabelText(/^HR$/i);
      const spo2Input = screen.getByLabelText(/SPO2/i);
      const complaintInput = screen.getByPlaceholderText(/請輸入病人主訴/i);
      
      await user.type(sbpInput, '120');
      await user.type(hrInput, '80');
      await user.type(spo2Input, '98');
      await user.type(complaintInput, '發燒兩天');
      
      // 提交表單
      const submitButton = screen.getByRole('button', { name: /完成檢傷並存檔/i });
      await user.click(submitButton);
      
      // 驗證提交成功（alert 被呼叫）
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalled();
      });
    });

    test('驗證 onSubmit 函數被正確呼叫', async () => {
      const user = userEvent.setup();
      
      // Mock console.log 來驗證
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // Mock alert
      window.alert = jest.fn();
      
      renderTriageForm();
      
      // 填寫必填欄位
      const complaintInput = screen.getByPlaceholderText(/請輸入病人主訴/i);
      await user.type(complaintInput, '頭痛');
      
      // 提交表單
      const submitButton = screen.getByRole('button', { name: /完成檢傷並存檔/i });
      await user.click(submitButton);
      
      // 驗證 console.log 被呼叫（元件內部會記錄提交數據）
      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          '提交數據:',
          expect.objectContaining({
            complaint: '頭痛',
            finalLevel: expect.any(Number),
            vitals: expect.any(Object)
          })
        );
      });
      
      consoleLogSpy.mockRestore();
    });

    test('驗證提交的資料格式正確', async () => {
      const user = userEvent.setup();
      
      // Mock console.log 來驗證資料格式
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // Mock alert
      window.alert = jest.fn();
      
      renderTriageForm();
      
      // 填寫完整資料
      const sbpInput = screen.getByLabelText(/SBP/i);
      const hrInput = screen.getByLabelText(/^HR$/i);
      const spo2Input = screen.getByLabelText(/SPO2/i);
      const rrInput = screen.getByLabelText(/^RR$/i);
      const tempInput = screen.getByLabelText(/TEMP/i);
      const complaintInput = screen.getByPlaceholderText(/請輸入病人主訴/i);
      
      await user.type(sbpInput, '130');
      await user.type(hrInput, '90');
      await user.type(spo2Input, '96');
      await user.type(rrInput, '18');
      await user.type(tempInput, '37.5');
      await user.type(complaintInput, '腹痛一天');
      
      // 提交表單
      const submitButton = screen.getByRole('button', { name: /完成檢傷並存檔/i });
      await user.click(submitButton);
      
      // 驗證提交的資料結構
      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          '提交數據:',
          expect.objectContaining({
            vitals: expect.objectContaining({
              sbp: '130',
              hr: '90',
              spo2: '96',
              rr: '18',
              temp: '37.5',
              gcs: '15'
            }),
            complaint: '腹痛一天',
            finalLevel: 4
          })
        );
      });
      
      consoleLogSpy.mockRestore();
    });
  });
});

