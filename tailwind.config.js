module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Scan all files in src/app
    './src/pages/**/*.{js,ts,jsx,tsx}', // Include pages if any
    './src/components/**/*.{js,ts,jsx,tsx}', // Include components if separate
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}