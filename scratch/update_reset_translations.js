const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const resetTranslations = {
    "tr": {
        "resetPassword": {
            "title": "Yeni Şifre",
            "subtitle": "Hesabınız için yeni ve güvenli bir şifre belirleyin.",
            "passwordLabel": "Yeni Şifre",
            "confirmPasswordLabel": "Şifre Tekrar",
            "submit": "ŞİFREYİ GÜNCELLE",
            "successTitle": "BAŞARILI!",
            "successMessage": "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz...",
            "errorMismatch": "Şifreler eşleşmiyor.",
            "errorDefault": "Geçersiz veya süresi dolmuş link.",
            "errorInvalidToken": "Geçersiz sıfırlama linki!",
            "successToast": "Şifreniz başarıyla güncellendi."
        }
    },
    "en": {
        "resetPassword": {
            "title": "New Password",
            "subtitle": "Set a new and secure password for your account.",
            "passwordLabel": "New Password",
            "confirmPasswordLabel": "Confirm Password",
            "submit": "UPDATE PASSWORD",
            "successTitle": "SUCCESS!",
            "successMessage": "Your password has been updated. Redirecting to login...",
            "errorMismatch": "Passwords do not match.",
            "errorDefault": "Invalid or expired link.",
            "errorInvalidToken": "Invalid reset link!",
            "successToast": "Your password has been successfully updated."
        }
    },
    "de": {
        "resetPassword": {
            "title": "Neues Passwort",
            "subtitle": "Legen Sie ein neues ve sicheres Passwort für Ihr Konto fest.",
            "passwordLabel": "Neues Passwort",
            "confirmPasswordLabel": "Passwort bestätigen",
            "submit": "PASSWORT AKTUALISIEREN",
            "successTitle": "ERFOLG!",
            "successMessage": "Ihr Passwort wurde aktualisiert. Weiterleitung zum Login...",
            "errorMismatch": "Passwörter stimmen nicht überein.",
            "errorDefault": "Ungültiger oder abgelaufener Link.",
            "errorInvalidToken": "Ungültiger Reset-Link!",
            "successToast": "Ihr Passwort wurde erfolgreich aktualisiert."
        }
    },
    "fr": {
        "resetPassword": {
            "title": "Nouveau mot de passe",
            "subtitle": "Définissez un nouveau mot de passe sécurisé pour votre compte.",
            "passwordLabel": "Nouveau mot de passe",
            "confirmPasswordLabel": "Confirmer le mot de passe",
            "submit": "METTRE À JOUR LE MOT DE PASSE",
            "successTitle": "SUCCÈS !",
            "successMessage": "Votre mot de passe a été mis à jour. Redirection vers la connexion...",
            "errorMismatch": "Les mots de passe ne correspondent pas.",
            "errorDefault": "Lien invalide ou expiré.",
            "errorInvalidToken": "Lien de réinitialisation invalide !",
            "successToast": "Votre mot de passe a été mis à jour avec succès."
        }
    },
    "ru": {
        "resetPassword": {
            "title": "Новый пароль",
            "subtitle": "Установите новый надежный пароль для вашей учетной записи.",
            "passwordLabel": "Новый пароль",
            "confirmPasswordLabel": "Подтвердите пароль",
            "submit": "ОБНОВИТЬ ПАРОЛЬ",
            "successTitle": "УСПЕХ!",
            "successMessage": "Ваш пароль обновлен. Перенаправление на страницу входа...",
            "errorMismatch": "Пароли не совпадают.",
            "errorDefault": "Недействительная или просроченная ссылка.",
            "errorInvalidToken": "Недействительная ссылка для сброса!",
            "successToast": "Ваш пароль был успешно обновлен."
        }
    },
    "ja": {
        "resetPassword": {
            "title": "新しいパスワード",
            "subtitle": "アカウントの新しい安全なパスワードを設定してください。",
            "passwordLabel": "新しいパスワード",
            "confirmPasswordLabel": "パスワード（確認）",
            "submit": "パスワードを更新",
            "successTitle": "成功！",
            "successMessage": "パスワードが更新されました。ログイン画面に移動します...",
            "errorMismatch": "パスワードが一致しません。",
            "errorDefault": "無効または期限切れのリンクです。",
            "errorInvalidToken": "無効な再設定リンクです！",
            "successToast": "パスワードが正常に更新されました。"
        }
    },
    "zh": {
        "resetPassword": {
            "title": "新密码",
            "subtitle": "为您的账户设置一个新的安全密码。",
            "passwordLabel": "新密码",
            "confirmPasswordLabel": "确认密码",
            "submit": "更新密码",
            "successTitle": "成功！",
            "successMessage": "您的密码已更新。正在跳转至登录页面...",
            "errorMismatch": "密码不匹配。",
            "errorDefault": "链接无效或已过期。",
            "errorInvalidToken": "无效的重置链接！",
            "successToast": "您的密码已成功更新。"
        }
    }
};

const langs = Object.keys(resetTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.auth = data.auth || {};
    data.auth.resetPassword = resetTranslations[lang].resetPassword;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated resetPassword translations for ${lang}.json`);
}
