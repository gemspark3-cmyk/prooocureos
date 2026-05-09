const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const trData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'tr.json'), 'utf8'));

// Helper to deep update object
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

// Translations Data
const fullTranslations = {
    "de": {
        "common": {
            "paginationTotal": "Gesamt {total} Datensätze",
            "paginationPage": "Seite {page}/{totalPages}",
            "notSpecified": "Nicht angegeben",
            "other": "Andere",
            "errorOccurred": "Ein Fehler ist aufgetreten.",
            "notifications": {
                "systemFlow": "System- & Betriebsablauf",
                "new": "NEU",
                "noNotifications": "Noch keine Benachrichtigungen",
                "markFailed": "Markierung fehlgeschlagen"
            }
        },
        "marketplace": {
            "warehouses": { "title": "Meine Lager", "mainCompanyAddress": "Hauptadresse" },
            "supplierCard": {
                "accessRestricted": "ZUGRIFF EINGESCHRÄNKT",
                "loginToSeeDetails": "Anmelden für Details",
                "loginButton": "ANMELDEN",
                "verified": "VERIFIZIERT",
                "scores": { "price": "PREIS", "speed": "TERMIN", "trust": "GÜVEN" },
                "protocolCategory": "PROTOKOLLKATEGORIE",
                "generalSupplier": "ALLGEMEINER LIEFERANT",
                "getQuote": "ANGEBOT EINHOLEN"
            },
            "comparison": {
                "title": "Firmenvergleich",
                "description": "{count} Firmen vergleichen.",
                "noSuppliers": "Keine Firmen gefunden.",
                "trustScore": "Vertrauensscore",
                "verification": "Verifizierung",
                "verified": "Verifiziert",
                "serviceRegions": "Dienstleistungsregionen",
                "removeFromList": "Entfernen",
                "bulkQuote": "Sammelangebot ({count})"
            }
        },
        "dashboard": {
            "messages": { "noDataToExport": "Keine Daten zum Exportieren." },
            "online": "ONLINE", "offline": "OFFLINE",
            "stats": {
                "pendingRequests": "AUSSTEHENDE ANFRAGEN",
                "noRequests": "Keine Anfragen",
                "active": "AKTIV",
                "start": "START",
                "savings": "EINSPARUNGEN",
                "avgResponse": "DURCHSCHN. ANTWORT",
                "responseTimeUnit": "Std",
                "spendingLimit": "Ausgabenlimit",
                "noLimit": "KEIN",
                "limitSet": "Limit",
                "limitNotSet": "Nicht festgelegt"
            },
            "export": {
                "id": "ID", "date": "DATUM", "title": "TITEL", "category": "KATEGORIE", "quantity": "MENGE",
                "status": "STATUS", "offersCount": "ANGEBOTE", "bestOffer": "BESTES ANGEBOT", "targetPrice": "ZIELPREIS",
                "savings": "EINSPARUNG (%)", "orderNo": "BESTELL-NR", "supplier": "LIEFERANT", "amount": "BETRAG",
                "deliveryAddress": "LIEFERADRESSE", "estDelivery": "LIEFERTERMIN", "trackingNo": "TRACKING-NR",
                "success": "Excel-Bericht erstellt.", "error": "Fehler beim Erstellen.",
                "shipmentModal": {
                    "title": "Versanddetails", "orderNo": "Bestellung: {no}", "currentStatus": "AKTUELLER STATUS",
                    "onWay": "UNTERWEGS", "shipmentType": "VERSANDART", "carrier": "SPEDITEUR", "trackingNo": "TRACKING-NR",
                    "estDelivery": "LIEFERTERMIN", "notes": "HINWEISE", "deliveryPoint": "LIEFERORT",
                    "defaultCompanyAddress": "STANDARD-ADRESSE", "sender": "ABSENDER", "close": "SCHLIESSEN",
                    "notSpecified": "Nicht angegeben", "noNotes": "Keine Hinweise.",
                    "types": {
                        "cargo": "Fracht", "logistics": "Logistik", "ownVehicle": "Eigenes Fahrzeug",
                        "customerPickup": "Abholung", "standard": "Standard"
                    }
                }
            },
            "profile": {
                "corporateAccount": "FIRMENKONTO", "aipVerified": "AIP-103 VERIFIZIERT",
                "sections": { "corporate": "Firma", "contact": "Kontakt", "financial": "Finanzen", "warehouse": "Lager" },
                "fields": {
                    "companyName": "Name", "website": "Website", "taxId": "USt-IdNr.", "taxOffice": "Finanzamt",
                    "tradeRegistry": "Handelsregister", "mersis": "MERSIS", "industry": "Branche", "employeeCount": "Mitarbeiter",
                    "establishmentYear": "Gründung", "fullAddress": "Adresse", "city": "Stadt", "country": "Land",
                    "postalCode": "PLZ", "contactPerson": "Kontakt", "phone": "Telefon", "approvalLimit": "Limit (USD)",
                    "preferredCurrency": "Währung", "warehouseName": "Lagername"
                },
                "placeholders": { "website": "https://...", "establishmentYear": "1995", "warehouseName": "Hauptlager", "city": "Berlin" },
                "buttons": { "addWarehouse": "LAGER HINZUFÜGEN", "cancel": "ABBRECHEN", "saveWarehouse": "LAGER SPEICHERN", "saveProfile": "PROFIL SPEICHERN", "saving": "SPEICHERN..." },
                "messages": { "fillRequired": "Bitte Felder ausfüllen.", "warehouseAdded": "Lager hinzugefügt.", "warehouseDeleted": "Lager gelöscht.", "confirmDelete": "Löschen bestätigen?", "noWarehouses": "Keine Lager.", "error": "Fehler." },
                "default": "STANDARD", "select": "Wählen"
            },
            "sourcing": {
                "steps": {
                    "form": {
                        "title": "ANFRAGE FÜR", "subtitle": "Was benötigen Sie?",
                        "descriptionSingle": "Details für den gewählten Lieferanten.", "descriptionMulti": "Suchen Sie im Netzwerk.",
                        "labels": { "title": "Beschreibung", "note": "Hinweis", "quantity": "Menge", "currency": "Währung", "paymentTerm": "Zahlung" },
                        "placeholders": { "title": "Z.B. 100 Rohre...", "note": "Hinweis...", "quantity": "Z.B. 500", "currency": "AED" },
                        "paymentTerms": { "cash": "Bar", "30days": "30 Tage", "60days": "60 Tage" },
                        "buttons": { "processing": "LÄDT...", "prepare": "VORBEREITEN", "listSuppliers": "LIEFERANTEN LISTE" }
                    },
                    "matches": {
                        "titleReady": "Bereit", "titleMatches": "Treffer", "descriptionSingle": "Bestätigen.", "descriptionMulti": "Gefunden.",
                        "back": "Zurück", "noSuppliers": "Keine Treffer.", "trustScore": "{score} VERTRAUEN", "officialRequest": "OFFIZIELLE ANFRAGE",
                        "docNo": "DOK-NR", "targetQuantity": "MENGE", "targetCurrency": "WÄHRUNG", "paymentTerm": "ZAHLUNG", "sendRequest": "SENDEN", "sending": "SENDET..."
                    },
                    "success": { "title": "Gesendet!", "message": "Anfrage erfolgreich übermittelt.", "backToMarketplace": "ZUM MARKTPLATZ", "viewMyRequests": "MEINE ANFRAGEN" }
                },
                "errors": { "selectSupplier": "Wählen Sie einen Lieferanten." },
                "address": { "change": "ÄNDERN", "mainCompany": "Hauptadresse" },
                "features": {
                    "global": { "title": "Global", "desc": "Weltweit suchen." },
                    "logistics": { "title": "Logistik", "desc": "Verifizierter Versand." },
                    "standard": { "title": "Standard", "desc": "Professionell." }
                }
            }
        },
        "footer": { "poweredBy": "Powered by AIP-103+", "joinAsSupplier": "Lieferant werden" },
        "errors": { "404": { "title": "Verloren?", "description": "Seite nicht gefunden.", "backHome": "ZURÜCK" } }
    },
    "fr": {
        "common": {
            "paginationTotal": "Total {total} enregistrements",
            "paginationPage": "Page {page}/{totalPages}",
            "notSpecified": "Non spécifié",
            "other": "Autre",
            "errorOccurred": "Une erreur est survenue.",
            "notifications": {
                "systemFlow": "Flux système",
                "new": "NOUVEAU",
                "noNotifications": "Pas de notifications",
                "markFailed": "Échec du marquage"
            }
        },
        "marketplace": {
            "warehouses": { "title": "Mes entrepôts", "mainCompanyAddress": "Adresse principale" },
            "supplierCard": {
                "accessRestricted": "ACCÈS RESTREINT",
                "loginToSeeDetails": "Connectez-vous pour les détails",
                "loginButton": "CONNEXION",
                "verified": "VÉRIFIÉ",
                "scores": { "price": "PRIX", "speed": "DÉLAI", "trust": "CONFIANCE" },
                "protocolCategory": "CATÉGORIE PROTOCOLE",
                "generalSupplier": "FOURNISSEUR GÉNÉRAL",
                "getQuote": "OBTENIR DEVIS"
            },
            "comparison": {
                "title": "Comparaison",
                "description": "Comparer {count} entreprises.",
                "noSuppliers": "Aucune entreprise trouvée.",
                "trustScore": "Score de confiance",
                "verification": "Vérification",
                "verified": "Vérifié",
                "serviceRegions": "Régions de service",
                "removeFromList": "Retirer",
                "bulkQuote": "Devis groupé ({count})"
            }
        },
        "dashboard": {
            "messages": { "noDataToExport": "Aucune donnée à exporter." },
            "online": "ACTIF", "offline": "INACTIF",
            "stats": {
                "pendingRequests": "DEMANDES EN ATTENTE",
                "noRequests": "Pas de demandes",
                "active": "ACTIF",
                "start": "DÉBUTER",
                "savings": "ÉCONOMIES",
                "avgResponse": "RÉPONSE MOY.",
                "responseTimeUnit": "Hrs",
                "spendingLimit": "Limite de dépense",
                "noLimit": "AUCUNE",
                "limitSet": "Limite",
                "limitNotSet": "Non définie"
            },
            "export": {
                "id": "ID", "date": "DATE", "title": "TITRE", "category": "CATÉGORIE", "quantity": "QUANTITÉ",
                "status": "STATUT", "offersCount": "OFFRES", "bestOffer": "MEILLEURE OFFRE", "targetPrice": "PRIX CIBLE",
                "savings": "ÉCONOMIE (%)", "orderNo": "COMMANDE NO", "supplier": "FOURNISSEUR", "amount": "MONTANT",
                "deliveryAddress": "ADRESSE LIVRAISON", "estDelivery": "LIVRAISON PRÉVUE", "trackingNo": "SUIVI NO",
                "success": "Rapport Excel créé.", "error": "Erreur lors de la création.",
                "shipmentModal": {
                    "title": "Détails d'expédition", "orderNo": "Commande: {no}", "currentStatus": "STATUT ACTUEL",
                    "onWay": "EN ROUTE", "shipmentType": "TYPE D'EXPÉDITION", "carrier": "TRANSPORTEUR", "trackingNo": "SUIVI NO",
                    "estDelivery": "LIVRAISON PRÉVUE", "notes": "NOTES", "deliveryPoint": "POINT DE LIVRAISON",
                    "defaultCompanyAddress": "ADRESSE PAR DÉFAUT", "sender": "EXPÉDITEUR", "close": "FERMER",
                    "notSpecified": "Non spécifié", "noNotes": "Pas de notes.",
                    "types": {
                        "cargo": "Fret", "logistics": "Logistique", "ownVehicle": "Véhicule propre",
                        "customerPickup": "Enlèvement client", "standard": "Standard"
                    }
                }
            },
            "profile": {
                "corporateAccount": "COMPTE ENTREPRISE", "aipVerified": "VÉRIFIÉ AIP-103",
                "sections": { "corporate": "Entreprise", "contact": "Contact", "financial": "Finance", "warehouse": "Entrepôt" },
                "fields": {
                    "companyName": "Nom", "website": "Site web", "taxId": "ID Fiscal", "taxOffice": "Bureau des impôts",
                    "tradeRegistry": "Registre du commerce", "mersis": "MERSIS", "industry": "Secteur", "employeeCount": "Employés",
                    "establishmentYear": "Fondation", "fullAddress": "Adresse", "city": "Ville", "country": "Pays",
                    "postalCode": "Code postal", "contactPerson": "Contact", "phone": "Téléphone", "approvalLimit": "Limite (USD)",
                    "preferredCurrency": "Devise", "warehouseName": "Nom d'entrepôt"
                },
                "placeholders": { "website": "https://...", "establishmentYear": "1995", "warehouseName": "Entrepôt principal", "city": "Paris" },
                "buttons": { "addWarehouse": "AJOUTER ENTREPÔT", "cancel": "ANNULER", "saveWarehouse": "ENREGISTRER", "saveProfile": "SAUVEGARDER PROFIL", "saving": "SAUVEGARDE..." },
                "messages": { "fillRequired": "Veuillez remplir les champs.", "warehouseAdded": "Entrepôt ajouté.", "warehouseDeleted": "Entrepôt supprimé.", "confirmDelete": "Confirmer la suppression ?", "noWarehouses": "Aucun entrepôt.", "error": "Erreur." },
                "default": "DÉFAUT", "select": "Choisir"
            },
            "sourcing": {
                "steps": {
                    "form": {
                        "title": "CRÉER DEMANDE POUR", "subtitle": "De quoi avez-vous besoin ?",
                        "descriptionSingle": "Détails pour le fournisseur choisi.", "descriptionMulti": "Chercher dans le réseau.",
                        "labels": { "title": "Description", "note": "Note", "quantity": "Quantité", "currency": "Devise", "paymentTerm": "Paiement" },
                        "placeholders": { "title": "Ex: 100 tubes...", "note": "Note...", "quantity": "Ex: 500", "currency": "AED" },
                        "paymentTerms": { "cash": "Espèces", "30days": "30 jours", "60days": "60 jours" },
                        "buttons": { "processing": "TRAITEMENT...", "prepare": "PRÉPARER", "listSuppliers": "LISTE FOURNISSEURS" }
                    },
                    "matches": {
                        "titleReady": "Prêt", "titleMatches": "Correspondances", "descriptionSingle": "Confirmer.", "descriptionMulti": "Trouvé.",
                        "back": "Retour", "noSuppliers": "Aucun match.", "trustScore": "CONFIANCE {score}", "officialRequest": "DEMANDE OFFICIELLE",
                        "docNo": "DOC NO", "targetQuantity": "QUANTITÉ", "targetCurrency": "DEVISE", "paymentTerm": "PAIEMENT", "sendRequest": "ENVOYER", "sending": "ENVOI..."
                    },
                    "success": { "title": "Envoyé !", "message": "Demande transmise avec succès.", "backToMarketplace": "AU MARKETPLACE", "viewMyRequests": "MES DEMANDES" }
                },
                "errors": { "selectSupplier": "Choisissez un fournisseur." },
                "address": { "change": "MODIFIER", "mainCompany": "Adresse principale" },
                "features": {
                    "global": { "title": "Global", "desc": "Recherche mondiale." },
                    "logistics": { "title": "Logistique", "desc": "Expédition vérifiée." },
                    "standard": { "title": "Standard", "desc": "Professionnel." }
                }
            }
        },
        "footer": { "poweredBy": "Propulsé par AIP-103+", "joinAsSupplier": "Devenir fournisseur" },
        "errors": { "404": { "title": "Perdu ?", "description": "Page non trouvée.", "backHome": "ACCUEIL" } }
    },
    "ru": {
        "common": {
            "paginationTotal": "Всего {total} записей", "paginationPage": "Страница {page}/{totalPages}",
            "notSpecified": "Не указано", "other": "Другое", "errorOccurred": "Произошла ошибка.",
            "notifications": { "systemFlow": "Системный поток", "new": "НОВЫЙ", "noNotifications": "Нет уведомлений", "markFailed": "Ошибка пометки" }
        },
        "marketplace": {
            "heroTitle": "Глобальное снабжение", "heroSubtitle": "Операционная система", "heroDescription": "Подключайтесь к тысячам производителей через базу ProcureOS.",
            "searchPlaceholder": "Товар или производитель...", "locationPlaceholder": "Место назначения", "searchButton": "ПОИСК", "allCategories": "ВСЕ КАТЕГОРИИ",
            "noResults": "Результатов не найдено.", "supplierNetworkTitle": "Сеть поставщиков ProcureOS", "supplierNetworkDescription": "Продавайте тысячи покупателям.",
            "startSellingNow": "НАЧАТЬ ПРОДАВАТЬ", "registerProductsText": "Вы производитель? Зарегистрируйтесь.",
            "selection": { "label": "ВЫБРАНО", "compare": "СРАВНИТЬ", "bulkQuote": "ЗАПРОСИТЬ ЦЕНУ" },
            "warehouses": { "title": "Мои склады", "mainCompanyAddress": "Главный адрес" },
            "supplierCard": {
                "accessRestricted": "ДОСТУП ОГРАНИЧЕН", "loginToSeeDetails": "Войдите для деталей", "loginButton": "ВОЙТИ", "verified": "ПРОВЕРЕНО",
                "scores": { "price": "ЦЕНА", "speed": "СРОК", "trust": "ДОВЕРИЕ" }, "protocolCategory": "КАТЕГОРИЯ", "generalSupplier": "ОБЩИЙ ПОСТАВЩИК", "getQuote": "УЗНАТЬ ЦЕНУ"
            },
            "comparison": {
                "title": "Сравнение фирм", "description": "Сравните {count} фирм.", "noSuppliers": "Фирмы не найдены.", "trustScore": "Рейтинг доверия",
                "verification": "Проверка", "verified": "Подтверждено", "serviceRegions": "Регионы обслуживания", "removeFromList": "Удалить", "bulkQuote": "Общий запрос ({count})"
            },
            "networkPulse": { "label": "ПУЛЬС ЭКОСИСТЕМЫ", "status": "АКТИВЕН", "statusValue": "ПОЛНАЯ МОЩНОСТЬ", "statusLabel": "СТАТУС СЕТИ", "suppliersCount": "{count} активных поставщиков" }
        },
        "dashboard": {
            "messages": { "noDataToExport": "Нет данных для экспорта." }, "online": "ОНЛАЙН", "offline": "ОФФЛАЙН",
            "stats": {
                "pendingRequests": "ОЖИДАЮЩИЕ ЗАПРОСЫ", "noRequests": "Запросов нет", "active": "АКТИВЕН", "start": "НАЧАТЬ",
                "savings": "СБЕРЕЖЕНИЯ", "avgResponse": "СРЕДНИЙ ОТВЕТ", "responseTimeUnit": "Час", "spendingLimit": "Лимит расходов",
                "noLimit": "НЕТ", "limitSet": "Лимит", "limitNotSet": "Не установлен"
            },
            "requests": {
                "title": "Активные запросы", "searchPlaceholder": "Поиск...", "report": "ОТЧЕТ", "emptyTitle": "Запросов нет",
                "emptyDescription": "Перейдите в маркетплейс.", "actionLabel": "В МАРКЕТПЛЕЙС", "offersReceived": "ПРЕДЛОЖЕНИЙ", "offersUnit": "ШТ",
                "statusOpen": "ОТКРЫТ", "statusCompleted": "ЗАВЕРШЕН"
            },
            "orders": {
                "title": "Отслеживание заказов", "searchPlaceholder": "Поиск...", "report": "ОТЧЕТ", "emptyTitle": "Заказов нет",
                "emptyDescription": "Заказы появятся здесь.", "actionLabel": "МОИ ЗАПРОСЫ", "unnamedRequest": "Безымянный запрос",
                "requestDetail": "Детали запроса", "totalAmount": "ИТОГО", "currentStatus": "ТЕКУЩИЙ СТАТУС", "negotiationHistory": "ИСТОРИЯ ПЕРЕГОВОРОВ",
                "initialOffer": "Первое предложение", "agreedPrice": "Договорная цена", "netGain": "Чистая выгода", "processCompleted": "ПРОЦЕСС ЗАВЕРШЕН",
                "initialPriceOrder": "ЗАКАЗ СОЗДАН ПО НАЧАЛЬНОЙ ЦЕНЕ", "shipmentDetail": "ДЕТАЛИ ДОСТАВКИ", "rateExperience": "ОЦЕНИТЬ",
                "deliveryAddress": "АДРЕС ДОСТАВКИ", "registeredAddress": "Зарегистрированный адрес..."
            },
            "status": { "pending": "Ожидание", "confirmed": "Подтверждено", "shipped": "Отправлено", "delivered": "Доставлено" },
            "fxTracking": "ОТСЛЕЖИВАНИЕ КУРСА", "team": { "title": "Управление командой", "roadmap": "План развития", "description": "Управляйте командой.", "multiUser": "МНОГОПОЛЬЗОВАТЕЛЬСКИЙ", "workflows": "РАБОЧИЕ ПРОЦЕССЫ" },
            "integrations": { "title": "Интеграция ERP", "roadmap": "Расширение", "description": "Синхронизация с SAP, Oracle." },
            "export": {
                "id": "ID", "date": "ДАТА", "title": "НАЗВАНИЕ", "category": "КАТЕГОРИЯ", "quantity": "КОЛ-ВО", "status": "СТАТУС",
                "offersCount": "ПРЕДЛОЖЕНИЙ", "bestOffer": "ЛУЧШЕЕ", "targetPrice": "ЦЕЛЬ", "savings": "ЭКОНОМИЯ (%)", "orderNo": "ЗАКАЗ №",
                "supplier": "ПОСТАВЩИК", "amount": "СУММА", "deliveryAddress": "АДРЕС", "estDelivery": "СРОК", "trackingNo": "ТРЕКИНГ",
                "success": "Отчет Excel создан.", "error": "Ошибка создания.",
                "shipmentModal": {
                    "title": "Детали доставки", "orderNo": "Заказ: {no}", "currentStatus": "СТАТУС", "onWay": "В ПУТИ", "shipmentType": "ТИП",
                    "carrier": "ПЕРЕВОЗЧИК", "trackingNo": "ТРЕКИНГ", "estDelivery": "СРОК", "notes": "ЗАМЕТКИ", "deliveryPoint": "ПУНКТ",
                    "defaultCompanyAddress": "ОСНОВНОЙ АДРЕС", "sender": "ОТПРАВИТЕЛЬ", "close": "ЗАКРЫТЬ", "notSpecified": "Не указано", "noNotes": "Нет заметок.",
                    "types": { "cargo": "Груз", "logistics": "Логистика", "ownVehicle": "Свой транспорт", "customerPickup": "Самовывоз", "standard": "Стандарт" }
                }
            },
            "profile": {
                "corporateAccount": "КОРПОРАТИВНЫЙ АККАУНТ", "aipVerified": "ПРОВЕРЕНО AIP-103",
                "sections": { "corporate": "Компания", "contact": "Контакты", "financial": "Финансы", "warehouse": "Склады" },
                "fields": {
                    "companyName": "Название", "website": "Сайт", "taxId": "ИНН", "taxOffice": "Налоговая", "tradeRegistry": "Рег. номер", "mersis": "MERSIS",
                    "industry": "Отрасль", "employeeCount": "Сотрудники", "establishmentYear": "Основание", "fullAddress": "Адрес", "city": "Город",
                    "country": "Страна", "postalCode": "Индекс", "contactPerson": "Контакт", "phone": "Телефон", "approvalLimit": "Лимит (USD)",
                    "preferredCurrency": "Валюта", "warehouseName": "Имя склада"
                },
                "placeholders": { "website": "https://...", "establishmentYear": "1995", "warehouseName": "Главный склад", "city": "Москва" },
                "buttons": { "addWarehouse": "ДОБАВИТЬ СКЛАД", "cancel": "ОТМЕНА", "saveWarehouse": "СОХРАНИТЬ СКЛАД", "saveProfile": "СОХРАНИТЬ ПРОФИЛЬ", "saving": "СОХРАНЕНИЕ..." },
                "messages": { "fillRequired": "Заполните поля.", "warehouseAdded": "Склад добавлен.", "warehouseDeleted": "Склад удален.", "confirmDelete": "Удалить?", "noWarehouses": "Нет складов.", "error": "Ошибка." },
                "default": "ПО УМОЛЧАНИЮ", "select": "Выбрать"
            },
            "suppliers": { "title": "Поставщики", "subtitle": "Избранные", "searchPlaceholder": "Поиск...", "emptyState": "Нет поставщиков", "removed": "Удалено.", "error": "Ошибка.", "trustedPartner": "НАДЕЖНЫЙ ПАРТНЕР", "generalSupplier": "Общий поставщик" },
            "support": {
                "title": "Поддержка", "active": "АКТИВНЫЕ", "archived": "АРХИВ", "connecting": "Подключение...", "emptyStateActive": "Нет запросов.",
                "status": { "open": "ОТКРЫТ", "inProgress": "В РАБОТЕ", "resolved": "РЕШЕНО", "closed": "ЗАКРЫТО" },
                "createForm": { "title": "Новый тикет", "subtitle": "Детали", "subject": "ТЕМА", "category": "КАТЕГОРИЯ", "message": "СООБЩЕНИЕ", "submit": "ОТПРАВИТЬ", "categories": { "general": "Общее", "technical": "Техническое", "billing": "Оплата", "product": "Товар" } },
                "chat": { "supportTeam": "Поддержка ProcureOS", "placeholder": "Текст...", "closeTicket": "ЗАКРЫТЬ", "priority": "{priority} ПРИОРИТЕТ", "confirmClose": "Закрыть тикет?", "closedByUser": "Закрыто пользователем" },
                "main": { "title": "Служба поддержки", "description": "Помощь 24/7.", "newRequest": "НОВЫЙ ЗАПРОС" },
                "messages": { "created": "Тикет создан.", "error": "Ошибка.", "closed": "Тикет закрыт.", "sendError": "Ошибка отправки." }
            },
            "sourcing": {
                "steps": {
                    "form": {
                        "title": "СОЗДАТЬ ЗАПРОС", "subtitle": "Что нужно?", "descriptionSingle": "Детали.", "descriptionMulti": "Поиск по сети.",
                        "labels": { "title": "Описание", "note": "Заметка", "quantity": "Кол-во", "currency": "Валюта", "paymentTerm": "Оплата" },
                        "placeholders": { "title": "Напр. 100 труб...", "note": "Заметка...", "quantity": "Напр. 500", "currency": "AED" },
                        "paymentTerms": { "cash": "Наличные", "30days": "30 дней", "60days": "60 дней" },
                        "buttons": { "processing": "ЗАГРУЗКА...", "prepare": "ПОДГОТОВИТЬ", "listSuppliers": "СПИСОК ПОСТАВЩИКОВ" }
                    },
                    "matches": {
                        "titleReady": "Готово", "titleMatches": "Матчи", "descriptionSingle": "Подтвердить.", "descriptionMulti": "Найдено.",
                        "back": "Назад", "noSuppliers": "Нет совпадений.", "trustScore": "ДОВЕРИЕ {score}", "officialRequest": "ОФИЦИАЛЬНЫЙ ЗАПРОС",
                        "docNo": "ДОК №", "targetQuantity": "КОЛ-ВО", "targetCurrency": "ВАЛЮТА", "paymentTerm": "ОПЛАТА", "sendRequest": "ОТПРАВИТЬ", "sending": "ОТПРАВКА..."
                    },
                    "success": { "title": "Отправлено!", "message": "Запрос передан.", "backToMarketplace": "В МАРКЕТПЛЕЙС", "viewMyRequests": "МОИ ЗАПРОСЫ" }
                },
                "errors": { "selectSupplier": "Выберите поставщика." },
                "address": { "change": "ИЗМЕНИТЬ", "mainCompany": "Главный адрес" },
                "features": { "global": { "title": "Глобальный", "desc": "Весь мир." }, "logistics": { "title": "Логистика", "desc": "Доставка." }, "standard": { "title": "Стандарт", "desc": "Профи." } }
            }
        },
        "footer": { "poweredBy": "На базе AIP-103+", "joinAsSupplier": "Стать поставщиком" },
        "errors": { "404": { "title": "Потерялись?", "description": "Страница не найдена.", "backHome": "НА ГЛАВНУЮ" } }
    },
    "ja": {
        "home": { "protocolNotes": "プロトコルノート", "defaults": { "paymentTerm": "現金", "supplier": "サプライヤー" }, "toasts": { "loginRequired": "ログインが必要です。", "searchFailed": "検索に失敗しました。", "profileUpdated": "プロフィールが更新されました。", "requestSent": "依頼が送信されました。", "offerAccepted": "オファーが受理されました。" } },
        "common": {
            "title": "ProcureOS", "buyerPortal": "バイヤーポータル", "howItWorks": "利用方法", "myPanel": "マイパネル", "myAccount": "マイアカウント", "logout": "ログアウト", "login": "ログイン", "register": "新規登録",
            "allRightsReserved": "全著作権所有。", "isSeller": "販売者ですか？", "allCategories": "全カテゴリ", "logoutSuccess": "ログアウトしました。",
            "paginationTotal": "合計 {total} 件", "paginationPage": "ページ {page}/{totalPages}", "notSpecified": "未指定", "other": "その他", "errorOccurred": "エラーが発生しました。",
            "notifications": { "systemFlow": "システムフロー", "new": "新規", "noNotifications": "通知なし", "markFailed": "失敗" },
            "categories": { "all": "全カテゴリ", "Construction & Real Estate": "建設・不動産", "Industrial Machinery": "産業機械", "Raw Materials & Chemicals": "原材料・化学", "Automotive & Transport": "自動車・輸送", "Electronics & Electrical": "電子・電気", "Food & Agriculture": "食品・農業", "Textiles & Apparel": "繊維・アパレル", "Office & Stationery": "オフィス・文具", "Health & Medical": "ヘルスケア・医療", "Energy & Utilities": "エネルギー・公益", "Professional Services": "専門サービス", "General": "一般" },
            "statuses": { "preparing": "準備中", "shipped": "発送済み", "delivered": "配達済み", "warehouse": "倉庫内", "customs": "通関中", "local_delivery": "配送中", "completed": "完了" },
            "countries": { "TR": "トルコ", "US": "アメリカ", "DE": "ドイツ", "GB": "イギリス", "FR": "フランス", "CN": "中国", "JP": "日本" }
        },
        "marketplace": {
            "heroTitle": "グローバル供給の発見", "heroSubtitle": "オペレーティングシステム", "heroDescription": "ProcureOS Coreで数千のサプライヤーと接続。", "searchPlaceholder": "製品またはサプライヤー...", "locationPlaceholder": "目的地", "searchButton": "検索", "allCategories": "全カテゴリ", "noResults": "結果なし。",
            "selection": { "label": "選択済み", "compare": "比較", "bulkQuote": "一括見積" },
            "warehouses": { "title": "登録倉庫", "mainCompanyAddress": "本社住所" },
            "supplierCard": { "accessRestricted": "アクセス制限", "loginToSeeDetails": "詳細を表示するにはログイン", "loginButton": "ログイン", "verified": "認証済み", "scores": { "price": "価格", "speed": "スピード", "trust": "信頼" }, "protocolCategory": "カテゴリ", "generalSupplier": "一般サプライヤー", "getQuote": "見積依頼" }
        },
        "dashboard": {
            "sections": { "opsCenter": "運営センター", "logistics": "物流追跡", "team": "チーム管理", "erp": "ERP連携", "identity": "システムID" },
            "tabs": { "requests": "依頼", "orders": "注文", "mySuppliers": "取引先", "team": "チーム", "integrations": "連携", "support": "サポート", "profile": "プロフ" },
            "stats": { "pendingRequests": "待機中の依頼", "noRequests": "依頼なし", "active": "アクティブ", "start": "開始", "savings": "節約額", "avgResponse": "平均応答", "responseTimeUnit": "時間", "spendingLimit": "支出制限", "noLimit": "なし" },
            "requests": { "title": "アクティブな依頼", "searchPlaceholder": "検索...", "report": "レポート", "emptyTitle": "依頼なし", "actionLabel": "マーケットへ", "offersReceived": "オファー受信", "offersUnit": "件", "statusOpen": "公開中", "statusCompleted": "完了" },
            "orders": { "title": "注文・物流追跡", "searchPlaceholder": "検索...", "unnamedRequest": "名称未設定", "totalAmount": "総額", "currentStatus": "現在のステータス", "negotiationHistory": "交渉履歴", "initialOffer": "初回提示", "agreedPrice": "合意価格", "netGain": "純利益", "shipmentDetail": "配送詳細", "rateExperience": "評価", "deliveryAddress": "配送先" },
            "status": { "pending": "準備中", "confirmed": "確定", "shipped": "発送済み", "delivered": "配達済み" },
            "profile": { "sections": { "corporate": "企業情報", "contact": "連絡先", "financial": "財務設定", "warehouse": "倉庫管理" }, "buttons": { "saveProfile": "保存", "saving": "保存中..." } },
            "sourcing": { "steps": { "form": { "title": "依頼作成", "subtitle": "何が必要ですか？", "labels": { "title": "説明", "quantity": "数量", "currency": "通貨", "paymentTerm": "支払条件" }, "buttons": { "prepare": "準備", "listSuppliers": "サプライヤー一覧" } }, "success": { "title": "送信完了", "message": "依頼が送信されました。", "backToMarketplace": "マーケットへ", "viewMyRequests": "マイ依頼" } } }
        },
        "footer": { "poweredBy": "AIP-103+ 搭載", "joinAsSupplier": "サプライヤーとして登録" }
    },
    "zh": {
        "home": { "protocolNotes": "协议注释", "defaults": { "paymentTerm": "现金", "supplier": "供应商" }, "toasts": { "loginRequired": "请先登录。", "searchFailed": "搜索失败。", "profileUpdated": "个人资料已更新。", "requestSent": "请求已发送。", "offerAccepted": "报价已接受。" } },
        "common": {
            "title": "ProcureOS", "buyerPortal": "买家门户", "howItWorks": "运作方式", "myPanel": "我的面板", "myAccount": "我的账户", "logout": "登出", "login": "登录", "register": "注册",
            "allRightsReserved": "保留所有权利。", "isSeller": "您是卖家吗？", "allCategories": "所有类别", "logoutSuccess": "成功登出。",
            "paginationTotal": "共 {total} 条", "paginationPage": "第 {page}/{totalPages} 页", "notSpecified": "未指定", "other": "其他", "errorOccurred": "发生错误。",
            "notifications": { "systemFlow": "系统流", "new": "新", "noNotifications": "暂无通知", "markFailed": "失败" },
            "categories": { "all": "所有类别", "Construction & Real Estate": "建筑与房地产", "Industrial Machinery": "工业机械", "Raw Materials & Chemicals": "原材料与化学品", "Automotive & Transport": "汽车与运输", "Electronics & Electrical": "电子与电气", "Food & Agriculture": "食品与农业", "Textiles & Apparel": "纺织与服装", "Office & Stationery": "办公与文具", "Health & Medical": "健康与医疗", "Energy & Utilities": "能源与公用事业", "Professional Services": "专业服务", "General": "一般" },
            "statuses": { "preparing": "准备中", "shipped": "已发货", "delivered": "已送达", "warehouse": "在库", "customs": "清关中", "local_delivery": "本地派送", "completed": "已完成" },
            "countries": { "TR": "土耳其", "US": "美国", "DE": "德国", "GB": "英国", "FR": "法国", "CN": "中国", "JP": "日本" }
        },
        "marketplace": {
            "heroTitle": "探索全球供应", "heroSubtitle": "操作系统", "heroDescription": "通过 ProcureOS Core 连接数千家供应商。", "searchPlaceholder": "产品或供应商...", "locationPlaceholder": "目的地", "searchButton": "搜索", "allCategories": "所有类别", "noResults": "无结果。",
            "selection": { "label": "已选择", "compare": "对比", "bulkQuote": "批量询价" },
            "warehouses": { "title": "我的仓库", "mainCompanyAddress": "公司主地址" },
            "supplierCard": { "accessRestricted": "访问受限", "loginToSeeDetails": "登录查看详情", "loginButton": "登录", "verified": "已验证", "scores": { "price": "价格", "speed": "速度", "trust": "信任" }, "protocolCategory": "类别", "generalSupplier": "一般供应商", "getQuote": "获取报价" }
        },
        "dashboard": {
            "sections": { "opsCenter": "运营中心", "logistics": "物流追踪", "team": "团队管理", "erp": "ERP集成", "identity": "系统身份" },
            "tabs": { "requests": "请求", "orders": "订单", "mySuppliers": "供应商", "team": "团队", "integrations": "集成", "support": "支持", "profile": "资料" },
            "stats": { "pendingRequests": "待处理请求", "noRequests": "无请求", "active": "活动", "start": "开始", "savings": "节省额", "avgResponse": "平均响应", "responseTimeUnit": "小时", "spendingLimit": "支出限制", "noLimit": "无" },
            "requests": { "title": "活动采购请求", "searchPlaceholder": "搜索...", "report": "报告", "emptyTitle": "无请求", "actionLabel": "前往市场", "offersReceived": "收到报价", "offersUnit": "件", "statusOpen": "开启", "statusCompleted": "已完成" },
            "orders": { "title": "订单与追踪", "searchPlaceholder": "搜索...", "unnamedRequest": "未命名请求", "totalAmount": "总金额", "currentStatus": "当前状态", "negotiationHistory": "议价历史", "initialOffer": "初次报价", "agreedPrice": "成交价", "netGain": "净收益", "shipmentDetail": "物流详情", "rateExperience": "评价", "deliveryAddress": "收货地址" },
            "status": { "pending": "准备中", "confirmed": "已确认", "shipped": "已发货", "delivered": "已送达" },
            "profile": { "sections": { "corporate": "公司信息", "contact": "联系信息", "financial": "财务设置", "warehouse": "仓库管理" }, "buttons": { "saveProfile": "保存", "saving": "保存中..." } },
            "sourcing": { "steps": { "form": { "title": "创建请求", "subtitle": "您需要什么？", "labels": { "title": "描述", "quantity": "数量", "currency": "货币", "paymentTerm": "支付条款" }, "buttons": { "prepare": "准备", "listSuppliers": "列出供应商" } }, "success": { "title": "发送成功", "message": "请求已发送。", "backToMarketplace": "返回市场", "viewMyRequests": "查看我的请求" } } }
        },
        "footer": { "poweredBy": "由 AIP-103+ 驱动", "joinAsSupplier": "作为供应商加入" }
    }
};

for (const lang of ["de", "fr", "ru", "ja", "zh"]) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    deepUpdate(data, fullTranslations[lang]);
    
    // Fill remaining __MISSING__ with values from trData as fallback (if any left)
    function fillFinal(s, t) {
        for (const k in s) {
            if (typeof s[k] === 'object' && s[k] !== null && !Array.isArray(s[k])) {
                if (!t[k]) t[k] = {};
                fillFinal(s[k], t[k]);
            } else if (t[k] === "__MISSING__") {
                t[k] = s[k]; // Fallback to Turkish if still missing
            }
        }
    }
    fillFinal(trData, data);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`${lang}.json updated to 100% (with fallback where needed).`);
}
