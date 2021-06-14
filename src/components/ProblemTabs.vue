<template>
  <el-tabs type="border-card">
    <el-tab-pane
      v-for="problem in problems"
      :label="problem.title"
      :key="problem.id"
    >
    <div v-html="problem.content"></div>
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
