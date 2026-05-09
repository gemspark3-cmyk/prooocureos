const fs = require('fs');
const path = require('path');

const results = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scratch', 'audit_results.json'), 'utf8'));

console.log('Language | Total Keys | Missing Keys');
console.log('---------|------------|-------------');
for (const lang in results) {
    console.log(`${lang.padEnd(8)} | ${results[lang].total.toString().padEnd(10)} | ${results[lang].missing}`);
}
