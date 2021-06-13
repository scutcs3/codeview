<template>
  <el-container>
    <el-header v-if="$route.name !== 'viewer' && $route.name !== 'viewee'">
      <TheHead></TheHead>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer v-if="$route.name === 'index'">
      <TheFoot></TheFoot>
    </el-footer>
  </el-container>
</template>
<script>
import TheHead from "../components/TheHead.vue";
import TheFoot from "../components/TheFoot.vue";

export default {
  name: "Layout",
  components: {
    TheHead,
    TheFoot,
  },
};
</script>
<style scoped>
.el-header,
.el-main,
.el-footer {
  padding: 0;
}
</style>
