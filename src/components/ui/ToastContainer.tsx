'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-plum text-ivory border border-gold/40 shadow-2xl rounded-none p-4 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-rose shrink-0 mt-0.5" />}
            <div>
              <h5 className="font-serif text-base text-gold tracking-wide font-medium">{toast.title}</h5>
              <p className="text-xs text-ivory/80 font-sans mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-ivory/50 hover:text-gold transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
