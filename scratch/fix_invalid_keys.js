const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.changelog && data.changelog.releaseItems) {
        const items = data.changelog.releaseItems;
        if (items["AIP-103.6"]) {
            items["AIP-103_6"] = items["AIP-103.6"];
            delete items["AIP-103.6"];
        }
        if (items["AIP-103.5"]) {
            items["AIP-103_5"] = items["AIP-103.5"];
            delete items["AIP-103.5"];
        }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Renamed keys in ${lang}.json`);
}
