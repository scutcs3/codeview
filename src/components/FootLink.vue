<template>
  <div>
    <h3>{{ name }}</h3>
    <div v-for="link in links" :key="link.href" class="item">
      <a :href="link.href">{{ link.title }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "FootLink",
  props: {
    links: Array,
    name: String,
  },
};
</script>
<style scoped>
h3 {
    font-size: 1.25rem;
    font-weight: 300;
}
.item {
    margin-top: .5rem;
    margin-bottom: .5rem;
}
</style>