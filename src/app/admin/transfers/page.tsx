'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function TransfersAdminPage() {
  const { transfers } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Stock Transfers</h1>
      <div className="space-y-3">
        {transfers.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-xl border border-enteya-border flex justify-between text-xs">
            <div>
              <span className="font-bold text-enteya-purple">Transfer {t.transferId}</span>
              <p className="text-enteya-muted">From: {t.fromStoreId} → To: {t.toStoreId}</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
