const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const errorTranslations = {
    "tr": {
        "systemErrors": {
            "default": "Bir hata oluştu. Lütfen tekrar deneyin.",
            "authFailed": "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.",
            "sessionExpired": "Oturum süreniz doldu. Lütfen tekrar giriş yapın.",
            "forbidden": "Bu işlem için yetkiniz bulunmuyor.",
            "serverError": "Sunucu hatası oluştu. Teknik ekip bilgilendirildi.",
            "networkError": "Bağlantı hatası. İnternet bağlantınızı kontrol edin.",
            "validationError": "Lütfen formdaki eksik veya hatalı alanları düzeltin.",
            "emailExists": "Bu e-posta adresi zaten kullanımda.",
            "tooManyRequests": "Çok fazla istek yapıldı. Lütfen biraz bekleyin."
        }
    },
    "en": {
        "systemErrors": {
            "default": "An error occurred. Please try again.",
            "authFailed": "Login failed. Please check your credentials.",
            "sessionExpired": "Your session has expired. Please log in again.",
            "forbidden": "You do not have permission for this action.",
            "serverError": "A server error occurred. Our team has been notified.",
            "networkError": "Connection error. Please check your internet connection.",
            "validationError": "Please correct the missing or incorrect fields in the form.",
            "emailExists": "This email address is already in use.",
            "tooManyRequests": "Too many requests. Please wait a moment."
        }
    },
    "de": {
        "systemErrors": {
            "default": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
            "authFailed": "Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.",
            "sessionExpired": "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.",
            "forbidden": "Sie haben keine Berechtigung für diese Aktion.",
            "serverError": "Ein Serverfehler ist aufgetreten. Unser Team wurde benachrichtigt.",
            "networkError": "Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.",
            "validationError": "Bitte korrigieren Sie die fehlenden oder falschen Felder im Formular.",
            "emailExists": "Diese E-Mail-Adresse wird bereits verwendet.",
            "tooManyRequests": "Zu viele Anfragen. Bitte warten Sie einen Moment."
        }
    },
    "fr": {
        "systemErrors": {
            "default": "Une erreur est survenue. Veuillez réessayer.",
            "authFailed": "Échec de la connexion. Veuillez vérifier vos identifiants.",
            "sessionExpired": "Votre session a expiré. Veuillez vous reconnecter.",
            "forbidden": "Vous n'avez pas la permission pour cette action.",
            "serverError": "Une erreur de serveur est survenue. Notre équipe a été prévenue.",
            "networkError": "Erreur de connexion. Veuillez vérifier votre connexion internet.",
            "validationError": "Veuillez corriger les champs manquants ou incorrects dans le formulaire.",
            "emailExists": "Cette adresse e-mail est déjà utilisée.",
            "tooManyRequests": "Trop de requêtes. Veuillez patienter un instant."
        }
    },
    "ru": {
        "systemErrors": {
            "default": "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
            "authFailed": "Ошибка входа. Пожалуйста, проверьте свои учетные данные.",
            "sessionExpired": "Срок действия вашей сессии истек. Пожалуйста, войдите снова.",
            "forbidden": "У вас нет прав для этого действия.",
            "serverError": "Произошла ошибка сервера. Наша команда уведомлена.",
            "networkError": "Ошибка соединения. Пожалуйста, проверьте подключение к интернету.",
            "validationError": "Пожалуйста, исправьте пропущенные или неверные поля в форме.",
            "emailExists": "Этот адрес электронной почты уже используется.",
            "tooManyRequests": "Слишком много запросов. Пожалуйста, подождите немного."
        }
    },
    "ja": {
        "systemErrors": {
            "default": "エラーが発生しました。もう一度お試しください。",
            "authFailed": "ログインに失敗しました。認証情報を確認してください。",
            "sessionExpired": "セッションの有効期限が切れました。再度ログインしてください。",
            "forbidden": "この操作を行う権限がありません。",
            "serverError": "サーバーエラーが発生しました。チームに通知されました。",
            "networkError": "接続エラー。インターネット接続を確認してください。",
            "validationError": "フォームの未入力または誤った項目を修正してください。",
            "emailExists": "このメールアドレスは既に使用されています。",
            "tooManyRequests": "リクエストが多すぎます。しばらくお待ちください。"
        }
    },
    "zh": {
        "systemErrors": {
            "default": "发生错误。请重试。",
            "authFailed": "登录失败。请检查您的凭据。",
            "sessionExpired": "您的会话已过期。请重新登录。",
            "forbidden": "您没有权限执行此操作。",
            "serverError": "发生服务器错误。我们的团队已收到通知。",
            "networkError": "连接错误。请检查您的互联网连接。",
            "validationError": "请纠正表中缺失或错误的字段。",
            "emailExists": "此电子邮件地址已被使用。",
            "tooManyRequests": "请求过多。请稍候。"
        }
    }
};

const langs = Object.keys(errorTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.systemErrors = errorTranslations[lang].systemErrors;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added systemErrors to ${lang}.json`);
}
