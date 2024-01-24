module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  theme: {
    extend: {
      boxShadow: {
        menu: '1px 0px 8.4px 0px rgba(124, 124, 124, 0.25)',
        create: '0px 3px 11.2px 0px rgba(78, 78, 78, 0.15);',
      },
    },
    colors: {
      yellow: {
        1: '#FFE9AF',
        2: '#FFC061',
      },
      green: {
        1: '#0BAB84',
        2: '#16CF81',
        3: '#9DE3C2',
        4: '#DDF4DF',
      },
      pink: {
        1: '#EA846E',
        2: '#FFE7E7',
        3: '#FA9493',
        4: '#F19CA6',
        5: '#FFDCDC',
      },
      gray: {
        1: '#D9D9D9',
        2: '#F2F2F2',
        3: '#4B687D',
      },
      blue: {
        1: '#1E73BE',
        2: '#A8E0FF',
        3: '#265395',
        4: '#669DFA',
        5: '#667085',
        6: '#F4FAFF',
        7: '#2887F3',
      },
      red: {
        1: '#ff4d4f',
        2: '#EB4B4B',
      },
      white: {
        1: '#fff',
        2: '#EAEAEA',
        3: '#FBFBFB',
        4: '#F5F8FF',
      },
      black: {
        1: '#000',
        2: '#48677E',
        3: '#0C2E4F',
        4: '#333',
        5: '#6A6A6A',
        6: '#263238',
        7: '#666',
      },
      purple: {
        1: '#925BD7',
      },
    },
    fontFamily: {
      bombOne: ['Cherry Bomb One'],
    },
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

      tablet: '890px',
      // => @media (min-width: 890px) { ... }

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
}
