import { App } from "@vue/runtime-core";
import element from "./element";
import moment from "./moment";
import axios from "./axios";

export function plugin(app: App) {
  app.use(element);
  app.use(moment);
  app.use(axios);
}
