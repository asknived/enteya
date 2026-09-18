'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { ArrowUpRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-enteya-border/60">
          <div>
            <span className="text-xs uppercase tracking-mega font-bold text-enteya-magenta">CURATED CATALOGUE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal mt-1">
              Shop by Mood & Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-enteya-purple hover:text-enteya-magenta transition-colors flex items-center space-x-1"
          >
            <span>Explore All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {BRAND_CONFIG.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-enteya-surface flex flex-col border border-enteya-border/60"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-enteya-gold">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif text-base font-bold leading-tight group-hover:text-enteya-gold transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
