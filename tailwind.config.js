/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gymYellow: '#eefb03', // Volt yellow from the screenshot
        gymGreen: '#10b981', // Accent green from GYMPRO menu hover/text
        gymDark: '#0d0e12', // Background color dark
        gymCard: '#161821', // Card background color
        gymBorder: '#2e303f', // Border color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
