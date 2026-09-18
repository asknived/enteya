'use client';

import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-burgundy text-ivory py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        <span className="block text-[11px] uppercase tracking-[0.3em] text-gold-light mb-4 font-medium">
          PRIVATE ACCESS
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6">
          ENTER THE WORLD OF ENTEYA
        </h2>

        <p className="font-sans text-sm md:text-base text-ivory/85 font-light leading-relaxed mb-10 max-w-lg mx-auto">
          Discover new collections, private edits and stories from Enteya.
        </p>

        {submitted ? (
          <div className="p-6 bg-burgundy-deep/60 border border-gold/30 rounded-[2px] animate-fadeIn">
            <span className="font-serif text-xl text-gold-light block mb-2">Welcome to Enteya Private Access</span>
            <p className="text-xs text-ivory/80 font-sans">You have been subscribed to our private editorial updates.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch max-w-md mx-auto gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-burgundy-deep/60 border border-gold/30 focus:border-gold text-ivory placeholder-ivory/50 px-5 py-3.5 text-xs font-sans focus:outline-none rounded-[2px]"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-burgundy-deep text-xs uppercase tracking-editorial font-medium px-8 py-3.5 transition-all duration-300 rounded-[2px]"
            >
              JOIN
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
