/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e5ddc5',
        'secondary': '#b3c8cf',
        'accent': '#F1EEDC',
      }
    },
  },
  plugins: [],
}