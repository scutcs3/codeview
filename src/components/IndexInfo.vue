<template>
  <div class="intro-container">
    <div
      class="intro"
      v-for="(intro, index) in introData"
      :key="intro.title"
      :class="{ reverse: index % 2 === 1 }"
    >
      <div class="intro-item">
        <el-image :src="intro.icon" class="intro-icon"></el-image>
        <div class="intro-body">
          <h3 class="intro-title">{{ intro.title }}</h3>
          <div class="intro-content">{{ intro.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon1 from "../assets/undraw_Account_re_o7id.svg";
import icon2 from "../assets/undraw_Process_re_gws7.svg";
import icon3 from "../assets/undraw_Code_thinking_re_gka2.svg";
import icon4 from "../assets/undraw_public_discussion_btnw.svg";
export default {
  name: "IndexInfo",
  data() {
    return {
      introData: [
        {
          title: "登陆注册模块",
          content: "支持邮箱登陆、注册，支持退出登陆。",
          icon: icon1,
          color: "#c586c0",
        },
        {
          title: "面试题模块",
          content:
            "支持邀请一个候选人编程，支持面试中新建/修改富文本格式题目，每个面试题有固定链接。",
          icon: icon2,
          color: "#9cdcfe",
        },
        {
          title: "在线编程模块",
          content: "支持候选人在线编写/提交代码，支持语法高亮。",
          icon: icon3,
          color: "#dcdcaa",
        },
        {
          title: "在线留言模块",
          content:
            "支持候选人/候选人文字留言，留言模块自动刷新，内容长期保存。",
          icon: icon4,
          color: "#ce9178",
        },
      ],
    };
  },
};
</script>
<style scoped>
.intro {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
}
.reverse.intro {
  background-color: #f5f5f5;
}
.intro-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35rem;
}
.reverse .intro-item {
  flex-direction: row-reverse;
}
.intro-icon {
  width: 8rem;
  height: 8rem;
}
.intro-body {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
}
.intro-title {
  font-size: 1.6rem;
  text-align: right;
  margin-bottom: 1rem;
}
.reverse .intro-title {
  text-align: left;
}
.intro-content {
  font-size: 1rem;
}
</style>
