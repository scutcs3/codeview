<template>
  <h2>题库页面</h2>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="序号" width="60"> </el-table-column>
    <el-table-column prop="title" label="题目"> </el-table-column>
    <el-table-column prop="updated_time" label="更新时间" width="180">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "Problems",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
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
        for (let problem of json) {
          self.tableData.push({
            id: problem.id,
            title: problem.title,
            updated_time: problem.updated_time,
          });
        }
      });
  },
};
</script>