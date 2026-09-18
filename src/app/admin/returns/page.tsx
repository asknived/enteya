'use client';

import React from 'react';
import { useCrm } from '@/context/CrmContext';

export default function ReturnsAdminPage() {
  const { sales } = useCrm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif text-enteya-charcoal">Returns & Exchanges</h1>
      <p className="text-xs text-enteya-muted">Manage product exchange requests and returns.</p>
    </div>
  );
}
