<template>
  <el-row>
    <el-col :span="6">
      <AddProblem @problemsend="problemsend"></AddProblem>
    </el-col>
    <el-col :span="12">
      <CodeEditor msg="编程部分" @codeMsg="codeMsg"></CodeEditor>
    </el-col>
    <el-col :span="6">
      <BaseComment :data="Onechat" @fct="fct"></BaseComment>
    </el-col>
  </el-row>
</template>
<script>
import { ref, provide } from "vue";
import CodeEditor from "../components/CodeEditor.vue";
import AddProblem from "../components/AddProblem.vue";
import BaseComment from "../components/BaseComment.vue";

export default {
  name: "ViewrPage",
  data: function () {
    return {
      chatdata: "",
    };
  },
  setup() {
    let ViewerID = ref("ViewerID");
    let Onechat = ref(""); //总发送接口
    provide("CurrentID", ViewerID);
    provide("Onechat", Onechat);
    return {
      //把数据引出来，VieweeID用于存放面试者ID标识
      ViewerID,
      Onechat,
    };
  },
  components: {
    AddProblem,
    CodeEditor,
    BaseComment,
  },
  created() {
    this.socket = new WebSocket(process.env.VUE_APP_WS_API);
    this.socket.onopen = this.onopen;
    this.socket.onclose = this.onclose;
    this.socket.onmessage = this.onmessage;
  },
  watch: {
    chatdata: {
      handler(val, oldval) {
        this.socket.send(val);
        console.log(oldval);
      },
    },
  },
  methods: {
    fct(val) {
      this.chatdata = val;
    },
    codeMsg(val) {
      this.chatdata = val;
    },
    problemsend(val) {
      this.chatdata = val;
    },
    onopen() {
      console.log("连接建立");
    },
    onclose() {
      console.log("连接关闭");
    },
    onmessage(event) {
      console.log("服务端返回的数据:" + event.data);
      this.Onechat = event.data; //赋值，传送到子组件中
    },
  },
};
</script>
<style scoped></style>
