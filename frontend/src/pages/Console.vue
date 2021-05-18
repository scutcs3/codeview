<template>
  <div class="console">
    <h2>控制台</h2>
    <el-row>
      <el-col :span="6">
        <el-menu default-active="overview" @select="handleSelect" >
          <el-menu-item
            v-for="menu in menus"
            :key="menu.name"
            :index="menu.name"
          >
            <i :class="'el-icon-' + menu.icon"></i>
            <template #title>{{ menu.title }}</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import router from '../routes.js'

export default {
  name: "Console",
  data() {
    return {
      menus: [
        {
          name: "overview",
          icon: "view",
          title: "总览",
        },
        {
          name: "problems",
          icon: "document",
          title: "题库",
        },
        {
          name: "settings",
          icon: "setting",
          title: "设置",
        },
        {
          name: "profile",
          icon: "user",
          title: "个人中心",
        },
      ],
    };
  },
  methods: {
      handleSelect(key) {
          router.push({
              name: key
          })
      }
  }
};
</script>
<style scoped>
.console-view {
  margin-bottom: 100px;
}
</style>
