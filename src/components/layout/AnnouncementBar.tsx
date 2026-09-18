'use client';

import React from 'react';
import { BRAND_CONFIG } from '@/config/brand';
import { Sparkles, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-enteya-purple-deep text-white text-xs tracking-wider uppercase font-medium py-2 px-4 border-b border-enteya-gold/20 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-center sm:text-left">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-enteya-gold animate-pulse" />
          <span>{BRAND_CONFIG.announcementText}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-widest">
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-enteya-gold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Assistance</span>
          </a>
          <span className="text-enteya-gold/40">|</span>
          <span className="text-enteya-gold font-semibold">12 Physical Stores Across India</span>
        </div>
      </div>
    </div>
  );
};
