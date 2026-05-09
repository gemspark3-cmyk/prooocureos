const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
  tr: {
    dashboard: {
      requestDetails: {
        status: {
          open: "TEKLİF TOPLANIYOR",
          completed: "TAMAMLANDI"
        },
        tabs: {
          list: "Liste",
          compare: "Kıyasla",
          audit: "Denetim"
        },
        timeline: {
          created: "Talep (RFQ) oluşturuldu ve sisteme kaydedildi.",
          offerReceived: "{supplier} tarafından teklif iletildi ({price}).",
          offerAccepted: "{supplier} teklifi KABUL EDİLDİ ve Sipariş (PO) süreci başlatıldı.",
          offerRejected: "{supplier} teklifi REDDEDİLDİ.",
          pendingApproval: "{supplier} teklifi yönetici onayına sunuldu (Yetki limiti aşıldı).",
          supplier: "Tedarikçi",
          unknownSupplier: "Bir tedarikçi"
        },
        details: {
          title: "TALEP AYRINTILARI",
          quickInfo: "HIZLI BİLGİLER",
          quantity: "MİKTAR",
          paymentTerm: "ÖDEME VADESİ",
          currency: "PARA BİRİMİ",
          targetPrice: "HEDEF FİYAT",
          openOffer: "Açık Teklif",
          itemDetail: "Ürün/Hizmet Detayı",
          note: "Not",
          noDetail: "Detay belirtilmemiş."
        },
        offers: {
          title: "ALINAN TEKLİFLER",
          countSuffix: "ADET",
          batchNegotiation: "TOPLU PAZARLIK",
          noOffers: "HENÜZ TEKLİF GELMEDİ. SİSTEM TEDARİKÇİLERLE EŞLEŞMEYİ SÜRDÜRÜYOR.",
          bestMatch: "EN İYİ EŞLEŞME",
          trust: "GÜVEN",
          amount: "TEKLİF TUTARI",
          unitPrice: "BİRİM FİYAT",
          deliveryTime: "TERMİN SÜRESİ",
          workingDays: "İŞ GÜNÜ",
          expressDelivery: "EKSPRES TESLİMAT",
          negotiation: "PAZARLIK",
          details: "DETAYLAR",
          accept: "KABUL ET",
          reject: "Reddet",
          selected: "SEÇİLDİ",
          rejected: "REDDEDİLDİ",
          inNegotiation: "PAZARLIKTA",
          activeOffer: "AKTİF TEKLİF",
          pendingApproval: "ONAY BEKLİYOR",
          sendToApproval: "ONAYA GÖNDER",
          saveSupplier: "Tedarikçiyi Kaydet"
        },
        negotiationModal: {
          batchTitle: "TOPLU PAZARLIK",
          singleTitle: "PAZARLIK SÜRECİ",
          batchDesc: "BU TALEP İÇİN TEKLİF VEREN TÜM FİRMALARA ({count} ADET) TOPLU MESAJ GÖNDERİLECEKTİR.",
          singleDesc: "{supplier} İLE FİYAT VE TERMİN ÜZERİNE KARŞI TEKLİF OLUŞTURUN.",
          targetPrice: "HEDEF BİRİM FİYAT",
          targetDays: "İSTENEN TERMİN (GÜN)",
          noteLabel: "PAZARLIK NOTU",
          notePlaceholder: "Bütçe kısıtı veya teslimat aciliyeti hakkında bilgi verin...",
          cancel: "VAZGEÇ",
          sendBatch: "TOPLU MESAJI GÖNDER",
          sendSingle: "KARŞI TEKLİFİ İLET"
        },
        audit: {
          title: "SÜREÇ DENETİM İZİ (BLOCKCHAIN VERIFIED)",
          verified: "SİSTEM ONAYLI"
        }
      }
    }
  },
  en: {
    dashboard: {
      requestDetails: {
        status: {
          open: "COLLECTING OFFERS",
          completed: "COMPLETED"
        },
        tabs: {
          list: "List",
          compare: "Compare",
          audit: "Audit"
        },
        timeline: {
          created: "Request (RFQ) created and saved to system.",
          offerReceived: "Offer submitted by {supplier} ({price}).",
          offerAccepted: "{supplier} offer ACCEPTED and Purchase Order (PO) process started.",
          offerRejected: "{supplier} offer REJECTED.",
          pendingApproval: "{supplier} offer submitted for manager approval (Auth limit exceeded).",
          supplier: "Supplier",
          unknownSupplier: "A supplier"
        },
        details: {
          title: "REQUEST DETAILS",
          quickInfo: "QUICK INFO",
          quantity: "QUANTITY",
          paymentTerm: "PAYMENT TERM",
          currency: "CURRENCY",
          targetPrice: "TARGET PRICE",
          openOffer: "Open Offer",
          itemDetail: "Product/Service Detail",
          note: "Note",
          noDetail: "No details specified."
        },
        offers: {
          title: "OFFERS RECEIVED",
          countSuffix: "ITEMS",
          batchNegotiation: "BATCH NEGOTIATION",
          noOffers: "NO OFFERS YET. SYSTEM IS MATCHING WITH SUPPLIERS.",
          bestMatch: "BEST MATCH",
          trust: "TRUST",
          amount: "OFFER AMOUNT",
          unitPrice: "UNIT PRICE",
          deliveryTime: "DELIVERY TIME",
          workingDays: "WORKING DAYS",
          expressDelivery: "EXPRESS DELIVERY",
          negotiation: "NEGOTIATE",
          details: "DETAILS",
          accept: "ACCEPT",
          reject: "Reject",
          selected: "SELECTED",
          rejected: "REJECTED",
          inNegotiation: "IN NEGOTIATION",
          activeOffer: "ACTIVE OFFER",
          pendingApproval: "PENDING APPROVAL",
          sendToApproval: "SEND TO APPROVAL",
          saveSupplier: "Save Supplier"
        },
        negotiationModal: {
          batchTitle: "BATCH NEGOTIATION",
          singleTitle: "NEGOTIATION PROCESS",
          batchDesc: "A BATCH MESSAGE WILL BE SENT TO ALL COMPANIES ({count} ITEMS) THAT SUBMITTED OFFERS FOR THIS REQUEST.",
          singleDesc: "CREATE A COUNTER OFFER ON PRICE AND DELIVERY TIME WITH {supplier}.",
          targetPrice: "TARGET UNIT PRICE",
          targetDays: "REQUESTED DELIVERY (DAYS)",
          noteLabel: "NEGOTIATION NOTE",
          notePlaceholder: "Provide info about budget constraints or delivery urgency...",
          cancel: "CANCEL",
          sendBatch: "SEND BATCH MESSAGE",
          sendSingle: "SEND COUNTER OFFER"
        },
        audit: {
          title: "PROCESS AUDIT TRAIL (BLOCKCHAIN VERIFIED)",
          verified: "SYSTEM VERIFIED"
        }
      }
    }
  },
  ru: {
    dashboard: {
      requestDetails: {
        status: {
          open: "СБОР ПРЕДЛОЖЕНИЙ",
          completed: "ЗАВЕРШЕНО"
        },
        tabs: {
          list: "Список",
          compare: "Сравнить",
          audit: "Аудит"
        },
        timeline: {
          created: "Запрос (RFQ) создан и сохранен в системе.",
          offerReceived: "Предложение отправлено {supplier} ({price}).",
          offerAccepted: "Предложение {supplier} ПРИНЯТО, начат процесс заказа (PO).",
          offerRejected: "Предложение {supplier} ОТКЛОНЕНО.",
          pendingApproval: "Предложение {supplier} отправлено на утверждение менеджеру (лимит превышен).",
          supplier: "Поставщик",
          unknownSupplier: "Поставщик"
        },
        details: {
          title: "ДЕТАЛИ ЗАПРОСА",
          quickInfo: "БЫСТРАЯ ИНФОРМАЦИЯ",
          quantity: "КОЛИЧЕСТВО",
          paymentTerm: "УСЛОВИЯ ОПЛАТЫ",
          currency: "ВАЛЮТА",
          targetPrice: "ЦЕЛЕВАЯ ЦЕНА",
          openOffer: "Открытое предложение",
          itemDetail: "Детали продукта/услуги",
          note: "Заметка",
          noDetail: "Детали не указаны."
        },
        offers: {
          title: "ПОЛУЧЕННЫЕ ПРЕДЛОЖЕНИЯ",
          countSuffix: "ШТ",
          batchNegotiation: "МАССОВЫЕ ПЕРЕГОВОРЫ",
          noOffers: "ПРЕДЛОЖЕНИЙ ПОКА НЕТ. СИСТЕМА ПОДБИРАЕТ ПОСТАВЩИКОВ.",
          bestMatch: "ЛУЧШЕЕ СОВПАДЕНИЕ",
          trust: "ДОВЕРИЕ",
          amount: "СУММА ПРЕДЛОЖЕНИЯ",
          unitPrice: "ЦЕНА ЗА ЕДИНИЦУ",
          deliveryTime: "СРОК ПОСТАВКИ",
          workingDays: "РАБОЧИХ ДНЕЙ",
          expressDelivery: "ЭКСПРЕСС-ДОСТАВКА",
          negotiation: "ТОРГОВАТЬСЯ",
          details: "ДЕТАЛИ",
          accept: "ПРИНЯТЬ",
          reject: "Отклонить",
          selected: "ВЫБРАНО",
          rejected: "ОТКЛОНЕНО",
          inNegotiation: "В ПЕРЕГОВОРАХ",
          activeOffer: "АКТИВНОЕ ПРЕДЛОЖЕНИЕ",
          pendingApproval: "ОЖИДАЕТ ОДОБРЕНИЯ",
          sendToApproval: "ОТПРАВИТЬ НА ОДОБРЕНИЕ",
          saveSupplier: "Сохранить поставщика"
        },
        negotiationModal: {
          batchTitle: "МАССОВЫЕ ПЕРЕГОВОРЫ",
          singleTitle: "ПРОЦЕСС ПЕРЕГОВОРОВ",
          batchDesc: "МАССОВОЕ СООБЩЕНИЕ БУДЕТ ОТПРАВЛЕНО ВСЕМ КОМПАНИЯМ ({count} ШТ), ПОДАВШИМ ПРЕДЛОЖЕНИЯ.",
          singleDesc: "СОЗДАЙТЕ ВСТРЕЧНОЕ ПРЕДЛОЖЕНИЕ ПО ЦЕНЕ И СРОКАМ С {supplier}.",
          targetPrice: "ЦЕЛЕВАЯ ЦЕНА ЗА ЕД.",
          targetDays: "ЖЕЛАЕМЫЙ СРОК (ДНЕЙ)",
          noteLabel: "ЗАМЕТКА К ПЕРЕГОВОРАМ",
          notePlaceholder: "Укажите информацию о бюджетных ограничениях или срочности...",
          cancel: "ОТМЕНА",
          sendBatch: "ОТПРАВИТЬ МАССОВОЕ СООБЩЕНИЕ",
          sendSingle: "ОТПРАВИТЬ ВСТРЕЧНОЕ ПРЕДЛОЖЕНИЕ"
        },
        audit: {
          title: "АУДИТОРСКИЙ СЛЕД ПРОЦЕССА (BLOCKCHAIN VERIFIED)",
          verified: "ПОДТВЕРЖДЕНО СИСТЕМОЙ"
        }
      }
    }
  },
  de: {
    dashboard: {
      requestDetails: {
        status: {
          open: "ANGEBOTE SAMMELN",
          completed: "ABGESCHLOSSEN"
        },
        tabs: {
          list: "Liste",
          compare: "Vergleichen",
          audit: "Prüfung"
        },
        timeline: {
          created: "Anfrage (RFQ) erstellt und im System gespeichert.",
          offerReceived: "Angebot von {supplier} eingereicht ({price}).",
          offerAccepted: "Angebot von {supplier} ANGENOMMEN und Bestellung (PO) gestartet.",
          offerRejected: "Angebot von {supplier} ABGELEHNT.",
          pendingApproval: "Angebot von {supplier} zur Genehmigung vorgelegt (Limit überschritten).",
          supplier: "Lieferant",
          unknownSupplier: "Ein Lieferant"
        },
        details: {
          title: "ANFRAGEDETAILS",
          quickInfo: "SCHNELLINFOS",
          quantity: "MENGE",
          paymentTerm: "ZAHLUNGSZIEL",
          currency: "WÄHRUNG",
          targetPrice: "ZIELPREIS",
          openOffer: "Offenes Angebot",
          itemDetail: "Produkt/Dienstleistungsdetail",
          note: "Hinweis",
          noDetail: "Keine Details angegeben."
        },
        offers: {
          title: "ERHALTENE ANGEBOTE",
          countSuffix: "STÜCK",
          batchNegotiation: "SAMMELVERHANDLUNG",
          noOffers: "NOCH KEINE ANGEBOTE. SYSTEM GLEICHT MIT LIEFERANTEN AB.",
          bestMatch: "BESTE ÜBEREINSTIMMUNG",
          trust: "VERTRAUEN",
          amount: "ANGEBOTSSUMME",
          unitPrice: "EINZELPREIS",
          deliveryTime: "LIEFERZEIT",
          workingDays: "WERKTAGE",
          expressDelivery: "EXPRESSLIEFERUNG",
          negotiation: "VERHANDELN",
          details: "DETAILS",
          accept: "ANNEHMEN",
          reject: "Ablehnen",
          selected: "AUSGEWÄHLT",
          rejected: "ABGELEHNT",
          inNegotiation: "IN VERHANDLUNG",
          activeOffer: "AKTIVES ANGEBOT",
          pendingApproval: "WARTET AUF GENEHMIGUNG",
          sendToApproval: "ZUR GENEHMIGUNG SENDEN",
          saveSupplier: "Lieferant speichern"
        },
        negotiationModal: {
          batchTitle: "SAMMELVERHANDLUNG",
          singleTitle: "VERHANDLUNGSPROZESS",
          batchDesc: "EINE SAMMELNACHRICHT WIRD AN ALLE FIRMEN ({count} STÜCK) GESENDET, DIE ANGEBOTE ABGEGEBEN HABEN.",
          singleDesc: "ERSTELLEN SIE EIN GEGENANGEBOT ZU PREIS UND LIEFERZEIT MIT {supplier}.",
          targetPrice: "ZIEL-EINZELPREIS",
          targetDays: "GEWÜNSCHTE LIEFERUNG (TAGE)",
          noteLabel: "VERHANDLUNGSNOTIZ",
          notePlaceholder: "Infos zu Budgetbeschränkungen oder Lieferdringlichkeit...",
          cancel: "ABBRECHEN",
          sendBatch: "SAMMELNACHRICHT SENDEN",
          sendSingle: "GEGENANGEBOT SENDEN"
        },
        audit: {
          title: "PROZESS-AUDIT-TRAIL (BLOCKCHAIN VERIFIED)",
          verified: "SYSTEMVERIFIZIERT"
        }
      }
    }
  },
  fr: {
    dashboard: {
      requestDetails: {
        status: {
          open: "COLLECTE D'OFFRES",
          completed: "TERMINÉ"
        },
        tabs: {
          list: "Liste",
          compare: "Comparer",
          audit: "Audit"
        },
        timeline: {
          created: "Demande (RFQ) créée et enregistrée dans le système.",
          offerReceived: "Offre soumise par {supplier} ({price}).",
          offerAccepted: "Offre de {supplier} ACCEPTÉE et processus de commande (PO) lancé.",
          offerRejected: "Offre de {supplier} REJETÉE.",
          pendingApproval: "Offre de {supplier} soumise pour approbation (limite dépassée).",
          supplier: "Fournisseur",
          unknownSupplier: "Un fournisseur"
        },
        details: {
          title: "DÉTAILS DE LA DEMANDE",
          quickInfo: "INFOS RAPIDES",
          quantity: "QUANTITÉ",
          paymentTerm: "CONDITIONS DE PAIEMENT",
          currency: "DEVISE",
          targetPrice: "PRIX CIBLE",
          openOffer: "Offre ouverte",
          itemDetail: "Détail du produit/service",
          note: "Note",
          noDetail: "Aucun détail spécifié."
        },
        offers: {
          title: "OFFRES REÇUES",
          countSuffix: "ARTICLES",
          batchNegotiation: "NÉGOCIATION GROUPÉE",
          noOffers: "PAS ENCORE D'OFFRES. LE SYSTÈME RECHERCHE DES FOURNISSEURS.",
          bestMatch: "MEILLEURE CORRESPONDANCE",
          trust: "CONFIANCE",
          amount: "MONTANT DE L'OFFRE",
          unitPrice: "PRIX UNITAIRE",
          deliveryTime: "DÉLAI DE LIVRAISON",
          workingDays: "JOURS OUVRABLES",
          expressDelivery: "LIVRAISON EXPRESS",
          negotiation: "NÉGOCIER",
          details: "DÉTAILS",
          accept: "ACCEPTER",
          reject: "Rejeter",
          selected: "SÉLECTIONNÉ",
          rejected: "REJETÉ",
          inNegotiation: "EN NÉGOCIATION",
          activeOffer: "OFFRE ACTIVE",
          pendingApproval: "EN ATTENTE D'APPROBATION",
          sendToApproval: "ENVOYER POUR APPROBATION",
          saveSupplier: "Enregistrer le fournisseur"
        },
        negotiationModal: {
          batchTitle: "NÉGOCIATION GROUPÉE",
          singleTitle: "PROCESSUS DE NÉGOCIATION",
          batchDesc: "UN MESSAGE GROUPÉ SERA ENVOYÉ À TOUTES LES ENTREPRISES ({count} ARTICLES) AYANT SOUMIS DES OFFRES.",
          singleDesc: "CRÉER UNE CONTRE-OFFRE SUR LE PRIX ET LE DÉLAI AVEC {supplier}.",
          targetPrice: "PRIX UNITAIRE CIBLE",
          targetDays: "LIVRAISON SOUHAITÉE (JOURS)",
          noteLabel: "NOTE DE NÉGOCIATION",
          notePlaceholder: "Infos sur les contraintes budgétaires ou l'urgence...",
          cancel: "ANNULER",
          sendBatch: "ENVOYER LE MESSAGE GROUPÉ",
          sendSingle: "ENVOYER LA CONTRE-OFFRE"
        },
        audit: {
          title: "PISTE D'AUDIT DU PROCESSUS (BLOCKCHAIN VERIFIED)",
          verified: "SYSTÈME VÉRIFIÉ"
        }
      }
    }
  },
  ja: {
    dashboard: {
      requestDetails: {
        status: {
          open: "見積もり収集中",
          completed: "完了"
        },
        tabs: {
          list: "リスト",
          compare: "比較",
          audit: "監査"
        },
        timeline: {
          created: "見積依頼（RFQ）が作成され、システムに保存されました。",
          offerReceived: "{supplier} から見積もりが提出されました（{price}）。",
          offerAccepted: "{supplier} の見積もりが承認され、注文（PO）プロセスが開始されました。",
          offerRejected: "{supplier} の見積もりが拒否されました。",
          pendingApproval: "{supplier} の見積もりが承認待ちです（権限制限超過）。",
          supplier: "サプライヤー",
          unknownSupplier: "サプライヤー"
        },
        details: {
          title: "リクエスト詳細",
          quickInfo: "クイック情報",
          quantity: "数量",
          paymentTerm: "支払い条件",
          currency: "通貨",
          targetPrice: "目標価格",
          openOffer: "オープンオファー",
          itemDetail: "製品/サービス詳細",
          note: "備考",
          noDetail: "詳細なし"
        },
        offers: {
          title: "受信した見積もり",
          countSuffix: "件",
          batchNegotiation: "一括交渉",
          noOffers: "見積もりはまだありません。システムがサプライヤーとマッチング中です。",
          bestMatch: "ベストマッチ",
          trust: "信頼度",
          amount: "見積金額",
          unitPrice: "単価",
          deliveryTime: "納期",
          workingDays: "営業日",
          expressDelivery: "急ぎ配送",
          negotiation: "交渉する",
          details: "詳細",
          accept: "承認",
          reject: "拒否",
          selected: "選択済み",
          rejected: "拒否済み",
          inNegotiation: "交渉中",
          activeOffer: "有効な見積もり",
          pendingApproval: "承認待ち",
          sendToApproval: "承認に回す",
          saveSupplier: "サプライヤーを保存"
        },
        negotiationModal: {
          batchTitle: "一括交渉",
          singleTitle: "交渉プロセス",
          batchDesc: "このリクエストに見積もりを提出したすべての企業（{count} 件）に一括メッセージが送信されます。",
          singleDesc: "{supplier} と価格および納期についてカウンターオファーを作成します。",
          targetPrice: "目標単価",
          targetDays: "希望納期（日）",
          noteLabel: "交渉メモ",
          notePlaceholder: "予算の制約や納期の緊急性について入力してください...",
          cancel: "キャンセル",
          sendBatch: "一括メッセージを送信",
          sendSingle: "カウンターオファーを送信"
        },
        audit: {
          title: "プロセス監査証跡（ブロックチェーン検証済み）",
          verified: "システム検証済み"
        }
      }
    }
  },
  zh: {
    dashboard: {
      requestDetails: {
        status: {
          open: "正在收集报价",
          completed: "已完成"
        },
        tabs: {
          list: "列表",
          compare: "比较",
          audit: "审计"
        },
        timeline: {
          created: "报价请求 (RFQ) 已创建并保存到系统。",
          offerReceived: "{supplier} 已提交报价 ({price})。",
          offerAccepted: "已接受 {supplier} 的报价，采购订单 (PO) 流程已启动。",
          offerRejected: "已拒绝 {supplier} 的报价。",
          pendingApproval: "{supplier} 的报价已提交等待审批（超过权限限制）。",
          supplier: "供应商",
          unknownSupplier: "供应商"
        },
        details: {
          title: "请求详情",
          quickInfo: "快速信息",
          quantity: "数量",
          paymentTerm: "付款条件",
          currency: "货币",
          targetPrice: "目标价格",
          openOffer: "公开报价",
          itemDetail: "产品/服务详情",
          note: "备注",
          noDetail: "未指定详情。"
        },
        offers: {
          title: "收到的报价",
          countSuffix: "个",
          batchNegotiation: "批量谈判",
          noOffers: "暂无报价。系统正在匹配供应商。",
          bestMatch: "最佳匹配",
          trust: "信任度",
          amount: "报价金额",
          unitPrice: "单价",
          deliveryTime: "交货时间",
          workingDays: "工作日",
          expressDelivery: "特快送货",
          negotiation: "谈判",
          details: "详情",
          accept: "接受",
          reject: "拒绝",
          selected: "已选择",
          rejected: "已拒绝",
          inNegotiation: "谈判中",
          activeOffer: "有效报价",
          pendingApproval: "等待审批",
          sendToApproval: "提交审批",
          saveSupplier: "保存供应商"
        },
        negotiationModal: {
          batchTitle: "批量谈判",
          singleTitle: "谈判流程",
          batchDesc: "批量消息将发送给所有提交报价的公司（共 {count} 个）。",
          singleDesc: "与 {supplier} 就价格和交货时间创建反报价。",
          targetPrice: "目标单价",
          targetDays: "要求交货时间（天）",
          noteLabel: "谈判备注",
          notePlaceholder: "提供有关预算限制或交货紧迫性的信息...",
          cancel: "取消",
          sendBatch: "发送批量消息",
          sendSingle: "发送反报价"
        },
        audit: {
          title: "流程审计追踪（区块链验证）",
          verified: "系统已验证"
        }
      }
    }
  }
};

const langs = Object.keys(translations);

for (const lang of langs) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.dashboard = data.dashboard || {};
  data.dashboard.requestDetails = translations[lang].dashboard.requestDetails;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated dashboard.requestDetails in ${lang}.json`);
}
