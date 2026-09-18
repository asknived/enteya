'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function InventoryAdminPage() {
  const { storeInventory } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Store Stock Inventory</h1>
      <div className="bg-white rounded-xl border border-enteya-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-enteya-surface border-b border-enteya-border font-bold uppercase tracking-wider text-enteya-muted">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Store ID</th>
              <th className="p-4">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enteya-border">
            {storeInventory.slice(0, 20).map((inv, idx) => (
              <tr key={idx}>
                <td className="p-4 font-mono font-bold text-enteya-purple">{inv.productId}</td>
                <td className="p-4">{inv.storeId}</td>
                <td className="p-4 font-bold">{inv.quantity} units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
