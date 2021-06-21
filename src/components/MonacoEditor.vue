<template>
  <div ref="container" class="monaco-editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";
export default {
  name: "MonacoEditor",
  data() {
    return {
      timer: null,
      // 主要配置
      defaultOpts: {
        value: "", // 编辑器的值
        theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark
        roundedSelection: false, // 右侧不显示编辑器预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true,
        foldingStrategy: "indentation", // 代码可分小段折叠
        minimap: {
          enabled: false, // 不要小地图
        },
      },
    };
  },
  computed: {
    opts() {
      return this.$store.state.codeEditor;
    },
    wsCodeMsg() {
      return this.$store.getters.wsCodeMsg;
    },
  },
  watch: {
    "opts.language": function (newVal, oldVal) {
      if (newVal === oldVal) return;
      monaco.editor.setModelLanguage(this.monacoEditor.getModel(), newVal);
    },
    "opts.theme": function (newVal, oldVal) {
      console.log("opts.theme changed", newVal, oldVal);
      if (newVal === oldVal) return;
      monaco.editor.setTheme(newVal);
    },
    "opts.value": function (newVal, oldVal) {
      if (newVal === oldVal || newVal === this.codestr) return;
      this.setVal(newVal);
    },
    "wsCodeMsg.length": function (newVal, oldVal) {
      if (newVal == oldVal || newVal === 0) return;
      let len = this.wsCodeMsg.length;
      let lastMsg = this.wsCodeMsg[len - 1];
      this.setVal(lastMsg.value);
    },
  },
  // watch: {
  //   opts: {
  //     handler() {
  //       (this.codestr = this.getVal()),
  //         this.monacoEditor.dispose(),
  //         (this.monacoEditor = null);
  //       this.init();
  //       this.monacoEditor.setValue(this.codestr);
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    this.init();
    this.monacoEditor.layout();
    this.timer = window.setInterval(() => {
      setTimeout(this.detectContent(), 0);
    }, 500);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      // 初始化container的内容，销毁之前生成的编辑器
      this.$refs.container.innerHTML = "";
      let editorOptions = Object.assign(this.defaultOpts, this.opts);
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(
        this.$refs.container,
        editorOptions
      );
    },
    // 定时检测内容变化
    detectContent() {
      let val = this.getVal();
      if (this.codestr !== val || val !== this.opts.value) {
        this.$store.dispatch("updateCodeEditor", {
          value: val,
        });
        this.codestr = val;
      }
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    },
    setVal(val) {
      if (val !== this.codestr) {
        this.codestr = val;
        this.monacoEditor.setValue(val);
      }
    },
  },
};
</script>
<style scoped>
.monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
