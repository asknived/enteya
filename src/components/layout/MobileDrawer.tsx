'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronRight, PhoneCall, Mail, Instagram, MapPin } from 'lucide-react';

import { Logo } from '@/components/brand/Logo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, navLinks }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-sm bg-ivory shadow-2xl flex flex-col border-r border-gold/30">
          
          {/* Header */}
          <div className="p-5 bg-plum text-ivory flex items-center justify-between border-b border-gold/30">
            <Logo variant="maroon" size="sm" />
            <button
              onClick={onClose}
              className="text-ivory/60 hover:text-gold transition-colors p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <h4 className="font-serif text-xs uppercase tracking-widest text-charcoal-subtle">Explore Enteya</h4>
              <nav className="flex flex-col space-y-3 font-sans text-sm font-semibold uppercase tracking-wider text-charcoal">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2 border-b border-taupe/20 hover:text-magenta transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-taupe/20">
              <h4 className="font-serif text-xs uppercase tracking-widest text-charcoal-subtle">Customer Concierge</h4>
              <div className="space-y-2 text-xs font-sans text-charcoal-muted">
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-magenta" />
                  <span>WhatsApp: +91 98765 43210</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-magenta" />
                  <span>care@enteyajewellery.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-magenta" />
                  <span>Designed & Crafted in India</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer inside mobile menu */}
          <div className="p-5 bg-ivory-dark border-t border-taupe/30 text-center">
            <p className="text-[11px] font-sans text-charcoal-subtle">
              Complimentary Insured Shipping Across India
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
