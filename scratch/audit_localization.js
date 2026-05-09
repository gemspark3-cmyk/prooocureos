const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));

function getAllKeys(obj, prefix = '', dataObj = null) {
    let keys = [];
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const val = dataObj ? dataObj[key] : obj[key];
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(getAllKeys(obj[key], fullKey, dataObj ? dataObj[key] : null));
        } else {
            if (val !== "__MISSING__") {
                keys.push(fullKey);
            }
        }
    }
    return keys;
}

const masterKeys = getAllKeys(trData);

const audit = {};

files.forEach(file => {
    if (file === 'tr.json') return;
    const lang = file.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8'));
    const langKeys = new Set(getAllKeys(data, '', data));
    
    const missing = masterKeys.filter(k => !langKeys.has(k));
    audit[lang] = {
        total: langKeys.size,
        missing: missing.length,
        missingKeys: missing
    };
});

fs.writeFileSync(path.join(process.cwd(), 'scratch', 'audit_results.json'), JSON.stringify(audit, null, 2), 'utf8');
console.log('Audit completed successfully (treating __MISSING__ as missing).');
