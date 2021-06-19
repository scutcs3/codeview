<template>
  <base-card title="管理面板" class="basecard">
    <template #header>
      <el-button class="button" type="danger" plain @click="leaveView"
        >结束面试</el-button
      >
    </template>
    <div class="container">
      <div class="search-area">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="输入关键词搜索题目"
          @select="handleSelect"
        ></el-autocomplete>
        <el-button @click="addExistProblem(select_pid)">添加题目</el-button>
      </div>
      <TextEditor
        ref="editor"
        v-model:content="middle_content"
        class="texteditor"
      >
      </TextEditor>
      <el-button @click="addNewProblem">发送</el-button>
    </div>
  </base-card>
</template>
<script>
import { getProblems, addProblem } from "../api/problem";
import BaseCard from "./BaseCard.vue";
import TextEditor from "./TextEditor.vue";
export default {
  name: "ManagePanel",
  data() {
    return {
      select_pid: "",
      middle_content: "",
      state: "",
      timeout: null,
    };
  },
  components: {
    TextEditor,
    BaseCard,
  },
  methods: {
    leaveView() {
      this.$router.push("/console/interviews");
    },
    querySearchAsync(queryString, cb) {
      let results = [];
      if (!queryString) {
        cb(results);
        return;
      }
      getProblems({
        word: queryString,
      }).handle({
        200: (data) => {
          for (let problem of data) {
            results.push({
              title: problem.title,
              pid: problem.id,
              value: `P${problem.id} ${problem.title}`,
            });
          }
          cb(results);
        },
        404: () => console.error("搜索题目失败"),
      });
    },
    handleSelect(item) {
      this.select_pid = item.pid;
    },
    addExistProblem(pid) {
      addProblem({
        iid: this.$route.params.id,
        pid,
      }).handle({
        200: () => {
          this.$message.success("添加题目成功");
          this.state = "";
        },
        404: () => this.$message.error("添加题目失败，已添加到题库中。"),
      });
    },
    addNewProblem() {
      var mynowmsg = {
        type: "add_problem",
        uid: this.uid,
        title: this.t,
        content: this.str,
      };
      this.$store.commit("wsSend", mynowmsg);
      addProblem({
        title: this.t,
        content: this.str,
      }).handle({
        200: (data) => {
          let pid = data.id;
          this.addExistProblem(pid);
        },
        404: () => {
          console.log("添加题目失败!");
        },
      });
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-area {
  display: flex;
}

::v-deep(.el-autocomplete) {
  flex-grow: 1;
}
.texteditor {
  flex-grow: 1;
}
</style>
