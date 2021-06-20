<template>
  <div>
    <div class="choose-item">
      代码语言：
      <el-select
        v-model="language"
        clearable
        placeholder="请选择代码语言"
        size="mini"
      >
        <el-option
          v-for="item in sets.language"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="choose-item">
      样式风格：
      <el-select
        v-model="theme"
        clearable
        placeholder="请选择样式风格"
        size="mini"
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
  </div>
</template>
<script>
export default {
  name: "CodeSettings",
  data() {
    return {
      language: this.$store.state.codeEditor.language,
      theme: this.$store.state.codeEditor.theme,
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
    };
  },
  watch: {
    language(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.$store.dispatch("updateCodeEditor", {
        language: newVal,
      });
    },
    theme(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.$store.dispatch("updateCodeEditor", {
        theme: newVal,
      });
    },
  },
};
</script>
<style scoped>
.choose-item {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
</style>
