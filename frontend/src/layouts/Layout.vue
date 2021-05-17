<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-main>
      <Main>
        <slot></slot>
      </Main>
    </el-main>
    <el-footer>
      <Foot></Foot>
    </el-footer>
  </el-container>
</template>
<script>
import Head from "../components/Head.vue";
import Main from "./Main.vue";
import Foot from "../components/Foot.vue";

export default {
  name: "Layout",
  components: {
    Head,
    Main,
    Foot,
  },
};
</script>
<style scoped>
.el-header {
    padding: 0;
}
</style>