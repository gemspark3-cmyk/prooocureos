const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const demoData = {
    "tr": {
        "query": "SKF 6204 Derin Yivli Bilyalı Rulman 1000 adet",
        "location": "İstanbul, Türkiye",
        "quantity": "1000 Adet",
        "incoterm": "DAP - Adrese Teslim",
        "validity": "7 Gün"
    },
    "en": {
        "query": "SKF 6204 Deep Groove Ball Bearing 1000 units",
        "location": "Istanbul, Turkey",
        "quantity": "1000 Units",
        "incoterm": "DAP - Delivered at Place",
        "validity": "7 Days"
    },
    "fr": {
        "query": "Roulement à billes à gorge profonde SKF 6204 1000 unités",
        "location": "Istanbul, Turquie",
        "quantity": "1000 Unités",
        "incoterm": "DAP - Livré sur place",
        "validity": "7 Jours"
    },
    "de": {
        "query": "SKF 6204 Rillenkugellager 1000 Stück",
        "location": "Istanbul, Türkei",
        "quantity": "1000 Stück",
        "incoterm": "DAP - Geliefert benannter Ort",
        "validity": "7 Tage"
    },
    "ru": {
        "query": "Радиальный шарикоподшипник SKF 6204 1000 шт.",
        "location": "Стамбул, Турция",
        "quantity": "1000 шт.",
        "incoterm": "DAP - Поставка в пункте",
        "validity": "7 дней"
    },
    "ja": {
        "query": "SKF 6204 深溝玉軸受 1000個",
        "location": "イスタンブール、トルコ",
        "quantity": "1000個",
        "incoterm": "DAP - 指定場所配送",
        "validity": "7日間"
    },
    "zh": {
        "query": "SKF 6204 深沟球轴承 1000套",
        "location": "伊斯坦布尔，土耳其",
        "quantity": "1000套",
        "incoterm": "DAP - 目的地交货",
        "validity": "7天"
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.howItWorks && data.howItWorks.simulator) {
        data.howItWorks.simulator.demo = demoData[lang] || demoData["en"];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added demo data to howItWorks.simulator in ${lang}.json`);
}
