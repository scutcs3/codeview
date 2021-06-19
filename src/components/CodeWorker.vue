<template>
  <div class="worker">
    <div class="controls">
      <div>运行结果</div>
      <div>
        <el-button @click="runCode">运行代码</el-button>
        <el-button type="primary" @click="submitCode">提交代码</el-button>
      </div>
    </div>
    <div class="terminal"></div>
  </div>
</template>
<script>
export default {
  name: "CodeWorker",
  methods: {
    runCode() {
      console.log(this.codeEditorVal);
    },
    submitCode() {
      console.log("提交代码");
    },
  },
  computed: {
    codeEditorVal() {
      return this.$store.state.codeEditor.value;
    },
  },
};
</script>
<style scoped>
.worker {
  width: 100%;
  height: 240px;
  display: flex;
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
  flex: 1 1 auto;
}
</style>
