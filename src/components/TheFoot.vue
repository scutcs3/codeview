<template>
  <div class="foot shadow-top">
    <div class="links hidden-xs-only">
      <FootLink
        v-for="(cur_links, cur_name) in all_links"
        :key="cur_name"
        :links="cur_links"
        :name="cur_name"
        class="link"
      ></FootLink>
    </div>
    <div class="info">
      <p>codeview@2021</p>
      <p>
        构建号：<a :href="build_link">{{ build_number }}</a>
      </p>
      <p>最后更新时间：{{ build_time }}</p>
    </div>
  </div>
</template>
<script>
import "element-plus/lib/theme-chalk/display.css";
import {
  CV_APP_BUILD_NUMBER,
  CV_APP_BUILD_ID,
  CV_APP_BUILD_TIME,
} from "../global";
import FootLink from "./FootLink.vue";
export default {
  name: "TheFoot",
  components: {
    FootLink,
  },
  data() {
    return {
      build_number: CV_APP_BUILD_NUMBER,
      build_id: CV_APP_BUILD_ID,
      build_time: CV_APP_BUILD_TIME,
      all_links: {
        项目链接: [
          { title: "代码仓库", href: "https://github.com/scutcs3/codeview" },
          { title: "文档", href: "https://github.com/scutcs3/codeview/wiki" },
          {
            title: "交互接口",
            href: "https://app.swaggerhub.com/apis-docs/tootal/codeview/1.0.0",
          },
          {
            title: "持续集成",
            href: "https://github.com/scutcs3/codeview/actions",
          },
        ],
        开发资源: [
          {
            title: "Vue3",
            href: "https://v3.cn.vuejs.org/guide/introduction.html#vue-js-%E6%98%AF%E4%BB%80%E4%B9%88",
          },
          {
            title: "Element+",
            href: "https://element-plus.gitee.io/#/zh-CN/component/quickstart",
          },
          {
            title: "Express 4",
            href: "http://expressjs.com/zh-cn/starter/installing.html",
          },
          { title: "unDraw", href: "https://undraw.co/search" },
        ],
      },
    };
  },
  computed: {
    build_link() {
      if (this.build_id === "") {
        return "javascript:void(0)";
      } else {
        return (
          "https://github.com/scutcs3/codeview/actions/runs/" + this.build_id
        );
      }
    },
  },
};
</script>
<style scoped>
.foot {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.links {
  display: flex;
}
.link {
  margin: 2rem;
}
.info p {
  padding: 0.2rem;
}
</style>
