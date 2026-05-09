/**
 * 🏷️ ProcureOS Type Definitions
 */

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  verified: boolean;
  delivery_estimate?: string;
  regions?: string[];
}

export interface BuyerProfile {
  id: string;
  email: string;
  company_name: string;
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
  lat?: number;
  lng?: number;
}

export interface RFQRequest {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'confirmed' | 'awarded' | 'expired';
  created_at: string;
  offers_count?: number;
  offers?: any[];
}
