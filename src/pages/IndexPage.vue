<template>
  <div class="index">
    <div class="banner">
      <el-image class="banner-img" :src="bannerImg" fit="cover"></el-image>
      <h1 class="banner-title">在线编程笔试平台</h1>
    </div>
    <IndexInfo></IndexInfo>
  </div>
</template>
<script>
import IndexInfo from "../components/IndexInfo.vue";
import bannerImg from "../assets/maranda-vandergriff-7aakZdIl4vg-unsplash.webp";
export default {
  name: "IndexPage",
  data() {
    return {
      bannerImg,
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
@media only screen and (max-width: 769px) {
  .banner-title {
    font-size: 4rem;
  }
}
@media only screen and (max-width: 540px) {
  .banner-title {
    font-size: 3rem;
  }
}
</style>
