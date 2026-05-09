const fs = require('fs');
const path = require('path');

const translations = {
    "de": {
        "dashboard.profile.sections.corporate": "Unternehmensinformationen",
        "dashboard.profile.sections.contact": "Kontaktinformationen",
        "dashboard.profile.sections.financial": "Finanzeinstellungen",
        "dashboard.profile.sections.warehouse": "Lagerverwaltung",
        "dashboard.profile.fields.companyName": "Offizieller Firmenname",
        "dashboard.profile.fields.website": "Firmenwebsite",
        "dashboard.profile.fields.taxId": "Steuernummer",
        "dashboard.profile.fields.taxOffice": "Finanzamt",
        "dashboard.profile.fields.tradeRegistry": "Handelsregisternummer",
        "dashboard.profile.fields.industry": "Branche",
        "dashboard.profile.fields.city": "Stadt",
        "dashboard.profile.fields.country": "Land",
        "dashboard.profile.fields.postalCode": "Postleitzahl",
        "dashboard.profile.fields.contactPerson": "Ansprechpartner",
        "dashboard.profile.fields.phone": "Telefon",
        "dashboard.profile.fields.preferredCurrency": "Währung",
        "dashboard.profile.buttons.saveProfile": "AKTUALISIERUNGEN SPEICHERN",
        "dashboard.profile.buttons.saving": "SPEICHERN...",
        "dashboard.suppliers.title": "Registrierte Lieferanten",
        "dashboard.suppliers.subtitle": "Favoriten und Partnerfirmen",
        "dashboard.suppliers.emptyState": "Noch keine registrierten Lieferanten",
        "dashboard.support.title": "Support-Center",
        "dashboard.support.main.newRequest": "NEUE ANFRAGE STARTEN",
        "dashboard.rating.title": "Lieferanten bewerten",
        "dashboard.rating.submit": "BEWERTUNG SENDEN"
    },
    "fr": {
        "dashboard.profile.sections.corporate": "Informations sur l'entreprise",
        "dashboard.profile.sections.contact": "Informations de contact",
        "dashboard.profile.sections.financial": "Paramètres financiers",
        "dashboard.profile.sections.warehouse": "Gestion d'entrepôt",
        "dashboard.profile.fields.companyName": "Nom officiel de l'entreprise",
        "dashboard.profile.fields.website": "Site web de l'entreprise",
        "dashboard.profile.fields.taxId": "Numéro d'identification fiscale",
        "dashboard.profile.fields.taxOffice": "Bureau des impôts",
        "dashboard.profile.fields.tradeRegistry": "Numéro de registre du commerce",
        "dashboard.profile.fields.industry": "Secteur d'activité",
        "dashboard.profile.fields.city": "Ville",
        "dashboard.profile.fields.country": "Pays",
        "dashboard.profile.fields.postalCode": "Code postal",
        "dashboard.profile.fields.contactPerson": "Personne de contact",
        "dashboard.profile.fields.phone": "Téléphone",
        "dashboard.profile.fields.preferredCurrency": "Devise",
        "dashboard.profile.buttons.saveProfile": "ENREGISTRER LES MISES À JOUR",
        "dashboard.profile.buttons.saving": "ENREGISTREMENT...",
        "dashboard.suppliers.title": "Fournisseurs enregistrés",
        "dashboard.suppliers.subtitle": "Entreprises favorites et partenaires",
        "dashboard.suppliers.emptyState": "Aucun fournisseur enregistré pour le moment",
        "dashboard.support.title": "Centre de support",
        "dashboard.support.main.newRequest": "LANCER UNE NOUVELLE DEMANDE",
        "dashboard.rating.title": "Évaluer le fournisseur",
        "dashboard.rating.submit": "ENVOYER L'ÉVALUATION"
    },
    "ru": {
        "dashboard.profile.sections.corporate": "Корпоративная информация",
        "dashboard.profile.sections.contact": "Контактная информация",
        "dashboard.profile.sections.financial": "Финансовые настройки",
        "dashboard.profile.sections.warehouse": "Управление складом",
        "dashboard.profile.fields.companyName": "Официальное название компании",
        "dashboard.profile.fields.website": "Сайт компании",
        "dashboard.profile.fields.taxId": "ИНН",
        "dashboard.profile.fields.taxOffice": "Налоговая инспекция",
        "dashboard.profile.fields.tradeRegistry": "Регистрационный номер",
        "dashboard.profile.fields.industry": "Отрасль",
        "dashboard.profile.fields.city": "Город",
        "dashboard.profile.fields.country": "Страна",
        "dashboard.profile.fields.postalCode": "Почтовый индекс",
        "dashboard.profile.fields.contactPerson": "Контактное лицо",
        "dashboard.profile.fields.phone": "Телефон",
        "dashboard.profile.fields.preferredCurrency": "Валюта",
        "dashboard.profile.buttons.saveProfile": "СОХРАНИТЬ ОБНОВЛЕНИЯ",
        "dashboard.profile.buttons.saving": "СОХРАНЕНИЕ...",
        "dashboard.suppliers.title": "Зарегистрированные поставщики",
        "dashboard.suppliers.subtitle": "Избранные и партнерские компании",
        "dashboard.suppliers.emptyState": "Пока нет зарегистрированных поставщиков",
        "dashboard.support.title": "Центр поддержки",
        "dashboard.support.main.newRequest": "СОЗДАТЬ НОВЫЙ ЗАПРОС",
        "dashboard.rating.title": "Оценить поставщика",
        "dashboard.rating.submit": "ОТПРАВИТЬ ОЦЕНКУ"
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
console.log('Batch update 3 (DE, FR, RU Profile/Suppliers/Support/Rating) completed.');
