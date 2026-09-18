'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { hero } = BRAND_CONFIG;

  return (
    <section className="relative bg-gradient-to-b from-enteya-purple-light/50 via-white to-white py-12 lg:py-20 overflow-hidden border-b border-enteya-border/40">
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-enteya-purple/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-enteya-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* TEXT CONTENT */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
            
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-enteya-gold/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-enteya-gold" />
              <span className="text-xs uppercase tracking-widest font-semibold text-enteya-purple-deep">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enteya-charcoal leading-[1.15]">
              Discover jewellery that belongs to <span className="text-enteya-purple-deep italic font-normal">every version of you.</span>
            </h1>

            <p className="text-base sm:text-lg text-enteya-muted font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              <strong className="font-semibold text-enteya-charcoal">{BRAND_CONFIG.positioning}.</strong> Handcrafted rolled-gold bangles, antique-gold necklaces & statement pieces thoughtfully priced primarily under ₹2,000.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-enteya-purple-deep hover:bg-enteya-purple text-white px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all shadow-purple-glow hover:shadow-xl group"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-enteya-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop?sort=newest"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-enteya-surface text-enteya-charcoal px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all border border-enteya-border hover:border-enteya-gold shadow-sm"
              >
                <span>{hero.secondaryCtaText}</span>
              </Link>
            </div>

            {/* TRUST BADGE STRIP */}
            <div className="pt-6 border-t border-enteya-border/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-serif text-2xl font-bold text-enteya-purple">Under ₹2,000</span>
                <span className="text-xs text-enteya-muted">Primary Pricing</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-enteya-gold-dark">100% Anti-Tarnish</span>
                <span className="text-xs text-enteya-muted">Micro-Plated Gold</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-enteya-magenta">12 Stores</span>
                <span className="text-xs text-enteya-muted">Pan-India Boutiques</span>
              </div>
            </div>

          </div>

          {/* EDITORIAL HERO PHOTOGRAPHY */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-enteya-magenta">FEATURED EDIT</span>
                      <p className="font-serif text-lg font-bold text-enteya-charcoal">Classic Antique Gold Choker</p>
                      <p className="text-xs text-enteya-muted">Price: ₹1,799 | SKU: ENT-NK-001</p>
                    </div>
                    <Link
                      href="/product/classic-antique-gold-necklace"
                      className="bg-enteya-purple-deep hover:bg-enteya-magenta text-white p-2.5 rounded-full transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Floating Accent Badge */}
              <div className="absolute -top-6 -right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-enteya-gold/30 hidden sm:flex items-center space-x-3 z-20">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-enteya-charcoal">WhatsApp Enquiry</span>
                  <span className="block text-[11px] text-emerald-600 font-medium">Instant Support</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
