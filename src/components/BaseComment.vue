<template>
  <div id="main">
    <el-container id="main-content">
      <el-header id="chat-title">在线聊天</el-header>
      <el-divider></el-divider>
      <el-main id="chat-content">
        <div id="content">
          <div v-for="item in chatHistory" :key="item">
            <div v-if="typeof item.Ischat === 'undefined'"></div>
            <div class="my-msg" v-else-if="item.username === currentUser">
              <div class="message-box">
                <div class="my message">
                  <img class="avatar" alt="" />
                  <div class="content">
                    <div class="bubble">
                      <div class="bubble_cont">{{ item.input }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="other-users-msg">
              <div class="message-box">
                <div class="other message">
                  <img class="avatar" alt="" />
                  <div class="content">
                    <div class="nickname">{{ item.username }}</div>
                    <div class="bubble">
                      <div class="bubble_cont">{{ item.input }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer height="0%"> </el-footer>
      <el-footer id="input-field" height="20%">
        <textarea
          id="input"
          style="width: 95%; height: 100%; color: gray"
          v-model="input"
        ></textarea>
      </el-footer>
      <el-footer id="send-msg" height="50px">
        <el-button
          id="send-msg-btn"
          type="primary"
          @click="sendMsg"
          style="width: 25%"
          >发送</el-button
        >
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "BaseComment",
  data() {
    return {
      input: "",
      chatHistory: [],
      currentUser: inject("CurrentID"),
      socket: "",
      Onechat: inject("Onechat"), //用来接收父组件传来的消息
      chatnum: 0,
    };
  },

  mounted() {
    if (localStorage.getItem("chatHistory") === null) {
      localStorage.setItem("chatHistory", "");
    } else {
      this.chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
    }
    //window.onbeforeunload = function () {
    //  localStorage.removeItem('chatHistory');
    //}
  },
  watch: {
    chatHistory() {
      this.$nextTick(() => {
        document.getElementById("content").scrollIntoView(false);
      });
    },
    currentUser: {
      handler(val, oldval) {
        console.log(val);
        console.log(oldval);
      },
    },
    Onechat: {
      //判断，当Onechat发生变化时，说明服务器传来了值，这时候判断是否为聊天数据，若是，则增加
      handler(val, oldval) {
        console.log(oldval);
        var jsObj = JSON.parse(val);
        if (typeof jsObj.Ischat == "undefined") {
          return;
        }
        console.log("服务端返回的数据:" + val);
        this.chatHistory.push(jsObj);
        localStorage.setItem("chatHistory", JSON.stringify(this.chatHistory));
      },
      deep: true,
    },
  },
  methods: {
    sendMsg() {
      if (this.input == "") {
        return;
      }
      var mynowmsg = {
        username: this.currentUser,
        input: this.input.trim(),
        Ischat: 1,
        chatnum: this.chatnum,
      };
      this.chatnum++;

      localStorage.setItem("chatHistory", JSON.stringify(this.chatHistory));

      var jsonstr = JSON.stringify(mynowmsg);
      this.$emit("fct", jsonstr);
      this.input = "";
    },
  },
};
</script>

<style scoped>
#main {
  width: 99%;
  height: 500px;
  background-position: left;
  background-size: cover;
  position: relative;
}
#input {
  width: 10px;
}
#content {
  margin-top: 10px;
  text-align: left;
}

#main-content {
  background: white;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 4%;
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
