import axios from 'axios';
import { getToken } from '@/utils/auth';
import i18n from '@/plugin/i18n.js';

const service = axios.create({
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Handle request error here
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  response => {
    if (response.status >= 400) {
      return Promise.reject(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  },

  error => {
    let errdata;
    try {
      errdata = error.response.data || {};
    } catch {
      errdata = {};
    }
    return Promise.reject(errdata);
  },
);

function request(method) {
  return async (url, data = {}, opt) => {
    let options = {
      method,
      url,
      data,
      baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        'content-type': 'application/json',
        'access-token': `${getToken()}`,
        locale: `${i18n.locale.replace(/-/, '_')}`,
      },
    };
    options = opt
      ? {
          ...options,
          ...opt,
        }
      : options;
    if (['GET', 'DELETE'].includes(method)) {
      options.params = data;
      options.data = {};
    }
    return await service(options)
      .then(res => {
        return [null, res];
      })
      .catch(err => {
        const { errors } = err;
        const errorsKey = errors && Object.keys(errors)[0];
        if (errors && errorsKey) {
          err.msg = errors[errorsKey][0];
        }
        const defaultMsg = 'Network Error';
        err.msg = err.msg ? err.msg : err.message ? err.message : defaultMsg;

        return [err, null];
      });
  };
}

export const GET = request('GET');
export const POST = request('POST');
export const PUT = request('PUT');
export const DELETE = request('DELETE');

export default service;
