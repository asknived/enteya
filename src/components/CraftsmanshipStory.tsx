'use client';

import React from 'react';
import Image from 'next/image';

export const CraftsmanshipStory: React.FC = () => {
  return (
    <section id="craftsmanship" className="w-full bg-velvet text-ivory py-24 md:py-36 px-6 md:px-12 border-b border-gold/15 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Editorial Text Content (Left side on desktop: 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 z-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-light font-medium block">
            SAVOIR-FAIRE & HERITAGE
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-[1.1]">
            THE BEAUTY <br />
            <span className="italic text-gold-light">IS IN THE DETAIL.</span>
          </h2>

          <div className="w-16 h-[1px] bg-gold/60 my-2" />

          <p className="font-sans text-base text-ivory/85 font-light leading-relaxed tracking-wide">
            Every piece is defined by the details that reveal themselves slowly: delicate forms, considered proportions and intricate finishing.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-6 border-t border-gold/20 pt-6">
            <div>
              <span className="font-serif text-3xl text-gold-light block">22K</span>
              <span className="text-[11px] uppercase tracking-wider text-ivory/70 font-sans mt-1 block">
                Champagne Gold Tone
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl text-gold-light block">100%</span>
              <span className="text-[11px] uppercase tracking-wider text-ivory/70 font-sans mt-1 block">
                Artisanal Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Photography Block (Right side: 7 cols) */}
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-velvet/40 rounded-[2px] border border-gold/20">
          <Image
            src="/images/enteya-11.png"
            alt="Enteya Jewellery Craftsmanship Detail"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-velvet/60 via-transparent to-transparent opacity-30" />
        </div>

      </div>
    </section>
  );
};
