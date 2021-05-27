<template>
  <div class="problems">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
export default {
  name: "ProblemsPage",
};
</script>
