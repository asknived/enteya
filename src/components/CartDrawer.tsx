'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-velvet/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory text-darkText shadow-2xl flex flex-col justify-between border-l border-hairline">
          
          {/* Header */}
          <div className="p-6 border-b border-hairline flex items-center justify-between">
            <h3 className="font-serif text-2xl text-darkText font-normal">YOUR SELECTION</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-burgundy transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-taupe space-y-4">
                <span className="font-serif text-2xl text-darkText/60">Your cart is empty</span>
                <p className="text-xs font-sans max-w-xs">Explore our curated collections and select pieces to add to your personal edit.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-3 bg-burgundy text-ivory text-xs uppercase tracking-editorial font-medium rounded-[2px]"
                >
                  EXPLORE COLLECTIONS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex space-x-4 pb-6 border-b border-hairline">
                  <div className="relative w-20 h-24 bg-velvet/5 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-lg text-darkText">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-taupe hover:text-burgundy transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-taupe block">
                        {item.product.category}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border border-hairline">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs hover:bg-hairline"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-sans font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-hairline"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-sans text-sm font-semibold text-darkText">
                        ₹{(item.product.priceNumeric * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-hairline bg-ivory-alabaster space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-editorial text-taupe font-medium">SUBTOTAL</span>
                <span className="font-serif text-2xl text-darkText font-normal">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-taupe">Complimentary insured delivery & velvet gift packaging included.</p>
              <button
                onClick={() => alert('Proceeding to Enteya Secure Checkout...')}
                className="w-full bg-burgundy hover:bg-burgundy-light text-ivory py-4 text-xs uppercase tracking-editorial font-medium rounded-[2px] transition-all flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
