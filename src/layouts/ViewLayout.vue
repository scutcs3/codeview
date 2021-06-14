<template>
  <div class="view-layout">
    <div class="view-item">
      <slot></slot>
    </div>
    <div class="view-item">
      <code-panel></code-panel>
    </div>
    <div class="view-item">
      <comment-panel></comment-panel>
    </div>
  </div>
</template>
<script>
import CodePanel from "../components/CodePanel.vue";
import CommentPanel from "../components/CommentPanel.vue";

export default {
  name: "ViewLayout",
  props: {
    type: String,
  },
  components: {
    CodePanel,
    CommentPanel,
  },
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
<style scoped>
.view-layout {
  display: flex;
  justify-content: center;
}
.view-item {
  flex-basis: 0;
  flex-grow: 1;
}
@media only screen and (max-width: 769px) {
  .view-layout {
    flex-wrap: wrap;
  }
  .view-item {
    flex-basis: auto;
    flex-grow: 0;
  }
}
</style>
