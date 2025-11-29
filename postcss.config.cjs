// postcss.config.cjs
// 這是專門為了解決 Vercel/Vite 環境中 "type": "module" 衝突的最佳方案。
// .cjs 擴展名強制 Node.js 將此檔案視為 CommonJS 模組。

module.exports = {
  plugins: [
    'tailwindcss', 
    'autoprefixer',
  ]
}