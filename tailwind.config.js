// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./javascript/**/*.js"
  ],
  safelist: [
    'rounded-xl',
    'bg-[#e5ddc5]',
    'h-40',
    'w-[50%]',
    'justify-center',
    'items-center',
    'gap-3',
    'mt-3',
    'p-2',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};