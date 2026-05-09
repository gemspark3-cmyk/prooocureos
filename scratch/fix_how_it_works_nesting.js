const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.howItWorks && data.howItWorks.howItWorks) {
        // Flatten the nesting
        const actualContent = data.howItWorks.howItWorks;
        const questions = data.howItWorks.questions;
        
        data.howItWorks = {
            ...actualContent,
            questions: questions
        };
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Fixed nesting for ${lang}.json`);
    } else {
        console.log(`Nesting already correct or missing in ${lang}.json`);
    }
}
