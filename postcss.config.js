/** @type {import('postcss-load-config').Config} */
export default {
  // PostCSS 外掛程式配置
  plugins: {
    // 啟用 Tailwind CSS 引擎，這是編譯 Tailwind 樣式所必需的
    tailwindcss: {},
    // 啟用 Autoprefixer，自動為 CSS 屬性添加瀏覽器前綴（例如 -webkit-, -moz- 等）
    autoprefixer: {},
  },
}