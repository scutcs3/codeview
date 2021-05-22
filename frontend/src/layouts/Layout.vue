<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-main>
        <slot></slot>
    </el-main>
    <el-footer>
      <Foot></Foot>
    </el-footer>
  </el-container>
</template>
<script>
import Head from "../components/Head.vue";
import Foot from "../components/Foot.vue";

export default {
  name: "Layout",
  components: {
    Head,
    Foot,
  },
};
</script>
<style scoped>
.el-header, .el-main, .el-footer {
    padding: 0;
}
</style>