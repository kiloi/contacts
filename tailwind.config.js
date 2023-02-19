/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'title': ['Poppins', 'sans-serif'],
        'body': ['Lato', 'sans-serif']
      },
      colors: {
        'primary-green': '#00bfa6',
        'primary-blue': '#5089c6',
        'primary-orange': '#FFBA5A',
        'primary-gray': '#757686',
        'primary-red': '#FF5C58',
        'body-bg': '#f6f6f6',
      },
    },
  },
  plugins: [],
}
