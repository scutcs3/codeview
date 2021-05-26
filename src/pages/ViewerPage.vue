<template>
  <el-row>
    <el-col :span="6">
      <AddProblem></AddProblem>
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
import AddProblem from "../components/AddProblem.vue";
import BaseComment from "../components/BaseComment.vue";
export default {
  name: "App",
  components: {
    AddProblem,
    CodeEditor,
    BaseComment,
  },
};
</script>
<style scoped></style>
