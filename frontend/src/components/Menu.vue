<template>
  <div class="menu">
    <el-menu mode="horizontal">
      <el-menu-item>
        <router-link to="/login" class="link">登录</router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link to="/register" class="link">注册</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
};
</script>
<style scoped>
.menu {
    margin-left: auto;
}
el-menu-item {
    margin: 0px 20px;
}
</style>