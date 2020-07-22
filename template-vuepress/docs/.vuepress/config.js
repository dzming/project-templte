module.exports = {
  title: "web开发",
  description: "The description of the site.",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  base: "/",
  dest: "./dist",

  themeConfig: {
    logo: "/logo.png", // nav右边logo
    // nav: [
    //   { text: "首页", link: "/" },
    //   { text: "单页", link: "/projects/" },
    //   { text: "分栏", link: "/guide/" },
    //   { text: "Markdown Demo", link: "/article/" },
    //   { text: "客户端", link: "/apppage/" },
    // ],
    // sidebar: {
    //   // 侧边栏在 /guide/ 上
    //   "/guide/": [
    //     {
    //       title: "如何学习前端",
    //       collapsable: false,
    //       children: ["", "getting-started", "customize", "advanced"],
    //     },
    //     {
    //       title: "如何学习后端",
    //       collapsable: false,
    //       children: ["getting-started_1", "customize_1", "advanced_1"],
    //     },
    //   ],
    //   // 侧边栏在 /app/ 上
    //   "/apppage/": [
    //     {
    //       title: "android",
    //       collapsable: false,
    //       children: ["", "web"],
    //     },
    //     {
    //       title: "ios",
    //       collapsable: false,
    //       children: ["ios"],
    //     },
    //   ],
    // },
    lastUpdated: "Last Updated",
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
        algolia: {},
        nav: [
          { text: "home", link: "/" },
          { text: "subfield", link: "/guide/" },
          { text: "fincy", link: "https://www.fincy.com" },
        ],
        sidebar: {
          "/guide/": [
            {
              title: "How to learn the front end",
              collapsable: false,
              children: ["", "getting-started", "customize", "advanced"],
            },
            {
              title: "How to learn the back end",
              collapsable: false,
              children: ["getting-started_1", "customize_1", "advanced_1"],
            },
          ],
        },
      },
      "/zh/": {
        // 多语言下拉菜单的标题
        selectText: "选择语言",
        // 该语言在下拉菜单中的标签
        label: "简体中文",
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
          },
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: "首页", link: "/zh/" },
          { text: "分栏", link: "/zh/guide/" },
        ],
        sidebar: {
          "/zh/guide/": [
            {
              title: "如何学习前端",
              collapsable: false,
              children: ["", "getting-started", "customize", "advanced"],
            },
            {
              title: "如何学习后端",
              collapsable: false,
              children: ["getting-started_1", "customize_1", "advanced_1"],
            },
          ],
        },
      },
    },
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性
      title: "FINCY SDK 开发文档",
      description: "Vue-powered Static Site Generator",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "FINCY 开发文档",
      description: "Vue 驱动的静态网站生成器",
    },
  },

  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    config: (md) => {
      md.use(require("markdown-it-katex"));
    },
  },
};
