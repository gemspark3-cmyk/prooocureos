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
    }
};

// Simplified: I will inject only TR and RU for now, but also adding EN as baseline
releaseData["en"] = {
    "AIP-106": { "title": "Global Settlement & Escrow Layer", "description": "Full integration of cross-border payments and secure trade (Escrow) into the AIP protocol.", "cat1": "Financials", "item1": "Multi-currency and instant exchange rate conversion engine.", "item2": "ProcureOS Escrow: Smart contract based payment system.", "item3": "Supplier financing and progress payment management." },
    "AIP-105": { "title": "ProcureAI Insight & Forecasting", "description": "Pre-detection of market trends and supply chain risks with AI.", "cat1": "Intelligence", "item1": "Predictive Sourcing: Capacity reservation before demand.", "item2": "Market trend analysis and price fluctuation warnings.", "item3": "Supplier Risk Scoring 2.0 layer." },
    "AIP-104": { "title": "Enterprise Connect & ERP Integration", "description": "Seamless data synchronization of ProcureOS with corporate ERP systems.", "cat1": "Connectivity", "item1": "Connectors for SAP, Oracle, and Microsoft Dynamics.", "item2": "Hierarchical approval and budget control integration.", "item3": "SSO and IAM support." },
    "AIP-103.6": { "title": "Corporate Reporting & Financial Visibility", "description": "Professional reporting of procurement data in operational and financial layers.", "cat1": "Reporting", "item1": "Professional Excel export engine and stylized tables.", "item2": "Added 'Potential Savings Analysis' metric.", "item3": "Advanced data filtering and date-based reporting.", "cat2": "Performance", "item4": "Dashboard speed increased by 70% with SWR.", "item5": "Query optimization with GIN/B-Tree indexing." },
    "AIP-103.5": { "title": "Performance Engine & Async Architecture", "description": "ProcureOS core moved to asynchronous structure for high-density traffic.", "cat1": "Architecture", "item1": "AI Embedding offloaded to worker layer.", "item2": "Debounced Search for marketplace searches.", "item3": "Location and address formats standardized." },
    "AIP-103": { "title": "Zero-Trust & Semantic Matching", "description": "Stabilization of data security and AI matching engine.", "cat1": "Security", "item1": "Zero-Trust isolation with Supabase RLS.", "item2": "Match latency reduced below 450ms." },
    "AIP-102": { "title": "Smart Catalog Management", "description": "Digitization of supplier catalogs and product data.", "cat1": "Core", "item1": "Vector-based product search and cataloging.", "item2": "Optimized registration flows." },
    "AIP-101": { "title": "NLP Engine & Multi-Language Support", "description": "Transition from prototype to production.", "cat1": "Foundation", "item1": "RFQ translation and analysis in 72 languages.", "item2": "Successful demand-supplier matching with NLP." }
};

for (const lang of ["tr", "en", "ru"]) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.changelog) data.changelog = {};
    data.changelog.releaseItems = releaseData[lang];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated release items for ${lang}.json`);
}
