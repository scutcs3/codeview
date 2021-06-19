<template>
  <div class="monaco-container">
    <!--调用子组件-->
    <MonacoEditor
      ref="monaco"
      :opts="opts"
      @change="changeValue"
    ></MonacoEditor>
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
  watch: {
    "wsCodeMsg.length": function (newVal, oldVal) {
      if (newVal == oldVal || newVal === 0) return;
      let len = this.wsCodeMsg.length;
      let lastMsg = this.wsCodeMsg[len - 1];
      if (lastMsg.uid !== this.uid) {
        this.setValue(lastMsg.value);
      }
    },
    opts: {
      handler(val, oldval) {
        if (val != oldval) {
          this.$store.commit("wsSend", {
            type: "code",
            uid: this.uid,
            value: this.getValue(),
            language: this.opts.language,
            theme: this.opts.theme,
          });
        }
      },
    },
  },

  methods: {
    // 手动获取值
    getValue() {
      return this.$refs.monaco.getVal();
    },
    setValue(val) {
      this.$refs.monaco.setVal(val);
    },
    // 内容改变自动获取值
    changeValue(val, oldVal) {
      if (val === oldVal) return;
      //dispatch updateCodeEditor
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
