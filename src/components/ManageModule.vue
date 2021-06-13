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
    <TextEditor ref="editor" :t="state" :c="middle_content"> </TextEditor>
  </base-card>
</template>
<script>
import { getProblems } from "../api/problem";
import BaseCard from "../components/BaseCard.vue";
import TextEditor from "../components/TextEditor.vue";
export default {
  name: "ManageModule",
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
      this.middle_content = item.address;
    },
    father_add() {
      this.$refs.editor.add();
    },
  },
};
</script>
