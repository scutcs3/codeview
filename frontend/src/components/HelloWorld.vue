<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      软件工程课程设计demo：
      <a href="https://bytedance.feishu.cn/docs/doccnDPUD9P0RoqYKNkUu4ibr2b" target="_blank" rel="noopener">华工大软工实践前端 3 组课题</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
