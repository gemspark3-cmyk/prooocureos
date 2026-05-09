const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const legalContent = {
    "tr": {
        "lastUpdate": "Son Güncelleme: 3 Mayıs 2026",
        "terms": {
            "title": "Kullanım Şartları",
            "intro": "ProcureOS platformuna erişerek aşağıdaki şartları kabul etmiş sayılırsınız.",
            "sections": [
                { "title": "1. Hizmet Tanımı", "content": "ProcureOS, alıcılar ve tedarikçiler arasında satın alma süreçlerini kolaylaştıran dijital bir platformdur." },
                { "title": "2. Hesap Güvenliği", "content": "Hesap bilgilerinizin gizliliğinden siz sorumlusunuz." },
                { "title": "3. Uygulanacak Hukuk", "content": "Bu şartlar Türkiye Cumhuriyeti yasalarına tabidir." }
            ]
        },
        "privacy": {
            "title": "Gizlilik Politikası",
            "intro": "Verilerinizin güvenliğine önem veriyoruz.",
            "sections": [
                { "title": "1. Toplanan Veriler", "content": "İsim, e-posta ve şirket bilgilerinizi topluyoruz." },
                { "title": "2. Kullanım Amacı", "content": "Hizmetlerimizi optimize etmek için verilerinizi kullanıyoruz." }
            ]
        },
        "cookies": {
            "title": "Çerez Politikası",
            "intro": "Daha iyi bir deneyim için çerezleri kullanıyoruz.",
            "sections": [
                { "title": "1. Çerez Nedir?", "content": "Cihazınıza kaydedilen küçük metin dosyalarıdır." },
                { "title": "2. Kontrol", "content": "Tarayıcı ayarlarından çerezleri yönetebilirsiniz." }
            ]
        }
    },
    "en": {
        "lastUpdate": "Last Updated: May 3, 2026",
        "terms": {
            "title": "Terms of Service",
            "intro": "By accessing ProcureOS, you agree to these terms.",
            "sections": [
                { "title": "1. Service Description", "content": "ProcureOS is a digital platform facilitating procurement between buyers and suppliers." },
                { "title": "2. Account Security", "content": "You are responsible for your account confidentiality." },
                { "title": "3. Governing Law", "content": "These terms are governed by the laws of the Republic of Turkey." }
            ]
        },
        "privacy": {
            "title": "Privacy Policy",
            "intro": "We care about your data security.",
            "sections": [
                { "title": "1. Data Collected", "content": "We collect name, email, and company information." },
                { "title": "2. Purpose", "content": "We use data to optimize our services." }
            ]
        },
        "cookies": {
            "title": "Cookie Policy",
            "intro": "We use cookies for a better experience.",
            "sections": [
                { "title": "1. What is a Cookie?", "content": "Small text files saved on your device." },
                { "title": "2. Control", "content": "You can manage cookies in browser settings." }
            ]
        }
    },
    "de": {
        "lastUpdate": "Zuletzt aktualisiert: 3. Mai 2026",
        "terms": {
            "title": "Nutzungsbedingungen",
            "intro": "Durch den Zugriff auf ProcureOS stimmen Sie diesen Bedingungen zu.",
            "sections": [
                { "title": "1. Leistungsbeschreibung", "content": "ProcureOS ist eine digitale Plattform, die die Beschaffung zwischen Käufern und Lieferanten erleichtert." },
                { "title": "2. Kontosicherheit", "content": "Sie sind für die Vertraulichkeit Ihres Kontos verantwortlich." },
                { "title": "3. Anwendbares Recht", "content": "Diese Bedingungen unterliegen den Gesetzen der Republik Türkei." }
            ]
        },
        "privacy": {
            "title": "Datenschutzrichtlinie",
            "intro": "Wir legen Wert auf Ihre Datensicherheit.",
            "sections": [
                { "title": "1. Erhobene Daten", "content": "Wir sammeln Name, E-Mail und Unternehmensinformationen." },
                { "title": "2. Zweck", "content": "Wir nutzen Daten zur Optimierung unserer Dienste." }
            ]
        },
        "cookies": {
            "title": "Cookie-Richtlinie",
            "intro": "Wir verwenden Cookies für ein besseres Erlebnis.",
            "sections": [
                { "title": "1. Was ist ein Cookie?", "content": "Kleine Textdateien, die auf Ihrem Gerät gespeichert werden." },
                { "title": "2. Kontrolle", "content": "Sie können Cookies in den Browsereinstellungen verwalten." }
            ]
        }
    },
    "fr": {
        "lastUpdate": "Dernière mise à jour : 3 mai 2026",
        "terms": {
            "title": "Conditions d'utilisation",
            "intro": "En accédant à ProcureOS, vous acceptez ces conditions.",
            "sections": [
                { "title": "1. Description du service", "content": "ProcureOS est une plateforme numérique facilitant l'approvisionnement entre acheteurs et fournisseurs." },
                { "title": "2. Sécurité du compte", "content": "Vous êtes responsable de la confidentialité de votre compte." },
                { "title": "3. Droit applicable", "content": "Ces conditions sont régies par les lois de la République de Turquie." }
            ]
        },
        "privacy": {
            "title": "Politique de confidentialité",
            "intro": "Nous nous soucions de la sécurité de vos données.",
            "sections": [
                { "title": "1. Données collectées", "content": "Nous collectons le nom, l'e-mail et les informations sur l'entreprise." },
                { "title": "2. Finalité", "content": "Nous utilisons les données pour optimiser nos services." }
            ]
        },
        "cookies": {
            "title": "Politique de cookies",
            "intro": "Nous utilisons des cookies pour une meilleure expérience.",
            "sections": [
                { "title": "1. Qu'est-ce qu'un cookie ?", "content": "Petits fichiers texte enregistrés sur votre appareil." },
                { "title": "2. Contrôle", "content": "Vous pouvez gérer les cookies dans les paramètres du navigateur." }
            ]
        }
    },
    "ru": {
        "lastUpdate": "Последнее обновление: 3 мая 2026 г.",
        "terms": {
            "title": "Условия использования",
            "intro": "Получая доступ к ProcureOS, вы соглашаетесь с этими условиями.",
            "sections": [
                { "title": "1. Описание услуги", "content": "ProcureOS — это цифровая платформа, облегчающая закупки между покупателями и поставщиками." },
                { "title": "2. Безопасность аккаунта", "content": "Вы несете ответственность за конфиденциальность своего аккаунта." },
                { "title": "3. Применимое право", "content": "Эти условия регулируются законами Турецкой Республики." }
            ]
        },
        "privacy": {
            "title": "Политика конфиденциальности",
            "intro": "Мы заботимся о безопасности ваших данных.",
            "sections": [
                { "title": "1. Собираемые данные", "content": "Мы собираем имя, адрес электронной почты и информацию о компании." },
                { "title": "2. Цель", "content": "Мы используем данные для оптимизации наших услуг." }
            ]
        },
        "cookies": {
            "title": "Политика использования файлов cookie",
            "intro": "Мы используем файлы cookie для улучшения вашего опыта.",
            "sections": [
                { "title": "1. Что такое куки?", "content": "Небольшие текстовые файлы, сохраненные на вашем устройстве." },
                { "title": "2. Контроль", "content": "Вы можете управлять файлами cookie в настройках браузера." }
            ]
        }
    },
    "ja": {
        "lastUpdate": "最終更新日: 2026年5月3日",
        "terms": {
            "title": "利用規約",
            "intro": "ProcureOSにアクセスすることにより、これらの条件に同意したことになります。",
            "sections": [
                { "title": "1. サービスの説明", "content": "ProcureOSは、購入者とサプライヤー間の調達を促進するデジタルプラットフォームです。" },
                { "title": "2. アカウントのセキュリティ", "content": "アカウントの機密保持はお客様の責任です。" },
                { "title": "3. 準拠法", "content": "本規約はトルコ共和国の法律に準拠します。" }
            ]
        },
        "privacy": {
            "title": "プライバシーポリシー",
            "intro": "お客様のデータの安全性を重視しています。",
            "sections": [
                { "title": "1. 収集されるデータ", "content": "氏名、メールアドレス、会社情報を収集します。" },
                { "title": "2. 目的", "content": "サービスの最適化のためにデータを使用します。" }
            ]
        },
        "cookies": {
            "title": "クッキーポリシー",
            "intro": "より良い体験のためにクッキーを使用しています。",
            "sections": [
                { "title": "1. クッキーとは何ですか？", "content": "デバイスに保存される小さなテキストファイルです。" },
                { "title": "2. 管理", "content": "ブラウザの設定でクッキーを管理できます。" }
            ]
        }
    },
    "zh": {
        "lastUpdate": "最后更新：2026年5月3日",
        "terms": {
            "title": "使用条款",
            "intro": "通过访问 ProcureOS，您同意这些条款。",
            "sections": [
                { "title": "1. 服务说明", "content": "ProcureOS 是一个促进买家和供应商之间采购的数字平台。" },
                { "title": "2. 账户安全", "content": "您负责维护账户的机密性。" },
                { "title": "3. 适用法律", "content": "这些条款受土耳其共和国法律管辖。" }
            ]
        },
        "privacy": {
            "title": "隐私政策",
            "intro": "我们重视您的数据安全。",
            "sections": [
                { "title": "1. 收集的数据", "content": "我们收集姓名、电子邮件和公司信息。" },
                { "title": "2. 目的", "content": "我们使用数据来优化我们的服务。" }
            ]
        },
        "cookies": {
            "title": "Cookie 政策",
            "intro": "我们使用 Cookie 以提供更好的体验。",
            "sections": [
                { "title": "1. 什么是 Cookie？", "content": "保存在您设备上的小文本文件。" },
                { "title": "2. 控制", "content": "您可以在浏览器设置中管理 Cookie。" }
            ]
        }
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    data.legal = legalContent[lang] || legalContent["en"];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated full legal translations for ${lang}.json`);
}
