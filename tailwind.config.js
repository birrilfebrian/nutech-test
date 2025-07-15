/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/Views/**/*.php", "./app/Views/**/*.html"],
  safelist: [
    "border-red-500",
    "border-gray-300",
    "text-red-500",
    "hidden",
    "min-w-[200px]",
    "w-[200px]",
    "h-[120px]",
    "snap-start",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
