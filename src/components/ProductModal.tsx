'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedQty);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-velvet/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-ivory text-darkText max-w-4xl w-full border border-hairline shadow-2xl rounded-[2px] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-darkText hover:text-burgundy transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="relative aspect-[3/4] bg-velvet/5 w-full flex items-center justify-center p-8">
          <Image
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Product Meta Details */}
        <div className="p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium block mb-1">
              {quickViewProduct.category}
            </span>
            <h2 className="font-serif text-3xl text-darkText font-normal mb-3">
              {quickViewProduct.name}
            </h2>
            <div className="font-sans text-xl text-darkText font-semibold mb-6">
              {quickViewProduct.price}
            </div>

            <p className="font-sans text-xs text-darkText/80 font-light leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Specifications */}
            <div className="space-y-2 border-t border-b border-hairline py-4 my-4">
              <span className="text-[11px] uppercase tracking-wider text-taupe block font-medium">
                CRAFTSMANSHIP HIGHLIGHTS
              </span>
              <ul className="space-y-1.5 text-xs text-darkText/90 font-light">
                {quickViewProduct.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-gold"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-burgundy hover:bg-burgundy-light text-ivory py-3.5 text-xs uppercase tracking-editorial font-medium rounded-[2px] transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO SELECTION</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="p-3.5 border border-hairline hover:border-burgundy text-darkText hover:text-burgundy transition-colors rounded-[2px]"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-burgundy text-burgundy' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-taupe pt-2">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-gold-dark" />
                <span>COMPLIMENTARY INSURED EXPRESS DELIVERY</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>CERTIFIED ENTEYA QUALITY</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
