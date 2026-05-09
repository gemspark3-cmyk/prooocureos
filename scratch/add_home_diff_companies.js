const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const diffTranslations = {
    "tr": { "differentCompanies": "{count} Farklı Firma" },
    "en": { "differentCompanies": "{count} Different Companies" },
    "de": { "differentCompanies": "{count} Verschiedene Firmen" },
    "fr": { "differentCompanies": "{count} Entreprises Différentes" },
    "ru": { "differentCompanies": "{count} Разные Компании" },
    "ja": { "differentCompanies": "{count} つの異なる企業" },
    "zh": { "differentCompanies": "{count} 家不同的公司" }
};

const langs = Object.keys(diffTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.home = data.home || {};
    data.home.differentCompanies = diffTranslations[lang].differentCompanies;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added home.differentCompanies to ${lang}.json`);
}
