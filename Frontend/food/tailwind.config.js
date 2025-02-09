import daisyui from 'daisyui';

//** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include index.html file for Tailwind CSS
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React component files
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui]

};
