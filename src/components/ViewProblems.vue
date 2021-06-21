<template>
  <problem-tabs :problems="problems"></problem-tabs>
</template>
<script>
import { getProblems } from "../api/problem";
import ProblemTabs from "./ProblemTabs.vue";
export default {
  name: "ViewProblems",
  data() {
    return {
      problems: [],
    };
  },
  components: {
    ProblemTabs,
  },
  methods: {
    showProblem(pid) {
      getProblems({
        pid,
      }).handle({
        200: (data) => {
          this.problems.push(data[0]);
        },
        404: () => console.warn("获取题目失败"),
      });
    },
  },
  activated() {
    // 获取面试题目
    this.problems = [];
    getProblems({
      iid: this.$route.params.id,
    }).handle({
      200: (data) => {
        if (data.length === 0) console.log("还没有出题");
        for (let problem of data) {
          this.showProblem(problem.problem_id);
        }
      },
      404: () => console.log("请求失败"),
    });
  },
};
</script>
<style scoped></style>
