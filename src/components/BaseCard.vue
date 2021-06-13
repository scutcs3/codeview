<template>
  <el-card :body-style="{ padding: '0' }">
    <template #header>
      <div class="card-header">
        <h3 style="display: inline">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>