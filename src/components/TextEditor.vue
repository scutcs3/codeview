<template>
  <div class="tinymce-box">
    <h3 v-if="flag" style="text-align: center">题目：{{ t }}</h3>
    <Editor
      apiKey="5wyzzlc3q04wdx1nzfxn2c5464d6gwsblr3cm1fdwfrqow3u"
      v-model="str"
      :init="init"
      :disabled="disabled"
    >
    </Editor>
    <div>
      <el-button style="bottom: 0; left: 50px" @click="printf">发送</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { addProblem } from "../api/problem";
export default {
  components: {
    Editor,
  },
  name: "Tinymce",

  props: {
    t: {
      //题目
      type: String,
      required: true,
    },
    c: {
      //内容
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      default: window.location.origin ? window.location.origin : "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: "link lists image code table wordcount preview fullscreen help",
    },
    toolbar: {
      type: [String, Array],
      default:
        "bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | removeformat | fullscreen preview",
    },
  },
  data() {
    return {
      uid: localStorage.getItem("user.id"),
      str: "", //编辑器里的值
      flag: false,
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        convert_urls: false,
        height: 500,
        plugins: this.plugins,
        toolbar: this.toolbar,
        statusbar: true,
        menubar: "file edit insert view format table tools help", // （1级菜单）最上方的菜单
        branding: false,
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
          console.log(failure);
        },
      },
    };
  },
  methods: {
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
        }
      });
    },
  },
};
</script>
