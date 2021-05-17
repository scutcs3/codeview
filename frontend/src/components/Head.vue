<template>
  <div>
    <div class="head shadow-bottom">
      <h1 class="title">在线编程笔试平台</h1>
      <Menu></Menu>
    </div>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
export default {
  name: "Head",
  components: {
    Menu,
  },
};
</script>
<style scoped>
.head {
  height: 50px;
  width: 100%;
  background-color: white;
  z-index: 9;
}
.title {
  float: left;
}
</style>