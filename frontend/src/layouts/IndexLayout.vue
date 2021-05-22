<template>
  <el-container>
    <el-header>
      <TheHead></TheHead>
    </el-header>
    <el-main>
        <slot></slot>
    </el-main>
    <el-footer>
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
.el-header, .el-main, .el-footer {
    padding: 0;
}
</style>