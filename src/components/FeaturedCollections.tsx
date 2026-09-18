'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/products';

export const FeaturedCollections: React.FC = () => {
  return (
    <section id="collections" className="w-full bg-ivory-alabaster py-24 md:py-32 px-6 md:px-12 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-taupe font-medium block mb-3">
              THE CURATED CHAPTERS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-darkText font-normal">
              EXPLORE THE COLLECTIONS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-sans text-taupe max-w-md">
            Each collection represents a distinct dialogue between centuries-old Indian artisan heritage and modern minimalism.
          </p>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={col.link}
              className="group block flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-velvet/5 mb-6">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-600 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velvet/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
              </div>

              {/* Content Labeling */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-taupe block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-darkText group-hover:text-burgundy transition-colors duration-300 mb-2">
                    {col.title}
                  </h3>
                </div>

                <div className="pt-2 flex items-center text-xs uppercase tracking-editorial text-burgundy font-medium">
                  <span className="border-b border-burgundy/0 group-hover:border-burgundy transition-all duration-300">
                    EXPLORE
                  </span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
