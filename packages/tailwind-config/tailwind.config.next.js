const config = require('./tailwind.config');
module.exports = {
  ...config,
  content: [
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
