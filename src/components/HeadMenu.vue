<template>
  <div class="menu">
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="menu in menus" :key="menu.index" :index="menu.index" :class="{'hidden-xs-only' : menu.hide}">
        {{ menu.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import 'element-plus/lib/theme-chalk/display.css';
export default {
  name: "HeadMenu",
  data() {
    return {
      all_menus: [],
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    menus() {
      if (this.isLogin) {
        return [
          {
            index: "console/profile",
            title: localStorage.getItem("user.email"),
            hide: true,
          },
          {
            index: "console",
            title: "控制台",
            hide: false,
          },
          {
            index: "logout",
            title: "退出登录",
            hide: true,
          },
        ];
      } else {
        return [
          {
            index: "login",
            title: "登录",
          },
          {
            index: "register",
            title: "注册",
          },
        ];
      }
    },
  },
  methods: {
    handleSelect(index) {
      if (index === "logout") return this.handleLogout();
      this.$router.push("/" + index);
    },
    handleLogout() {
      this.$store.commit("logout");
      this.$router.push("/");
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
