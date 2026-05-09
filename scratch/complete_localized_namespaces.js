const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const newNamespaces = {
    "tr": {
        "home": { "protocolNotes": "AIP 103 Protokol Notları" },
        "changelog": {
            "title": "AIP Protokolü Sürüm Notları",
            "subtitle": "ProcureOS Otonom İstihbarat Protokolü (AIP) sistemindeki güncel geliştirmeler ve gelecek projeksiyonları hakkında teknik dökümantasyon.",
            "backToDashboard": "Panele Dön",
            "releaseNotes": "Sürüm Notları",
            "footerNote": "ProcureOS, AIP standartlarını takip eden otonom bir ekosistemdir.",
            "historyTitle": "Tam Kod Geçmişi",
            "historySubtitle": "ProcureOS AIP çekirdek altyapısındaki tüm atomik değişikliklerin teknik özeti.",
            "searchPlaceholder": "Commit mesajı veya sürüm ile ara...",
            "noResults": "Aradığınız kriterde commit bulunamadı",
            "commitsTitle": "Commit Geçmişi",
            "fullLog": "Tam Kayıt"
        },
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
        "home": { "protocolNotes": "AIP 103 Protocol Notes" },
        "changelog": {
            "title": "AIP Protocol Release Notes",
            "subtitle": "Technical documentation on current developments and future projections in the ProcureOS Autonomous Intelligence Protocol (AIP) system.",
            "backToDashboard": "Back to Dashboard",
            "releaseNotes": "Release Notes",
            "footerNote": "ProcureOS is an autonomous ecosystem following AIP standards.",
            "historyTitle": "Full Commit History",
            "historySubtitle": "Technical summary of all atomic changes in the ProcureOS AIP core infrastructure.",
            "searchPlaceholder": "Search by commit message or version...",
            "noResults": "No commits found matching your criteria",
            "commitsTitle": "Commit History",
            "fullLog": "Full Log"
        },
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
    },
    "de": {
        "home": { "protocolNotes": "AIP 103 Protokoll-Notizen" },
        "changelog": {
            "title": "AIP Protokoll Versionshinweise",
            "subtitle": "Technische Dokumentation zu aktuellen Entwicklungen und Zukunftsprognosen im ProcureOS AIP-System.",
            "backToDashboard": "Zurück zum Dashboard",
            "releaseNotes": "Versionshinweise",
            "footerNote": "ProcureOS ist ein autonomes Ökosystem, das den AIP-Standards folgt.",
            "historyTitle": "Vollständiger Commit-Verlauf",
            "historySubtitle": "Technische Zusammenfassung aller atomaren Änderungen in der ProcureOS AIP Kerninfrastruktur.",
            "searchPlaceholder": "Suche nach Commit-Nachricht oder Version...",
            "noResults": "Keine Commits gefunden",
            "commitsTitle": "Commit-Verlauf",
            "fullLog": "Vollständiges Log"
        },
        "faq": {
            "title": "Häufig gestellte Fragen",
            "subtitle": "Alles, was Sie über das autonome Beschaffungsökosystem ProcureOS wissen müssen.",
            "helpCenter": "HILFEZENTRUM",
            "back": "Zurück",
            "questions": {
                "q1": "Wie erstelle ich eine Kaufanfrage über ProcureOS?",
                "a1": "Sie können Ihre Bedürfnisse in natürlicher Sprache eingeben, indem Sie auf der Startseite auf die Schaltfläche 'Anfrage erstellen' klicken.",
                "q2": "Wie werden Lieferanten verifiziert?",
                "a2": "Der ProcureOS-Lieferantenverifizierungsprozess basiert auf einem 3-stufigen Audit-Mechanismus.",
                "q3": "Wie funktionieren die Zahlungsprozesse?",
                "a3": "In dieser Phase erfolgen die Zahlungen direkt über bestehende kommerzielle Vereinbarungen zwischen Käufer und Verkäufer.",
                "q4": "Kann ich globale Lieferanten erreichen?",
                "a4": "Ja, das ProcureOS-Netzwerk umfasst Tausende von Lieferanten sowohl lokal als auch global."
            }
        }
    },
    "fr": {
        "home": { "protocolNotes": "Notes de protocole AIP 103" },
        "changelog": {
            "title": "Notes de version du protocole AIP",
            "subtitle": "Documentation technique sur les développements actuels et les projections futures du système ProcureOS AIP.",
            "backToDashboard": "Retour au tableau de bord",
            "releaseNotes": "Notes de version",
            "footerNote": "ProcureOS est un écosystème autonome suivant les normes AIP.",
            "historyTitle": "Historique complet des commits",
            "historySubtitle": "Résumé technique de tous les changements atomiques dans l'infrastructure de base de ProcureOS AIP.",
            "searchPlaceholder": "Rechercher par message de commit ou version...",
            "noResults": "Aucun commit trouvé",
            "commitsTitle": "Historique des commits",
            "fullLog": "Journal complet"
        },
        "faq": {
            "title": "Foire aux questions",
            "subtitle": "Tout ce que vous devez savoir sur l'écosystème d'approvisionnement autonome ProcureOS.",
            "helpCenter": "CENTRE D'AIDE",
            "back": "Retour",
            "questions": {
                "q1": "Comment créer une demande d'achat via ProcureOS ?",
                "a1": "Vous pouvez écrire vos besoins en langage naturel en cliquant sur le bouton 'Créer une demande' sur la page d'accueil.",
                "q2": "Comment les fournisseurs sont-ils vérifiés ?",
                "a2": "Le processus de vérification des fournisseurs ProcureOS repose sur un mécanisme d'audit à 3 niveaux.",
                "q3": "Comment fonctionnent les processus de paiement ?",
                "a3": "À ce stade, les paiements s'effectuent directement via les accords commerciaux existants.",
                "q4": "Puis-je joindre des fournisseurs mondiaux ?",
                "a4": "Oui, le réseau ProcureOS couvre des milliers de fournisseurs locaux et mondiaux."
            }
        }
    },
    "ru": {
        "home": { "protocolNotes": "Примечания к протоколу AIP 103" },
        "changelog": {
            "title": "Примечания к выпуску протокола AIP",
            "subtitle": "Техническая документация о текущих разработках и будущих прогнозах в системе ProcureOS AIP.",
            "backToDashboard": "Вернуться к панели",
            "releaseNotes": "Примечания к выпуску",
            "footerNote": "ProcureOS — это автономная экосистема, соответствующая стандартам AIP.",
            "historyTitle": "Полная история коммитов",
            "historySubtitle": "Техническая сводка всех атомарных изменений в основной инфраструктуре ProcureOS AIP.",
            "searchPlaceholder": "Поиск по сообщению коммита или версии...",
            "noResults": "Коммиты не найдены",
            "commitsTitle": "История коммитов",
            "fullLog": "Полный лог"
        },
        "faq": {
            "title": "Часто задаваемые вопросы",
            "subtitle": "Все, что вам нужно знать об автономной экосистеме закупок ProcureOS.",
            "helpCenter": "ЦЕНТР ПОМОЩИ",
            "back": "Назад",
            "questions": {
                "q1": "Как создать запрос на покупку через ProcureOS?",
                "a1": "Вы можете написать о своих потребностях на естественном языке, нажав кнопку 'Создать запрос' на главной странице.",
                "q2": "Как проверяются поставщики?",
                "a2": "Процесс проверки поставщиков ProcureOS основан на трехэтапном механизме аудита.",
                "q3": "Как работают процессы оплаты?",
                "a3": "На данном этапе платежи осуществляются напрямую через существующие коммерческие соглашения.",
                "q4": "Могу ли я связаться с мировыми поставщиками?",
                "a4": "Да, сеть ProcureOS охватывает тысячи поставщиков как на местном, так и на мировом уровне."
            }
        }
    },
    "ja": {
        "home": { "protocolNotes": "AIP 103 プロトコルノート" },
        "changelog": {
            "title": "AIP プロトコル リリースノート",
            "subtitle": "ProcureOS 自律型インテリジェンス プロトコル (AIP) システムの現在の開発と将来の予測に関する技術ドキュメント。",
            "backToDashboard": "ダッシュボードに戻る",
            "releaseNotes": "リリースノート",
            "footerNote": "ProcureOS は、AIP 標準に従う自律型エコシステムです。",
            "historyTitle": "完全なコミット履歴",
            "historySubtitle": "ProcureOS AIP コア インフラストラクチャにおけるすべての原子的な変更の技術的概要。",
            "searchPlaceholder": "コミット メッセージまたはバージョンで検索...",
            "noResults": "条件に一致するコミットは見つかりませんでした",
            "commitsTitle": "コミット履歴",
            "fullLog": "完全なログ"
        },
        "faq": {
            "title": "よくある質問",
            "subtitle": "ProcureOS 自律型調達エコシステムについて知っておくべきことすべて。",
            "helpCenter": "ヘルプセンター",
            "back": "戻る",
            "questions": {
                "q1": "ProcureOS で購入リクエストを作成するにはどうすればよいですか？",
                "a1": "ホームページの [リクエストの作成] ボタンをクリックして、必要な内容を自然言語で入力できます。",
                "q2": "サプライヤーはどのように検証されますか？",
                "a2": "ProcureOS のサプライヤー検証プロセスは、3 層の監査メカニズムに基づいています。",
                "q3": "支払いプロセスはどのように機能しますか？",
                "a3": "現段階では、支払いは購入者と販売者の間の既存の商取引契約を通じて直接行われます。",
                "q4": "グローバルなサプライヤーに連絡できますか？",
                "a4": "はい、ProcureOS ネットワークには、ローカルおよびグローバルの両方で数千のサプライヤーが含まれています。"
            }
        }
    },
    "zh": {
        "home": { "protocolNotes": "AIP 103 协议说明" },
        "changelog": {
            "title": "AIP 协议发行说明",
            "subtitle": "关于 ProcureOS 自治智能协议 (AIP) 系统当前发展和未来预测的技术文档。",
            "backToDashboard": "返回仪表板",
            "releaseNotes": "发行说明",
            "footerNote": "ProcureOS 是一个遵循 AIP 标准的自治生态系统。",
            "historyTitle": "完整提交历史",
            "historySubtitle": "ProcureOS AIP 核心基础设施中所有原子更改的技术摘要。",
            "searchPlaceholder": "通过提交消息或版本搜索...",
            "noResults": "未找到符合条件的提交",
            "commitsTitle": "提交历史",
            "fullLog": "完整日志"
        },
        "faq": {
            "title": "常见问题",
            "subtitle": "您需要了解的关于 ProcureOS 自治采购生态系统的一切。",
            "helpCenter": "帮助中心",
            "back": "返回",
            "questions": {
                "q1": "如何通过 ProcureOS 创建采购请求？",
                "a1": "您可以点击首页的“创建请求”按钮，用自然语言写下您的需求。",
                "q2": "供应商如何验证？",
                "a2": "ProcureOS 供应商验证过程基于 3 层审核机制。",
                "q3": "付款流程如何运作？",
                "a3": "在此阶段，付款直接通过买卖双方之间现有的商业协议进行。",
                "q4": "我可以联系全球供应商吗？",
                "a4": "是的，ProcureOS 网络涵盖了本地和全球的数千家供应商。"
            }
        }
    }
};

for (const lang of ["tr", "en", "de", "fr", "ru", "ja", "zh"]) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Helper for deep update
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
    
    // Apply new namespaces
    deepUpdate(data, newNamespaces[lang]);
    
    // Fix duplicates or leftovers if any (specific to the double home entry seen in ja.json)
    if (data.home && Array.isArray(data.home)) {
        // This shouldn't happen if it was valid JSON, but let's be safe
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`${lang}.json updated with full namespaces.`);
}
