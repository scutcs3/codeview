<template>
  <div>
    <div>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button @click="father_add">添加题目</el-button>
    </div>
    <TextEditor ref="editor" :t="state" :c="middle_content"> </TextEditor>
  </div>
</template>
<script>
import { getProblems } from "../api/problem";
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
  },
  methods: {
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
