const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));
const ruData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'ru.json'), 'utf8'));

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

createStructure(trData, ruData);
fs.writeFileSync(path.join(messagesDir, 'ru.json'), JSON.stringify(ruData, null, 2), 'utf8');
console.log('ru.json structure synchronized with __MISSING__ placeholders.');
