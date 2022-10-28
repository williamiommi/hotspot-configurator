const config = require('./tailwind.config');
module.exports = {
  ...config,
  content: ['../../packages/ui/src/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
};
