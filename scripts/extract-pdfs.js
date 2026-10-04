// Extract PDF text using pdfjs-dist
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = "D:\\Projects\\Data Engineering Daily Free Resources\\SQL 210 DAYS QUESTIOS AND SOLUTIONS _ DATA ENGINEERING DAILY";

const pdfs = [
  // Practice workbooks (questions + expected output)
  'DE_SQL_Day76_to_90_Workbook.pdf',
  'DE_SQL_Day91_to_105_Workbook.pdf',
  'DE_SQL_Day106_to_115_Workbook.pdf',
  'DE_SQL_Day151_to_165_Practice_Workbook.pdf',
  // Solutions workbooks (contain SQL answers)
  'DE_SQL_Day76_to_90_Solutions_Workbook.pdf',
  'DE_SQL_Day91_to_105_Solutions_Workbook.pdf',
  'DE_SQL_Day106_to_115_Solution_Workbook.pdf',
  'DE_SQL_Day151_to_165_Solutions_Workbook.pdf',
];

async function extractPdf(pdfPath) {
  const { getDocument } = require('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
}

async function main() {
  for (const pdf of pdfs) {
    const pdfPath = path.join(SOURCE_DIR, pdf);
    const outPath = path.join(__dirname, pdf.replace('.pdf', '.txt'));
    
    if (!fs.existsSync(pdfPath)) {
      console.log(`MISSING: ${pdf}`);
      continue;
    }
    
    try {
      console.log(`Extracting ${pdf}...`);
      const text = await extractPdf(pdfPath);
      fs.writeFileSync(outPath, text, 'utf8');
      console.log(`  → ${text.length} chars, saved to ${outPath}`);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }
}

main().catch(console.error);
