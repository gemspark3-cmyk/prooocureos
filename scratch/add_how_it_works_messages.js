const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const howItWorksData = {
    "tr": {
        "howItWorks": {
            "title": "Sistemi Keşfedin.",
            "subtitle": "Geleneksel satın alma süreçlerini unutun. AIP-103+ protokolü ile tedarik zincirinizi otonom bir işletim sistemine dönüştürün.",
            "guide": "KURUMSAL REHBER v2.0",
            "usageGuide": "Kullanım Kılavuzu",
            "backToHome": "GİRİŞ EKRANI",
            "simulator": {
                "badge": "Canlı Simülatör (v2.0)",
                "title": "Çoklu Tedarikçi Yönetim Simülasyonu",
                "desc": "Birden fazla firmaya aynı anda teklif talebi gönderme ve otonom eşleşme sürecini deneyimleyin.",
                "searchPlaceholder": "Ne tedarik etmek istiyorsunuz? (Örn: Rulman)",
                "locationPlaceholder": "Lokasyon Filtresi",
                "searchButton": "GLOBAL ARA",
                "searching": "TARANIYOR...",
                "exampleScenario": "Örnek Senaryoyu Başlat",
                "scanning": "AIP-103 Protokolü: Küresel Ağ Taranıyor...",
                "matchedSuppliers": "OTONOM EŞLEŞEN TEDARİKÇİLER ({count})",
                "selectFirms": "Lütfen teklif almak istediğiniz firmaları seçin ({count} Seçili)",
                "supplierCard": {
                    "match": "Eşleşme",
                    "speed": "Hız",
                    "score": "Skor"
                },
                "form": {
                    "badge": "CONCURRENT RFQ MODE (EŞZAMANLI TALEP)",
                    "title": "TOPLU SATIN ALMA TALEBİ",
                    "desc": "Seçilen {count} tedarikçiye aynı anda iletilecektir.",
                    "docGroup": "DOKÜMAN GRUBU",
                    "details": "İhtiyaç Detayları",
                    "quantity": "Miktar",
                    "currency": "Para Birimi",
                    "incoterm": "Teslimat Şartı (Incoterm)",
                    "targetLocation": "Hedef Lokasyon",
                    "validity": "Teklik Geçerlilik Süresi",
                    "submit": "{count} FİRMAYA TEKLİF TALEBİNİ İLET"
                },
                "success": {
                    "title": "TALEPLER İLETİLDİ",
                    "desc": "Seçilen {count} tedarikçiye resmi RFQ dökümanları ve teknik spesifikasyonlar AIP-103 protokolü üzerinden saniyeler içinde iletildi.",
                    "register": "SİSTEME KAYIT OLUN",
                    "newSimulation": "YENİ SİMÜLASYON BAŞLAT"
                }
            },
            "dashboard": {
                "title": "PROFESYONEL OPERASYON PANELİ",
                "subtitle": "Sisteme giriş yaptığınızda sizi bekleyen kurumsal yönetim modülleri.",
                "ops": {
                    "title": "OPERASYON MERKEZİ",
                    "desc": "Tüm aktif RFQ süreçlerinizi, gelen teklifleri ve müzakereleri tek bir ekrandan yönetin.",
                    "f1": "Fiyat Karşılaştırma",
                    "f2": "Karşı Teklif",
                    "f3": "Satın Alma Onayı"
                },
                "log": {
                    "title": "LOJİSTİK TAKİBİ",
                    "desc": "Siparişlerinizin üretim aşamasından kapınıza teslimine kadar tüm süreci izleyin.",
                    "f1": "Sevkiyat Detayları",
                    "f2": "İrsaliye Takibi",
                    "f3": "Teslimat Onayı"
                },
                "team": {
                    "title": "TAKIM YÖNETİMİ",
                    "desc": "Kurumsal hiyerarşinizi sisteme tanımlayın. Satın alma uzmanlarınıza onay limitleri atayın.",
                    "f1": "Onay Limitleri",
                    "f2": "Yetki Tanımlama",
                    "f3": "Departman Raporları"
                },
                "erp": {
                    "title": "ERP ENTEGRASYONU",
                    "desc": "SAP, Oracle, MS Dynamics ve yerel ERP sistemleriyle tam entegrasyon.",
                    "f1": "Otomatik Stok Kaydı",
                    "f2": "API Entegrasyonu",
                    "f3": "Zamanlanmış Senkronizasyon"
                }
            },
            "steps": {
                "step1": { "title": "Akıllı Arama & Keşif", "desc": "Doğal dil işleme motorumuz sayesinde sadece ihtiyacınızı yazın." },
                "step2": { "title": "Otonom RFQ Oluşturma", "desc": "Talebinizi oluşturduğunuzda, sistem otomatik olarak teknik detayları analiz eder." },
                "step3": { "title": "Gerçek Zamanlı Müzakere", "desc": "Tedarikçilerden gelen teklifleri tek bir panelden inceleyin." },
                "step4": { "title": "Güvenli Onay & İzleme", "desc": "Anlaştığınız teklifi onaylayın. Tüm süreç denetim logları ile kayıt altına alınır." }
            },
            "cta": "HEMEN ÜCRETSİZ BAŞLAYIN"
        }
    },
    "en": {
        "howItWorks": {
            "title": "Discover the System.",
            "subtitle": "Forget traditional procurement processes. Transform your supply chain into an autonomous operating system with the AIP-103+ protocol.",
            "guide": "CORPORATE GUIDE v2.0",
            "usageGuide": "User Guide",
            "backToHome": "HOME SCREEN",
            "simulator": {
                "badge": "Live Simulator (v2.0)",
                "title": "Multi-Supplier Management Simulation",
                "desc": "Experience the process of sending quote requests to multiple firms simultaneously and autonomous matching.",
                "searchPlaceholder": "What do you want to procure? (e.g., Bearings)",
                "locationPlaceholder": "Location Filter",
                "searchButton": "GLOBAL SEARCH",
                "searching": "SEARCHING...",
                "exampleScenario": "Start Example Scenario",
                "scanning": "AIP-103 Protocol: Scanning Global Network...",
                "matchedSuppliers": "AUTONOMOUS MATCHED SUPPLIERS ({count})",
                "selectFirms": "Please select the firms you want to receive quotes from ({count} Selected)",
                "supplierCard": {
                    "match": "Match",
                    "speed": "Speed",
                    "score": "Score"
                },
                "form": {
                    "badge": "CONCURRENT RFQ MODE",
                    "title": "BULK PURCHASE REQUEST",
                    "desc": "Will be sent to {count} selected suppliers simultaneously.",
                    "docGroup": "DOCUMENT GROUP",
                    "details": "Requirement Details",
                    "quantity": "Quantity",
                    "currency": "Currency",
                    "incoterm": "Incoterm",
                    "targetLocation": "Target Location",
                    "validity": "Quote Validity Period",
                    "submit": "SEND QUOTE REQUEST TO {count} FIRMS"
                },
                "success": {
                    "title": "REQUESTS SENT",
                    "desc": "Official RFQ documents and technical specifications were sent to {count} selected suppliers via the AIP-103 protocol in seconds.",
                    "register": "REGISTER TO THE SYSTEM",
                    "newSimulation": "START NEW SIMULATION"
                }
            },
            "dashboard": {
                "title": "PROFESSIONAL OPERATION PANEL",
                "subtitle": "Corporate management modules waiting for you when you log in.",
                "ops": {
                    "title": "OPERATION CENTER",
                    "desc": "Manage all your active RFQ processes, incoming quotes, and negotiations from a single screen.",
                    "f1": "Price Comparison",
                    "f2": "Counter-Offer",
                    "f3": "Purchase Approval"
                },
                "log": {
                    "title": "LOGISTICS TRACKING",
                    "desc": "Track your orders from production to delivery at your doorstep.",
                    "f1": "Shipment Details",
                    "f2": "Invoice Tracking",
                    "f3": "Delivery Confirmation"
                },
                "team": {
                    "title": "TEAM MANAGEMENT",
                    "desc": "Define your corporate hierarchy in the system. Assign approval limits to your procurement experts.",
                    "f1": "Approval Limits",
                    "f2": "Authority Definition",
                    "f3": "Department Reports"
                },
                "erp": {
                    "title": "ERP INTEGRATION",
                    "desc": "Full integration with SAP, Oracle, MS Dynamics, and local ERP systems.",
                    "f1": "Automatic Stock Entry",
                    "f2": "API Integration",
                    "f3": "Scheduled Sync"
                }
            },
            "steps": {
                "step1": { "title": "Smart Search & Discovery", "desc": "Simply write your needs thanks to our natural language processing engine." },
                "step2": { "title": "Autonomous RFQ Creation", "desc": "When you create your request, the system automatically analyzes technical details." },
                "step3": { "title": "Real-Time Negotiation", "desc": "Review quotes from suppliers from a single panel." },
                "step4": { "title": "Secure Approval & Monitoring", "desc": "Approve the quote you agreed on. The entire process is recorded with audit logs." }
            },
            "cta": "START FOR FREE NOW"
        }
    }
};

const allLangs = ["tr", "en", "de", "fr", "ru", "ja", "zh"];
for (const lang of allLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    data.howItWorks = howItWorksData[lang] || howItWorksData["en"];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Added howItWorks namespace to ${lang}.json`);
}
