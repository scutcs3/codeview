<template>
  <div class="menu">
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="menu in menus" :key="menu.index" :index="menu.index">
        {{ menu.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "HeadMenu",
  data() {
    return {
      all_menus: [
        {
          index: "login",
          title: "登录",
          login: false,
        },
        {
          index: "register",
          title: "注册",
          login: false,
        },
        {
          index: "console",
          title: "控制台",
          login: true,
        },
        {
          index: "logout",
          title: "退出登录",
          login: true,
        },
      ],
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    menus() {
      return this.all_menus.filter((menu) => menu.login == this.isLogin);
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
