<template>
  <div class="my-msg">
    <div class="message-box">
      <div class="my message">
        <img class="avatar" alt="" />
        <div class="content">
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
  name: "ThisBubble",
  props: {
    input: String,
  },
};
</script>
<style scoped>
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
