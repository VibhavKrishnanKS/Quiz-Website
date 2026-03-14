/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        glow: {
          purple: '#A259FF',
          pink: '#FF4D8D',
          cyan: '#00E5FF',
          orange: '#FF8C42',
        }
      },
      fontFamily: {
        bubbly: ['"Love Ya Like A Sister"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
