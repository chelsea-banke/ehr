// const flowbite = require('flowbite-react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 'node_modules/flowbite-react/lib/esm/**/*.js'
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
  plugins: [
    // require('flowbite/plugin')
  ],
}