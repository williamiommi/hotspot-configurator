const config = require('./tailwind.config');
module.exports = {
  ...config,
  content: [...config.content, './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
};
