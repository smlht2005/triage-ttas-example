/**
 * 檢傷級別計算測試
 */

import { calculateTriageLevel, safeParseInt, VitalsData } from '../../utils/triageCalculator';

describe('safeParseInt', () => {
  test('應該正確解析有效的數字字串', () => {
    expect(safeParseInt('123')).toBe(123);
    expect(safeParseInt('0')).toBe(0);
    expect(safeParseInt('999')).toBe(999);
  });

  test('應該正確處理數字類型的輸入', () => {
    expect(safeParseInt(456)).toBe(456);
    expect(safeParseInt(0)).toBe(0);
  });

  test('應該對無效輸入返回預設值', () => {
    expect(safeParseInt('')).toBe(0);
    expect(safeParseInt('abc')).toBe(0);
    expect(safeParseInt(undefined)).toBe(0);
  });

  test('應該使用自訂的預設值', () => {
    expect(safeParseInt('', 10)).toBe(10);
    expect(safeParseInt('invalid', 15)).toBe(15);
  });
});

describe('calculateTriageLevel', () => {
  describe('Level 1 - 復甦救援', () => {
    test('SpO2 < 80 應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '75', sbp: '', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });

    test('SpO2 = 79 應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '79', sbp: '', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });

    test('GCS ≤ 8 應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '', gcs: '8' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });

    test('GCS = 5 應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '', gcs: '5' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });

    test('SpO2 < 80 且 GCS ≤ 8 應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '70', sbp: '', hr: '', gcs: '7' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });
  });

  describe('Level 2 - 危急', () => {
    test('SpO2 在 80-89 範圍應該返回 Level 2', () => {
      expect(calculateTriageLevel({ spo2: '80', sbp: '', hr: '', gcs: '15' })).toBe(2);
      expect(calculateTriageLevel({ spo2: '85', sbp: '', hr: '', gcs: '15' })).toBe(2);
      expect(calculateTriageLevel({ spo2: '89', sbp: '', hr: '', gcs: '15' })).toBe(2);
    });

    test('SBP > 220 應該返回 Level 2', () => {
      const vitals: VitalsData = { spo2: '', sbp: '230', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(2);
    });

    test('HR > 150 應該返回 Level 2', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '160', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(2);
    });

    test('HR < 40 應該返回 Level 2', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '35', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(2);
    });
  });

  describe('Level 3 - 緊急', () => {
    test('SpO2 在 90-94 範圍應該返回 Level 3', () => {
      expect(calculateTriageLevel({ spo2: '90', sbp: '', hr: '', gcs: '15' })).toBe(3);
      expect(calculateTriageLevel({ spo2: '92', sbp: '', hr: '', gcs: '15' })).toBe(3);
      expect(calculateTriageLevel({ spo2: '94', sbp: '', hr: '', gcs: '15' })).toBe(3);
    });

    test('SBP 在 180-220 範圍應該返回 Level 3', () => {
      expect(calculateTriageLevel({ spo2: '', sbp: '190', hr: '', gcs: '15' })).toBe(3);
      expect(calculateTriageLevel({ spo2: '', sbp: '200', hr: '', gcs: '15' })).toBe(3);
    });

    test('HR 在 120-150 範圍應該返回 Level 3', () => {
      expect(calculateTriageLevel({ spo2: '', sbp: '', hr: '125', gcs: '15' })).toBe(3);
      expect(calculateTriageLevel({ spo2: '', sbp: '', hr: '140', gcs: '15' })).toBe(3);
    });
  });

  describe('Level 4 - 次緊急', () => {
    test('有 SBP 但不符合更高級別應該返回 Level 4', () => {
      const vitals: VitalsData = { spo2: '', sbp: '120', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(4);
    });

    test('有 HR 但不符合更高級別應該返回 Level 4', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '80', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(4);
    });

    test('SpO2 ≥ 95 且有其他生命徵象應該返回 Level 4', () => {
      const vitals: VitalsData = { spo2: '98', sbp: '120', hr: '75', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(4);
    });
  });

  describe('Level 5 - 非緊急', () => {
    test('所有生命徵象為空應該返回 Level 5', () => {
      const vitals: VitalsData = { spo2: '', sbp: '', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(5);
    });
  });

  describe('邊界情況測試', () => {
    test('應該處理空對象', () => {
      expect(calculateTriageLevel({})).toBe(5);
    });

    test('應該處理無效的字串輸入', () => {
      const vitals: VitalsData = { spo2: 'abc', sbp: 'def', hr: 'ghi', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(5);
    });

    test('應該處理混合的有效和無效輸入', () => {
      const vitals: VitalsData = { spo2: '75', sbp: 'invalid', hr: '', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });
  });

  describe('優先級測試', () => {
    test('當同時滿足 Level 1 和 Level 2 條件時，應該返回 Level 1', () => {
      const vitals: VitalsData = { spo2: '75', sbp: '250', hr: '160', gcs: '7' };
      expect(calculateTriageLevel(vitals)).toBe(1);
    });

    test('當同時滿足 Level 2 和 Level 3 條件時，應該返回 Level 2', () => {
      const vitals: VitalsData = { spo2: '85', sbp: '190', hr: '125', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(2);
    });

    test('當同時滿足 Level 3 和 Level 4 條件時，應該返回 Level 3', () => {
      const vitals: VitalsData = { spo2: '92', sbp: '150', hr: '100', gcs: '15' };
      expect(calculateTriageLevel(vitals)).toBe(3);
    });
  });
});
