'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { setIsCartOpen, totalItems, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-hairline py-3.5 shadow-sm'
          : 'bg-[#FDFBF7] border-b border-hairline/60 py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex items-center space-x-10 text-[12px] uppercase tracking-editorial font-medium text-darkText/80">
          <Link href="#featured-products" className="hover:text-burgundy transition-colors duration-300">
            SHOP
          </Link>
          <Link href="#collections" className="hover:text-burgundy transition-colors duration-300">
            COLLECTIONS
          </Link>
          <Link href="#featured-products" className="hover:text-burgundy transition-colors duration-300">
            NEW ARRIVALS
          </Link>
          <Link href="#craftsmanship" className="hover:text-burgundy transition-colors duration-300">
            ABOUT
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-1 text-darkText focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Brand Logo */}
        <div className="flex-1 md:flex-initial text-center flex justify-center">
          <Link href="/" className="inline-block group py-1">
            {/* eslint-disable-next-html-element-for-svg */}
            <img
              src="/images/logo.svg"
              alt="ENTEYA Haute Joaillerie"
              className="h-8 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right Nav Controls */}
        <div className="flex items-center space-x-6 text-[12px] tracking-widest text-darkText/80">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden md:flex items-center space-x-1.5 hover:text-burgundy transition-colors duration-300 uppercase"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden lg:inline text-[11px]">SEARCH</span>
          </button>

          {/* Account */}
          <button
            className="hidden md:flex items-center space-x-1.5 hover:text-burgundy transition-colors duration-300 uppercase"
            aria-label="Account"
          >
            <User className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden lg:inline text-[11px]">ACCOUNT</span>
          </button>

          {/* Wishlist */}
          <a
            href="#featured-products"
            className="flex items-center space-x-1.5 hover:text-burgundy transition-colors duration-300 relative uppercase"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden lg:inline text-[11px]">WISHLIST</span>
            {wishlist.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-burgundy text-ivory text-[9px] flex items-center justify-center font-sans font-semibold">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 hover:text-burgundy transition-colors duration-300 relative uppercase"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5]" />
            <span className="hidden lg:inline text-[11px]">CART</span>
            <span className="w-4 h-4 rounded-full bg-burgundy text-ivory text-[9px] flex items-center justify-center font-sans font-semibold">
              {totalItems}
            </span>
          </button>
        </div>

      </div>

      {/* Quick Search Drawer */}
      {searchOpen && (
        <div className="bg-ivory-alabaster border-t border-b border-hairline py-4 px-6 md:px-12 transition-all">
          <div className="max-w-xl mx-auto relative flex items-center">
            <input
              type="text"
              placeholder="Search necklaces, bangles, earrings..."
              className="w-full bg-transparent border-b border-burgundy/40 py-2 pl-2 pr-10 text-sm font-sans focus:outline-none focus:border-burgundy"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-2 text-xs uppercase text-taupe hover:text-burgundy"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-ivory border-b border-hairline p-8 flex flex-col space-y-6 animate-fadeIn shadow-2xl z-50">
          <nav className="flex flex-col space-y-5 text-sm uppercase tracking-editorial font-medium text-darkText">
            <Link
              href="#featured-products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-burgundy transition-colors"
            >
              SHOP ALL
            </Link>
            <Link
              href="#collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-burgundy transition-colors"
            >
              COLLECTIONS
            </Link>
            <Link
              href="#editorial-feature"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-burgundy transition-colors"
            >
              NEW ARRIVALS
            </Link>
            <Link
              href="#craftsmanship"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-burgundy transition-colors"
            >
              OUR CRAFTSMANSHIP
            </Link>
          </nav>

          <div className="pt-6 border-t border-hairline flex justify-between items-center text-xs tracking-widest text-taupe">
            <span>CURRENCY: INR (₹)</span>
            <span>CUSTOMER CARE</span>
          </div>
        </div>
      )}
    </header>
  );
};
