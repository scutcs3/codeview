<template>
  <div>
    <h2>P{{ pid }} {{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  name: "BaseProblem",
  props: {
    pid: Number,
    title: String,
    content: String,
  },
};
</script>
