/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#191919',
          secondary: '#202020',
          hover: '#2a2a2a',
          border: '#2f2f2f',
        },
        text: {
          primary: '#e6e6e6',
          secondary: '#a3a3a3',
        },
        accent: {
          0: '#161b22',
          1: '#0e4429',
          2: '#006d32',
          3: '#26a641',
          4: '#39d353',
        },
      },
    },
  },
  plugins: [],
}
