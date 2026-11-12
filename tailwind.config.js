/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcf9',
          100: '#fbf9f4',
          200: '#f4f1e8',
          300: '#edeae1',
          400: '#ded9cb',
        },
        accentYellow: '#ffea79',
      }
    },
  },
  plugins: [],
}

