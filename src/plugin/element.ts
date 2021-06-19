// 按需引入element组件
import {
  ElContainer,
  ElHeader,
  ElFooter,
  ElAside,
  ElMain,
  ElSelect,
  ElOption,
  ElButton,
  ElForm,
  ElInput,
  ElLink,
  ElPopover,
  ElFormItem,
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElLoading,
  ElDialog,
  ElDatePicker,
  ElTimePicker,
  ElPagination,
  ElImage,
  ElCard,
  ElSwitch,
  ElTabs,
  ElTabPane,
  ElTimeline,
  ElTimelineItem,
  ElDivider,
  ElAutocomplete,
  ElCollapse,
  ElRadioGroup,
  ElRadio,
  ElMessage,
  ElNotification,
} from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale";
import { App } from "@vue/runtime-dom";

export default (app: App) => {
  locale.use(lang);
  app.use(ElContainer);
  app.use(ElHeader);
  app.use(ElFooter);
  app.use(ElAside);
  app.use(ElMain);
  app.use(ElSelect);
  app.use(ElTabs);
  app.use(ElOption);
  app.use(ElButton);
  app.use(ElForm);
  app.use(ElInput);
  app.use(ElTabPane);
  app.use(ElLink);
  app.use(ElFormItem);
  app.use(ElPopover);
  app.use(ElRow);
  app.use(ElCol);
  app.use(ElMenu);
  app.use(ElMenuItem);
  app.use(ElTable);
  app.use(ElTableColumn);
  app.use(ElLoading);
  app.use(ElDialog);
  app.use(ElDatePicker);
  app.use(ElTimePicker);
  app.use(ElPagination);
  app.use(ElImage);
  app.use(ElCard);
  app.use(ElSwitch);
  app.use(ElTimeline);
  app.use(ElTimelineItem);
  app.use(ElDivider);
  app.use(ElAutocomplete);
  app.use(ElCollapse);
  app.use(ElRadio);
  app.use(ElRadioGroup);
  app.use(ElNotification);
  app.config.globalProperties.$message = ElMessage;
};
