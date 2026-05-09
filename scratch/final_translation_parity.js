const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
    "de": {
        "home": {
            "protocolNotes": "AIP-103+ PROTOKOLL (RELEASE NOTES)",
            "toasts": {
                "loginRequired": "Bitte loggen Sie sich zuerst ein.",
                "searchFailed": "Suche fehlgeschlagen.",
                "invalidTaxId": "Ungültige Steuernummer. Bitte geben Sie 10 oder 11 Ziffern ein.",
                "invalidPhone": "Ungültige Telefonnummer.",
                "profileUpdated": "Profil erfolgreich aktualisiert.",
                "updateFailed": "Aktualisierung fehlgeschlagen.",
                "needRequestTitle": "Bitte geben Sie an, was Sie benötigen.",
                "noSuppliersFound": "Keine passenden Lieferanten gefunden.",
                "createIntentFailed": "Anfrage konnte nicht erstellt werden.",
                "needDeliveryAddress": "Bitte geben Sie eine Lieferadresse an.",
                "intentInfoNotFound": "Anfrageinformationen nicht gefunden. Bitte suchen Sie erneut.",
                "requestSent": "Anfrage erfolgreich gesendet.",
                "sendFailed": "Versand fehlgeschlagen: {error}",
                "unknownError": "Unbekannter Fehler",
                "offerAccepted": "Angebot erfolgreich angenommen!",
                "offerRejected": "Angebot abgelehnt.",
                "requestNotSelected": "Anfrage nicht ausgewählt.",
                "noActiveOffers": "Keine aktiven Angebote für Verhandlungen gefunden.",
                "bulkCounterSent": "Sammel-Gegenangebot an {count} Lieferanten gesendet.",
                "counterSent": "Gegenangebot gesendet.",
                "counterError": "Verhandlungsfehler.",
                "supplierAdded": "Lieferant zu Favoriten hinzugefügt."
            },
            "defaults": {
                "supplier": "Lieferant",
                "country": "Deutschland",
                "paymentTerm": "30 Tage Zahlungsziel"
            }
        },
        "common": {
            "logoutSuccess": "Erfolgreich abgemeldet.",
            "errorOccurred": "Ein Fehler ist aufgetreten."
        }
    },
    "fr": {
        "home": {
            "protocolNotes": "PROTOCOLE AIP-103+ (NOTES DE VERSION)",
            "toasts": {
                "loginRequired": "Veuillez vous connecter d'abord.",
                "searchFailed": "La recherche a échoué.",
                "invalidTaxId": "Numéro de TVA invalide. Veuillez saisir 10 ou 11 chiffres.",
                "invalidPhone": "Numéro de téléphone invalide.",
                "profileUpdated": "Profil mis à jour avec succès.",
                "updateFailed": "La mise à jour a échoué.",
                "needRequestTitle": "Veuillez préciser votre besoin.",
                "noSuppliersFound": "Aucun fournisseur trouvé.",
                "createIntentFailed": "Impossible de créer la demande.",
                "needDeliveryAddress": "Veuillez indiquer une adresse de livraison.",
                "intentInfoNotFound": "Informations de demande non trouvées. Veuillez rechercher à nouveau.",
                "requestSent": "Demande envoyée avec succès.",
                "sendFailed": "Échec de l'envoi : {error}",
                "unknownError": "Erreur inconnue",
                "offerAccepted": "Offre acceptée avec succès !",
                "offerRejected": "Offre rejetée.",
                "requestNotSelected": "Demande non sélectionnée.",
                "noActiveOffers": "Aucune offre active trouvée pour la négociation.",
                "bulkCounterSent": "Contre-offre groupée envoyée à {count} fournisseurs.",
                "counterSent": "Contre-offre envoyée.",
                "counterError": "Erreur de négociation.",
                "supplierAdded": "Fournisseur ajouté aux favoris."
            },
            "defaults": {
                "supplier": "Fournisseur",
                "country": "France",
                "paymentTerm": "Paiement à 30 jours"
            }
        },
        "common": {
            "logoutSuccess": "Déconnexion réussie.",
            "errorOccurred": "Une erreur est survenue."
        }
    },
    "ru": {
        "home": {
            "protocolNotes": "ПРОТОКОЛ AIP-103+ (ПРИМЕЧАНИЯ К ВЫПУСКУ)",
            "toasts": {
                "loginRequired": "Пожалуйста, сначала войдите в систему.",
                "searchFailed": "Поиск не удался.",
                "invalidTaxId": "Неверный ИНН. Пожалуйста, введите 10 или 11 цифр.",
                "invalidPhone": "Неверный номер телефона.",
                "profileUpdated": "Профиль успешно обновлен.",
                "updateFailed": "Обновление не удалось.",
                "needRequestTitle": "Пожалуйста, укажите, что вам нужно.",
                "noSuppliersFound": "Подходящие поставщики не найдены.",
                "createIntentFailed": "Не удалось создать запрос.",
                "needDeliveryAddress": "Пожалуйста, укажите адрес доставки.",
                "intentInfoNotFound": "Информация о запросе не найдена. Пожалуйста, повторите поиск.",
                "requestSent": "Запрос успешно отправлен.",
                "sendFailed": "Ошибка отправки: {error}",
                "unknownError": "Неизвестная ошибка",
                "offerAccepted": "Предложение успешно принято!",
                "offerRejected": "Предложение отклонено.",
                "requestNotSelected": "Запрос не выбран.",
                "noActiveOffers": "Активных предложений для переговоров не найдено.",
                "bulkCounterSent": "Групповое встречное предложение отправлено {count} поставщикам.",
                "counterSent": "Встречное предложение отправлено.",
                "counterError": "Ошибка переговоров.",
                "supplierAdded": "Поставщик добавлен в избранное."
            },
            "defaults": {
                "supplier": "Поставщик",
                "country": "Россия",
                "paymentTerm": "Оплата через 30 дней"
            }
        },
        "common": {
            "logoutSuccess": "Вы успешно вышли из системы.",
            "errorOccurred": "Произошла ошибка."
        }
    },
    "ja": {
        "home": {
            "protocolNotes": "AIP-103+ プロトコル (リリースノート)",
            "toasts": {
                "loginRequired": "まずログインしてください。",
                "searchFailed": "検索に失敗しました。",
                "invalidTaxId": "無効な納税者番号です。10桁または11桁の数字を入力してください。",
                "invalidPhone": "無効な電話番号です。",
                "profileUpdated": "プロフィールが正常に更新されました。",
                "updateFailed": "更新に失敗しました。",
                "needRequestTitle": "必要なものを指定してください。",
                "noSuppliersFound": "適切なサプライヤーが見つかりませんでした。",
                "createIntentFailed": "リクエストを作成できませんでした。",
                "needDeliveryAddress": "配送先住所を指定してください。",
                "intentInfoNotFound": "リクエスト情報が見つかりませんでした。再度検索してください。",
                "requestSent": "リクエストが正常に送信されました。",
                "sendFailed": "送信失敗: {error}",
                "unknownError": "不明なエラー",
                "offerAccepted": "オファーが正常に承認されました！",
                "offerRejected": "オファーが拒否されました。",
                "requestNotSelected": "リクエストが選択されていません。",
                "noActiveOffers": "交渉可能なアクティブなオファーが見つかりませんでした。",
                "bulkCounterSent": "{count}件のサプライヤーに一括カウンターオファーを送信しました。",
                "counterSent": "カウンターオファーが送信されました。",
                "counterError": "交渉エラー。",
                "supplierAdded": "サプライヤーがお気に入りに追加されました。"
            },
            "defaults": {
                "supplier": "サプライヤー",
                "country": "日本",
                "paymentTerm": "30日以内支払い"
            }
        },
        "common": {
            "logoutSuccess": "ログアウトしました。",
            "errorOccurred": "エラーが発生しました。"
        }
    },
    "zh": {
        "home": {
            "protocolNotes": "AIP-103+ 协议 (发行说明)",
            "toasts": {
                "loginRequired": "请先登录。",
                "searchFailed": "搜索失败。",
                "invalidTaxId": "税号无效。请输入 10 或 11 位数字。",
                "invalidPhone": "电话号码无效。",
                "profileUpdated": "配置文件更新成功。",
                "updateFailed": "更新失败。",
                "needRequestTitle": "请指定您的需求。",
                "noSuppliersFound": "未找到合适的供应商。",
                "createIntentFailed": "无法创建请求。",
                "needDeliveryAddress": "请指定送货地址。",
                "intentInfoNotFound": "未找到请求信息。请重新搜索。",
                "requestSent": "请求已成功发送。",
                "sendFailed": "发送失败: {error}",
                "unknownError": "未知错误",
                "offerAccepted": "成功接受报价！",
                "offerRejected": "已拒绝报价。",
                "requestNotSelected": "未选择请求。",
                "noActiveOffers": "未找到可协商的活动报价。",
                "bulkCounterSent": "已向 {count} 个供应商发送批量反报价。",
                "counterSent": "反报价已发送。",
                "counterError": "协商错误。",
                "supplierAdded": "供应商已添加到收藏夹。"
            },
            "defaults": {
                "supplier": "供应商",
                "country": "中国",
                "paymentTerm": "30天付款期"
            }
        },
        "common": {
            "logoutSuccess": "注销成功。",
            "errorOccurred": "发生错误。"
        }
    }
};

const langs = Object.keys(translations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep merge home
    if (translations[lang].home) {
        data.home = {
            ...data.home,
            ...translations[lang].home
        };
    }
    
    // Deep merge common
    if (translations[lang].common) {
        data.common = {
            ...data.common,
            ...translations[lang].common
        };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Final deep fix for ${lang}.json (Home & Common)`);
}
