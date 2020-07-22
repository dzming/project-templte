import Vue from "vue";
import { Decrypt, Encrypt, md5 } from "@/utils/encrypt.ts";
import dayjs from "dayjs";
import { getToken, removeToken } from "@/utils/auth";
import util from "util";
import { env as configEnv } from "~/config";

// import i18n from "@/plug/i18n.ts";

const baseUrl: any = process.env.VUE_APP_BASE_URL;

import { Context } from '@nuxt/types';


interface IRes {
  status: number;
  config: {
    baseURL: string;
    url: string;
  };
  data: {
    success: boolean;
    data: object;
  }
}
interface Ioptions {
  method: string;
  url: string;
  data: object | undefined | null;
  params?: object | string | undefined | null;
  baseURL: string | undefined;
  headers: object | null;
}

export default ({ $axios, redirect, store, app, env, error }: Context) => {
  const whiteList: string[] = [];
  // 加密的接口
  const encryptist: string[] = ["/api/appInfo/latest"];
  // 设置token
  if (getToken()) {
    $axios.setToken("token", "Bearer");
  }

  // Request interceptors
  $axios.onRequest((config: any) => {
    config.timeout = 15000;
    config.baseURL = configEnv.VUE_APP_BASE_URL;
    config.headers["accept-language"] = `${store.state.i18n.locale}`;
    const { data, url } = config;
      console.log("请求参数 ：", data, config.baseURL);
      if (encryptist.includes(url)) {
        let _data = Encrypt(data);
        _data = { requestBody: _data };
        config.data = _data;
      }
  })
  // Response interceptors
  $axios.onResponse(
    (response: any) => {
      if (response.status >= 400) {
        return Promise.reject(response.data);
      } else {
          const { baseURL, url } = response.config;
          const API_URL = url.substring(baseURL.length);
          if (encryptist.includes(API_URL)) {
            console.log("res: ", JSON.parse(Decrypt(response.data.data)));
            return Promise.resolve(JSON.parse(Decrypt(response.data.data)));
          } else {
            // console.log("res: ", JSON.parse(response.data.data));
            return Promise.resolve(response.data.data);
          }
        // console.log("res: ", JSON.parse(response));
        return Promise.reject(response.data);
      }
    });
  $axios.onError((err: any) => {
    if (err.code === "ECONNABORTED") {
      Vue.prototype.$notify.error({
        title: "错误",
        message: "请求超时，请重新尝试"
      });
      return;
    }
    // 获取错误详情
    const errorResponse = err.response;
    const statusCode = parseInt(errorResponse && errorResponse.status);
    const errorData = (errorResponse && errorResponse.data) || {};
    const errorMessage = (errorData && errorData.message) || "";
    const responseCode = errorData.code;
    if (process.server && err.config) {
      // 打印日志
      const { headers, method, url, params, data } = err.config;
      if (headers) {
        console.log(
          `${dayjs().format("YYYY MM DD HH:mm:ss")}, user-agent: ${
            headers["user-agent"]
          }, method: ${method}, url: ${url}, params: ${util.inspect(
            params
          )}, data: ${util.inspect(data)}, status: ${statusCode}`
        );
      }
      // 跳转错误页
      if (statusCode === 404) {
        error({ statusCode });
      } else if (statusCode === 500) {
        error({ statusCode });
      }
    }
    // 提示错误
    if (errorMessage) {
      Vue.prototype.$notify.error({
        title: "错误",
        message: errorMessage
      });
    }
    if (statusCode === 401) {
      removeToken();
      // redirect("/user/login");
    }
  });
}