'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function LeadsAdminPage() {
  const { leads } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Lead Pipeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['New Lead', 'Contacted', 'Interested', 'Converted'].map(stage => (
          <div key={stage} className="bg-enteya-surface p-4 rounded-xl border border-enteya-border space-y-3">
            <h3 className="font-bold uppercase text-xs tracking-wider text-enteya-purple">{stage}</h3>
            {leads.filter(l => l.stage === stage).map(l => (
              <div key={l.id} className="bg-white p-3 rounded-lg border border-enteya-border shadow-sm text-xs">
                <span className="font-bold block">{l.name}</span>
                <span className="text-enteya-muted block">{l.phone}</span>
                <span className="text-[10px] text-enteya-gold-dark mt-1 block">Priority: {l.priority} | Source: {l.source}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
