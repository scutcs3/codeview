<template>
  <ViewLayout>
    <ManageModule></ManageModule>
  </ViewLayout>
</template>
<script>
import ManageModule from "../components/ManageModule.vue";
import ViewLayout from "../layouts/ViewLayout.vue";
export default {
  name: "ViewrPage",
  components: {
    ViewLayout,
    ManageModule,
  },
};
</script>
<style scoped></style>
