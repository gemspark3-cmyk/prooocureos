/**
 * ProcureOS SDK - Lightweight Client
 * Built for High-Performance Buyer Portals
 */

import { Buyer, RFQ, Order, Supplier, Warehouse, BuyerStats } from '@/types/buyer';

export interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function procureRequest(endpoint: string, options: ApiOptions = {}) {
  const traceId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
  
  // 🛡️ AIP-103: Cookies are now handled automatically by the /api/proxy
  // localStorage logic for tokens removed for XSS protection
  
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-trace-id': traceId,
      'x-requested-with': 'ProcureOS-Client'
    },
    body: JSON.stringify({
      endpoint: endpoint,
      method: options.method || 'GET',
      headers: {
        ...options.headers,
        'x-trace-id': traceId,
        'x-requested-with': 'ProcureOS-Client'
      },
      data: options.body || {}
    })
  })

  // 🛡️ AIP-103: Handle Session Expiration
  if (response.status === 401 && !endpoint.includes('/auth/login')) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('procureos_user');
      window.location.href = '/login?session_expired=true';
    }
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    if (!response.ok) throw new Error(`HTTP ${response.status}: Server returned an error.`)
    return {}
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP ${response.status}: Request failed`)
  }

  return data
}

/**
 * Public Buyer Actions
 */
export const procureos = {
  // ... (existing methods 1-3)
  createIntent: (data: Partial<RFQ>) => procureRequest('/public/rfq/intent', { method: 'POST', body: data }),
  getMatches: (intentId: string) => procureRequest(`/public/rfq/matches?intent_id=${intentId}`),
  confirmRFQ: (intentId: string, deliveryAddress: string, warehouseId?: string) => procureRequest('/public/rfq/confirm', {
    method: 'POST',
    body: { intent_id: intentId, delivery_address: deliveryAddress, warehouse_id: warehouseId }
  }),

  // 4. Public Supplier Search
  searchSuppliers: (q?: string, category?: string, location?: string) => {
    let url = '/public/search'
    const params = new URLSearchParams()
    if (q) params.append('q', q)
    if (category) params.append('category', category)
    if (location) params.append('location', location)
    const queryString = params.toString()
    return procureRequest(queryString ? `${url}?${queryString}` : url)
  },

  // 5. Public Reviews
  getReviews: () => procureRequest('/public/search/reviews'),

  // 🔐 Auth Actions
  auth: {
    register: (data: Partial<Buyer> & { password?: string }) => procureRequest('/public/auth/register', { method: 'POST', body: data }),
    login: (data: { email: string, password: string }) => procureRequest('/public/auth/login', { method: 'POST', body: data }),
    me: () => procureRequest('/public/auth/me') as Promise<{ buyer: Buyer }>,
    
    // 🛡️ Passwords & Recovery
    forgotPassword: (email: string, redirectUrl?: string) => 
      procureRequest('/public/auth/forgot-password', { method: 'POST', body: { email, redirect_url: redirectUrl } }),
    resetPassword: (data: { token: string, password: string }) => 
      procureRequest('/public/auth/reset-password', { method: 'POST', body: data }),
    changePassword: (data: unknown) =>
      procureRequest('/public/auth/password/change', { method: 'POST', body: data }),

    getDashboardInit: (page: number = 1, limit: number = 10) => procureRequest(`/public/auth/dashboard/init?page=${page}&limit=${limit}`),
    updateProfile: (data: Partial<Buyer>) => procureRequest('/public/auth/profile', { method: 'POST', body: data }),
    listRequests: (page: number = 1, limit: number = 10) => procureRequest(`/public/auth/requests?page=${page}&limit=${limit}`),
    listOrders: (page: number = 1, limit: number = 10) => procureRequest(`/public/auth/requests/orders?page=${page}&limit=${limit}`),
    getBuyerStats: () => procureRequest('/public/auth/buyer/stats') as Promise<BuyerStats>,
    
    awardOffer: (rfqId: string, offerId: string) =>
      procureRequest('/public/auth/requests/award', { method: 'POST', body: { rfq_id: rfqId, offer_id: offerId } }),
    rejectOffer: (rfqId: string, offerId: string) =>
      procureRequest('/public/auth/requests/reject', { method: 'POST', body: { rfq_id: rfqId, offer_id: offerId } }),
    counterOffer: (rfqId: string, offerId: string, data: { counter_price: number, counter_delivery_days: number, buyer_note?: string }) =>
      procureRequest('/public/auth/requests/counter', { method: 'POST', body: { rfq_id: rfqId, offer_id: offerId, ...data } }),

    logout: async () => {
      const res = await procureRequest('/public/auth/logout', { method: 'POST' });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('procureos_user');
      }
      return res;
    },
    deleteAccount: () => procureRequest('/public/auth/profile/delete', { method: 'POST' }),
    
    submitReview: (data: unknown) => procureRequest('/public/auth/requests/reviews', { method: 'POST', body: data }),
    
    // 🏢 Registered Suppliers
    registerSupplier: (company_id: string, notes?: string) =>
      procureRequest('/public/auth/suppliers/register', { method: 'POST', body: { company_id, notes } }),
    unregisterSupplier: (id: string) =>
      procureRequest(`/public/auth/suppliers/register/${id}`, { method: 'DELETE' }),
    listRegisteredSuppliers: (page: number = 1, limit: number = 10) => procureRequest(`/public/auth/suppliers/registered?page=${page}&limit=${limit}`),
    
    // 🎫 Support Tickets
    listTickets: () => procureRequest('/public/auth/support/list'),
    getTicketDetails: (id: string) => procureRequest(`/public/auth/support/ticket/${id}`),
    createTicket: (data: unknown) => procureRequest('/public/auth/support/create', { method: 'POST', body: data }),
    addTicketMessage: (id: string, message: string) =>
      procureRequest(`/public/auth/support/ticket/${id}/message`, { method: 'POST', body: { message } }),
    updateTicketStatus: (id: string, status: string) =>
      procureRequest(`/public/auth/support/ticket/${id}/status`, { method: 'POST', body: { status } }),

    // 🔔 Notifications
    listNotifications: () => procureRequest('/public/auth/notifications'),
    markNotificationRead: (id: string) => procureRequest(`/public/auth/notifications/${id}/read`, { method: 'POST' }),

    // 🏭 Warehouse Management
    listWarehouses: () => procureRequest('/public/auth/warehouses'),
    addWarehouse: (data: Partial<Warehouse>) => procureRequest('/public/auth/warehouses', { method: 'POST', body: data }),
    deleteWarehouse: (id: string) => procureRequest(`/public/auth/warehouses/${id}`, { method: 'DELETE' })
  },
  
  // ⚡ Public System Diagnostics
  getHealth: () => procureRequest('/public/health')
}
