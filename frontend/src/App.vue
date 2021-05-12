<template>
  <el-container>
    <el-header>在线编程笔试平台</el-header>
    <el-container>
      <el-aside width="300px">
        <Problem></Problem>
      </el-aside>
      <el-main>
        <Editor msg="编程部分"></Editor>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Editor from './components/Editor.vue'
import Problem from './components/Problem.vue'
export default {
  name: 'App',
  components: {
    Editor,
    Problem
  }
}
</script>
<style>
body {
  margin: 0
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

</style>