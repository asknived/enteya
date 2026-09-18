'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND_CONFIG, Product } from '@/config/brand';
import { useShop } from '@/context/ShopContext';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { WishlistDrawer } from '@/components/modals/WishlistDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  Plus,
  Minus,
  Check,
  MapPin,
  Share2,
  ArrowRight,
  Camera,
  MessageCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { addToCart, toggleWishlist, isInWishlist, addToast, generateWhatsAppLink } = useShop();

  const productsList = BRAND_CONFIG.products as Product[];
  const product: Product =
    productsList.find(
      (p) => p.id === id || p.sku.toLowerCase() === id?.toLowerCase()
    ) || productsList[0];

  // Images gallery pool (using official Enteya images)
  const productImages = Array.from(
    new Set([
      product.image,
      product.hoverImage || '/images/enteya-02.png',
      '/images/enteya-03.png',
      '/images/enteya-04.png'
    ])
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product.finishes?.[0] || 'Antique Gold'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pinCode, setPinCode] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [isCheckingPin, setIsCheckingPin] = useState<boolean>(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  
  // Accordion open state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    specifications: true,
    materials: false,
    care: false,
    shipping: false
  });

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    title: '',
    body: ''
  });

  // Recently viewed tracking
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const isSaved = isInWishlist(product.id);
  const mainBuyRef = useRef<HTMLDivElement>(null);

  // Initialize recently viewed items
  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      try {
        const stored = localStorage.getItem('enteya_recently_viewed');
        let list: string[] = stored ? JSON.parse(stored) : [];
        list = list.filter(item => item !== product.id);
        list.unshift(product.id);
        if (list.length > 5) list = list.slice(0, 5);
        localStorage.setItem('enteya_recently_viewed', JSON.stringify(list));

        const allProducts = BRAND_CONFIG.products as Product[];
        const viewedProducts = list
          .filter(pid => pid !== product.id)
          .map(pid => allProducts.find(p => p.id === pid))
          .filter((p): p is Product => Boolean(p));

        setRecentlyViewed(viewedProducts);
      } catch (e) {
        console.error('Error handling recently viewed', e);
      }
    }
  }, [product.id]);

  // Scroll listener for sticky mobile buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (mainBuyRef.current) {
        const rect = mainBuyRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode || pinCode.length < 6) {
      setDeliveryStatus('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setIsCheckingPin(true);
    setTimeout(() => {
      setIsCheckingPin(false);
      setDeliveryStatus(`Express Delivery Available! Guaranteed delivery to ${pinCode} in 3–5 business days.`);
    }, 600);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product URL copied to clipboard.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.title || !reviewForm.body) {
      addToast('Missing Fields', 'Please complete all fields to submit your note.', 'warning');
      return;
    }
    setIsReviewModalOpen(false);
    addToast('Note Submitted', 'Thank you! Your note has been submitted for moderation.', 'success');
    setReviewForm({ name: '', rating: 5, title: '', body: '' });
  };

  // Related products (4 items excluding current)
  const relatedProducts = productsList
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  // Complete the look bundle items (2 items matching category or finish)
  const lookBundleItems = productsList
    .filter(p => p.id !== product.id)
    .slice(0, 2);

  const bundleTotalPrice = product.price + lookBundleItems.reduce((acc, item) => acc + item.price, 0);

  const handleAddBundleToBag = () => {
    addToCart(product, 1, selectedFinish);
    lookBundleItems.forEach(item => {
      addToCart(item, 1, item.finishes?.[0] || 'Antique Gold');
    });
    addToast('Complete Look Added', `Added 3-piece Enteya set to your enquiry bag!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B1C1A] flex flex-col justify-between selection:bg-[#5D1E2B] selection:text-[#FDFBF7]">
      {/* 1. ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. MAIN NAVIGATION */}
      <Header />

      {/* 3. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F3EE] border-b border-[#E4DDD3]/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-[11px] uppercase tracking-widest font-sans font-medium text-[#8C7D78]">
            <li>
              <Link href="/" className="hover:text-[#5D1E2B] transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#8C7D78]/60" /></li>
            <li>
              <Link href="/shop" className="hover:text-[#5D1E2B] transition-colors">Shop</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#8C7D78]/60" /></li>
            <li>
              <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#5D1E2B] transition-colors">
                {product.category}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#8C7D78]/60" /></li>
            <li className="text-[#1B1C1A] font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* 4. MAIN PRODUCT SECTION (GALLERY + INFORMATION) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* PRODUCT GALLERY COLUMN (LEFT ~60%) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Rail (Desktop Vertical / Tablet Horizontal) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] scrollbar-none pb-2 md:pb-0">
              {productImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-[#F7F3EE] border transition-all duration-300 overflow-hidden ${
                    selectedImageIndex === idx
                      ? 'border-[#5D1E2B] shadow-sm ring-1 ring-[#5D1E2B]/30'
                      : 'border-[#E4DDD3] opacity-70 hover:opacity-100 hover:border-[#8C7D78]'
                  }`}
                  aria-label={`View product image ${idx + 1}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                  {selectedImageIndex === idx && (
                    <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D2A75C]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#F7F3EE] border border-[#E4DDD3] overflow-hidden group">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-[#1F080D] text-[#D2A75C] text-[10px] uppercase font-bold tracking-widest border border-[#D2A75C]/40">
                    SIGNATURE EDIT
                  </span>
                )}
                {product.discountBadge && (
                  <span className="px-3 py-1 bg-[#5D1E2B] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-widest">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreenOpen(true)}
                className="absolute bottom-4 right-4 p-3 bg-[#1F080D]/80 backdrop-blur-md text-[#FDFBF7] hover:bg-[#1F080D] hover:text-[#D2A75C] transition-all border border-[#D2A75C]/30 shadow-md"
                title="View Fullscreen"
                aria-label="View Fullscreen Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Mobile Swipe Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 md:hidden bg-[#1F080D]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {productImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      selectedImageIndex === idx ? 'bg-[#D2A75C] w-4' : 'bg-white/50'
                    }`}
                  ></span>
                ))}
              </div>
            </div>

          </div>

          {/* PRODUCT INFORMATION COLUMN (RIGHT ~40%) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6" ref={mainBuyRef}>
            <div>
              {/* Category & Share */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C7D78] font-sans">
                  ENTEYA • {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="p-1.5 text-[#8C7D78] hover:text-[#5D1E2B] transition-colors flex items-center space-x-1 text-xs"
                  title="Share Piece"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1B1C1A] tracking-tight mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center space-x-3 mt-3">
                <a href="#customer-notes" className="flex items-center space-x-1 group">
                  <div className="flex items-center text-[#D2A75C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D2A75C] text-[#D2A75C]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1B1C1A] ml-1.5 group-hover:text-[#5D1E2B] transition-colors font-sans">
                    {product.rating || 4.9}
                  </span>
                  <span className="text-xs text-[#8C7D78] font-sans underline decoration-[#8C7D78]/40 group-hover:text-[#5D1E2B]">
                    ({product.reviewsCount || 128} Customer Notes)
                  </span>
                </a>
                <span className="text-[#E4DDD3]">|</span>
                <span className="text-xs text-[#8C7D78] font-mono">SKU: {product.sku}</span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline space-x-4 mt-5 p-4 bg-[#F7F3EE] border border-[#E4DDD3]">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-[#5D1E2B]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#8C7D78] line-through font-light">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#D2A75C]/15 text-[#A67F37] border border-[#D2A75C]/30 ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Editorial Description */}
              <p className="text-sm text-[#1B1C1A]/85 font-light mt-5 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Finish / Variant Selector */}
              <div className="mt-6 pt-5 border-t border-[#E4DDD3]">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1B1C1A] font-sans">
                    Finish / Polish: <span className="text-[#5D1E2B] font-bold">{selectedFinish}</span>
                  </span>
                  <span className="text-[11px] text-[#8C7D78] font-sans">24K Micro-Plated</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.finishes.map(finish => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-all border flex items-center justify-between ${
                        selectedFinish === finish
                          ? 'border-[#5D1E2B] bg-[#FDFBF7] text-[#5D1E2B] font-semibold shadow-sm'
                          : 'border-[#E4DDD3] bg-[#F7F3EE] text-[#1B1C1A]/70 hover:border-[#8C7D78]'
                      }`}
                    >
                      <span>{finish}</span>
                      {selectedFinish === finish && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D2A75C]"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Stock Status */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#1B1C1A] font-sans">Quantity:</span>
                  <div className="flex items-center border border-[#E4DDD3] bg-[#FDFBF7] rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#1B1C1A] hover:bg-[#F7F3EE] transition-colors"
                      aria-label="Decrease Quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold font-mono text-[#1B1C1A]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#1B1C1A] hover:bg-[#F7F3EE] transition-colors"
                      aria-label="Increase Quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-[#5D1E2B]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="uppercase tracking-wider font-sans">IN STOCK • Ready for Dispatch</span>
                </div>
              </div>

            </div>

            {/* CTAs AREA */}
            <div className="space-y-3 pt-6 border-t border-[#E4DDD3]">
              
              {/* ADD TO BAG */}
              <button
                onClick={() => addToCart(product, quantity, selectedFinish)}
                className="w-full bg-[#5D1E2B] hover:bg-[#1F080D] text-[#FDFBF7] h-13 py-3.5 px-6 rounded-sm font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center space-x-3 group border border-[#5D1E2B] focus:ring-2 focus:ring-[#D2A75C]"
              >
                <ShoppingBag className="w-4 h-4 text-[#D2A75C] group-hover:scale-110 transition-transform" />
                <span>ADD TO BAG</span>
              </button>

              {/* BUY NOW / DIRECT WHATSAPP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={generateWhatsAppLink({ product, quantity, selectedFinish })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#F7F3EE] hover:bg-[#FDFBF7] text-[#5D1E2B] border border-[#5D1E2B] py-3 px-4 rounded-sm font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WHATSAPP ENQUIRY</span>
                </a>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-3 px-4 border rounded-sm font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                    isSaved
                      ? 'border-[#5D1E2B] bg-[#5D1E2B]/5 text-[#5D1E2B]'
                      : 'border-[#E4DDD3] bg-white text-[#1B1C1A] hover:border-[#5D1E2B]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#5D1E2B] text-[#5D1E2B]' : 'text-[#8C7D78]'}`} />
                  <span>{isSaved ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
                </button>
              </div>

              {/* PIN Code Delivery Estimator */}
              <div className="mt-4 p-4 bg-[#F7F3EE] border border-[#E4DDD3]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1C1A] font-sans mb-2">
                  Delivery & Availability Check
                </label>
                <form onSubmit={handlePinCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 text-xs border border-[#E4DDD3] bg-[#FDFBF7] text-[#1B1C1A] focus:outline-none focus:border-[#5D1E2B] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPin}
                    className="px-4 py-2 bg-[#1B1C1A] hover:bg-[#5D1E2B] text-[#FDFBF7] text-xs uppercase font-semibold tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isCheckingPin ? 'Checking...' : 'Check'}
                  </button>
                </form>
                {deliveryStatus && (
                  <p className="text-xs text-[#5D1E2B] font-sans mt-2.5 flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 flex-shrink-0 text-[#D2A75C]" />
                    <span>{deliveryStatus}</span>
                  </p>
                )}
              </div>

              {/* Trust Row */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E4DDD3] text-[11px] text-[#8C7D78] font-sans">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#A67F37] flex-shrink-0" />
                  <span>24K Micro-Plated Gold</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#A67F37] flex-shrink-0" />
                  <span>Anti-Tarnish Protective Shield</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-[#A67F37] flex-shrink-0" />
                  <span>7-Day Hassle-Free Exchange</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#A67F37] flex-shrink-0" />
                  <span>Insured Express Pan-India Delivery</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* 5. PRODUCT EDITORIAL STORY SECTION ("THE PIECE") */}
      <section className="bg-[#1F080D] text-[#FDFBF7] py-16 lg:py-24 border-y border-[#D2A75C]/20 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] bg-[#1F080D] border border-[#D2A75C]/30 overflow-hidden">
              <Image
                src={product.hoverImage || product.image}
                alt={`${product.name} editorial detail`}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F080D]/80 via-transparent to-transparent"></div>
            </div>

            {/* Editorial Text Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-editorial font-bold text-[#D2A75C]">
                CRAFT & HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FDFBF7] leading-tight">
                THE DETAILS<br />MAKE THE PIECE.
              </h2>
              <div className="w-12 h-0.5 bg-[#D2A75C]"></div>
              <p className="text-sm sm:text-base text-[#FDFBF7]/80 font-light leading-relaxed font-sans">
                Every line, motif, and finish in {product.name} is meticulously crafted by master artisans who have preserved traditional Indian goldsmithing techniques for generations. 
              </p>
              <p className="text-sm text-[#FDFBF7]/70 font-light leading-relaxed font-sans">
                Engineered with featherlight precision and high-grade 24k micro-gold plating, this piece rests weightlessly against the skin, delivering authentic heirloom radiance for your most memorable moments.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#D2A75C] hover:text-[#E8CCA0] transition-colors"
                >
                  <span>DISCOVER ENTEYA CRAFTSMANSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SPECIFICATIONS & DETAILS ACCORDIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-editorial text-[#8C7D78] font-semibold">INFORMED ELEGANCE</span>
          <h2 className="font-serif text-3xl font-normal text-[#1B1C1A] mt-1">PRODUCT SPECIFICATIONS & CARE</h2>
        </div>

        <div className="space-y-4">
          
          {/* Accordion 1: Specifications */}
          <div className="border border-[#E4DDD3] bg-[#FDFBF7]">
            <button
              onClick={() => toggleAccordion('specifications')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-normal text-[#1B1C1A] hover:text-[#5D1E2B] transition-colors"
            >
              <span>Product Specifications</span>
              {openAccordions['specifications'] ? (
                <Minus className="w-4 h-4 text-[#D2A75C]" />
              ) : (
                <Plus className="w-4 h-4 text-[#8C7D78]" />
              )}
            </button>
            {openAccordions['specifications'] && (
              <div className="px-6 pb-6 pt-2 text-xs font-sans border-t border-[#E4DDD3]/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">Base Material</span>
                    <span className="font-semibold text-[#1B1C1A]">High-Grade Copper-Brass Alloy</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">Plating & Polish</span>
                    <span className="font-semibold text-[#1B1C1A]">24K Micro-Rolled Antique Gold</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">Closure Mechanism</span>
                    <span className="font-semibold text-[#1B1C1A]">Adjustable Dori Thread / Hook</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">Hypoallergenic</span>
                    <span className="font-semibold text-emerald-700">100% Lead & Nickel Free</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">Collection</span>
                    <span className="font-semibold text-[#1B1C1A]">{product.collection}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E4DDD3]/40">
                    <span className="text-[#8C7D78] uppercase tracking-wider">SKU</span>
                    <span className="font-mono font-semibold text-[#1B1C1A]">{product.sku}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Materials & Craftsmanship */}
          <div className="border border-[#E4DDD3] bg-[#FDFBF7]">
            <button
              onClick={() => toggleAccordion('materials')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-normal text-[#1B1C1A] hover:text-[#5D1E2B] transition-colors"
            >
              <span>Materials & Anti-Tarnish Finish</span>
              {openAccordions['materials'] ? (
                <Minus className="w-4 h-4 text-[#D2A75C]" />
              ) : (
                <Plus className="w-4 h-4 text-[#8C7D78]" />
              )}
            </button>
            {openAccordions['materials'] && (
              <div className="px-6 pb-6 pt-2 text-xs font-sans text-[#1B1C1A]/80 leading-relaxed border-t border-[#E4DDD3]/60 space-y-3">
                <p>
                  Every ENTEYA creation features heavy micro-rolled gold plating sealed under a proprietary anti-tarnish lacquer coating. This ensures your piece retains its authentic warm lustre without dulling or oxidizing over time.
                </p>
                <p>
                  Our metal cores are 100% skin-safe, dermatologically tested, and free from harmful nickel, cadmium, and lead additives.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 3: Care Instructions */}
          <div className="border border-[#E4DDD3] bg-[#FDFBF7]">
            <button
              onClick={() => toggleAccordion('care')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-normal text-[#1B1C1A] hover:text-[#5D1E2B] transition-colors"
            >
              <span>Jewellery Care Guide</span>
              {openAccordions['care'] ? (
                <Minus className="w-4 h-4 text-[#D2A75C]" />
              ) : (
                <Plus className="w-4 h-4 text-[#8C7D78]" />
              )}
            </button>
            {openAccordions['care'] && (
              <div className="px-6 pb-6 pt-2 text-xs font-sans text-[#1B1C1A]/80 leading-relaxed border-t border-[#E4DDD3]/60 space-y-2">
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>Store in the provided ENTEYA velvet pouch away from direct sunlight and humidity.</li>
                  <li>Apply perfumes, hairsprays, and lotions prior to donning your jewellery.</li>
                  <li>Avoid direct exposure to salt water, harsh soaps, or swimming pool chemicals.</li>
                  <li>Gently wipe with a clean, dry microfiber cloth after every wear before storing.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 4: Shipping & Returns */}
          <div className="border border-[#E4DDD3] bg-[#FDFBF7]">
            <button
              onClick={() => toggleAccordion('shipping')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-lg font-normal text-[#1B1C1A] hover:text-[#5D1E2B] transition-colors"
            >
              <span>Shipping & Exchange Policy</span>
              {openAccordions['shipping'] ? (
                <Minus className="w-4 h-4 text-[#D2A75C]" />
              ) : (
                <Plus className="w-4 h-4 text-[#8C7D78]" />
              )}
            </button>
            {openAccordions['shipping'] && (
              <div className="px-6 pb-6 pt-2 text-xs font-sans text-[#1B1C1A]/80 leading-relaxed border-t border-[#E4DDD3]/60 space-y-2">
                <p>
                  <strong>Complimentary Insured Shipping:</strong> All orders above ₹999 ship free across India via trusted express logistics partners (BlueDart / Delhivery) within 3–5 business days.
                </p>
                <p>
                  <strong>7-Day Easy Exchange:</strong> If you wish to exchange a piece or request store credit, our customer concierge team assists seamlessly within 7 days of delivery.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. COMPLETE THE LOOK SECTION */}
      {lookBundleItems.length > 0 && (
        <section className="bg-[#F7F3EE] py-14 border-y border-[#E4DDD3] my-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C7D78]">CURATED STYLING</span>
              <h2 className="font-serif text-3xl font-normal text-[#1B1C1A] mt-1">COMPLETE THE ENTEYA LOOK</h2>
              <p className="text-xs text-[#8C7D78] mt-1 font-sans">Handpicked signature pairings to complete your festive ensemble.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Main Product */}
              <div className="bg-[#FDFBF7] p-4 border border-[#E4DDD3] flex flex-col items-center text-center">
                <div className="relative w-36 h-44 mb-3">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C7D78]">Main Piece</span>
                <h3 className="font-serif text-base text-[#1B1C1A] font-semibold mt-1 truncate max-w-xs">{product.name}</h3>
                <span className="font-serif text-sm font-bold text-[#5D1E2B] mt-1">₹{product.price.toLocaleString('en-IN')}</span>
              </div>

              {/* Bundle Items */}
              {lookBundleItems.map((bundleItem, bIdx) => (
                <div key={bundleItem.id} className="bg-[#FDFBF7] p-4 border border-[#E4DDD3] flex flex-col items-center text-center">
                  <div className="relative w-36 h-44 mb-3">
                    <Image src={bundleItem.image} alt={bundleItem.name} fill className="object-cover" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7D78]">Complementary #{bIdx + 1}</span>
                  <h3 className="font-serif text-base text-[#1B1C1A] font-semibold mt-1 truncate max-w-xs">{bundleItem.name}</h3>
                  <span className="font-serif text-sm font-bold text-[#5D1E2B] mt-1">₹{bundleItem.price.toLocaleString('en-IN')}</span>
                </div>
              ))}

            </div>

            <div className="mt-8 pt-6 border-t border-[#E4DDD3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8C7D78] font-sans">Combined 3-Piece Bundle Price:</span>
                <div className="flex items-baseline space-x-3 mt-0.5">
                  <span className="font-serif text-2xl font-bold text-[#5D1E2B]">₹{bundleTotalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-emerald-700 font-semibold uppercase">Save 15% Set Discount</span>
                </div>
              </div>

              <button
                onClick={handleAddBundleToBag}
                className="w-full sm:w-auto bg-[#5D1E2B] hover:bg-[#1F080D] text-[#FDFBF7] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#D2A75C]" />
                <span>ADD COMPLETE 3-PIECE SET TO BAG</span>
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 8. CUSTOMER NOTES / REVIEWS SECTION */}
      <section id="customer-notes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#E4DDD3] pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-editorial text-[#8C7D78] font-semibold">VERIFIED PATRONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1B1C1A] mt-1">CUSTOMER NOTES</h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-1 text-[#D2A75C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D2A75C] text-[#D2A75C]" />
                ))}
                <span className="font-serif text-xl font-bold text-[#1B1C1A] ml-2">4.9 / 5.0</span>
              </div>
              <span className="text-xs text-[#8C7D78] font-sans">Based on 128 verified customer notes</span>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 bg-[#5D1E2B] hover:bg-[#1F080D] text-[#FDFBF7] text-xs uppercase font-semibold tracking-wider transition-colors shadow-sm"
            >
              WRITE A NOTE
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-4 border-b border-[#E4DDD3]/60 pb-3 mb-6 overflow-x-auto text-xs font-sans font-medium">
          {['all', '5star', '4star', 'photos'].map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`pb-1.5 uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                activeTab === tabKey ? 'text-[#5D1E2B] font-bold' : 'text-[#8C7D78] hover:text-[#1B1C1A]'
              }`}
            >
              {tabKey === 'all' && 'All Notes (128)'}
              {tabKey === '5star' && '5 Stars (112)'}
              {tabKey === '4star' && '4 Stars (12)'}
              {tabKey === 'photos' && 'With Photos (24)'}
              {activeTab === tabKey && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D1E2B]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Note 1 */}
          <div className="bg-[#F7F3EE] p-6 border border-[#E4DDD3] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-[#D2A75C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D2A75C] text-[#D2A75C]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#8C7D78]">2 days ago</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-[#1B1C1A]">"Absolute Heirloom Quality"</h4>
              <p className="text-xs text-[#1B1C1A]/80 font-light mt-2 leading-relaxed font-sans">
                The antique gold polish looks identical to real gold jewellery! Wore it to a wedding reception and everyone assumed it was an authentic gold piece.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E4DDD3]/60 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#1B1C1A]">Ananya R.</span>
              <span className="text-emerald-700 font-medium flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Verified Buyer</span>
              </span>
            </div>
          </div>

          {/* Note 2 */}
          <div className="bg-[#F7F3EE] p-6 border border-[#E4DDD3] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-[#D2A75C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D2A75C] text-[#D2A75C]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#8C7D78]">1 week ago</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-[#1B1C1A]">"Featherlight Comfort All Evening"</h4>
              <p className="text-xs text-[#1B1C1A]/80 font-light mt-2 leading-relaxed font-sans">
                What surprised me most is how lightweight it feels around the neck. You don't get that heavy strain like traditional artificial jewellery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E4DDD3]/60 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#1B1C1A]">Priyadarshini M.</span>
              <span className="text-emerald-700 font-medium flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Verified Buyer</span>
              </span>
            </div>
          </div>

          {/* Note 3 */}
          <div className="bg-[#F7F3EE] p-6 border border-[#E4DDD3] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-[#D2A75C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D2A75C] text-[#D2A75C]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#8C7D78]">2 weeks ago</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-[#1B1C1A]">"Exquisite Packaging & Fast Delivery"</h4>
              <p className="text-xs text-[#1B1C1A]/80 font-light mt-2 leading-relaxed font-sans">
                Arrived in a deep burgundy velvet storage box with a luxury care pouch. The craftsmanship under ₹2,000 is unmatched.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E4DDD3]/60 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#1B1C1A]">Sunita K.</span>
              <span className="text-emerald-700 font-medium flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Verified Buyer</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. YOU MAY ALSO LIKE (RELATED PRODUCTS) */}
      <section className="bg-[#F7F3EE] py-16 border-t border-[#E4DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-editorial text-[#8C7D78] font-semibold">CURATED SELECTION</span>
              <h2 className="font-serif text-3xl font-normal text-[#1B1C1A] mt-1">YOU MAY ALSO LIKE</h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-widest font-semibold text-[#5D1E2B] hover:text-[#1F080D] transition-colors mt-2 sm:mt-0">
              VIEW FULL CATALOGUE →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <div key={relProduct.id} className="group bg-[#FDFBF7] border border-[#E4DDD3] flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F3EE]">
                  <Image
                    src={relProduct.image}
                    alt={relProduct.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    onClick={() => toggleWishlist(relProduct.id)}
                    className="absolute top-3 right-3 p-2 bg-[#FDFBF7]/80 backdrop-blur-md rounded-full text-[#1B1C1A] hover:text-[#5D1E2B] transition-colors"
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(relProduct.id) ? 'fill-[#5D1E2B] text-[#5D1E2B]' : ''}`} />
                  </button>
                </div>

                <div className="p-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#8C7D78]">{relProduct.category}</span>
                  <Link href={`/product/${relProduct.id}`}>
                    <h3 className="font-serif text-base font-semibold text-[#1B1C1A] group-hover:text-[#5D1E2B] transition-colors mt-1 line-clamp-1">
                      {relProduct.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline justify-between mt-3">
                    <span className="font-serif text-lg font-bold text-[#5D1E2B]">
                      ₹{relProduct.price.toLocaleString('en-IN')}
                    </span>
                    {relProduct.originalPrice && (
                      <span className="text-xs text-[#8C7D78] line-through font-light">
                        ₹{relProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(relProduct, 1, relProduct.finishes?.[0])}
                    className="w-full mt-4 py-2.5 bg-[#5D1E2B] hover:bg-[#1F080D] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. RECENTLY VIEWED PRODUCTS */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-editorial text-[#8C7D78] font-semibold">YOUR HISTORY</span>
            <h2 className="font-serif text-2xl font-normal text-[#1B1C1A] mt-1">RECENTLY VIEWED</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewed.map(rvItem => (
              <Link key={rvItem.id} href={`/product/${rvItem.id}`} className="group block bg-[#F7F3EE] p-3 border border-[#E4DDD3]">
                <div className="relative aspect-square mb-2 bg-white overflow-hidden">
                  <Image src={rvItem.image} alt={rvItem.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="font-serif text-xs font-semibold text-[#1B1C1A] truncate">{rvItem.name}</h4>
                <span className="font-serif text-xs font-bold text-[#5D1E2B] mt-1 block">₹{rvItem.price.toLocaleString('en-IN')}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 11. EDITORIAL BRAND STATEMENT SECTION */}
      <section className="bg-[#1F080D] text-[#FDFBF7] py-16 text-center border-t border-[#D2A75C]/20">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs uppercase tracking-editorial font-bold text-[#D2A75C]">ENTEYA STATEMENT</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FDFBF7] mt-3 tracking-tight">
            TIMELESS, NOT ORDINARY.
          </h2>
          <p className="text-sm text-[#FDFBF7]/80 font-light mt-4 max-w-xl mx-auto leading-relaxed font-sans">
            Designed for celebrations, grand occasions and the everyday moments worth remembering. Experience jewellery that belongs to every version of you.
          </p>
          <div className="mt-8">
            <Link
              href="/collections"
              className="inline-block bg-[#D2A75C] hover:bg-[#E8CCA0] text-[#1F080D] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
            >
              EXPLORE THE COLLECTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER SECTION */}
      <section className="bg-[#5D1E2B] text-[#FDFBF7] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-editorial font-semibold text-[#E8CCA0]">PRIVATE ACCESS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FDFBF7] mt-2">
            ENTER THE WORLD OF ENTEYA
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#FDFBF7]/80 mt-2 font-sans">
            Discover new collections, private edits and stories from Enteya.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Subscribed', 'Welcome to the world of Enteya.', 'success');
            }}
            className="mt-6 flex flex-col sm:flex-row max-w-md mx-auto gap-3"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-xs bg-[#1F080D]/60 border border-[#D2A75C]/40 text-[#FDFBF7] placeholder-[#FDFBF7]/50 focus:outline-none focus:border-[#D2A75C]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#D2A75C] hover:bg-[#E8CCA0] text-[#1F080D] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              JOIN
            </button>
          </form>
        </div>
      </section>

      {/* 13. FOOTER */}
      <Footer />

      {/* MOBILE STICKY PURCHASE BAR */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1F080D] border-t border-[#D2A75C]/30 p-3 z-40 shadow-2xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-3 truncate mr-3">
            <div className="relative w-10 h-12 bg-white flex-shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-serif text-white font-medium truncate">{product.name}</h4>
              <span className="text-xs font-serif text-[#D2A75C] font-bold">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, quantity, selectedFinish)}
            className="bg-[#5D1E2B] hover:bg-[#D2A75C] hover:text-[#1F080D] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm whitespace-nowrap flex-shrink-0 transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F080D] flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 p-3 text-[#FDFBF7] hover:text-[#D2A75C] transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl aspect-[3/4] max-h-[85vh]">
            <Image
              src={productImages[selectedImageIndex]}
              alt={`${product.name} Fullscreen`}
              fill
              className="object-contain"
            />
          </div>

          {/* Lightbox Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/60 px-6 py-2 border border-[#D2A75C]/30 text-xs text-[#FDFBF7]">
            <button
              onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + productImages.length) % productImages.length)}
              className="hover:text-[#D2A75C]"
            >
              ← Prev
            </button>
            <span>{selectedImageIndex + 1} / {productImages.length}</span>
            <button
              onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % productImages.length)}
              className="hover:text-[#D2A75C]"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FDFBF7] border border-[#5D1E2B] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#8C7D78] hover:text-[#1B1C1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C7D78]">VERIFIED NOTE</span>
            <h3 className="font-serif text-2xl font-normal text-[#1B1C1A] mt-1">SHARE YOUR EXPERIENCE</h3>
            <p className="text-xs text-[#8C7D78] font-sans mt-1">Your note will be reviewed by Enteya concierges.</p>

            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1B1C1A] mb-1">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      className="p-1 text-[#D2A75C]"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewForm.rating ? 'fill-[#D2A75C]' : 'text-[#8C7D78]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1B1C1A] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Rao"
                  value={reviewForm.name}
                  onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4DDD3] bg-white text-[#1B1C1A] focus:outline-none focus:border-[#5D1E2B]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1B1C1A] mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Absolutely radiant craftsmanship!"
                  value={reviewForm.title}
                  onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4DDD3] bg-white text-[#1B1C1A] focus:outline-none focus:border-[#5D1E2B]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1B1C1A] mb-1">Your Note</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the fit, finish, lustre, and occasion..."
                  value={reviewForm.body}
                  onChange={e => setReviewForm({ ...reviewForm, body: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4DDD3] bg-white text-[#1B1C1A] focus:outline-none focus:border-[#5D1E2B]"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-[#E4DDD3] text-[#1B1C1A] uppercase font-semibold tracking-wider hover:bg-[#F7F3EE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5D1E2B] text-[#FDFBF7] uppercase font-semibold tracking-wider hover:bg-[#1F080D]"
                >
                  Submit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWERS & MODALS */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}
