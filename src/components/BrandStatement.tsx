'use client';

import React from 'react';
import Link from 'next/link';

export const BrandStatement: React.FC = () => {
  return (
    <section className="w-full bg-ivory py-28 md:py-44 px-6 md:px-12 text-center border-b border-hairline/60">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[11px] uppercase tracking-[0.35em] text-taupe mb-6 font-medium">
          ENTEYA SIGNATURE STATEMENT
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-darkText font-normal leading-[1.1] mb-8">
          TIMELESS, <br />
          <span className="italic text-burgundy">NOT ORDINARY.</span>
        </h2>

        <div className="w-12 h-[1px] bg-gold/50 mx-auto mb-8"></div>

        <p className="font-sans text-base md:text-lg text-darkText/80 font-light leading-relaxed tracking-wide max-w-2xl mx-auto mb-12">
          Designed for celebrations, occasions and the everyday moments worth remembering.
        </p>

        <div>
          <Link
            href="#featured-products"
            className="inline-flex items-center justify-center bg-transparent border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory text-xs uppercase tracking-editorial px-10 py-4 transition-all duration-300 rounded-[4px]"
          >
            EXPLORE ENTEYA
          </Link>
        </div>
      </div>
    </section>
  );
};
