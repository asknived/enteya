'use client';

import React from 'react';

export const BrandIntro: React.FC = () => {
  return (
    <section className="w-full bg-ivory py-24 md:py-36 px-6 md:px-12 text-center border-b border-hairline/50">
      <div className="max-w-3xl mx-auto">
        <span className="block text-[11px] uppercase tracking-[0.3em] text-taupe mb-6 font-medium">
          ENTEYA PHILOSOPHY
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-darkText font-normal leading-[1.15] mb-8">
          JEWELLERY, <br />
          <span className="italic text-burgundy">WITH A SENSE OF OCCASION.</span>
        </h2>

        <div className="w-12 h-[1px] bg-gold/50 mx-auto mb-8"></div>

        <p className="font-sans text-base md:text-lg text-darkText/80 font-light leading-relaxed tracking-wide">
          Enteya brings together timeless silhouettes, intricate detailing and contemporary elegance, creating jewellery made to be worn, remembered and cherished.
        </p>
      </div>
    </section>
  );
};
