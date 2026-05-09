const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const releaseData = {
    "tr": {
        "AIP-106": { "title": "Global Settlement & Escrow Katmanı", "description": "Sınır ötesi ödemelerin ve güvenli ticaretin (Escrow) AIP protokolüne tam entegrasyonu.", "cat1": "Finansallar", "item1": "Çoklu para birimi ve anlık kur dönüşüm motoru.", "item2": "ProcureOS Escrow: Mal teslimatı onaylı akıllı sözleşme tabanlı ödeme sistemi.", "item3": "Tedarikçi finansmanı ve hakediş yönetim paneli." },
        "AIP-105": { "title": "ProcureAI Insight & Tahminleme", "description": "Pazar trendleri ve tedarik zinciri risklerinin yapay zeka ile önceden tespiti.", "cat1": "İstihbarat", "item1": "Predictive Sourcing: Talep gelmeden önce tedarikçi kapasite rezervasyonu.", "item2": "Pazar trend analizi ve dinamik fiyat dalgalanma uyarıları.", "item3": "Tedarikçi risk skorlama (Risk Scoring) 2.0 katmanı." },
        "AIP-104": { "title": "Enterprise Connect & ERP Entegrasyonu", "description": "ProcureOS'un mevcut kurumsal ERP sistemleri ile kusursuz veri senkronizasyonu.", "cat1": "Bağlantı", "item1": "SAP, Oracle ve Microsoft Dynamics için hazır veri konnektörleri.", "item2": "Hiyerarşik onay mekanizması ve kurumsal bütçe kontrol entegrasyonu.", "item3": "Tekil oturum açma (SSO) ve kurumsal kimlik yönetimi (IAM) desteği." },
        "AIP-103.6": { "title": "Kurumsal Raporlama & Finansal Görünürlük", "description": "Satınalma verilerinin operasyonel ve finansal katmanlarda profesyonel raporlanması sağlandı.", "cat1": "Raporlama", "item1": "Profesyonel Excel (.xlsx) dışa aktarım motoru ve stilize tablolar.", "item2": "Raporlara 'Potansiyel Tasarruf Analizi' metriği eklendi.", "item3": "Gelişmiş veri filtreleme ve tarih bazlı raporlama altyapısı.", "cat2": "Performans", "item4": "Dashboard veri yükleme süreleri SWR ile %70 hızlandırıldı.", "item5": "Veri tabanı indekslemeleri ile sorgu optimizasyonu tamamlandı." },
        "AIP-103.5": { "title": "Performans Motoru & Asenkron Mimari", "description": "ProcureOS çekirdek altyapısı, yüksek yoğunluklu trafik için asenkron yapıya geçirildi.", "cat1": "Mimari", "item1": "AI Embedding üretimi worker katmanına offload edildi.", "item2": "Pazaryeri aramaları için 'Debounced Search' altyapısı devreye alındı.", "item3": "Konum ve adres formatları tüm modüllerde standart hale getirildi." },
        "AIP-103": { "title": "Zero-Trust & Anlamsal Eşleşme", "description": "Veri güvenliği ve yapay zeka eşleştirme motorunun temel stabilizasyonu.", "cat1": "Güvenlik", "item1": "Supabase RLS ile Zero-Trust izolasyonu sağlandı.", "item2": "Anlamsal eşleşme motoru 450ms gecikme süresinin altına düşürüldü." },
        "AIP-102": { "title": "Akıllı Katalog Yönetimi", "description": "Tedarikçi kataloglarının ve ürün verilerinin dijitalleştirilmesi.", "cat1": "Çekirdek", "item1": "Vektör tabanlı ürün arama ve kataloglama sistemi.", "item2": "Tedarikçi kayıt ve doğrulama akışları optimize edildi." },
        "AIP-101": { "title": "NLP Engine & Çoklu Dil Desteği", "description": "Prototip aşamasından ilk üretim sürümüne geçiş.", "cat1": "Temel", "item1": "72 dilde anlık RFQ çeviri ve analiz motoru.", "item2": "Doğal dil işleme (NLP) ile ilk başarılı talep-tedarikçi eşleşmesi." }
    },
    "ru": {
        "AIP-106": { "title": "Глобальные расчеты и уровень Escrow", "description": "Полная интеграция трансграничных платежей и безопасной торговли (Escrow) в протокол AIP.", "cat1": "Финансы", "item1": "Мультивалютный движок мгновенной конвертации курсов.", "item2": "ProcureOS Escrow: система платежей на базе смарт-контрактов с подтверждением доставки.", "item3": "Панель финансирования поставщиков и управления выплатами." },
        "AIP-105": { "title": "ProcureAI Insight и прогнозирование", "description": "Предварительное обнаружение рыночных тенденций и рисков цепочки поставок с помощью ИИ.", "cat1": "Интеллект", "item1": "Прогнозный сорсинг: резервирование мощностей поставщиков до возникновения спроса.", "item2": "Анализ рыночных тенденций и оповещения о динамических колебаниях цен.", "item3": "Уровень оценки рисков поставщиков (Risk Scoring) 2.0." },
        "AIP-104": { "title": "Enterprise Connect и интеграция с ERP", "description": "Бесшовная синхронизация данных ProcureOS с существующими корпоративными ERP-системами.", "cat1": "Связь", "item1": "Готовые коннекторы данных для SAP, Oracle и Microsoft Dynamics.", "item2": "Иерархический механизм утверждения и интеграция контроля корпоративного бюджета.", "item3": "Поддержка единого входа (SSO) и управления идентификацией (IAM)." },
        "AIP-103.6": { "title": "Корпоративная отчетность и финансовая прозрачность", "description": "Обеспечена профессиональная отчетность по закупкам на операционном и финансовом уровнях.", "cat1": "Отчетность", "item1": "Профессиональный движок экспорта в Excel (.xlsx) и стилизованные таблицы.", "item2": "В отчеты добавлен показатель «Анализ потенциальной экономии».", "item3": "Расширенная фильтрация данных и инфраструктура отчетности по датам.", "cat2": "Производительность", "item4": "Время загрузки дашборда ускорено на 70% благодаря SWR.", "item5": "Оптимизация запросов завершена с помощью индексации GIN и B-Tree." },
        "AIP-103.5": { "title": "Performance Engine и асинхронная архитектура", "description": "Основная инфраструктура ProcureOS переведена на асинхронную структуру для работы с интенсивным трафиком.", "cat1": "Архитектура", "item1": "Генерация AI-эмбеддингов вынесена в слой воркеров для ускорения системы.", "item2": "Запущена инфраструктура Debounced Search для поиска на маркетплейсе.", "item3": "Форматы местоположения и адресов стандартизированы во всех модулях." },
        "AIP-103": { "title": "Zero-Trust и семантическое соответствие", "description": "Базовая стабилизация движка безопасности данных и ИИ-подбора.", "cat1": "Безопасность", "item1": "Изоляция Zero-Trust обеспечена с помощью Supabase RLS.", "item2": "Задержка движка семантического соответствия снижена до уровня менее 450 мс." },
        "AIP-102": { "title": "Интеллектуальное управление каталогами", "description": "Цифровизация каталогов поставщиков и данных о продукции.", "cat1": "Ядро", "item1": "Система векторного поиска товаров и каталогизации.", "item2": "Оптимизированы потоки регистрации и верификации поставщиков." },
        "AIP-101": { "title": "NLP Engine и многоязычная поддержка", "description": "Переход от прототипа к первой производственной версии.", "cat1": "Фундамент", "item1": "Движок мгновенного перевода и анализа RFQ на 72 языках.", "item2": "Первое успешное сопоставление спроса и предложения с помощью NLP." }
    },
    "de": {
        "AIP-106": { "title": "Global Settlement & Escrow Layer", "description": "Vollständige Integration von grenzüberschreitenden Zahlungen und sicherem Handel (Escrow).", "cat1": "Finanzen", "item1": "Multiwährungs-Engine und sofortige Wechselkursumrechnung.", "item2": "ProcureOS Escrow: Smart-Contract-basiertes Zahlungssystem.", "item3": "Lieferantenfinanzierung und Abschlagszahlungsverwaltung." },
        "AIP-105": { "title": "ProcureAI Insight & Prognose", "description": "Früherkennung von Markttrends und Lieferkettenrisiken mit KI.", "cat1": "Intelligenz", "item1": "Predictive Sourcing: Kapazitätsreservierung vor Bedarf.", "item2": "Markttrendanalyse und Warnungen bei Preisschwankungen.", "item3": "Supplier Risk Scoring 2.0 Layer." },
        "AIP-104": { "title": "Enterprise Connect & ERP-Integration", "description": "Nahtlose Datensynchronisation mit bestehenden ERP-Systemen.", "cat1": "Konnektivität", "item1": "Datenkonnektoren für SAP, Oracle und Microsoft Dynamics.", "item2": "Hierarchischer Genehmigungsmechanismus.", "item3": "SSO- und IAM-Unterstützung." },
        "AIP-103.6": { "title": "Unternehmensberichterstattung", "description": "Professionelle Berichterstattung über Beschaffungsdaten.", "cat1": "Berichterstattung", "item1": "Professionelle Excel-Export-Engine (.xlsx).", "item2": "Metrik 'Analyse potenzieller Einsparungen' hinzugefügt.", "item3": "Erweiterte Datenfilterung.", "cat2": "Leistung", "item4": "Dashboard-Ladezeiten um 70% beschleunigt.", "item5": "Abfrageoptimierung mit GIN/B-Tree." }
    },
    "fr": {
        "AIP-106": { "title": "Couche Global Settlement & Escrow", "description": "Intégration complète des paiements transfrontaliers et du commerce sécurisé (Escrow).", "cat1": "Finances", "item1": "Moteur multi-devises et conversion instantanée des taux.", "item2": "ProcureOS Escrow : système de paiement basé sur des smart contracts.", "item3": "Financement des fournisseurs et gestion des acomptes." },
        "AIP-105": { "title": "ProcureAI Insight & Prévisions", "description": "Détection précoce des tendances du marché et des risques avec l'IA.", "cat1": "Intelligence", "item1": "Sourcing prédictif : réservation de capacité avant la demande.", "item2": "Analyse des tendances et alertes de prix.", "item3": "Couche de Risk Scoring 2.0." },
        "AIP-104": { "title": "Enterprise Connect & Intégration ERP", "description": "Synchronisation transparente avec les systèmes ERP existants.", "cat1": "Connectivité", "item1": "Connecteurs pour SAP, Oracle et Microsoft Dynamics.", "item2": "Mécanisme d'approbation hiérarchique.", "item3": "Support SSO et IAM." },
        "AIP-103.6": { "title": "Reporting d'entreprise", "description": "Reporting professionnel des données d'achat.", "cat1": "Reporting", "item1": "Moteur d'exportation Excel (.xlsx) professionnel.", "item2": "Métrique 'Analyse des économies potentielles' ajoutée.", "item3": "Filtrage avancé des données.", "cat2": "Performance", "item4": "Chargement du tableau de bord accéléré de 70%.", "item5": "Optimisation avec indexation GIN/B-Tree." }
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.changelog) data.changelog = {};
    
    // Fill with data if exists, else fallback to EN
    data.changelog.releaseItems = releaseData[lang] || releaseData["en"];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Finalized release items for ${lang}.json`);
}
