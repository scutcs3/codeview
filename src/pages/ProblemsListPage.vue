<template>
  <div>
    <h2>题目列表</h2>
    <el-button @click="newProblems">新建题目</el-button>
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
        :total="tableData.length"
        :page-size="30"
        :page-sizes="[30, 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { getProblems } from "../api/problem.js";
export default {
  name: "ProblemsList",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      dictCurrentPage: 1,
      dictPageSize: 30,
    };
  },
  methods: {
    newProblems() {
      this.$router.push({
        name: "problems-new",
      });
    },
  },
  activated() {
    const self = this;
    getProblems({
      page: self.currentPage,
      per_page: self.dictPageSize,
    }).handle({
      200: (data) => {
        self.tableData = [];
        for (let problem of data) {
          self.tableData.push({
            id: problem.id,
            title: problem.title,
            updated_at: problem.updated_at,
          });
        }
      },
      401: () => {
        ElMessage.warning("登录信息失效，请重新登录！");
        this.$router.push("/login");
      },
      404: () => console.log("获取题目列表失败"),
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
