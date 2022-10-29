/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/line-clamp')],
};
