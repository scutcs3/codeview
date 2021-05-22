<template>
  <div class="foot text-center shadow-top">
    <p>@2021</p>
    <p>构建号：<a :href="build_link">{{ build_number }}</a></p>
    <p>最后更新时间：{{ build_time }}</p>
  </div>
</template>
<script>
export default {
  name: "TheFoot",
  data() {
    return {
      build_number: process.env.VUE_APP_BUILD_NUMBER,
      build_id: process.env.VUE_APP_BUILD_ID,
      build_time: process.env.VUE_APP_BUILD_TIME,
    }
  },
  computed: {
    build_link() {
      if (this.build_id === '') {
        return 'javascript:void(0)'
      } else {
        return 'https://github.com/scutcs3/codeview/runs/' + this.build_id
      }
    }
  },
};
</script>
<style scoped>
.foot {
  padding: 10px 0;
}
p {
  font-size: 1rem;
}
</style>