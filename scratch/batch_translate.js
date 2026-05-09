const fs = require('fs');
const path = require('path');

const translations = {
    "de": {
        "common.notifications.systemFlow": "System- & Betriebsablauf",
        "common.notifications.new": "NEU",
        "common.notifications.noNotifications": "Noch keine Benachrichtigungen",
        "common.notifications.markFailed": "Markierung fehlgeschlagen",
        "marketplace.networkPulse.suppliersCount": "{count} aktive Lieferanten",
        "marketplace.warehouses.title": "Meine registrierten Lager",
        "marketplace.warehouses.mainCompanyAddress": "Hauptgeschäftsadresse",
        "marketplace.supplierCard.accessRestricted": "PROTOKOLLZUGRIFF EINGESCHRÄNKT",
        "marketplace.supplierCard.loginToSeeDetails": "Anmelden für Details",
        "marketplace.supplierCard.loginButton": "ANMELDEN",
        "marketplace.supplierCard.verified": "VERIFIZIERT",
        "marketplace.supplierCard.scores.price": "PREIS",
        "marketplace.supplierCard.scores.speed": "GESCHWINDIGKEIT",
        "marketplace.supplierCard.scores.trust": "VERTRAUEN",
        "marketplace.supplierCard.protocolCategory": "PROTOKOLLKATEGORIE",
        "marketplace.supplierCard.generalSupplier": "ALLGEMEINER LIEFERANT",
        "marketplace.supplierCard.getQuote": "ANGEBOT EINHOLEN",
        "dashboard.stats.pendingRequests": "AUSSTEHENDE ANFRAGEN",
        "dashboard.stats.noRequests": "Keine Anfragen",
        "dashboard.stats.active": "AKTIV",
        "dashboard.stats.start": "START",
        "dashboard.stats.savings": "EINSPARUNGEN",
        "dashboard.stats.avgResponse": "DURCHSCHN. ANTWORT",
        "dashboard.stats.responseTimeUnit": "Std",
        "dashboard.stats.spendingLimit": "Ausgabenlimit",
        "dashboard.stats.noLimit": "KEIN",
        "dashboard.stats.limitSet": "Limit",
        "dashboard.stats.limitNotSet": "Nicht festgelegt",
        "dashboard.requests.title": "Aktive Einkaufsanfragen",
        "dashboard.requests.searchPlaceholder": "Suchen...",
        "dashboard.requests.report": "BERICHT",
        "dashboard.requests.emptyTitle": "Keine Anfragen",
        "dashboard.requests.emptyDescription": "Gehen Sie zum Marktplatz",
        "dashboard.requests.actionLabel": "ZUM MARKTPLATZ",
        "dashboard.requests.offersReceived": "ANGEBOTE",
        "dashboard.requests.offersUnit": "STK",
        "dashboard.requests.statusOpen": "OFFEN",
        "dashboard.requests.statusCompleted": "ERLEDIGT"
    },
    "fr": {
        "common.notifications.systemFlow": "Flux système et opérationnel",
        "common.notifications.new": "NOUVEAU",
        "common.notifications.noNotifications": "Pas de notifications",
        "common.notifications.markFailed": "Échec du marquage",
        "marketplace.networkPulse.suppliersCount": "{count} fournisseurs actifs",
        "marketplace.warehouses.title": "Mes entrepôts enregistrés",
        "marketplace.warehouses.mainCompanyAddress": "Adresse principale",
        "marketplace.supplierCard.accessRestricted": "ACCÈS PROTOCOLE RESTREINT",
        "marketplace.supplierCard.loginToSeeDetails": "Connectez-vous pour voir",
        "marketplace.supplierCard.loginButton": "CONNEXION",
        "marketplace.supplierCard.verified": "VÉRIFIÉ",
        "marketplace.supplierCard.scores.price": "PRIX",
        "marketplace.supplierCard.scores.speed": "VITESSE",
        "marketplace.supplierCard.scores.trust": "CONFIANCE",
        "marketplace.supplierCard.protocolCategory": "CATÉGORIE PROTOCOLE",
        "marketplace.supplierCard.generalSupplier": "FOURNISSEUR GÉNÉRAL",
        "marketplace.supplierCard.getQuote": "OBTENIR DEVIS",
        "dashboard.stats.pendingRequests": "DEMANDES EN ATTENTE",
        "dashboard.stats.noRequests": "Pas de demandes",
        "dashboard.stats.active": "ACTIF",
        "dashboard.stats.start": "DÉBUTER",
        "dashboard.stats.savings": "ÉCONOMIES",
        "dashboard.stats.avgResponse": "RÉPONSE MOYENNE",
        "dashboard.stats.responseTimeUnit": "Heures",
        "dashboard.stats.spendingLimit": "Limite de dépense",
        "dashboard.stats.noLimit": "AUCUNE",
        "dashboard.stats.limitSet": "Limite",
        "dashboard.stats.limitNotSet": "Non définie",
        "dashboard.requests.title": "Demandes d'achat actives",
        "dashboard.requests.searchPlaceholder": "Rechercher...",
        "dashboard.requests.report": "RAPPORT",
        "dashboard.requests.emptyTitle": "Pas de demandes",
        "dashboard.requests.emptyDescription": "Allez au marketplace",
        "dashboard.requests.actionLabel": "AU MARKETPLACE",
        "dashboard.requests.offersReceived": "OFFRES REÇUES",
        "dashboard.requests.offersUnit": "UNITÉS",
        "dashboard.requests.statusOpen": "OUVERT",
        "dashboard.requests.statusCompleted": "TERMINÉ"
    }
};

const messagesDir = path.join(process.cwd(), 'messages');

for (const lang in translations) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    for (const fullKey in translations[lang]) {
        const value = translations[lang][fullKey];
        const keys = fullKey.split('.');
        let current = data;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${lang}.json with batch translations.`);
}
