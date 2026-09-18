'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function ReportsAdminPage() {
  const { sales, customers } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Analytics & Reports</h1>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-enteya-border">
          <span className="font-bold text-enteya-purple block mb-1">Sales Volume</span>
          <span className="text-xl font-bold">{sales.length} Completed Orders</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-enteya-border">
          <span className="font-bold text-enteya-gold-dark block mb-1">Customer Base</span>
          <span className="text-xl font-bold">{customers.length} Profiles</span>
        </div>
      </div>
    </div>
  );
}
