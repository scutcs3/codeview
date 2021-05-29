<template>
  <div class="problems-new">
    <h2>新建题目</h2>
    <el-form :model="createForm">
      <el-form-item label="标题">
        <el-input v-model="createForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 暂时用普通编辑器，等富文本编辑器代码整理好了再引入 -->
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="createForm.content"
        >
        </el-input>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { addProblem } from "../api/problem";
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
  methods: {
    onSubmit() {
      addProblem({
        title: this.createForm.title,
        content: this.createForm.content,
      }).handle({
        200: () => {
          ElMessage.success("添加题目成功");
          // 清除输入内容
          this.createForm.title = "";
          this.createForm.content = "";
          this.$router.push({
            name: "problems-list",
          });
        },
        404: () => ElMessage.warning("添加题目失败！"),
      });
    },
  },
};
</script>
