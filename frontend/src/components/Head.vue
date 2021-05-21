<template>
  <div>
    <div class="head shadow-bottom d-flex align-items-center">
      <h1 class="title" @click="goIndex()">在线编程笔试平台</h1>
      <Menu></Menu>
    </div>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
import router from "../router.js";

export default {
  name: "Head",
  components: {
    Menu,
  },
  methods: {
    goIndex() {
      router.push('/')
    }
  }
};
</script>
<style scoped>
.head {
  height: 60px;
  width: 100%;
  background-color: white;
  z-index: 9;
}
.title {
  margin-left: 20px;
}
.title:hover {
  cursor: pointer;
}
</style>