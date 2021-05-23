<template>
  <div class="settings">
    <h2>设置页面</h2>
    <router-link to="/viewer"> 前往面试官页面 </router-link>

    <router-link to="/viewee"> 前往面试者页面 </router-link>
  </div>
</template>
<script>
export default {
  name: "Settings",
};
</script>
<style scoped>
.settings {
  margin-left: 30px;
}
</style>