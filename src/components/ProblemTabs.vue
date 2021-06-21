<template>
  <el-tabs type="border-card">
    <el-tab-pane
      v-for="problem in problems"
      :label="problem.title"
      :key="problem.id"
    >
      <div class="problem-tab" v-html="problem.content"></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "ProblemTabs",
  props: {
    problems: Array,
  },
};
</script>
<style scoped>
.el-tabs {
  width: 100%;
  height: 100%;
}
.el-tabs__content {
  width: 100%;
  overflow: auto;
  height: 100%;
}
</style>
