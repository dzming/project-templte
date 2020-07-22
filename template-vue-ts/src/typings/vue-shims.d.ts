import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router";

import API_TYPE from "@/api/index.ts";
// 扩充
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $http: typeof API_TYPE;
  }
}
