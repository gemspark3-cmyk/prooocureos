const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
  tr: {
    common: {
      close: "KAPAT"
    },
    dashboard: {
      notifications: {
        title: "Bildirim Merkezi"
      }
    }
  },
  en: {
    common: {
      close: "CLOSE"
    },
    dashboard: {
      notifications: {
        title: "Notification Center"
      }
    }
  },
  ru: {
    common: {
      close: "ЗАКРЫТЬ"
    },
    dashboard: {
      notifications: {
        title: "Центр уведомлений"
      }
    }
  },
  de: {
    common: {
      close: "SCHLIESSEN"
    },
    dashboard: {
      notifications: {
        title: "Benachrichtigungszentrum"
      }
    }
  },
  fr: {
    common: {
      close: "FERMER"
    },
    dashboard: {
      notifications: {
        title: "Centre de notifications"
      }
    }
  },
  ja: {
    common: {
      close: "閉じる"
    },
    dashboard: {
      notifications: {
        title: "通知センター"
      }
    }
  },
  zh: {
    common: {
      close: "关闭"
    },
    dashboard: {
      notifications: {
        title: "通知中心"
      }
    }
  }
};

const langs = Object.keys(translations);

for (const lang of langs) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Update common.close
  data.common = data.common || {};
  data.common.close = translations[lang].common.close;
  
  // Update dashboard.notifications
  data.dashboard = data.dashboard || {};
  data.dashboard.notifications = translations[lang].dashboard.notifications;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated common.close and dashboard.notifications in ${lang}.json`);
}
