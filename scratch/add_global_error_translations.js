const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const errorTranslations = {
    "tr": {
        "globalError": {
            "title": "BEKLENMEDİK BİR HATA",
            "subtitle": "Sistem üzerinde bir kesinti oluştu.",
            "description": "Hata otomatik olarak teknik ekibimize raporlandı. Lütfen sayfayı yenilemeyi deneyin.",
            "retry": "TEKRAR DENE"
        }
    },
    "en": {
        "globalError": {
            "title": "UNEXPECTED ERROR",
            "subtitle": "A system interruption has occurred.",
            "description": "The error has been automatically reported to our technical team. Please try refreshing the page.",
            "retry": "TRY AGAIN"
        }
    },
    "de": {
        "globalError": {
            "title": "UNERWARTETER FEHLER",
            "subtitle": "Eine Systemunterbrechung ist aufgetreten.",
            "description": "Der Fehler wurde automatisch an unser technisches Team gemeldet. Bitte versuchen Sie, die Seite neu zu laden.",
            "retry": "ERNEUT VERSUCHEN"
        }
    },
    "fr": {
        "globalError": {
            "title": "ERREUR INATTENDUE",
            "subtitle": "Une interruption du système s'est produite.",
            "description": "L'erreur a été automatiquement signalée à notre équipe technique. Veuillez essayer de rafraîchir la page.",
            "retry": "RÉESSAYER"
        }
    },
    "ru": {
        "globalError": {
            "title": "НЕПРЕДВИДЕННАЯ ОШИБКА",
            "subtitle": "Произошел системный сбой.",
            "description": "Ошибка была автоматически отправлена нашей технической группе. Пожалуйста, попробуйте обновить страницу.",
            "retry": "ПОПРОБОВАТЬ СНОВА"
        }
    },
    "ja": {
        "globalError": {
            "title": "予期せぬエラー",
            "subtitle": "システムの中断が発生しました。",
            "description": "エラーは自動的に技術チームに報告されました。ページを更新してみてください。",
            "retry": "再試行"
        }
    },
    "zh": {
        "globalError": {
            "title": "意外错误",
            "subtitle": "系统发生中断。",
            "description": "错误已自动报告给我们的技术团队。请尝试刷新页面。",
            "retry": "重试"
        }
    }
};

const langs = Object.keys(errorTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.globalError = errorTranslations[lang].globalError;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added globalError to ${lang}.json`);
}
