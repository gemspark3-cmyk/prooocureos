const fs = require('fs');
const path = require('path');

const translations = {
    "de": {
        "dashboard.sourcing.steps.form.title": "ANFRAGE ERSTELLEN FÜR",
        "dashboard.sourcing.steps.form.subtitle": "Was benötigen Sie? Wir finden es für Sie.",
        "dashboard.sourcing.steps.form.labels.title": "Produkt- oder Dienstleistungsbeschreibung",
        "dashboard.sourcing.steps.form.labels.quantity": "Benötigte Menge",
        "dashboard.sourcing.steps.form.labels.currency": "Währung",
        "dashboard.sourcing.steps.form.labels.paymentTerm": "Zahlungsbedingungen",
        "dashboard.sourcing.steps.form.placeholders.title": "Z.B.: 100 Stück 5 Meter lange Metallrohre...",
        "dashboard.sourcing.steps.form.buttons.prepare": "ANFRAGE VORBEREITEN",
        "dashboard.sourcing.steps.matches.title": "GEEIGNETE LIEFERANTEN GEFUNDEN",
        "dashboard.sourcing.steps.matches.sendRequest": "ANFRAGE AN ALLE SENDEN",
        "dashboard.sourcing.steps.success.title": "Anfrage erfolgreich gesendet!",
        "dashboard.sourcing.steps.success.message": "Ihre Anfrage wurde an die ausgewählten Lieferanten weitergeleitet. Sie werden benachrichtigt, sobald Angebote eingehen.",
        "dashboard.sourcing.steps.success.backToMarketplace": "ZURÜCK ZUM MARKTPLATZ"
    },
    "fr": {
        "dashboard.sourcing.steps.form.title": "CRÉER UNE DEMANDE POUR",
        "dashboard.sourcing.steps.form.subtitle": "De quoi avez-vous besoin ? Nous le trouverons pour vous.",
        "dashboard.sourcing.steps.form.labels.title": "Description du produit ou service",
        "dashboard.sourcing.steps.form.labels.quantity": "Quantité requise",
        "dashboard.sourcing.steps.form.labels.currency": "Devise",
        "dashboard.sourcing.steps.form.labels.paymentTerm": "Conditions de paiement",
        "dashboard.sourcing.steps.form.placeholders.title": "Ex: 100 tubes métalliques de 5 mètres...",
        "dashboard.sourcing.steps.form.buttons.prepare": "PRÉPARER LA DEMANDE",
        "dashboard.sourcing.steps.matches.title": "FOURNISSEURS CORRESPONDANTS TROUVÉS",
        "dashboard.sourcing.steps.matches.sendRequest": "ENVOYER LA DEMANDE À TOUS",
        "dashboard.sourcing.steps.success.title": "Demande envoyée avec succès !",
        "dashboard.sourcing.steps.success.message": "Votre demande a été transmise aux fournisseurs sélectionnés. Vous serez averti dès que les offres arriveront.",
        "dashboard.sourcing.steps.success.backToMarketplace": "RETOUR AU MARKETPLACE"
    },
    "ru": {
        "dashboard.sourcing.steps.form.title": "СОЗДАТЬ ЗАПРОС ДЛЯ",
        "dashboard.sourcing.steps.form.subtitle": "Что вам нужно? Мы найдем это для вас.",
        "dashboard.sourcing.steps.form.labels.title": "Описание товара или услуги",
        "dashboard.sourcing.steps.form.labels.quantity": "Необходимое количество",
        "dashboard.sourcing.steps.form.labels.currency": "Валюта",
        "dashboard.sourcing.steps.form.labels.paymentTerm": "Условия оплаты",
        "dashboard.sourcing.steps.form.placeholders.title": "Напр.: 100 шт. металлических труб длиной 5 метров...",
        "dashboard.sourcing.steps.form.buttons.prepare": "ПОДГОТОВИТЬ ЗАПРОС",
        "dashboard.sourcing.steps.matches.title": "НАЙДЕНЫ ПОДХОДЯЩИЕ ПОСТАВЩИКИ",
        "dashboard.sourcing.steps.matches.sendRequest": "ОТПРАВИТЬ ЗАПРОС ВСЕМ",
        "dashboard.sourcing.steps.success.title": "Запрос успешно отправлен!",
        "dashboard.sourcing.steps.success.message": "Ваш запрос передан выбранным поставщикам. Вы получите уведомление при поступлении предложений.",
        "dashboard.sourcing.steps.success.backToMarketplace": "ВЕРНУТЬСЯ В МАРКЕТПЛЕЙС"
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
console.log('Batch update 4 (Sourcing Flow DE, FR, RU) completed.');
