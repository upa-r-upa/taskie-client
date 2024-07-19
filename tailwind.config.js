/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "emerald", // good
      "night", // good
      "winter", // good
      "dim", // good
      "light",
      "dark",
      "sunset"
    ],
  },
  plugins: [daisyui],
};
