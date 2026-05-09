const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const questionsData = {
    "tr": {
        "q1": { "title": "Mevcut tedarikçilerinizden daha iyisi olabilir mi?", "desc": "Yıllardır çalıştığınız partnerleriniz en iyi opsiyon olmayabilir. AI motorumuz, global pazardaki gizli devleri sizin için bulur." },
        "q2": { "title": "Piyasa fiyat kontrolü yapmak ister misiniz?", "desc": "Sadece fiyat teklifi almak için bile ProcureOS'u kullanabilirsiniz. Gerçek zamanlı verilerle maliyetlerinizi benchmark edin." },
        "q3": { "title": "Yeni tedarikçilerden haberiniz var mı?", "desc": "Sektörünüzdeki yeni oyuncuları ve inovatif üreticileri ilk siz keşfedin. Otonom ağımız her gün binlerce veri noktasını analiz eder." }
    },
    "en": {
        "q1": { "title": "Could there be better than your current suppliers?", "desc": "The partners you've worked with for years might not be the best option. Our AI engine finds hidden giants in the global market for you." },
        "q2": { "title": "Do you want to check market prices?", "desc": "You can use ProcureOS even just to receive price quotes. Benchmark your costs with real-time data." },
        "q3": { "title": "Are you aware of new suppliers?", "desc": "Be the first to discover new players and innovative producers in your industry. Our autonomous network analyzes thousands of data points daily." }
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.howItWorks) {
        data.howItWorks.questions = questionsData[lang] || questionsData["en"];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added questions to howItWorks in ${lang}.json`);
}
