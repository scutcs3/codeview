<template>
  <div class="d-flex justify-content-center">
    <div class="registerdoor">
      <h2 class="text-center">注册</h2>
      <el-form
        :model="registerParam"
        ref="registerForm"
        :rules="rules"
        label-width="0px"
        class="content"
        v-loading="loading"
      >
        <el-form-item prop="email">
          <el-input
            v-model="registerParam.email"
            placeholder="邮箱"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="registerParam.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="r_password">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="registerParam.r_password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <div class="register-btn">
          <el-button type="primary" @click="submitRegisterForm()"
            >注册</el-button
          >
        </div>
        <el-link
          href="javascript:void(0)"
          type="primary"
          @click="toLogin()"
          style="text-align: center"
          >去登陆 ></el-link
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import { register } from "../api/user";
export default {
  name: "Register",
  data() {
    return {
      loading: false,
      registerParam: {
        email: "",
        password: "",
        r_password: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 32, message: "请输入6-32位字符", trigger: "blur" },
        ],
        r_password: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: this.validatePass, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确电子邮件地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerParam.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    toLogin() {
      this.$router.push("/login");
    },
    submitRegisterForm() {
      let bOk = true;
      this.validatePass(null, this.registerParam.r_password, (err) => {
        if (err) bOk = false;
      });
      if (!bOk) return;
      var errorHandle = (msg) => {
        this.$message.error(msg);
        this.loading = false;
      };
      this.loading = true;
      register({
        email: this.registerParam.email,
        password: this.registerParam.password,
      }).handle({
        200: (data) => {
          this.$message.success("注册成功，已自动登录");
          this.$store.commit({
            type: "login",
            token: data.token,
            id: data.id,
            email: this.registerParam.email,
          });
          this.loading = false;
          if (this.$route.query && this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/console");
          }
        },
        404: () => errorHandle("注册失败"),
        409: () => errorHandle("该用户已存在"),
      });
    },
  },
};
</script>
<style scoped>
.registerdoor {
  width: 350px;
  margin-top: 60px;
  margin-bottom: 80px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.897);
  overflow: hidden;
}
.content {
  padding: 30px 30px;
}
.register-btn {
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
