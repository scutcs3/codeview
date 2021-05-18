<template>
<h3>{{ title }}</h3>
<p>{{ content }}</p>
</template>
<script>
export default {
  name: "Problem",
  data() {
    return {
      title: '',
      content: '',
    }
  },
  mounted() {
    const self = this;
    var url =
      "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0/problems?id=" + self.$route.params.id;
    fetch(url, {
      method: "GET",
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        self.title = json[0].title;
        self.content = json[0].content;
      });
  }
};
</script>