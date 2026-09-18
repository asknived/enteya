'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BRAND_CONFIG } from '@/config/brand';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  customerName: string;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];
  
  // Actions
  setCustomerName: (name: string) => void;
  addToCart: (product: Product, quantity?: number, selectedFinish?: string) => void;
  removeFromCart: (productId: string, selectedFinish?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedFinish?: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  generateWhatsAppLink: (singleItem?: CartItem) => string;
  
  cartSubtotal: number;
  cartCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize with realistic initial items
  useEffect(() => {
    if (BRAND_CONFIG.products.length > 0) {
      setCart([
        {
          product: BRAND_CONFIG.products[0], // Classic Antique Gold Choker Necklace
          quantity: 1,
          selectedFinish: BRAND_CONFIG.products[0].finishes[0]
        }
      ]);
      if (BRAND_CONFIG.products.length > 1) {
        setWishlist([BRAND_CONFIG.products[1].id]);
      }
    }
  }, []);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, selectedFinish?: string) => {
    const finishToUse = selectedFinish || product.finishes?.[0] || 'Antique Gold';
    
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedFinish === finishToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity, selectedFinish: finishToUse }];
    });
    
    addToast('Added to Enquiry Bag', `${product.name} (${finishToUse}) added.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedFinish?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && (selectedFinish ? item.selectedFinish === selectedFinish : true))));
    addToast('Item Removed', 'Piece removed from your enquiry bag.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedFinish?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedFinish);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (selectedFinish ? item.selectedFinish === selectedFinish : true)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = BRAND_CONFIG.products.find(p => p.id === productId);
      if (exists) {
        addToast('Removed from Wishlist', `${product?.name || 'Item'} removed.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', `${product?.name || 'Item'} saved to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Format WhatsApp message strictly per requirement:
  const generateWhatsAppLink = (singleItem?: CartItem) => {
    const itemsToEnquire = singleItem ? [singleItem] : cart;
    const totalVal = singleItem ? singleItem.product.price * singleItem.quantity : cartSubtotal;

    let messageText = `Hello ENTEYA,\n\nI’m interested in the following jewellery:\n\n`;

    itemsToEnquire.forEach((item, index) => {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://enteya.in';
      const itemUrl = `${origin}/product/${item.product.id}`;

      messageText += `Product: ${item.product.name}\n`;
      messageText += `SKU: ${item.product.sku}\n`;
      messageText += `Finish: ${item.selectedFinish}\n`;
      messageText += `Quantity: ${item.quantity}\n`;
      messageText += `Price: ₹${item.product.price.toLocaleString('en-IN')}\n`;
      messageText += `Product link: ${itemUrl}\n`;
      if (index < itemsToEnquire.length - 1) {
        messageText += `--------------------\n`;
      }
    });

    messageText += `\nTotal enquiry value: ₹${totalVal.toLocaleString('en-IN')}\n`;
    if (customerName.trim()) {
      messageText += `Customer Name: ${customerName.trim()}\n`;
    }
    messageText += `\nPlease share availability and details.\n\nThank you.`;

    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodedText}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        customerName,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        quickViewProduct,
        toasts,
        setCustomerName,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setQuickViewProduct,
        addToast,
        removeToast,
        generateWhatsAppLink,
        cartSubtotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
