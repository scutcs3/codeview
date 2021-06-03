<template>
  <div class="interviews">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
export default {
  name: "Interviews",
};
</script>
<style scoped>
.interviews {
  margin: 1rem;
}
</style>
