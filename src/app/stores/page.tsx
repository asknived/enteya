'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND_CONFIG } from '@/config/brand';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { WishlistDrawer } from '@/components/modals/WishlistDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-enteya-magenta selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-mega font-bold text-enteya-magenta">OUR BOUTIQUES</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-enteya-charcoal mt-1">
            Locate ENTEYA Stores
          </h1>
          <p className="text-sm text-enteya-muted font-light mt-2">
            Visit our 12 flagship boutiques across major Indian cities to experience our jewellery in person.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_CONFIG.stores.map((store) => (
            <div key={store.id} className="bg-enteya-surface border border-enteya-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-enteya-magenta">{store.city}</span>
                    <h3 className="font-serif text-xl font-bold text-enteya-charcoal mt-0.5">{store.name}</h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Open Today</span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-enteya-muted font-light">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-enteya-purple flex-shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-enteya-purple flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-enteya-gold-dark flex-shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>
              </div>

              <a
                href={store.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-enteya-purple-light text-enteya-purple text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg border border-enteya-border transition-colors"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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
