import { TRIAGE_THRESHOLDS } from '../constants';

/**
 * 安全地解析整數值
 * @param {string|number} value - 要解析的值
 * @param {number} defaultValue - 解析失敗時的預設值
 * @returns {number} 解析後的整數或預設值
 */
export const safeParseInt = (value, defaultValue = 0) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * 根據生命徵象計算檢傷級別 (TTAS 簡化版)
 * 
 * 檢傷級別定義：
 * Level 1 (復甦救援): 需要立即處置的危及生命狀況
 * Level 2 (危急): 10 分鐘內需要處理
 * Level 3 (緊急): 30 分鐘內需要處理
 * Level 4 (次緊急): 60 分鐘內需要處理
 * Level 5 (非緊急): 120 分鐘內需要處理
 * 
 * @param {Object} vitals - 生命徵象對象
 * @param {string|number} vitals.sbp - 收縮壓 (Systolic Blood Pressure)
 * @param {string|number} vitals.hr - 心率 (Heart Rate)
 * @param {string|number} vitals.spo2 - 血氧飽和度 (SpO2)
 * @param {string|number} vitals.gcs - 格拉斯哥昏迷指數 (Glasgow Coma Scale)
 * @returns {number} 檢傷級別 (1-5)
 */
export const calculateTriageLevel = (vitals) => {
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
  if (sbp > 0 || hr > 0) {
    return 4;
  }

  // Level 5: 非緊急 - 預設級別
  return 5;
};
