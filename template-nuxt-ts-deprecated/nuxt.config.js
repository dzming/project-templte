const TerserPlugin = require("terser-webpack-plugin");
// const zh = require("~/lang/zh-CN");
// import { ENGLISH } from "~/utils/regexp";
const DEFAULT_LOCALE = "en-US";
const BROWSER_LANG = process.isBrowser
  ? window.navigator.language
  : DEFAULT_LOCALE;

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
  vendor: ["@babel/polyfill", "event-source-polyfill"],
  css: [
    // {
    //   src: "~/styles/index.scss",
    //   lang: "scss"
    // }
  ],
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
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "nuxt-i18n"
    // ['nuxt-i18n', {
    //     strategy: "prefix",
    //     defaultLocale: "en-US",
    //     locales: [
    //       {
    //         code: "zh-CN",
    //         file: "zh-CN.ts",
    //         iso: "zh-CN"
    //       },
    //       {
    //         code: "en-US",
    //         file: "en-US.ts",
    //         iso: "en-US"
    //       },
    //     ],
    //     lazy: true,
    //     langDir: "lang/",
    //     detectBrowserLanguage: {
    //       useCookie: false
    //       // cookieKey: 'locale'
    //     },
    //     vuex: {
    //       // Module namespace
    //       moduleName: "i18n",
    //       // If enabled, current app's locale is synced with nuxt-i18n store module
    //       syncLocale: true,
    //       // If enabled, current translation messages are synced with nuxt-i18n store module
    //       syncMessages: true,
    //       // Mutation to commit to set route parameters translations
    //       syncRouteParams: true
    //     }
    //   },
    // ],
  ],
  styleResources: {
    scss: ["~/styles/settings/index.scss"] // alternative: scss
  },
  i18n: {
    // strategy: " ",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        file: "en-US.ts",
        iso: "en-US"
      },
      {
        code: "cn",
        file: "zh-CN.ts",
        iso: "zh-CN"
      },
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
   ** env
   */
  env: {
    // 应用环境  只有两个 development production
    NODE_ENV: process.env.NODE_ENV,
    // 应用阶段 prod 线上；release 测试阶段；pre 预生产阶段；dev 开发阶段or线上开发环境；
    VUE_APP_STAGE: process.env.VUE_APP_STAGE
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // publicPath: getPublicPath(),
    cache: true,
    parallel: true,
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
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   });
      // }
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      // const cssLoader = config.module.rules.find(rule => {
      //   return rule.test.toString() === "/\\.css$/i";
      // });
      // cssLoader.oneOf[0].use[3].options.localIdentName =
      //   "[local]_[hash:base64:6]";
    },
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    }
  }
};

function getPublicPath() {
  let publicPath = "/_nuxt/";
  if (process.env.VUE_APP_STAGE === "prod") {
    publicPath = `https://wwwstatic.cailuw.com${publicPath}`;
  }
  return publicPath;
}
