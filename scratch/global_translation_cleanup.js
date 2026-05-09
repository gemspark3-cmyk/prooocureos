const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const globalFixes = {
    "de": {
        "home": {
            "toasts": {
                "sendFailed": "Anfrage konnte nicht gesendet werden: {error}",
                "unknownError": "Ein unbekannter Fehler ist aufgetreten.",
                "bulkCounterSent": "Gegenangebot an {count} Lieferanten gesendet."
            }
        },
        "howItWorks": {
            "simulator": {
                "searchPlaceholder": "Suchen...",
                "locationPlaceholder": "Zielort"
            }
        }
    },
    "fr": {
        "home": {
            "toasts": {
                "sendFailed": "Échec de l'envoi de la demande: {error}",
                "unknownError": "Une erreur inconnue s'est produite.",
                "bulkCounterSent": "Contre-offre envoyée à {count} fournisseurs."
            }
        },
        "howItWorks": {
            "simulator": {
                "searchPlaceholder": "Rechercher...",
                "locationPlaceholder": "Destination"
            }
        }
    },
    "ru": {
        "home": {
            "toasts": {
                "sendFailed": "Не удалось отправить запрос: {error}",
                "unknownError": "Произошла неизвестная ошибка.",
                "bulkCounterSent": "Встречное предложение отправлено {count} поставщикам."
            }
        },
        "howItWorks": {
            "simulator": {
                "searchPlaceholder": "Поиск...",
                "locationPlaceholder": "Место назначения"
            }
        }
    },
    "ja": {
        "home": {
            "toasts": {
                "sendFailed": "リクエストの送信に失敗しました: {error}",
                "unknownError": "不明なエラーが発生しました。",
                "bulkCounterSent": "{count}件のサプライヤーに一括カウンターオファーを送信しました。"
            }
        },
        "howItWorks": {
            "simulator": {
                "searchPlaceholder": "検索...",
                "locationPlaceholder": "目的地"
            }
        }
    },
    "zh": {
        "home": {
            "toasts": {
                "sendFailed": "发送请求失败: {error}",
                "unknownError": "发生未知错误。",
                "bulkCounterSent": "已向 {count} 个供应商发送批量反报价。"
            }
        },
        "howItWorks": {
            "simulator": {
                "searchPlaceholder": "搜索...",
                "locationPlaceholder": "目的地"
            }
        }
    }
};

const langs = Object.keys(globalFixes);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge home.toasts
    if (globalFixes[lang].home && globalFixes[lang].home.toasts) {
        data.home = data.home || {};
        data.home.toasts = {
            ...data.home.toasts,
            ...globalFixes[lang].home.toasts
        };
    }
    
    // Merge howItWorks.simulator
    if (globalFixes[lang].howItWorks && globalFixes[lang].howItWorks.simulator) {
        data.howItWorks = data.howItWorks || {};
        data.howItWorks.simulator = {
            ...data.howItWorks.simulator,
            ...globalFixes[lang].howItWorks.simulator
        };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Cleaned up global translations for ${lang}.json`);
}
