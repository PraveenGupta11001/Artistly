/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx,css}', // Pages, layouts, globals.css
    './src/components/**/*.{js,ts,jsx,tsx,mdx,css}', // Components, including ui/
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};