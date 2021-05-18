<template>
    <h2>设置页面</h2>
    <el-button @click="clearToken">清除Token</el-button>
</template>
<script>
export default {
    name: 'Settings',
    methods: {
        clearToken() {
            localStorage.removeItem('token');
        }
    }
}
</script>