const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));
const deData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'de.json'), 'utf8'));

// Deep merge function
function mergeDeep(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

// Translate logic (simulated for now, I'll fill it manually or with help)
// I will use this script to inject the structure and then fill values.
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

createStructure(trData, deData);
fs.writeFileSync(path.join(messagesDir, 'de.json'), JSON.stringify(deData, null, 2), 'utf8');
console.log('de.json structure synchronized with __MISSING__ placeholders.');
