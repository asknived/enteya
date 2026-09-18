'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1F080D] text-ivory/80 pt-20 pb-12 px-6 md:px-12 border-t border-gold/20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 pb-16 border-b border-gold/20">
          
          {/* Brand Wordmark & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block py-1">
              <img
                src="/images/logo-light.svg"
                alt="ENTEYA Haute Joaillerie"
                className="h-9 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed max-w-sm">
              Enteya is a contemporary haute joaillerie house celebrating Indian heritage through quiet luxury, exceptional detail, and timeless silhouettes.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium font-sans">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-ivory/70">
              <li>
                <Link href="#featured-products" className="hover:text-gold transition-colors">
                  SHOP ALL
                </Link>
              </li>
              <li>
                <Link href="#collections" className="hover:text-gold transition-colors">
                  COLLECTIONS
                </Link>
              </li>
              <li>
                <Link href="#craftsmanship" className="hover:text-gold transition-colors">
                  ABOUT ENTEYA
                </Link>
              </li>
              <li>
                <Link href="#editorial-feature" className="hover:text-gold transition-colors">
                  EDITORIAL
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium font-sans">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-ivory/70">
              <li>
                <a href="#footer" className="hover:text-gold transition-colors">
                  SHIPPING & DELIVERY
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-gold transition-colors">
                  RETURNS & EXCHANGES
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-gold transition-colors">
                  JEWELLERY CARE
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-gold transition-colors">
                  PRIVACY POLICY
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Atelier Column */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium font-sans">
              SOCIAL & ATELIER
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-ivory/70">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  FACEBOOK
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  PINTEREST
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-ivory/50 font-sans tracking-widest space-y-4 md:space-y-0">
          <span>© {new Date().getFullYear()} ENTEYA HAUTE JOAILLERIE. ALL RIGHTS RESERVED.</span>
          <span className="text-gold-light/60 text-[10px]">CRAFTED WITH QUIET LUXURY</span>
        </div>

      </div>
    </footer>
  );
};
