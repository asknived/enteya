'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND_CONFIG } from '@/config/brand';
import Image from 'next/image';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { WishlistDrawer } from '@/components/modals/WishlistDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-enteya-magenta selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-mega font-bold text-enteya-magenta">OUR STORY</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-enteya-charcoal mt-2">
            The ENTEYA Philosophy
          </h1>
          <p className="text-base sm:text-lg text-enteya-muted font-light mt-4 leading-relaxed">
            {BRAND_CONFIG.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/brand-story.jpg"
              alt="ENTEYA Artisan Craftsmanship"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center space-x-2 bg-enteya-purple-light px-3 py-1 rounded-full text-xs text-enteya-purple-deep font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
              <span>Modern Indian Gold</span>
            </span>
            <h2 className="font-serif text-3xl font-bold text-enteya-charcoal">
              Redefining Luxury Jewellery for Everyday Occasions
            </h2>
            <p className="text-sm text-enteya-muted leading-relaxed font-light">
              Founded on the principle that exquisite adornments shouldn't be reserved only for rare celebrations, ENTEYA brings micro-plated 22k rolled gold and antique Kundan motifs to contemporary women across India.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-enteya-surface rounded-xl border border-enteya-border">
                <ShieldCheck className="w-6 h-6 text-enteya-purple mb-2" />
                <h4 className="font-bold text-sm text-enteya-charcoal">Anti-Tarnish Guarantee</h4>
                <p className="text-xs text-enteya-muted mt-1 font-light">Layered micro-plating engineered for sweat & skin endurance.</p>
              </div>

              <div className="p-4 bg-enteya-surface rounded-xl border border-enteya-border">
                <Award className="w-6 h-6 text-enteya-gold-dark mb-2" />
                <h4 className="font-bold text-sm text-enteya-charcoal">Artisan Finishing</h4>
                <p className="text-xs text-enteya-muted mt-1 font-light">Chiselled filigree and hand-set faux gemstones.</p>
              </div>
            </div>
          </div>
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
