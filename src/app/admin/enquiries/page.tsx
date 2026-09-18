'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function EnquiriesAdminPage() {
  const { enquiries } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">WhatsApp Enquiries</h1>
      <div className="bg-white rounded-xl border border-enteya-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-enteya-surface border-b border-enteya-border font-bold uppercase tracking-wider text-enteya-muted">
            <tr>
              <th className="p-4">Enquiry ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enteya-border">
            {enquiries.map(e => (
              <tr key={e.id}>
                <td className="p-4 font-mono font-bold text-enteya-magenta">{e.enquiryId}</td>
                <td className="p-4 font-semibold">{e.customerName}</td>
                <td className="p-4">{e.productName} ({e.finish})</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">{e.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
