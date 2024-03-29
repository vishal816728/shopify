/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist:[
    'text-red-500 text-4xl m-4 underline hover:no-underline'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}