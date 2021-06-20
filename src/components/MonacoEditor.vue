<template>
  <div ref="container" class="monaco-editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "MonacoEditor",
  data() {
    return {
      monacoEditor: null,
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
  },
  computed: {
    opts() {
      return this.$store.state.codeEditor;
    },
  },
  mounted() {
    this.init();
    // this.monacoEditor.layout();
    this.monacoEditor.onDidChangeModelContent(() => {
      let value = this.monacoEditor.getValue();
      this.$store.dispatch({
        type: "updateCodeEditor",
        value,
      });
    });
    // this.monacoEditor.focus();
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
  },
};
</script>
<style scoped>
.monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
