'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { ShieldCheck, MessageCircle, MapPin, Tag } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const iconsMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-enteya-gold" />,
    MessageCircle: <MessageCircle className="w-6 h-6 text-emerald-500" />,
    MapPin: <MapPin className="w-6 h-6 text-enteya-magenta" />,
    Tag: <Tag className="w-6 h-6 text-enteya-purple" />,
  };

  return (
    <section className="py-14 bg-enteya-purple-light/20 border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_CONFIG.trustPoints.map((point) => (
            <div
              key={point.id}
              className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-enteya-border/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-enteya-surface rounded-xl border border-enteya-border/40 shrink-0">
                {iconsMap[point.icon] || <ShieldCheck className="w-6 h-6 text-enteya-gold" />}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-enteya-charcoal">
                  {point.title}
                </h4>
                <p className="text-xs text-enteya-muted leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 12 Stores Banner Link Teaser */}
        <div className="mt-10 bg-gradient-to-r from-enteya-purple-deep to-enteya-purple p-6 sm:p-8 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between shadow-purple-glow">
          <div className="space-y-1 text-center sm:text-left mb-4 sm:mb-0">
            <span className="text-[10px] font-bold uppercase tracking-mega text-enteya-gold">PHYSICAL BOUTIQUES</span>
            <h3 className="font-serif text-2xl font-bold">Visit ENTEYA In-Store across 12 Locations</h3>
            <p className="text-xs text-gray-200 font-light">Experience the craftsmanship in Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata & more.</p>
          </div>
          <Link
            href="/stores"
            className="shrink-0 bg-enteya-gold hover:bg-white text-enteya-charcoal hover:text-enteya-purple-deep px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
          >
            Locate Stores
          </Link>
        </div>

      </div>
    </section>
  );
};
