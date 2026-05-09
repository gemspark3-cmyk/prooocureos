const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const releaseData = {
    "tr": {
        "AIP-106": { "title": "Global Settlement & Escrow Katmanı", "description": "Sınır ötesi ödemelerin ve güvenli ticaretin (Escrow) AIP protokolüne tam entegrasyonu.", "cat1": "Finansallar", "item1": "Çoklu para birimi ve anlık kur dönüşüm motoru.", "item2": "ProcureOS Escrow: Mal teslimatı onaylı akıllı sözleşme tabanlı ödeme sistemi.", "item3": "Tedarikçi finansmanı ve hakediş yönetim paneli." },
        "AIP-105": { "title": "ProcureAI Insight & Tahminleme", "description": "Pazar trendleri ve tedarik zinciri risklerinin yapay zeka ile önceden tespiti.", "cat1": "İstihbarat", "item1": "Predictive Sourcing: Talep gelmeden önce tedarikçi kapasite rezervasyonu.", "item2": "Pazar trend analizi ve dinamik fiyat dalgalanma uyarıları.", "item3": "Tedarikçi risk skorlama (Risk Scoring) 2.0 katmanı." },
        "AIP-104": { "title": "Enterprise Connect & ERP Entegrasyonu", "description": "ProcureOS'un mevcut kurumsal ERP sistemleri ile kusursuz veri senkronizasyonu.", "cat1": "Bağlantı", "item1": "SAP, Oracle ve Microsoft Dynamics için hazır veri konnektörleri.", "item2": "Hiyerarşik onay mekanizması ve kurumsal bütçe kontrol entegrasyonu.", "item3": "Tekil oturum açma (SSO) ve kurumsal kimlik yönetimi (IAM) desteği." },
        "AIP-103_6": { "title": "Kurumsal Raporlama & Finansal Görünürlük", "description": "Satınalma verilerinin operasyonel ve finansal katmanlarda profesyonel raporlanması sağlandı.", "cat1": "Raporlama", "item1": "Profesyonel Excel (.xlsx) dışa aktarım motoru ve stilize tablolar.", "item2": "Raporlara 'Potansiyel Tasarruf Analizi' metriği eklendi.", "item3": "Gelişmiş veri filtreleme ve tarih bazlı raporlama altyapısı.", "cat2": "Performans", "item4": "Dashboard veri yükleme süreleri SWR ile %70 hızlandırıldı.", "item5": "Veri tabanı indekslemeleri ile sorgu optimizasyonu tamamlandı." },
        "AIP-103_5": { "title": "Performans Motoru & Asenkron Mimari", "description": "ProcureOS çekirdek altyapısı, yüksek yoğunluklu trafik için asenkron yapıya geçirildi.", "cat1": "Mimari", "item1": "AI Embedding üretimi worker katmanına offload edildi.", "item2": "Pazaryeri aramaları için 'Debounced Search' altyapısı devreye alındı.", "item3": "Konum ve adres formatları tüm modüllerde standart hale getirildi." },
        "AIP-103": { "title": "Zero-Trust & Anlamsal Eşleşme", "description": "Veri güvenliği ve yapay zeka eşleştirme motorunun temel stabilizasyonu.", "cat1": "Güvenlik", "item1": "Supabase RLS ile Zero-Trust izolasyonu sağlandı.", "item2": "Anlamsal eşleşme motoru 450ms gecikme süresinin altına düşürüldü." },
        "AIP-102": { "title": "Akıllı Katalog Yönetimi", "description": "Tedarikçi kataloglarının ve ürün verilerinin dijitalleştirilmesi.", "cat1": "Çekirdek", "item1": "Vektör tabanlı ürün arama ve kataloglama sistemi.", "item2": "Tedarikçi kayıt ve doğrulama akışları optimize edildi." },
        "AIP-101": { "title": "NLP Engine & Çoklu Dil Desteği", "description": "Prototip aşamasından ilk üretim sürümüne geçiş.", "cat1": "Temel", "item1": "72 dilde anlık RFQ çeviri ve analiz motoru.", "item2": "Doğal dil işleme (NLP) ile ilk başarılı talep-tedarikçi eşleşmesi." }
    },
    "ru": {
        "AIP-106": { "title": "Глобальные расчеты и уровень Escrow", "description": "Полная интеграция трансграничных платежей и безопасной торговли (Escrow) в протокол AIP.", "cat1": "Финансы", "item1": "Мультивалютный движок мгновенной конвертации курсов.", "item2": "ProcureOS Escrow: система платежей на базе смарт-контрактов с подтверждением доставки.", "item3": "Панель финансирования поставщиков и управления выплатами." },
        "AIP-105": { "title": "ProcureAI Insight и прогнозирование", "description": "Предварительное обнаружение рыночных тенденций и рисков цепочки поставок с помощью ИИ.", "cat1": "Интеллект", "item1": "Прогнозный сорсинг: резервирование мощностей поставщиков до возникновения спроса.", "item2": "Анализ рыночных тенденций и оповещения о динамических колебаниях цен.", "item3": "Уровень оценки рисков поставщиков (Risk Scoring) 2.0." },
        "AIP-104": { "title": "Enterprise Connect и интеграция с ERP", "description": "Бесшовная синхронизация данных ProcureOS с существующими корпоративными ERP-системами.", "cat1": "Связь", "item1": "Готовые коннекторы данных для SAP, Oracle и Microsoft Dynamics.", "item2": "Иерархический механизм утверждения и интеграция контроля корпоративного бюджета.", "item3": "Поддержка единого входа (SSO) и управления идентификацией (IAM)." },
        "AIP-103_6": { "title": "Корпоративная отчетность и финансовая прозрачность", "description": "Обеспечена профессиональная отчетность по закупкам на операционном и финансовом уровнях.", "cat1": "Отчетность", "item1": "Профессиональный движок экспорта в Excel (.xlsx) и стилизованные таблицы.", "item2": "В отчеты добавлен показатель «Анализ потенциальной экономии».", "item3": "Расширенная фильтрация данных и инфраструктура отчетности по датам.", "cat2": "Производительность", "item4": "Время загрузки дашборда ускорено на 70% благодаря SWR.", "item5": "Оптимизация запросов завершена с помощью индексации GIN и B-Tree." },
        "AIP-103_5": { "title": "Performance Engine и асинхронная архитектура", "description": "Основная инфраструктура ProcureOS переведена на асинхронную структуру для работы с интенсивным трафиком.", "cat1": "Архитектура", "item1": "Генерация AI-эмбеддингов вынесена в слой воркеров для ускорения системы.", "item2": "Запущена инфраструктура Debounced Search для поиска на маркетплейсе.", "item3": "Форматы местоположения и адресов стандартизированы во всех модулях." },
        "AIP-103": { "title": "Zero-Trust и семантическое соответствие", "description": "Базовая стабилизация движка безопасности данных и ИИ-подбора.", "cat1": "Безопасность", "item1": "Изоляция Zero-Trust обеспечена с помощью Supabase RLS.", "item2": "Задержка движка семантического соответствия снижена до уровня менее 450 мс." },
        "AIP-102": { "title": "Интеллектуальное управление каталогами", "description": "Цифровизация каталогов поставщиков и данных о продукции.", "cat1": "Ядро", "item1": "Система векторного поиска товаров и каталогизации.", "item2": "Оптимизированы потоки регистрации и верификации поставщиков." },
        "AIP-101": { "title": "NLP Engine и многоязычная поддержка", "description": "Переход от прототипа к первой производственной версии.", "cat1": "Фундамент", "item1": "Движок мгновенного перевода и анализа RFQ на 72 языках.", "item2": "Первое успешное сопоставление спроса и предложения с помощью NLP." }
    },
    "zh": {
        "AIP-106": { "title": "全球结算和托管层", "description": "将跨境支付和安全贸易（托管）全面整合到 AIP 协议中。", "cat1": "财务", "item1": "多货币和即时汇率转换引擎。", "item2": "ProcureOS 托管：基于智能合约的支付系统，具有交付确认功能。", "item3": "供应商融资和进度款管理面板。" },
        "AIP-105": { "title": "ProcureAI 洞察与预测", "description": "利用人工智能预先检测市场趋势和供应链风险。", "cat1": "情报", "item1": "预测性采购：在需求产生之前预订供应商产能。", "item2": "市场趋势分析和动态价格波动警告。", "item3": "供应商风险评分 2.0 层。" },
        "AIP-104": { "title": "企业连接与 ERP 集成", "description": "ProcureOS 与现有企业 ERP 系统的无缝数据同步。", "cat1": "连接性", "item1": "适用于 SAP、Oracle 和 Microsoft Dynamics 的现成数据连接器。", "item2": "分层审批机制和企业预算控制集成。", "item3": "支持单点登录 (SSO) 和身份访问管理 (IAM)。" },
        "AIP-103_6": { "title": "企业报告与财务可见性", "description": "在运营和财务层提供采购数据的专业报告。", "cat1": "报告", "item1": "专业 Excel (.xlsx) 导出引擎和样式化表格。", "item2": "报告中增加了“潜在节省分析”指标。", "item3": "先进的数据过滤和基于日期的报告基础设施。" },
        "AIP-103_5": { "title": "性能引擎与异步架构", "description": "ProcureOS 核心基础设施已移至异步结构，以处理高密度流量。", "cat1": "架构", "item1": "AI 嵌入生成转移到工作层以提高系统速度。", "item2": "为市场搜索启动了防抖搜索基础设施。", "item3": "所有模块的地理位置和地址格式均已标准化。" },
        "AIP-103": { "title": "零信任与语义匹配", "description": "数据安全和 AI 匹配引擎的基本稳定。", "cat1": "安全", "item1": "利用 Supabase RLS 提供零信任隔离。", "item2": "语义匹配引擎延迟降至 450ms 以下。" },
        "AIP-102": { "title": "智能目录管理", "description": "供应商目录和产品数据的数字化。", "cat1": "核心", "item1": "基于向量的产品搜索和目录系统。", "item2": "优化了供应商注册和验证流程。" },
        "AIP-101": { "title": "NLP 引擎与多语言支持", "description": "从原型过渡到第一个生产版本。", "cat1": "基础", "item1": "支持 72 种语言的实时 RFQ 翻译和分析引擎。", "item2": "利用自然语言处理 (NLP) 首次成功实现需求-供应商匹配。" }
    },
    "ja": {
        "AIP-106": { "title": "グローバル決済＆エスクロー層", "description": "国際決済と安全な取引（エスクロー）を AIP プロトコルに完全統合。", "cat1": "財務", "item1": "多通貨および即時為替換算エンジン。", "item2": "ProcureOS エスクロー：納品確認付きのスマートコントラクトベースの決済システム。", "item3": "サプライヤーファイナンスおよび出来高管理パネル。" },
        "AIP-105": { "title": "ProcureAI インサイト＆予測", "description": "AIによる市場動向とサプライチェーンリスクの事前検知。", "cat1": "インテリジェンス", "item1": "予測ソーシング：需要が発生する前のサプライヤーキャパシティ予約。", "item2": "市場動向分析と動的な価格変動アラート。", "item3": "サプライヤーリスクスコアリング 2.0 レイヤー。" },
        "AIP-104": { "title": "エンタープライズコネクト＆ERP統合", "description": "既存の企業ERPシステムと ProcureOS のシームレスなデータ同期。", "cat1": "接続性", "item1": "SAP、Oracle、Microsoft Dynamics 用の既製データコネクタ。", "item2": "階層的な承認メカニズムと企業予算管理の統合。", "item3": "シングルサインオン (SSO) と ID アクセス管理 (IAM) のサポート。" },
        "AIP-103_6": { "title": "企業レポート＆財務可視化", "description": "運用および財務レイヤーにおける調達データのプロフェッショナルなレポート提供。", "cat1": "レポート", "item1": "プロフェッショナルな Excel (.xlsx) エクスポートエンジンとスタイル付きテーブル。", "item2": "レポートに「潜在的な節約分析」指標を追加。", "item3": "高度なデータフィルタリングと日付ベースのレポートインフラ。" },
        "AIP-103_5": { "title": "パフォーマンスエンジン＆非同期アーキテクチャ", "description": "高密度トラフィックに対応するため、ProcureOS コアを非同期構造に移行。", "cat1": "アーキテクチャ", "item1": "AI エンベディング生成をワーカーレイヤーにオフロード。", "item2": "マーケットプレイス検索用のデバウンス検索インフラを開始。", "item3": "すべてのモジュールで位置と住所の形式を標準化。" },
        "AIP-103": { "title": "ゼロトラスト＆意味的マッチング", "description": "データセキュリティと AI マッチングエンジンの基本的な安定化。", "cat1": "セキュリティ", "item1": "Supabase RLS によるゼロトラスト分離。", "item2": "意味的マッチングエンジンのレイテンシを 450ms 未満に短縮。" },
        "AIP-102": { "title": "スマートカタログ管理", "description": "サプライヤーカタログと製品データのデジタル化。", "cat1": "コア", "item1": "ベクトルベースの製品検索とカタログシステム。", "item2": "サプライヤー登録と検証フローの最適化。" },
        "AIP-101": { "title": "NLP エンジン＆多言語サポート", "description": "プロトタイプから最初の製品バージョンへの移行。", "cat1": "基盤", "item1": "72言語対応のリアルタイム RFQ 翻訳および分析エンジン。", "item2": "自然言語処理 (NLP) による初の需要・サプライヤーマッチング成功。" }
    },
    "de": {
        "AIP-106": { "title": "Global Settlement & Escrow Layer", "description": "Vollständige Integration von grenzüberschreitenden Zahlungen und sicherem Handel (Escrow).", "cat1": "Finanzen", "item1": "Multiwährungs-Engine und sofortige Wechselkursumrechnung.", "item2": "ProcureOS Escrow: Smart-Contract-basiertes Zahlungssystem.", "item3": "Lieferantenfinanzierung und Abschlagszahlungsverwaltung." },
        "AIP-105": { "title": "ProcureAI Insight & Prognose", "description": "Früherkennung von Markttrends und Lieferkettenrisiken mit KI.", "cat1": "Intelligenz", "item1": "Predictive Sourcing: Kapazitätsreservierung vor Bedarf.", "item2": "Markttrendanalyse und Warnungen bei Preisschwankungen.", "item3": "Supplier Risk Scoring 2.0 Layer." },
        "AIP-104": { "title": "Enterprise Connect & ERP-Integration", "description": "Nahtlose Datensynchronisation mit bestehenden ERP-Systemen.", "cat1": "Konnektivität", "item1": "Datenkonnektoren für SAP, Oracle und Microsoft Dynamics.", "item2": "Hierarchischer Genehmigungsmechanismus.", "item3": "SSO- und IAM-Unterstützung." },
        "AIP-103_6": { "title": "Unternehmensberichterstattung", "description": "Professionelle Berichterstattung über Beschaffungsdaten.", "cat1": "Berichterstattung", "item1": "Professionelle Excel-Export-Engine (.xlsx).", "item2": "Metrik 'Analyse potenzieller Einsparungen' hinzugefügt.", "item3": "Erweiterte Datenfilterung.", "cat2": "Leistung", "item4": "Dashboard-Ladezeiten um 70% beschleunigt.", "item5": "Abfrageoptimierung mit GIN/B-Tree." }
    },
    "fr": {
        "AIP-106": { "title": "Couche Global Settlement & Escrow", "description": "Intégration complète des paiements transfrontaliers et du commerce sécurisé (Escrow).", "cat1": "Finances", "item1": "Moteur multi-devises et conversion instantanée des taux.", "item2": "ProcureOS Escrow : système de paiement basé sur des smart contracts.", "item3": "Financement des fournisseurs et gestion des acomptes." },
        "AIP-105": { "title": "ProcureAI Insight & Prévisions", "description": "Détection précoce des tendances du marché et des risques avec l'IA.", "cat1": "Intelligence", "item1": "Sourcing prédictif : réservation de capacité avant la demande.", "item2": "Analyse des tendances et alertes de prix.", "item3": "Couche de Risk Scoring 2.0." },
        "AIP-104": { "title": "Enterprise Connect & Intégration ERP", "description": "Synchronisation transparente avec les systèmes ERP existants.", "cat1": "Connectivité", "item1": "Connecteurs pour SAP, Oracle et Microsoft Dynamics.", "item2": "Mécanisme d'approbation hiérarchique.", "item3": "Support SSO et IAM." },
        "AIP-103_6": { "title": "Reporting d'entreprise", "description": "Reporting professionnel des données d'achat.", "cat1": "Reporting", "item1": "Moteur d'exportation Excel (.xlsx) professionnel.", "item2": "Métrique 'Analyse des économies potentielles' ajoutée.", "item3": "Filtrage avancé des données.", "cat2": "Performance", "item4": "Chargement du tableau de bord accéléré de 70%.", "item5": "Optimisation avec indexation GIN/B-Tree." }
    },
    "en": {
        "AIP-106": { "title": "Global Settlement & Escrow Layer", "description": "Full integration of cross-border payments and secure trade (Escrow) into the AIP protocol.", "cat1": "Financials", "item1": "Multi-currency and instant exchange rate conversion engine.", "item2": "ProcureOS Escrow: Smart contract based payment system.", "item3": "Supplier financing and progress payment management." },
        "AIP-105": { "title": "ProcureAI Insight & Forecasting", "description": "Pre-detection of market trends and supply chain risks with AI.", "cat1": "Intelligence", "item1": "Predictive Sourcing: Capacity reservation before demand.", "item2": "Market trend analysis and price fluctuation warnings.", "item3": "Supplier Risk Scoring 2.0 layer." },
        "AIP-104": { "title": "Enterprise Connect & ERP Integration", "description": "Seamless data synchronization of ProcureOS with corporate ERP systems.", "cat1": "Connectivity", "item1": "Connectors for SAP, Oracle, and Microsoft Dynamics.", "item2": "Hierarchical approval and budget control integration.", "item3": "SSO and IAM support." },
        "AIP-103_6": { "title": "Corporate Reporting & Financial Visibility", "description": "Professional reporting of procurement data in operational and financial layers.", "cat1": "Reporting", "item1": "Professional Excel export engine and stylized tables.", "item2": "Added 'Potential Savings Analysis' metric.", "item3": "Advanced data filtering and date-based reporting.", "cat2": "Performance", "item4": "Dashboard speed increased by 70% with SWR.", "item5": "Query optimization with GIN/B-Tree indexing." },
        "AIP-103_5": { "title": "Performance Engine & Async Architecture", "description": "ProcureOS core moved to asynchronous structure for high-density traffic.", "cat1": "Architecture", "item1": "AI Embedding offloaded to worker layer.", "item2": "Debounced Search for marketplace searches.", "item3": "Location and address formats standardized." },
        "AIP-103": { "title": "Zero-Trust & Semantic Matching", "description": "Stabilization of data security and AI matching engine.", "cat1": "Security", "item1": "Zero-Trust isolation with Supabase RLS.", "item2": "Match latency reduced below 450ms." },
        "AIP-102": { "title": "Smart Catalog Management", "description": "Digitization of supplier catalogs and product data.", "cat1": "Core", "item1": "Vector-based product search and cataloging.", "item2": "Optimized registration flows." },
        "AIP-101": { "title": "NLP Engine & Multi-Language Support", "description": "RFQ translation and analysis in 72 languages.", "cat1": "Foundation", "item1": "Successful demand-supplier matching with NLP.", "item2": "Successful demand-supplier matching with NLP." }
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.changelog) data.changelog = {};
    
    const enItems = releaseData["en"];
    const baseItems = releaseData[lang] || enItems;
    
    const finalItems = {};
    for (const version in enItems) {
        // If the lang-specific entry is missing a key (like item3), we fill it from EN
        const langEntry = baseItems[version] || enItems[version];
        const enEntry = enItems[version];
        
        const mergedEntry = {};
        for (const key in enEntry) {
            mergedEntry[key] = langEntry[key] || enEntry[key];
        }
        finalItems[version] = mergedEntry;
    }
    
    data.changelog.releaseItems = finalItems;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Re-localized all items for ${lang}.json`);
}
