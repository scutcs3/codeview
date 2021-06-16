<template>
  <base-card :title="`在线聊天（${count}）`">
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
