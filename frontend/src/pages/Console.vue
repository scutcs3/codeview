<template>
  <div class="console">
    <h2>控制台</h2>
    <el-row>
      <el-col :span="6">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="overview">
            <i class="el-icon-view"></i>
            <template #title>总览</template>
          </el-menu-item>
          <el-menu-item index="problems">
            <i class="el-icon-document"></i>
            <template #title>题库</template>
          </el-menu-item>
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <template #title>设置</template>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <template #title>个人中心</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Console",
};
</script>
<style scoped>
.console-view {
  margin-bottom: 100px;
}
</style>
