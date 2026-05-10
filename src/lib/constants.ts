/**
 * ProcureOS Shared Constants
 */

export const CATEGORIES = [
  { id: 'all', name: 'ALL CATEGORIES' },
  { id: 'Construction & Real Estate', name: 'Construction & Real Estate' },
  { id: 'Industrial Machinery', name: 'Industrial Machinery' },
  { id: 'Raw Materials & Chemicals', name: 'Raw Materials & Chemicals' },
  { id: 'Automotive & Transport', name: 'Automotive & Transport' },
  { id: 'Electronics & Electrical', name: 'Electronics & Electrical' },
  { id: 'Food & Agriculture', name: 'Food & Agriculture' },
  { id: 'Textiles & Apparel', name: 'Textiles & Apparel' },
  { id: 'Office & Stationery', name: 'Office & Stationery' },
  { id: 'Health & Medical', name: 'Health & Medical' },
  { id: 'Energy & Utilities', name: 'Energy & Utilities' },
  { id: 'Professional Services', name: 'Professional Services' },
  { id: 'General', name: 'Other / General' }
];

export const ORDER_STATUS_STEPS = {
  default: [
    { id: 'preparing', label: 'Preparing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' }
  ],
  logistics: [
    { id: 'warehouse', label: 'Warehouse' },
    { id: 'customs', label: 'Customs' },
    { id: 'local_delivery', label: 'Local Delivery' },
    { id: 'completed', label: 'Completed' }
  ]
};

export const COUNTRIES = [
  { code: 'TR', name: 'Turkey' },
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

