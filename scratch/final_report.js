const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));

function countKeys(obj) {
    let total = 0;
    let missing = 0;
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            const sub = countKeys(obj[key]);
            total += sub.total;
            missing += sub.missing;
        } else {
            total++;
            if (obj[key] === "__MISSING__") {
                missing++;
            }
        }
    }
    return { total, missing };
}

console.log('Language | Total | Translated | Missing | Progress');
console.log('---------|-------|------------|---------|---------');

files.forEach(file => {
    const lang = file.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8'));
    const stats = countKeys(data);
    const translated = stats.total - stats.missing;
    const progress = ((translated / stats.total) * 100).toFixed(1);
    console.log(`${lang.padEnd(8)} | ${stats.total.toString().padEnd(5)} | ${translated.toString().padEnd(10)} | ${stats.missing.toString().padEnd(7)} | ${progress}%`);
});
