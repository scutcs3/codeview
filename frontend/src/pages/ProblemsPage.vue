<template>
  <div class="problems">
    <el-table
      :data="
        tableData.slice(
          (dictCurrentPage - 1) * dictPageSize,
          dictCurrentPage * dictPageSize
        )
      "
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号" width="60"> </el-table-column>
      <el-table-column prop="title" label="题目" v-slot="{ row }">
        <router-link :to="{ name: 'problem', params: { id: row.id } }">
          {{ row.title }}
        </router-link>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" width="200">
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        class="fy"
        layout="sizes, prev, pager, next, total"
        v-model="dictCurrentPage"
        background
        :total="dictTotal"
        :page-sizes="[5, 10, 15, 20]"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getProblems } from "../api/problem.js";

export default {
  name: "ProblemsPage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      dictTotal: 0,
      dictCurrentPage: 1,
      dictPageSize: 5,
    };
  },
  mounted() {
    const self = this;
    getProblems()
      .then(function (response) {
        return JSON.parse(response.data);
      })
      .then(function (json) {
        for (let problem of json) {
          self.tableData.push({
            id: problem.id,
            title: problem.title,
            updated_at: problem.updated_at,
          });
          self.dictTotal++;
        }
      });
  },
};
</script>

<style scoped>
.pages {
  margin: 0px;
  padding: 0px;
  text-align: right;
}
</style>