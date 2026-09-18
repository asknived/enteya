export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  hoverImage?: string;
  rating?: number;
  reviewsCount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  finishes: string[];
  description: string;
  details?: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  googleMapsUrl: string;
  image?: string;
}

export const BRAND_CONFIG = {
  name: "ENTEYA",
  tagline: "Discover jewellery that belongs to every version of you.",
  slogan: "Discover jewellery that belongs to every version of you.",
  positioning: "Modern Indian Gold, Reimagined",
  description: "ENTEYA crafts accessible, premium rolled-gold and antique-gold jewellery designed for modern Indian women. Timeless elegance, anti-tarnish micro-plating, and versatile statement pieces under ₹2,000.",
  announcementText: "✨ Modern Indian Gold, Reimagined | Free WhatsApp Enquiry & Express Pan-India Assistance",
  whatsappNumber: "919876543210", // Primary ENTEYA Business WhatsApp

  fonts: {
    display: "Cormorant Garamond",
    body: "Plus Jakarta Sans",
  },

  colors: {
    purplePrimary: "#7A2E98",
    purpleDeep: "#5B2C9D",
    magenta: "#D5007D",
    champagneGold: "#F5B21A",
    luxuryGold: "#FFD700",
    white: "#FFFFFF",
    charcoal: "#1A1A1A"
  },

  hero: {
    eyebrow: "MODERN INDIAN GOLD, REIMAGINED",
    headline: "Discover jewellery that belongs to every version of you.",
    subheadline: "Crafted rolled-gold bangles, antique-gold necklaces & everyday statement pieces primarily under ₹2,000.",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaHref: "/shop",
    secondaryCtaText: "SHOP NEW ARRIVALS",
    secondaryCtaHref: "/shop?sort=newest",
    image: "/images/enteya-01.png",
    imageAlt: "Indian woman wearing elegant ENTEYA rolled gold and antique jewellery"
  },

  categories: [
    {
      id: "rolled-gold-bangles",
      name: "Rolled-Gold Bangles",
      subtitle: "Classic stacks & textured micro-plated cuffs",
      image: "/images/enteya-02.png",
      itemCount: "34 Styles"
    },
    {
      id: "rolled-gold-necklaces",
      name: "Rolled-Gold Necklaces",
      subtitle: "Lightweight layered chains & chokers",
      image: "/images/enteya-03.png",
      itemCount: "28 Styles"
    },
    {
      id: "antique-gold-jewellery",
      name: "Antique-Gold Jewellery",
      subtitle: "Heritage Temple & Kundan motifs",
      image: "/images/enteya-04.png",
      itemCount: "40 Styles"
    },
    {
      id: "trendy-rolled-gold",
      name: "Trendy Rolled-Gold",
      subtitle: "Contemporary geometric & minimalist wear",
      image: "/images/enteya-05.png",
      itemCount: "25 Styles"
    },
    {
      id: "earrings",
      name: "Earrings",
      subtitle: "Jhumkas, chandbalis & statement studs",
      image: "/images/enteya-06.png",
      itemCount: "46 Styles"
    },
    {
      id: "rings-sets",
      name: "Rings & Sets",
      subtitle: "Cocktail rings & matching bridal-edits",
      image: "/images/enteya-07.png",
      itemCount: "22 Sets"
    }
  ],

  collections: [
    {
      id: "Antique Gold",
      name: "Antique Gold Collection",
      tagline: "Matte vintage polish inspired by royal Indian heritage",
      image: "/images/enteya-08.png"
    },
    {
      id: "Rolled Gold",
      name: "Rolled Gold Signature",
      tagline: "Ultra-durable micro-rolled gold lustre that never dulls",
      image: "/images/enteya-09.png"
    },
    {
      id: "Everyday Jewellery",
      name: "Everyday Jewellery",
      tagline: "Featherlight anti-tarnish pieces for work & routine",
      image: "/images/enteya-10.png"
    },
    {
      id: "Statement Jewellery",
      name: "Statement Jewellery",
      tagline: "Bold cocktail pieces for weddings & celebrations",
      image: "/images/enteya-11.png"
    }
  ],

  styleDiscovery: [
    {
      id: "everyday",
      title: "For Everyday",
      tagline: "Minimal pieces for daily wear & workwear",
      description: "Subtle gold chains, sleek cuffs, and anti-tarnish studs designed for comfort all day.",
      image: "/images/enteya-12.png",
      query: "?collection=Everyday+Jewellery"
    },
    {
      id: "celebrations",
      title: "For Celebrations",
      tagline: "More expressive, radiant jewellery",
      description: "Rich antique gold Jhumkas, Lakshmi coin necklaces, and regal chokers for festivities.",
      image: "/images/enteya-13.png",
      query: "?collection=Antique+Gold"
    },
    {
      id: "gifting",
      title: "For Gifting",
      tagline: "Easy-to-gift, beautifully packaged pieces",
      description: "Versatile adjustable bangles, pearl pendants, and signature sets packaged in velvet.",
      image: "/images/enteya-01.png",
      query: "?category=Sets"
    },
    {
      id: "statement",
      title: "For Statement Looks",
      tagline: "Larger visual-impact jewellery",
      description: "Bold cocktail rings, multi-strand rolled-gold bangles, and dramatic collar necklaces.",
      image: "/images/enteya-02.png",
      query: "?collection=Statement+Jewellery"
    }
  ],

  brandStory: {
    eyebrow: "THE ENTEYA STORY",
    headline: "Modern Indian Gold, Reimagined",
    body: "ENTEYA was born out of a desire to create opulent, high-quality Indian jewellery that feels contemporary, accessible, and effortless. We believe luxury shouldn't be confined to safe lockers. Through precision rolled-gold techniques and authentic antique craftsmanship, we deliver lasting lustre primarily under ₹2,000.",
    ctaText: "DISCOVER OUR STORY",
    ctaHref: "/about",
    image: "/images/enteya-03.png"
  },

  trustPoints: [
    {
      id: "quality",
      title: "Micro-Plated Rolled Gold",
      description: "Thick micro-rolled gold finish for anti-tarnish durability and authentic gold sheen.",
      icon: "ShieldCheck"
    },
    {
      id: "enquiry",
      title: "Direct WhatsApp Enquiries",
      description: "Instant personalized assistance and product availability check via WhatsApp.",
      icon: "MessageCircle"
    },
    {
      id: "stores",
      title: "12 Exclusive Stores",
      description: "Visit ENTEYA boutiques in Mumbai, Delhi, Bengaluru, Hyderabad, and major cities.",
      icon: "MapPin"
    },
    {
      id: "pricing",
      title: "Under ₹2,000 Accessibility",
      description: "Transparent pricing without compromising on premium craftsmanship or design.",
      icon: "Tag"
    }
  ],

  // 12 Store Locations
  stores: [
    {
      id: "store-mumbai-bandra",
      name: "ENTEYA Flagship Boutique",
      city: "Mumbai",
      area: "Bandra West",
      address: "Ground Floor, Turner Road, Opposite Artiste Café, Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 98201 12345",
      hours: "10:30 AM – 9:00 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Turner+Road+Bandra+West+Mumbai",
      image: "/images/enteya-01.png"
    },
    {
      id: "store-delhi-south-ext",
      name: "ENTEYA Studio South Ext.",
      city: "New Delhi",
      area: "South Extension II",
      address: "E-14, Main Market, South Extension II, New Delhi, Delhi 110049",
      phone: "+91 98110 23456",
      hours: "11:00 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=South+Extension+II+New+Delhi",
      image: "/images/enteya-02.png"
    },
    {
      id: "store-bengaluru-indiranagar",
      name: "ENTEYA Galleria Indiranagar",
      city: "Bengaluru",
      area: "Indiranagar",
      address: "100 Feet Road, Near Toit, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 98450 34567",
      hours: "10:30 AM – 9:00 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru",
      image: "/images/enteya-03.png"
    },
    {
      id: "store-hyderabad-jubilee",
      name: "ENTEYA Heritage Store",
      city: "Hyderabad",
      area: "Jubilee Hills",
      address: "Road No. 36, Near Metro Pillar 1650, Jubilee Hills, Hyderabad, Telangana 500033",
      phone: "+91 98490 45678",
      hours: "11:00 AM – 9:00 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad",
      image: "/images/enteya-04.png"
    },
    {
      id: "store-chennai-tnagar",
      name: "ENTEYA Atelier T. Nagar",
      city: "Chennai",
      area: "T. Nagar",
      address: "42, Usman Road, Opposite Panagal Park, T. Nagar, Chennai, Tamil Nadu 600017",
      phone: "+91 98400 56789",
      hours: "10:00 AM – 9:00 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Usman+Road+T+Nagar+Chennai",
      image: "/images/enteya-05.png"
    },
    {
      id: "store-kolkata-parkstreet",
      name: "ENTEYA Jewellery Lounge",
      city: "Kolkata",
      area: "Park Street",
      address: "18A, Park Street, Near Flurys, Kolkata, West Bengal 700016",
      phone: "+91 98300 67890",
      hours: "11:00 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Park+Street+Kolkata",
      image: "/images/enteya-06.png"
    },
    {
      id: "store-ahmedabad-cgroad",
      name: "ENTEYA CG Road Boutique",
      city: "Ahmedabad",
      area: "C.G. Road",
      address: "GF-04, Zodiac Square, Opposite Navrangpura Bus Stop, C.G. Road, Ahmedabad, Gujarat 380009",
      phone: "+91 98250 78901",
      hours: "10:30 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=CG+Road+Ahmedabad",
      image: "/images/enteya-07.png"
    },
    {
      id: "store-jaipur-cscheme",
      name: "ENTEYA Royal Edition",
      city: "Jaipur",
      area: "C-Scheme",
      address: "Sardar Patel Marg, Near Statute Circle, C-Scheme, Jaipur, Rajasthan 302001",
      phone: "+91 98290 89012",
      hours: "11:00 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=C+Scheme+Jaipur",
      image: "/images/enteya-08.png"
    },
    {
      id: "store-kochi-mgroad",
      name: "ENTEYA Boutique Kochi",
      city: "Kochi",
      area: "M.G. Road",
      address: "M.G. Road, Opposite Centre Square Mall, Ernakulam, Kochi, Kerala 682035",
      phone: "+91 98470 90123",
      hours: "10:00 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=MG+Road+Kochi",
      image: "/images/enteya-09.png"
    },
    {
      id: "store-pune-koregaon",
      name: "ENTEYA Jewellery Hub",
      city: "Pune",
      area: "Koregaon Park",
      address: "Lane 6, Near German Bakery, Koregaon Park, Pune, Maharashtra 411001",
      phone: "+91 98220 01234",
      hours: "11:00 AM – 9:00 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
      image: "/images/enteya-10.png"
    },
    {
      id: "store-surat-ghoddod",
      name: "ENTEYA Studio Surat",
      city: "Surat",
      area: "Ghod Dod Road",
      address: "Prime Plaza, Ghod Dod Road, Beside ICICI Bank, Surat, Gujarat 395007",
      phone: "+91 98240 12345",
      hours: "10:30 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Ghod+Dod+Road+Surat",
      image: "/images/enteya-11.png"
    },
    {
      id: "store-lucknow-hazratganj",
      name: "ENTEYA Collection Store",
      city: "Lucknow",
      area: "Hazratganj",
      address: "Mayfair Building, Mahatma Gandhi Marg, Hazratganj, Lucknow, Uttar Pradesh 226001",
      phone: "+91 98390 23456",
      hours: "11:00 AM – 8:30 PM (Mon – Sun)",
      googleMapsUrl: "https://maps.google.com/?q=Hazratganj+Lucknow",
      image: "/images/enteya-12.png"
    }
  ],

  // Expanded Product Catalogue (Primarily under ₹2,000)
  products: [
    {
      id: "classic-antique-gold-necklace",
      sku: "ENT-NK-001",
      name: "Classic Antique Gold Choker Necklace",
      category: "Necklaces",
      collection: "Antique Gold",
      price: 1799,
      originalPrice: 2499,
      discountBadge: "28% OFF",
      image: "/images/enteya-01.png",
      hoverImage: "/images/enteya-02.png",
      rating: 4.9,
      reviewsCount: 78,
      isBestSeller: true,
      finishes: ["Antique Gold", "Matte Gold"],
      description: "An iconic ENTEYA statement choker crafted with traditional Kundan motifs and antique-gold micro-plating. Designed to rest gracefully on the collarbone for festive sarees and lehengas.",
      details: [
        "Material: High-grade brass alloy with 24k micro-rolled antique gold plating",
        "Adjustable woven silk dori thread for tailored fit",
        "Anti-tarnish protective micro-coating",
        "SKU: ENT-NK-001"
      ]
    },
    {
      id: "royal-rolled-gold-bangles-set",
      sku: "ENT-BG-002",
      name: "Royal Rolled-Gold Bangles Set of 4",
      category: "Bangles",
      collection: "Rolled Gold",
      price: 1499,
      originalPrice: 1999,
      discountBadge: "25% OFF",
      image: "/images/enteya-02.png",
      hoverImage: "/images/enteya-03.png",
      rating: 4.95,
      reviewsCount: 112,
      isBestSeller: true,
      finishes: ["Rolled Gold", "Rose Gold"],
      description: "Set of 4 precision-engraved rolled-gold bangles featuring geometric line etching and smooth inner contouring. Engineered for daily wear without losing shine.",
      details: [
        "Set includes 4 bangles",
        "Available in sizes: 2.4, 2.6, 2.8",
        "High durability anti-scratch coating",
        "SKU: ENT-BG-002"
      ]
    },
    {
      id: "traditional-antique-jhumkas",
      sku: "ENT-AQ-003",
      name: "Temple Motif Antique-Gold Jhumkas",
      category: "Antique Gold",
      collection: "Antique Gold",
      price: 1299,
      originalPrice: 1799,
      discountBadge: "27% OFF",
      image: "/images/enteya-03.png",
      hoverImage: "/images/enteya-04.png",
      rating: 4.88,
      reviewsCount: 64,
      isBestSeller: true,
      finishes: ["Antique Gold"],
      description: "Intricately detailed temple-inspired Jhumka drop earrings engraved with Goddess Lakshmi motifs and delicate hanging seed pearls.",
      details: [
        "Weight: 18g pair (featherlight feel)",
        "Hypoallergenic copper-brass core",
        "Push-back closure with silicone comfort stopper",
        "SKU: ENT-AQ-003"
      ]
    },
    {
      id: "trendy-geometric-gold-pendant",
      sku: "ENT-TR-004",
      name: "Minimalist Geometric Rolled-Gold Pendant",
      category: "Trendy Rolled Gold",
      collection: "Everyday Jewellery",
      price: 899,
      originalPrice: 1299,
      discountBadge: "30% OFF",
      image: "/images/enteya-04.png",
      hoverImage: "/images/enteya-05.png",
      rating: 4.8,
      reviewsCount: 42,
      isNew: true,
      finishes: ["Rolled Gold", "Champagne Gold"],
      description: "A contemporary sunburst medallion pendant suspended on a delicate rolled-gold curb chain. Your essential piece for effortless workwear layering.",
      details: [
        "18-inch chain with 2-inch extension",
        "Water-resistant anti-tarnish technology",
        "Secure lobster claw clasp",
        "SKU: ENT-TR-004"
      ]
    },
    {
      id: "aarna-sunburst-cocktail-ring",
      sku: "ENT-RG-005",
      name: "Aarna Sunburst Antique Cocktail Ring",
      category: "Rings",
      collection: "Statement Jewellery",
      price: 799,
      originalPrice: 1199,
      discountBadge: "33% OFF",
      image: "/images/enteya-05.png",
      hoverImage: "/images/enteya-06.png",
      rating: 4.85,
      reviewsCount: 56,
      isBestSeller: true,
      finishes: ["Antique Gold"],
      description: "A dramatic, eye-catching cocktail ring centered with faceted micro-crystals and vintage antique border detailing. Fully adjustable band for any finger.",
      details: [
        "Adjustable ring band (Fits US size 6-10)",
        "Lead & Nickel free",
        "SKU: ENT-RG-005"
      ]
    },
    {
      id: "swara-modern-mangalsutra-chain",
      sku: "ENT-MS-006",
      name: "Swara Modern Black Bead Rolled-Gold Chain",
      category: "Necklaces",
      collection: "Everyday Jewellery",
      price: 1399,
      originalPrice: 1899,
      discountBadge: "26% OFF",
      image: "/images/enteya-06.png",
      hoverImage: "/images/enteya-07.png",
      rating: 4.92,
      reviewsCount: 89,
      isNew: true,
      finishes: ["Rolled Gold", "Antique Gold"],
      description: "A modern, sleek interpretation of the daily Mangalsutra chain with natural black spinels strung alongside hand-polished rolled-gold beads.",
      details: [
        "Length: 16 inches + 2 inch extender",
        "Tarnish-resistant daily wear protection",
        "SKU: ENT-MS-006"
      ]
    },
    {
      id: "tara-kundan-necklace-set",
      sku: "ENT-SET-007",
      name: "Tara Kundan & Antique Gold Necklace Set",
      category: "Sets",
      collection: "Antique Gold",
      price: 1999,
      originalPrice: 2899,
      discountBadge: "31% OFF",
      image: "/images/enteya-07.png",
      hoverImage: "/images/enteya-08.png",
      rating: 4.96,
      reviewsCount: 134,
      isNew: true,
      isBestSeller: true,
      finishes: ["Antique Gold"],
      description: "Grand Kundan choker set with ruby-toned glass crystals and matching drop earrings. Exceptional luxury feel under ₹2,000 for bridal guests.",
      details: [
        "Includes Choker Necklace & Pair of Matching Jhumkas",
        "Custom velvet gift box included",
        "SKU: ENT-SET-007"
      ]
    },
    {
      id: "mesh-rolled-gold-cuff-bangle",
      sku: "ENT-BG-008",
      name: "Filigree Mesh Rolled-Gold Open Cuff",
      category: "Bangles",
      collection: "Rolled Gold",
      price: 1199,
      originalPrice: 1599,
      discountBadge: "25% OFF",
      image: "/images/enteya-08.png",
      hoverImage: "/images/enteya-09.png",
      rating: 4.78,
      reviewsCount: 39,
      isNew: true,
      finishes: ["Rolled Gold", "Rose Gold"],
      description: "An openable flexible wrist cuff crafted with delicate floral filigree mesh work in warm rolled gold. Fits comfortably on all wrist sizes.",
      details: [
        "Openable hinge mechanism",
        "Fits wrist sizes 2.2 to 2.8",
        "SKU: ENT-BG-008"
      ]
    },
    {
      id: "layered-coin-pendant-necklace",
      sku: "ENT-NK-009",
      name: "Lakshmi Coin Dual Layer Rolled-Gold Necklace",
      category: "Necklaces",
      collection: "Antique Gold",
      price: 1599,
      originalPrice: 2199,
      discountBadge: "27% OFF",
      image: "/images/enteya-09.png",
      hoverImage: "/images/enteya-10.png",
      rating: 4.91,
      reviewsCount: 71,
      isNew: true,
      finishes: ["Antique Gold", "Rolled Gold"],
      description: "Dual layered necklace featuring micro-stamped Lakshmi coin motifs suspended from a paperclip chain and delicate curb strand.",
      details: [
        "Layered chain length: 14 + 18 inches",
        "Solid brass core with multi-layer micro-gold polish",
        "SKU: ENT-NK-009"
      ]
    },
    {
      id: "trendy-twisted-rolled-gold-hoops",
      sku: "ENT-ER-010",
      name: "Textured Twist Rolled-Gold Hoop Earrings",
      category: "Trendy Rolled Gold",
      collection: "Everyday Jewellery",
      price: 699,
      originalPrice: 999,
      discountBadge: "30% OFF",
      image: "/images/enteya-10.png",
      hoverImage: "/images/enteya-11.png",
      rating: 4.84,
      reviewsCount: 45,
      isNew: true,
      finishes: ["Rolled Gold", "Matte Gold"],
      description: "Medium-sized twisted hoop earrings in radiant rolled gold. Light as a feather for daily office wear and casual outings.",
      details: [
        "Diameter: 25mm",
        "Weight: 8g pair",
        "Secure click-top closure",
        "SKU: ENT-ER-010"
      ]
    },
    {
      id: "antique-emerald-drop-chandbalis",
      sku: "ENT-AQ-011",
      name: "Vintage Emerald Drop Antique Chandbalis",
      category: "Antique Gold",
      collection: "Statement Jewellery",
      price: 1699,
      originalPrice: 2299,
      discountBadge: "26% OFF",
      image: "/images/enteya-11.png",
      hoverImage: "/images/enteya-12.png",
      rating: 4.94,
      reviewsCount: 93,
      isBestSeller: true,
      finishes: ["Antique Gold"],
      description: "Crescent-shaped Chandbali earrings adorned with synthetic emerald drops and antique gold filigree. Designed for weddings and grand galas.",
      details: [
        "Height: 6.5 cm",
        "Comfort cushion ear stoppers included",
        "SKU: ENT-AQ-011"
      ]
    },
    {
      id: "sleek-rolled-gold-snake-chain",
      sku: "ENT-NK-012",
      name: "Liquid Gold Rolled-Gold Snake Chain",
      category: "Trendy Rolled Gold",
      collection: "Everyday Jewellery",
      price: 999,
      originalPrice: 1399,
      discountBadge: "28% OFF",
      image: "/images/enteya-12.png",
      hoverImage: "/images/enteya-13.png",
      rating: 4.89,
      reviewsCount: 67,
      isNew: true,
      finishes: ["Rolled Gold"],
      description: "Ultra-smooth herringbone snake chain that drapes over skin like liquid gold. Water-resistant and tarnish-proof.",
      details: [
        "Width: 3mm | Length: 16 inches + 2 inch extender",
        "Hypoallergenic anti-tarnish micro-finish",
        "SKU: ENT-NK-012"
      ]
    }
  ]
};
