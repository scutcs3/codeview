import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "./main.css";
import installElementPlus from "./plugins/element";

if (process.env.VUE_APP_API_MODE === "mock") {
  console.log("Mock enabled!");
  require("./mock");
}

const app = createApp(App);
installElementPlus(app);

app.use(router);
app.use(store);
app.mount("#app");

export default app;
