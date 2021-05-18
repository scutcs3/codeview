<template>
  <div class="settings">
    <h2>设置页面</h2>
    <el-button @click="clearToken" type="danger" plain>清除Token</el-button>
  </div>
</template>
<script>
export default {
  name: "Settings",
  methods: {
    clearToken() {
      localStorage.removeItem("token");
    },
  },
};
</script>
<style scoped>
.settings {
    margin-left: 30px;
}
</style>