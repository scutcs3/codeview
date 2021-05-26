<template>
  <div class="tinymce-box">
    <button @click="add">添加题目</button><br />
    <h3 v-if="flag" style="text-align: center">题目：{{ t }}</h3>
    <editor v-model="str" :init="init" :disabled="disabled"> </editor>
    <div>
      <button style="bottom: 0; left: 50px" @click="printf">发送</button>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/skins/content/default/content.css";
import "tinymce/themes/silver/theme.min.js";
import "tinymce/icons/default/icons";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
export default {
  components: {
    Editor,
  },
  name: "Tinymce",

  props: {
    t: {
      type: String,
      required: true,
    },
    c: {
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
      str: "",
      content: "nihao",
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
      alert(this.str);
    },
    add() {
      (this.flag = true), console.log(this.c), (this.str = this.c);
    },
  },
  mounted() {
    tinymce.init({});
  },
  watch: {
    str: function (newname) {
      console.log(newname);
    },
  },
};
</script>
<style scoped>
button {
  left: 150px;
  width: 100px; /*设置按钮宽度*/
  height: 30px; /*设置按钮高度*/
  color: white; /*字体颜色*/
  background-color: cornflowerblue; /*按钮背景颜色*/
  border-radius: 3px; /*让按钮变得圆滑一点*/
  border-width: 0; /*消去按钮丑的边框*/
  margin: 0;
  outline: none; /*取消轮廓*/
  font-family: KaiTi; /*字体设置为楷体*/
  font-size: 17px; /*设置字体大小*/
  text-align: center; /*字体居中*/
  cursor: pointer; /*设置鼠标箭头手势*/
}
button:hover {
  /*鼠标移动时的颜色变化*/
  background-color: rgb(15, 247, 65);
}
</style>
