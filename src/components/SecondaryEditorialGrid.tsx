'use client';

import React from 'react';
import Image from 'next/image';

export const SecondaryEditorialGrid: React.FC = () => {
  return (
    <section className="w-full bg-ivory-alabaster py-24 md:py-36 px-6 md:px-12 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-taupe font-medium block mb-2">
              ART DIRECTION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-darkText font-normal">
              CURATED HARMONY
            </h2>
          </div>
          <span className="text-xs uppercase tracking-editorial text-taupe mt-3 md:mt-0">
            VOL. III — VELVET & GOLD
          </span>
        </div>

        {/* Asymmetric 12-Column Art-Directed Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Large Main Feature (8 Cols) */}
          <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden bg-velvet/5 group">
            <Image
              src="/images/enteya-13.png"
              alt="Enteya Curated Masterpiece Spread"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-ivory/90 backdrop-blur-sm px-6 py-3 border border-hairline">
              <span className="font-serif text-lg text-darkText block">The Sovereign Ensemble</span>
              <span className="text-[10px] uppercase tracking-widest text-taupe block mt-0.5">Edition 2026</span>
            </div>
          </div>

          {/* Stacked Right Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:space-y-0">
            
            <div className="relative aspect-[4/3] lg:aspect-[4/3] w-full overflow-hidden bg-velvet/5 group">
              <Image
                src="/images/brand-story.jpg"
                alt="Enteya Bangle Heritage Detail"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="relative aspect-[4/3] lg:aspect-[4/3] w-full overflow-hidden bg-velvet/5 group">
              <Image
                src="/images/category-bangles.jpg"
                alt="Enteya Stacked Gold Bangles Detail"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
