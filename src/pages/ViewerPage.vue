<template>
  <ViewLayout>
    <el-row>
      <el-col :span="6">
        <ManageModule></ManageModule>
      </el-col>
      <el-col :span="12">
        <CodeEditor msg="编程部分"></CodeEditor>
      </el-col>
      <el-col :span="6">
        <BaseComment></BaseComment>
      </el-col>
    </el-row>
  </ViewLayout>
</template>
<script>
import CodeEditor from "../components/CodeEditor.vue";
import ManageModule from "../components/ManageModule.vue";
import BaseComment from "../components/BaseComment.vue";
import ViewLayout from "../layouts/ViewLayout.vue";
export default {
  name: "ViewrPage",
  components: {
    ViewLayout,
    ManageModule,
    CodeEditor,
    BaseComment,
  },
};
</script>
<style scoped></style>
