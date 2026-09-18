'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { X, ShoppingBag, Heart, Check, Plus, Minus, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentFinish = selectedFinish || quickViewProduct.finishes?.[0] || 'Antique Gold';
  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToBag = () => {
    addToCart(quickViewProduct, quantity, currentFinish);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal / Bottom Sheet */}
      <div className="relative bg-white w-full max-w-3xl rounded-t-2xl sm:rounded-2xl shadow-2xl border border-enteya-border overflow-hidden z-10 max-h-[90vh] sm:max-h-[85vh] flex flex-col sm:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-500 hover:text-black hover:bg-white transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PRODUCT IMAGE */}
        <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto min-h-[250px] bg-enteya-surface">
          <Image
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute top-4 left-4 flex flex-col space-y-1">
            {quickViewProduct.discountBadge && (
              <span className="bg-enteya-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {quickViewProduct.discountBadge}
              </span>
            )}
            <span className="bg-enteya-purple-deep text-white text-[10px] font-bold px-2 py-0.5 rounded">
              SKU: {quickViewProduct.sku}
            </span>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-enteya-purple tracking-wider">
                {quickViewProduct.category}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                In Stock & Ready for Enquiry
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-enteya-charcoal">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline space-x-3">
              <span className="font-serif text-2xl font-bold text-enteya-charcoal">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-enteya-muted leading-relaxed font-light">
              {quickViewProduct.description}
            </p>

            {/* FINISH OPTIONS */}
            {quickViewProduct.finishes && quickViewProduct.finishes.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs uppercase font-bold text-enteya-charcoal tracking-wider">
                  Select Finish: <span className="text-enteya-magenta">{currentFinish}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.finishes.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        currentFinish === finish
                          ? 'border-enteya-magenta bg-enteya-magenta/10 text-enteya-magenta font-semibold'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY PICKER */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs uppercase font-bold text-enteya-charcoal tracking-wider">
                Quantity:
              </label>
              <div className="flex items-center space-x-3 w-32 border border-gray-300 rounded-lg p-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-enteya-purple-deep hover:bg-enteya-magenta text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-enteya-gold" />
                <span>Add to Enquiry Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isSaved
                    ? 'border-enteya-magenta bg-enteya-magenta text-white'
                    : 'border-gray-300 text-gray-700 hover:border-enteya-magenta hover:text-enteya-magenta'
                }`}
                title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="w-full inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-enteya-purple hover:text-enteya-magenta py-1 transition-colors"
            >
              <span>View Full Details & Care Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
