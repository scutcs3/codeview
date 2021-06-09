<template>
  <div class="problem">
    <base-problem :pid="id" :title="title" :content="content"></base-problem>
  </div>
</template>

<script>
import BaseProblem from "../components/BaseProblem.vue";
import { getProblem } from "../api/problem.js";

export default {
  name: "ProblemPage",
  data() {
    return {
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
  components: {
    BaseProblem,
  },
};
</script>

<style scoped>
.testshow {
  background-color: white;
}
.problem {
  margin: 2rem 3rem;
}
.problem-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
