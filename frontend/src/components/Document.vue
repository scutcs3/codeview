<template>
  <div>
    <h1>题目部分</h1>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  name: "Document",
  data: function () {
    return {
      title: "",
      content: "",
    };
  },
  created: function () {
    const self = this;
    var url =
      "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0/problems";
    fetch(url, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        self.title = json[0]["title"];
        self.content = json[0]["content"];
      });
  },
};
</script>
