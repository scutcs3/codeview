<template>
  <el-card class="view-card">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <el-button class="button" type="danger" plain>取消面试</el-button>
      </div>
    </template>
    <div class="content">
      <div class="view-info">
        <p>
          面试时间：<span :title="viewTimeInfo">{{ viewTimeShow }}</span>
        </p>
        <p>候选人：XXX</p>
      </div>
      <div class="view-act">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "ViewCard",
  props: ["title"],
  data() {
    return {
      viewTime: "2021-05-24T16:00:00",
      activities: [
        {
          content: "候选人已接受面试",
          timestamp: this.$moment(
            "2021-05-22T15:00:00",
            this.$moment.ISO_8601
          ).fromNow(),
          type: "primary",
        },
        {
          content: "邀请候选人",
          timestamp: this.$moment(
            "2021-05-22T13:00:00",
            this.$moment.ISO_8601
          ).fromNow(),
        },
        {
          content: "创建面试",
          timestamp: this.$moment(
            "2021-05-21T15:00:00",
            this.$moment.ISO_8601
          ).fromNow(),
        },
      ],
    };
  },
  computed: {
    viewTimeShow() {
      return moment(this.viewTime, moment.ISO_8601).fromNow();
    },
    viewTimeInfo() {
      return moment(this.viewTime, moment.ISO_8601);
    },
  },
};
</script>
<style scoped>
.view-card {
  width: 25rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  display: flex;
  justify-content: space-between;
}
.view-info p {
  margin: 0.5rem;
}
</style>
