'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { BRAND_CONFIG } from '@/config/brand';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return BRAND_CONFIG.products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.finishes.some(f => f.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block w-full max-w-2xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-2xl border border-enteya-border z-10 relative my-8">
          
          {/* SEARCH BAR INPUT */}
          <div className="p-4 sm:p-6 border-b border-enteya-border flex items-center space-x-3 bg-enteya-surface">
            <Search className="w-6 h-6 text-enteya-purple shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, SKU (e.g. ENT-NK-001), category..."
              className="w-full text-base sm:text-lg bg-transparent border-none outline-none font-sans text-enteya-charcoal placeholder-gray-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs font-semibold uppercase text-gray-400 hover:text-black px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200/50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* SEARCH CONTENT / RESULTS */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            
            {/* NO QUERY: SUGGESTIONS */}
            {!query.trim() && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase tracking-mega font-bold text-enteya-magenta mb-2">
                    Popular Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Rolled-Gold Bangles', 'Antique Gold', 'Choker Necklaces', 'Jhumkas', 'Trendy Wear', 'Under ₹1,000'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs bg-enteya-purple-light hover:bg-enteya-purple hover:text-white text-enteya-purple-deep px-3 py-1.5 rounded-full transition-colors font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs uppercase tracking-mega font-bold text-enteya-charcoal mb-3">
                    Featured Quick Picks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BRAND_CONFIG.products.slice(0, 4).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-enteya-surface transition-colors border border-transparent hover:border-enteya-border"
                      >
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-bold text-enteya-charcoal line-clamp-1">{product.name}</p>
                          <p className="text-xs font-bold text-enteya-purple">₹{product.price.toLocaleString('en-IN')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* QUERY HAS MATCHES */}
            {query.trim() && searchResults.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-enteya-muted font-bold block">
                  Found {searchResults.length} piece{searchResults.length > 1 ? 's' : ''} for "{query}"
                </span>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="py-3 flex items-center justify-between hover:bg-enteya-surface p-2 rounded-xl transition-colors"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center space-x-4 flex-1"
                      >
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-enteya-purple font-semibold">SKU: {product.sku}</p>
                          <h4 className="font-serif text-base font-bold text-enteya-charcoal line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-enteya-muted">{product.category} | Finish: {product.finishes.join(', ')}</p>
                          <p className="font-serif text-sm font-bold text-enteya-charcoal mt-0.5">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </Link>

                      <button
                        onClick={() => {
                          addToCart(product);
                          setIsSearchOpen(false);
                        }}
                        className="bg-enteya-purple-deep hover:bg-enteya-magenta text-white p-2.5 rounded-full transition-colors shrink-0 ml-4"
                        title="Add to Enquiry Bag"
                      >
                        <ShoppingBag className="w-4 h-4 text-enteya-gold" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {query.trim() && searchResults.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <h3 className="font-serif text-2xl font-bold text-enteya-charcoal">
                  We couldn't find that piece.
                </h3>
                <p className="text-xs text-enteya-muted max-w-md mx-auto">
                  Try searching for "Antique Gold", "Bangles", "Necklace", or browse our popular categories below.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-2">
                  {BRAND_CONFIG.categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?category=${encodeURIComponent(c.name)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="text-xs bg-white border border-enteya-border hover:border-enteya-purple text-enteya-charcoal px-3 py-1.5 rounded-full transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
