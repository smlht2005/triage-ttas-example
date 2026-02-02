/**
 * 更新時間：2026-02-01 11:45
 * 作者：AI Assistant
 * 更新摘要：TTAS 檢傷級別常量與配置
 */

/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：constants.ts
 * 修改日期：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：系統常量與 TypeScript 型別定義
 */
// TTAS 檢傷級別閾值常量
export const TRIAGE_THRESHOLDS = {
  SPO2_CRITICAL: 80,
  SPO2_DANGEROUS: 90,
  SPO2_WARNING: 95,
  GCS_COMA: 8,
  GCS_MODERATE: 9,
  GCS_MODERATE_HIGH: 13,
  SBP_CRITICAL: 220,
  SBP_DANGEROUS: 180,
  HR_CRITICAL_HIGH: 150,
  HR_CRITICAL_LOW: 40,
  HR_WARNING: 120
};

export type TriageLevel = 1 | 2 | 3 | 4 | 5;

// 檢傷級別顏色對應
export const LEVEL_COLORS: Record<TriageLevel, string> = {
  1: '#d32f2f', // 紅色 - 復甦救援
  2: '#f57c00', // 橘色 - 危急
  3: '#fbc02d', // 黃色 - 緊急
  4: '#388e3c', // 綠色 - 次緊急
  5: '#1976d2'  // 藍色 - 非緊急
};

// GCS 選項
export const GCS_OPTIONS = [
  { value: '15', label: 'GCS 15 (清醒)' },
  { value: '12', label: 'GCS 9-13 (中度)' },
  { value: '8', label: 'GCS ≤ 8 (昏迷)' }
];

export interface VitalSignField {
  name: 'sbp' | 'hr' | 'spo2' | 'rr' | 'temp';
  label: string;
  type: string;
}

// 生命徵象欄位
export const VITAL_SIGNS: VitalSignField[] = [
  { name: 'sbp', label: 'SBP', type: 'number' },
  { name: 'hr', label: 'HR', type: 'number' },
  { name: 'spo2', label: 'SpO2', type: 'number' },
  { name: 'rr', label: 'RR', type: 'number' },
  { name: 'temp', label: 'TEMP', type: 'number' }
];

// 檢傷級別選項
export const TRIAGE_LEVELS: TriageLevel[] = [1, 2, 3, 4, 5];
