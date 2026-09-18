import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ENTEYA Official Brand Palette
        enteya: {
          purple: {
            DEFAULT: '#7A2E98',
            deep: '#5B2C9D',
            light: '#F3E8FA',
            dark: '#451D59',
          },
          magenta: {
            DEFAULT: '#D5007D',
            hover: '#B00067',
            light: '#FDF0F7',
          },
          gold: {
            DEFAULT: '#FFD700',
            champagne: '#F5B21A',
            light: '#FFF5D6',
            dark: '#C8940C',
            metallic: '#D4AF37',
          },
          charcoal: '#1A1A1A',
          muted: '#5A5A5A',
          border: '#E8E4EC',
          surface: '#FAF8FC',
          burgundy: '#5D1E2B',
          velvet: '#1F080D',
          ivory: '#FDFBF7',
          alabaster: '#F7F3EE',
          taupe: '#8C7D78',
        },
        burgundy: {
          DEFAULT: '#5D1E2B',
          deep: '#1F080D',
          light: '#762838',
        },
        velvet: '#1F080D',
        ivory: '#FDFBF7',
        alabaster: '#F7F3EE',
        gold: {
          DEFAULT: '#D2A75C',
          light: '#E8CCA0',
          dark: '#A67F37',
          champagne: '#F5B21A',
        },
        taupe: '#8C7D78',
        darkText: '#1B1C1A',
        hairline: '#E4DDD3',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-eb-garamond)', 'Cormorant Garamond', 'EB Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'var(--font-dm-sans)', 'Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
        editorial: '0.3em',
      },
      boxShadow: {
        'soft-luxury': '0 20px 40px -15px rgba(91, 44, 157, 0.08)',
        'gold-glow': '0 8px 30px rgba(245, 178, 26, 0.25)',
        'purple-glow': '0 8px 30px rgba(122, 46, 152, 0.2)',
        'card-hover': '0 20px 35px -10px rgba(26, 26, 26, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
