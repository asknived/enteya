'use client';

import React from 'react';
import { BRAND_CONFIG } from '@/config/brand';
import { ProductCard } from '@/components/ui/ProductCard';
import { Sparkles } from 'lucide-react';

export const ProductPreviewSection: React.FC = () => {
  const bestSellers = BRAND_CONFIG.products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section id="bestsellers" className="py-16 bg-white border-b border-enteya-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-enteya-magenta text-xs font-bold uppercase tracking-mega">
            <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
            <span>MOST LOVED PIECES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal mt-1">
            ENTEYA Bestsellers
          </h2>
          <p className="text-sm text-enteya-muted font-light mt-2">
            Discover the rolled-gold bangles, antique chokers & statement pieces our community loves.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
