const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));
const frData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'fr.json'), 'utf8'));

function createStructure(source, target) {
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            createStructure(source[key], target[key]);
        } else {
            if (target[key] === undefined) {
                target[key] = "__MISSING__";
            }
        }
    }
}

createStructure(trData, frData);
fs.writeFileSync(path.join(messagesDir, 'fr.json'), JSON.stringify(frData, null, 2), 'utf8');
console.log('fr.json structure synchronized with __MISSING__ placeholders.');
