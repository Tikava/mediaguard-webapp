import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#DCFCE7',   // light highlight
          100: '#C5F6D5',
          200: '#A3E9BA',
          300: '#7ED7A0',
          400: '#4CCB7F',
          500: '#22C55E',  // mid tone (also used for success cues)
          600: '#16A34A',  // primary base
          700: '#15803D',  // hover/darker
          800: '#0F5F30',
          900: '#0B4B26',
        },
      },
      boxShadow: {
        card: '0 18px 50px -25px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [forms],
}
