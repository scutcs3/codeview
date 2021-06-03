<template>
  <el-row>
    <el-col :span="6">
      <ManageModule @problemsend="problemsend"></ManageModule>
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
import hashids from "hashids";
import CodeEditor from "../components/CodeEditor.vue";
import ManageModule from "../components/ManageModule.vue";
import BaseComment from "../components/BaseComment.vue";

export default {
  name: "ViewrPage",
  data() {
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
    ManageModule,
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
        //从子部件传来的数据是字符串数据，所以在这里将其转换为data属性，
        var jsObj = JSON.parse(val);
        //添加interviewID属性
        let hash = new hashids("codeview salt", 16);
        let interview_id = hash.decode(this.$route.query.hashid);
        console.log(interview_id);
        jsObj.intervierID = 1;
        //转换为字符串属性，然后将其发送到服务器上
        var jsonstr = JSON.stringify(jsObj);

        console.log(jsonstr);
        this.socket.send(jsonstr);
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
