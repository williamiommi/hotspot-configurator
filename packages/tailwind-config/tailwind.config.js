/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../packages/shared/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/line-clamp')],
};
