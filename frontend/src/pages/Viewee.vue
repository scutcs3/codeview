<template>
  <el-row>
    <el-col :span="6">
      <Document></Document>
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
import Document from "../components/Document.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "App",
  components: {
    Editor,
    Document,
    Comment,
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
