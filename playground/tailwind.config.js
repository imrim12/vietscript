/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        30: '120px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
