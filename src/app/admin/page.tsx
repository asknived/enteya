'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';
import { TrendingUp, Users, MessageSquare, ShoppingBag, Layers, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { sales, customers, enquiries, storeInventory, selectedStoreScope, stores } = useCrm();

  const totalSalesVal = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">ENTEYA Executive Dashboard</h1>
          <p className="text-xs text-enteya-muted">
            Overview for {selectedStoreScope === 'all' ? 'All 12 Boutiques' : stores.find(s => s.id === selectedStoreScope)?.name || 'Selected Store'}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-enteya-border shadow-sm">
          <div className="flex justify-between items-center text-enteya-purple mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-enteya-muted">Total Sales</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-enteya-charcoal">₹{totalSalesVal.toLocaleString('en-IN')}</span>
          <span className="block text-[11px] text-emerald-600 font-medium mt-1">↑ +14.2% this month</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-enteya-border shadow-sm">
          <div className="flex justify-between items-center text-enteya-magenta mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-enteya-muted">Enquiries</span>
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-enteya-charcoal">{enquiries.length}</span>
          <span className="block text-[11px] text-enteya-muted font-medium mt-1">Active WhatsApp leads</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-enteya-border shadow-sm">
          <div className="flex justify-between items-center text-enteya-gold-dark mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-enteya-muted">Customers</span>
            <Users className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-enteya-charcoal">{customers.length}</span>
          <span className="block text-[11px] text-emerald-600 font-medium mt-1">High-intent profiles</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-enteya-border shadow-sm">
          <div className="flex justify-between items-center text-enteya-purple-deep mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-enteya-muted">Boutique Inventory</span>
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-enteya-charcoal">{storeInventory.length}</span>
          <span className="block text-[11px] text-enteya-muted font-medium mt-1">SKU Store Records</span>
        </div>
      </div>
    </div>
  );
}
