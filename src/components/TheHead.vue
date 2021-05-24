<template>
  <div>
    <div class="head shadow-bottom d-flex align-items-center">
      <h1 class="title" @click="goIndex()">Code View</h1>
      <HeadMenu></HeadMenu>
    </div>
  </div>
</template>
<script>
import HeadMenu from "./HeadMenu.vue";
import router from "../router.js";

export default {
  name: "TheHead",
  components: {
    HeadMenu,
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
  font-size: 1.7rem;
  margin-left: 20px;
}
.title:hover {
  cursor: pointer;
}
</style>