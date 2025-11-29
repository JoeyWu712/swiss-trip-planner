// postcss.config.js
// 為了在 Vercel/Vite 環境中達到最高的兼容性，我們使用 CommonJS (CJS) 模組格式。

module.exports = {
  // 將插件定義在陣列中
  plugins: [
    'tailwindcss', 
    'autoprefixer',
  ]
}