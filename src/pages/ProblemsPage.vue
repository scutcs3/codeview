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
        :pager-count="9"
        background
        :total="dictTotal"
        :page-size="30"
        :page-sizes="[30, 50, 100]"
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
      dictTotal: 1000,
      dictCurrentPage: 1,
      dictPageSize: 30,
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
        }
      });
  },
};
</script>

<style scoped>
.pages {
  margin: 2rem auto;
  text-align: center;
}
</style>
