<template>
  <el-card :body-style="{ padding: '0' }">
    <template #header>
      <h3 style="display: inline">{{ title }}</h3>
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
      default: "默认标题",
    },
  },
};
</script>
<style scoped>
.el-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
::v-deep(.el-card__header) {
  height: 65px !important;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep(.el-card__body) {
  flex: 1 1 0;
  overflow: auto;
}
</style>
