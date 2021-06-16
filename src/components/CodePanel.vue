<template>
  <base-card title="代码面板">
    <template #header>
      <div class="choose">
        <el-select
          v-model="opts.language"
          clearable
          placeholder="请选择"
          size="mini"
          @change="changeLanguage"
        >
          <el-option
            v-for="item in sets.language"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <!-- <div class="choose-item">
          <div class="choose-item-info">样式风格：</div>
          <el-select
            v-model="opts.theme"
            clearable
            placeholder="请选择"
            size="mini"
            @change="changeTheme"
          >
            <el-option
              v-for="item in sets.theme"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div> -->
      </div>
    </template>
    <code-editor :opts="opts"></code-editor>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseCard from "./BaseCard.vue";
import CodeEditor from "./CodeEditor.vue";
export default defineComponent({
  name: "CodePanel",
  data() {
    return {
      opts: {
        value: "",
        readOnly: false, // 是否可编辑
        language: "cpp", // 语言类型
        theme: "vs", // 编辑器主题
      },
      sets: {
        language: {
          cpp: "cpp",
          c: "c",
          css: "css",
          go: "go",
          html: "html",
          java: "java",
          javascript: "javascript",
          json: "json",
          mysql: "mysql",
          php: "php",
          python: "python",
        },
        theme: {
          vs: "vs",
          "vs-dark": "vs-dark",
          "hc-black": "hc-black",
        },
      },
    };
  },
  components: {
    BaseCard,
    CodeEditor,
  },
  methods: {
    changeLanguage(val: string) {
      this.opts.language = val;
    },
    changeTheme(val: string) {
      this.opts.theme = val;
    },
  },
});
</script>
