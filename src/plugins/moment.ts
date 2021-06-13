// 引入moment组件
import moment from "moment";
import "moment/locale/zh-cn.js";
moment.locale("zh-cn");

export default (app) => {
  app.config.globalProperties.$moment = moment;
};
