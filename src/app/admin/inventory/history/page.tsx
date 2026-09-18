'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function InventoryHistoryAdminPage() {
  const { auditLogs } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Stock History Logs</h1>
      <div className="space-y-2">
        {auditLogs.map(a => (
          <div key={a.id} className="bg-white p-3 rounded-lg border border-enteya-border text-xs flex justify-between">
            <div>
              <span className="font-bold text-enteya-purple">{a.action}</span>
              <span className="text-enteya-muted block">{a.details}</span>
            </div>
            <span className="text-[10px] text-enteya-muted">{a.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
