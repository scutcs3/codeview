<template>
  <div class="monaco-container">
    <div class="Choose">
      语言：
      <el-select
        v-model="opts.language"
        clearable
        placeholder="请选择"
        size="mini"
        @change="changeLanguage"
      >
        <el-option
          v-for="item in sets.language"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <br />
      样式风格：
      <el-select
        v-model="opts.theme"
        clearable
        placeholder="请选择"
        size="mini"
        @change="changeTheme"
      >
        <el-option
          v-for="item in sets.theme"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <!--调用子组件-->
    <div class="monaco-editor">
      <MonacoEditor
        ref="monaco"
        :opts="opts"
        @change="changeValue"
        @ChangeEditorLanguage="ChangeEditorLanguage"
      ></MonacoEditor>
    </div>
  </div>
</template>
<script>
import MonacoEditor from "./MonacoEditor.vue";
export default {
  name: "CodeEditor",
  components: { MonacoEditor },
  data() {
    return {
      uid: localStorage.getItem("user.id"),
      codestr: "", //假设这是代码
      sets: {
        language: {
          cpp: "cpp",
          c: "c",
          css: "css",
          go: "go",
          html: "html",
          java: "java",
          javascript: "javascript",
          json: "json",
          mysql: "mysql",
          php: "php",
          python: "python",
        },
        theme: {
          vs: "vs",
          "vs-dark": "vs-dark",
          "hc-black": "hc-black",
        },
      },

      opts: {
        value: "",
        readOnly: false, // 是否可编辑
        language: "cpp", // 语言类型
        theme: "vs", // 编辑器主题
      },
    };
  },
  computed: {
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
    changeLanguage(val) {
      this.opts.language = val;
    },
    changeTheme(val) {
      this.opts.theme = val;
    },
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
      this.$store.commit("wsSend", {
        type: "code",
        uid: this.uid,
        value: this.getValue(),
        language: this.opts.language,
        theme: this.opts.theme,
      });
    },
    ChangeEditorLanguage(val) {
      this.opts.language = val;
    },
  },
};
</script>
<style scoped>
.submit-button {
  position: relative;
  right: 0;
}
.Choose {
  margin-bottom: 10px;
}
</style>
