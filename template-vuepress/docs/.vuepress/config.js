const { fs, path } = require("@vuepress/shared-utils");
module.exports = {
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  base: "/",
  dest: "./dist",

  themeConfig: {
    logo: "/logo.png", // nav右边logo
    lastUpdated: "Last Updated",
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        algolia: {},
        lastUpdated: "Last Updated",
        nav: require("./nav/en"),
        sidebar: {
          "/guide/": getGuideSidebar("WEB JSSDK", "layout"),
        },
      },
      "/zh/": {
        // 多语言下拉菜单的标题
        selectText: "选择语言",
        // 该语言在下拉菜单中的标签
        label: "简体中文",
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        lastUpdated: "上次更新",
        nav: require("./nav/zh"),
        sidebar: {
          "/zh/guide/": getGuideSidebar("WEB JSSDK", "布局"),
        },
      },
    },
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性
      title: "Fincy open platform",
      description: "Fincy official document",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Fincy开放平台",
      description: "Fincy官方文档",
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

function getGuideSidebar(GuideA, GuideB) {
  return [
    {
      title: GuideA,
      collapsable: false,
      children: ["", "getting-started"],
    },
    {
      title: GuideB,
      collapsable: false,
      children: ["getting-started_1"],
    },
  ];
}
