<template>
    <el-container>
        <el-header>在线编程笔试平台</el-header>
        <div class="loginDoor">
            <el-header>登录</el-header>
            <el-form :model="loginParam" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginParam.username" placeholder="邮箱 如123456@qq.com" prefix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginParam.password" prefix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <div class="login-button">
                    <el-button type="primary" style="background: rgb(31, 128, 173);">登录</el-button>
                </div>
                <el-link type="primary" style="float: left">注册 ></el-link>
                <el-link type="primary" style="float: right">找回密码</el-link>
            </el-form>
        </div>
    </el-container>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            loginParam: {},
            rules: {
                username: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                           { type: "email", message: '请输入正确电子邮件地址', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur'}],

            },
        };
    },

};
</script>

<style scoped>


.el-container{
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100%;
    text-align: center;
    color: #221014;
    line-height: 50px;
    font-size: 20px;
    background-color: #080606;
}

.el-header{
    font-weight: bold;
    background:#E9EEF3;
}

.loginDoor {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: 100px 500px 100px -150px;
    border-radius: 5px;
    background: #f7f7f7;
    overflow: hidden;
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