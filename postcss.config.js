// postcss.config.js
export default {
  plugins: {
    // 修正: 使用 Vercel 要求的 @tailwindcss/postcss 獨立插件
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}