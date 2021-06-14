<template>
  <base-card title="管理面板">
    <template #header>
      <el-button class="button" type="danger" plain @click="leaveView"
        >结束面试</el-button
      >
    </template>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    <el-button @click="father_add">添加题目</el-button>
    <TextEditor ref="editor" v-model:content="middle_content"> </TextEditor>
    <el-button @click="printf">发送</el-button>
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
              value: `P${problem.id} ${problem.title}`,
            });
          }
          cb(results);
        },
        404: () => console.error("搜索题目失败"),
      });
    },
    handleSelect(item) {
      console.log(item.address);
      // this.middle_content = item.address;
    },
    father_add() {
      this.$refs.editor.add();
    },
    addProblemTo(pid) {
      addProblem({
        iid: this.$route.params.id,
        pid,
      }).handle({
        200: () => {
          this.$message.success("添加题目成功");
          console.log("内部addProblem");
        },
        404: () => this.$message.error("添加题目失败，已添加到题库中。"),
      });
    },
    printf() {
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
          this.addProblemTo(pid);
        },
        404: () => {
          console.log("添加题目失败!");
        },
      });
    },
  },
};
</script>
