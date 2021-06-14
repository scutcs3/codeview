<template>
  <div class="problems-new">
    <h2>新建题目</h2>
    <el-input v-model="createForm.title" placeholder="输入题目标题"></el-input>
    <text-editor v-model:content="createForm.content"></text-editor>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>
<script>
import { addProblem } from "../api/problem";
import TextEditor from "../components/TextEditor.vue";

export default {
  name: "ProblemsNewPage",
  data() {
    return {
      createForm: {
        title: "",
        content: "",
      },
    };
  },
  components: {
    TextEditor,
  },
  methods: {
    onSubmit() {
      addProblem({
        title: this.createForm.title,
        content: this.createForm.content,
      }).handle({
        200: () => {
          this.$message.success("添加题目成功");
          // 清除输入内容
          this.createForm.title = "";
          this.createForm.content = "";
          this.$router.push({
            name: "problems-list",
          });
        },
        404: () => this.$message.warning("添加题目失败！"),
      });
    },
  },
};
</script>
