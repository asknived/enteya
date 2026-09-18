'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { BRAND_CONFIG } from '@/config/brand';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = BRAND_CONFIG.products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-enteya-border">
          
          <div className="p-5 bg-enteya-purple-deep text-white flex items-center justify-between border-b border-enteya-gold/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Heart className="w-5 h-5 text-enteya-magenta fill-enteya-magenta" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wide">Saved Wishlist</h2>
                <p className="text-[11px] text-gray-200">{wishlist.length} saved jewellery pieces</p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-enteya-magenta/10 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-enteya-magenta" />
                </div>
                <h3 className="font-serif text-xl font-bold text-enteya-charcoal">No Saved Pieces Yet</h3>
                <p className="text-xs text-enteya-muted max-w-xs mx-auto">
                  Click the heart icon on any product to save it to your wishlist.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsWishlistOpen(false)}
                  className="inline-block bg-enteya-purple-deep text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-enteya-magenta transition-colors"
                >
                  Browse Catalogue
                </Link>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex space-x-4 p-3 bg-enteya-surface rounded-xl border border-enteya-border/60 relative"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-white border border-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-bold text-enteya-charcoal line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] font-mono text-enteya-muted">SKU: {product.sku}</p>
                      <p className="font-serif text-sm font-bold text-enteya-charcoal mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="w-full bg-enteya-purple-deep hover:bg-enteya-magenta text-white text-xs uppercase font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-enteya-gold" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
