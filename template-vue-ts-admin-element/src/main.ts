// import Vue, { DirectiveOptions } from 'vue'
import Vue from "vue";

import "normalize.css";
import ElementUI from "element-ui";
import elementEn from "element-ui/lib/locale/lang/en";
import SvgIcon from "vue-svgicon";

import i18n from "@/plug/i18n.ts";
import api from "@/api";
import "@/styles/element-variables.scss";
import "@/styles/index.scss";
import "@/plug/cookies.ts";
import "@/plug/clipboard.ts";
import "@/icons/components";
import "@/permission";

import App from "@/App.vue";
import store from "@/store";
import router from "@/router";

// import * as directives from '@/directives'
import * as filters from "@/filters";

const locale = i18n.locale === "en-US" ? { locale: elementEn } : {};

Vue.use(ElementUI, locale);
Vue.use(SvgIcon as any, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em",
});

Vue.prototype.$http = api;
Vue.config.productionTip = false;

// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");
