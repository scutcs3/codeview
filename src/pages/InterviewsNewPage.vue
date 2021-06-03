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
      <el-form-item label="面试日期">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="YYYY 年 MM 月 DD 日"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面试时间">
        <el-time-picker
          is-range
          v-model="form.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择面试时间范围"
        >
        </el-time-picker>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
  </div>
</template>
<script>
import { createInterview } from "../api/interview";
import moment from "moment";

export default {
  name: "ProblemsNewPage",
  data() {
    return {
      textarea: "",
      form: {
        viewee_type: "外部用户",
        viewee_id: "",
        date: new Date(),
        time: [new Date(), new Date()],
      },
    };
  },
  computed: {
    start_time() {
      return `${moment(this.form.date).format("YYYY-MM-DD")} ${moment(
        this.form.time[0]
      ).format("HH:mm:ss")}`;
    },
    finish_time() {
      return `${moment(this.form.date).format("YYYY-MM-DD")} ${moment(
        this.form.time[1]
      ).format("HH:mm:ss")}`;
    },
  },
  methods: {
    onSubmit() {
      console.log(this.start_time, this.finish_time);
      createInterview({
        start_time: this.start_time,
        finish_time: this.finish_time,
      }).handle({
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
