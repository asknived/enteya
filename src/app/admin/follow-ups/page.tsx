'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function FollowUpsAdminPage() {
  const { tasks } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Tasks & Follow-ups</h1>
      <div className="space-y-3">
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-xl border border-enteya-border flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-enteya-charcoal block">{t.title}</span>
              <span className="text-enteya-muted">Assigned to: {t.assignedStaffName}</span>
            </div>
            <span className="bg-enteya-purple-light text-enteya-purple-deep px-3 py-1 rounded-full font-bold uppercase text-[10px]">
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
