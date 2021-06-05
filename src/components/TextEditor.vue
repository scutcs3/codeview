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
    printf() {
      alert("题目:" + this.str);
      var mynowmsg = {
        title: this.t,
        content: this.str,
        IsPorblem: 1,
      };
      var jsonstr = JSON.stringify(mynowmsg);
      this.$emit("problemPressed", jsonstr);
    },
    add() {
      (this.flag = true), (this.str = this.c);
    },
  },
  watch: {
    str: function (newname) {
      console.log(newname);
    },
  },
};
</script>
