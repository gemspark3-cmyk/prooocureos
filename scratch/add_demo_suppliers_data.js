const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const supplierData = {
    "tr": [
        { "name": "TechGear Endüstriyel A.Ş.", "location": "İstanbul, TR", "speed": "2 Gün" },
        { "name": "Global Bearings Co.", "location": "Berlin, DE", "speed": "5 Gün" },
        { "name": "Rulman Dünyası", "location": "Bursa, TR", "speed": "1 Gün" },
        { "name": "Anadolu Makina Ltd.", "location": "Ankara, TR", "speed": "3 Gün" }
    ],
    "en": [
        { "name": "TechGear Industrial Inc.", "location": "Istanbul, TR", "speed": "2 Days" },
        { "name": "Global Bearings Co.", "location": "Berlin, DE", "speed": "5 Days" },
        { "name": "Bearing World", "location": "Bursa, TR", "speed": "1 Day" },
        { "name": "Anatolian Machine Ltd.", "location": "Ankara, TR", "speed": "3 Days" }
    ],
    "fr": [
        { "name": "TechGear Industriel SA", "location": "Istanbul, TR", "speed": "2 Jours" },
        { "name": "Global Bearings Co.", "location": "Berlin, DE", "speed": "5 Jours" },
        { "name": "Monde des Roulements", "location": "Bursa, TR", "speed": "1 Jour" },
        { "name": "Anadolu Machine Ltd.", "location": "Ankara, TR", "speed": "3 Jours" }
    ],
    "de": [
        { "name": "TechGear Industrie AG", "location": "Istanbul, TR", "speed": "2 Tage" },
        { "name": "Global Bearings Co.", "location": "Berlin, DE", "speed": "5 Tage" },
        { "name": "Lager Welt", "location": "Bursa, TR", "speed": "1 Tag" },
        { "name": "Anatolien Maschinen GmbH", "location": "Ankara, TR", "speed": "3 Tage" }
    ],
    "ru": [
        { "name": "TechGear Industrial ОАО", "location": "Стамбул, Турция", "speed": "2 дня" },
        { "name": "Global Bearings Co.", "location": "Берлин, Германия", "speed": "5 дней" },
        { "name": "Мир Подшипников", "location": "Бурса, Турция", "speed": "1 день" },
        { "name": "Anadolu Machine Ltd.", "location": "Анкара, Турция", "speed": "3 дня" }
    ],
    "ja": [
        { "name": "TechGear インダストリアル", "location": "イスタンブール、トルコ", "speed": "2日" },
        { "name": "グローバルベアリング社", "location": "ベルリン、ドイツ", "speed": "5日" },
        { "name": "ベアリングワールド", "location": "ブルサ、トルコ", "speed": "1日" },
        { "name": "アナトリアマシン", "location": "アンカラ、トルコ", "speed": "3日" }
    ],
    "zh": [
        { "name": "TechGear 工业公司", "location": "伊斯坦布尔，土耳其", "speed": "2天" },
        { "name": "全球轴承公司", "location": "柏林，德国", "speed": "5天" },
        { "name": "轴承世界", "location": "布尔萨，土耳其", "speed": "1天" },
        { "name": "安纳托利亚机械有限公司", "location": "安卡拉，土耳其", "speed": "3天" }
    ]
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.howItWorks && data.howItWorks.simulator && data.howItWorks.simulator.demo) {
        data.howItWorks.simulator.demo.suppliers = supplierData[lang] || supplierData["en"];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added demo suppliers to howItWorks.simulator.demo in ${lang}.json`);
}
