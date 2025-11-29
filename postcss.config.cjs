// postcss.config.cjs
// 專為 CommonJS (CJS) 格式和 Vercel 環境設計的最終配置。

module.exports = {
  // 必須明確地使用 require() 函數載入插件，以避免 "Invalid PostCSS Plugin" 錯誤。
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}