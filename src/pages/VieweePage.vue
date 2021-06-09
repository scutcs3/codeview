<template>
  <ViewLayout>
    <el-row>
      <el-col :span="6">
        <BaseProblem :pid="pid" :title="title" :content="content"></BaseProblem>
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
import BaseProblem from "../components/BaseProblem.vue";
import BaseComment from "../components/BaseComment.vue";
import ViewLayout from "../layouts/ViewLayout.vue";
import { getProblems } from "../api/problem";

export default {
  name: "VieweePage",
  data() {
    return {
      pid: 0,
      title: "",
      content: "",
    };
  },
  components: {
    ViewLayout,
    CodeEditor,
    BaseProblem,
    BaseComment,
  },
  methods: {
    showProblem(pid) {
      getProblems({
        pid,
      }).handle({
        200: (data) => {
          // 暂时只展示第一题
          this.pid = data[0].id;
          this.title = data[0].title;
          this.content = data[0].content;
        },
        404: () => console.warn("获取题目失败"),
      });
    },
  },
  activated() {
    // 获取面试题目
    getProblems({
      iid: this.$route.params.id,
    }).handle({
      200: (data) => {
        if (data.length === 0) console.log("还没有出题");
        this.showProblem(data[0].problem_id);
      },
      404: () => console.log("请求失败"),
    });
  },
};
</script>
<style scoped></style>
