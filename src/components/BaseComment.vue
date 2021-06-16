<template>
  <div class="chat-container">
    <div class="chat-content">
      <div v-for="item in messages" :key="item">
        <this-bubble v-if="item.uid == uid" :input="item.input" />
        <that-bubble v-else :uid="item.uid" :input="item.input" />
      </div>
    </div>
    <div class="input-field">
      <el-input type="textarea" :rows="4" v-model="input"> </el-input>
    </div>
    <div class="send-msg">
      <el-button id="send-msg-btn" type="primary" @click="sendMsg"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script>
import { addComment, getComments } from "../api/comments";
import ThisBubble from "./ThisBubble.vue";
import ThatBubble from "./ThatBubble.vue";

export default {
  name: "BaseComment",
  data() {
    return {
      uid: localStorage.getItem("user.id"),
      input: "",
      chatHistory: [], // 仅保存历史聊天记录
      socket: "",
      commentCount: 0,
    };
  },
  components: {
    ThisBubble,
    ThatBubble,
  },
  computed: {
    wsInfoMsg() {
      let infoMsg = this.$store.state.wsMessage.filter((msg) => {
        return msg.type === "open" || msg.type === "close";
      });
      return infoMsg;
    },
    messages() {
      this.$nextTick(() => {
        let content = document.getElementById("content");
        if (content) content.scrollIntoView(false);
      });
      // 返回所有聊天信息
      return this.chatHistory.concat(this.$store.getters.wsChatMsg);
    },
  },
  watch: {
    "wsInfoMsg.length": function (newVal, oldVal) {
      if (newVal == oldVal || newVal === 0) return;
      let len = this.wsInfoMsg.length;
      let lastMsg = this.wsInfoMsg[len - 1];
      if (lastMsg.uid !== this.uid) {
        this.$notify({
          message: `用户${lastMsg.uid} ${
            lastMsg.type === "open" ? "进入" : "离开"
          }了面试`,
        });
      }
    },
  },
  activated() {
    // 获取历史聊天记录
    this.chatHistory = [];
    this.loadComments(1, 100);
  },
  methods: {
    loadComments(page, per_page) {
      getComments({
        iid: this.$route.params.id,
        page,
        per_page,
      }).handle({
        200: (data, headers) => {
          this.commentCount = parseInt(headers["total-count"]);
          for (let comment of data) {
            this.chatHistory.push({
              uid: comment.owner_id,
              input: comment.content,
            });
          }
          if (this.chatHistory.length < this.commentCount) {
            this.loadComments(page + 1, per_page);
          }
        },
        404: () => console.error("获取留言失败！"),
      });
    },
    sendMsg() {
      if (this.input === "") {
        this.$message.warning("不能发送空白消息");
        return;
      }
      var mynowmsg = {
        type: "chat",
        uid: this.uid,
        input: this.input.trim(),
      };
      // 利用WebSocket广播消息
      this.$store.commit("wsSend", mynowmsg);
      // 保存发送的信息到数据库
      addComment({
        content: this.input.trim(),
        iid: this.$route.params.id,
      }).handle({
        200: () => {},
        404: () => {
          this.$message.error("发送信息失败");
        },
      });
      this.input = "";
    },
  },
};
</script>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-position: left;
  background-size: cover;
  position: relative;
}

.chat-content {
  flex-grow: 1;
  width: 100%;
  background: #f6f6f6;
  padding-top: 1rem;
  overflow: auto;
}
.input-field {
  min-height: 6rem;
}
.input-field > textarea {
  height: inherit;
  width: inherit;
  margin: 0;
  padding: 0;
}
.send-msg {
  text-align: right;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}

textarea {
  margin-left: 10px;
  margin-top: 5px;
  border: none;
  resize: none;
  cursor: text;
  outline: none;
  font-size: 20px;
}
</style>
