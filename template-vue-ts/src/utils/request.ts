import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  Method,
} from "axios";
import { getToken } from "@/utils/auth";
import i18n from "@/plug/i18n.ts";

const service = axios.create({
  timeout: 5000,
});
const whiteList: string[] = [];

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    // Handle request error here
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status >= 400) {
      return Promise.reject(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },

  (error: AxiosError) => {
    return Promise.reject(error?.response?.data);
  },
);

interface Ioptions {
  method: Method;
  url: string;
  data: IObject | undefined | null;
  params?: IObject | string | undefined | null;
  baseURL: string | undefined;
  headers: IObject | null;
}

function request(method: Method) {
  return async (url: string, data: IObject = {}, opt?: IObject) => {
    let options: Ioptions = {
      method,
      url,
      data,
      baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        "content-type": "application/json",
        "access-token": `${getToken()}`,
        ["locale"]: `${i18n.locale.replace(/-/, "_")}`,
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
        const { errors } = err;
        const errorsKey = errors && Object.keys(errors)[0];
        if (errors && errorsKey) {
          err.msg = errors[errorsKey][0];
        }
        err.msg = err.msg
          ? err.msg
          : err.message
          ? err.message
          : "网络请求出错";
        if (!whiteList.includes(options.url)) {
          alert(err.msg);
        }
        return [err, null];
      });
  };
}

export const GET = request("GET");
export const POST = request("POST");
export const PUT = request("PUT");
export const DELETE = request("DELETE");

export default service;
