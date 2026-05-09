const fs = require('fs');
const path = require('path');

const translations = {
    "de": {
        "dashboard.orders.unnamedRequest": "Unbenannte Anfrage",
        "dashboard.orders.requestDetail": "Anfragedetail",
        "dashboard.orders.totalAmount": "GESAMTBETRAG",
        "dashboard.orders.currentStatus": "AKTUELLER STATUS",
        "dashboard.orders.negotiationHistory": "VERHANDLUNGSVERLAUF",
        "dashboard.orders.initialOffer": "Erstangebot",
        "dashboard.orders.agreedPrice": "Vereinbart",
        "dashboard.orders.netGain": "Nettogewinn",
        "dashboard.orders.processCompleted": "PROZESS ABGESCHLOSSEN",
        "dashboard.orders.initialPriceOrder": "BESTELLUNG ZUM ERSTPREIS",
        "dashboard.orders.shipmentDetail": "VERSANDDETAIL",
        "dashboard.orders.rateExperience": "BEWERTEN",
        "dashboard.orders.deliveryAddress": "LIEFERADRESSE",
        "dashboard.orders.registeredAddress": "Registrierte Adresse",
        "dashboard.status.pending": "Ausstehend",
        "dashboard.status.confirmed": "Bestätigt",
        "dashboard.status.shipped": "Versandt",
        "dashboard.status.delivered": "Geliefert",
        "dashboard.fxTracking": "WÄHRUNGS-TRACKING",
        "dashboard.team.title": "Team-Management",
        "dashboard.team.roadmap": "Roadmap",
        "dashboard.team.description": "Verwalten Sie Ihr Team",
        "dashboard.team.multiUser": "MEHRBENUTZER",
        "dashboard.team.workflows": "WORKFLOWS"
    },
    "fr": {
        "dashboard.orders.unnamedRequest": "Demande sans nom",
        "dashboard.orders.requestDetail": "Détail de la demande",
        "dashboard.orders.totalAmount": "MONTANT TOTAL",
        "dashboard.orders.currentStatus": "STATUT ACTUEL",
        "dashboard.orders.negotiationHistory": "HISTORIQUE DE NÉGOCIATION",
        "dashboard.orders.initialOffer": "Offre initiale",
        "dashboard.orders.agreedPrice": "Prix convenu",
        "dashboard.orders.netGain": "Gain net",
        "dashboard.orders.processCompleted": "PROCESSUS TERMINÉ",
        "dashboard.orders.initialPriceOrder": "COMMANDE AU PRIX INITIAL",
        "dashboard.orders.shipmentDetail": "DÉTAIL D'EXPÉDITION",
        "dashboard.orders.rateExperience": "ÉVALUER",
        "dashboard.orders.deliveryAddress": "ADRESSE DE LIVRAISON",
        "dashboard.orders.registeredAddress": "Adresse enregistrée",
        "dashboard.status.pending": "En attente",
        "dashboard.status.confirmed": "Confirmé",
        "dashboard.status.shipped": "Expédié",
        "dashboard.status.delivered": "Livré",
        "dashboard.fxTracking": "SUIVI DES DEVISES",
        "dashboard.team.title": "Gestion d'équipe",
        "dashboard.team.roadmap": "Roadmap",
        "dashboard.team.description": "Gérez votre équipe",
        "dashboard.team.multiUser": "MULTI-UTILISATEUR",
        "dashboard.team.workflows": "FLUX DE TRAVAIL"
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
}
console.log('Batch update 2 completed.');
