'use client';

import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside className="w-full bg-velvet text-gold-light text-[11px] md:text-[12px] uppercase tracking-[0.25em] h-[34px] flex items-center justify-center border-b border-gold/15 z-50 relative select-none">
      <div className="flex items-center space-x-3">
        <span className="inline-block w-1 h-1 rounded-full bg-gold/50"></span>
        <span>A COLLECTION OF TIMELESS ADORNMENT</span>
        <span className="inline-block w-1 h-1 rounded-full bg-gold/50"></span>
      </div>
    </aside>
  );
};
