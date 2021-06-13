import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker.ts";
import router from "./router";
import store from "./store";
import element from "./plugins/element";
import moment from "./plugins/moment";
import axios from "axios";
import { CV_API_MODE } from "./global";

if (CV_API_MODE === "mock") {
  console.log("Mock enabled!");
  import("./mock");
}

const app = createApp(App);
app.use(element);
app.use(moment);
app.use(router);
app.use(store);
app.mount("#app");
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("user.token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default app;
