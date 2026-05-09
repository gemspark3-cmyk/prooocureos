const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const localizedData = {
    "tr": {
        "reviews": {
            "title": "Güvenle Büyüyen Ağ",
            "subtitle": "Dünya genelinde 500+ kurum, satınalma operasyonlarını ProcureOS otonom altyapısı ile yönetiyor.",
            "badge": "KULLANICI DENEYİMLERİ",
            "loading": "Deneyimler Yükleniyor...",
            "back": "Geri Dön",
            "ctaTitle": "Siz de Otonom Ağın Parçası Olun",
            "ctaSubtitle": "Hemen ücretsiz kayıt olun ve tedarik zincirinizi dijitalleştirin.",
            "ctaButton": "KAYIT OL",
            "tags": {
                "highSatisfaction": "Yüksek Memnuniyet",
                "verified": "Doğrulanmış"
            },
            "roles": {
                "buyer": "Kurumsal Alıcı",
                "manager": "Satınalma Müdürü",
                "director": "Operasyon Direktörü"
            },
            "static": [
                {
                    "name": "Arda Yılmaz",
                    "role": "Satınalma Müdürü",
                    "company": "Global Lojistik A.Ş.",
                    "content": "ProcureOS sayesinde tedarikçi arama sürecimiz haftalardan günlere düştü. Yapay zeka ile teknik şartname oluşturma özelliği inanılmaz bir zaman tasarrufu sağlıyor.",
                    "tag": "Kurumsal"
                },
                {
                    "name": "Selin Demir",
                    "role": "Operasyon Direktörü",
                    "company": "Tech-Flow Systems",
                    "content": "Otonom eşleşme sistemi, bizim hiç ulaşamadığımız yüksek kaliteli tedarikçileri ayağımıza getirdi. Güven skoru sistemi sayesinde içimiz çok rahat.",
                    "tag": "Endüstriyel"
                }
            ]
        },
        "legal": {
            "lastUpdate": "Son Güncelleme: 3 Mayıs 2026",
            "terms": {
                "title": "Kullanım Şartları",
                "intro": "ProcureOS platformuna erişerek veya kullanarak, aşağıdaki şartlara bağlı kalmayı kabul etmiş sayılırsınız.",
                "sections": [
                    { "title": "1. Hizmet Tanımı", "content": "ProcureOS, alıcılar ve tedarikçiler arasında kurumsal satın alma süreçlerini kolaylaştıran dijital bir pazar yeri platformudur." },
                    { "title": "2. Hesap Güvenliği", "content": "Kullanıcılar, hesap bilgilerinin gizliliğinden kendileri sorumludur. Sahte bilgilerle kayıt olmak yasaktır." },
                    { "title": "3. Kullanım Kuralları", "content": "Platformun işleyişini bozacak teknik müdahalelerde bulunmamayı taahhüt edersiniz." }
                ]
            },
            "privacy": {
                "title": "Gizlilik Politikası",
                "intro": "ProcureOS olarak, verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz.",
                "sections": [
                    { "title": "1. Toplanan Veriler", "content": "Hizmetlerimizi sunabilmek için hesap bilgileri ve ticari verileri toplayabiliriz." },
                    { "title": "2. Veri Paylaşımı", "content": "Verileriniz asla üçüncü taraflara satılmaz. Sadece ticari sürecin tamamlanması için paylaşılır." }
                ]
            },
            "cookies": {
                "title": "Çerez Politikası",
                "intro": "Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz.",
                "sections": [
                    { "title": "1. Çerez Nedir?", "content": "Çerezler, tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır." },
                    { "title": "2. Çerez Kontrolü", "content": "Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman silebilirsiniz." }
                ]
            }
        }
    },
    "en": {
        "reviews": {
            "title": "Network Growing with Confidence",
            "subtitle": "Over 500+ institutions worldwide manage their procurement operations with ProcureOS autonomous infrastructure.",
            "badge": "USER EXPERIENCES",
            "loading": "Loading Experiences...",
            "back": "Go Back",
            "ctaTitle": "Become Part of the Autonomous Network",
            "ctaSubtitle": "Register for free now and digitalize your supply chain.",
            "ctaButton": "REGISTER",
            "tags": {
                "highSatisfaction": "High Satisfaction",
                "verified": "Verified"
            },
            "roles": {
                "buyer": "Corporate Buyer",
                "manager": "Procurement Manager",
                "director": "Operations Director"
            },
            "static": [
                {
                    "name": "Arda Yılmaz",
                    "role": "Procurement Manager",
                    "company": "Global Logistics Inc.",
                    "content": "Thanks to ProcureOS, our supplier search process dropped from weeks to days. The AI technical specification creation feature provides incredible time savings.",
                    "tag": "Corporate"
                },
                {
                    "name": "Selin Demir",
                    "role": "Operations Director",
                    "company": "Tech-Flow Systems",
                    "content": "The autonomous matching system brought high-quality suppliers to us that we could never reach. We are very comfortable thanks to the trust score system.",
                    "tag": "Industrial"
                }
            ]
        },
        "legal": {
            "lastUpdate": "Last Updated: May 3, 2026",
            "terms": {
                "title": "Terms of Service",
                "intro": "By accessing or using the ProcureOS platform, you agree to be bound by the following terms.",
                "sections": [
                    { "title": "1. Description of Service", "content": "ProcureOS is a digital marketplace platform that facilitates corporate procurement processes between buyers and suppliers." },
                    { "title": "2. Account Security", "content": "Users are responsible for the confidentiality of their account information. Registration with fake information is prohibited." },
                    { "title": "3. Rules of Use", "content": "You commit not to engage in technical interventions that would disrupt the platform's operation." }
                ]
            },
            "privacy": {
                "title": "Privacy Policy",
                "intro": "At ProcureOS, we attach great importance to the privacy and security of your data.",
                "sections": [
                    { "title": "1. Data Collected", "content": "We may collect account information and commercial data to provide our services." },
                    { "title": "2. Data Sharing", "content": "Your data is never sold to third parties. It is only shared to complete the commercial process." }
                ]
            },
            "cookies": {
                "title": "Cookie Policy",
                "intro": "We use cookies to offer you a better experience.",
                "sections": [
                    { "title": "1. What is a Cookie?", "content": "Cookies are small text files saved to your device via your browser." },
                    { "title": "2. Cookie Control", "content": "You can delete cookies at any time via your browser settings." }
                ]
            }
        }
    }
};

// Simplified translation for other languages based on English
const otherLangs = ["de", "fr", "ru", "ja", "zh"];
const labels = {
    "de": { "title": "Bewertungen", "terms": "Nutzungsbedingungen", "privacy": "Datenschutz", "cookies": "Cookie-Richtlinie" },
    "fr": { "title": "Avis", "terms": "Conditions d'utilisation", "privacy": "Politique de confidentialité", "cookies": "Politique de cookies" },
    "ru": { "title": "Отзывы", "terms": "Условия использования", "privacy": "Политика конфиденциальности", "cookies": "Политика использования файлов cookie" },
    "ja": { "title": "レビュー", "terms": "利用規約", "privacy": "プライバシーポリシー", "cookies": "クッキーポリシー" },
    "zh": { "title": "评论", "terms": "使用条款", "privacy": "隐私政策", "cookies": "Cookie 政策" }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const baseData = localizedData[lang] || localizedData["en"];
    data.reviews = baseData.reviews;
    data.legal = baseData.legal;
    
    // Override titles for specific languages if they are in otherLangs
    if (labels[lang]) {
        data.reviews.title = (lang === "ru" ? "Сеть, растущая с доверием" : baseData.reviews.title);
        data.legal.terms.title = labels[lang].terms;
        data.legal.privacy.title = labels[lang].privacy;
        data.legal.cookies.title = labels[lang].cookies;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Localized reviews and legal for ${lang}.json`);
}
