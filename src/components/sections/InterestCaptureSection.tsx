'use client';

import React, { useState } from 'react';
import { BRAND_CONFIG } from '@/config/brand';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const InterestCaptureSection: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);
    addToast('Welcome to ENTEYA Circle', 'Thank you for subscribing to our new drops and store updates!');
  };

  return (
    <section className="py-16 bg-enteya-surface border-b border-enteya-border/40 relative overflow-hidden">
      
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-enteya-gold/40 text-enteya-magenta text-xs font-bold tracking-mega uppercase rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-enteya-gold" />
          <span>EXCLUSIVE ENTEYA UPDATES</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enteya-charcoal">
          Stay Close to Modern Indian Gold
        </h2>

        <p className="text-xs sm:text-sm text-enteya-muted max-w-xl mx-auto leading-relaxed font-light">
          Be the first to discover new rolled-gold bangles, antique launches, and exclusive store events across our 12 physical locations.
        </p>

        {isSubmitted ? (
          <div className="p-6 bg-white border border-enteya-gold max-w-md mx-auto rounded-2xl shadow-lg space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl text-enteya-charcoal font-bold">You're on the list!</h3>
            <p className="text-xs text-enteya-muted">
              We look forward to sharing our latest arrivals and styling edits with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white border border-enteya-border focus:border-enteya-purple text-enteya-charcoal text-xs outline-none rounded-xl shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-enteya-purple-deep hover:bg-enteya-magenta text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-md shrink-0"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3.5 h-3.5 text-enteya-gold" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-enteya-magenta font-medium text-left">{error}</p>
            )}

            <p className="text-[11px] text-gray-400 font-light">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
