'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-enteya-charcoal text-white pt-16 pb-12 border-t border-enteya-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-widest text-white">
                ENTE<span className="text-enteya-gold">YA</span>
              </span>
            </Link>
            <p className="font-serif italic text-lg text-enteya-gold">
              "{BRAND_CONFIG.slogan}"
            </p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {BRAND_CONFIG.positioning}. Precision-engineered rolled-gold bangles, antique-gold necklaces & contemporary fashion jewellery under ₹2,000.
            </p>
            
            <div className="pt-2 flex items-center space-x-4">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/stores"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15"
              >
                <MapPin className="w-4 h-4 text-enteya-gold" />
                <span>12 Stores</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-xs uppercase tracking-mega text-enteya-gold font-bold mb-4">Catalogue</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li><Link href="/shop" className="hover:text-enteya-gold transition-colors">All Jewellery</Link></li>
                <li><Link href="/shop?category=Bangles" className="hover:text-enteya-gold transition-colors">Rolled-Gold Bangles</Link></li>
                <li><Link href="/shop?category=Necklaces" className="hover:text-enteya-gold transition-colors">Rolled-Gold Necklaces</Link></li>
                <li><Link href="/shop?collection=Antique+Gold" className="hover:text-enteya-gold transition-colors">Antique-Gold Edit</Link></li>
                <li><Link href="/shop?category=Trendy+Rolled+Gold" className="hover:text-enteya-gold transition-colors">Trendy Wear</Link></li>
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-xs uppercase tracking-mega text-enteya-gold font-bold mb-4">Collections</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li><Link href="/collections" className="hover:text-enteya-gold transition-colors">Browse Collections</Link></li>
                <li><Link href="/shop?collection=Everyday+Jewellery" className="hover:text-enteya-gold transition-colors">For Everyday</Link></li>
                <li><Link href="/shop?collection=Statement+Jewellery" className="hover:text-enteya-gold transition-colors">For Celebrations</Link></li>
                <li><Link href="/shop?sort=newest" className="hover:text-enteya-gold transition-colors">New Arrivals</Link></li>
                <li><Link href="/stores" className="hover:text-enteya-gold transition-colors">Store Locator</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs uppercase tracking-mega text-enteya-gold font-bold mb-4">Customer Care</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-enteya-gold transition-colors">About ENTEYA</Link></li>
                <li><a href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-enteya-gold transition-colors">WhatsApp Assistance</a></li>
                <li><Link href="/stores" className="hover:text-enteya-gold transition-colors">Store Hours & Maps</Link></li>
                <li className="pt-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>WhatsApp Verified</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} ENTEYA Jewellery. All rights reserved. {BRAND_CONFIG.positioning}.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-enteya-magenta fill-enteya-magenta" />
              <span>in India</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
