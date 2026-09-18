'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function StoresAdminPage() {
  const { stores } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Boutique Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-xl border border-enteya-border text-xs space-y-1">
            <span className="font-bold text-enteya-purple block">{s.name} ({s.city})</span>
            <p className="text-enteya-muted">{s.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
