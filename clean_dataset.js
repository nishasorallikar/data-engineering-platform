const fs = require('fs');
const path = require('path');

const datasetPath = path.resolve(__dirname, 'data/verified-datasets/fundamental-50-question-dataset.json');
let data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

// The strings that mark the beginning of diagram garbage
const garbageMarkers = [
  'Slowly Changing Dimension — Type 2',
  'Change Data Capture (log-based)',
  'An Orchestrated DAG (Airflow)',
  'Spark Architecture',
  'CAP Theorem'
];

data.forEach(q => {
  if (q.detailedExplanation) {
    let cleanText = q.detailedExplanation;
    
    // Check for garbage markers
    for (const marker of garbageMarkers) {
      if (cleanText.includes(marker)) {
        cleanText = cleanText.split(marker)[0].trim();
      }
    }
    
    // Also explicitly strip out the literal bullets and page numbers if they are still there
    if (cleanText.includes('\n•\n')) {
       cleanText = cleanText.split('\n•\n')[0].trim();
    }
    
    // Strip trailing lone bullets at the very end just in case
    cleanText = cleanText.replace(/(\n•)+$/g, '').trim();
    
    q.detailedExplanation = cleanText;
  }
});

fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2));
console.log('Dataset cleaned!');
