import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

const initializeAxios = (axiosInstance: NuxtAxiosInstance) => {
  $axios = axiosInstance;
}

export { $axios, initializeAxios };
