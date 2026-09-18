'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const EditorialFeature: React.FC = () => {
  return (
    <section id="editorial-feature" className="w-full bg-ivory py-20 md:py-32 px-6 md:px-12 border-b border-hairline overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Dominant Image Block (~60% desktop width: 7 cols) */}
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-velvet/5">
          <Image
            src="/images/enteya-06.png"
            alt="Enteya Crafted Adornment Editorial"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

        {/* Minimal Editorial Text Block (~40% desktop width: 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-medium">
            EDITORIAL EDIT
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-darkText font-normal leading-[1.1]">
            CRAFTED TO BE <br />
            <span className="italic text-burgundy">REMEMBERED</span>
          </h2>

          <div className="w-12 h-[1px] bg-gold/50 my-2" />

          <p className="font-sans text-base text-darkText/80 font-light leading-relaxed tracking-wide">
            A quiet expression of detail, balance and timeless beauty. Every curve and setting is designed to capture light and hold memory for generations.
          </p>

          <div className="pt-4">
            <Link
              href="#featured-products"
              className="inline-flex items-center justify-center bg-burgundy hover:bg-burgundy-light text-ivory text-xs uppercase tracking-editorial px-8 py-4 transition-all duration-300 rounded-[4px]"
            >
              DISCOVER THE COLLECTION
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
