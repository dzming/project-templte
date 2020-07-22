const TerserPlugin = require("terser-webpack-plugin");

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    {
      src: "~/styles/settings/index.scss",
      lang: "scss"
    }
  ],
  vendor: ["@babel/polyfill", "event-source-polyfill"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "~/plugins/axios-accessor",
    "~/plugins/element-ui",
    "~/plugins/i18n"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources", "nuxt-i18n"],
  styleResources: {
    scss: ["~/styles/settings/index.scss"] // alternative: scss
    // scss: ["~/assets/styles/settings/variables.scss"] // alternative: scss
  },
  i18n: {
    // strategy: " ",
    // strategy: "prefix",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        file: "en-US.ts",
        iso: "en-US"
      },
      {
        code: "zh",
        file: "zh-CN.ts",
        iso: "zh-CN"
      }
    ],
    lazy: true,
    langDir: "lang/",
    detectBrowserLanguage: {
      useCookie: true
      // cookieKey: 'locale'
    },
    vuex: {
      // Module namespace
      moduleName: "i18n",
      // If enabled, current app's locale is synced with nuxt-i18n store module
      syncLocale: true,
      // If enabled, current translation messages are synced with nuxt-i18n store module
      syncMessages: true,
      // Mutation to commit to set route parameters translations
      syncRouteParams: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    cache: true,
    parallel: true,
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isDev && ctx.isClient) {
        config.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: true
              }
            }
          })
        ];
      }
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    }
  },
  env: {
    // 应用环境  只有两个 development production
    NODE_ENV: process.env.NODE_ENV,
    // 应用阶段 prod 线上；release 测试阶段；pre 预生产阶段；dev 开发阶段or线上开发环境；
    VUE_APP_STAGE: process.env.VUE_APP_STAGE
  }
};
