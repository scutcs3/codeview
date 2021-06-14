import { CV_API } from "@/global";
import { App } from "@vue/runtime-core";
import axios from "axios";

axios.defaults.baseURL = CV_API;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("user.token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default (app: App) => {
  app.config.globalProperties.$axios = axios;
};
