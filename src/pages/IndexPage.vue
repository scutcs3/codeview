<template>
  <div class="index">
    <div class="banner">
      <el-image
        class="banner-img"
        :src="require('../assets/' + mainImg)"
        fit="cover"
      ></el-image>
      <h1 class="banner-title">在线编程笔试平台</h1>
    </div>
    <IndexInfo></IndexInfo>
  </div>
</template>
<script>
import IndexInfo from "../components/IndexInfo.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      mainImg: "maranda-vandergriff-7aakZdIl4vg-unsplash.webp",
    };
  },
  components: {
    IndexInfo,
  },
};
</script>
<style scoped>
.banner-img {
  height: 40rem;
}
.banner-title {
  position: absolute;
  top: 16rem;
  font-size: 6rem;
  text-align: center;
  width: 100%;
  color: white;
  background-color: rgba(128, 128, 128, 0.644);
}
</style>
