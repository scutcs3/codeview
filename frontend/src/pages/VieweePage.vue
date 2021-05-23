<template>
  <el-row>
    <el-col :span="6">
      <BaseProblem></BaseProblem>
    </el-col>
    <el-col :span="12">
      <CodeEditor msg="编程部分"></CodeEditor>
    </el-col>
    <el-col :span="6"> 
        <BaseComment></BaseComment>
    </el-col>
  </el-row>
</template>

<script>
import CodeEditor from "../components/CodeEditor.vue";
import BaseProblem from "../components/BaseProblem.vue";
import BaseComment from "../components/BaseComment.vue";
export default {
  name: "VieweePage",
  components: {
    CodeEditor,
    BaseProblem,
    BaseComment,
  },
};
</script>
<style scoped>
body {
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
