<template>
  <div class="interviews-new">
    <h2>创建面试</h2>
    <el-form :model="createForm">
      <el-form-item label="面试者">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>
      <el-form-item label="面试时间">
        <el-date-picker
          v-model="createForm.time_range"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { createInterview } from "../api/interview";
export default {
  name: "ProblemsNewPage",
  data() {
    return {
      textarea: "",
      createForm: {
        viewee_id: "",
        time_range: "",
      },
    };
  },
  methods: {
    onSubmit() {
      createInterview({}).handle({
        200: () => {
          ElMessage.success("创建面试成功");
          this.$router.push({
            name: "interviews-list",
          });
        },
        404: () => ElMessage.warning("创建面试失败！"),
      });
    },
  },
};
</script>
