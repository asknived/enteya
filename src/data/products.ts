export interface Product {
  id: string;
  name: string;
  category: 'Necklaces' | 'Earrings' | 'Bracelets' | 'Bangles' | 'Rings';
  price: string;
  priceNumeric: number;
  originalPrice?: string;
  image: string;
  secondaryImage?: string;
  description: string;
  details: string[];
  isSignature?: boolean;
  isNewArrival?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ent-01',
    name: 'Royal Kundan Choker',
    category: 'Necklaces',
    price: '₹4,890',
    priceNumeric: 4890,
    originalPrice: '₹5,800',
    image: '/images/enteya-07.png',
    secondaryImage: '/images/enteya-02.png',
    description: 'An exquisite statement choker crafted with antique champagne gold finish, intricate filigree motifs, and deep ruby-red accent stones set against deep burgundy velvet tones.',
    details: [
      '22k Antique Champagne Gold Polish',
      'Hand-set Kundan & Faux Ruby Accents',
      'Adjustable Silk Cord Fastening',
      'Hypoallergenic Nickel-Free Alloy'
    ],
    isSignature: true,
    isNewArrival: true,
  },
  {
    id: 'ent-02',
    name: 'Jhumka Heritage Drops',
    category: 'Earrings',
    price: '₹2,499',
    priceNumeric: 2499,
    originalPrice: '₹3,100',
    image: '/images/enteya-08.png',
    secondaryImage: '/images/enteya-03.png',
    description: 'Traditional yet minimalist drops featuring delicate bell silhouettes, fine gold bead cluster edging, and subtle pearl accents for effortless elegance.',
    details: [
      'Lightweight Architectural Construction',
      'Freshwater Pearl Cluster Edging',
      'Secure Push-Back Post',
      'Hand-buffed Satin Finish'
    ],
    isSignature: true,
    isNewArrival: true,
  },
  {
    id: 'ent-03',
    name: 'Filigree Temple Cuff',
    category: 'Bangles',
    price: '₹4,250',
    priceNumeric: 4250,
    originalPrice: '₹5,000',
    image: '/images/enteya-09.png',
    secondaryImage: '/images/enteya-05.png',
    description: 'A bold, handcrafted bangle cuff engraved with timeless floral lattice artwork, designed to captivate with every gesture.',
    details: [
      'Hand-chiselled Lattice Detail',
      'Hinged Side Opening with Safety Lock',
      'Champagne Warm Gold Coating',
      'Inner Comfort Fit Rim'
    ],
    isSignature: true,
  },
  {
    id: 'ent-04',
    name: 'Floral Pearl Statement Ring',
    category: 'Rings',
    price: '₹1,950',
    priceNumeric: 1950,
    originalPrice: '₹2,400',
    image: '/images/enteya-10.png',
    secondaryImage: '/images/enteya-04.png',
    description: 'An alluring cocktail ring crowned with a central pearl motif surrounded by sculpted golden petals.',
    details: [
      'Adjustable Band (Fits Sizes 6-10)',
      'Lustrous Cabochon Pearl Centerpiece',
      'Matte & Polished Dual Gold Finish',
      'Resistant Tarnish-Free Lacquer'
    ],
    isSignature: true,
    isNewArrival: true,
  }
];

export const COLLECTIONS = [
  {
    id: 'necklaces',
    title: 'NECKLACES',
    subtitle: 'Timeless silhouettes',
    image: '/images/enteya-02.png',
    link: '#featured-products',
    description: 'Graceful neckwear carved with quiet luxury and rich cultural heritage.',
  },
  {
    id: 'earrings',
    title: 'EARRINGS',
    subtitle: 'Sculpted expressions',
    image: '/images/enteya-03.png',
    link: '#featured-products',
    description: 'Delicate statements designed to frame the visage with warmth and brilliance.',
  },
  {
    id: 'bracelets',
    title: 'BRACELETS',
    subtitle: 'Tactile refinement',
    image: '/images/enteya-04.png',
    link: '#featured-products',
    description: 'Sleek cuffs and fluid chains designed for daily adornment.',
  },
  {
    id: 'bangles',
    title: 'BANGLES',
    subtitle: 'Heritage stacked in gold',
    image: '/images/enteya-05.png',
    link: '#featured-products',
    description: 'Sculptural bangles that echo centuries of artisan mastery.',
  },
];
