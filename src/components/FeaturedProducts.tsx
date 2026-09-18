'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export const FeaturedProducts: React.FC = () => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useCart();

  return (
    <section id="featured-products" className="w-full bg-ivory-alabaster py-24 md:py-32 px-6 md:px-12 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-taupe font-medium block mb-3">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-darkText font-normal mb-4">
            THE EDIT
          </h2>
          <p className="font-sans text-sm md:text-base text-taupe font-light tracking-wide">
            A considered selection of Enteya signatures.
          </p>
        </div>

        {/* 4 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {PRODUCTS.map((product: Product) => {
            const wishlisted = isWishlisted(product.id);

            return (
              <div key={product.id} className="group relative flex flex-col justify-between">
                
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] w-full bg-velvet/5 overflow-hidden mb-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center text-darkText hover:text-burgundy transition-colors duration-300 shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        wishlisted ? 'fill-burgundy text-burgundy' : ''
                      }`}
                    />
                  </button>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-velvet/60 via-velvet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="px-4 py-2 bg-ivory text-darkText text-[11px] uppercase tracking-wider font-medium rounded-[2px] hover:bg-burgundy hover:text-ivory transition-colors flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>QUICK VIEW</span>
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-burgundy text-ivory text-[11px] uppercase tracking-wider font-medium rounded-[2px] hover:bg-burgundy-deep transition-colors flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-taupe font-medium">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-xl text-darkText cursor-pointer hover:text-burgundy transition-colors duration-300 font-normal"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 pt-1 font-sans text-sm text-darkText/90 font-medium">
                    <span>{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-taupe line-through font-normal">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
