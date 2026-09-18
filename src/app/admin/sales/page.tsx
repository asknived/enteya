'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function SalesAdminPage() {
  const { sales } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Sales Records</h1>
      <div className="bg-white rounded-xl border border-enteya-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-enteya-surface border-b border-enteya-border font-bold uppercase tracking-wider text-enteya-muted">
            <tr>
              <th className="p-4">Sale ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enteya-border">
            {sales.map(s => (
              <tr key={s.id}>
                <td className="p-4 font-mono font-bold text-enteya-purple">{s.saleId}</td>
                <td className="p-4 font-semibold">{s.customerName}</td>
                <td className="p-4 uppercase">{s.paymentMethod}</td>
                <td className="p-4 font-bold text-emerald-700">₹{s.totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
