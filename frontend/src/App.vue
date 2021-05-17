<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Layout>
</template>
<script>
import Layout from "./layouts/Layout.vue";
export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>
<style scoped>
</style>
