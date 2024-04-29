/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#0EB29A',
        'pale-green': '#F5FDFF'
      },
      fontFamily: {
        
      }
    },
  },
  plugins: [],
}