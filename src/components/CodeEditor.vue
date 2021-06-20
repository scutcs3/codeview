<template>
  <div class="monaco-container">
    <!--调用子组件-->
    <MonacoEditor ref="monaco"></MonacoEditor>
  </div>
</template>
<script>
import MonacoEditor from "./MonacoEditor.vue";
export default {
  name: "CodeEditor",
  components: { MonacoEditor },
  computed: {
    opts() {
      return this.$store.state.codeEditor;
    },
    wsCodeMsg() {
      return this.$store.getters.wsCodeMsg;
    },
  },
};
</script>
<style scoped>
.monaco-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.submit-button {
  position: relative;
  right: 0;
}
</style>
