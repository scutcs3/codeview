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
      <monaco ref="monaco" :opts="opts" @change="changeValue"></monaco>
    </div>
  </div>
</template>
<script>
import monaco from "./monacoEditor";
export default {
  name:'Editor',
  components: { monaco },
  data() {
    return {
      sets: {
        language: {
          cpp:'cpp',
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
  methods: {
    changeLanguage(val) {
      this.opts.language = val;
    },
    changeTheme(val) {
      this.opts.theme = val;
    },
    // 手动获取值
    getValue() {
      // this.$message.info(this.$refs.monaco.getVal());
      return this.getValue();
    },
    // 内容改变自动获取值
    changeValue(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped>
.monaco-container {
  position: relative;
  height: 75%;
  width: 80%;
  margin-bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
}
.monaco-editor {
  height: 100%;
  border: 1px solid rgb(91, 93, 93);
  text-align: left;
}
.submit-button {
  position: relative;
  right: 0;
}
.Choose{
  margin-bottom: 10px;
}
</style>
