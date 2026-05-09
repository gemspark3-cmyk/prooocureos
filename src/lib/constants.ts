/**
 * ProcureOS Shared Constants
 */

export const CATEGORIES = [
  { id: 'all', name: 'TÜM KATEGORİLER' },
  { id: 'Construction & Real Estate', name: 'İnşaat & Gayrimenkul' },
  { id: 'Industrial Machinery', name: 'Endüstriyel Makine' },
  { id: 'Raw Materials & Chemicals', name: 'Hammadde & Kimyasallar' },
  { id: 'Automotive & Transport', name: 'Otomotiv & Lojistik' },
  { id: 'Electronics & Electrical', name: 'Elektronik & Elektrik' },
  { id: 'Food & Agriculture', name: 'Gıda & Tarım' },
  { id: 'Textiles & Apparel', name: 'Tekstil & Giyim' },
  { id: 'Office & Stationery', name: 'Ofis & Kırtasiye' },
  { id: 'Health & Medical', name: 'Sağlık & Medikal' },
  { id: 'Energy & Utilities', name: 'Enerji & Altyapı' },
  { id: 'Professional Services', name: 'Profesyonel Hizmetler' },
  { id: 'General', name: 'Diğer / Genel' }
];

export const ORDER_STATUS_STEPS = {
  default: [
    { id: 'preparing', label: 'Hazırlanıyor' },
    { id: 'shipped', label: 'Yolda' },
    { id: 'delivered', label: 'Teslim Edildi' }
  ],
  logistics: [
    { id: 'warehouse', label: 'Depoda' },
    { id: 'customs', label: 'Gümrükte' },
    { id: 'local_delivery', label: 'Dağıtımda' },
    { id: 'completed', label: 'Tamamlandı' }
  ]
};

export const COUNTRIES = [
  { code: 'TR', name: 'Türkiye' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'CN', name: 'China' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'JP', name: 'Japan' }
];
