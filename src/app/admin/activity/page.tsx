'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function ActivityAdminPage() {
  const { auditLogs } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">System Activity Log</h1>
      <div className="space-y-2">
        {auditLogs.map(l => (
          <div key={l.id} className="bg-white p-3 rounded-lg border border-enteya-border text-xs flex justify-between">
            <span>{l.action} - {l.details}</span>
            <span className="text-enteya-muted">{l.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
