<template>
  <slot></slot>
</template>
<script>
export default {
  name: "ViewLayout",
  activated() {
    this.$store.commit({
      type: "wsOpen",
      id: this.$route.params.id,
    });
  },
  deactivated() {
    this.$store.commit("wsClose");
  },
};
</script>
