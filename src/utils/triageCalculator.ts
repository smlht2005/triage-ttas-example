import { TRIAGE_THRESHOLDS, TriageLevel } from '../constants';

/**
 * 安全地解析整數值
 */
export const safeParseInt = (value: string | number | undefined, defaultValue: number = 0): number => {
  if (value === undefined || value === '') return defaultValue;
  const parsed = typeof value === 'number' ? value : parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export interface VitalsData {
  sbp?: string | number;
  hr?: string | number;
  spo2?: string | number;
  rr?: string | number;
  temp?: string | number;
  gcs?: string | number;
}

/**
 * 根據生命徵象計算檢傷級別 (TTAS 簡化版)
 */
export const calculateTriageLevel = (vitals: VitalsData): TriageLevel => {
  // 安全解析所有數值
  const sbp = safeParseInt(vitals.sbp);
  const hr = safeParseInt(vitals.hr);
  const spo2 = safeParseInt(vitals.spo2);
  const gcs = safeParseInt(vitals.gcs, 15); // GCS 預設為 15 (正常)

  // Level 1: 復甦救援 - 危及生命的狀況
  if (
    (spo2 > 0 && spo2 < TRIAGE_THRESHOLDS.SPO2_CRITICAL) || 
    gcs <= TRIAGE_THRESHOLDS.GCS_COMA
  ) {
    return 1;
  }

  // Level 2: 危急 - 嚴重但穩定
  if (
    (spo2 >= TRIAGE_THRESHOLDS.SPO2_CRITICAL && spo2 < TRIAGE_THRESHOLDS.SPO2_DANGEROUS) ||
    sbp > TRIAGE_THRESHOLDS.SBP_CRITICAL ||
    hr > TRIAGE_THRESHOLDS.HR_CRITICAL_HIGH ||
    (hr > 0 && hr < TRIAGE_THRESHOLDS.HR_CRITICAL_LOW)
  ) {
    return 2;
  }

  // Level 3: 緊急 - 需要儘快處理
  if (
    (spo2 >= TRIAGE_THRESHOLDS.SPO2_DANGEROUS && spo2 < TRIAGE_THRESHOLDS.SPO2_WARNING) ||
    sbp > TRIAGE_THRESHOLDS.SBP_DANGEROUS ||
    hr > TRIAGE_THRESHOLDS.HR_WARNING
  ) {
    return 3;
  }

  // Level 4: 次緊急 - 有生命徵象異常但穩定
  if (sbp > 0 || hr > 0 || spo2 > 0) {
    return 4;
  }

  // Level 5: 非緊急 - 預設級別（無生命徵象數據）
  return 5;
};
