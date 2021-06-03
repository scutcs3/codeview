<template>
  <div>
    <div class="header">
      <el-input placeholder="搜索题目" v-model="word"> </el-input>
      <el-button type="primary" class="new-button" @click="newProblems"
        >新建题目</el-button
      >
    </div>
    <el-table
      :data="tableData"
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
        :pager-count="9"
        background
        :hide-on-single-page="true"
        :current-page="currentPage"
        :total="totalCount"
        :page-size="pageSize"
        :page-sizes="[30, 50, 100]"
        @current-change="currentPageChange"
        @size-change="pageSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getProblems } from "../api/problem.js";
export default {
  name: "ProblemsList",
  data() {
    return {
      select: "1",
      word: "",
      tableData: [],
      currentPage: 0,
      pageSize: 0,
      totalCount: 0,
      page: 0,
      per_page: 0,
    };
  },
  mounted() {
    this.parseQuery();
  },
  methods: {
    parseQuery() {
      this.currentPage = parseInt(this.$route.query.page) || 1;
      this.pageSize = parseInt(this.$route.query.per_page) || 30;
    },
    loadProblems() {
      getProblems({
        page: this.currentPage,
        per_page: this.pageSize,
      }).handle({
        200: (data, headers) => {
          this.totalCount = parseInt(headers["total-count"]);
          this.tableData = [];
          for (let problem of data) {
            this.tableData.push({
              id: problem.id,
              title: problem.title,
              updated_at: problem.updated_at,
            });
          }
        },
        401: () => {
          this.$message.warning("登录信息失效，请重新登录！");
          this.$router.push("/login");
        },
        404: () => console.log("获取题目列表失败"),
      });
    },
    newProblems() {
      this.$router.push({
        name: "problems-new",
      });
    },
    currentPageChange(page) {
      this.$router.push({
        name: "problems-list",
        query: {
          page,
          per_page: this.pageSize,
        },
      });
    },
    pageSizeChange(per_page) {
      this.$router.push({
        name: "problems-list",
        query: {
          page: this.currentPage,
          per_page,
        },
      });
    },
  },
  activated() {
    this.loadProblems();
  },
  watch: {
    $route() {
      this.parseQuery();
    },
    currentPage() {
      this.loadProblems();
    },
    pageSize() {
      this.loadProblems();
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  margin-bottom: 1rem;
}
.new-button {
  margin-left: 1rem;
}
.pages {
  margin: 2rem auto;
  text-align: center;
}
</style>
