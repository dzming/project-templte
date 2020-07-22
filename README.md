- Template

  - template-vue
  - template-vue-ts
  - template-vue-ts-admin-element
  - template-nuxt-ts
  - template-nuxt-ts-deprecated

- Logs
  - vue/cli3 -> vue/cli4 [Releases link](https://github.com/vuejs/vue-cli/releases?after=v4.0.0-rc.4)
    - 升级依赖(vue、vue-loader、cli4、typescript、typescript-loader)
    - 移除 openImgMini plug 在 packground.json 中的依赖
    - vue.config.js 添加配置 alias 项
    - 统一使用最新的 flexible.js/ts
    - 统一使用最新的 encrypt.js/ts
    - 统一格式化，添加 prettier 到项目中
    - api 文件加入 ts 类型推导
    - 正式环境移除 log
    - 升级 eslint7、babel
    - 支持 Optional Chaining(a.c) & Nullish Coalescing(0??100)
    - 升级流程
      ```
        RUN ->
          vue upgrade
          yarn upgrade --latest
          yarn upgrade-interactive
          yarn add happypack --dev
        TEST ->
          yarn serve 和 yarn build
      ```
