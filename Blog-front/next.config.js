/**
 * @type {import('next').NextConfig}
 */

const env = {
  FINCODE_PUBLIC_KEY: process.env.FINCODE_PUBLIC_KEY || '',
  FINCODE_BASE_URL: process.env.FINCODE_BASE_URL || '',
  PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  FE_URL: process.env.FE_URL,
  CDN_DOMAIN: process.env.CDN_DOMAIN
}

const nextConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  env,
  theme: {
    extend: {},
    fontSize: {
      normal: ['15px', '25px'],
      mobile: ['13px', '26px'],
      smobile: ['11px', '22px'],
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'max-2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      'max-xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      'max-lg': { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      'max-md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      'max-sm': { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

module.exports = nextConfig
