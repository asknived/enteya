'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Search, Heart, ShoppingBag, Menu, X, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'About', href: '/about' },
    { label: 'Stores', href: '/stores' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header py-3 shadow-md border-b border-enteya-border'
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-enteya-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: ENTEYA LOGO */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-enteya-charcoal p-1 hover:text-enteya-purple transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="group flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-enteya-purple-deep group-hover:text-enteya-magenta transition-colors">
                ENTE<span className="text-enteya-gold">YA</span>
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-enteya-gold"></span>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm uppercase tracking-widest font-medium transition-all relative py-1 hover:text-enteya-magenta ${
                    isActive ? 'text-enteya-magenta font-semibold' : 'text-enteya-charcoal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-enteya-magenta rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: SEARCH, WISHLIST, ENQUIRY BAG */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-enteya-charcoal hover:text-enteya-purple transition-colors relative group"
              title="Search Catalogue"
              aria-label="Search Catalogue"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Search</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 text-enteya-charcoal hover:text-enteya-magenta transition-colors relative group"
              title="Saved Wishlist"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-enteya-magenta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </button>

            {/* ENQUIRY BAG BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-enteya-purple-deep hover:bg-enteya-purple text-white px-3 sm:px-4 py-2 rounded-full transition-all shadow-purple-glow hover:shadow-lg"
              title="View Enquiry Bag"
              aria-label="View Enquiry Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-enteya-gold" />
              <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold">
                Enquiry Bag
              </span>
              <span className="bg-enteya-magenta text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-enteya-border shadow-xl py-6 px-6 z-50 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base uppercase tracking-wider font-medium text-enteya-charcoal hover:text-enteya-purple py-2 border-b border-gray-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-enteya-gold text-lg">›</span>
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/stores"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-sm text-enteya-purple font-semibold bg-enteya-purple-light p-3 rounded-lg"
              >
                <MapPin className="w-4 h-4 text-enteya-purple-deep" />
                <span>Locate ENTEYA Stores (12 Locations)</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
