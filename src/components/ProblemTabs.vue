<template>
  <base-card title="面试题目">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="problem in problems"
        :label="problem.title"
        :key="problem.id"
      >
        <div class="problem-tab" v-html="problem.content"></div>
      </el-tab-pane>
    </el-tabs>
  </base-card>
</template>
<script>
import BaseCard from "./BaseCard.vue";
export default {
  name: "ProblemTabs",
  props: {
    problems: Array,
  },
  components: {
    BaseCard,
  },
};
</script>
<style scoped>
.el-tabs {
  width: 100%;
  height: 100%;
}
</style>
