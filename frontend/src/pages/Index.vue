<template>
  <div class="index">
    <div class="banner">
      <el-image
        class="banner-img"
        :src="require('../assets/' + mainImg)"
        fit="fill"
      ></el-image>
      <h1 class="banner-title">在线编程笔试平台</h1>
    </div>
    <TheInfo></TheInfo>
  </div>
</template>
<script>
import TheInfo from "../components/TheInfo.vue";

export default {
  name: "Index",
  data() {
    return {
      mainImg: "maranda-vandergriff-7aakZdIl4vg-unsplash.webp",
    };
  },
  components: {
    TheInfo,
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