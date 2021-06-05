<template>
  <slot></slot>
</template>
<script>
export default {
  name: "ViewLayout",
  methods: {
    beforeunloadCb() {
      // 页面关闭时，关闭WebSocket连接
      this.$store.commit("wsClose");
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.beforeunloadCb);
  },
  activated() {
    // 激活路由组件时，连接WebSocket
    this.$store.commit({
      type: "wsOpen",
      id: this.$route.params.id,
    });
  },
  // 切换到其它路由组件时，关闭WebSocket连接
  deactivated() {
    this.$store.commit("wsClose");
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.beforeunloadCb);
  },
};
</script>
