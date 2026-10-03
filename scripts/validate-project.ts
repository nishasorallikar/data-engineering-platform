import fs from 'fs';
import path from 'path';

function validateDataset(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  const errors: string[] = [];

  // Required fields
  const required = ['id', 'slug', 'title', 'domain', 'summary', 'businessProblem', 'architecture', 'sourceSystems', 'ingestion', 'processing', 'storage', 'serving', 'dataQuality', 'security', 'orchestration', 'monitoring', 'technologies', 'scenarios', 'dataModel', 'interviewTalkingPoints', 'sourceReferences', 'sourceType'];
  
  for (const field of required) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Arrays validation
  const arrayFields = ['businessProblem', 'sourceSystems', 'ingestion', 'processing', 'storage', 'serving', 'dataQuality', 'security', 'orchestration', 'monitoring', 'technologies', 'scenarios', 'interviewTalkingPoints', 'sourceReferences'];
  for (const field of arrayFields) {
    if (!Array.isArray(data[field]) || data[field].length === 0) {
      errors.push(`Field ${field} must be a non-empty array`);
    }
  }

  // Duplicate technologies
  const techSet = new Set(data.technologies);
  if (techSet.size !== data.technologies.length) {
    errors.push('Duplicate technologies found');
  }

  // DataModel validation
  if (!data.dataModel || !Array.isArray(data.dataModel.dimensions) || !Array.isArray(data.dataModel.facts) || data.dataModel.dimensions.length === 0 || data.dataModel.facts.length === 0) {
    errors.push('dataModel must contain non-empty dimensions and facts arrays');
  }

  // Contamination check
  const jsonStr = JSON.stringify(data).toLowerCase();
  if (jsonStr.includes('select * from') || jsonStr.includes('fundamental 50')) {
    errors.push('Potential SQL or Fundamental 50 contamination detected');
  }

  if (errors.length > 0) {
    console.error('Validation FAILED:');
    errors.forEach(e => console.error(' - ' + e));
    process.exit(1);
  } else {
    console.log('Validation PASSED: ' + filePath);
  }
}

const targetPath = path.resolve(__dirname, '../data/verified-projects/voltgrid-au.json');
validateDataset(targetPath);
