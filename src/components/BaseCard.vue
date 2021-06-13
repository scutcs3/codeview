<template>
  <el-card :body-style="{ padding: '0' }">
    <template #header>
      <div class="card-header">
        <h3>{{ title }}</h3>
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
