'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  // Display top 4 featured products on desktop
  const featuredProducts = BRAND_CONFIG.products.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-enteya-border/60">
          <div>
            <div className="inline-flex items-center space-x-2 text-enteya-magenta text-xs font-bold uppercase tracking-mega">
              <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
              <span>CURATED HIGHLIGHTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal mt-1">
              The ENTEYA Edit
            </h2>
            <p className="text-sm text-enteya-muted font-light mt-1">
              Handpicked signature rolled-gold and antique pieces under ₹2,000.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-enteya-purple hover:text-enteya-magenta transition-colors flex items-center space-x-1"
          >
            <span>View All Edit</span>
            <ArrowRight className="w-4 h-4 text-enteya-gold" />
          </Link>
        </div>

        {/* 4 Products on Desktop, 2-column grid on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
