const fs = require('fs');
const path = require('path');

const translations = {
    "de": {
        "home.protocolNotes": "PROTOKOLL-NOTIZEN",
        "home.defaults.paymentTerm": "Bar / Zahlung bei Lieferung",
        "home.defaults.supplier": "Lieferant",
        "home.toasts.loginRequired": "Sie müssen sich für diese Aktion anmelden.",
        "home.toasts.searchFailed": "Fehler bei der Suche.",
        "home.toasts.invalidTaxId": "Gültige Steuernummer eingeben (10-11 Stellen).",
        "home.toasts.invalidPhone": "Gültige Telefonnummer eingeben.",
        "home.toasts.profileUpdated": "Profil erfolgreich aktualisiert.",
        "home.toasts.updateFailed": "Profil-Update fehlgeschlagen.",
        "home.toasts.needRequestTitle": "Geben Sie einen Titel für die Anfrage ein.",
        "home.toasts.noSuppliersFound": "Keine passenden Lieferanten gefunden.",
        "home.toasts.createIntentFailed": "Anfrageentwurf konnte nicht erstellt werden.",
        "home.toasts.needDeliveryAddress": "Lieferadresse wählen oder eingeben.",
        "home.toasts.intentInfoNotFound": "Anfrageinformationen nicht gefunden.",
        "home.toasts.requestSent": "Anfrage erfolgreich gesendet.",
        "home.toasts.offerAccepted": "Angebot angenommen.",
        "home.toasts.offerRejected": "Angebot abgelehnt.",
        "home.toasts.requestNotSelected": "Keine Anfrage ausgewählt.",
        "home.toasts.noActiveOffers": "Keine aktiven Angebote zum Verarbeiten.",
        "home.toasts.counterSent": "Gegenangebot gesendet.",
        "home.toasts.counterError": "Fehler beim Senden des Gegenangebots.",
        "home.toasts.supplierAdded": "Lieferant zu Ihrer Liste hinzugefügt."
    },
    "fr": {
        "home.protocolNotes": "NOTES DE PROTOCOLE",
        "home.defaults.paymentTerm": "Espèces / Paiement à la livraison",
        "home.defaults.supplier": "Fournisseur",
        "home.toasts.loginRequired": "Connexion requise pour cette action.",
        "home.toasts.searchFailed": "Erreur lors de la recherche.",
        "home.toasts.invalidTaxId": "Entrez un ID fiscal valide (10-11 chiffres).",
        "home.toasts.invalidPhone": "Entrez un numéro de téléphone valide.",
        "home.toasts.profileUpdated": "Profil mis à jour avec succès.",
        "home.toasts.updateFailed": "Échec de la mise à jour du profil.",
        "home.toasts.needRequestTitle": "Entrez un titre pour la demande.",
        "home.toasts.noSuppliersFound": "Aucun fournisseur trouvé.",
        "home.toasts.createIntentFailed": "Impossible de créer le brouillon.",
        "home.toasts.needDeliveryAddress": "Sélectionnez ou entrez une adresse.",
        "home.toasts.intentInfoNotFound": "Infos de demande introuvables.",
        "home.toasts.requestSent": "Demande envoyée avec succès.",
        "home.toasts.offerAccepted": "Offre acceptée.",
        "home.toasts.offerRejected": "Offre rejetée.",
        "home.toasts.requestNotSelected": "Aucune demande sélectionnée.",
        "home.toasts.noActiveOffers": "Pas d'offres actives.",
        "home.toasts.counterSent": "Contre-offre envoyée.",
        "home.toasts.counterError": "Erreur d'envoi de contre-offre.",
        "home.toasts.supplierAdded": "Fournisseur ajouté à votre liste."
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
console.log('Home translations update completed.');
