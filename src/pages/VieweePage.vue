<template>
  <view-layout>
    <problem-tabs :problems="problems"></problem-tabs>
  </view-layout>
</template>
<script>
import ViewLayout from "../layouts/ViewLayout.vue";
import { getProblems } from "../api/problem";
import ProblemTabs from "../components/ProblemTabs.vue";
export default {
  name: "VieweePage",
  data() {
    return {
      problems: [],
    };
  },
  components: {
    ViewLayout,
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
