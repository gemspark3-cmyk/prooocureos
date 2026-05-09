const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
  tr: {
    dashboard: {
      offerDocument: {
        print: "YAZDIR / İNDİR",
        officialDoc: "RESMİ TEKLİF BELGESİ",
        docNo: "BELGE NO",
        sellerInfo: "SATICI BİLGİLERİ",
        authorized: "Yetkili",
        taxNo: "Vergi No",
        buyerInfo: "ALICI BİLGİLERİ",
        description: "HİZMET / ÜRÜN AÇIKLAMASI",
        quantity: "MİKTAR",
        unitPrice: "BİRİM FİYAT (KDV HARİÇ)",
        totalPrice: "TOPLAM (KDV HARİÇ)",
        category: "Kategori",
        unitAdet: "Adet",
        digitalNotice: "* Bu teklif dijital olarak ProcureOS üzerinde oluşturulmuştur.",
        grandTotal: "GENEL TOPLAM",
        paymentTerms: "ÖDEME VE TESLİMAT ŞARTLARI",
        paymentTermLabel: "ÖDEME VADESİ",
        deliveryTermLabel: "TESLİMAT TERMİNİ",
        cash: "PEŞİN",
        workingDays: "İŞ GÜNÜ",
        digitalVerification: "DİJİTAL DOĞRULAMA",
        page: "Sayfa",
        supplierFirm: "TEDARİKÇİ FİRMA",
        buyerFirm: "ALICI FİRMA"
      }
    }
  },
  en: {
    dashboard: {
      offerDocument: {
        print: "PRINT / DOWNLOAD",
        officialDoc: "OFFICIAL QUOTATION DOCUMENT",
        docNo: "DOCUMENT NO",
        sellerInfo: "SELLER INFORMATION",
        authorized: "Authorized",
        taxNo: "Tax No",
        buyerInfo: "BUYER INFORMATION",
        description: "SERVICE / PRODUCT DESCRIPTION",
        quantity: "QUANTITY",
        unitPrice: "UNIT PRICE (EXCL. VAT)",
        totalPrice: "TOTAL PRICE (EXCL. VAT)",
        category: "Category",
        unitAdet: "Unit",
        digitalNotice: "* This quote was generated digitally on ProcureOS.",
        grandTotal: "GRAND TOTAL",
        paymentTerms: "PAYMENT AND DELIVERY TERMS",
        paymentTermLabel: "PAYMENT TERM",
        deliveryTermLabel: "DELIVERY TERM",
        cash: "CASH",
        workingDays: "WORKING DAYS",
        digitalVerification: "DIGITAL VERIFICATION",
        page: "Page",
        supplierFirm: "SUPPLIER COMPANY",
        buyerFirm: "BUYER COMPANY"
      }
    }
  },
  ru: {
    dashboard: {
      offerDocument: {
        print: "ПЕЧАТЬ / СКАЧАТЬ",
        officialDoc: "ОФИЦИАЛЬНЫЙ КОММЕРЧЕСКИЙ ДОКУМЕНТ",
        docNo: "НОМЕР ДОКУМЕНТА",
        sellerInfo: "ИНФОРМАЦИЯ О ПРОДАВЦЕ",
        authorized: "Уполномоченный",
        taxNo: "ИНН",
        buyerInfo: "ИНФОРМАЦИЯ О ПОКУПАТЕЛЕ",
        description: "ОПИСАНИЕ ТОВАРА / УСЛУГИ",
        quantity: "КОЛИЧЕСТВО",
        unitPrice: "ЦЕНА ЗА ЕД. (БЕЗ НДС)",
        totalPrice: "ИТОГО (БЕЗ НДС)",
        category: "Категория",
        unitAdet: "шт",
        digitalNotice: "* Это предложение было создано в цифровом виде на ProcureOS.",
        grandTotal: "ОБЩИЙ ИТОГ",
        paymentTerms: "УСЛОВИЯ ОПЛАТЫ И ДОСТАВКИ",
        paymentTermLabel: "СРОК ОПЛАТЫ",
        deliveryTermLabel: "СРОК ПОСТАВКИ",
        cash: "НАЛИЧНЫМИ",
        workingDays: "РАБОЧИХ ДНЕЙ",
        digitalVerification: "ЦИФРОВАЯ ПРОВЕРКА",
        page: "Страница",
        supplierFirm: "КОМПАНИЯ-ПОСТАВЩИК",
        buyerFirm: "КОМПАНИЯ-ПОКУПАТЕЛЬ"
      }
    }
  },
  de: {
    dashboard: {
      offerDocument: {
        print: "DRUCKEN / HERUNTERLADEN",
        officialDoc: "OFFIZIELLES ANGEBOTSDOKUMENT",
        docNo: "DOKUMENTEN-NR.",
        sellerInfo: "VERKÄUFERINFORMATIONEN",
        authorized: "Bevollmächtigt",
        taxNo: "Steuer-Nr.",
        buyerInfo: "KÄUFERINFORMATIONEN",
        description: "DIENSTLEISTUNG / PRODUKTBESCHREIBUNG",
        quantity: "MENGE",
        unitPrice: "EINZELPREIS (ZZGL. MWST)",
        totalPrice: "GESAMTPREIS (ZZGL. MWST)",
        category: "Kategorie",
        unitAdet: "Stück",
        digitalNotice: "* Dieses Angebot wurde digital auf ProcureOS erstellt.",
        grandTotal: "GESAMTSUMME",
        paymentTerms: "ZAHLUNGS- UND LIEFERBEDINGUNGEN",
        paymentTermLabel: "ZAHLUNGSZIEL",
        deliveryTermLabel: "LIEFERTERMIN",
        cash: "BARZAHLUNG",
        workingDays: "WERKTAGE",
        digitalVerification: "DIGITALE VERIFIZIERUNG",
        page: "Seite",
        supplierFirm: "LIEFERANTENFIRMA",
        buyerFirm: "KÄUFERFIRMA"
      }
    }
  },
  fr: {
    dashboard: {
      offerDocument: {
        print: "IMPRIMER / TÉLÉCHARGER",
        officialDoc: "DOCUMENT DE DEVIS OFFICIEL",
        docNo: "DOCUMENT Nº",
        sellerInfo: "INFORMATIONS SUR LE VENDEUR",
        authorized: "Autorisé",
        taxNo: "Nº TVA",
        buyerInfo: "INFORMATIONS SUR L'ACHETEUR",
        description: "DESCRIPTION DU SERVICE / PRODUIT",
        quantity: "QUANTITÉ",
        unitPrice: "PRIX UNITAIRE (HT)",
        totalPrice: "TOTAL (HT)",
        category: "Catégorie",
        unitAdet: "Unité",
        digitalNotice: "* Ce devis a été généré numériquement sur ProcureOS.",
        grandTotal: "TOTAL GÉNÉRAL",
        paymentTerms: "CONDITIONS DE PAIEMENT ET LIVRAISON",
        paymentTermLabel: "DÉLAI DE PAIEMENT",
        deliveryTermLabel: "DÉLAI DE LIVRAISON",
        cash: "COMPTANT",
        workingDays: "JOURS OUVRABLES",
        digitalVerification: "VÉRIFICATION NUMÉRIQUE",
        page: "Page",
        supplierFirm: "ENTREPRISE FOURNISSEUR",
        buyerFirm: "ENTREPRISE ACHETEUR"
      }
    }
  },
  ja: {
    dashboard: {
      offerDocument: {
        print: "印刷 / ダウンロード",
        officialDoc: "公式見積書",
        docNo: "書類番号",
        sellerInfo: "販売者情報",
        authorized: "担当者",
        taxNo: "登録番号",
        buyerInfo: "購入者情報",
        description: "サービス / 製品内容",
        quantity: "数量",
        unitPrice: "単価（税抜）",
        totalPrice: "合計金額（税抜）",
        category: "カテゴリー",
        unitAdet: "個",
        digitalNotice: "* この見積書は ProcureOS でデジタル作成されました。",
        grandTotal: "総合計",
        paymentTerms: "支払いおよび配送条件",
        paymentTermLabel: "支払い期限",
        deliveryTermLabel: "納期",
        cash: "現金払い",
        workingDays: "営業日",
        digitalVerification: "デジタル検証",
        page: "ページ",
        supplierFirm: "サプライヤー企業",
        buyerFirm: "購入者企業"
      }
    }
  },
  zh: {
    dashboard: {
      offerDocument: {
        print: "打印 / 下载",
        officialDoc: "正式报价单",
        docNo: "文件编号",
        sellerInfo: "卖家信息",
        authorized: "授权人",
        taxNo: "税号",
        buyerInfo: "买家信息",
        description: "服务 / 产品描述",
        quantity: "数量",
        unitPrice: "单价（不含税）",
        totalPrice: "总价（不含税）",
        category: "类别",
        unitAdet: "个",
        digitalNotice: "* 本报价单在 ProcureOS 上以数字化方式生成。",
        grandTotal: "总计",
        paymentTerms: "付款及交货条件",
        paymentTermLabel: "付款期限",
        deliveryTermLabel: "交货期限",
        cash: "现金",
        workingDays: "工作日",
        digitalVerification: "数字化验证",
        page: "第",
        supplierFirm: "供应方公司",
        buyerFirm: "采购方公司"
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
  data.dashboard.offerDocument = translations[lang].dashboard.offerDocument;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated dashboard.offerDocument in ${lang}.json`);
}
