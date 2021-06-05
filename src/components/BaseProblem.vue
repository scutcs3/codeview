<template>
  <div>
    <h1>题目部分</h1>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  name: "BaseProblem",
  data: function () {
    return {
      title: "",
      content: "",
    };
  },
};
</script>
