<template>
  <div class="intro-container">
    <div class="intro" v-for="(intro, index) in introData" :key="intro.title">
      <div class="intro-item" :class="{ reverse: index % 2 === 1 }">
        <el-image
          :src="require('../assets/' + intro.icon)"
          class="intro-icon"
        ></el-image>
        <div class="intro-body">
          <h3 class="intro-title">{{ intro.title }}</h3>
          <div class="intro-content">{{ intro.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexInfo",
  data() {
    return {
      introData: [
        {
          title: "登陆注册模块",
          content: "支持邮箱登陆、注册，支持退出登陆。",
          icon: "undraw_Account_re_o7id.svg",
          color: "#c586c0",
        },
        {
          title: "面试题模块",
          content:
            "支持邀请一个候选人编程，支持面试中新建/修改富文本格式题目，每个面试题有固定链接。",
          icon: "undraw_Process_re_gws7.svg",
          color: "#9cdcfe",
        },
        {
          title: "在线编程模块",
          content: "支持候选人在线编写/提交代码，支持语法高亮。",
          icon: "undraw_Code_thinking_re_gka2.svg",
          color: "#dcdcaa",
        },
        {
          title: "在线留言模块",
          content:
            "支持候选人/候选人文字留言，留言模块自动刷新，内容长期保存。",
          icon: "undraw_public_discussion_btnw.svg",
          color: "#ce9178",
        },
      ],
    };
  },
};
</script>
<style scoped>
.intro-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
}
.intro-item.reverse {
  flex-direction: row-reverse;
  background-color: #f5f5f5;
}
.intro-icon {
  width: 8rem;
  height: 8rem;
  margin: 0 4rem;
}
.intro-body {
  display: flex;
  flex-direction: column;
  margin: 0 4rem;
  max-width: 20rem;
}
.intro-title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
.intro-content {
  font-size: 1rem;
}
</style>