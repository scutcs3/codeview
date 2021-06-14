<template>
  <div class="tinymce-box">
    <Editor
      apiKey="5wyzzlc3q04wdx1nzfxn2c5464d6gwsblr3cm1fdwfrqow3u"
      v-model="str"
      :init="init"
      :disabled="disabled"
    >
    </Editor>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    Editor,
  },
  name: "TextEditor",
  emits: ["update:content"],
  props: {
    content: {
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
        "bold italic underline strikethrough | formatselect | forecolor backcolor",
    },
  },
  data() {
    return {
      uid: localStorage.getItem("user.id"),
      str: "",
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
  watch: {
    str(newStr) {
      this.$emit("update:content", newStr);
    },
  },
};
</script>
