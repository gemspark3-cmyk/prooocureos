const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
    "de": {
        "dashboard": {
            "orders": {
                "title": "Versand- und Bestellverfolgung",
                "searchPlaceholder": "Suche nach Lieferantenname...",
                "report": "BERICHT",
                "emptyTitle": "Sie haben noch keine Bestellungen",
                "emptyDescription": "Wenn Sie eines der Angebote für Ihre Anfragen annehmen, erscheint Ihre Bestellung hier.",
                "actionLabel": "MEINE ANFRAGEN ANSEHEN"
            },
            "suppliers": {
                "searchPlaceholder": "Suche nach Lieferantenname..."
            },
            "stats": {
                "responseTimeUnit": "Std"
            }
        }
    },
    "fr": {
        "dashboard": {
            "orders": {
                "title": "Suivi des expéditions et des commandes",
                "searchPlaceholder": "Rechercher par nom de fournisseur...",
                "report": "RAPPORT",
                "emptyTitle": "Vous n'avez pas encore de commandes",
                "emptyDescription": "Lorsque vous approuvez l'une des offres reçues pour vos demandes, votre commande apparaîtra ici.",
                "actionLabel": "VOIR MES DEMANDES"
            },
            "suppliers": {
                "searchPlaceholder": "Rechercher par nom de fournisseur..."
            },
            "stats": {
                "responseTimeUnit": "Hrs"
            }
        }
    },
    "ru": {
        "dashboard": {
            "orders": {
                "title": "Отслеживание отгрузок и заказов",
                "searchPlaceholder": "Поиск по названию поставщика...",
                "report": "ОТЧЕТ",
                "emptyTitle": "У вас пока нет заказов",
                "emptyDescription": "Когда вы одобрите одно из предложений по вашим запросам, ваш заказ появится здесь.",
                "actionLabel": "ПОСМОТРЕТЬ МОИ ЗАПРОСЫ"
            },
            "suppliers": {
                "searchPlaceholder": "Поиск по названию поставщика..."
            },
            "stats": {
                "responseTimeUnit": "Ч"
            }
        }
    },
    "ja": {
        "dashboard": {
            "orders": {
                "title": "出荷および注文追跡",
                "searchPlaceholder": "サプライヤー名で検索...",
                "report": "レポート",
                "emptyTitle": "注文はまだありません",
                "emptyDescription": "リクエストに対して受け取ったオファーの1つを承認すると、ここに注文が表示されます。",
                "actionLabel": "リクエストを見る"
            },
            "suppliers": {
                "searchPlaceholder": "サプライヤー名で検索..."
            },
            "stats": {
                "responseTimeUnit": "時間"
            }
        }
    },
    "zh": {
        "dashboard": {
            "orders": {
                "title": "货物和订单跟踪",
                "searchPlaceholder": "按供应商名称搜索...",
                "report": "报告",
                "emptyTitle": "您还没有订单",
                "emptyDescription": "当您批准为您的请求收到的报价之一时，您的订单将出现在这里。",
                "actionLabel": "查看我的请求"
            },
            "suppliers": {
                "searchPlaceholder": "按供应商名称搜索..."
            },
            "stats": {
                "responseTimeUnit": "小时"
            }
        }
    }
};

const langs = Object.keys(translations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep merge orders
    if (translations[lang].dashboard.orders) {
        data.dashboard.orders = {
            ...data.dashboard.orders,
            ...translations[lang].dashboard.orders
        };
    }
    
    // Deep merge suppliers
    if (translations[lang].dashboard.suppliers) {
        data.dashboard.suppliers = {
            ...data.dashboard.suppliers,
            ...translations[lang].dashboard.suppliers
        };
    }

    // Deep merge stats
    if (translations[lang].dashboard.stats) {
        data.dashboard.stats = {
            ...data.dashboard.stats,
            ...translations[lang].dashboard.stats
        };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Fixed translations for ${lang}.json`);
}
