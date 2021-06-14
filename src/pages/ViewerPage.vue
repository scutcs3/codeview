<template>
  <view-layout>
    <manage-panel></manage-panel>
  </view-layout>
</template>
<script>
import ManagePanel from "../components/ManagePanel.vue";
import ViewLayout from "../layouts/ViewLayout.vue";
export default {
  name: "ViewrPage",
  components: {
    ViewLayout,
    ManagePanel,
  },
};
</script>
