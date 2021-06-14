// 引入moment组件
import moment from "moment";
import "moment/locale/zh-cn.js";
import { App } from "vue";
moment.locale("zh-cn");

export default (app: App) => {
  app.config.globalProperties.$moment = moment;
};
