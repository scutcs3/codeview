<template>
  <base-card :title="`在线聊天（${count}）`" class="basecard">
    <base-comment></base-comment>
  </base-card>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseCard from "./BaseCard.vue";
import BaseComment from "./BaseComment.vue";

export default defineComponent({
  name: "CommentPanel",
  components: {
    BaseComment,
    BaseCard,
  },
  computed: {
    count() {
      return this.$store.getters.wsCount;
    },
  },
});
</script>
<style scoped>
.basecard {
  height: 100%;
}

/* 深度作用选择器 */
/* ::v-deep(.el-card__body) { */
.basecard >>> .el-card__body {
  height: 100%;
}
</style>
