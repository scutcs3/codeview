<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="login-body">
      <h2 class="text-center">登录</h2>
      <div class="loginDoor">
        <el-form
          :model="loginParam"
          :rules="rules"
          ref="loginForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginParam.username"
              placeholder="邮箱 如123456@qq.com"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginParam.password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <div class="login-button">
            <el-button
              type="primary"
              style="background: rgb(31, 128, 173)"
              @click="onSubmit()"
              >登录</el-button
            >
          </div>
          <el-link
            type="primary"
            style="float: left"
            href="javascript:void(0);"
            @click="toRegister()"
            >注册 ></el-link
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../routes.js";
import { ElMessage } from "element-plus";

export default {
  name: "Login",
  data: function () {
    return {
      loginParam: {},
      rules: {
        username: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确电子邮件地址", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "请输入6-20位字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toRegister() {
      router.push("/register");
    },
    onSubmit() {
      var url =
        "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0/tokens";
      var data = {
        username: this.loginParam.username,
        password: this.loginParam.password,
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          console.log("Success:", response);
          localStorage.setItem("token", response["token"]);
          ElMessage.success({
            message: "登陆成功",
            type: "success",
          });
          if (this.$route.query && this.$route.query.redirect) {
              router.push(this.$route.query.redirect);
          } else {
              router.push('/console');
          }
        });
    },
  },
};
</script>

<style scoped>
.login-body {
  margin-top: 60px;
  margin-bottom: 120px;
}
.loginDoor {
  width: 350px;
  border-radius: 5px;
  background: #f7f7f7;
}
.ms-content {
  padding: 30px 30px;
}
.login-button {
  text-align: center;
}
.login-button button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
