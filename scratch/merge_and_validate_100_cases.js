import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ACLS_CASES as ORIGINAL_50 } from '../src/data/cases.js';
import { CASES_51_75 } from './cases_51_75.js';
import { CASES_76_100 } from './cases_76_100.js';

console.log("Original cases count:", ORIGINAL_50.length);
console.log("Cases 51-75 count:", CASES_51_75.length);
console.log("Cases 76-100 count:", CASES_76_100.length);

const ALL_100 = [...ORIGINAL_50, ...CASES_51_75, ...CASES_76_100];
console.log("Total merged cases:", ALL_100.length);

// Validation
let issues = [];
const seenIds = new Set();

ALL_100.forEach((c, idx) => {
  const expectedId = `caso-${idx + 1}`;
  if (c.id !== expectedId) {
    issues.push(`Index ${idx}: ID is ${c.id}, expected ${expectedId}`);
  }
  if (seenIds.has(c.id)) {
    issues.push(`Duplicate ID: ${c.id}`);
  }
  seenIds.add(c.id);

  // Shockable check
  if ((c.arrestType === 'FV' || c.arrestType === 'TVSP') && !c.isShockable) {
    issues.push(`Case ${c.id}: ${c.arrestType} must be shockable`);
  }
  if ((c.arrestType === 'ASISTOLIA' || c.arrestType === 'AESP') && c.isShockable) {
    issues.push(`Case ${c.id}: ${c.arrestType} must be non-shockable`);
  }

  // Vitals check
  if (!c.initialVitals?.bp || c.initialVitals?.hr === undefined) {
    issues.push(`Case ${c.id}: Missing initial vitals`);
  }
  if (!c.rceVitals?.bp || c.rceVitals?.hr === undefined) {
    issues.push(`Case ${c.id}: Missing RCE vitals`);
  }

  // Labs & Glucose check
  if (!c.clinicalExam?.labs?.glucose) {
    issues.push(`Case ${c.id}: Missing clinicalExam.labs.glucose`);
  }
});

console.log("Validation complete! Total issues found:", issues.length);
if (issues.length > 0) {
  console.error("Issues:", issues);
  process.exit(1);
}

// Generate the file content
const fileHeader = `// Banco exhaustivo de 100 casos clínicos ACLS con aleatorización y diagnósticos etiológicos (5 H y 5 T)
// Cumplimiento estricto de guías AHA ACLS 2020 / 2025
// Patrón: Arritmia Inicial (Taqui/Bradi) -> Descompensación y PCR -> Reanimación -> RCE -> Cuidados Posparo

export const ACLS_CASES = `;

const fileFooter = `;

// Helper function to pick a completely random case
export function getRandomCase() {
  const randomIndex = Math.floor(Math.random() * ACLS_CASES.length);
  return ACLS_CASES[randomIndex];
}
`;

const fullFileContent = fileHeader + JSON.stringify(ALL_100, null, 2) + fileFooter;

const targetPath = path.resolve('./src/data/cases.js');
fs.writeFileSync(targetPath, fullFileContent, 'utf-8');
console.log(`Successfully wrote ${ALL_100.length} validated cases to ${targetPath}!`);
