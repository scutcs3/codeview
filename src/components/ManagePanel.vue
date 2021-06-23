<template>
  <base-card title="管理面板" class="basecard">
    <template #header>
      <el-button class="button" type="danger" plain @click="leaveView"
        >结束面试</el-button
      >
    </template>
    <div class="container">
      <el-menu
        default-active="1-4-1"
        :collapse="isCollapse"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <template #title>题目列表</template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-files"></i>
          <template #title>答案列表</template>
        </el-menu-item>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-document-add"></i>
            <span>添加题目</span>
          </template>
          <el-menu-item index="3-1">添加新题目</el-menu-item>
          <el-menu-item index="3-2">添加已有题目</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>面试设置</template>
        </el-menu-item> -->
      </el-menu>
      <div class="content">
        <div class="item" v-show="panelindex == '1'">
          <view-problems></view-problems>
        </div>
        <div class="item" v-show="panelindex == '2'">
          <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
          >
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column label="操作" v-slot="{ row }">
              <el-button @click="showCode(row)">查看代码</el-button>
            </el-table-column>
          </el-table>
        </div>
        <div class="item problems-new" v-show="panelindex == '3-1'">
          <el-input
            v-model="middle_title"
            placeholder="输入题目标题"
          ></el-input>
          <TextEditor
            ref="editor"
            v-model:content="middle_content"
            class="texteditor"
          >
          </TextEditor>
          <el-button @click="addNewProblem">发送</el-button>
        </div>
        <div class="item" v-show="panelindex == '3-2'">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入关键词搜索题目"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button @click="addExistProblem(select_pid)">添加题目</el-button>
        </div>
        <!-- <div class="item" v-show="panelindex == '4'">面试的一些设置选项.</div> -->
      </div>
    </div>
  </base-card>
</template>
<script>
import { getProblems, addProblem } from "../api/problem";
import BaseCard from "./BaseCard.vue";
import ViewProblems from "../components/ViewProblems.vue";
import TextEditor from "./TextEditor.vue";
import { getAnswers } from "@/api/answers";
export default {
  name: "ManagePanel",
  data() {
    return {
      tableData: [],
      panelindex: "1",
      isCollapse: true,
      select_pid: "",
      middle_title: "",
      middle_content: "",
      state: "",
      timeout: null,
    };
  },
  components: {
    TextEditor,
    BaseCard,
    ViewProblems,
  },
  methods: {
    showCode(code) {
      console.log(code);
      this.$store.dispatch("updateCodeEditor", {
        language: code.language,
        value: code.content,
      });
    },
    loadAnswers() {
      getAnswers({
        iid: this.$route.params.id,
        pid: this.$store.state.pid,
      }).handle({
        200: (data) => {
          this.tableData = [];
          for (let answer of data) {
            this.tableData.push({
              language: answer.language,
              content: answer.content,
              created_at: answer.created_at,
            });
          }
        },
      });
    },
    handleMenuSelect(index) {
      this.panelindex = index;
      if (index === "2") {
        this.loadAnswers();
      }
    },
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
        title: this.middle_title,
        content: this.middle_content,
      };
      this.$store.commit("wsSend", mynowmsg);
      addProblem({
        title: this.middle_title,
        content: this.middle_content,
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
  flex-direction: row;
}
.el-menu {
  height: 100%;
}
.content {
  width: 0;
  flex-grow: 1;
  flex-shrink: 1;
}
.item {
  height: 100%;
}

.search-area {
  display: flex;
}

::v-deep(.el-autocomplete) {
  flex-grow: 1;
}

.problems-new {
  display: flex;
  flex-direction: column;
}
.texteditor {
  flex-grow: 1;
}
</style>
