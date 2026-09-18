'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/config/brand';
import { useShop } from '@/context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, addToCart, setQuickViewProduct } = useShop();
  const [selectedFinish, setSelectedFinish] = useState(product.finishes?.[0] || 'Antique Gold');
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(product.id);

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-enteya-border/70 hover:border-enteya-gold/50 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CARD IMAGE & BADGES */}
      <div className="relative aspect-square w-full bg-enteya-surface overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
          {product.discountBadge && (
            <span className="bg-enteya-magenta text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              {product.discountBadge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-enteya-purple-deep text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-enteya-gold-champagne text-enteya-charcoal text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-enteya-magenta text-white shadow-md'
              : 'bg-white/80 text-enteya-charcoal hover:bg-white hover:text-enteya-magenta shadow-sm'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-full bg-white/95 backdrop-blur-md hover:bg-enteya-purple-deep hover:text-white text-enteya-charcoal text-xs uppercase tracking-widest font-semibold py-2.5 rounded-lg border border-enteya-border transition-colors flex items-center justify-center space-x-2 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* CARD BODY DETAILS */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        
        <div>
          <div className="flex items-center justify-between text-[11px] text-enteya-muted mb-1">
            <span className="uppercase font-semibold tracking-wider text-enteya-purple">{product.category}</span>
            <span className="font-mono text-[10px] text-gray-400">SKU: {product.sku}</span>
          </div>

          <Link href={`/product/${product.id}`} className="group-hover:text-enteya-purple transition-colors">
            <h3 className="font-serif text-base font-bold text-enteya-charcoal line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Finish / Variant Selector */}
        {product.finishes && product.finishes.length > 0 && (
          <div className="flex items-center space-x-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-enteya-muted mr-1">Finish:</span>
            {product.finishes.map((finish) => (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                  selectedFinish === finish
                    ? 'border-enteya-magenta bg-enteya-magenta/10 text-enteya-magenta font-semibold'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        )}

        {/* PRICE & ADD TO ENQUIRY BAG */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-lg font-bold text-enteya-charcoal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Under ₹2,000 Guarantee</span>
          </div>

          <button
            onClick={() => addToCart(product, 1, selectedFinish)}
            className="bg-enteya-purple-deep hover:bg-enteya-magenta text-white p-2.5 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center group/btn"
            title="Add to Enquiry Bag"
          >
            <ShoppingBag className="w-4 h-4 text-enteya-gold group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
