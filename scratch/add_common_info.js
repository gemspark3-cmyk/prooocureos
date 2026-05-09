const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const infoTranslations = {
    "tr": { "info": "BİLGİLENDİRME" },
    "en": { "info": "INFORMATION" },
    "de": { "info": "INFORMATION" },
    "fr": { "info": "INFORMATION" },
    "ru": { "info": "ИНФОРМАЦИЯ" },
    "ja": { "info": "お知らせ" },
    "zh": { "info": "温馨提示" }
};

const langs = Object.keys(infoTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.common = data.common || {};
    data.common.info = infoTranslations[lang].info;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added common.info to ${lang}.json`);
}
