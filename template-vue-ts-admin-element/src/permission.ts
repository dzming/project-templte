import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message, MessageBox, Notification } from "element-ui";
import { getToken, removeToken } from "@/utils/cookies";
import { Route } from "vue-router";
import { UserModule } from "@/store/modules/user";
import i18n from "@/plug/i18n.ts";

const lang = i18n.messages[i18n.locale].lang;
const whiteList: string[] = [
  //根据实际情况配置白名单
  "/user/login",
  "/user/register",
  "/user/forget-password",
  "/404",
];

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start();
  const { token } = UserModule;
  // 已登录
  if (token) {
    // NProgress.done();
    // next();
    // return;
    // test
    UserModule.GetUserInfo()
      .then(() => {
        // 检查用户登录状态是否失效
        const { accountState, token } = UserModule;
        if (!token) {
          // 失效
          MessageBox({
            title: lang.commonTips.prompt,
            message: lang.commonTips.tokenLose,
            type: "warning",
            closeOnClickModal: false,
            confirmButtonText: lang.commonTips.reLogin,
          })
            // 清除token后刷新页面走未登录逻辑
            .then(() => {
              UserModule.LogOut().then(() => {
                router.go(0);
              });
            })
            .catch(() => {
              UserModule.LogOut().then(() => {
                router.go(0);
              });
            });
          return;
        }
        if (whiteList.includes(to.path)) {
          // 有效
          // 路由白名单
          NProgress.done();
          next();
          return;
        }
        // 账号状态【0：正常、1：禁用】
        if (Number(accountState) > 0) {
          next({ path: "/" });
          NProgress.done();
          return;
        }
        NProgress.done();
        next();
      })
      .catch(() => {
        // 获取信息失败退出账户重新登录
        UserModule.LogOut().then(() => {
          next({ path: "/user/login" });
          NProgress.done();
        });
      });
  } else {
    console.log(to.path);
    // 未登录
    if (whiteList.includes(to.path)) {
      if (from.query.redirect) {
        to.query.redirect = from.query.redirect;
      }
      next();
      NProgress.done();
      return;
    } else {
      next(`/user/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
