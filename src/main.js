import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import element from "./plugins/element";
import moment from "./plugins/moment";
import axios from "axios";

if (typeof process === "undefined") {
  // 尝试vite配置
} else {
  if (process.env.VUE_APP_API_MODE === "mock") {
    console.log("Mock enabled!");
    require("./mock");
  }
}

const app = createApp(App);
app.use(element);
app.use(moment);
app.use(router);
app.use(store);
app.mount("#app");
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("user.token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default app;
