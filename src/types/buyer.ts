export interface Supplier {
  id: string;
  name: string;
  company_name?: string;
  category?: string;
  location?: string;
  rating?: number;
  verified?: boolean;
  price_score?: number;
  speed_score?: number;
  trust_score?: number;
  regions?: string[];
}

export interface Buyer {
  id: string;
  email: string;
  company_name?: string;
  contact_person?: string;
  phone?: string;
  tax_id?: string;
  tax_office?: string;
  address_full?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  department?: string;
  position?: string;
  preferred_currency?: string;
  preferred_payment_term?: string;
  custom_fx_url?: string;
  lat?: number;
  lng?: number;
  approval_limit_usd?: number;
  website?: string;
  industry?: string;
  employee_count?: string;
  year_established?: string;
  trade_registry_number?: string;
  mersis_number?: string;
}

export interface RFQ {
  id: string;
  title: string;
  description?: string;
  quantity?: string;
  category?: string;
  status: 'open' | 'awarded' | 'closed';
  created_at: string;
  target_price_total?: number;
  preferred_currency?: string;
  offers?: Offer[];
  metadata?: any;
  decision_logs?: Array<{ ai_reasoning: string }>;
}

export interface Offer {
  id: string;
  rfq_id: string;
  supplier_id: string;
  price: number;
  delivery_days: number;
  status: 'submitted' | 'viewed' | 'awarded' | 'rejected' | 'countered';
  created_at: string;
  metadata?: {
    original_price?: number;
    negotiation_history?: any[];
  };
  supplier?: {
    company_name: string;
    logo_url?: string;
  };
}

export interface Order {
  id: string;
  rfq_id: string;
  supplier_id: string;
  buyer_id: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
  delivery_address?: string;
  warehouse?: Warehouse;
  supplier?: {
    company_name: string;
    logo_url?: string;
  };
  rfq?: RFQ;
  offer?: Offer;
}

export interface Warehouse {
  id: string;
  name: string;
  address_full: string;
  city: string;
  country: string;
  postal_code?: string;
  contact_person?: string;
  contact_phone?: string;
  is_default?: boolean;
}

export interface BuyerStats {
  activeRfqs: number;
  estimatedSavings: number;
  avgResponseTime: string;
  totalSpent: number;
}
