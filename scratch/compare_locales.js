const fs = require('fs');
const path = require('path');

const targetLang = process.argv[2] || 'tr';
const enPath = path.join(__dirname, '../messages/en.json');
const targetPath = path.join(__dirname, `../messages/${targetLang}.json`);

if (!fs.existsSync(targetPath)) {
  console.error(`Error: Language file not found: ${targetPath}`);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getAllKeys(en);
const targetKeys = getAllKeys(target);

console.log(`--- Language Comparison Report: en vs ${targetLang} ---`);
console.log(`Total English Keys: ${enKeys.length}`);
console.log(`Total ${targetLang.toUpperCase()} Keys: ${targetKeys.length}`);

const missingInTarget = enKeys.filter(k => !targetKeys.includes(k));
const missingInEn = targetKeys.filter(k => !enKeys.includes(k));

if (missingInTarget.length > 0) {
  console.log(`\nMissing in ${targetLang.toUpperCase()} (Exist in English):`);
  missingInTarget.forEach(k => console.log(`- ${k}`));
} else {
  console.log(`\nNo keys missing in ${targetLang.toUpperCase()}.`);
}

if (missingInEn.length > 0) {
  console.log(`\nMissing in English (Exist in ${targetLang.toUpperCase()}):`);
  missingInEn.forEach(k => console.log(`- ${k}`));
} else {
  console.log(`\nNo keys missing in English.`);
}
