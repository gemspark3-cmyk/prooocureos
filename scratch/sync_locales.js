const fs = require('fs');
const path = require('path');

const languages = ['de', 'fr', 'ja', 'ru', 'zh'];
const enPath = path.join(__dirname, '../messages/en.json');
const trPath = path.join(__dirname, '../messages/tr.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

function syncObject(source, target, turkishSource, lang) {
  const result = {};
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      result[key] = syncObject(
        source[key], 
        target && target[key] ? target[key] : {}, 
        turkishSource && turkishSource[key] ? turkishSource[key] : {},
        lang
      );
    } else {
      let value = (target && target[key] !== undefined) ? target[key] : source[key];
      
      // Turkish Leak Detection
      // If the value in target matches Turkish source but NOT English source, 
      // it means it's likely a leaked Turkish translation.
      if (lang !== 'tr' && turkishSource && turkishSource[key] !== undefined) {
        if (value === turkishSource[key] && value !== source[key]) {
          console.log(`[${lang}] Detected Turkish leak in "${key}": "${value}" -> Resetting to English: "${source[key]}"`);
          value = source[key];
        }
      }
      
      result[key] = value;
    }
  }
  return result;
}

languages.forEach(lang => {
  const langPath = path.join(__dirname, `../messages/${lang}.json`);
  if (!fs.existsSync(langPath)) return;
  
  const target = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const synced = syncObject(en, target, tr, lang);
  
  fs.writeFileSync(langPath, JSON.stringify(synced, null, 2), 'utf8');
  console.log(`Synced and Cleaned ${lang}.json`);
});
