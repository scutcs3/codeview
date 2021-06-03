<template>
  <IndexLayout>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </IndexLayout>
</template>
<script>
import IndexLayout from "./layouts/IndexLayout.vue";
export default {
  name: "App",
  components: {
    IndexLayout,
  },
  mounted() {},
};
</script>
<style>
@import "./style/base.css";
</style>
