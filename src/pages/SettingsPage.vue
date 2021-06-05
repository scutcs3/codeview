<template>
  <div class="settings">
    <h2>设置页面</h2>
    <el-button type="warning" plain @click="clearLocalStorage"
      >清除localStorage</el-button
    >
  </div>
</template>
<script>
export default {
  name: "Settings",
  methods: {
    clearLocalStorage() {
      localStorage.clear();
      this.$message.success("清除成功！");
    },
  },
};
</script>
<style scoped>
.settings {
  margin-left: 30px;
}
</style>
