import Vue from "vue";
import "normalize.css";
import "@/styles/index.scss";
import "@/plug/cookies.ts";

import App from "./App.vue";
import router from "@/routes";
import store from "@/store";
import i18n from "@/plug/i18n.ts";
import api from "@/api";

Vue.prototype.$http = api;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");
