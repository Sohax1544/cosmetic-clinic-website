/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F7F5F1', // Primary warm ivory background
          200: '#EFECE6',
          300: '#E5E0D8',
          400: '#D6CFC3',
        },
        hairline: '#E6E2DA', // Structural 1px border used across cards/chips/dividers
        ink: {
          DEFAULT: '#0A0A0A', // Near-black ink
          900: '#0A0A0A',
          800: '#171717',
          700: '#262626',
          600: '#404040',
          500: '#525252',
          400: '#666666',
          300: '#A3A3A3',
        },
        gold: {
          light: '#E0C89E',
          DEFAULT: '#C9A876', // Muted gold / bronze accent
          dark: '#A6824F',
          muted: '#B89660',
          text: '#806334', // Accent text at label size on ivory (AA on #F7F5F1)
          border: 'rgba(201, 168, 118, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Switzer', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'subtle': '0.12em',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      // Coarse-pointer (touch) context: features that must not depend on hover.
      addVariant('touch', '@media (hover: none)');
    },
  ],
}
