<template>
  <h2>修改密码</h2>
  <el-form>
    <el-form-item label="旧密码">
      <el-input
        v-model="oldpwd"
        placeholder="旧密码"
        autocomplete="off"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input
        v-model="pwd"
        type="password"
        placeholder="新密码"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="重复新密码" autocomplete="off">
      <el-input
        v-model="pwd2"
        type="password"
        placeholder="重复新密码"
      ></el-input>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="onSubmit()">修改密码</el-button>
</template>
<script>
import { changePassword } from "../api/user";
export default {
  name: "SecurityPage",
  data() {
    return {
      oldpwd: "",
      pwd: "",
      pwd2: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.pwd !== this.pwd2) {
        this.$message.warning("两次输入的密码不一致");
        return;
      }
      changePassword({
        old_password: this.oldpwd,
        new_password: this.pwd,
      }).handle({
        200: () => {
          this.$message.success("修改密码成功");
          this.$router.push({
            name: "profile",
          });
        },
        404: () => this.$message.error("修改密码失败"),
      });
    },
  },
};
</script>
