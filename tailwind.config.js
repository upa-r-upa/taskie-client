/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  daisyui: {
    themes: ["winter"],
  },
  plugins: [daisyui],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
};
