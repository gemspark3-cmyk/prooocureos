const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
  tr: {
    footer: {
      faq: "SSS",
      reviews: "YORUMLAR",
      terms: "KULLANIM ŞARTLARI",
      privacy: "GİZLİLİK POLİTİKASI",
      cookies: "ÇEREZLER",
      joinAsSupplier: "TEDARİKÇİ OLUN"
    }
  },
  en: {
    footer: {
      faq: "FAQ",
      reviews: "REVIEWS",
      terms: "TERMS OF USE",
      privacy: "PRIVACY POLICY",
      cookies: "COOKIES",
      joinAsSupplier: "BECOME A SUPPLIER"
    }
  },
  ru: {
    footer: {
      faq: "ЧАВО",
      reviews: "ОТЗЫВЫ",
      terms: "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ",
      privacy: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
      cookies: "COOKIES",
      joinAsSupplier: "СТАТЬ ПОСТАВЩИКОМ"
    }
  },
  de: {
    footer: {
      faq: "FAQ",
      reviews: "BEWERTUNGEN",
      terms: "NUTZUNGSBEDINGUNGEN",
      privacy: "DATENSCHUTZERKLÄRUNG",
      cookies: "COOKIES",
      joinAsSupplier: "LIEFERANT WERDEN"
    }
  },
  fr: {
    footer: {
      faq: "FAQ",
      reviews: "AVIS",
      terms: "CONDITIONS D'UTILISATION",
      privacy: "POLITIQUE DE CONFIDENTIALITÉ",
      cookies: "COOKIES",
      joinAsSupplier: "DEVENIR FOURNISSEUR"
    }
  },
  ja: {
    footer: {
      faq: "よくある質問",
      reviews: "レビュー",
      terms: "利用規約",
      privacy: "プライバシーポリシー",
      cookies: "クッキー",
      joinAsSupplier: "サプライヤーになる"
    }
  },
  zh: {
    footer: {
      faq: "常见问题",
      reviews: "评价",
      terms: "使用条款",
      privacy: "隐私政策",
      cookies: "Cookie 设置",
      joinAsSupplier: "成为供应商"
    }
  }
};

const langs = Object.keys(translations);

for (const lang of langs) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.footer = data.footer || {};
  
  // Merge new translations
  Object.assign(data.footer, translations[lang].footer);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated footer translations in ${lang}.json`);
}
