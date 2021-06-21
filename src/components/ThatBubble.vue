<template>
  <div class="other-users-msg">
    <div class="message-box">
      <div class="other message">
        <img class="avatar" alt="" />
        <div class="content">
          <div class="nickname">用户 {{ uid }}</div>
          <div class="bubble">
            <div class="bubble_cont">{{ input }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThatBubble",
  props: {
    uid: String,
    input: String,
  },
};
</script>
<style scoped>
.message-box {
  overflow: hidden;
}
.other {
  margin-bottom: 16px;
  float: left;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
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

.message .bubble {
  max-width: 400px;
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

.other .bubble:before {
  position: absolute;
  top: 14px;
  left: -10px;
  border: 6px solid transparent;
  content: " ";
  border-right-color: #fff;
  border-right-width: 4px;
}

.bubble_cont {
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  padding: 9px 13px;
}
</style>
