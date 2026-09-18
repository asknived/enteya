'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] md:h-[95vh] bg-[#1F080D] text-[#FDFBF7] overflow-hidden flex items-center">
      {/* Editorial Hero Photography Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/enteya-01.png"
          alt="Enteya Haute Joaillerie Hero Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_35%] md:object-[70%_25%] transition-transform duration-[1200ms] scale-[1.01]"
        />
        {/* Subtle dark gradient overlay to ensure negative space text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F080D]/90 via-[#1F080D]/60 to-transparent md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F080D]/80 via-transparent to-transparent md:hidden" />
      </div>

      {/* Hero Content positioned in negative space */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        <div className="max-w-xl text-left py-12">
          {/* Subtle gold label */}
          <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[0.3em] text-gold-light mb-4 font-sans font-medium">
            HAUTE COUTURE ADORNMENTS
          </span>

          {/* Editorial Display Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-wide text-ivory font-normal mb-6">
            THE ART <br />
            <span className="italic font-normal text-gold-light">OF ADORNMENT</span>
          </h1>

          {/* Body paragraph */}
          <p className="font-sans text-sm md:text-base text-ivory/90 font-light tracking-wide leading-relaxed mb-10 max-w-md">
            Jewellery designed to become part of your story. Sculpted in gold, adorned with deep burgundy grace.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="#featured-products"
              className="inline-flex items-center justify-center bg-burgundy hover:bg-burgundy-light text-ivory text-xs uppercase tracking-editorial px-8 py-4 transition-all duration-300 rounded-[4px] border border-gold/40 hover:border-gold shadow-md"
            >
              EXPLORE THE COLLECTION
            </Link>

            <Link
              href="#craftsmanship"
              className="inline-flex items-center justify-center bg-transparent hover:bg-ivory/10 text-gold-light text-xs uppercase tracking-editorial px-8 py-4 transition-all duration-300 rounded-[4px] border border-gold/40 hover:border-gold"
            >
              DISCOVER ENTEYA
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10 hidden sm:flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
        <span>SCROLL TO DISCOVER</span>
        <div className="w-8 h-[1px] bg-gold/50"></div>
      </div>
    </section>
  );
};
