<template>
  <h2>修改密码</h2>
  <el-form :model="param">
    <el-form-item label="旧密码" prop="oldpwd">
      <el-input v-model="param.oldpwd" placeholder="旧密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pwd">
      <el-input type="password" placeholder="新密码"></el-input>
    </el-form-item>
    <el-form-item label="重复新密码" prop="pwd2">
      <el-input type="password" placeholder="重复新密码"></el-input>
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
      param: {
        oldpwd: "",
        pwd: "",
        pwd2: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.param.pwd !== this.param.pwd2) {
        this.$message.warning("两次输入的密码不一致");
        return;
      }
      changePassword({
        old_password: this.param.oldpwd,
        new_password: this.param.pwd,
      }).handle({
        200: () => {
          this.$message.success("修改密码成功");
          this.$router.push({
            name: "profile",
          });
        },
        404: () => this.$message.error("登录失败"),
      });
    },
  },
};
</script>
