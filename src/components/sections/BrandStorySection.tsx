'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const { brandStory } = BRAND_CONFIG;

  return (
    <section className="py-20 bg-enteya-purple-light/30 border-b border-enteya-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* IMAGE EDITORIAL BLOCK */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
              <Image
                src={brandStory.image}
                alt="ENTEYA Brand Story Modern Indian Gold"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
                <span className="text-[10px] font-bold uppercase tracking-mega text-enteya-gold">HERITAGE & INNOVATION</span>
                <p className="font-serif text-lg font-bold">Micro-Plated Gold Craftsmanship</p>
              </div>
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -bottom-6 -left-6 bg-enteya-purple-deep text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-enteya-gold/30">
              <span className="block font-serif text-2xl font-bold text-enteya-gold">Under ₹2,000</span>
              <span className="block text-xs text-gray-200 mt-1">High-lustre rolled-gold & antique finishes for everyday elegance.</span>
            </div>
          </div>

          {/* TEXT EDITORIAL BLOCK */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1 rounded-full border border-enteya-gold/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
              <span className="text-xs uppercase tracking-widest font-semibold text-enteya-purple">
                {brandStory.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-enteya-charcoal leading-tight">
              {brandStory.headline}
            </h2>

            <p className="text-base text-enteya-muted leading-relaxed font-light">
              ENTEYA reimagines traditional Indian gold jewellery for the modern lifestyle. By combining authentic antique motifs with precision rolled-gold micro-plating, we bring you versatile, tarnish-resistant pieces that look regal yet feel weightless.
            </p>

            <p className="text-sm text-enteya-charcoal font-medium leading-relaxed">
              Designed primarily under ₹2,000, ENTEYA lets you express every version of yourself — whether dressing up for work, celebrations, or spontaneous moments.
            </p>

            <div className="pt-4">
              <Link
                href={brandStory.ctaHref}
                className="inline-flex items-center space-x-3 bg-enteya-purple-deep hover:bg-enteya-magenta text-white px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest transition-all shadow-md group"
              >
                <span>{brandStory.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-enteya-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
