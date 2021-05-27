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
  data() {
    return {
      isLogin: false,
    };
  },
  components: {
    IndexLayout,
  },
  mounted() {
    this.isLogin = localStorage.getItem["token"] !== null;
  },
};
</script>
<style scoped></style>
