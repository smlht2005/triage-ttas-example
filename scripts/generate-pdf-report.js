/**
 * 更新時間：2026-02-01 13:35
 * 作者：AI Assistant
 * 更新摘要：支援 ![截圖](screenshots/xxx) 格式，截圖區塊使用較大尺寸 (max-height 600px)
 *
 * 更新時間：2026-02-01 13:25
 * 作者：AI Assistant
 * 更新摘要：改用 base64 data URL 內嵌圖片，解決 Chromium 阻擋 file:// 導致圖片無法顯示
 *
 * 更新時間：2026-02-01 13:15
 * 作者：AI Assistant
 * 更新摘要：將 [查看](screenshots/xxx.jpg) 連結轉成內嵌圖片，使 PDF 包含截圖
 *
 * 更新時間：2026-02-01 13:00
 * 作者：AI Assistant
 * 更新摘要：改用 Playwright + marked 生成 PDF，避免 md-to-pdf/puppeteer 的 EBUSY 衝突
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// 路徑設定
const INPUT_FILE = path.join(__dirname, '..', 'docs', 'TEST_RESULTS.md');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'reports');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'TEST_REPORT.pdf');
const DOCS_DIR = path.join(__dirname, '..', 'docs');

const STYLES = `
  body {
    font-family: 'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    color: #667eea;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
    font-size: 24px;
  }
  h2 {
    color: #764ba2;
    margin-top: 30px;
    font-size: 18px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-size: 12px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #667eea;
    color: white;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  img {
    max-width: 100%;
    max-height: 600px;
    height: auto;
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 16px 0 32px 0;
    display: block;
  }
  code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
  }
  ul { margin: 10px 0; padding-left: 24px; }
  li { margin: 4px 0; }
  hr { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
`;

async function generatePdfReport() {
  console.log('=== PDF 報告生成工具 (Playwright) ===\n');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`錯誤：找不到測試結果文件 ${INPUT_FILE}`);
    process.exit(1);
  }
  console.log(`輸入檔案：${INPUT_FILE}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    const mdContent = fs.readFileSync(INPUT_FILE, 'utf-8');

    // 將所有 screenshots/ 路徑的圖片轉成 base64 data URL（支援 [查看](...) 與 ![截圖](...) 兩種格式）
    const toBase64Image = (alt, imgPath) => {
      const absPath = path.resolve(DOCS_DIR, imgPath);
      if (!fs.existsSync(absPath)) return `![${alt}](缺失)`;
      const buf = fs.readFileSync(absPath);
      const ext = path.extname(imgPath).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      const base64 = buf.toString('base64');
      return `![${alt}](data:${mime};base64,${base64})`;
    };
    let processedMd = mdContent.replace(/\[查看\]\((screenshots\/[^)]+)\)/g, (_, p) => toBase64Image('截圖', p));
    processedMd = processedMd.replace(/!\[([^\]]*)\]\((screenshots\/[^)]+)\)/g, (_, alt, p) => toBase64Image(alt || '截圖', p));
    const absMdContent = processedMd;

    const { marked } = await import('marked');
    const htmlContent = marked.parse(absMdContent);
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${STYLES}</style>
</head>
<body>
${htmlContent}
</body>
</html>`;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(fullHtml, { waitUntil: 'networkidle' });

    // 等待圖片載入
    await page.waitForTimeout(1000);

    await page.pdf({
      path: OUTPUT_FILE,
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true
    });

    await browser.close();

    console.log('\n✅ PDF 生成成功！');
    console.log(`輸出檔案：${OUTPUT_FILE}`);
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(`檔案大小：${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('\n❌ PDF 生成失敗：', error.message);
    process.exit(1);
  }
}

generatePdfReport();
