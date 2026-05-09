const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const authTranslations = {
    "tr": {
        "auth": {
            "login": {
                "title": "Hoş Geldiniz",
                "subtitle": "ProcureOS Alıcı Portalı",
                "emailLabel": "E-Posta Adresi",
                "emailPlaceholder": "e-posta@sirket.com",
                "passwordLabel": "Şifre",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "Unuttum?",
                "submit": "SİSTEME GİRİŞ",
                "noAccount": "Henüz hesabınız yok mu?",
                "registerLink": "Kayıt Olun",
                "success": "Başarıyla giriş yapıldı!",
                "errorDefault": "Giriş işlemi başarısız oldu.",
                "passwordError": "Şifre hatalı veya eksik.",
                "registeredSuccess": "Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.",
                "termsText": "Giriş yaparak {terms} ve {privacy} politikalarımızı kabul etmiş olursunuz."
            },
            "register": {
                "title": "Bize Katılın",
                "subtitle": "Otonom Tedarik Dünyasına Adım Atın",
                "companyNameLabel": "Şirket Adı",
                "companyNamePlaceholder": "Şirket Tam Adı",
                "contactPersonLabel": "Yetkili Kişi",
                "contactPersonPlaceholder": "Ad Soyad",
                "phoneLabel": "Telefon Numarası",
                "phonePlaceholder": "+90 5xx xxx xx xx",
                "emailLabel": "E-Posta Adresi",
                "emailPlaceholder": "e-posta@sirket.com",
                "passwordLabel": "Şifre",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "Şifre Onay",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "HESAP OLUŞTUR",
                "haveAccount": "Zaten hesabınız var mı?",
                "loginLink": "Giriş Yapın",
                "errorMatch": "Şifreler birbiriyle eşleşmiyor.",
                "errorLength": "Şifreniz en az 8 karakter olmalıdır.",
                "errorDefault": "Kayıt işlemi başarısız oldu.",
                "termsText": "Hesap oluşturarak {terms} ve {privacy} politikalarımızı kabul etmiş olursunuz.",
                "features": {
                    "global": "Global Erişim",
                    "secure": "Güvenli Ödeme",
                    "fast": "Hızlı Eşleşme"
                }
            },
            "forgotPassword": {
                "title": "Şifre Sıfırlama",
                "subtitle": "E-posta adresinize bir sıfırlama linki göndereceğiz.",
                "submit": "TALİMATLARI GÖNDER",
                "success": "Sıfırlama e-postası gönderildi.",
                "error": "Hata oluştu."
            }
        }
    },
    "en": {
        "auth": {
            "login": {
                "title": "Welcome",
                "subtitle": "ProcureOS Buyer Portal",
                "emailLabel": "Email Address",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "Password",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "Forgot?",
                "submit": "LOGIN TO SYSTEM",
                "noAccount": "Don't have an account yet?",
                "registerLink": "Register Now",
                "success": "Successfully logged in!",
                "errorDefault": "Login failed.",
                "passwordError": "Password incorrect or missing.",
                "registeredSuccess": "Your account has been successfully created. You can now log in.",
                "termsText": "By logging in, you agree to our {terms} and {privacy}."
            },
            "register": {
                "title": "Join Us",
                "subtitle": "Step into the World of Autonomous Sourcing",
                "companyNameLabel": "Company Name",
                "companyNamePlaceholder": "Full Company Name",
                "contactPersonLabel": "Contact Person",
                "contactPersonPlaceholder": "First and Last Name",
                "phoneLabel": "Phone Number",
                "phonePlaceholder": "+1 xxx xxx xx xx",
                "emailLabel": "Email Address",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "Password",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "Confirm Password",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "CREATE ACCOUNT",
                "haveAccount": "Already have an account?",
                "loginLink": "Login",
                "errorMatch": "Passwords do not match.",
                "errorLength": "Password must be at least 8 characters.",
                "errorDefault": "Registration failed.",
                "termsText": "By creating an account, you agree to our {terms} and {privacy}.",
                "features": {
                    "global": "Global Access",
                    "secure": "Secure Payment",
                    "fast": "Fast Match"
                }
            },
            "forgotPassword": {
                "title": "Reset Password",
                "subtitle": "We will send a reset link to your email address.",
                "submit": "SEND INSTRUCTIONS",
                "success": "Reset email sent.",
                "error": "An error occurred."
            }
        }
    },
    "de": {
        "auth": {
            "login": {
                "title": "Willkommen",
                "subtitle": "ProcureOS Käuferportal",
                "emailLabel": "E-Mail-Adresse",
                "emailPlaceholder": "e-mail@unternehmen.com",
                "passwordLabel": "Passwort",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "Vergessen?",
                "submit": "IM SYSTEM ANMELDEN",
                "noAccount": "Noch kein Konto?",
                "registerLink": "Jetzt registrieren",
                "success": "Erfolgreich angemeldet!",
                "errorDefault": "Anmeldung fehlgeschlagen.",
                "passwordError": "Passwort falsch oder fehlt.",
                "registeredSuccess": "Ihr Konto wurde erfolgreich erstellt. Sie können sich jetzt anmelden.",
                "termsText": "Mit der Anmeldung stimmen Sie unseren {terms} und {privacy} zu."
            },
            "register": {
                "title": "Machen Sie mit",
                "subtitle": "Treten Sie ein in die Welt der autonomen Beschaffung",
                "companyNameLabel": "Firmenname",
                "companyNamePlaceholder": "Vollständiger Firmenname",
                "contactPersonLabel": "Ansprechpartner",
                "contactPersonPlaceholder": "Vor- und Nachname",
                "phoneLabel": "Telefonnummer",
                "phonePlaceholder": "+49 xxx xxx xx xx",
                "emailLabel": "E-Mail-Adresse",
                "emailPlaceholder": "e-mail@unternehmen.com",
                "passwordLabel": "Passwort",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "Passwort bestätigen",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "KONTO ERSTELLEN",
                "haveAccount": "Haben Sie bereits ein Konto?",
                "loginLink": "Anmelden",
                "errorMatch": "Passwörter stimmen nicht überein.",
                "errorLength": "Passwort muss mindestens 8 Zeichen lang sein.",
                "errorDefault": "Registrierung fehlgeschlagen.",
                "termsText": "Mit der Erstellung eines Kontos stimmen Sie unseren {terms} und {privacy} zu.",
                "features": {
                    "global": "Globaler Zugang",
                    "secure": "Sichere Zahlung",
                    "fast": "Schneller Abgleich"
                }
            },
            "forgotPassword": {
                "title": "Passwort zurücksetzen",
                "subtitle": "Wir senden einen Link zum Zurücksetzen an Ihre E-Mail-Adresse.",
                "submit": "ANWEISUNGEN SENDEN",
                "success": "E-Mail zum Zurücksetzen gesendet.",
                "error": "Ein Fehler ist aufgetreten."
            }
        }
    },
    "fr": {
        "auth": {
            "login": {
                "title": "Bienvenue",
                "subtitle": "Portail Acheteur ProcureOS",
                "emailLabel": "Adresse E-mail",
                "emailPlaceholder": "e-mail@entreprise.com",
                "passwordLabel": "Mot de passe",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "Oublié ?",
                "submit": "SE CONNECTER AU SYSTÈME",
                "noAccount": "Pas encore de compte ?",
                "registerLink": "Inscrivez-vous maintenant",
                "success": "Connexion réussie !",
                "errorDefault": "Échec de la connexion.",
                "passwordError": "Mot de passe incorrect ou manquant.",
                "registeredSuccess": "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
                "termsText": "En vous connectant, vous acceptez nos {terms} et notre {privacy}."
            },
            "register": {
                "title": "Rejoignez-nous",
                "subtitle": "Entrez dans le monde du sourcing autonome",
                "companyNameLabel": "Nom de l'entreprise",
                "companyNamePlaceholder": "Nom complet de l'entreprise",
                "contactPersonLabel": "Personne de contact",
                "contactPersonPlaceholder": "Nom et Prénom",
                "phoneLabel": "Numéro de téléphone",
                "phonePlaceholder": "+33 xxx xxx xx xx",
                "emailLabel": "Adresse E-mail",
                "emailPlaceholder": "e-mail@entreprise.com",
                "passwordLabel": "Mot de passe",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "Confirmer le mot de passe",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "CRÉER UN COMPTE",
                "haveAccount": "Vous avez déjà un compte ?",
                "loginLink": "Se connecter",
                "errorMatch": "Les mots de passe ne correspondent pas.",
                "errorLength": "Le mot de passe doit comporter au moins 8 caractères.",
                "errorDefault": "Échec de l'inscription.",
                "termsText": "En créant un compte, vous acceptez nos {terms} et notre {privacy}.",
                "features": {
                    "global": "Accès Global",
                    "secure": "Paiement Sécurisé",
                    "fast": "Match Rapide"
                }
            },
            "forgotPassword": {
                "title": "Réinitialiser le mot de passe",
                "subtitle": "Nous enverrons un lien de réinitialisation à votre adresse e-mail.",
                "submit": "ENVOYER LES INSTRUCTIONS",
                "success": "E-mail de réinitialisation envoyé.",
                "error": "Une erreur est survenue."
            }
        }
    },
    "ru": {
        "auth": {
            "login": {
                "title": "Добро пожаловать",
                "subtitle": "Портал покупателя ProcureOS",
                "emailLabel": "Адрес электронной почты",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "Пароль",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "Забыли?",
                "submit": "ВОЙТИ В СИСТЕМУ",
                "noAccount": "Еще нет аккаунта?",
                "registerLink": "Зарегистрируйтесь сейчас",
                "success": "Успешный вход!",
                "errorDefault": "Ошибка входа.",
                "passwordError": "Пароль неверный или отсутствует.",
                "registeredSuccess": "Ваш аккаунт успешно создан. Теперь вы можете войти.",
                "termsText": "Войдя в систему, вы соглашаетесь с нашими {terms} и {privacy}."
            },
            "register": {
                "title": "Присоединяйтесь к нам",
                "subtitle": "Шагните в мир автономного сорсинга",
                "companyNameLabel": "Название компании",
                "companyNamePlaceholder": "Полное название компании",
                "contactPersonLabel": "Контактное лицо",
                "contactPersonPlaceholder": "Имя и фамилия",
                "phoneLabel": "Номер телефона",
                "phonePlaceholder": "+7 xxx xxx xx xx",
                "emailLabel": "Адрес электронной почты",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "Пароль",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "Подтвердите пароль",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "СОЗДАТЬ АККАУНТ",
                "haveAccount": "Уже есть аккаунт?",
                "loginLink": "Войти",
                "errorMatch": "Пароли не совпадают.",
                "errorLength": "Пароль должен содержать не менее 8 символов.",
                "errorDefault": "Ошибка регистрации.",
                "termsText": "Создавая аккаунт, вы соглашаетесь с нашими {terms} и {privacy}.",
                "features": {
                    "global": "Глобальный доступ",
                    "secure": "Безопасная оплата",
                    "fast": "Быстрый подбор"
                }
            },
            "forgotPassword": {
                "title": "Сброс пароля",
                "subtitle": "Мы отправим ссылку для сброса на ваш адрес электронной почты.",
                "submit": "ОТПРАВИТЬ ИНСТРУКЦИИ",
                "success": "Письмо для сброса отправлено.",
                "error": "Произошла ошибка."
            }
        }
    },
    "ja": {
        "auth": {
            "login": {
                "title": "おかえりなさい",
                "subtitle": "ProcureOS バイヤーポータル",
                "emailLabel": "メールアドレス",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "パスワード",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "忘れた場合",
                "submit": "システムにログイン",
                "noAccount": "まだアカウントをお持ちではありませんか？",
                "registerLink": "今すぐ登録",
                "success": "ログインに成功しました！",
                "errorDefault": "ログインに失敗しました。",
                "passwordError": "パスワードが正しくないか、入力されていません。",
                "registeredSuccess": "アカウントが正常に作成されました。ログインできるようになりました。",
                "termsText": "ログインすることにより、{terms}と{privacy}に同意したことになります。"
            },
            "register": {
                "title": "参加する",
                "subtitle": "自律型ソーシングの世界へ",
                "companyNameLabel": "会社名",
                "companyNamePlaceholder": "会社正式名称",
                "contactPersonLabel": "担当者",
                "contactPersonPlaceholder": "氏名",
                "phoneLabel": "電話番号",
                "phonePlaceholder": "+81 xxx xxx xx xx",
                "emailLabel": "メールアドレス",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "パスワード",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "パスワード（確認）",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "アカウント作成",
                "haveAccount": "すでにアカウントをお持ちですか？",
                "loginLink": "ログイン",
                "errorMatch": "パスワードが一致しません。",
                "errorLength": "パスワードは8文字以上である必要があります。",
                "errorDefault": "登録に失敗しました。",
                "termsText": "アカウントを作成することにより、{terms}と{privacy}に同意したことになります。",
                "features": {
                    "global": "グローバルアクセス",
                    "secure": "安全な決済",
                    "fast": "迅速なマッチング"
                }
            },
            "forgotPassword": {
                "title": "パスワードの再設定",
                "subtitle": "メールアドレスに再設定リンクを送信します。",
                "submit": "指示を送信",
                "success": "再設定メールを送信しました。",
                "error": "エラーが発生しました。"
            }
        }
    },
    "zh": {
        "auth": {
            "login": {
                "title": "欢迎回来",
                "subtitle": "ProcureOS 买家门户",
                "emailLabel": "电子邮箱",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "密码",
                "passwordPlaceholder": "••••••••",
                "forgotPassword": "忘记密码？",
                "submit": "登录系统",
                "noAccount": "还没有账号？",
                "registerLink": "立即注册",
                "success": "登录成功！",
                "errorDefault": "登录失败。",
                "passwordError": "密码错误或未填写。",
                "registeredSuccess": "您的账号已成功创建。现在可以登录了。",
                "termsText": "登录即表示您同意我们的{terms}和{privacy}。"
            },
            "register": {
                "title": "加入我们",
                "subtitle": "步入自治采购的世界",
                "companyNameLabel": "公司名称",
                "companyNamePlaceholder": "公司全称",
                "contactPersonLabel": "联系人",
                "contactPersonPlaceholder": "姓名",
                "phoneLabel": "电话号码",
                "phonePlaceholder": "+86 xxx xxx xx xx",
                "emailLabel": "电子邮箱",
                "emailPlaceholder": "email@company.com",
                "passwordLabel": "密码",
                "passwordPlaceholder": "••••••••",
                "confirmPasswordLabel": "确认密码",
                "confirmPasswordPlaceholder": "••••••••",
                "submit": "创建账号",
                "haveAccount": "已有账号？",
                "loginLink": "登录",
                "errorMatch": "密码不匹配。",
                "errorLength": "密码长度必须至少为 8 个字符。",
                "errorDefault": "注册失败。",
                "termsText": "创建账号即表示您同意我们的{terms}和{privacy}。",
                "features": {
                    "global": "全球访问",
                    "secure": "安全支付",
                    "fast": "快速匹配"
                }
            },
            "forgotPassword": {
                "title": "重置密码",
                "subtitle": "我们将向您的电子邮箱发送重置链接。",
                "submit": "发送指令",
                "success": "重置邮件已发送。",
                "error": "发生错误。"
            }
        }
    }
};

const langs = Object.keys(authTranslations);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.auth = authTranslations[lang].auth;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added auth translations to ${lang}.json`);
}
