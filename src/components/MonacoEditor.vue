<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="`height: ${height}px`"
  ></div>
</template>

<script>
import * as monaco from "monaco-editor";
import { inject } from "vue";

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
      default: 500,
    },
  },
  data() {
    return {
      timer: null,
      Onechat: inject("Onechat"),
      currentUser: inject("CurrentID"),
      codelanguage: inject("codelanguage"),
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
  },
  created() {
    this.timer = window.setInterval(() => {
      setTimeout(this.pollData(), 0);
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
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
      });
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    },
    pollData() {
      //console.log(this.currentUser);
      if (this.Onechat == "" || typeof this.Onechat == "undefined") {
        return;
      }
      var jsObj = JSON.parse(this.Onechat);
      if (typeof jsObj.IsCode == "undefined") {
        return;
      }
      if (this.currentUser == jsObj.username) {
        return;
      }
      //console.log(jsObj.IsCode);
      //console.log("服务端返回的数据啊:" + jsObj.value);
      if (jsObj.value != this.getVal()) {
        this.monacoEditor.setValue(jsObj.value);
      }
      this.$emit("ChangeEditorLanguage", jsObj.language);
    },
  },
};
</script>
