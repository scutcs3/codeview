<template>
  <div style="margin-bottom: 20px;">
    <el-button
      size="small"
      @click="addTab(editableTabsValue)"
    >
      add tab
    </el-button>
    
  </div>
  <div style="width: 400px; height: 500px;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
  
</template>
<script>
export default {
  name: "BaseProblem",
  data: function () {
    return {
      title: "",
      content: "",
      activeName: 'second'
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab);
        console.log(tab, event);
      }
    }
};
</script>
