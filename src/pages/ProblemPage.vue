<template>
  <div>
    <!--class="problem"-->
    <h3>{{ id }} {{ title }}</h3>
    <p>{{ content }}</p>

    <!-- <el-collapse>
      <p>示例</p>
      <p>???</p>
    </el-collapse>

    <div><button @click="show = !show">提示</button></div>
    <el-collapse>
      <div v-if="show" class="testshow">?????????</div>
    </el-collapse> -->
  </div>
</template>

<script>
import { getProblem } from "../api/problem.js";

export default {
  name: "ProblemPage",
  data() {
    return {
      show: false,

      title: "",
      content: "",
      id: "",
    };
  },
  activated() {
    const self = this;
    const pid = self.$route.params.id;
    this.id = pid;
    getProblem({
      pid,
    }).handle({
      200: (data) => {
        this.title = data[0].title;
        this.content = data[0].content;
      },
      404: () => self.$message.error("获取题目数据失败！"),
    });
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.testshow {
  background-color: white;
}
</style>
