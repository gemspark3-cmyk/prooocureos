const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
    "de": {
        "dashboard": {
            "support": {
                "title": "SUPPORT CENTER",
                "active": "AKTIV",
                "archived": "ARCHIV",
                "connecting": "Verbindung zum Support...",
                "emptyStateActive": "Sie haben derzeit keine aktiven Support-Anfragen.",
                "emptyStateArchived": "Keine archivierten Tickets vorhanden.",
                "status": {
                    "open": "OFFEN",
                    "inProgress": "IN BEARBEITUNG",
                    "resolved": "GELÖST",
                    "closed": "GESCHLOSSEN"
                },
                "createForm": {
                    "title": "Neue Support-Anfrage",
                    "subtitle": "Geben Sie detaillierte Informationen für eine schnelle Lösung an",
                    "subject": "BETREFF",
                    "category": "KATEGORIE",
                    "message": "IHRE NACHRICHT",
                    "placeholderSubject": "Z.B.: Über den Bestellstatus",
                    "placeholderMessage": "Bitte beschreiben Sie Ihr Problem oder Ihre Anfrage im Detail...",
                    "submit": "TICKET SENDEN UND STARTEN",
                    "categories": {
                        "general": "Allgemeine Hilfe",
                        "technical": "Technischer Fehler",
                        "billing": "Bestellung & Zahlung",
                        "product": "Produkt- & Lagerinfo"
                    }
                },
                "chat": {
                    "supportTeam": "ProcureOS Support-Team",
                    "placeholder": "Schreiben Sie Ihre Nachricht...",
                    "closeTicket": "TICKET SCHLIESSEN",
                    "priority": "{priority} PRIORITÄT",
                    "confirmClose": "Sind Sie sicher, dass Sie dieses Ticket schließen möchten?",
                    "closedByUser": "--- Benutzer hat dieses Ticket geschlossen ---"
                },
                "main": {
                    "title": "System-Support-Einheit",
                    "description": "Unser Expertenteam und unser KI-Assistent stehen Ihnen rund um die Uhr für alle betrieblichen, technischen oder finanziellen Fragen zur Verfügung.",
                    "newRequest": "EINE NEUE ANFRAGE STARTEN"
                },
                "messages": {
                    "created": "Ihre Support-Anfrage wurde erfolgreich erstellt.",
                    "error": "Ticket konnte nicht erstellt werden.",
                    "closed": "Ticket erfolgreich geschlossen.",
                    "sendError": "Nachricht konnte nicht gesendet werden."
                }
            }
        },
        "rating": {
            "title": "Lieferanten bewerten",
            "errors": {
                "overallRating": "Bitte geben Sie eine Gesamtbewertung ab.",
                "submitFailed": "Fehler beim Senden der Bewertung."
            },
            "labels": {
                "overall": "Gesamtzufriedenheit",
                "quality": "Produktqualität",
                "delivery": "Liefergeschwindigkeit",
                "communication": "Kommunikation & Support",
                "feedback": "Ihr Feedback"
            },
            "placeholders": {
                "feedback": "Beschreiben Sie kurz Ihre Erfahrung..."
            },
            "info": "Diese Bewertung wird nicht direkt an den Lieferanten weitergegeben, sondern dient nur zur Berechnung des ProcureOS-Vertrauensindex und zur Verbesserung unserer Servicequalität. Ihre Meinungen sind entscheidend für die Transparenz unseres Ökosystems.",
            "submit": "BEWERTUNG SENDEN",
            "submitting": "Wird gesendet...",
            "success": {
                "title": "Vielen Dank!",
                "message": "Ihre Bewertung wurde erfolgreich gespeichert und in der Lieferantenbewertung berücksichtigt."
            },
            "addToFavorites": "LIEFERANT ZU MEINEN FAVORITEN HINZUFÜGEN",
            "messages": {
                "added": "Lieferant zu Ihren Favoriten hinzugefügt."
            }
        }
    },
    "fr": {
        "dashboard": {
            "support": {
                "title": "CENTRE DE SUPPORT",
                "active": "ACTIF",
                "archived": "ARCHIVE",
                "connecting": "Connexion au support...",
                "emptyStateActive": "Vous n'avez pas de demande de support active pour le moment.",
                "emptyStateArchived": "Vous n'avez pas de ticket archivé.",
                "status": {
                    "open": "OUVERT",
                    "inProgress": "EN COURS",
                    "resolved": "RÉSOLU",
                    "closed": "FERMÉ"
                },
                "createForm": {
                    "title": "Nouvelle demande de support",
                    "subtitle": "Fournissez des informations détaillées pour une solution rapide",
                    "subject": "SUJET",
                    "category": "CATÉGORIE",
                    "message": "VOTRE MESSAGE",
                    "placeholderSubject": "Ex: À propos du statut de la commande",
                    "placeholderMessage": "Veuillez détailler votre problème ou votre demande...",
                    "submit": "ENVOYER LE TICKET ET COMMENCER",
                    "categories": {
                        "general": "Aide générale",
                        "technical": "Erreur technique",
                        "billing": "Commande & Paiement",
                        "product": "Info produit & stock"
                    }
                },
                "chat": {
                    "supportTeam": "Équipe de Support ProcureOS",
                    "placeholder": "Écrivez votre message...",
                    "closeTicket": "FERMER LE TICKET",
                    "priority": "PRIORITÉ {priority}",
                    "confirmClose": "Êtes-vous sûr de vouloir fermer ce ticket ?",
                    "closedByUser": "--- L'utilisateur a fermé ce ticket ---"
                },
                "main": {
                    "title": "Unité de Support Système",
                    "description": "Notre équipe d'experts et notre assistant IA sont à votre service 24h/24 et 7j/7 pour toutes vos questions opérationnelles, techniques ou financières.",
                    "newRequest": "LANCER UNE NOUVELLE DEMANDE"
                },
                "messages": {
                    "created": "Votre demande de support a été créée avec succès.",
                    "error": "Impossible de créer le ticket.",
                    "closed": "Ticket fermé avec succès.",
                    "sendError": "Impossible d'envoyer le message."
                }
            }
        },
        "rating": {
            "title": "Évaluer le fournisseur",
            "errors": {
                "overallRating": "Veuillez donner une note globale.",
                "submitFailed": "Une erreur est survenue lors de l'envoi de l'évaluation."
            },
            "labels": {
                "overall": "Satisfaction globale",
                "quality": "Qualité du produit",
                "delivery": "Vitesse de livraison",
                "communication": "Communication & Support",
                "feedback": "Votre avis"
            },
            "placeholders": {
                "feedback": "Décrivez brièvement votre expérience..."
            },
            "info": "Cette évaluation n'est pas partagée directement avec le fournisseur et n'est utilisée que pour les calculs de l'indice de confiance ProcureOS et l'amélioration de notre qualité de service. Vos avis sont cruciaux pour la transparence de notre écosystème.",
            "submit": "ENVOYER L'ÉVALUATION",
            "submitting": "Envoi en cours...",
            "success": {
                "title": "Merci !",
                "message": "Votre évaluation a été enregistrée avec succès et prise en compte dans la note du fournisseur."
            },
            "addToFavorites": "AJOUTER LE FOURNISSEUR À MES FAVORIS",
            "messages": {
                "added": "Le fournisseur a été ajouté à vos favoris."
            }
        }
    },
    "ru": {
        "dashboard": {
            "support": {
                "title": "ЦЕНТР ПОДДЕРЖКИ",
                "active": "АКТИВНЫЕ",
                "archived": "АРХИВ",
                "connecting": "Подключение к службе поддержки...",
                "emptyStateActive": "У вас пока нет активных запросов в службу поддержки.",
                "emptyStateArchived": "У вас нет архивных заявок.",
                "status": {
                    "open": "ОТКРЫТО",
                    "inProgress": "В ОБРАБОТКЕ",
                    "resolved": "РЕШЕНО",
                    "closed": "ЗАКРЫТО"
                },
                "createForm": {
                    "title": "Новый запрос в службу поддержки",
                    "subtitle": "Предоставьте подробную информацию для быстрого решения",
                    "subject": "ТЕМА ЗАПРОСА",
                    "category": "КАТЕГОРИЯ",
                    "message": "ВАШЕ СООБЩЕНИЕ",
                    "placeholderSubject": "Напр.: О статусе заказа",
                    "placeholderMessage": "Пожалуйста, подробно опишите вашу проблему или запрос...",
                    "submit": "ОТПРАВИТЬ ЗАЯВКУ И НАЧАТЬ",
                    "categories": {
                        "general": "Общая помощь",
                        "technical": "Техническая ошибка",
                        "billing": "Заказ и оплата",
                        "product": "Инфо о товаре и складе"
                    }
                },
                "chat": {
                    "supportTeam": "Служба поддержки ProcureOS",
                    "placeholder": "Введите ваше сообщение...",
                    "closeTicket": "ЗАКРЫТЬ ЗАЯВКУ",
                    "priority": "{priority} ПРИОРИТЕТ",
                    "confirmClose": "Вы уверены, что хотите закрыть эту заявку?",
                    "closedByUser": "--- Пользователь закрыл эту заявку ---"
                },
                "main": {
                    "title": "Служба системной поддержки",
                    "description": "Наша команда экспертов и ИИ-помощник к вашим услугам 24/7 по всем операционным, техническим или финансовым вопросам.",
                    "newRequest": "СОЗДАТЬ НОВЫЙ ЗАПРОС"
                },
                "messages": {
                    "created": "Ваш запрос в службу поддержки успешно создан.",
                    "error": "Не удалось создать заявку.",
                    "closed": "Заявка успешно закрыта.",
                    "sendError": "Не удалось отправить сообщение."
                }
            }
        },
        "rating": {
            "title": "Оценить поставщика",
            "errors": {
                "overallRating": "Пожалуйста, поставьте общую оценку.",
                "submitFailed": "При отправке оценки произошла ошибка."
            },
            "labels": {
                "overall": "Общая удовлетворенность",
                "quality": "Качество продукции",
                "delivery": "Скорость доставки",
                "communication": "Связь и поддержка",
                "feedback": "Ваш отзыв"
            },
            "placeholders": {
                "feedback": "Кратко опишите ваш опыт..."
            },
            "info": "Эта оценка не передается поставщику напрямую и используется только для расчета индекса доверия ProcureOS и улучшения качества нашего обслуживания. Ваши мнения критически важны для прозрачности нашей экосистемы.",
            "submit": "ОТПРАВИТЬ ОЦЕНКУ",
            "submitting": "Отправка...",
            "success": {
                "title": "Спасибо!",
                "message": "Ваша оценка успешно сохранена и учтена в рейтинге поставщика."
            },
            "addToFavorites": "ДОБАВИТЬ ПОСТАВЩИКА В ИЗБРАННОЕ",
            "messages": {
                "added": "Поставщик добавлен в избранное."
            }
        }
    },
    "ja": {
        "dashboard": {
            "support": {
                "title": "サポートセンター",
                "active": "アクティブ",
                "archived": "アーカイブ",
                "connecting": "サポートに接続中...",
                "emptyStateActive": "現在、アクティブなサポートリクエストはありません。",
                "emptyStateArchived": "アーカイブされたチケットはありません。",
                "status": {
                    "open": "オープン",
                    "inProgress": "進行中",
                    "resolved": "解決済み",
                    "closed": "クローズ"
                },
                "createForm": {
                    "title": "新しいサポートリクエスト",
                    "subtitle": "迅速な解決のために詳細な情報を提供してください",
                    "subject": "件名",
                    "category": "カテゴリー",
                    "message": "メッセージ",
                    "placeholderSubject": "例：注文ステータスについて",
                    "placeholderMessage": "問題やリクエストの詳細を入力してください...",
                    "submit": "チケットを送信して開始",
                    "categories": {
                        "general": "一般的なヘルプ",
                        "technical": "技術的なエラー",
                        "billing": "注文と支払い",
                        "product": "製品と在庫情報"
                    }
                },
                "chat": {
                    "supportTeam": "ProcureOSサポートチーム",
                    "placeholder": "メッセージを入力...",
                    "closeTicket": "チケットを閉じる",
                    "priority": "優先度：{priority}",
                    "confirmClose": "このチケットを閉じてもよろしいですか？",
                    "closedByUser": "--- ユーザーがこのチケットを閉じました ---"
                },
                "main": {
                    "title": "システムサポートユニット",
                    "description": "当社の専門家チームとAIアシスタントが、運用、技術、または財務に関するあらゆる質問に対して24時間365日対応いたします。",
                    "newRequest": "新しいリクエストを開始"
                },
                "messages": {
                    "created": "サポートリクエストが正常に作成されました。",
                    "error": "チケットを作成できませんでした。",
                    "closed": "チケットが正常に閉じられました。",
                    "sendError": "メッセージを送信できませんでした。"
                }
            }
        },
        "rating": {
            "title": "サプライヤーを評価する",
            "errors": {
                "overallRating": "総合評価を入力してください。",
                "submitFailed": "評価の送信中にエラーが発生しました。"
            },
            "labels": {
                "overall": "総合的な満足度",
                "quality": "製品の品質",
                "delivery": "配送スピード",
                "communication": "コミュニケーションとサポート",
                "feedback": "フィードバック"
            },
            "placeholders": {
                "feedback": "体験を簡単に説明してください..."
            },
            "info": "この評価はサプライヤーと直接共有されることはなく、ProcureOSの信頼指数の計算とサービス品質の向上のためにのみ使用されます。お客様の意見は、当社のエコシステムの透明性にとって非常に重要です。",
            "submit": "評価を送信",
            "submitting": "送信中...",
            "success": {
                "title": "ありがとうございました！",
                "message": "評価が正常に保存され、サプライヤーのスコアに反映されました。"
            },
            "addToFavorites": "サプライヤーをお気に入りに追加",
            "messages": {
                "added": "サプライヤーがお気に入りに追加されました。"
            }
        }
    },
    "zh": {
        "dashboard": {
            "support": {
                "title": "支持中心",
                "active": "进行中",
                "archived": "已存档",
                "connecting": "正在连接支持部门...",
                "emptyStateActive": "您目前没有进行中的支持请求。",
                "emptyStateArchived": "没有已存档的工单。",
                "status": {
                    "open": "待处理",
                    "inProgress": "处理中",
                    "resolved": "已解决",
                    "closed": "已关闭"
                },
                "createForm": {
                    "title": "发起新的支持请求",
                    "subtitle": "请提供详细信息以便快速解决",
                    "subject": "主题",
                    "category": "类别",
                    "message": "您的消息",
                    "placeholderSubject": "例如：关于订单状态",
                    "placeholderMessage": "请详细描述您的问题或请求...",
                    "submit": "发送工单并开始",
                    "categories": {
                        "general": "一般帮助",
                        "technical": "技术错误",
                        "billing": "订单与支付",
                        "product": "产品与库存信息"
                    }
                },
                "chat": {
                    "supportTeam": "ProcureOS 支持团队",
                    "placeholder": "输入您的消息...",
                    "closeTicket": "关闭工单",
                    "priority": "{priority} 优先级",
                    "confirmClose": "您确定要关闭此工单吗？",
                    "closedByUser": "--- 用户已关闭此工单 ---"
                },
                "main": {
                    "title": "系统支持单元",
                    "description": "我们的专家团队和人工智能助手全天候为您提供服务，解决所有运营、技术或财务问题。",
                    "newRequest": "发起新请求"
                },
                "messages": {
                    "created": "您的支持请求已成功创建。",
                    "error": "无法创建工单。",
                    "closed": "工单已成功关闭。",
                    "sendError": "无法发送消息。"
                }
            }
        },
        "rating": {
            "title": "评价供应商",
            "errors": {
                "overallRating": "请提供综合评分。",
                "submitFailed": "提交评价时出错。"
            },
            "labels": {
                "overall": "总体满意度",
                "quality": "产品质量",
                "delivery": "交货速度",
                "communication": "沟通与支持",
                "feedback": "您的反馈"
            },
            "placeholders": {
                "feedback": "简要描述您的体验..."
            },
            "info": "此评价不会直接与供应商共享，仅用于 ProcureOS 信任指数计算和改进我们的服务质量。您的意见对于我们生态系统的透明度至关重要。",
            "submit": "提交评价",
            "submitting": "正在提交...",
            "success": {
                "title": "谢谢！",
                "message": "您的评价已成功保存并反映在供应商评分中。"
            },
            "addToFavorites": "将供应商添加到我的收藏",
            "messages": {
                "added": "供应商已添加到收藏夹。"
            }
        }
    }
};

const langs = Object.keys(translations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep merge dashboard.support
    if (translations[lang].dashboard && translations[lang].dashboard.support) {
        data.dashboard = data.dashboard || {};
        data.dashboard.support = {
            ...data.dashboard.support,
            ...translations[lang].dashboard.support
        };
    }
    
    // Deep merge rating
    if (translations[lang].rating) {
        data.rating = {
            ...data.rating,
            ...translations[lang].rating
        };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Deep fixed translations for ${lang}.json (Support & Rating)`);
}
