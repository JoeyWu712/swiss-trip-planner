// postcss.config.cjs
// 專為 CommonJS (CJS) 格式和 Vercel 環境設計的最終配置。
// 由於 Tailwind 版本更新，我們現在必須使用 @tailwindcss/postcss。

module.exports = {
  plugins: [
    // 修正：使用新的 Tailwind PostCSS 插件套件
    require('@tailwindcss/postcss'),
    // 保持 Autoprefixer 不變
    require('autoprefixer'),
  ]
}