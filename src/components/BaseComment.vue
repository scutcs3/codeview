<template>
  <div class="chat-container">
    <div id="main-content">
      <h3 id="chat-title">在线聊天 ({{ count }})</h3>
      <el-divider></el-divider>
      <div id="chat-content">
        <div id="content">
          <div v-for="item in messages" :key="item">
            <this-bubble v-if="item.uid == uid" :input="item.input" />
            <that-bubble v-else :uid="item.uid" :input="item.input" />
          </div>
        </div>
      </div>
      <div id="input-field" height="20%">
        <textarea
          id="input"
          style="width: 95%; height: 100%; color: gray"
          v-model="input"
        ></textarea>
      </div>
      <div id="send-msg" height="50px">
        <el-button
          id="send-msg-btn"
          type="primary"
          @click="sendMsg"
          style="width: 25%"
          >发送</el-button
        >
      </div>
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
    count() {
      let len = this.wsInfoMsg.length;
      //当前在线人数
      if (len === 0) return 0;
      else {
        return this.wsInfoMsg[len - 1].count;
      }
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
  width: 400px;
  height: 400px;
  background-position: left;
  background-size: cover;
  position: relative;
  border: 1px solid black;
}
#input {
  width: 10px;
}
#content {
  text-align: left;
  height: 200px;
  overflow: auto;
}

#main-content {
  background: white;
  width: 100%;
  margin: auto;
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 5px 20px 0;
}

#chat-title {
  height: 50px !important;
  background: #f6f6f6;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
#chat-content {
  width: 100%;
  background: #f6f6f6;
}
#send-msg {
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
.my-msg::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: inherit;
  left: -10px;
  position: absolute;
  transform: rotate(45deg);
  top: 50%;
  margin-top: -5px;
}

.message-box {
  overflow: hidden;
}
.my.message .avatar {
  float: right;
}
.other {
  margin-bottom: 16px;
  float: left;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}

.my {
  margin-bottom: 16px;
  float: right;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
}

.my.message .avatar {
  float: right;
}

.message .content {
  overflow: hidden;
}

.message .content .nickname {
  font-weight: 400;
  padding-left: 10px;
  font-size: 12px;
  height: 22px;
  line-height: 24px;
  color: #4f4f4f;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
}

.my.message .bubble {
  background-color: #b2e281;
}
.message .bubble {
  max-width: 500px;
  min-height: 1em;
  display: inline-block;
  vertical-align: top;
  position: relative;
  text-align: left;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 10px;
  background-color: #fff;
}

.message .bubble img {
  display: inline-block;
  cursor: pointer;
  max-width: 350px;
  max-height: 240px;
}

.other .bubble:before {
  position: absolute;
  top: 14px;
  left: -10px;
  border: 6px solid transparent;
  content: " ";
  border-right-color: #fff;
  border-right-width: 4px;
}

.my .bubble:before {
  position: absolute;
  top: 14px;
  right: -10px;
  border: 6px solid transparent;
  content: " ";
  border-left-color: #b2e281;
  border-left-width: 4px;
}

.bubble_cont {
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  padding: 9px 13px;
}
</style>
