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
  },
  watch: {
    opts: {
      handler() {
        (this.codestr = this.getVal()),
          this.monacoEditor.dispose(),
          (this.monacoEditor = null);
        this.init();
        this.monacoEditor.setValue(this.codestr);
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
    this.monacoEditor.layout();
    this.monacoEditor.onDidChangeModelContent(() => {
      let newContent = this.monacoEditor.getValue();
      console.log(newContent);
    });
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
