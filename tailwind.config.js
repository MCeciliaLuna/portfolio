/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can add our portfolio colors to Tailwind so we can use them in Tailwind classes!
        "purple-dark": "#7a0062",
        "purple-very-dark": "#4a003b",
        "accent-pink": "#f50062",
        "accent-orange": "#ffa033",
        "accent-yellow": "#ffe15c",
        "accent-green": "#c2cc00",
        "bg-main": "#fbf9f4",
        "text-dark": "#201a1e",
      }
    },
  },
  corePlugins: {
    preflight: false, // Prevents breaking existing CSS styles in the portfolio
  },
  plugins: [],
}
