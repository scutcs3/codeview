<template>
  <base-card title="代码面板">
    <template #header>
      <el-popover placement="bottom" :width="310" trigger="click">
        <template #reference>
          <i class="el-icon-setting"></i>
        </template>
        <code-settings></code-settings>
      </el-popover>
    </template>
    <div class="panel-body">
      <code-editor class="panel-editor"></code-editor>
      <code-worker></code-worker>
    </div>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseCard from "./BaseCard.vue";
import CodeSettings from "./CodeSettings.vue";
import CodeEditor from "./CodeEditor.vue";
import CodeWorker from "./CodeWorker.vue";

export default defineComponent({
  name: "CodePanel",
  components: {
    BaseCard,
    CodeEditor,
    CodeWorker,
    CodeSettings,
  },
});
</script>
<style scoped>
.el-icon-setting {
  font-size: 1.3rem;
}
.el-icon-setting:hover {
  color: #5cb6ff;
}
.panel-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.panel-editor {
  flex: 1 1 auto;
}
</style>
