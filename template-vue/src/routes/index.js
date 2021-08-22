/*
 * @Author: ZStop
 * @Date: 2019-02-15 18:52:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-08 11:30:42
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const config = require('../../config/index.json');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  fallback: false,
  base: config.baseUrl,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "App" */ '@/App.vue'),
      redirect: '/',
      children: [
        {
          path: '',
          component: () =>
            import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
