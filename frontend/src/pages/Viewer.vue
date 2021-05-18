<template>
  <el-row>
    <el-col :span="6">
      <add></add>
    </el-col>
    <el-col :span="12">
      <Editor msg="编程部分"></Editor>
    </el-col>
    <el-col :span="6">
      <Comment></Comment>
    </el-col>
  </el-row>
</template>
<script>
import Editor from "../components/Editor.vue";
import add from "../components/add.vue";
import Comment from "../components/Comment.vue"
export default {
  name: "App",
  components: {
    add,
    Editor,
    Comment,
  },
};
</script>
<style scoped>


</style>