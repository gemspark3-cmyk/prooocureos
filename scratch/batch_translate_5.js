const fs = require('fs');
const path = require('path');

const translations = {
    "ja": {
        "common.title": "ProcureOS",
        "common.buyerPortal": "バイヤーポータル",
        "common.logout": "ログアウト",
        "common.login": "ログイン",
        "common.register": "新規登録",
        "common.allCategories": "すべてのカテゴリ",
        "dashboard.tabs.requests": "依頼一覧",
        "dashboard.tabs.orders": "注文一覧",
        "dashboard.tabs.profile": "プロフィール",
        "marketplace.heroTitle": "グローバルな供給を発見する",
        "marketplace.searchButton": "検索"
    },
    "zh": {
        "common.title": "ProcureOS",
        "common.buyerPortal": "买家门户",
        "common.logout": "登出",
        "common.login": "登录",
        "common.register": "注册",
        "common.allCategories": "所有类别",
        "dashboard.tabs.requests": "我的请求",
        "dashboard.tabs.orders": "我的订单",
        "dashboard.tabs.profile": "个人资料",
        "marketplace.heroTitle": "探索全球供应",
        "marketplace.searchButton": "搜索"
    }
};

const messagesDir = path.join(process.cwd(), 'messages');

for (const lang in translations) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    for (const fullKey in translations[lang]) {
        const value = translations[lang][fullKey];
        const keys = fullKey.split('.');
        let current = data;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('Batch update 5 (JA, ZH Core) completed.');
