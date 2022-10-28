const config = require('./tailwind.config');
module.exports = {
  ...config,
  content: [...config.content, 'src/**/*.{js,ts,jsx,tsx}'],
};
