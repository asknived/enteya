'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function CustomersAdminPage() {
  const { customers } = useCrm();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Customer Directory</h1>
        <span className="text-xs bg-enteya-purple-light text-enteya-purple-deep px-3 py-1 rounded-full font-semibold">
          {customers.length} Profiles
        </span>
      </div>

      <div className="bg-white rounded-xl border border-enteya-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-enteya-surface border-b border-enteya-border font-bold uppercase tracking-wider text-enteya-muted">
            <tr>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">City</th>
              <th className="p-4">Total Spending</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enteya-border">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-enteya-surface">
                <td className="p-4 font-mono font-bold text-enteya-purple">{c.customerId}</td>
                <td className="p-4 font-semibold text-enteya-charcoal">{c.fullName}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">{c.city}</td>
                <td className="p-4 font-bold">₹{c.totalSpending.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
