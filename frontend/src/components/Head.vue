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
import router from "../routes.js";

export default {
  name: "Head",
  components: {
    Menu,
  },
  methods: {
    goIndex() {
      router.push({
        name: 'index'
      })
    }
  }
};
</script>
<style scoped>
.head {
  height: 50px;
  width: 100%;
  background-color: white;
  z-index: 9;
}
.title:hover {
  cursor: pointer;
}
</style>