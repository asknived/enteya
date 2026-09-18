'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  // Show products marked isNew or slice items 4 to 8
  const newArrivals = BRAND_CONFIG.products.filter(p => p.isNew).slice(0, 4);

  return (
    <section className="py-16 bg-enteya-surface border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-enteya-border/60">
          <div>
            <div className="inline-flex items-center space-x-2 text-enteya-purple text-xs font-bold uppercase tracking-mega">
              <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
              <span>FRESH IN BOUTIQUES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal mt-1">
              New Arrivals
            </h2>
            <p className="text-sm text-enteya-muted font-light mt-1">
              Discover our newest modern Indian gold additions and daily anti-tarnish wear.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-enteya-purple-deep hover:text-enteya-magenta transition-colors flex items-center space-x-1 bg-white px-4 py-2 rounded-full border border-enteya-border shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-enteya-gold" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
