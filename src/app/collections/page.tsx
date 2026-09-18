'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import Image from 'next/image';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { WishlistDrawer } from '@/components/modals/WishlistDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { ArrowUpRight } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-enteya-magenta selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-mega font-bold text-enteya-magenta">OUR COLLECTIONS</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-enteya-charcoal mt-1">
            Curated Jewellery Lines
          </h1>
          <p className="text-sm text-enteya-muted font-light mt-2">
            Each collection is designed to blend heritage artistry with contemporary comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND_CONFIG.categories.map((cat) => (
            <div key={cat.id} className="bg-enteya-surface border border-enteya-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-enteya-gold text-enteya-charcoal font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {cat.itemCount}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-enteya-charcoal group-hover:text-enteya-purple transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-enteya-muted mt-2 font-light">
                    {cat.subtitle}
                  </p>
                </div>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="mt-6 inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-enteya-purple hover:text-enteya-magenta transition-colors"
                >
                  <span>Browse Collection</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}
