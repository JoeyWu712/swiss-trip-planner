/** @type {import('tailwindcss').Config} */
export default {
  // 確保掃描所有的 React 檔案以獲取 Tailwind 類別
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定義顏色，讓整體介面更活潑
      colors: {
        'primary-purple': '#6366f1', // 基礎紫色 (e.g., Indigo 500)
        'accent-pink': '#ec4899',   // 強調粉色 (e.g., Pink 500)
        'secondary-gray': '#f4f4f5', // 次要灰色 (背景色)
      },
      fontFamily: {
        // 使用 Inter 字體 (Tailwind 預設)
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}