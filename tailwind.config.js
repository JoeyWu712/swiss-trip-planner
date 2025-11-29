// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 確保這裡包含所有 JS/JSX 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}