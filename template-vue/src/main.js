/* eslint-disable */
import Vue from "vue";
import App from "@/App.vue";
import router from "@/routes";
import store from "@/store";
import i18n from "@/plugin/i18n";
import * as api from "@/api/index.js";
import "@/utils/flexible.js";
import "@/plugin/ie-babel";
import "@/styles/index.scss";
// import '@/plugin/vant';
// import '@/plugin/element';
// import '@/plugin/cookies';
// import '@/plugin/swiper';
// import '@/plugin/directive';
// import '@/plugin/lazyload';
// import scrollReveal from '@/plugin/scroll-reveal'; // 滑动动画
// import deviceType from '@/observable/deviceType.js'; // 设备检测
// Vue.prototype.$deviceType = deviceType;

// 移动手机调试使用，需要可以放开注释
import VConsole from "vconsole";
if (process.env.VUE_APP_ENV !== "production") {
  const vcon = new VConsole();
  Vue.use(vcon);
}
Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
  // mounted() {
  //   document.dispatchEvent(new Event('render-event')) // 预渲染,需要可以放开注释
  // }
}).$mount("#app");
