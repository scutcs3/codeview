<template>
  <view-layout>
    <base-card title="面试题目">
      <view-problems></view-problems>
    </base-card>
  </view-layout>
</template>
<script>
import ViewLayout from "../layouts/ViewLayout.vue";
import BaseCard from "../components/BaseCard.vue";
import ViewProblems from "../components/ViewProblems.vue";
export default {
  name: "VieweePage",
  data() {
    return {
      problems: [],
    };
  },
  components: {
    ViewLayout,
    BaseCard,
    ViewProblems,
  },
};
</script>
<style scoped></style>
