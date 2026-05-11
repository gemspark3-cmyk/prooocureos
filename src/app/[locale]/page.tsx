'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { Link, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useSystemError } from '../../lib/error-handler'
import { 
  User,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'

// Utilities & Hooks
import { procureos } from '@/lib/api'
import { monitoring } from '@/lib/monitoring'
import { 
  useRequests, 
  useOrders, 
  useRegisteredSuppliers, 
  useDashboardInit, 
  useWarehouses,
  useDebounce 
} from '@/lib/hooks'

// Types
import { Buyer, RFQ, Order, Supplier, Warehouse } from '@/types/buyer'

// Components
import { MarketplaceView } from '@/components/marketplace/MarketplaceView'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { RequestDetailsModal } from '@/components/dashboard/RequestDetailsModal'
import { SourcingFlow } from '@/components/sourcing/SourcingFlow'
import { RatingModal } from '@/components/dashboard/RatingModal'
import { SupplierComparisonModal } from '@/components/marketplace/SupplierComparisonModal'
import { NotificationCenter } from '@/components/layout/NotificationCenter'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function Home() {
  const router = useRouter()
  const tCommon = useTranslations('common')
  const tHome = useTranslations('home')
  const systemError = useSystemError();
  const { getErrorMessage } = systemError;
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<Buyer | null>(null)
  const [currentView, setCurrentView] = useState<'marketplace' | 'sourcing' | 'dashboard'>('marketplace')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Dashboard State
  const [requestsSearch, setRequestsSearch] = useState('')
  const [ordersSearch, setOrdersSearch] = useState('')
  const [suppliersSearch, setSuppliersSearch] = useState('')

  const [requestsPage, setRequestsPage] = useState(1)
  const [ordersPage, setOrdersPage] = useState(1)
  const [suppliersPage, setSuppliersPage] = useState(1)

  // ⚡ SWR Data Fetching
  const { 
    requests: swrRequests, 
    total: swrRequestsTotal, 
    isLoading: isRequestsLoading,
    mutate: mutateRequests 
  } = useRequests(requestsPage, 5, requestsSearch);

  const { 
    orders: swrOrders, 
    total: swrOrdersTotal, 
    isLoading: isOrdersLoading,
    mutate: mutateOrders 
  } = useOrders(ordersPage, 5, ordersSearch);

  const { 
    suppliers: swrSuppliers, 
    total: swrSuppliersTotal, 
    isLoading: isSuppliersLoading,
    mutate: mutateSuppliers 
  } = useRegisteredSuppliers(suppliersPage, 10);

  const { 
    dashboard: swrDashboard, 
    isLoading: isDashboardLoading,
    mutate: mutateDashboard 
  } = useDashboardInit(1, 5);

  const { 
    warehouses: swrWarehouses, 
    mutate: mutateWarehouses 
  } = useWarehouses();

  // Search/Marketplace State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Supplier[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([])
  const [searchLocation, setSearchLocation] = useState('')
  const [searchCategory, setSearchCategory] = useState('all')

  // Marketplace Debounce
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<RFQ | null>(null)
  const [activeTab, setActiveTab] = useState<'requests' | 'orders' | 'profile' | 'suppliers' | 'support' | 'team' | 'integrations'>('requests')

  const [profileData, setProfileData] = useState<Partial<Buyer>>({
    company_name: '',
    contact_person: '',
    phone: '',
    tax_id: '',
    tax_office: '',
    address_full: '',
    city: '',
    country: 'Turkey',
    postal_code: '',
    department: '',
    position: '',
    preferred_currency: 'USD',
    preferred_payment_term: '',
    custom_fx_url: '',
    lat: 0,
    lng: 0,
    approval_limit_usd: 0
  })

  const [request, setRequest] = useState({
    title: '',
    description: '',
    quantity: '',
    category: 'general',
    addressType: 'profile',
    newAddress: '',
    warehouse_id: '',
    payment_term: tHome('defaults.paymentTerm'),
    preferred_currency: 'USD',
    target_price_total: '',
    buyer_note: ''
  })

  const [matches, setMatches] = useState<any[]>([])
  const [lastIntentId, setLastIntentId] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async (force: boolean = false): Promise<void> => {
    mutateRequests();
    mutateOrders();
    mutateSuppliers();
    mutateDashboard();
    mutateWarehouses();
  }, [mutateRequests, mutateOrders, mutateSuppliers, mutateDashboard, mutateWarehouses]);

  const handleMarketplaceSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!searchQuery && !searchLocation) return
    setIsSearching(true)
    const startTime = Date.now()

    try {
      monitoring.event('search_performed', { query: searchQuery, category: searchCategory, location: searchLocation })
      const res = await procureos.searchSuppliers(searchQuery, searchCategory, searchLocation)
      
      const duration = Date.now() - startTime
      monitoring.measure('Marketplace Search', duration, 10000)
      
      setSearchResults(res.suppliers || res.results || [])
      setHasSearched(true)
    } catch (err: any) {
      monitoring.error(err, { context: 'marketplace_search' })
      toast.error(getErrorMessage(err))
    } finally {
      setIsSearching(false)
    }
  }

  // 🛡️ SECURITY: Session Verification & Sync
  useEffect(() => {
    const verifySession = async () => {
      const userData = localStorage.getItem('procureos_user')
      
      try {
        const res = await procureos.auth.me();
        setIsLoggedIn(true);
        setUser(res.buyer);
        localStorage.setItem('procureos_user', JSON.stringify(res.buyer));
      } catch (err) {
        if (userData) {
          localStorage.removeItem('procureos_user');
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    verifySession();
  }, []);

  // 🔄 Profile State Synchronization
  useEffect(() => {
    if (swrDashboard?.buyer) {
      const b = swrDashboard.buyer;
      setProfileData((prev: any) => ({
        ...prev,
        company_name: b.company_name || '',
        contact_person: b.contact_person || '',
        phone: b.phone || '',
        tax_id: b.tax_id || '',
        tax_office: b.tax_office || '',
        address_full: b.address_full || '',
        city: b.city || '',
        country: b.country || 'TR',
        postal_code: b.postal_code || '',
        department: b.department || '',
        position: b.position || '',
        preferred_currency: b.preferred_currency || 'USD',
        preferred_payment_term: b.preferred_payment_term || '',
        custom_fx_url: b.custom_fx_url || '',
        lat: b.lat || 0,
        lng: b.lng || 0,
        approval_limit_usd: b.approval_limit_usd || 0
      }));
    }
  }, [swrDashboard]);

  const [isProfileDirty, setIsProfileDirty] = useState(false)

  const handleLogout = async () => {
    try { await procureos.auth.logout() } catch (e) {}
    localStorage.removeItem('procureos_user')
    setIsLoggedIn(false)
    setUser(null)
    setStep(1)
    setCurrentView('marketplace')
    toast.success(tCommon('logoutSuccess'))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (profileData.tax_id && !/^\d{10,11}$/.test(profileData.tax_id)) {
      return toast.error(tHome('toasts.invalidTaxId'))
    }
    
    if (profileData.phone && !/^[\d\+\s\-]{7,20}$/.test(profileData.phone)) {
      return toast.error(tHome('toasts.invalidPhone'))
    }

    setLoading(true)
    try {
      const res = await procureos.auth.updateProfile(profileData)
      setUser(res.buyer)
      localStorage.setItem('procureos_user', JSON.stringify(res.buyer))
      setIsProfileDirty(false)
      toast.success(tHome('toasts.profileUpdated'))
    } catch (err: any) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleSourcingSearch = async () => {
    if (!request.title) return toast.error(tHome('toasts.needRequestTitle'))
    setLoading(true)
    try {
      const intentPayload: any = { 
        title: request.title, 
        quantity: request.quantity,
        category: request.category,
        payment_term: request.payment_term,
        preferred_currency: request.preferred_currency,
        target_price_total: request.target_price_total ? parseFloat(request.target_price_total) : undefined,
        buyer_note: request.buyer_note,
        delivery_country: (profileData.country === 'Türkiye' || profileData.country === 'Turkey') ? 'TR' : (profileData.country || 'TR'),
        lat: profileData.lat,
        lng: profileData.lng
      };

      if (selectedSuppliers.length > 0) {
        intentPayload.target_supplier_ids = selectedSuppliers.map((s: Supplier) => s.id);
      } else if (selectedSupplier) {
        intentPayload.target_supplier_id = selectedSupplier.id;
      }

      const intentRes = await procureos.createIntent(intentPayload);
      const resolvedId = intentRes.intent_id || intentRes.id
      setLastIntentId(resolvedId)
      const matchesRes = await procureos.getMatches(resolvedId)
      setMatches(matchesRes.matches || [])
      setStep(2)
    } catch (err) {
      toast.error(tHome('toasts.noSuppliersFound'))
    } finally {
      setLoading(true)
      setTimeout(() => setLoading(false), 800)
    }
  }

  const handleSendRFQ = async () => {
    if (!lastIntentId && !selectedSupplier) return toast.error(tHome('toasts.createIntentFailed'))
    setLoading(true)
    try {
      const deliveryAddress = request.addressType === 'profile' 
        ? profileData.address_full 
        : request.newAddress;
        
      if (!deliveryAddress && !selectedSupplier) {
         toast.error(tHome('toasts.needDeliveryAddress'));
         return;
      }

      if (!lastIntentId) {
        toast.error(tHome('toasts.intentInfoNotFound'))
        return
      }

      await procureos.confirmRFQ(lastIntentId || '', deliveryAddress || '', request.warehouse_id || undefined)
      setStep(3)
      toast.success(tHome('toasts.requestSent'))
    } catch (err: any) {
      toast.error(tHome('toasts.sendFailed', { error: getErrorMessage(err) }))
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptOffer = async (rfqId: string, offerId: string) => {
    if (!isLoggedIn) return toast.error(tHome('toasts.loginRequired'))
    setLoading(true)
    try {
      await procureos.auth.awardOffer(rfqId, offerId)
      toast.success(tHome('toasts.offerAccepted'))
      fetchDashboardData()
      setShowOfferModal(false)
    } catch (err: any) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleRejectOffer = async (rfqId: string, offerId: string) => {
    if (!isLoggedIn) return toast.error(tHome('toasts.loginRequired'))
    setLoading(true)
    try {
      await procureos.auth.rejectOffer(rfqId, offerId)
      toast.success(tHome('toasts.offerRejected'))
      fetchDashboardData()
    } catch (err: any) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleCounterOffer = async (rfqId: string, offerId: string, data: any) => {
    if (!isLoggedIn) return toast.error(tHome('toasts.loginRequired'))
    if (!selectedRequest) return toast.error(tHome('toasts.requestNotSelected'))
    setLoading(true)
    try {
      if (offerId === 'batch') {
        const offersToCounter = selectedRequest.offers?.filter((o: any) => o.status === 'submitted' || o.status === 'viewed') || []
        if (offersToCounter.length === 0) {
          toast.error(tHome('toasts.noActiveOffers'))
          return
        }
        
        await Promise.all(offersToCounter.map((o: any) => 
          procureos.auth.counterOffer(rfqId, o.id, {
            counter_price: parseFloat(data.price),
            counter_delivery_days: parseInt(data.days),
            buyer_note: data.note
          })
        ))
        toast.success(tHome('toasts.bulkCounterSent', { count: offersToCounter.length }))
      } else {
        await procureos.auth.counterOffer(rfqId, offerId, {
          counter_price: parseFloat(data.price),
          counter_delivery_days: parseInt(data.days),
          buyer_note: data.note
        })
        toast.success(tHome('toasts.counterSent'))
      }
      
      fetchDashboardData()
      setShowOfferModal(false)
    } catch (err: any) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSupplier = async (companyId: string) => {
    if (!isLoggedIn) return toast.error(tHome('toasts.loginRequired'))
    try {
      await procureos.auth.registerSupplier(companyId);
      toast.success(tHome('toasts.supplierAdded'));
      mutateSuppliers();
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <main className="min-h-screen mesh-bg text-[var(--foreground)] selection:bg-blue-500/30">
      <Toaster position="top-right" />
      
      {/* Responsive Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => { setCurrentView('marketplace'); setHasSearched(false); }} 
              className="group flex items-center gap-3 text-left"
            >
              <div className="w-12 h-12 md:w-[60px] md:h-[60px] bg-[var(--foreground)]/5 rounded-2xl flex items-center justify-center shadow-xl border border-[var(--foreground)]/10 group-hover:scale-110 transition-all overflow-hidden backdrop-blur-md">
                <img src="/logo.png" alt="ProcureOS" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg md:text-xl font-black italic tracking-tighter leading-none text-[var(--foreground)]">PROCUREOS</span>
                <span className="text-[7px] md:text-[8px] font-black tracking-[0.3em] text-blue-500 uppercase">{tCommon('buyerPortal')}</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                href="/how-it-works" 
                className="px-6 py-2 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 border border-[var(--foreground)]/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[var(--foreground)] transition-all backdrop-blur-md"
              >
                {tCommon('howItWorks')}
              </Link>
              <div className="flex items-center gap-3 bg-[var(--foreground)]/5 p-1 rounded-2xl border border-[var(--foreground)]/10 backdrop-blur-md">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <NotificationCenter />
                  <button 
                    onClick={() => { setCurrentView('dashboard'); setActiveTab('profile'); }}
                    className="px-6 py-2 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all flex items-center gap-2"
                  >
                    <User className="w-3 h-3" />
                    <span className="max-w-[120px] truncate">{user?.company_name || tCommon('myAccount')}</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[8px] font-black uppercase tracking-widest text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                  >
                    {tCommon('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">{tCommon('login')}</Link>
                  <Link href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">{tCommon('register')}</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl flex items-center justify-center text-[var(--foreground)] backdrop-blur-md"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-24 inset-x-6 p-8 bg-[var(--surface)]/90 backdrop-blur-2xl border border-[var(--foreground)]/10 rounded-[2.5rem] shadow-2xl pointer-events-auto lg:hidden flex flex-col gap-8 z-[70]"
            >
              <div className="flex flex-col gap-4">
                <Link 
                  href="/how-it-works" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 bg-[var(--foreground)]/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]"
                >
                  {tCommon('howItWorks')} <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-between p-4 bg-[var(--foreground)]/5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Theme & Lang</span>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-[var(--foreground)]/5" />

              {isLoggedIn ? (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setCurrentView('dashboard'); setActiveTab('requests'); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-between p-4 bg-blue-600/10 text-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                  >
                    {tCommon('myPanel')} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => { setCurrentView('dashboard'); setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-between p-4 bg-[var(--foreground)]/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> {user?.company_name || tCommon('myAccount')}
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="p-4 bg-rose-500/10 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center"
                  >
                    {tCommon('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-4 bg-[var(--foreground)]/5 text-center text-[10px] font-black uppercase tracking-widest rounded-2xl"
                  >
                    {tCommon('login')}
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-4 bg-blue-600 text-white text-center text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20"
                  >
                    {tCommon('register')}
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 ${hasSearched ? 'pt-24' : 'pt-24 md:pt-32'} pb-20 transition-all duration-700`}>
        {currentView === 'marketplace' && !hasSearched && (
          <div className="text-center mb-4">
            <Link href="/changelog">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase shadow-2xl shadow-blue-500/10 hover:border-blue-400/50 hover:bg-blue-600/30 transition-all cursor-pointer group pointer-events-auto"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {tHome('protocolNotes')} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </div>
        )}

        {currentView === 'marketplace' ? (
          <MarketplaceView 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            isSearching={isSearching}
            onSearch={handleMarketplaceSearch}
            isLoggedIn={isLoggedIn}
            profileCity={profileData.city}
            profileCountry={profileData.country}
            hasSearched={hasSearched}
            searchResults={searchResults}
            selectedSuppliers={selectedSuppliers}
            onToggleSupplier={(s: Supplier) => {
              setSelectedSuppliers((prev: Supplier[]) => 
                prev.some((sel: Supplier) => sel.id === s.id) 
                  ? prev.filter((sel: Supplier) => sel.id !== s.id)
                  : [...prev, s]
              );
            }}
            onCompare={() => setShowCompareModal(true)}
            onRegisterSupplier={handleRegisterSupplier}
            warehouses={swrWarehouses}
            onSelectWarehouse={(w: any) => {
              if (!w) {
                setRequest((prev: any) => ({ ...prev, warehouse_id: '', addressType: 'profile', newAddress: '' }));
                return;
              }
              setRequest((prev: any) => ({ ...prev, warehouse_id: w.id, addressType: 'warehouse', newAddress: `${w.address_full} - ${w.city} / ${w.country}` }));
            }}
            onSelectSupplier={(s: Supplier) => {
              const isBulk = selectedSuppliers.length > 0;
              setRequest((prev: any) => ({
                ...prev, 
                category: isBulk ? (selectedSuppliers[0].category || 'general') : (s.category || 'general'), 
                title: searchQuery || ''
              }))
              setSelectedSupplier(isBulk ? {
                ...selectedSuppliers[0],
                company_name: tHome('differentCompanies', { count: selectedSuppliers.length })
              } as Supplier : s)
              setCurrentView('sourcing')
              setStep(1)
            }}
          />
        ) : currentView === 'dashboard' ? (
          <DashboardView 
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            myRequests={swrRequests}
            requestsTotal={swrRequestsTotal}
            requestsPage={requestsPage}
            fetchRequests={(p: number, s?: string) => { setRequestsPage(p); if(s !== undefined) setRequestsSearch(s); }}
            myOrders={swrOrders}
            ordersTotal={swrOrdersTotal}
            ordersPage={ordersPage}
            fetchOrders={(p: number, s?: string) => { setOrdersPage(p); if(s !== undefined) setOrdersSearch(s); }}
            registeredSuppliers={swrSuppliers}
            suppliersTotal={swrSuppliersTotal}
            suppliersPage={suppliersPage}
            fetchSuppliers={(p: number, s?: string) => { setSuppliersPage(p); if(s !== undefined) setSuppliersSearch(s); }}
            suppliersSearch={suppliersSearch}
            setSuppliersSearch={setSuppliersSearch}
            requestsSearch={requestsSearch}
            setRequestsSearch={setRequestsSearch}
            ordersSearch={ordersSearch}
            setOrdersSearch={setOrdersSearch}
            myStats={swrDashboard?.stats}
            onRefresh={() => fetchDashboardData()}
            onSelectRequest={(req: RFQ) => { setSelectedRequest(req); setShowOfferModal(true); }}
            onRateOrder={(order: Order) => { setRatingOrder(order); setShowRatingModal(true); }}
            setCurrentView={setCurrentView}
            profileData={profileData as Buyer}
            setProfileData={(data: Partial<Buyer>) => { setProfileData(data); setIsProfileDirty(true); }}
            handleUpdateProfile={handleUpdateProfile}
            isProfileDirty={isProfileDirty}
            setIsProfileDirty={setIsProfileDirty}
            loading={isDashboardLoading || isRequestsLoading}
            warehouses={swrWarehouses}
            onRefreshWarehouses={() => mutateWarehouses()}
            onDeleteWarehouse={(id: string) => {
              if (request.warehouse_id === id) {
                setRequest((prev: any) => ({ ...prev, warehouse_id: '', addressType: 'profile' }));
              }
            }}
          />
        ) : (
          <SourcingFlow 
            step={step}
            setStep={setStep}
            loading={loading}
            selectedSupplier={selectedSupplier}
            request={request}
            setRequest={setRequest}
            matches={matches}
            profileData={profileData}
            warehouses={swrWarehouses}
            handleSourcingSearch={handleSourcingSearch}
            handleSendRFQ={handleSendRFQ}
            setCurrentView={setCurrentView}
            fetchDashboardData={fetchDashboardData}
          />
        )}
      </div>

      <RequestDetailsModal 
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        request={selectedRequest}
        buyerData={profileData}
        loading={loading}
        onAcceptOffer={handleAcceptOffer}
        onRejectOffer={handleRejectOffer}
        onCounterOffer={handleCounterOffer}
        onRegisterSupplier={handleRegisterSupplier}
      />

      {showRatingModal && ratingOrder && (
        <RatingModal 
          orderId={ratingOrder.id}
          supplierId={ratingOrder.supplier_id}
          supplierName={ratingOrder.supplier?.company_name || tHome('defaults.supplier')}
          onClose={() => setShowRatingModal(false)}
          onSuccess={() => fetchDashboardData(true)}
        />
      )}

      <SupplierComparisonModal 
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        selectedSuppliers={selectedSuppliers}
        onRemoveSupplier={(id: string) => {
          setSelectedSuppliers((prev: Supplier[]) => prev.filter((s: Supplier) => s.id !== id));
          if (selectedSuppliers.length <= 1) setShowCompareModal(false);
        }}
        onBulkQuote={() => {
          setShowCompareModal(false);
          const isBulk = selectedSuppliers.length > 0;
          setRequest((prev: any) => ({
            ...prev, 
            category: isBulk ? (selectedSuppliers[0].category || 'general') : 'general', 
            title: searchQuery || ''
          }))
          setSelectedSupplier(isBulk ? {
            ...selectedSuppliers[0],
            company_name: tHome('differentCompanies', { count: selectedSuppliers.length })
          } as Supplier : null)
          setCurrentView('sourcing')
          setStep(1)
        }}
      />
    </main>
  )
}
