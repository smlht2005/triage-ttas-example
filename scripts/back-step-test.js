/**
 * 更新時間：2026-02-01 13:50
 * 作者：AI Assistant
 * 更新摘要：與 TEST_RESULTS.md 對齊，使用完整生命徵象異常值（SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5）
 *
 * 更新時間：2026-02-01 12:38
 * 作者：AI Assistant
 * 更新摘要：「返回上一步」測試腳本 - 使用 Playwright 進行 Stepper 導航測試
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');

// 與 TEST_RESULTS.md 一致
const VITALS = { sbp: '85', hr: '55', spo2: '88', rr: '24', temp: '38.5' };

async function runBackStepTest() {
  console.log('=== 開始「返回上一步」測試 ===\n');

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('1. 導航至 http://localhost:3000...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('2. 填寫完整生命徵象 (SBP=85, HR=55, SpO2=88, RR=24, TEMP=38.5, GCS=15)...');
    await page.getByLabel('SBP').fill(VITALS.sbp);
    await page.getByLabel('HR').fill(VITALS.hr);
    await page.getByLabel('SpO2').fill(VITALS.spo2);
    await page.getByLabel('RR').fill(VITALS.rr);
    await page.getByLabel('TEMP').fill(VITALS.temp);
    await page.waitForTimeout(500);

    // Step 3: 點擊下一步進入病人主訴
    console.log('3. 點擊「下一步」進入病人主訴...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);

    // Step 4: 填寫病人主訴
    console.log('4. 填寫病人主訴...');
    const complaintInput = page.getByPlaceholder('請詳細描述病人的主要症狀');
    await complaintInput.fill('胸悶、呼吸困難測試資料');
    await page.waitForTimeout(500);

    // Step 5: 點擊下一步進入確認提交
    console.log('5. 點擊「下一步」進入確認提交...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);

    // === 開始返回測試 ===
    console.log('\n=== 開始「返回上一步」測試 ===\n');

    // Step 6: 從確認提交返回病人主訴
    console.log('6. 從「確認提交」點擊「上一步」...');
    await page.getByRole('button', { name: '上一步' }).click();
    await page.waitForTimeout(1000);
    
    // 截圖：返回病人主訴步驟
    const screenshot6Path = path.join(SCREENSHOT_DIR, '20260201_06_back_to_complaint.jpg');
    await page.screenshot({ path: screenshot6Path, type: 'jpeg', quality: 90 });
    console.log(`   截圖已儲存: ${screenshot6Path}`);

    // 驗證主訴資料是否保留
    const complaintInputBack = page.getByPlaceholder('請詳細描述病人的主要症狀');
    const complaintValue = await complaintInputBack.inputValue();
    const test6Pass = complaintValue.includes('胸悶') || complaintValue.includes('呼吸困難');
    console.log(`   驗證主訴資料保留: ${test6Pass ? 'Pass ✓' : 'Fail ✗'} (值: "${complaintValue}")`);

    // Step 7: 從病人主訴返回生命徵象
    console.log('\n7. 從「病人主訴」點擊「上一步」...');
    await page.getByRole('button', { name: '上一步' }).click();
    await page.waitForTimeout(1000);

    // 截圖：返回生命徵象步驟
    const screenshot7Path = path.join(SCREENSHOT_DIR, '20260201_07_back_to_vital.jpg');
    await page.screenshot({ path: screenshot7Path, type: 'jpeg', quality: 90 });
    console.log(`   截圖已儲存: ${screenshot7Path}`);

    // 驗證生命徵象資料是否保留
    const sbpValue = await page.getByLabel('SBP').inputValue();
    const hrValue = await page.getByLabel('HR').inputValue();
    const test7Pass = sbpValue === VITALS.sbp && hrValue === VITALS.hr;
    console.log(`   驗證生命徵象資料保留: ${test7Pass ? 'Pass ✓' : 'Fail ✗'} (SBP: ${sbpValue}, HR: ${hrValue})`);

    // Step 8: 返回後再次前進驗證
    console.log('\n8. 返回後再次前進驗證資料一致性...');
    await page.getByRole('button', { name: '下一步' }).click();
    await page.waitForTimeout(1000);

    // 截圖：返回後前進至病人主訴
    const screenshot8Path = path.join(SCREENSHOT_DIR, '20260201_08_forward_after_back.jpg');
    await page.screenshot({ path: screenshot8Path, type: 'jpeg', quality: 90 });
    console.log(`   截圖已儲存: ${screenshot8Path}`);

    // 驗證主訴資料仍保留
    const complaintInputForward = page.getByPlaceholder('請詳細描述病人的主要症狀');
    const complaintValueAgain = await complaintInputForward.inputValue();
    const test8Pass = complaintValueAgain.includes('胸悶') || complaintValueAgain.includes('呼吸困難');
    console.log(`   驗證前進後資料一致: ${test8Pass ? 'Pass ✓' : 'Fail ✗'} (值: "${complaintValueAgain}")`);

    // 總結
    console.log('\n=== 測試總結 ===');
    console.log(`測試案例 6 (確認提交→病人主訴): ${test6Pass ? 'Pass ✓' : 'Fail ✗'}`);
    console.log(`測試案例 7 (病人主訴→生命徵象): ${test7Pass ? 'Pass ✓' : 'Fail ✗'}`);
    console.log(`測試案例 8 (返回後再前進): ${test8Pass ? 'Pass ✓' : 'Fail ✗'}`);
    console.log(`\n通過率: ${[test6Pass, test7Pass, test8Pass].filter(Boolean).length}/3`);

    // 等待用戶查看
    console.log('\n瀏覽器將在 5 秒後關閉...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('測試執行錯誤:', error);
    // 錯誤時也截圖
    const errorPath = path.join(SCREENSHOT_DIR, '20260201_error.jpg');
    await page.screenshot({ path: errorPath, type: 'jpeg', quality: 90 });
    console.log(`錯誤截圖已儲存: ${errorPath}`);
  } finally {
    await browser.close();
    console.log('\n瀏覽器已關閉。');
  }
}

runBackStepTest();
