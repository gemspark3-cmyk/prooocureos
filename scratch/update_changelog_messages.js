const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
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
        }
    },
    "de": {
        "home": { "protocolNotes": "AIP 103 Protokoll-Notizen" },
        "changelog": {
            "title": "AIP Protokoll Versionshinweise",
            "subtitle": "Technische Dokumentation zu aktuellen Entwicklungen und Zukunftsprognosen im ProcureOS Autonomous Intelligence Protocol (AIP) System.",
            "backToDashboard": "Zurück zum Dashboard",
            "releaseNotes": "Versionshinweise",
            "footerNote": "ProcureOS ist ein autonomes Ökosystem, das den AIP-Standards folgt.",
            "historyTitle": "Vollständiger Commit-Verlauf",
            "historySubtitle": "Technische Zusammenfassung aller atomaren Änderungen in der ProcureOS AIP Kerninfrastruktur.",
            "searchPlaceholder": "Suche nach Commit-Nachricht oder Version...",
            "noResults": "Keine Commits gefunden",
            "commitsTitle": "Commit-Verlauf",
            "fullLog": "Vollständiges Log"
        }
    },
    "fr": {
        "home": { "protocolNotes": "Notes de protocole AIP 103" },
        "changelog": {
            "title": "Notes de version du protocole AIP",
            "subtitle": "Documentation technique sur les développements actuels et les projections futures du système ProcureOS Autonomous Intelligence Protocol (AIP).",
            "backToDashboard": "Retour au tableau de bord",
            "releaseNotes": "Notes de version",
            "footerNote": "ProcureOS est un écosystème autonome suivant les normes AIP.",
            "historyTitle": "Historique complet des commits",
            "historySubtitle": "Résumé technique de tous les changements atomiques dans l'infrastructure de base de ProcureOS AIP.",
            "searchPlaceholder": "Rechercher par message de commit ou version...",
            "noResults": "Aucun commit trouvé",
            "commitsTitle": "Historique des commits",
            "fullLog": "Journal complet"
        }
    },
    "ru": {
        "home": { "protocolNotes": "Примечания к протоколу AIP 103" },
        "changelog": {
            "title": "Примечания к выпуску протокола AIP",
            "subtitle": "Техническая документация о текущих разработках и будущих прогнозах в системе ProcureOS Autonomous Intelligence Protocol (AIP).",
            "backToDashboard": "Вернуться к панели",
            "releaseNotes": "Примечания к выпуску",
            "footerNote": "ProcureOS — это автономная экосистема, соответствующая стандартам AIP.",
            "historyTitle": "Полная история коммитов",
            "historySubtitle": "Техническая сводка всех атомарных изменений в основной инфраструктуре ProcureOS AIP.",
            "searchPlaceholder": "Поиск по сообщению коммита или версии...",
            "noResults": "Коммиты не найдены",
            "commitsTitle": "История коммитов",
            "fullLog": "Полный лог"
        }
    }
};

for (const lang in translations) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep update
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
    console.log(`Updated ${lang}.json for changelog.`);
}
