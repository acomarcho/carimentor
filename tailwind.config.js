/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        jakarta: ["var(--font-plus-jakarta-sans)"],
      },
      colors: {
        purple: {
          50: "#f2f0ff",
          600: "#6254d9",
          950: "#120b53",
        },
        gray: {
          25: "#fdfdfd",
          100: "#eceeef",
          400: "#ced4da",
        },
      },
    },
  },
  plugins: [],
};
