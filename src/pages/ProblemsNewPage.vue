<template>
  <div class="problems-new">
    <h2>新建题目</h2>
    <el-form :model="createForm">
      <el-form-item label="标题">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 暂时用普通编辑器，等富文本编辑器代码整理好了再引入 -->
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ProblemsNewPage",
  data() {
    return {
      textarea: "",
      createForm: {},
    };
  },
};
</script>
