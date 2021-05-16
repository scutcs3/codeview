<template>
    <div>
        <ul>
            <router-link to="/" class="link">首页</router-link>
            <router-link to="/login" class="link">登录界面</router-link>
            <router-link to="/register" class="link">注册界面</router-link>
            <router-link to="/viewee" class="link">面试者界面</router-link>
            <router-link to="/viewer" class="link">面试官界面</router-link>
        </ul>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>
<style scoped>
.link {
    margin: 10px;
}
</style>
