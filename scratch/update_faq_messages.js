const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
    "tr": {
        "faq": {
            "title": "Sıkça Sorulan Sorular",
            "subtitle": "ProcureOS otonom satınalma ekosistemi hakkında merak ettiğiniz her şey.",
            "helpCenter": "YARDIM MERKEZİ",
            "back": "Geri Dön",
            "questions": {
                "q1": "ProcureOS üzerinden nasıl satınalma talebi oluştururum?",
                "a1": "Ana sayfada bulunan 'Talep Oluştur' butonuna tıklayarak ihtiyacınızı doğal dille yazabilirsiniz. Yapay zekamız (AIP-103+), talebinizi teknik özelliklere dönüştürecek ve en uygun tedarikçilerle eşleştirecektir.",
                "q2": "Tedarikçiler nasıl doğrulanıyor?",
                "a2": "ProcureOS tedarikçi doğrulama süreci 3 katmanlı bir denetim mekanizmasına dayanır: 1. Kurumsal Doğrulama (KYB), 2. Finansal & Teknik Skorlama, 3. Dinamik Güven Skoru.",
                "q3": "Ödeme süreçleri nasıl işliyor?",
                "a3": "Şu anki aşamada ödemeler, alıcı ve satıcı arasındaki mevcut ticari anlaşmalar üzerinden gerçekleşmektedir. Yakında Escrow özelliğimiz devreye alınacaktır.",
                "q4": "Global tedarikçilere ulaşabilir miyim?",
                "a4": "Evet, ProcureOS ağı hem yerel hem de global binlerce tedarikçiyi kapsar."
            }
        }
    },
    "en": {
        "faq": {
            "title": "Frequently Asked Questions",
            "subtitle": "Everything you need to know about the ProcureOS autonomous procurement ecosystem.",
            "helpCenter": "HELP CENTER",
            "back": "Go Back",
            "questions": {
                "q1": "How do I create a purchase request via ProcureOS?",
                "a1": "You can write your needs in natural language by clicking the 'Create Request' button on the home page. Our AI (AIP-103+) will convert your request into technical specifications and match it with the most suitable suppliers.",
                "q2": "How are suppliers verified?",
                "a2": "The ProcureOS supplier verification process is based on a 3-layer audit mechanism: 1. Corporate Verification (KYB), 2. Financial & Technical Scoring, 3. Dynamic Trust Score.",
                "q3": "How do payment processes work?",
                "a3": "At this stage, payments take place directly via existing commercial agreements between the buyer and the seller. Our Escrow feature will be activated soon.",
                "q4": "Can I reach global suppliers?",
                "a4": "Yes, the ProcureOS network covers thousands of suppliers both locally and globally."
            }
        }
    }
};

for (const lang in translations) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    function deepUpdate(target, source) {
        for (const key in source) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {};
                deepUpdate(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    
    deepUpdate(data, translations[lang]);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('Updated JSON for FAQ.');
