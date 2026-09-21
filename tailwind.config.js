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
          // The muted end of the scale was too light against warm ivory — secondary
          // copy, captions and metadata all read as washed out. Every step below 700
          // was darkened so the quietest text still clears AA comfortably rather than
          // scraping past it. Contrast on #F7F5F1: 600 = 10.6:1, 500 = 8.7:1,
          // 400 = 6.7:1, 300 = 4.6:1 (the placeholder floor).
          600: '#383838', // was #404040
          500: '#454545', // was #525252
          400: '#555555', // was #666666
          300: '#6E6E6E', // was #A3A3A3 — the old value was 2.3:1 and failed outright
        },
        gold: {
          light: '#E0C89E',
          DEFAULT: '#D6C0A0', // Muted gold / bronze accent
          dark: '#A6824F',
          muted: '#B89660',
          text: '#806334', // Accent text at label size on ivory (AA on #F7F5F1)
          // Accent type that sits over a photograph or a photo scrim. The ivory-ground
          // token above measures 3.5:1 there, under the 4.5:1 that label-size type
          // needs; this is the measured replacement. See DESIGN.md, Photograph Type Rule.
          onPhoto: '#4A3719',
          border: 'rgba(214, 192, 160, 0.25)',
        },
      },
      fontFamily: {
        // Both stacks resolve through the CSS variables in src/styles/fonts.css,
        // which is the single swap point for the type system.
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'subtle': '0.12em',
        // Tuned for the display face. Tailwind's -0.025em default was set for a
        // neo-grotesque; a geometric sans like Montserrat has generous natural
        // sidebearings, so the same value reads cramped. Softened here once,
        // globally, rather than at each call site.
        'tight': '-0.015em',
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
