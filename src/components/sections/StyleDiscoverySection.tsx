'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { ArrowRight } from 'lucide-react';

export const StyleDiscoverySection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-mega font-bold text-enteya-magenta">STYLING INTENT</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal mt-1">
            Discover Jewellery by Style
          </h2>
          <p className="text-sm text-enteya-muted font-light mt-2">
            Tailored edits curated for your daily routine, grand festivities, and thoughtful gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_CONFIG.styleDiscovery.map((item) => (
            <Link
              key={item.id}
              href={`/shop${item.query}`}
              className="group relative rounded-2xl overflow-hidden border border-enteya-border/70 hover:border-enteya-gold shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col bg-enteya-surface"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-enteya-gold">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-bold group-hover:text-enteya-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-2 font-light">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-enteya-gold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
