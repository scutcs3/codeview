<template>
  <div class="worker">
    <div class="controls">
      <div>运行结果</div>
      <div>
        <el-button @click="runCode" v-if="codeIsJs">运行代码</el-button>
        <el-button type="primary" @click="submitCode">提交代码</el-button>
      </div>
    </div>
    <div class="terminal" id="terminal-output"></div>
  </div>
</template>
<script>
export default {
  name: "CodeWorker",
  methods: {
    runCode() {
      eval(`
      var logOutput = "";
      var oldLog = console.log;
      console.log = function(str) {
        oldLog(str);
        logOutput += str;
      }
      ${this.codeEditorVal}
      document.getElementById("terminal-output").innerText = "";
      document.getElementById("terminal-output").innerText = logOutput;
      `);
    },
    submitCode() {
      console.log("提交代码");
    },
  },
  computed: {
    codeEditorVal() {
      return this.$store.state.codeEditor.value;
    },
    codeIsJs() {
      return this.$store.state.codeEditor.language === "javascript";
    },
  },
};
</script>
<style scoped>
.worker {
  width: 100%;
  height: 180px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  border: 1px solid #ddd;
}
.controls {
  border-bottom: 1px solid #f3f3f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}
.terminal {
  flex-grow: 1;
  width: 100%;
  overflow: auto;
}
</style>
