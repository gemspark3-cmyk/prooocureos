const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const deepFixes = {
    "zh": {
        "dashboard": {
            "orders": {
                "processCompleted": "流程已完成",
                "initialPriceOrder": "按初始价格创建的订单",
                "registeredAddress": "公司注册地址...",
                "requestDetail": "请求详情",
                "supplier": "供应商"
            },
            "profile": {
                "corporateAccount": "企业账户",
                "aipVerified": "AIP-103 已验证",
                "sections": {
                    "corporate": "公司信息",
                    "contact": "联系信息",
                    "financial": "财务设置",
                    "warehouse": "仓库管理"
                },
                "fields": {
                    "companyName": "公司法定名称",
                    "website": "公司网站",
                    "taxId": "税号",
                    "taxOffice": "税务局",
                    "tradeRegistry": "商业登记号",
                    "mersis": "MERSIS 号",
                    "industry": "行业",
                    "employeeCount": "员工人数",
                    "establishmentYear": "成立年份",
                    "fullAddress": "详细地址",
                    "city": "城市",
                    "country": "国家",
                    "postalCode": "邮政编码",
                    "contactPerson": "联系人",
                    "phone": "电话",
                    "approvalLimit": "审批限额 (USD)",
                    "preferredCurrency": "首选货币",
                    "warehouseName": "仓库名称"
                },
                "placeholders": {
                    "website": "https://www.yourcompany.com",
                    "establishmentYear": "例：1995",
                    "warehouseName": "例：总部主仓库",
                    "city": "上海"
                },
                "buttons": {
                    "addWarehouse": "添加新仓库",
                    "cancel": "取消",
                    "saveWarehouse": "保存仓库",
                    "saveProfile": "保存资料",
                    "saving": "保存中..."
                },
                "messages": {
                    "fillRequired": "请填写仓库名称和详细地址。",
                    "warehouseAdded": "新仓库已成功添加。",
                    "warehouseDeleted": "仓库已删除。",
                    "confirmDelete": "您确定要删除此仓库吗？",
                    "noWarehouses": "尚未添加仓库",
                    "error": "发生错误。"
                },
                "default": "默认",
                "select": "请选择"
            },
            "suppliers": {
                "title": "我的已注册供应商",
                "subtitle": "收藏及合作公司",
                "emptyState": "暂无已注册供应商",
                "removed": "供应商已移除。",
                "error": "发生错误。",
                "trustedPartner": "值得信赖的伙伴",
                "generalSupplier": "普通供应商"
            }
        },
        "marketplace": {
            "comparison": {
                "title": "供应商对比",
                "description": "详细对比您选择的 {count} 家供应商。",
                "noSuppliers": "未找到可对比的供应商。",
                "trustScore": "信任评分",
                "verification": "验证状态",
                "verified": "已验证",
                "serviceRegions": "服务区域",
                "removeFromList": "从列表中移除",
                "bulkQuote": "批量询价 ({count})"
            }
        },
        "sourcing": {
            "steps": {
                "form": {
                    "descriptionSingle": "为您选择的供应商指定产品详情和数量，我们将按企业模板发送。",
                    "descriptionMulti": "指定产品规格和数量，ProcureOS Core 网络将在几秒钟内根据物流数据筛选出最合适的卖家。",
                    "labels": {
                        "note": "买家备注 / 特殊要求 (可选)"
                    },
                    "placeholders": {
                        "title": "例：100根5米长、直径40mm的工业级金属管...",
                        "note": "例：请使用托盘运输...",
                        "quantity": "例：500件",
                        "currency": "例：CNY"
                    },
                    "paymentTerms": {
                        "cash": "现金支付",
                        "30days": "30天账期",
                        "60days": "60天账期"
                    },
                    "buttons": {
                        "processing": "处理中...",
                        "prepare": "准备",
                        "listSuppliers": "列出供应商"
                    }
                },
                "matches": {
                    "titleReady": "您的请求已就绪",
                    "titleMatches": "匹配的供应商",
                    "descriptionSingle": "确认发送给 {name} 的正式采购请求。",
                    "descriptionMulti": "Core 引擎已根据物流和产品类别找到最佳匹配。",
                    "back": "返回",
                    "noSuppliers": "未找到合适的供应商。",
                    "trustScore": "{score}% 信任度",
                    "officialRequest": "正式采购请求",
                    "docNo": "文档编号",
                    "targetQuantity": "目标数量",
                    "targetCurrency": "货币",
                    "paymentTerm": "付款条件",
                    "sendRequest": "发送企业请求",
                    "sending": "正在发送..."
                }
            },
            "errors": {
                "selectSupplier": "请至少选择一家供应商发送报价请求。"
            },
            "address": {
                "change": "更改",
                "mainCompany": "公司主地址"
            }
        }
    },
    "ja": {
        "dashboard": {
            "orders": {
                "processCompleted": "プロセス完了",
                "initialPriceOrder": "初回価格での注文作成",
                "registeredAddress": "登録済みの会社住所...",
                "requestDetail": "依頼詳細",
                "supplier": "サプライヤー"
            },
            "profile": {
                "corporateAccount": "企業アカウント",
                "aipVerified": "AIP-103 認証済み",
                "sections": {
                    "corporate": "企業情報",
                    "contact": "連絡先情報",
                    "financial": "財務設定",
                    "warehouse": "倉庫管理"
                },
                "fields": {
                    "companyName": "会社正式名称",
                    "website": "会社ウェブサイト",
                    "taxId": "納税者番号",
                    "taxOffice": "税務署",
                    "tradeRegistry": "商業登記番号",
                    "mersis": "MERSIS番号",
                    "industry": "業種",
                    "employeeCount": "従業員数",
                    "establishmentYear": "設立年",
                    "fullAddress": "住所",
                    "city": "市区町村",
                    "country": "国",
                    "postalCode": "郵便番号",
                    "contactPerson": "担当者",
                    "phone": "電話番号",
                    "approvalLimit": "承認限度額 (USD)",
                    "preferredCurrency": "通貨",
                    "warehouseName": "倉庫名"
                },
                "placeholders": {
                    "website": "https://www.yourcompany.com",
                    "establishmentYear": "例: 1995",
                    "warehouseName": "例: 東京メイン倉庫",
                    "city": "東京都"
                },
                "buttons": {
                    "addWarehouse": "新規倉庫追加",
                    "cancel": "キャンセル",
                    "saveWarehouse": "倉庫を保存",
                    "saveProfile": "プロフィール保存",
                    "saving": "保存中..."
                },
                "messages": {
                    "fillRequired": "倉庫名と住所を入力してください。",
                    "warehouseAdded": "新しい倉庫が正常に追加されました。",
                    "warehouseDeleted": "倉庫を削除しました。",
                    "confirmDelete": "この倉庫を削除してもよろしいですか？",
                    "noWarehouses": "登録済みの倉庫はありません",
                    "error": "エラーが発生しました。"
                },
                "default": "デフォルト",
                "select": "選択してください"
            },
            "suppliers": {
                "title": "登録済みサプライヤー",
                "subtitle": "お気に入りおよび取引先企業",
                "emptyState": "登録済みのサプライヤーはありません",
                "removed": "サプライヤーを削除しました。",
                "error": "エラーが発生しました。",
                "trustedPartner": "信頼できるパートナー",
                "generalSupplier": "一般サプライヤー"
            }
        },
        "marketplace": {
            "comparison": {
                "title": "企業比較",
                "description": "選択した {count} 社の詳細比較。",
                "noSuppliers": "比較対象の企業が見つかりませんでした。",
                "trustScore": "信頼スコア",
                "verification": "認証ステータス",
                "verified": "認証済み",
                "serviceRegions": "サービス地域",
                "removeFromList": "リストから削除",
                "bulkQuote": "一括見積もり依頼 ({count})"
            }
        },
        "sourcing": {
            "steps": {
                "form": {
                    "descriptionSingle": "選択したサプライヤー向けに製品の詳細と数量を指定してください。企業テンプレートで送信します。",
                    "descriptionMulti": "製品仕様と数量を指定してください。ProcureOS Core エンジンが物流データに基づいて最適な販売者を数秒で抽出します。",
                    "labels": {
                        "note": "購入者メモ / 特記事項 (任意)"
                    },
                    "placeholders": {
                        "title": "例: 100本の5メートル長、直径40mmの工業用金属パイプ...",
                        "note": "例: パレットでの配送を希望します...",
                        "quantity": "例: 500個",
                        "currency": "例: JPY"
                    },
                    "paymentTerms": {
                        "cash": "現金払い",
                        "30days": "30日払い",
                        "60days": "60日払い"
                    },
                    "buttons": {
                        "processing": "処理中...",
                        "prepare": "準備",
                        "listSuppliers": "サプライヤー一覧"
                    }
                },
                "matches": {
                    "titleReady": "依頼準備完了",
                    "titleMatches": "一致したサプライヤー",
                    "descriptionSingle": "{name} 向けの正式な購入依頼を確認してください。",
                    "descriptionMulti": "Core エンジンが物流と製品カテゴリに基づいて最適な一致を見つけました。",
                    "back": "戻る",
                    "noSuppliers": "適切なサプライヤーが見つかりませんでした。",
                    "trustScore": "{score}% 信頼スコア",
                    "officialRequest": "公式購入依頼",
                    "docNo": "ドキュメント番号",
                    "targetQuantity": "目標数量",
                    "targetCurrency": "通貨",
                    "paymentTerm": "支払条件",
                    "sendRequest": "企業依頼を送信",
                    "sending": "送信中..."
                }
            },
            "errors": {
                "selectSupplier": "見積もりを送信するサプライヤーを少なくとも1つ選択してください。"
            },
            "address": {
                "change": "変更",
                "mainCompany": "会社メイン住所"
            }
        }
    }
};

const langs = Object.keys(deepFixes);

for (const lang of langs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep merge function
    const deepMerge = (target, source) => {
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    };
    
    deepMerge(data, deepFixes[lang]);
    
    // Final cleanup of duplicated sections if any
    // (In case some manual edits added redundant keys)
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Deeply cleaned and localized ${lang}.json`);
}
