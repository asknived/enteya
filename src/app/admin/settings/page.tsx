'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function SettingsAdminPage() {
  const { currentStaff } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">System Settings</h1>
      <div className="bg-white p-6 rounded-xl border border-enteya-border text-xs space-y-4">
        <div>
          <span className="font-bold text-enteya-purple">Active Session User:</span>
          <span className="ml-2">{currentStaff.name} ({currentStaff.role})</span>
        </div>
      </div>
    </div>
  );
}
