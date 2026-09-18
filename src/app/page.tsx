'use client';

import React from 'react';

// Section 1: Announcement Bar
import { AnnouncementBar } from '@/components/AnnouncementBar';

// Section 2: Navigation
import { Navbar } from '@/components/Navbar';

// Section 3: Hero Section
import { Hero } from '@/components/Hero';

// Section 4: Brand Introduction
import { BrandIntro } from '@/components/BrandIntro';

// Section 5: Featured Collections
import { FeaturedCollections } from '@/components/FeaturedCollections';

// Section 6: Editorial Jewellery Image Section
import { EditorialFeature } from '@/components/EditorialFeature';

// Section 7: Featured Products ("THE EDIT")
import { FeaturedProducts } from '@/components/FeaturedProducts';

// Section 8: Craftsmanship / Brand Story
import { CraftsmanshipStory } from '@/components/CraftsmanshipStory';

// Section 9: Model/Editorial Section
import { ModelEditorial } from '@/components/ModelEditorial';

// Section 10: Curated Collection (Secondary Editorial Grid)
import { SecondaryEditorialGrid } from '@/components/SecondaryEditorialGrid';

// Section 11: Brand Statement
import { BrandStatement } from '@/components/BrandStatement';

// Section 12: Newsletter / Private Access
import { Newsletter } from '@/components/Newsletter';

// Section 13: Footer
import { Footer } from '@/components/Footer';

// Interactive Overlays
import { CartDrawer } from '@/components/CartDrawer';
import { ProductModal } from '@/components/ProductModal';

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-darkText flex flex-col selection:bg-burgundy selection:text-ivory">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Brand Introduction */}
      <BrandIntro />

      {/* 5. Featured Collections */}
      <FeaturedCollections />

      {/* 6. Editorial Jewellery Image Section */}
      <EditorialFeature />

      {/* 7. Featured Products */}
      <FeaturedProducts />

      {/* 8. Craftsmanship / Brand Story */}
      <CraftsmanshipStory />

      {/* 9. Model/Editorial Section */}
      <ModelEditorial />

      {/* 10. Curated Collection */}
      <SecondaryEditorialGrid />

      {/* 11. Brand Statement */}
      <BrandStatement />

      {/* 12. Newsletter / Private Access */}
      <Newsletter />

      {/* 13. Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <ProductModal />
    </main>
  );
}
