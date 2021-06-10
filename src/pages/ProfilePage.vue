<template>
  <h2>个人中心</h2>
  <p>用户ID：{{ id }}</p>
  <p>用户邮箱：{{ email }}</p>
  <el-button type="danger" plain @click="changePassword">修改密码</el-button>
</template>
<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      id: localStorage.getItem("user.id"),
      email: localStorage.getItem("user.email"),
    };
  },
  methods: {
    changePassword() {
      this.$router.push({
        name: "security",
      });
    },
  },
};
</script>
