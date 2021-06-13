<template>
  <div class="view-layout">
    <base-card title="管理面板">
      <slot></slot>
    </base-card>
    <base-card title="代码面板">
      <CodeEditor msg="编程部分"></CodeEditor>
    </base-card>
    <base-card :title="`在线聊天（${count}）`">
      <BaseComment></BaseComment>
    </base-card>
  </div>
</template>
<script>
import CodeEditor from "../components/CodeEditor.vue";
import BaseComment from "../components/BaseComment.vue";
import BaseCard from "../components/BaseCard.vue";

export default {
  name: "ViewLayout",
  components: {
    CodeEditor,
    BaseComment,
    BaseCard,
  },
  methods: {
    beforeunloadCb() {
      // 页面关闭时，关闭WebSocket连接
      this.$store.commit("wsClose");
    },
  },
  computed: {
    count() {
      return this.$store.getters.wsCount;
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
  flex-wrap: wrap;
  justify-content: center;
}
.el-card {
  margin: 1rem;
}
</style>
