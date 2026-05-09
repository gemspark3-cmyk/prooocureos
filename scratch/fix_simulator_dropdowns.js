const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const dropdownData = {
    "tr": {
        "incoterms": ["DAP - Adrese Teslim", "EXW - Fabrika Çıkış", "FCA - Nakliyeciye Teslim"],
        "validity": ["7 Gün", "15 Gün", "30 Gün"]
    },
    "en": {
        "incoterms": ["DAP - Delivered at Place", "EXW - Ex Works", "FCA - Free Carrier"],
        "validity": ["7 Days", "15 Days", "30 Days"]
    },
    "fr": {
        "incoterms": ["DAP - Livré sur place", "EXW - À l'usine", "FCA - Franco transporteur"],
        "validity": ["7 Jours", "15 Jours", "30 Jours"]
    },
    "de": {
        "incoterms": ["DAP - Geliefert benannter Ort", "EXW - Ab Werk", "FCA - Frei Frachtführer"],
        "validity": ["7 Tage", "15 Tage", "30 Tage"]
    },
    "ru": {
        "incoterms": ["DAP - Поставка в пункте", "EXW - Франко-завод", "FCA - Франко-перевозчик"],
        "validity": ["7 дней", "15 дней", "30 дней"]
    },
    "ja": {
        "incoterms": ["DAP - 指定場所配送", "EXW - 工場渡", "FCA - 運送人渡"],
        "validity": ["7日間", "15日間", "30日間"]
    },
    "zh": {
        "incoterms": ["DAP - 目的地交货", "EXW - 工厂交货", "FCA - 货交承运人"],
        "validity": ["7天", "15天", "30天"]
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.howItWorks && data.howItWorks.simulator && data.howItWorks.simulator.demo) {
        data.howItWorks.simulator.demo.incoterms = dropdownData[lang].incoterms;
        data.howItWorks.simulator.demo.validityPeriods = dropdownData[lang].validity;
        
        // Remove old single keys if they exist and we want to clean up
        delete data.howItWorks.simulator.demo.incoterm;
        delete data.howItWorks.simulator.demo.validity;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated dropdown arrays for ${lang}.json`);
}
