'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="relative py-20 bg-enteya-purple-deep text-white overflow-hidden border-b border-enteya-gold/30">
      
      {/* Background Image Overlay */}
      <Image
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80"
        alt="ENTEYA Jewellery Banner"
        fill
        className="object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-enteya-purple-deep via-enteya-purple-deep/90 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-2xl space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/10 border border-enteya-gold/40 text-enteya-gold text-xs font-bold tracking-mega uppercase rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-enteya-gold shrink-0" />
            <span>MODERN INDIAN GOLD, REIMAGINED</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Discover Jewellery That Belongs to Every Version of You
          </h2>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
            Rolled-gold bangles, antique-gold necklaces & everyday statement pieces primarily under ₹2,000. Available for enquiry online or in our 12 physical stores.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-enteya-gold hover:bg-white text-enteya-charcoal hover:text-enteya-purple-deep text-xs font-bold tracking-widest uppercase rounded-full shadow-xl transition-all group"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4 text-enteya-purple-deep group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
