'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function StaffAdminPage() {
  const { staffList } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Staff Directory</h1>
      <div className="space-y-2">
        {staffList.map(s => (
          <div key={s.id} className="bg-white p-3 rounded-lg border border-enteya-border text-xs flex justify-between">
            <span className="font-bold">{s.name} ({s.role})</span>
            <span className="text-enteya-muted">{s.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
