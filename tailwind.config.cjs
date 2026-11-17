/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        med: {
          bg: '#090D16',
          card: '#131B2E',
          cardHover: '#1B2640',
          border: '#1E293B',
          cyan: '#06B6D4',
          teal: '#14B8A6',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          textMuted: '#94A3B8',
          textBright: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
};
