<template>
  <div>
    <h2>面试列表</h2>
    <el-button @click="newInterviews">创建面试</el-button>
    <div class="view-cards">
      <ViewCard
        v-for="i in 10"
        :key="i"
        class="view-card"
        :title="'第' + i + '场面试'"
      ></ViewCard>
    </div>
  </div>
</template>
<script>
import ViewCard from "../components/ViewCard.vue";
export default {
  name: "InterviewsList",
  components: {
    ViewCard,
  },
  data() {
    return {
      props: {
        fieldValue: [String, Boolean],
      },
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
    };
  },
  methods: {
    newInterviews() {
      this.$router.push({
        name: "interviews-new",
      });
    },
  },
};
</script>
<style scoped>
.view-cards {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
.view-card {
  margin: 1rem;
}
</style>
