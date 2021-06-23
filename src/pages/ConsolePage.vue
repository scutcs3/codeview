<template>
  <div class="console">
    <h2>控制台</h2>
    <el-row>
      <el-col :span="6">
        <el-menu :default-active="defaultActive" @select="handleSelect">
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
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { router } from "../router";

export default {
  name: "Console",
  data() {
    return {
      menus: [
        {
          name: "interviews",
          icon: "view",
          title: "面试",
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
  computed: {
    defaultActive() {
      let name = "";
      for (let menu of this.menus) {
        if (this.$route.path.includes(menu.name)) {
          name = menu.name;
          break;
        }
      }
      return name;
    },
  },
  methods: {
    handleSelect(key) {
      router.push(`/console/${key}`);
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 2rem 0;
  margin-left: 2rem;
}
</style>
