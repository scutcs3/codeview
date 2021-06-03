<template>
  <div>
    <div class="header">
      <el-input placeholder="搜索面试"> </el-input>
      <el-button type="primary" class="new-button" @click="newInterviews"
        >创建面试</el-button
      >
    </div>
    <el-table
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="200">
      </el-table-column>
      <el-table-column prop="finish_time" label="结束时间" width="200">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="100">
      </el-table-column>
      <el-table-column label="操作" v-slot="{ row }">
        <router-link :to="{ name: 'viewer', params: { id: row.id } }">
          前往面试官页面
        </router-link>
        <router-link :to="{ name: 'viewee', params: { id: row.id } }">
          前往面试者页面
        </router-link>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        class="fy"
        layout="sizes, prev, pager, next, total"
        v-model="dictCurrentPage"
        :pager-count="9"
        background
        :hide-on-single-page="true"
        :total="tableData.length"
        :page-size="30"
        :page-sizes="[30, 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getInterviews } from "../api/interview";

export default {
  name: "InterviewsList",
  data() {
    return {
      tableData: [],
      dictCurrentPage: 1,
      dictPageSize: 30,
    };
  },
  methods: {
    newInterviews() {
      this.$router.push({
        name: "interviews-new",
      });
    },
  },
  activated() {
    getInterviews().handle({
      200: (data) => {
        this.tableData = [];
        let formatDate = (dt) => (dt ? this.$moment(dt).fromNow() : "待定");
        for (let interview of data) {
          this.tableData.push({
            id: interview.id,
            start_time: formatDate(interview.start_time),
            finish_time: formatDate(interview.finish_time),
            status: interview.status,
          });
        }
      },
      401: () => {
        this.$message.warning("登录信息失效，请重新登录！");
        this.$router.push("/login");
      },
      404: () => this.$message.warning("获取面试列表失败！"),
    });
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
.view-cards {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
.view-card {
  margin: 1rem;
}
.pages {
  margin: 2rem auto;
  text-align: center;
}
</style>
