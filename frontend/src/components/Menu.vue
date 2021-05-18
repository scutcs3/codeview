<template>
  <div class="menu">
    <el-menu mode="horizontal">
      <el-menu-item v-if="!isLogin">
        <router-link to="/login" class="link">登录</router-link>
      </el-menu-item>
      <el-menu-item v-if="!isLogin">
        <router-link to="/register" class="link">注册</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin">
        <router-link to="/console" class="link">控制台</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin">
        <el-link href="javascript:void(0)" @click="handleLogout()"
          >退出登录</el-link
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    handleLogout() {
      this.$store.commit('logout');
      location.reload();
    },
  },
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