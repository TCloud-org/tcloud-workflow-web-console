/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", './public/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        "primary": '#4312e5',
        "hover": 'rgb(241 245 249 / 0.6)'
      }
    },
  },
  plugins: [],
}