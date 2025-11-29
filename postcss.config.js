// postcss.config.js
/** @type {import('postcss-load-config').Config} */
export default {
  // 將插件定義在陣列中，這是與最新 PostCSS/Vite 兼容的寫法
  plugins: [
    'tailwindcss', 
    'autoprefixer',
  ]
}
