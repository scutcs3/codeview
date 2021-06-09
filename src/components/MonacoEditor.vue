<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="`height: ${height}px`"
  ></div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "MonacoEditor",
  props: {
    opts: {
      type: Object,
      default() {
        return {};
      },
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      timer: null,
      // 主要配置
      defaultOpts: {
        codestr: "",
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

      this.editorOptions = Object.assign(this.defaultOpts, this.opts);
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(
        this.$refs.container,
        this.editorOptions
      );
    },
    // 定时检测内容变化
    detectContent() {
      let val = this.getVal();
      if (this.codestr !== val) {
        this.$emit("change", val, this.codestr);
        this.codestr = val;
      }
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    },
    setVal(val) {
      // 不触发onChange
      this.codestr = val;
      this.monacoEditor.setValue(val);
    },
  },
};
</script>
