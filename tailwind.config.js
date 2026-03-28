/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // This tells Tailwind: whenever I type 'font-serif', use Playfair Display!
        serif: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
