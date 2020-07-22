declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module "v-charts/lib/ring.common";
declare module "v-charts/lib/line.common";

declare module "*.svg" {
  import Vue from "vue";
  export default Vue;
}

declare module "v-charts/lib/line.common";

declare module 'vue-clipboard2';
declare module '@chenfengyuan/vue-qrcode' {
}
declare module 'element-ui/lib/locale/lang/en' {
}
declare module 'file-saver';

// import VueRouter, { Route } from "vue-router";

// declare module "vue/types/vue" {
//   interface Vue {
//     $router: VueRouter; // 这表示this下有这个东西
//     $route: Route;
//     $https: any; // 不知道类型就定为 any 吧（偷懒）
//     $urls: any;
//     $Message: any;
//   }
// }
