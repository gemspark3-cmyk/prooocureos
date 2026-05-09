const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const statusFixes = {
    "tr": {
        "dashboard": {
            "status": {
                "preparing": "Hazırlanıyor",
                "shipped": "Kargolandı",
                "delivered": "Teslim Edildi",
                "warehouse": "Depoda",
                "customs": "Gümrükte",
                "local_delivery": "Dağıtımda",
                "completed": "Tamamlandı"
            }
        }
    },
    "en": {
        "dashboard": {
            "status": {
                "preparing": "Preparing",
                "shipped": "Shipped",
                "delivered": "Delivered",
                "warehouse": "At Warehouse",
                "customs": "At Customs",
                "local_delivery": "In Delivery",
                "completed": "Completed"
            }
        }
    },
    "de": {
        "dashboard": {
            "status": {
                "preparing": "Vorbereitung",
                "shipped": "Versand",
                "delivered": "Geliefert",
                "warehouse": "Im Lager",
                "customs": "Beim Zoll",
                "local_delivery": "In Zustellung",
                "completed": "Abgeschlossen"
            }
        }
    },
    "fr": {
        "dashboard": {
            "status": {
                "preparing": "Préparation",
                "shipped": "Expédié",
                "delivered": "Livré",
                "warehouse": "À l'entrepôt",
                "customs": "À la douane",
                "local_delivery": "En livraison",
                "completed": "Terminé"
            }
        }
    },
    "ru": {
        "dashboard": {
            "status": {
                "preparing": "Подготовка",
                "shipped": "Отгружено",
                "delivered": "Доставлено",
                "warehouse": "На складе",
                "customs": "На таможне",
                "local_delivery": "Доставка",
                "completed": "Завершено"
            }
        }
    },
    "ja": {
        "dashboard": {
            "status": {
                "preparing": "準備中",
                "shipped": "発送済み",
                "delivered": "配達済み",
                "warehouse": "倉庫内",
                "customs": "税関通過中",
                "local_delivery": "配送中",
                "completed": "完了"
            }
        }
    },
    "zh": {
        "dashboard": {
            "status": {
                "preparing": "准备中",
                "shipped": "已发货",
                "delivered": "已送达",
                "warehouse": "在仓库",
                "customs": "在海关",
                "local_delivery": "派送中",
                "completed": "已完成"
            }
        }
    }
};

const langs = Object.keys(statusFixes);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep merge dashboard.status
    data.dashboard = data.dashboard || {};
    data.dashboard.status = {
        ...data.dashboard.status,
        ...statusFixes[lang].dashboard.status
    };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Fixed status translations for ${lang}.json`);
}
