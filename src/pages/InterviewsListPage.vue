<template>
  <div>
    <h2>面试列表</h2>
    <el-button @click="newInterviews">创建面试</el-button>
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
      <el-table-column label="面试ID" v-slot="{ row }" width="200">
        <router-link :to="{ name: 'viewer', params: { id: row.hashid } }">
          面试 #{{ row.id }}
        </router-link>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="200">
      </el-table-column>
      <el-table-column prop="finish_time" label="结束时间" width="200">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="100">
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
import { getInterviews } from "../api/interview";
export default {
  name: "InterviewsList",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      dictCurrentPage: 1,
      dictPageSize: 30,
      props: {
        fieldValue: [String, Boolean],
      },
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
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
    const self = this;
    getInterviews().handle({
      200: (data) => {
        self.tableData = [];
        for (let interview of data) {
          self.tableData.push({
            id: interview.id,
            start_time: interview.start_time || "待定",
            finish_time: interview.finish_time || "待定",
            status: interview.status,
          });
        }
      },
      401: () => {
        ElMessage.warning("登录信息失效，请重新登录！");
        this.$router.push("/login");
      },
      404: () => ElMessage.warning("获取面试列表失败！"),
    });
  },
};
</script>
<style scoped>
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
