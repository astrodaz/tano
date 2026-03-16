/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Main background colours
        space: {
          950: '#080810',
          900: '#0d0d1a',
          800: '#12122a',
          700: '#1a1a3a',
        },
        // Orange accent colours
        nebula: {
          300: '#fcd5a0',
          400: '#f9a84d',
          500: '#f78c1e',
          600: '#d97008',
          700: '#b85c00',
        },
        // Hot green accent - for secondary highlights
        aurora: {
          300: '#a0f0c0',
          400: '#4de8a0',
          500: '#00d084',
          600: '#00a86b',
          700: '#007a4d',
        },
        // Neutral star colours for text
        starlight: {
          100: '#f5f5f0',
          200: '#e8e8e0',
          300: '#ccccbf',
          400: '#aaaaaa',
          500: '#888880',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}