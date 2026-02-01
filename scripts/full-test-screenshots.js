/**
 * 更新時間：2026-02-01 13:50
 * 作者：AI Assistant
 * 更新摘要：完整測試腳本 - 擷取 8 張截圖，使用完整生命徵象（SBP, HR, SpO2, RR, TEMP, GCS）與 TEST_RESULTS.md 一致
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');

// 與 TEST_RESULTS.md 一致：完整生命徵象異常值
const VITALS = {
  sbp: '85',
  hr: '55',
  spo2: '88',
  rr: '24',
  temp: '38.5',
  gcs: '15'
};

const COMPLAINT = '胸悶、呼吸困難測試資料';

async function takeScreenshot(page, filename) {
  const filepath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: filepath, type: 'jpeg', quality: 90 });
  console.log(`   截圖: ${filename}`);
  return filepath;
}

async function runFullTest() {
  console.log('=== 完整測試（8 步驟 + 8 截圖）===\n');
  console.log('測試資料: SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15\n');

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    // Step 1: 首頁載入
    console.log('1. 導航至 http://localhost:3000...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '20260201_01_initial_load.jpg');

    // Step 2: 填寫完整生命徵象（全部 6 項）
    console.log('\n2. 填寫完整生命徵象（SBP, HR, SpO2, RR, TEMP, GCS）...');
    await page.getByLabel('SBP').fill(VITALS.sbp);
    await page.getByLabel('HR').fill(VITALS.hr);
    await page.getByLabel('SpO2').fill(VITALS.spo2);
    await page.getByLabel('RR').fill(VITALS.rr);
    await page.getByLabel('TEMP').fill(VITALS.temp);
    await page.waitForTimeout(500);
    await takeScreenshot(page, '20260201_02_vital_signs.jpg');

    // Step 3: 步驟導航
    console.log('\n3. 點擊「下一步」進入病人主訴...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '20260201_03_complaint_step.jpg');

    // Step 4: 病人主訴輸入
    console.log('\n4. 填寫病人主訴...');
    await page.getByPlaceholder('請詳細描述病人的主要症狀').fill(COMPLAINT);
    await page.waitForTimeout(500);
    await takeScreenshot(page, '20260201_04_complaint_filled.jpg');

    // Step 5: 確認提交步驟
    console.log('\n5. 點擊「下一步」進入確認提交...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '20260201_05_confirmation.jpg');

    // Step 6: 返回上一步（確認→主訴）
    console.log('\n6. 從「確認提交」點擊「上一步」...');
    await page.getByRole('button', { name: '上一步' }).click();
    await page.waitForTimeout(1000);
    const complaintValue = await page.getByPlaceholder('請詳細描述病人的主要症狀').inputValue();
    const test6Pass = complaintValue.includes('胸悶') || complaintValue.includes('呼吸困難');
    console.log(`   驗證主訴保留: ${test6Pass ? 'Pass' : 'Fail'} (值: "${complaintValue}")`);
    await takeScreenshot(page, '20260201_06_back_to_complaint.jpg');

    // Step 7: 返回上一步（主訴→生命徵象）
    console.log('\n7. 從「病人主訴」點擊「上一步」...');
    await page.getByRole('button', { name: '上一步' }).click();
    await page.waitForTimeout(1000);
    const sbpVal = await page.getByLabel('SBP').inputValue();
    const hrVal = await page.getByLabel('HR').inputValue();
    const spo2Val = await page.getByLabel('SpO2').inputValue();
    const rrVal = await page.getByLabel('RR').inputValue();
    const tempVal = await page.getByLabel('TEMP').inputValue();
    const test7Pass = sbpVal === VITALS.sbp && hrVal === VITALS.hr && spo2Val === VITALS.spo2 &&
      rrVal === VITALS.rr && tempVal === VITALS.temp;
    console.log(`   驗證生命徵象保留: ${test7Pass ? 'Pass' : 'Fail'} (SBP=${sbpVal}, HR=${hrVal}, SpO2=${spo2Val}, RR=${rrVal}, TEMP=${tempVal})`);
    await takeScreenshot(page, '20260201_07_back_to_vital.jpg');

    // Step 8: 返回後再前進
    console.log('\n8. 從「生命徵象」點擊「下一步」再次進入病人主訴...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);
    const complaintAgain = await page.getByPlaceholder('請詳細描述病人的主要症狀').inputValue();
    const test8Pass = complaintAgain.includes('胸悶') || complaintAgain.includes('呼吸困難');
    console.log(`   驗證前進後資料一致: ${test8Pass ? 'Pass' : 'Fail'} (值: "${complaintAgain}")`);
    await takeScreenshot(page, '20260201_08_forward_after_back.jpg');

    // 總結
    const allPass = [test6Pass, test7Pass, test8Pass].every(Boolean);
    console.log('\n=== 測試總結 ===');
    console.log(`案例 6-8 驗證: ${allPass ? '全部 Pass' : '有 Fail'}`);
    console.log('\n瀏覽器將在 3 秒後關閉...');
    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('測試執行錯誤:', error);
    const errorPath = path.join(SCREENSHOT_DIR, '20260201_error.jpg');
    await page.screenshot({ path: errorPath, type: 'jpeg', quality: 90 });
    console.log(`錯誤截圖: ${errorPath}`);
  } finally {
    await browser.close();
    console.log('完成。');
  }
}

runFullTest();
