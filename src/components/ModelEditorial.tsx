'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ModelEditorial: React.FC = () => {
  return (
    <section className="w-full bg-ivory py-20 md:py-32 px-6 md:px-12 border-b border-hairline overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Dominant Model Campaign Photograph (7 Cols) */}
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-velvet/5">
          <Image
            src="/images/enteya-12.png"
            alt="Enteya Model Editorial Campaign"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-[50%_25%] transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

        {/* Asymmetrical Text Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pr-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-taupe font-medium">
            CAMPAIGN Autumn/Winter
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-darkText font-normal leading-[1.05]">
            WEAR YOUR <br />
            <span className="italic text-burgundy">MOMENT.</span>
          </h2>

          <div className="w-12 h-[1px] bg-gold/50 my-2" />

          <p className="font-sans text-base text-darkText/80 font-light leading-relaxed tracking-wide">
            Jewellery that moves effortlessly between tradition and modern expression. Created to complement individual grace without overpowering it.
          </p>

          <div>
            <Link
              href="#featured-products"
              className="inline-flex items-center justify-center bg-burgundy hover:bg-burgundy-light text-ivory text-xs uppercase tracking-editorial px-8 py-4 transition-all duration-300 rounded-[4px]"
            >
              VIEW THE COLLECTION
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
