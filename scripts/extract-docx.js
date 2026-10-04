const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const DOCX_PATH = path.resolve(__dirname, 'source.docx');

console.log('File exists:', fs.existsSync(DOCX_PATH));
console.log('Path:', DOCX_PATH);

try {
  const zip = new AdmZip(DOCX_PATH);
  const entries = zip.getEntries();
  console.log('Zip entries:', entries.map(e => e.entryName));
  
  const wordDoc = zip.getEntry('word/document.xml');
  if (!wordDoc) {
    console.log("Could not find word/document.xml inside docx");
    process.exit(1);
  }
  const xml = wordDoc.getData().toString('utf8');
  // Strip XML tags to get readable text
  const text = xml
    .replace(/<w:br[^>]*\/>/g, '\n')
    .replace(/<w:p[ >][^>]*>/g, '\n')
    .replace(/<\/w:p>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x[0-9A-Fa-f]+;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n');
  
  fs.writeFileSync('docx_content.txt', text, 'utf8');
  console.log(`Extracted ${text.length} characters, ${text.split('\n').length} lines`);
} catch (err) {
  console.error('Error:', err.message);
  console.error(err.stack);
}
