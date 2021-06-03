<template>
  <div class="interviews-new">
    <h2>创建面试</h2>
    <el-form :model="form">
      <el-form-item label="面试者类型">
        <el-radio-group v-model="form.viewee_type">
          <el-radio label="外部用户"></el-radio>
          <el-radio label="站内用户"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="面试者" v-show="form.viewee_type === '站内用户'">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="面试时间">
        <el-date-picker
          v-model="form.time_range"
          type="datetimerange"
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
import { createInterview } from "../api/interview";
export default {
  name: "ProblemsNewPage",
  data() {
    return {
      textarea: "",
      form: {
        viewee_type: "外部用户",
        viewee_id: "",
        time_range: "",
      },
    };
  },
  methods: {
    onSubmit() {
      createInterview({}).handle({
        200: () => {
          this.$message.success("创建面试成功");
          this.$router.push({
            name: "interviews-list",
          });
        },
        404: () => this.$message.warning("创建面试失败！"),
      });
    },
  },
};
</script>
