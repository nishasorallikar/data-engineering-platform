const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'data', 'verified-datasets', 'fundamental-50-question-dataset.json');
const raw = fs.readFileSync(p, 'utf8');
const data = JSON.parse(raw);

const updates = [
  { range: [1, 7], section: 'Foundations & Architecture' },
  { range: [8, 16], section: 'SQL' },
  { range: [17, 25], section: 'Data Modelling & Warehousing' },
  { range: [26, 34], section: 'Pipelines, ETL & Orchestration' },
  { range: [35, 43], section: 'Big Data & Spark' },
  { range: [44, 47], section: 'Streaming & Messaging' },
  { range: [48, 50], section: 'Distributed Systems & Design' }
];

let modified = 0;
data.forEach(q => {
  // Extract number from id like 'fundamental-q1'
  const match = q.id.match(/q(\d+)$/);
  if (match) {
    const qNum = parseInt(match[1], 10);
    for (const update of updates) {
      if (qNum >= update.range[0] && qNum <= update.range[1]) {
        if (q.skill !== update.section) {
          q.skill = update.section; // Assuming 'skill' is used for section in JSON
          modified++;
        }
        break;
      }
    }
  }
});

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${modified} questions in JSON dataset`);
