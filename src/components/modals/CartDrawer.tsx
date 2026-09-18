'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    customerName,
    setCustomerName,
    generateWhatsAppLink
  } = useShop();

  if (!isCartOpen) return null;

  const whatsappUrl = generateWhatsAppLink();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-enteya-border">
          
          {/* HEADER */}
          <div className="p-5 bg-enteya-purple-deep text-white flex items-center justify-between border-b border-enteya-gold/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-enteya-gold" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wide">Enquiry Bag</h2>
                <p className="text-[11px] text-gray-200">Review selected pieces before WhatsApp enquiry</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-enteya-purple-light flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-enteya-purple" />
                </div>
                <h3 className="font-serif text-xl font-bold text-enteya-charcoal">Your Enquiry Bag is Empty</h3>
                <p className="text-xs text-enteya-muted max-w-xs mx-auto">
                  Explore our modern Indian rolled-gold & antique collections under ₹2,000.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-enteya-purple-deep text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-enteya-magenta transition-colors"
                >
                  Explore Catalogue
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}-${idx}`}
                  className="flex space-x-4 p-3 bg-enteya-surface rounded-xl border border-enteya-border/60 relative group"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-white border border-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-bold text-enteya-charcoal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedFinish)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] font-mono text-enteya-muted">SKU: {item.product.sku}</p>
                      
                      <div className="inline-block mt-1 bg-enteya-purple-light text-enteya-purple-deep text-[10px] font-semibold px-2 py-0.5 rounded">
                        Finish: {item.selectedFinish}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 border border-gray-200 rounded-lg bg-white px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedFinish)}
                          className="text-gray-500 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedFinish)}
                          className="text-gray-500 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-enteya-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & WHATSAPP CHECKOUT */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-enteya-border space-y-4">
              
              {/* Optional Customer Name Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-enteya-charcoal mb-1">
                  Your Name (Optional for Enquiry)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-enteya-border focus:border-enteya-purple focus:ring-1 focus:ring-enteya-purple outline-none"
                />
              </div>

              {/* TOTAL VALUE */}
              <div className="flex items-center justify-between text-sm py-1 border-t border-b border-gray-100">
                <span className="font-medium text-enteya-muted uppercase text-xs tracking-wider">
                  Total Enquiry Value
                </span>
                <span className="font-serif text-xl font-bold text-enteya-charcoal">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* WHATSAPP CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md group"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Enquiry on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-[10px] text-center text-gray-400">
                No payment or credit card required. WhatsApp will open with your enquiry items.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
