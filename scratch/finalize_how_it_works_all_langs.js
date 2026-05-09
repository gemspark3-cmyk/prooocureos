const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const howItWorksData = {
    "tr": {
        "title": "Sistemi Keşfedin.",
        "subtitle": "Geleneksel satın alma süreçlerini unutun. AIP-103+ protokolü ile tedarik zincirinizi otonom bir işletim sistemine dönüştürün.",
        "guide": "KURUMSAL REHBER v2.0",
        "usageGuide": "Kullanım Kılavuzu",
        "backToHome": "GİRİŞ EKRANI",
        "simulator": {
            "badge": "Canlı Simülatör (v2.0)",
            "title": "Çoklu Tedarikçi Yönetim Simülasyonu",
            "desc": "Birden fazla firmaya aynı anda teklif talebi gönderme ve otonom eşleşme sürecini deneyimleyin.",
            "searchPlaceholder": "Ne tedarik etmek istiyorsunuz? (Örn: Rulman)",
            "locationPlaceholder": "Lokasyon Filtresi",
            "searchButton": "GLOBAL ARA",
            "searching": "TARANIYOR...",
            "exampleScenario": "Örnek Senaryoyu Başlat",
            "scanning": "AIP-103 Protokolü: Küresel Ağ Taranıyor...",
            "matchedSuppliers": "OTONOM EŞLEŞEN TEDARİKÇİLER ({count})",
            "selectFirms": "Lütfen teklif almak istediğiniz firmaları seçin ({count} Seçili)",
            "supplierCard": { "match": "Eşleşme", "speed": "Hız", "score": "Skor" },
            "form": {
                "badge": "CONCURRENT RFQ MODE (EŞZAMANLI TALEP)",
                "title": "TOPLU SATIN ALMA TALEBİ",
                "desc": "Seçilen {count} tedarikçiye aynı anda iletilecektir.",
                "docGroup": "DOKÜMAN GRUBU",
                "details": "İhtiyaç Detayları",
                "quantity": "Miktar",
                "currency": "Para Birimi",
                "incoterm": "Teslimat Şartı (Incoterm)",
                "targetLocation": "Hedef Lokasyon",
                "validity": "Teklif Geçerlilik Süresi",
                "submit": "{count} FİRMAYA TEKLİF TALEBİNİ İLET"
            },
            "success": {
                "title": "TALEPLER İLETİLDİ",
                "desc": "Seçilen {count} tedarikçiye resmi RFQ dökümanları ve teknik spesifikasyonlar AIP-103 protokolü üzerinden saniyeler içinde iletildi.",
                "register": "SİSTEME KAYIT OLUN",
                "newSimulation": "YENİ SİMÜLASYON BAŞLAT"
            }
        },
        "dashboard": {
            "title": "PROFESYONEL OPERASYON PANELİ",
            "subtitle": "Sisteme giriş yaptığınızda sizi bekleyen kurumsal yönetim modülleri.",
            "ops": { "title": "OPERASYON MERKEZİ", "desc": "Tüm aktif RFQ süreçlerinizi tek bir ekrandan yönetin.", "f1": "Fiyat Karşılaştırma", "f2": "Karşı Teklif", "f3": "Satın Alma Onayı" },
            "log": { "title": "LOJİSTİK TAKİBİ", "desc": "Siparişlerinizin üretimden teslimine kadar tüm süreci izleyin.", "f1": "Sevkiyat Detayları", "f2": "İrsaliye Takibi", "f3": "Teslimat Onayı" },
            "team": { "title": "TAKIM YÖNETİMİ", "desc": "Kurumsal hiyerarşinizi sisteme tanımlayın ve yönetin.", "f1": "Onay Limitleri", "f2": "Yetki Tanımlama", "f3": "Departman Raporları" },
            "erp": { "title": "ERP ENTEGRASYONU", "desc": "SAP, Oracle ve MS Dynamics ile tam entegrasyon.", "f1": "Otomatik Stok Kaydı", "f2": "API Entegrasyonu", "f3": "Zamanlanmış Senkronizasyon" }
        },
        "steps": {
            "step1": { "title": "Akıllı Arama & Keşif", "desc": "Doğal dil işleme motorumuz sayesinde sadece ihtiyacınızı yazın." },
            "step2": { "title": "Otonom RFQ Oluşturma", "desc": "Talebinizi oluşturduğunuzda, sistem teknik detayları analiz eder." },
            "step3": { "title": "Gerçek Zamanlı Müzakere", "desc": "Tedarikçilerden gelen teklifleri tek bir panelden inceleyin." },
            "step4": { "title": "Güvenli Onay & İzleme", "desc": "Anlaştığınız teklifi onaylayın ve şeffaf şekilde izleyin." }
        },
        "questions": {
            "q1": { "title": "Mevcut tedarikçilerinizden daha iyisi olabilir mi?", "desc": "AI motorumuz, global pazardaki gizli devleri sizin için bulur." },
            "q2": { "title": "Piyasa fiyat kontrolü yapmak ister misiniz?", "desc": "Gerçek zamanlı verilerle maliyetlerinizi benchmark edin." },
            "q3": { "title": "Yeni tedarikçilerden haberiniz var mı?", "desc": "Otonom ağımız her gün binlerce veri noktasını analiz eder." }
        },
        "cta": "HEMEN ÜCRETSİZ BAŞLAYIN"
    },
    "fr": {
        "title": "Découvrez le Système.",
        "subtitle": "Oubliez les processus d'achat traditionnels. Transformez votre chaîne d'approvisionnement en un système d'exploitation autonome avec le protocole AIP-103+.",
        "guide": "GUIDE ENTREPRISE v2.0",
        "usageGuide": "Guide d'Utilisation",
        "backToHome": "ÉCRAN D'ACCUEIL",
        "simulator": {
            "badge": "Simulateur en Direct (v2.0)",
            "title": "Simulation de Gestion Multi-Fournisseurs",
            "desc": "Découvrez le processus d'envoi simultané de demandes de devis à plusieurs entreprises et le processus de mise en correspondance autonome.",
            "searchPlaceholder": "Que souhaitez-vous approvisionner ? (Ex : Roulements)",
            "locationPlaceholder": "Filtre de Localisation",
            "searchButton": "RECHERCHE GLOBALE",
            "searching": "RECHERCHE EN COURS...",
            "exampleScenario": "Lancer le Scénario d'Exemple",
            "scanning": "Protocole AIP-103 : Analyse du Réseau Mondial...",
            "matchedSuppliers": "FOURNISSEURS CORRESPONDANTS AUTONOMES ({count})",
            "selectFirms": "Veuillez sélectionner les entreprises dont vous souhaitez recevoir des devis ({count} Sélectionnés)",
            "supplierCard": { "match": "Correspondance", "speed": "Vitesse", "score": "Score" },
            "form": {
                "badge": "MODE RFQ CONCURRENT (DEMANDE SIMULTANÉE)",
                "title": "DEMANDE D'ACHAT GROUPÉE",
                "desc": "Sera transmis simultanément aux {count} fournisseurs sélectionnés.",
                "docGroup": "GROUPE DE DOCUMENTS",
                "details": "Détails des Besoins",
                "quantity": "Quantité",
                "currency": "Devise",
                "incoterm": "Condition de Livraison (Incoterm)",
                "targetLocation": "Localisation Cible",
                "validity": "Validité de l'Offre",
                "submit": "ENVOYER LA DEMANDE À {count} ENTREPRISES"
            },
            "success": {
                "title": "DEMANDES ENVOYÉES",
                "desc": "Les documents RFQ officiels ont été envoyés aux {count} fournisseurs via le protocole AIP-103 en quelques secondes.",
                "register": "S'INSCRIRE AU SYSTÈME",
                "newSimulation": "LANCER UNE NOUVELLE SIMULATION"
            }
        },
        "dashboard": {
            "title": "PANNEAU D'OPÉRATION PROFESSIONNEL",
            "subtitle": "Modules de gestion d'entreprise qui vous attendent lors de votre connexion.",
            "ops": { "title": "CENTRE DES OPÉRATIONS", "desc": "Gérez tous vos processus RFQ actifs à partir d'un seul écran.", "f1": "Comparaison de Prix", "f2": "Contre-Offre", "f3": "Approbation d'Achat" },
            "log": { "title": "SUIVI LOGISTIQUE", "desc": "Suivez tout le processus, de la production à la livraison à votre porte.", "f1": "Détails d'Expédition", "f2": "Suivi de Facture", "f3": "Confirmation de Livraison" },
            "team": { "title": "GESTION D'ÉQUIPE", "desc": "Définissez et gérez votre hiérarchie d'entreprise dans le système.", "f1": "Limites d'Approbation", "f2": "Définition des Autorités", "f3": "Rapports par Département" },
            "erp": { "title": "INTÉGRATION ERP", "desc": "Intégration complète avec SAP, Oracle et MS Dynamics.", "f1": "Saisie Automatique des Stocks", "f2": "Intégration API", "f3": "Synchronisation Programmée" }
        },
        "steps": {
            "step1": { "title": "Recherche et Découverte Intelligente", "desc": "Grâce à notre moteur de traitement du langage naturel, écrivez simplement votre besoin." },
            "step2": { "title": "Création de RFQ Autonome", "desc": "Lorsque vous créez votre demande, le système analyse automatiquement les détails techniques." },
            "step3": { "title": "Négociation en Temps Réel", "desc": "Examinez les offres des fournisseurs à partir d'un seul panneau." },
            "step4": { "title": "Approbation et Suivi Sécurisés", "desc": "Approuvez l'offre convenue et suivez-la de manière transparente." }
        },
        "questions": {
            "q1": { "title": "Pourrait-il y avoir mieux que vos fournisseurs actuels ?", "desc": "Notre moteur IA trouve pour vous les géants cachés du marché mondial." },
            "q2": { "title": "Voulez-vous vérifier les prix du marché ?", "desc": "Comparez vos coûts avec des données en temps réel." },
            "q3": { "title": "Êtes-vous au courant des nouveaux fournisseurs ?", "desc": "Notre réseau autonome analyse chaque jour des milliers de points de données." }
        },
        "cta": "COMMENCER GRATUITEMENT MAINTENANT"
    },
    "de": {
        "title": "Entdecken Sie das System.",
        "subtitle": "Vergessen Sie traditionelle Beschaffungsprozesse. Verwandeln Sie Ihre Lieferkette mit dem AIP-103+ Protokoll in ein autonomes Betriebssystem.",
        "guide": "UNTERNEHMENSLEITFADEN v2.0",
        "usageGuide": "Benutzerhandbuch",
        "backToHome": "STARTBILDSCHIRM",
        "simulator": {
            "badge": "Live-Simulator (v2.0)",
            "title": "Multi-Lieferanten-Management-Simulation",
            "desc": "Erleben Sie den Prozess des gleichzeitigen Versendens von Angebotsanfragen an mehrere Unternehmen.",
            "searchPlaceholder": "Was möchten Sie beschaffen? (z.B. Lager)",
            "locationPlaceholder": "Standortfilter",
            "searchButton": "GLOBALE SUCHE",
            "searching": "SUCHE LÄUFT...",
            "exampleScenario": "Beispielszenario Starten",
            "scanning": "AIP-103 Protokoll: Globales Netzwerk wird gescannt...",
            "matchedSuppliers": "AUTONOM ABGEGLICHENE LIEFERANTEN ({count})",
            "selectFirms": "Bitte wählen Sie die Firmen aus ({count} Ausgewählt)",
            "supplierCard": { "match": "Abgleich", "speed": "Tempo", "score": "Score" },
            "form": {
                "badge": "CONCURRENT RFQ MODE",
                "title": "SAMMELBESTELLANFRAGE",
                "desc": "Wird gleichzeitig an {count} ausgewählte Lieferanten gesendet.",
                "docGroup": "DOKUMENTENGRUPPE",
                "details": "Bedarfsdetails",
                "quantity": "Menge",
                "currency": "Währung",
                "incoterm": "Lieferbedingung (Incoterm)",
                "targetLocation": "Zielstandort",
                "validity": "Gültigkeit des Angebots",
                "submit": "ANFRAGE AN {count} FIRMEN SENDEN"
            },
            "success": {
                "title": "ANFRAGEN GESENDET",
                "desc": "Offizielle RFQ-Dokumente wurden in Sekundenschnelle über das AIP-103-Protokoll an {count} Lieferanten gesendet.",
                "register": "IM SYSTEM REGISTRIEREN",
                "newSimulation": "NEUE SIMULATION STARTEN"
            }
        },
        "dashboard": {
            "title": "PROFESSIONELLES OPERATIONSPANEL",
            "subtitle": "Unternehmensmanagement-Module, die nach dem Login auf Sie warten.",
            "ops": { "title": "OPERATIONSZENTRUM", "desc": "Verwalten Sie alle aktiven RFQ-Prozesse über einen einzigen Bildschirm.", "f1": "Preisvergleich", "f2": "Gegenangebot", "f3": "Kaufgenehmigung" },
            "log": { "title": "LOGISTIK-TRACKING", "desc": "Verfolgen Sie den gesamten Prozess von der Produktion bis zur Lieferung.", "f1": "Versanddetails", "f2": "Rechnungsverfolgung", "f3": "Lieferbestätigung" },
            "team": { "title": "TEAM-MANAGEMENT", "desc": "Definieren und verwalten Sie Ihre Unternehmenshierarchie im System.", "f1": "Genehmigungslimits", "f2": "Autoritätsdefinition", "f3": "Abteilungsberichte" },
            "erp": { "title": "ERP-INTEGRATION", "desc": "Vollständige Integration mit SAP, Oracle und MS Dynamics.", "f1": "Automatische Lagerbuchung", "f2": "API-Integration", "f3": "Geplante Synchronisation" }
        },
        "steps": {
            "step1": { "title": "Intelligente Suche & Entdeckung", "desc": "Schreiben Sie Ihren Bedarf einfach dank unserer Engine für natürliche Sprache." },
            "step2": { "title": "Autonome RFQ-Erstellung", "desc": "Das System analysiert automatisch die technischen Details Ihrer Anfrage." },
            "step3": { "title": "Echtzeit-Verhandlung", "desc": "Prüfen Sie Angebote von Lieferanten über ein einziges Panel." },
            "step4": { "title": "Sichere Genehmigung & Überwachung", "desc": "Genehmigen Sie das vereinbarte Angebot und verfolgen Sie es transparent." }
        },
        "questions": {
            "q1": { "title": "Gibt es Besseres als Ihre aktuellen Lieferanten?", "desc": "Unsere KI-Engine findet die verborgenen Riesen des globalen Marktes für Sie." },
            "q2": { "title": "Möchten Sie Marktpreise prüfen?", "desc": "Benchmarken Sie Ihre Kosten mit Echtzeitdaten." },
            "q3": { "title": "Kennen Sie neue Lieferanten?", "desc": "Unser autonomes Netzwerk analysiert täglich Tausende von Datenpunkten." }
        },
        "cta": "JETZT KOSTENLOS STARTEN"
    },
    "ru": {
        "title": "Откройте для себя систему.",
        "subtitle": "Забудьте о традиционных процессах закупок. Превратите свою цепочку поставок в автономную операционную систему с помощью протокола AIP-103+.",
        "guide": "КОРПОРАТИВНОЕ РУКОВОДСТВО v2.0",
        "usageGuide": "Руководство пользователя",
        "backToHome": "ГЛАВНЫЙ ЭКРАН",
        "simulator": {
            "badge": "Живой симулятор (v2.0)",
            "title": "Симуляция управления несколькими поставщиками",
            "desc": "Опыт одновременной отправки запросов котировок нескольким компаниям и автономного сопоставления.",
            "searchPlaceholder": "Что вы хотите закупить? (Например: Подшипники)",
            "locationPlaceholder": "Фильтр местоположения",
            "searchButton": "ГЛОБАЛЬНЫЙ ПОИСК",
            "searching": "ПОИСК...",
            "exampleScenario": "Запустить пример сценария",
            "scanning": "Протокол AIP-103: Сканирование глобальной сети...",
            "matchedSuppliers": "АВТОНОМНО ПОДОБРАННЫЕ ПОСТАВЩИКИ ({count})",
            "selectFirms": "Пожалуйста, выберите компании ({count} Выбрано)",
            "supplierCard": { "match": "Совпадение", "speed": "Скорость", "score": "Балл" },
            "form": {
                "badge": "РЕЖИМ ОДНОВРЕМЕННЫХ RFQ",
                "title": "ГРУППОВОЙ ЗАПРОС НА ЗАКУПКУ",
                "desc": "Будет отправлено одновременно {count} выбранным поставщикам.",
                "docGroup": "ГРУППА ДОКУМЕНТОВ",
                "details": "Детали потребности",
                "quantity": "Количество",
                "currency": "Валюта",
                "incoterm": "Условие поставки (Incoterm)",
                "targetLocation": "Целевое местоположение",
                "validity": "Срок действия предложения",
                "submit": "ОТПРАВИТЬ ЗАПРОС {count} КОМПАНИЯМ"
            },
            "success": {
                "title": "ЗАПРОСЫ ОТПРАВЛЕНЫ",
                "desc": "Официальные документы RFQ были отправлены {count} поставщикам через протокол AIP-103 за считанные секунды.",
                "register": "ЗАРЕГИСТРИРОВАТЬСЯ В СИСТЕМЕ",
                "newSimulation": "НАЧАТЬ НОВУЮ СИМУЛЯЦИЮ"
            }
        },
        "dashboard": {
            "title": "ПРОФЕССИОНАЛЬНАЯ ОПЕРАЦИОННАЯ ПАНЕЛЬ",
            "subtitle": "Модули корпоративного управления, ожидающие вас после входа в систему.",
            "ops": { "title": "ОПЕРАЦИОННЫЙ ЦЕНТР", "desc": "Управляйте всеми активными процессами RFQ с одного экрана.", "f1": "Сравнение цен", "f2": "Встречное предложение", "f3": "Одобрение закупки" },
            "log": { "title": "ЛОГИСТИЧЕСКИЙ ТРЕКИНГ", "desc": "Отслеживайте весь процесс от производства до доставки.", "f1": "Детали отгрузки", "f2": "Отслеживание инвойсов", "f3": "Подтверждение доставки" },
            "team": { "title": "УПРАВЛЕНИЕ КОМАНДОЙ", "desc": "Определяйте и управляйте иерархией вашей компании в системе.", "f1": "Лимиты одобрения", "f2": "Определение полномочий", "f3": "Отчеты по отделам" },
            "erp": { "title": "ИНТЕГРАЦИЯ ERP", "desc": "Полная интеграция с SAP, Oracle и MS Dynamics.", "f1": "Автоматический учет запасов", "f2": "Интеграция API", "f3": "Плановая синхронизация" }
        },
        "steps": {
            "step1": { "title": "Умный поиск и обнаружение", "desc": "Просто напишите о своей потребности благодаря нашему движку обработки естественного языка." },
            "step2": { "title": "Автономное создание RFQ", "desc": "При создании запроса система автоматически анализирует технические детали." },
            "step3": { "title": "Переговоры в реальном времени", "desc": "Изучайте предложения поставщиков на единой панели." },
            "step4": { "title": "Безопасное одобрение и мониторинг", "desc": "Одобряйте согласованное предложение и прозрачно отслеживайте его." }
        },
        "questions": {
            "q1": { "title": "Может ли быть лучше, чем ваши нынешние поставщики?", "desc": "Наш ИИ-движок найдет для вас скрытых гигантов мирового рынка." },
            "q2": { "title": "Хотите проверить рыночные цены?", "desc": "Сравнивайте свои затраты с данными в реальном времени." },
            "q3": { "title": "Знаете ли вы о новых поставщиках?", "desc": "Наша автономная сеть ежедневно анализирует тысячи точек данных." }
        },
        "cta": "НАЧНИТЕ БЕСПЛАТНО ПРЯМО СЕЙЧАС"
    },
    "zh": {
        "title": "探索系统。",
        "subtitle": "忘掉传统的采购流程。利用 AIP-103+ 协议将您的供应链转变为自主操作系统。",
        "guide": "企业指南 v2.0",
        "usageGuide": "使用指南",
        "backToHome": "主屏幕",
        "simulator": {
            "badge": "实时模拟器 (v2.0)",
            "title": "多供应商管理模拟",
            "desc": "体验同时向多家公司发送报价请求及自主匹配的过程。",
            "searchPlaceholder": "您想采购什么？（例如：轴承）",
            "locationPlaceholder": "位置筛选",
            "searchButton": "全球搜索",
            "searching": "正在搜索...",
            "exampleScenario": "启动示例场景",
            "scanning": "AIP-103 协议：正在扫描全球网络...",
            "matchedSuppliers": "自主匹配的供应商 ({count})",
            "selectFirms": "请选择您想接收报价的公司 ({count} 已选择)",
            "supplierCard": { "match": "匹配度", "speed": "速度", "score": "评分" },
            "form": {
                "badge": "并行 RFQ 模式",
                "title": "批量采购请求",
                "desc": "将同时发送给 {count} 家选定的供应商。",
                "docGroup": "文件组",
                "details": "需求详情",
                "quantity": "数量",
                "currency": "货币",
                "incoterm": "交付条款 (Incoterm)",
                "targetLocation": "目标位置",
                "validity": "报价有效期",
                "submit": "向 {count} 家公司发送报价请求"
            },
            "success": {
                "title": "请求已发送",
                "desc": "官方 RFQ 文件已通过 AIP-103 协议在几秒钟内发送给 {count} 家供应商。",
                "register": "注册系统",
                "newSimulation": "开始新模拟"
            }
        },
        "dashboard": {
            "title": "专业操作面板",
            "subtitle": "登录后等待您的企业管理模块。",
            "ops": { "title": "操作中心", "desc": "从单一屏幕管理所有活跃的 RFQ 流程。", "f1": "价格对比", "f2": "反向报价", "f3": "采购审批" },
            "log": { "title": "物流跟踪", "desc": "跟踪从生产到送货上门的整个过程。", "f1": "发货详情", "f2": "发票跟踪", "f3": "交付确认" },
            "team": { "title": "团队管理", "desc": "在系统中定义并管理您的公司层级。", "f1": "审批额度", "f2": "权限定义", "f3": "部门报告" },
            "erp": { "title": "ERP 集成", "desc": "与 SAP、Oracle 和 MS Dynamics 的全面集成。", "f1": "自动入库", "f2": "API 集成", "f3": "计划同步" }
        },
        "steps": {
            "step1": { "title": "智能搜索与发现", "desc": "得益于我们的自然语言处理引擎，只需写下您的需求。" },
            "step2": { "title": "自主 RFQ 创建", "desc": "创建请求时，系统会自动分析技术细节。" },
            "step3": { "title": "实时谈判", "desc": "从单一面板查看供应商的报价。" },
            "step4": { "title": "安全审批与监控", "desc": "批准商定的报价并透明地跟踪。" }
        },
        "questions": {
            "q1": { "title": "会有比您现在的供应商更好的吗？", "desc": "我们的 AI 引擎为您寻找全球市场中隐藏的巨头。" },
            "q2": { "title": "想查看市场价格吗？", "desc": "利用实时数据衡量您的成本。" },
            "q3": { "title": "您了解新供应商吗？", "desc": "我们的自主网络每天分析数千个数据点。" }
        },
        "cta": "立即免费开始"
    },
    "ja": {
        "title": "システムを探索する。",
        "subtitle": "従来の調達プロセスを忘れてください。AIP-103+プロトコルにより、サプライチェーンを自律的なオペレーティングシステムに変換します。",
        "guide": "企業ガイド v2.0",
        "usageGuide": "利用ガイド",
        "backToHome": "ホーム画面",
        "simulator": {
            "badge": "ライブシミュレーター (v2.0)",
            "title": "複数サプライヤー管理シミュレーション",
            "desc": "複数の企業に同時に見積依頼を送信し、自律的にマッチングするプロセスを体験してください。",
            "searchPlaceholder": "何を調達したいですか？（例：ベアリング）",
            "locationPlaceholder": "場所フィルター",
            "searchButton": "グローバル検索",
            "searching": "検索中...",
            "exampleScenario": "サンプルシナリオを開始",
            "scanning": "AIP-103 プロトコル: グローバルネットワークをスキャン中...",
            "matchedSuppliers": "自律マッチングされたサプライヤー ({count})",
            "selectFirms": "見積もりを受け取りたい企業を選択してください ({count} 選択済み)",
            "supplierCard": { "match": "一致度", "speed": "速度", "score": "スコア" },
            "form": {
                "badge": "並行 RFQ モード",
                "title": "一括購入リクエスト",
                "desc": "選択された {count} 社のサプライヤーに同時に送信されます。",
                "docGroup": "ドキュメントグループ",
                "details": "必要事項の詳細",
                "quantity": "数量",
                "currency": "通貨",
                "incoterm": "配送条件 (Incoterm)",
                "targetLocation": "配送先",
                "validity": "見積有効期限",
                "submit": "{count} 社に見積依頼を送信"
            },
            "success": {
                "title": "リクエスト送信完了",
                "desc": "公式な RFQ ドキュメントが AIP-103 プロトコルを介して数秒で {count} 社のサプライヤーに送信されました。",
                "register": "システムに登録する",
                "newSimulation": "新しいシミュレーションを開始"
            }
        },
        "dashboard": {
            "title": "プロフェッショナル操作パネル",
            "subtitle": "ログイン後に利用可能な企業管理モジュール。",
            "ops": { "title": "オペレーションセンター", "desc": "すべての有効な RFQ プロセスを単一の画面から管理します。", "f1": "価格比較", "f2": "カウンターオファー", "f3": "購入承認" },
            "log": { "title": "ロジスティクス追跡", "desc": "生産から玄関先までの全プロセスを追跡します。", "f1": "配送詳細", "f2": "請求書追跡", "f3": "配送確認" },
            "team": { "title": "チーム管理", "desc": "システム内で企業階層を定義し管理します。", "f1": "承認限度額", "f2": "権限定義", "f3": "部門レポート" },
            "erp": { "title": "ERP 統合", "desc": "SAP、Oracle、MS Dynamics との完全な統合。", "f1": "自動在庫登録", "f2": "API 統合", "f3": "スケジュール同期" }
        },
        "steps": {
            "step1": { "title": "スマート検索＆発見", "desc": "自然言語処理エンジンにより、ニーズを書き込むだけです。" },
            "step2": { "title": "自律的 RFQ 作成", "desc": "リクエストを作成すると、システムが自動的に技術的な詳細を分析します。" },
            "step3": { "title": "リアルタイム交渉", "desc": "サプライヤーからの見積もりを単一のパネルで確認します。" },
            "step4": { "title": "安全な承認＆監視", "desc": "合意した見積もりを承認し、透明性を持って追跡します。" }
        },
        "questions": {
            "q1": { "title": "現在のサプライヤーより優れた選択肢はありますか？", "desc": "AIエンジンがグローバル市場に隠れた巨人をあなたのために見つけます。" },
            "q2": { "title": "市場価格を確認したいですか？", "desc": "リアルタイムデータでコストをベンチマークします。" },
            "q3": { "title": "新しいサプライヤーをご存知ですか？", "desc": "自律ネットワークが毎日数千のデータポイントを分析します。" }
        },
        "cta": "今すぐ無料で開始"
    },
    "en": {
        "title": "Discover the System.",
        "subtitle": "Forget traditional procurement processes. Transform your supply chain into an autonomous operating system with the AIP-103+ protocol.",
        "guide": "CORPORATE GUIDE v2.0",
        "usageGuide": "User Guide",
        "backToHome": "HOME SCREEN",
        "simulator": {
            "badge": "Live Simulator (v2.0)",
            "title": "Multi-Supplier Management Simulation",
            "desc": "Experience the process of sending quote requests to multiple firms simultaneously and autonomous matching.",
            "searchPlaceholder": "What do you want to procure? (e.g., Bearings)",
            "locationPlaceholder": "Location Filter",
            "searchButton": "GLOBAL SEARCH",
            "searching": "SEARCHING...",
            "exampleScenario": "Start Example Scenario",
            "scanning": "AIP-103 Protocol: Scanning Global Network...",
            "matchedSuppliers": "AUTONOMOUS MATCHED SUPPLIERS ({count})",
            "selectFirms": "Please select the firms you want to receive quotes from ({count} Selected)",
            "supplierCard": { "match": "Match", "speed": "Speed", "score": "Score" },
            "form": {
                "badge": "CONCURRENT RFQ MODE",
                "title": "BULK PURCHASE REQUEST",
                "desc": "Will be sent to {count} selected suppliers simultaneously.",
                "docGroup": "DOCUMENT GROUP",
                "details": "Requirement Details",
                "quantity": "Quantity",
                "currency": "Currency",
                "incoterm": "Incoterm",
                "targetLocation": "Target Location",
                "validity": "Quote Validity Period",
                "submit": "SEND QUOTE REQUEST TO {count} FIRMS"
            },
            "success": {
                "title": "REQUESTS SENT",
                "desc": "Official RFQ documents and technical specifications were sent to {count} selected suppliers via the AIP-103 protocol in seconds.",
                "register": "REGISTER TO THE SYSTEM",
                "newSimulation": "START NEW SIMULATION"
            }
        },
        "dashboard": {
            "title": "PROFESSIONAL OPERATION PANEL",
            "subtitle": "Corporate management modules waiting for you when you log in.",
            "ops": { "title": "OPERATION CENTER", "desc": "Manage all your active RFQ processes from a single screen.", "f1": "Price Comparison", "f2": "Counter-Offer", "f3": "Purchase Approval" },
            "log": { "title": "LOGISTICS TRACKING", "desc": "Track your orders from production to delivery at your doorstep.", "f1": "Shipment Details", "f2": "Invoice Tracking", "f3": "Delivery Confirmation" },
            "team": { "title": "TEAM MANAGEMENT", "desc": "Define and manage your corporate hierarchy in the system.", "f1": "Approval Limits", "f2": "Authority Definition", "f3": "Department Reports" },
            "erp": { "title": "ERP INTEGRATION", "desc": "Full integration with SAP, Oracle, and MS Dynamics.", "f1": "Automatic Stock Entry", "f2": "API Integration", "f3": "Scheduled Sync" }
        },
        "steps": {
            "step1": { "title": "Smart Search & Discovery", "desc": "Simply write your needs thanks to our natural language processing engine." },
            "step2": { "title": "Autonomous RFQ Creation", "desc": "The system automatically analyzes technical details of your request." },
            "step3": { "title": "Real-Time Negotiation", "desc": "Review quotes from suppliers from a single panel." },
            "step4": { "title": "Secure Approval & Monitoring", "desc": "Approve the quote you agreed on and track it transparently." }
        },
        "questions": {
            "q1": { "title": "Could there be better than your current suppliers?", "desc": "Our AI engine finds hidden giants in the global market for you." },
            "q2": { "title": "Do you want to check market prices?", "desc": "Benchmark your costs with real-time data." },
            "q3": { "title": "Are you aware of new suppliers?", "desc": "Our autonomous network analyzes thousands of data points daily." }
        },
        "cta": "START FOR FREE NOW"
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    data.howItWorks = howItWorksData[lang] || howItWorksData["en"];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Re-localized howItWorks for ${lang}.json`);
}
