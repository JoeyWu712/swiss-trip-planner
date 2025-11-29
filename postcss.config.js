// postcss.config.js
export default {
  plugins: {
    'tailwindcss/nesting': {}, // 專門用於處理 Tailwind CSS 的嵌套語法
    tailwindcss: {},
    autoprefixer: {},
  },
}