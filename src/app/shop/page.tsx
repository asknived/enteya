'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { BRAND_CONFIG, Product } from '@/config/brand';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { WishlistDrawer } from '@/components/modals/WishlistDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  X,
  RotateCcw,
  Sparkles,
  Check,
  ArrowRight
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state synchronization
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialCollection = searchParams.get('collection') || 'All';
  const initialFinish = searchParams.get('finish') || 'All';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedFinish, setSelectedFinish] = useState<string>(initialFinish);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [pricePreset, setPricePreset] = useState<string>('All');
  const [customMinPrice, setCustomMinPrice] = useState<string>('');
  const [customMaxPrice, setCustomMaxPrice] = useState<string>('');
  const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  // Mobile drawer controls
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState<boolean>(false);

  // Accordion toggle states for sidebar
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    collection: true,
    price: true,
    finish: true,
    occasion: false,
    availability: false
  });

  const productsList = BRAND_CONFIG.products as Product[];

  // Category navigation items
  const categoryNavItems = [
    { label: 'ALL', value: 'ALL' },
    { label: 'NEW ARRIVALS', value: 'NEW ARRIVALS' },
    { label: 'NECKLACES', value: 'Necklaces' },
    { label: 'EARRINGS', value: 'Earrings' },
    { label: 'RINGS', value: 'Rings' },
    { label: 'BRACELETS', value: 'Bangles' },
    { label: 'BANGLES', value: 'Bangles' },
    { label: 'SETS', value: 'Sets' }
  ];

  // Dynamic filter options extracted from dataset
  const categories = ['All', ...Array.from(new Set(productsList.map(p => p.category)))];
  const collections = ['All', ...Array.from(new Set(productsList.map(p => p.collection)))];
  const finishes = ['All', 'Antique Gold', 'Rolled Gold', 'Matte Gold', 'Rose Gold'];
  const availabilities = ['All', 'In Stock', 'On Sale', 'New Arrivals', 'Best Sellers'];

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category')!);
    if (searchParams.get('collection')) setSelectedCollection(searchParams.get('collection')!);
    if (searchParams.get('finish')) setSelectedFinish(searchParams.get('finish')!);
    if (searchParams.get('sort')) setSortBy(searchParams.get('sort')!);
    if (searchParams.get('q')) setSearchQuery(searchParams.get('q')!);
  }, [searchParams]);

  // Update URL params when key filters change
  const updateUrl = (newCategory: string, newCollection: string, newFinish: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newCategory !== 'ALL' && newCategory !== 'All') params.set('category', newCategory);
    if (newCollection !== 'All') params.set('collection', newCollection);
    if (newFinish !== 'All') params.set('finish', newFinish);
    if (newSort !== 'featured') params.set('sort', newSort);
    if (searchQuery) params.set('q', searchQuery);

    const queryString = params.toString();
    router.push(`/shop${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateUrl(cat, selectedCollection, selectedFinish, sortBy);
  };

  const handleCollectionChange = (col: string) => {
    setSelectedCollection(col);
    updateUrl(selectedCategory, col, selectedFinish, sortBy);
  };

  const handleFinishChange = (fin: string) => {
    setSelectedFinish(fin);
    updateUrl(selectedCategory, selectedCollection, fin, sortBy);
  };

  const handleSortChange = (sortVal: string) => {
    setSortBy(sortVal);
    updateUrl(selectedCategory, selectedCollection, selectedFinish, sortVal);
  };

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = customMinPrice ? parseInt(customMinPrice, 10) : 0;
    const max = customMaxPrice ? parseInt(customMaxPrice, 10) : Infinity;
    if (min || max !== Infinity) {
      setAppliedPriceRange({ min, max });
      setPricePreset('Custom');
    }
  };

  const handlePresetPrice = (preset: string) => {
    setPricePreset(preset);
    if (preset === 'All') setAppliedPriceRange(null);
    else if (preset === 'under-1000') setAppliedPriceRange({ min: 0, max: 1000 });
    else if (preset === '1000-1500') setAppliedPriceRange({ min: 1000, max: 1500 });
    else if (preset === '1500-2000') setAppliedPriceRange({ min: 1500, max: 2000 });
    else if (preset === 'above-2000') setAppliedPriceRange({ min: 2000, max: Infinity });
  };

  const resetAllFilters = () => {
    setSelectedCategory('ALL');
    setSelectedCollection('All');
    setSelectedFinish('All');
    setSelectedOccasion('All');
    setSelectedAvailability('All');
    setPricePreset('All');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedPriceRange(null);
    setSearchQuery('');
    setSortBy('featured');
    router.push('/shop', { scroll: false });
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsList
      .filter(product => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchSku) return false;
        }

        // Category Filter
        if (selectedCategory !== 'ALL' && selectedCategory !== 'All') {
          if (selectedCategory === 'NEW ARRIVALS') {
            if (!product.isNew) return false;
          } else if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Collection Filter
        if (selectedCollection !== 'All' && product.collection.toLowerCase() !== selectedCollection.toLowerCase()) {
          return false;
        }

        // Finish / Polish Filter
        if (selectedFinish !== 'All' && !product.finishes.some(f => f.toLowerCase().includes(selectedFinish.toLowerCase()))) {
          return false;
        }

        // Availability Filter
        if (selectedAvailability === 'On Sale' && !product.discountBadge) return false;
        if (selectedAvailability === 'New Arrivals' && !product.isNew) return false;
        if (selectedAvailability === 'Best Sellers' && !product.isBestSeller) return false;

        // Price Range Filter
        if (appliedPriceRange) {
          if (product.price < appliedPriceRange.min || product.price > appliedPriceRange.max) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'bestsellers') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (sortBy === 'name-az') return a.name.localeCompare(b.name);
        return 0; // default featured
      });
  }, [
    productsList,
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedFinish,
    selectedAvailability,
    appliedPriceRange,
    sortBy
  ]);

  // Active Filter Pills count
  const activeFiltersCount =
    (selectedCategory !== 'ALL' && selectedCategory !== 'All' ? 1 : 0) +
    (selectedCollection !== 'All' ? 1 : 0) +
    (selectedFinish !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (selectedAvailability !== 'All' ? 1 : 0) +
    (appliedPriceRange ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B1C1A] flex flex-col justify-between selection:bg-[#5D1E2B] selection:text-[#FDFBF7]">
      {/* 1. ANNOUNCEMENT BAR & HEADER */}
      <AnnouncementBar />
      <Header />

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F3EE] border-b border-[#E4DDD3]/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-[11px] uppercase tracking-widest font-sans font-medium text-[#8C7D78]">
            <li>
              <Link href="/" className="hover:text-[#5D1E2B] transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-[#8C7D78]/60" /></li>
            <li className="text-[#1B1C1A] font-semibold">Shop</li>
          </ol>
        </div>
      </nav>

      {/* 2. EDITORIAL SHOP HEADER */}
      <div className="bg-[#FDFBF7] border-b border-[#E4DDD3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C7D78]">SHOP</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1B1C1A] mt-2 tracking-tight">
            THE ENTEYA COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-[#1B1C1A]/80 font-light mt-3 leading-relaxed font-sans max-w-xl mx-auto">
            A considered collection of jewellery designed for moments that become memories.
          </p>
        </div>
      </div>

      {/* 3. HORIZONTAL CATEGORY NAVIGATION BAR */}
      <div className="bg-[#FDFBF7] border-b border-[#E4DDD3] py-4 sticky top-16 z-20 backdrop-blur-md bg-[#FDFBF7]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-none py-1 justify-start sm:justify-center">
            {categoryNavItems.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.value.toLowerCase();
              return (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-xs uppercase tracking-widest font-sans font-medium whitespace-nowrap transition-all relative py-1 hover:text-[#5D1E2B] ${
                    isSelected ? 'text-[#5D1E2B] font-bold' : 'text-[#8C7D78]'
                  }`}
                >
                  {cat.label}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D1E2B] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. MAIN CATALOGUE LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* TOP TOOLBAR: PRODUCT COUNT, MOBILE ACTIONS & SORT SELECTOR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-6 mb-8 border-b border-[#E4DDD3] gap-4">
          
          {/* Product Count Display */}
          <div className="flex items-center space-x-3">
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#1B1C1A]">
              Showing {filteredProducts.length} of {productsList.length} pieces
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#5D1E2B] text-[#FDFBF7]">
                Filtered
              </span>
            )}
          </div>

          {/* Mobile Action Buttons (Filter & Sort) */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 bg-[#F7F3EE] border border-[#E4DDD3] py-2.5 px-4 text-xs uppercase font-semibold tracking-wider text-[#1B1C1A] flex items-center justify-center space-x-2"
            >
              <Filter className="w-3.5 h-3.5 text-[#5D1E2B]" />
              <span>FILTER & SORT ({activeFiltersCount})</span>
            </button>
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#8C7D78] font-sans">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-[#F7F3EE] border border-[#E4DDD3] px-4 py-2 text-xs font-semibold text-[#1B1C1A] focus:outline-none focus:border-[#5D1E2B] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-az">Name: A–Z</option>
              <option value="rating">Highest Rated</option>
              <option value="bestsellers">Best Sellers</option>
            </select>
          </div>

        </div>

        {/* ACTIVE FILTER PILLS / CHIPS */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-3 bg-[#F7F3EE] border border-[#E4DDD3]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7D78] mr-2">Active:</span>

            {searchQuery && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E4DDD3] text-xs font-sans text-[#1B1C1A]">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-[#5D1E2B]"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedCategory !== 'ALL' && selectedCategory !== 'All' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E4DDD3] text-xs font-sans text-[#1B1C1A]">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => handleCategoryChange('ALL')} className="hover:text-[#5D1E2B]"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedCollection !== 'All' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E4DDD3] text-xs font-sans text-[#1B1C1A]">
                <span>Collection: {selectedCollection}</span>
                <button onClick={() => handleCollectionChange('All')} className="hover:text-[#5D1E2B]"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedFinish !== 'All' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E4DDD3] text-xs font-sans text-[#1B1C1A]">
                <span>Finish: {selectedFinish}</span>
                <button onClick={() => handleFinishChange('All')} className="hover:text-[#5D1E2B]"><X className="w-3 h-3" /></button>
              </span>
            )}

            {appliedPriceRange && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E4DDD3] text-xs font-sans text-[#1B1C1A]">
                <span>Price: ₹{appliedPriceRange.min.toLocaleString('en-IN')} – {appliedPriceRange.max === Infinity ? 'Above' : `₹${appliedPriceRange.max.toLocaleString('en-IN')}`}</span>
                <button onClick={() => handlePresetPrice('All')} className="hover:text-[#5D1E2B]"><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs uppercase font-semibold text-[#5D1E2B] underline decoration-[#5D1E2B]/40 hover:text-[#1F080D] ml-auto flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR FILTERS</span>
            </button>
          </div>
        )}

        {/* CATALOGUE GRID & SIDEBAR CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP FILTER SIDEBAR (LEFT ~25%) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-[#FDFBF7] border border-[#E4DDD3] p-5 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DDD3]">
              <span className="text-xs uppercase tracking-editorial font-bold text-[#1B1C1A]">FILTER</span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] uppercase tracking-wider text-[#5D1E2B] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter 1: Category */}
            <div className="border-b border-[#E4DDD3]/60 pb-5">
              <button
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#1B1C1A] py-1"
              >
                <span>Category</span>
                <ChevronDown className={`w-4 h-4 text-[#8C7D78] transition-transform ${openSections['category'] ? 'rotate-180' : ''}`} />
              </button>
              {openSections['category'] && (
                <div className="mt-3 space-y-1.5 font-sans text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#5D1E2B] text-[#FDFBF7] font-semibold'
                          : 'text-[#1B1C1A]/80 hover:bg-[#F7F3EE]'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory.toLowerCase() === cat.toLowerCase() && <Check className="w-3 h-3 text-[#D2A75C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: Collection */}
            <div className="border-b border-[#E4DDD3]/60 pb-5">
              <button
                onClick={() => toggleSection('collection')}
                className="w-full flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#1B1C1A] py-1"
              >
                <span>Collection Line</span>
                <ChevronDown className={`w-4 h-4 text-[#8C7D78] transition-transform ${openSections['collection'] ? 'rotate-180' : ''}`} />
              </button>
              {openSections['collection'] && (
                <div className="mt-3 space-y-1.5 font-sans text-xs">
                  {collections.map(col => (
                    <button
                      key={col}
                      onClick={() => handleCollectionChange(col)}
                      className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                        selectedCollection === col
                          ? 'bg-[#5D1E2B] text-[#FDFBF7] font-semibold'
                          : 'text-[#1B1C1A]/80 hover:bg-[#F7F3EE]'
                      }`}
                    >
                      <span>{col}</span>
                      {selectedCollection === col && <Check className="w-3 h-3 text-[#D2A75C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3: Price */}
            <div className="border-b border-[#E4DDD3]/60 pb-5">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#1B1C1A] py-1"
              >
                <span>Price Range</span>
                <ChevronDown className={`w-4 h-4 text-[#8C7D78] transition-transform ${openSections['price'] ? 'rotate-180' : ''}`} />
              </button>
              {openSections['price'] && (
                <div className="mt-3 space-y-3 font-sans text-xs">
                  <div className="space-y-1">
                    {[
                      { label: 'All Prices', val: 'All' },
                      { label: 'Under ₹1,000', val: 'under-1000' },
                      { label: '₹1,000 – ₹1,500', val: '1000-1500' },
                      { label: '₹1,500 – ₹2,000', val: '1500-2000' },
                      { label: '₹2,000 & Above', val: 'above-2000' }
                    ].map(preset => (
                      <button
                        key={preset.val}
                        onClick={() => handlePresetPrice(preset.val)}
                        className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                          pricePreset === preset.val
                            ? 'bg-[#5D1E2B] text-[#FDFBF7] font-semibold'
                            : 'text-[#1B1C1A]/80 hover:bg-[#F7F3EE]'
                        }`}
                      >
                        <span>{preset.label}</span>
                        {pricePreset === preset.val && <Check className="w-3 h-3 text-[#D2A75C]" />}
                      </button>
                    ))}
                  </div>

                  {/* Custom Price Inputs */}
                  <form onSubmit={handleApplyCustomPrice} className="pt-2 border-t border-[#E4DDD3]/40">
                    <span className="block text-[10px] uppercase font-bold text-[#8C7D78] mb-1.5">Custom Price (₹)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="MIN"
                        value={customMinPrice}
                        onChange={e => setCustomMinPrice(e.target.value)}
                        className="w-full px-2 py-1 border border-[#E4DDD3] text-xs bg-white focus:outline-none focus:border-[#5D1E2B]"
                      />
                      <span className="text-[#8C7D78]">–</span>
                      <input
                        type="number"
                        placeholder="MAX"
                        value={customMaxPrice}
                        onChange={e => setCustomMaxPrice(e.target.value)}
                        className="w-full px-2 py-1 border border-[#E4DDD3] text-xs bg-white focus:outline-none focus:border-[#5D1E2B]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-1.5 bg-[#1B1C1A] hover:bg-[#5D1E2B] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-widest transition-colors"
                    >
                      Apply Range
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Filter 4: Finish / Polish */}
            <div className="border-b border-[#E4DDD3]/60 pb-5">
              <button
                onClick={() => toggleSection('finish')}
                className="w-full flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#1B1C1A] py-1"
              >
                <span>Finish & Polish</span>
                <ChevronDown className={`w-4 h-4 text-[#8C7D78] transition-transform ${openSections['finish'] ? 'rotate-180' : ''}`} />
              </button>
              {openSections['finish'] && (
                <div className="mt-3 space-y-1.5 font-sans text-xs">
                  {finishes.map(fin => (
                    <button
                      key={fin}
                      onClick={() => handleFinishChange(fin)}
                      className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                        selectedFinish === fin
                          ? 'bg-[#5D1E2B] text-[#FDFBF7] font-semibold'
                          : 'text-[#1B1C1A]/80 hover:bg-[#F7F3EE]'
                      }`}
                    >
                      <span>{fin}</span>
                      {selectedFinish === fin && <Check className="w-3 h-3 text-[#D2A75C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 5: Special Edits */}
            <div>
              <button
                onClick={() => toggleSection('availability')}
                className="w-full flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#1B1C1A] py-1"
              >
                <span>Special Edits</span>
                <ChevronDown className={`w-4 h-4 text-[#8C7D78] transition-transform ${openSections['availability'] ? 'rotate-180' : ''}`} />
              </button>
              {openSections['availability'] && (
                <div className="mt-3 space-y-1.5 font-sans text-xs">
                  {availabilities.map(avail => (
                    <button
                      key={avail}
                      onClick={() => setSelectedAvailability(avail)}
                      className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                        selectedAvailability === avail
                          ? 'bg-[#5D1E2B] text-[#FDFBF7] font-semibold'
                          : 'text-[#1B1C1A]/80 hover:bg-[#F7F3EE]'
                      }`}
                    >
                      <span>{avail}</span>
                      {selectedAvailability === avail && <Check className="w-3 h-3 text-[#D2A75C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* PRODUCT GRID CONTAINER (RIGHT ~75% - 3/4 COLUMNS) */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty Results State */
              <div className="bg-[#F7F3EE] border border-[#E4DDD3] p-12 text-center my-6">
                <Sparkles className="w-8 h-8 text-[#D2A75C] mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-normal text-[#1B1C1A]">NOTHING FOUND</h3>
                <p className="text-xs text-[#8C7D78] font-sans mt-2 max-w-md mx-auto">
                  Try adjusting your selection to discover more pieces.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-6 inline-flex items-center space-x-2 px-6 py-2.5 bg-[#5D1E2B] hover:bg-[#1F080D] text-[#FDFBF7] text-xs uppercase font-semibold tracking-widest transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>CLEAR FILTERS</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 5. EDITORIAL PROMOTIONAL INSERT SECTION */}
      <section className="bg-[#1F080D] text-[#FDFBF7] py-16 lg:py-20 border-t border-[#D2A75C]/20 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/9] bg-[#1F080D] border border-[#D2A75C]/30 overflow-hidden">
              <Image
                src="/images/enteya-01.png"
                alt="Enteya editorial craftsmanship detail"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-5 space-y-5 text-left">
              <span className="text-xs uppercase tracking-editorial font-bold text-[#D2A75C]">
                CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FDFBF7] leading-tight">
                THE BEAUTY<br />IS IN THE DETAIL.
              </h2>
              <div className="w-12 h-0.5 bg-[#D2A75C]"></div>
              <p className="text-xs sm:text-sm text-[#FDFBF7]/80 font-light leading-relaxed font-sans">
                Every piece is shaped by balance, detail and timeless expression. Handcrafted for modern women who appreciate Indian heritage reimagined.
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#D2A75C] hover:text-[#E8CCA0] transition-colors"
                >
                  <span>DISCOVER ENTEYA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER / PRIVATE ACCESS SECTION */}
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

      {/* MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end lg:hidden animate-fade-in">
          <div className="bg-[#FDFBF7] w-full max-w-xs sm:max-w-sm h-full flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E4DDD3]">
                <span className="text-xs uppercase tracking-editorial font-bold text-[#1B1C1A]">FILTER & SORT ({activeFiltersCount})</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-[#1B1C1A]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter & Sort Options */}
              <div className="py-4 space-y-6">
                {/* Sort Option */}
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-[#1B1C1A] mb-2">Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full p-2.5 border border-[#E4DDD3] bg-white text-xs text-[#1B1C1A]"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-az">Name: A–Z</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-[#1B1C1A] mb-2">Category</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`p-2 border text-left truncate ${
                          selectedCategory.toLowerCase() === cat.toLowerCase()
                            ? 'border-[#5D1E2B] bg-[#5D1E2B] text-white font-semibold'
                            : 'border-[#E4DDD3] bg-white text-[#1B1C1A]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collection */}
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-[#1B1C1A] mb-2">Collection</span>
                  <div className="space-y-1 text-xs">
                    {collections.map(col => (
                      <button
                        key={col}
                        onClick={() => handleCollectionChange(col)}
                        className={`w-full p-2 border text-left flex justify-between items-center ${
                          selectedCollection === col
                            ? 'border-[#5D1E2B] bg-[#5D1E2B] text-white font-semibold'
                            : 'border-[#E4DDD3] bg-white text-[#1B1C1A]'
                        }`}
                      >
                        <span>{col}</span>
                        {selectedCollection === col && <Check className="w-3.5 h-3.5 text-[#D2A75C]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finish */}
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-[#1B1C1A] mb-2">Finish & Polish</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {finishes.map(fin => (
                      <button
                        key={fin}
                        onClick={() => handleFinishChange(fin)}
                        className={`p-2 border text-left truncate ${
                          selectedFinish === fin
                            ? 'border-[#5D1E2B] bg-[#5D1E2B] text-white font-semibold'
                            : 'border-[#E4DDD3] bg-white text-[#1B1C1A]'
                        }`}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4DDD3] flex gap-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-3 border border-[#E4DDD3] text-xs font-semibold uppercase tracking-wider text-[#1B1C1A]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#5D1E2B] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider"
              >
                View {filteredProducts.length} Pieces
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FOOTER & MODALS */}
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <span className="font-serif text-2xl text-[#5D1E2B] animate-pulse">Loading ENTEYA Collection...</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
