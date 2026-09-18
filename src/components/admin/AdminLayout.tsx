'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CrmProvider, useCrm } from '@/context/CrmContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  MessageSquare,
  Clock,
  ShoppingBag,
  Package,
  Layers,
  Store,
  BarChart3,
  History,
  Settings,
  ShieldAlert,
  Search,
  Plus,
  Bell,
  ChevronDown,
  X,
  Menu,
  ArrowUpRight,
  Sparkles,
  ArrowLeftRight,
  TrendingUp,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentStaff,
    setCurrentStaff,
    staffList,
    selectedStoreScope,
    setSelectedStoreScope,
    stores,
    globalSearch,
    addCustomer,
    addLead,
    addEnquiry,
    recordSale,
    createStockTransfer,
    exportCsv
  } = useCrm();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Quick Action Modal States
  const [activeQuickAction, setActiveQuickAction] = useState<"customer" | "lead" | "enquiry" | "sale" | "transfer" | null>(null);

  // Quick Action Form Data
  const [qaName, setQaName] = useState('');
  const [qaPhone, setQaPhone] = useState('');
  const [qaEmail, setQaEmail] = useState('');
  const [qaStoreId, setQaStoreId] = useState(stores[0]?.id || '');
  const [qaProductSku, setQaProductSku] = useState('ENT-NK-001');

  const searchResults = globalSearch(searchQuery);

  const navigationGroups = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard }
      ]
    },
    {
      title: "CRM & LEADS",
      items: [
        { label: "Customers", href: "/admin/customers", icon: Users },
        { label: "Lead Pipeline", href: "/admin/leads", icon: UserCheck },
        { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
        { label: "Follow-ups & Tasks", href: "/admin/follow-ups", icon: Clock }
      ]
    },
    {
      title: "SALES & ORDERS",
      items: [
        { label: "Sales Records", href: "/admin/sales", icon: ShoppingBag },
        { label: "Returns", href: "/admin/returns", icon: ShieldAlert }
      ]
    },
    {
      title: "CATALOGUE & INVENTORY",
      items: [
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Store Inventory", href: "/admin/inventory", icon: Layers },
        { label: "Stock Transfers", href: "/admin/transfers", icon: ArrowLeftRight },
        { label: "Inventory History", href: "/admin/inventory/history", icon: History }
      ]
    },
    {
      title: "STORES & STAFF",
      items: [
        { label: "Boutiques (12)", href: "/admin/stores", icon: Store },
        { label: "Staff & RBAC", href: "/admin/staff", icon: Users }
      ]
    },
    {
      title: "INTELLIGENCE & SYSTEM",
      items: [
        { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
        { label: "Audit Log", href: "/admin/activity", icon: History },
        { label: "System Settings", href: "/admin/settings", icon: Settings }
      ]
    }
  ];

  const handleQuickCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaName || !qaPhone) return;
    addCustomer({
      fullName: qaName,
      phone: qaPhone,
      whatsapp: qaPhone,
      email: qaEmail || `${qaName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: "Primary Address",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400050",
      status: "New",
      preferredStoreId: qaStoreId
    });
    setActiveQuickAction(null);
    setQaName(''); setQaPhone('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* TOP ADMIN HEADER */}
      <header className="sticky top-0 z-30 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        
        {/* LEFT: LOGO & MOBILE TRIGGER */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/admin" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-amber-400">
              ENTE<span className="text-purple-400">YA</span>
            </span>
            <span className="bg-purple-900/80 text-purple-300 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-purple-700/50">
              INTERNAL OS
            </span>
          </Link>

          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center space-x-1 text-xs text-slate-400 hover:text-amber-400 transition-colors pl-4 border-l border-slate-800"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CENTER: GLOBAL SEARCH */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Global search customers, SKUs (ENT-NK-001), enquiries, sales..."
            className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-amber-400 text-slate-200 pl-10 pr-4 py-2 rounded-xl outline-none placeholder:text-slate-500 shadow-inner"
          />

          {/* GLOBAL SEARCH RESULTS DROPDOWN */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-2 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider">
                <span>Search Results</span>
                <button onClick={() => setIsSearchOpen(false)}><X className="w-4 h-4" /></button>
              </div>

              <div className="p-2 space-y-3">
                {searchResults.customers.length > 0 && (
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2">Customers</span>
                    {searchResults.customers.map(c => (
                      <Link
                        key={c.id}
                        href={`/admin/customers/${c.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex justify-between items-center p-2 rounded hover:bg-slate-800 text-xs text-slate-200"
                      >
                        <span className="font-semibold">{c.fullName} ({c.customerId})</span>
                        <span className="text-[10px] text-slate-400">{c.phone}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {searchResults.products.length > 0 && (
                  <div>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2">Products / SKUs</span>
                    {searchResults.products.map(p => (
                      <Link
                        key={p.id}
                        href="/admin/products"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex justify-between items-center p-2 rounded hover:bg-slate-800 text-xs text-slate-200"
                      >
                        <span className="font-semibold">{p.name} ({p.sku})</span>
                        <span className="text-amber-400 font-bold">₹{p.price}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {searchResults.enquiries.length > 0 && (
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider px-2">Enquiries</span>
                    {searchResults.enquiries.map(e => (
                      <Link
                        key={e.id}
                        href="/admin/enquiries"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex justify-between items-center p-2 rounded hover:bg-slate-800 text-xs text-slate-200"
                      >
                        <span>{e.enquiryId} - {e.customerName}</span>
                        <span className="text-[10px] text-emerald-400">{e.status}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: STORE SCOPE, ROLE SWITCHER, QUICK ACTION */}
        <div className="flex items-center space-x-3">
          
          {/* STORE SCOPE FILTER */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedStoreScope}
              onChange={(e) => setSelectedStoreScope(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-medium"
            >
              <option value="all">All 12 Boutiques</option>
              {stores.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.city} – {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* ROLE SWITCHER */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={currentStaff.id}
              onChange={(e) => {
                const s = staffList.find(st => st.id === e.target.value);
                if (s) setCurrentStaff(s);
              }}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-semibold"
            >
              {staffList.map(st => (
                <option key={st.id} value={st.id} className="bg-slate-900 text-white">
                  {st.name} ({st.role})
                </option>
              ))}
            </select>
          </div>

          {/* QUICK ACTION BUTTON */}
          <div className="relative">
            <button
              onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
              className="bg-purple-700 hover:bg-purple-600 text-white p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Action</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isQuickActionOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <button
                  onClick={() => { setActiveQuickAction("customer"); setIsQuickActionOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-200"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Add Customer</span>
                </button>
                <button
                  onClick={() => { router.push('/admin/leads'); setIsQuickActionOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-200"
                >
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>Create Lead</span>
                </button>
                <button
                  onClick={() => { router.push('/admin/enquiries'); setIsQuickActionOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-200"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Log Enquiry</span>
                </button>
                <button
                  onClick={() => { router.push('/admin/sales'); setIsQuickActionOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-200"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                  <span>Record Sale</span>
                </button>
                <button
                  onClick={() => { router.push('/admin/transfers'); setIsQuickActionOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-200"
                >
                  <ArrowLeftRight className="w-4 h-4 text-pink-400" />
                  <span>Transfer Stock</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA WITH SIDEBAR */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-64 flex-col bg-slate-950 border-r border-slate-800 overflow-y-auto p-4 space-y-6 shrink-0">
          
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3">
                {group.title}
              </span>
              <div className="space-y-1 pt-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-purple-900/80 text-white border border-purple-700/50 shadow-sm'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ACTIVE LOGGED-IN STAFF CARD */}
          <div className="pt-4 border-t border-slate-800 bg-slate-900/60 p-3 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center font-bold text-white text-xs">
                {currentStaff.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-white truncate">{currentStaff.name}</span>
                <span className="block text-[10px] text-amber-400 font-medium">{currentStaff.role}</span>
              </div>
            </div>
          </div>

        </aside>

        {/* MOBILE SIDEBAR */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-slate-950 p-6 space-y-6 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="font-serif text-xl font-bold text-amber-400">ENTEYA OS</span>
                <button onClick={() => setIsMobileSidebarOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>

              <div className="space-y-6">
                {navigationGroups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{group.title}</span>
                    <div className="space-y-1">
                      {group.items.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMobileSidebarOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-900"
                        >
                          <item.icon className="w-4 h-4 text-amber-400" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC PAGE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

      {/* QUICK ADD CUSTOMER MODAL */}
      {activeQuickAction === "customer" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-amber-400">Quick Add Customer Profile</h3>
              <button onClick={() => setActiveQuickAction(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleQuickCustomerSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={qaName}
                  onChange={(e) => setQaName(e.target.value)}
                  placeholder="e.g. Radhika Kapoor"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={qaPhone}
                  onChange={(e) => setQaPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={qaEmail}
                  onChange={(e) => setQaEmail(e.target.value)}
                  placeholder="radhika@gmail.com"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Boutique</label>
                <select
                  value={qaStoreId}
                  onChange={(e) => setQaStoreId(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
                >
                  {stores.map(s => (
                    <option key={s.id} value={s.id}>{s.city} – {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveQuickAction(null)}
                  className="px-4 py-2 rounded-lg text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs bg-purple-700 hover:bg-purple-600 text-white font-bold"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <CrmProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </CrmProvider>
  );
}
