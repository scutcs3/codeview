<template>
  <div class="problem">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template>
<script>
import { getProblem } from "../api/problem.js";

export default {
  name: "Problem",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  mounted() {
    const self = this;
    getProblem()
      .then((response) => JSON.parse(response.data))
      .then(function (json) {
        self.title = json[0].title;
        self.content = json[0].content;
      });
  },
};
</script>