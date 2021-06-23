import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker.ts";
import { router } from "./router";
import { store } from "./store";
import { plugin } from "./plugin";
import { CV_API_MODE } from "./global";

if (CV_API_MODE === "mock") {
  console.log("Mock enabled!");
  import("./mock");
}

const app = createApp(App);
app.use(plugin);
app.use(router);
app.use(store);
app.mount("#app");

export default app;
