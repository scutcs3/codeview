<template>
  <div class="overview">
    <el-button @click="createDialogVisible = true">创建面试</el-button>
    <div class="view-cards">
      <ViewCard
        v-for="i in 10"
        :key="i"
        class="view-card"
        :title="'第' + i + '场面试'"
      ></ViewCard>
    </div>
    <el-dialog title="创建面试" v-model="createDialogVisible" width="60%">
      <el-form :model="createForm">
        <el-form-item label="面试者">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="面试时间">
          <el-date-picker
            v-model="createForm.time_range"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import ViewCard from "../components/ViewCard.vue";
export default {
  name: "Overview",
  components: {
    ViewCard,
  },
  data() {
    return {
      createDialogVisible: false,
      createForm: {
        viewee_id: "",
        time_range: "",
      },
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
</style>
