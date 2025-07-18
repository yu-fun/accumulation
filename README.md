# accumulation

knowledge accumulation

vue2 使用 tailwindcss

```bash
# 安装 tailwindcss 低版本及相关插件
npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

# 创建 postcss.config.js, tailwind.config.js
npx tailwindcss init -p

# 最后在 main.js 中引入 tailwindcss
import "tailwindcss/tailwind.css"
```

```js
module.exports = {
  purge: [
    './src/App.vue',
    './src/views/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit', // 是否开启 jit 模式，开启以后编译会更快，当然，tailwindcss 版本需要在 2.1 以上
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```
