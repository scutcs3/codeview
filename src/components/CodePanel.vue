<template>
  <base-card title="代码面板">
    <code-editor></code-editor>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseCard from "./BaseCard.vue";
import CodeEditor from "./CodeEditor.vue";
export default defineComponent({
  name: "CodePanel",
  components: {
    BaseCard,
    CodeEditor,
  },
});
</script>
