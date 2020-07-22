import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  Method,
} from "axios";
import { Message, MessageBox } from "element-ui";
import { getToken } from "@/utils/cookies";
import { UserModule } from "@/store/modules/user";
import { Encrypt, Decrypt, md5 } from "@/utils/encrypt.ts";
import i18n from "@/plug/i18n.ts";
import router from "@/router.ts";

// tslint:disable-next-line
let tokenFlag = false;
const lang = i18n.messages[i18n.locale].lang;
const service = axios.create({
  timeout: 6000,
});

// 不使用默认错误消息提示的接口
const whiteList: string[] = [];

// 不进行加密的接口
const noEncryptist: string[] = [];

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log(config);
    const { data, url } = config;
    console.log("request: ", data);
    if (!noEncryptist.includes(url)) {
      let _data = Encrypt(data);
      _data = { requestBody: _data };
      config.data = _data;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request error here
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("response: ", response);
    if (response.status >= 400) {
      const msgList: {
        [key: string]: string;
      } = {
        403: "noAccess", //没有权限访问
        401: "verificationFailed", //身份验证失败
        408: "timeout", //超时
        500: "serverError", //服务器出错
        501: "serverError",
        502: "serverError",
        503: "serverError",
        504: "serverError",
      };

      if (Object.keys(msgList).includes(String(response.status))) {
        const msgText = msgList[response.status];
        return Promise.reject({
          msg:
            response.data.msg ||
            response.data.message ||
            response.data.error ||
            lang.commonTips[msgText],
          code: response.status || lang.commonTips.undefined,
          success: false,
        });
      } else if (response.data) {
        return Promise.reject(response.data);
      } else {
        return Promise.reject({
          msg:
            response.data.msg ||
            response.data.message ||
            response.data.error ||
            lang.commonTips.unknownError,
          code: response.status || lang.commonTips.undefined,
          success: false,
        });
      }
    } else {
      if (response.data.success) {
        // return Promise.resolve(response.data.data);
        // console.log(JSON.parse(Decrypt(response.data.data)), 'res');
        console.log("res: ", JSON.parse(Decrypt(response.data.data)));
        return Promise.resolve(JSON.parse(Decrypt(response.data.data)));
        // console.log("__data:", JSON.parse(Decrypt(response.data.data)));
      }
      // console.log("__data:", response.data);
      return Promise.reject(response.data);
    }
  },
  (error: AxiosError) => {
    console.log(error);
    console.log(error.response);
    if (error.toString().includes("timeout")) {
      // 超时
      return Promise.reject({
        msg: lang.commonTips.timeout,
        code: lang.commonTips.undefined,
        success: false,
      });
    } else if (error.toString().includes("CORS")) {
      // 跨域
      return Promise.reject({
        msg: lang.commonTips.cors,
        code: lang.commonTips.undefined,
        success: false,
      });
    } else if (typeof error.response == "undefined") {
      // 网络错误或者跨域
      return Promise.reject({
        msg: lang.commonTips.networkError,
        code: lang.commonTips.undefined,
        success: false,
      });
    } else return Promise.reject(error.response.data);
  }
);

interface Ioptions {
  method: Method;
  url: string;
  data: object | undefined | null;
  params?: object | string | undefined | null;
  baseURL: string | undefined;
  headers: object | null;
}

function request(method: Method) {
  return async (url: string, data: object = {}, opt?: {}) => {
    let options: Ioptions = {
      method,
      url,
      data,
      baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        "content-type": "application/json",
        token: `${getToken() || ""}`,
        locale: `${i18n.locale.replace(/-/, "_")}`,
      },
    };
    options = opt ? { ...options, ...opt } : options;
    if (["GET", "DELETE"].includes(method)) {
      options.params = data;
      options.data = {};
    }
    return await service(options)
      .then((res: AxiosResponse) => {
        return [null, res];
      })
      .catch(err => {
        // console.log(err);
        const { errors } = err;
        const errorsKey = errors && Object.keys(errors)[0];
        if (errors && errorsKey) {
          err.msg = errors[errorsKey][0];
        }
        err.msg = err.msg
          ? err.msg
          : err.message
          ? err.message
          : lang.commonTips.networkError;
        // token失效
        if (err.code === "200001") {
          if (!tokenFlag) {
            tokenFlag = true;
            MessageBox({
              title: lang.commonTips.prompt,
              message: lang.commonTips.tokenLose,
              type: "warning",
              closeOnClickModal: false,
              confirmButtonText: lang.commonTips.reRegister,
            })
              .then(() => {
                UserModule.LogOut()
                  .then(() => {
                    router.go(0);
                  })
                  .catch(() => {
                    return [err, null];
                  });
              })
              .catch(() => {
                UserModule.LogOut()
                  .then(() => {
                    router.go(0);
                  })
                  .catch(() => {
                    return [err, null];
                  });
              });
          }
          return [err, null];
        }
        if (!whiteList.includes(options.url)) {
          // console.log(options);
          // console.log(err);
          Message({
            // message: err.msg,
            dangerouslyUseHTMLString: true,
            message: `<div class="errorMessage"><span class="msg">${
              err.msg
            }</span><br><span class="code">${
              lang.commonTips.errorCode
            }：${err.code ||
              lang.commonTips.unknown}</span><br><span class="url">${
              lang.commonTips.url
            }：${options.url || lang.commonTips.unknown}</span></div>`,
            type: "error",
            duration: 2.5 * 1000,
          });
        }
        // console.log(err);
        return [err, null];
      });
  };
}

export const GET = request("GET");
export const POST = request("POST");
export const PUT = request("PUT");
export const DELETE = request("DELETE");

export default service;
