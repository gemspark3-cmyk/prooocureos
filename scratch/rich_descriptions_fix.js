const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const descriptions = {
    "zh": {
        "dashboard": {
            "team": {
                "description": "邀请您的团队加入 ProcureOS。定义基于部门的预算，设置支出限制，并通过数字化多级审批层级来获得控制权。"
            },
            "integrations": {
                "description": "购买的商品在交付时自动进入您的库存。通过与 SAP、Oracle 和 Logo 等系统的完全同步，消除手动数据输入。"
            }
        }
    },
    "ja": {
        "dashboard": {
            "team": {
                "description": "チームを ProcureOS に招待します。部署ごとの予算を定義し、支出制限を設定し、多段階の承認階層をデジタル化して管理を強化します。"
            },
            "integrations": {
                "description": "購入した商品は納品時に自動的に在庫に反映されます。SAP、Oracle、Logo などのシステムと完全に同期し、手動のデータ入力を排除します。"
            }
        }
    },
    "ru": {
        "dashboard": {
            "team": {
                "description": "Пригласите свою команду в ProcureOS. Определяйте бюджеты по отделам, устанавливайте лимиты расходов и получите контроль, цифровизировав многоуровневую иерархию одобрения."
            },
            "integrations": {
                "description": "Купленные товары автоматически заносятся в ваш инвентарь в момент доставки. Забудьте о ручном вводе данных благодаря полной синхронизации с такими системами, как SAP, Oracle и Logo."
            }
        }
    },
    "fr": {
        "dashboard": {
            "team": {
                "description": "Invitez votre équipe sur ProcureOS. Définissez des budgets par département, fixez des limites de dépenses et prenez le contrôle en numérisant votre hiérarchie d'approbation multi-étapes."
            },
            "integrations": {
                "description": "Les produits achetés sont automatiquement enregistrés dans votre inventaire au moment de la livraison. Éliminez la saisie manuelle des données grâce à une synchronisation complète avec des systèmes tels que SAP, Oracle et Logo."
            }
        }
    },
    "de": {
        "dashboard": {
            "team": {
                "description": "Laden Sie Ihr Team zu ProcureOS ein. Definieren Sie abteilungsbezogene Budgets, legen Sie Ausgabenlimits fest und übernehmen Sie die Kontrolle, indem Sie Ihre mehrstufige Genehmigungshierarchie digitalisieren."
            },
            "integrations": {
                "description": "Gekaufte Produkte werden bei Lieferung automatisch in Ihren Bestand eingebucht. Beenden Sie die manuelle Dateneingabe durch vollständige Synchronisation mit Systemen wie SAP, Oracle und Logo."
            }
        }
    }
};

const langs = Object.keys(descriptions);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    data.dashboard = data.dashboard || {};
    data.dashboard.team = { ...data.dashboard.team, ...descriptions[lang].dashboard.team };
    data.dashboard.integrations = { ...data.dashboard.integrations, ...descriptions[lang].dashboard.integrations };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated rich descriptions for ${lang}.json`);
}
