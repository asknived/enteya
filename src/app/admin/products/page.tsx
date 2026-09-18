'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function ProductsAdminPage() {
  const { products } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Catalogue Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl border border-enteya-border space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-enteya-magenta">{p.category}</span>
              <h3 className="font-serif font-bold text-base text-enteya-charcoal">{p.name}</h3>
              <p className="text-xs text-enteya-muted">SKU: {p.sku}</p>
            </div>
            <span className="font-bold text-sm text-enteya-purple">₹{p.price.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
